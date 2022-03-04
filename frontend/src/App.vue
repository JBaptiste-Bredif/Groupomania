<template>
  <div class="min-h-screen min-w-screen">
    <!-- mentorat : pourquoi on ne peux pas mettre le id="app" => duplication du app  -->
    <Header v-if="isAuthenticated" />
    <main class="mx-auto min-h-screen min-w-screen">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/TheHeader.vue";
export default {
  name: "App",
  mounted: function () {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
      return;
    }
  },
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
/* #app {
  max-width: 90%;
  min-width: 90%;
  height: 100%;
} */
main {
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
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #2196f3;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button:disabled {
  cursor: not-allowed;
}
</style>
