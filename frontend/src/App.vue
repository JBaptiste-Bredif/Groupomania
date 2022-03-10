<template>
  <main>
    <Header v-if="isAuthenticated" />
    <div
      id="view-container"
      class="mx-auto min-h-screen min-w-screen p-4 sm:px-16 flex justify-center items-center"
    >
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
img {
  max-width: 100%;
  max-height: 25rem;
  border-radius: 8px;
  display: block;
  object-fit: cover;
}

.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>
