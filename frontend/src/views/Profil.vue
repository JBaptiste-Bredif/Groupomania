<template>
  <div>
    <h1>{{ pseudo }}</h1>
    <h1>{{ email }}</h1>
    <img :src="avatar" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      pseudo: this.$store.state.user.pseudo,
      email: this.$store.state.user.email,
      avatar: this.$store.state.user.photoUrl,
    };
  },
};
</script>
<style lang=""></style>
