<template>
  <div
    class="flex justify-between items-center w-full my-2 border-2 border-gray-400 rounded-2xl p-2 gap-4"
  >
    <div class="grow">
      <div class="flex items-center w-full space-x-2">
        <img class="rounded-full icon" :src="avatar" width="30" height="30" />
        <div class="flex items-center w-full space-x-2">
          <p class="font-medium">{{ pseudo }}</p>
          <p class="text-xs">{{ timestamp }}</p>
        </div>
      </div>
      <p class="comment__text p-2">{{ message }}</p>
      <!-- <input type="text" :value="message" :disabled="!changeComment" /> -->
      <!-- <textarea
        :value="message"
        :disabled="!changeComment"
        class="w-full text-justify"
      ></textarea> -->
    </div>
    <button
      v-if="canDelete"
      class="bg-red-600 w-8 aspect-square text-white font-semibold rounded comment__delete"
      @click="emitDeleteEvent()"
      title="Supprimer la publication"
    >
      X
    </button>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      changeComment: false,
    };
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
    message: {
      type: String,
    },
  },
  computed: {
    commentsAreNotEmpty: function () {
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
    emitDeleteEvent: function () {
      this.$emit("deleteComment", this.id);
    },
  },
};
</script>
<style scoped>
.comment__delete {
  min-width: 2.2em;
}
.comment__text {
  overflow-wrap: break-word;
  word-break: break-all;
  max-width: 100%;
}
textarea {
  background-color: white;
  resize: none;
  height: auto;
}
</style>
