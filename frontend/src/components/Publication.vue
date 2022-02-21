<template>
  <div
    class="flex w-full flex-col mx-auto justify-around p-5 bg-white rounded-xl"
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
          @click="emitDeleteEvent"
          title="Supprimer la publication"
        >
          X
        </button>
      </div>
    </div>
    <div class="mt-4">
      {{ description }}
    </div>
    <div class="custom">
      <img :src="image" />
    </div>
    <p v-if="!showComments" @click="getAllComments">
      Afficher les commentaires
    </p>
    <p v-else @click="updateShowStatus">Cacher les commentaires</p>
    <div v-if="showComments">
      <div v-if="commentsAreNotEmpty">
        {{ comments }}
      </div>
      <p v-else>Aucun commentaire sur cette publication</p>
    </div>
  </div>
</template>
<script>
import { API } from "@/services/API.js";
import moment from "moment";

export default {
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
    countLikes: {
      type: Number,
    },
  },
  computed: {
    commentsAreNotEmpty: function () {
      console.log(this.comments.length);
      if (this.comments.length > 0) {
        return true;
      } else {
        return false;
      }
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
  },
  data() {
    return {
      showComments: false,
      comments: [],
    };
  },
};
</script>
<style scoped>
.custom {
  max-width: 400px;
}
</style>
