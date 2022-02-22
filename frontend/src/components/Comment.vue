<template>
  <div
    class="flex justify-between items-center w-full my-2 border-2 border-gray-400 rounded-2xl p-2"
  >
    <div>
      <div class="flex items-center w-full space-x-2">
        <img class="rounded-full icon" :src="avatar" width="30" height="30" />
        <div class="flex items-center w-full space-x-2">
          <p class="font-medium">{{ pseudo }}</p>
          <p class="text-xs">{{ timestamp }}</p>
        </div>
        <div v-if="canDelete" class="grow flex justify-end"></div>
      </div>
      <p>{{ message }}</p>
    </div>
    <button
      class="bg-red-600 w-8 aspect-square text-white font-semibold rounded"
      @click="emitDeleteEvent"
      title="Supprimer la publication"
    >
      X
    </button>
  </div>
</template>
<script>
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
<style lang=""></style>
