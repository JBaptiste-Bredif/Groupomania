<template>
  <main>
    <Header v-if="isAuthenticated" />
    <div id="view-container" class="mx-auto min-h-screen min-w-screen">
      <router-view />
    </div>
  </main>
</template>

<script>
import Header from "@/components/TheHeader.vue";
export default {
  name: "App",
  computed: {
    isAuthenticated: function () {
      return this.$store.state.token !== -1;
    },
  },
  components: {
    Header,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");
body,
html {
  font-family: "Poppins", sans-serif;
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  background-color: #eeeeee;
}
#view-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}
img {
  max-width: 100%;
  max-height: 25rem;
  border-radius: 8px;
  display: block;
  object-fit: cover;
}
</style>
