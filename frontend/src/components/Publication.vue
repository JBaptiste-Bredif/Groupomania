<template>
  <div
    class="md:container flex flex-col custom mx-auto justify-around p-5 bg-slate-400"
  >
    <div class="container flex flex-row">
      <img :src="avatar" alt="" class="w-24 h-24 rounded-full" />
      <span> {{ pseudo }}</span>
    </div>
    <div>
      {{ description }}
    </div>
    <div class="max-h-full">
      <img :src="image" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    avatar: {
      type: String,
    },
    pseudo: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.custom {
  max-height: 500px;
}
</style>
