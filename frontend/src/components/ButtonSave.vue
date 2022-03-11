<template lang="">
  <button
    :disabled="waiting || disabled"
    type="button"
    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-lg font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-base disabled:cursor-not-allowed disabled:opacity-60"
    @click="emitClickEvent()"
  >
    <span v-if="!waiting">{{ message }}</span>
    <span v-else class="inline-flex items-center">
      En cours
      <i class="fas fa-spinner inline ml-3 w-4 h-4 text-white animate-spin"></i>
    </span>
  </button>
</template>
<script>
export default {
  props: {
    waiting: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    message: { type: String, default: "Sauvegarder" },
  },
  methods: {
    emitClickEvent: function () {
      this.$emit("click-event");
    },
  },
};
</script>
<style lang=""></style>
