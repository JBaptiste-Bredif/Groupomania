<template>
  <div class="flex flex-wrap w-full gap-10">
    <div
      class="bg-white grow flex justify-center flex-col items-center sm:p-6 p-2 gap-6 shadow rounded-2xl"
    >
      <img
        :src="avatar"
        class="rounded-full aspect-square border-2 hover:cursor-pointer"
        title="Cliquez pour changer de photo"
        @click="openFileSelector()"
      />
      <input
        id="imgSelector"
        type="file"
        class="w-40 hidden"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        @change="onFileChange"
      />
      <button-save
        :waiting="waiting"
        :message="'Sauvegarder'"
        @click="updateAvatar()"
      />
    </div>
    <div class="flex flex-col justify-between grow gap-10">
      <div class="grow bg-green-500 rounded-2xl">
        <h1>{{ pseudo }}</h1>
        <h1>{{ email }}</h1>
      </div>
      <div class="grow bg-red-500 rounded-2xl">
        <h1>old mdp</h1>
        <h1>new mdp</h1>
      </div>
      <!-- <details class="bg-red-500">
        <summary>Mot de passe</summary>
        <h1>old mdp</h1>
        <h1>new mdp</h1>
      </details> -->
    </div>
  </div>
</template>
<script>
import { API } from "@/services/API.js";
import buttonSave from "@/components/ButtonSave.vue";
export default {
  data() {
    return {
      pseudo: this.$store.state.user.pseudo,
      email: this.$store.state.user.email,
      avatar: this.$store.state.user.photoUrl,
      file: "",
      waiting: false,
    };
  },
  components: {
    buttonSave,
  },
  methods: {
    onFileChange: function (e) {
      this.file = e.target.files[0];
      this.avatar = URL.createObjectURL(this.file);
    },
    openFileSelector: function () {
      document.getElementById("imgSelector").click();
    },
    updateAvatar: function () {
      const self = this;
      const isFormData = true;
      this.waiting = true;

      const formData = new FormData();
      formData.append("image", this.file);

      API.put("/auth/avatar", formData, { isFormData }).then((response) => {
        if (!response.error) {
          self.$store.dispatch("changeAvatar", response.user);
        }
        self.waiting = false;
      });
    },
  },
};
</script>
<style lang=""></style>
