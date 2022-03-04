<template>
  <div
    class="flex w-full flex-col mx-auto justify-around p-5 bg-white rounded-xl gap-4"
  >
    <div class="flex items-center w-full space-x-2">
      <img class="rounded-full icon" :src="avatar" width="40" height="40" />
      <div>
        <p class="font-medium">{{ pseudo }}</p>
        <p class="text-xs">{{ timestamp }}</p>
      </div>
      <div v-if="canDelete" class="grow flex justify-end">
        <button
          class="bg-red-600 w-8 aspect-square text-white font-semibold rounded"
          @click="emitDeleteEvent()"
          title="Supprimer la publication"
        >
          X
        </button>
      </div>
    </div>
    <div class="">
      {{ description }}
    </div>
    <img v-if="image" class="mx-auto" :src="image" />
    <div class="flex justify-between">
      <p
        v-if="!showComments"
        @click="getAllComments()"
        class="cursor-pointer underline underline-offset-2 text-gray-600"
      >
        Afficher les commentaires
      </p>
      <p
        v-else
        @click="updateShowStatus()"
        class="cursor-pointer underline underline-offset-2 text-gray-600"
      >
        Cacher les commentaires
      </p>
      <div class="flex gap-4 items-center">
        <span>
          {{ countLikes }}
        </span>
        <button @click="likeOrNot()" class="text-xl">
          <i v-if="isLiked" class="fas fa-heart text-red-700"></i>
          <i v-else class="far fa-heart"></i>
        </button>
      </div>
    </div>
    <div v-if="showComments">
      <div v-if="commentsAreNotEmpty">
        <div v-for="comment in comments" :key="comment.id">
          <Comment
            :id="comment.id"
            :avatar="comment.User.photoUrl"
            :pseudo="comment.User.pseudo"
            :message="comment.message"
            :createdAt="comment.createdAt"
            :updatedAt="comment.updatedAt"
            :userId="comment.userId"
            @deleteComment="deleteComment"
          />
          <!-- @deleteComment="deleteComment" -->
        </div>
      </div>
      <p v-else class="mt-2 font-medium">
        Aucun commentaire sur cette publication
      </p>
    </div>
    <div class="mt-2 rounded-2xl border-4 flex items-center">
      <input
        v-model="comment"
        type="text"
        placeholder="Ajouter un commentaire"
        class="grow rounded-l-2xl p-2"
      />
      <button
        class="content-center rounded-r-2xl w-10 aspect-square hover:scale-150"
        @click="addComment()"
      >
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { API } from "@/services/API.js";
import Comment from "@/components/Comment.vue";
import moment from "moment";

export default {
  data() {
    return {
      showComments: false,
      comments: [],
      comment: "",
      listUsers: [],
    };
  },
  components: {
    Comment,
  },
  props: {
    id: {
      type: Number,
    },
    userId: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    pseudo: {
      type: String,
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    arrayUsersLike: {
      type: Array,
    },
  },
  mounted: function () {
    this.arrayUsersLike.forEach((elt) => {
      this.listUsers.push(elt.userId);
    });
  },
  computed: {
    countLikes: function () {
      return this.listUsers.length;
    },
    isLiked: function () {
      return this.listUsers.includes(this.userId);
    },
    commentsAreNotEmpty: function () {
      return this.comments.length > 0;
    },
    canDelete: function () {
      if (
        this.$store.state.user.admin ||
        this.userId == this.$store.state.user.userId
      ) {
        return true;
      }
      return false;
    },
    timestamp: function () {
      moment.locale("fr");
      return moment(this.createdAt).fromNow();
    },
  },
  methods: {
    updateShowStatus: function () {
      this.showComments = !this.showComments;
    },
    emitDeleteEvent: function () {
      this.$emit("deletePublication", this.id);
    },
    getAllComments: function () {
      if (this.commentsAreNotEmpty) {
        this.updateShowStatus();
      } else {
        const self = this;
        API.get("/comment/" + this.id).then((response) => {
          self.comments = response.comments;
          self.updateShowStatus();
        });
      }
    },
    addComment: function () {
      API.post("/comment/" + this.id, { message: this.comment }).then(
        (response) => {
          if (!response.error) {
            this.getAllComments();
            this.comment = "";
          }
        }
      );
    },
    deleteComment: function (commentId) {
      const self = this;
      API.delete("/comment/" + commentId).then((response) => {
        if (response.error) {
          return false;
        }
        self.comments = self.comments.filter(
          (comment) => comment.id !== commentId
        );
      });
    },
    likeOrNot: function () {
      const self = this;
      console.log(self.listUsers); // ! mentorat pourquoi ma list est dégeux
      API.post("/like/" + this.id).then((response) => {
        if (!response.error) {
          if (response.like) {
            self.listUsers.push(self.userId);
          } else {
            self.listUsers = self.listUsers.filter(
              (userId) => userId != self.userId
            );
          }
        }
      });
    },
  },
};
</script>
<style scoped></style>
