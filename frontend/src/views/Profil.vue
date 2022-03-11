<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex flex-wrap w-full gap-10">
      <div
        class="bg-white grow flex justify-center flex-col items-center sm:p-6 p-2 gap-6 shadow rounded-2xl"
      >
        <img
          :src="avatar"
          class="rounded-full aspect-square border-2 hover:cursor-pointer"
          title="Cliquez pour changer de photo"
          alt="Prévisualisation avatar"
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
          :disabled="enabledButton"
          :waiting="waitingUpdateAvatar"
          :message="'Sauvegarder'"
          @click-event="updateAvatar()"
        />
      </div>
      <div class="flex flex-col justify-between grow gap-10">
        <div class="grow shadow bg-white rounded-2xl p-6 flex flex-col gap-6">
          <h2 class="border-b-2 text-xl">
            <i class="far fa-id-card mr-2"></i>
            Mes informations
          </h2>
          <div class="flex flex-col">
            <label for="email">Adresse Mail :</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-row__input"
              @change="infosHasChanged = true"
            />
          </div>
          <div class="flex flex-col">
            <label for="pseudo">Pseudo :</label>
            <input
              v-model="pseudo"
              type="text"
              id="pseudo"
              class="form-row__input"
              @change="infosHasChanged = true"
            />
          </div>
          <div class="flex flex-col items-center gap-2">
            <div v-if="messageUpdateInfos">{{ messageUpdateInfos }}</div>
            <button-save
              :disabled="!validatedInfos || !infosHasChanged"
              :waiting="waitingUpdateInfos"
              :message="'Mettre à jour'"
              @click-event="updateInfos()"
            />
          </div>
        </div>
        <div class="grow shadow bg-white rounded-2xl p-6 flex flex-col gap-6">
          <h2 class="border-b-2 text-xl">
            <i class="fas fa-key mr-2"></i>
            Changement mot de passe
          </h2>
          <form action="void" class="flex flex-col gap-6">
            <input hidden type="text" autocomplete="username" value="{{...}}" />
            <div class="flex flex-col">
              <label for="oldPassword">Ancien mot de passe :</label>
              <input
                v-model="oldPassword"
                type="password"
                name="oldPassword"
                class="form-row__input"
                autocomplete="password"
                placeholder="Ancien mot de passe"
              />
            </div>
            <div class="flex flex-col">
              <label for="newPassword">Nouveau mot de passe :</label>
              <input
                v-model="newPassword"
                type="password"
                name="newPassword"
                class="form-row__input"
                autocomplete="new-password"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </form>
          <div class="flex flex-col items-center gap-2">
            <div v-if="messageUpdatePassword">{{ messageUpdatePassword }}</div>
            <button-save
              :disabled="!validatedPassword"
              :waiting="waitingUpdatePassword"
              :message="'Mettre à jour'"
              @click-event="updatePassword()"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="bg-red-500 py-6 sm:px-24 px-12 rounded-full mt-12 text-white font-semibold hover:bg-red-600"
      @click="toggleDeleteModal()"
    >
      Supprimer mon compte
    </button>
    <Modal-delete-account
      :showModal="showDeleteModal"
      @closeDeleteModal="toggleDeleteModal()"
    />
  </div>
</template>
<script>
import { API } from "@/services/API.js";
import ButtonSave from "@/components/ButtonSave.vue";
import ModalDeleteAccount from "@/components/modals/ModalDeleteAccount.vue";

export default {
  data() {
    return {
      pseudo: this.$store.state.user.pseudo,
      email: this.$store.state.user.email,
      avatar: this.$store.state.user.photoUrl,
      file: "",
      oldPassword: "",
      newPassword: "",
      waitingUpdateAvatar: false,
      waitingUpdateInfos: false,
      waitingUpdatePassword: false,
      messageUpdatePassword: "",
      messageUpdateInfos: "",
      infosHasChanged: false,
      showDeleteModal: false,
    };
  },
  components: {
    ButtonSave,
    ModalDeleteAccount,
  },
  computed: {
    enabledButton: function () {
      return this.avatar == this.$store.state.user.photoUrl;
    },
    validatedPassword: function () {
      return this.oldPassword.length >= 8 && this.newPassword.length >= 8;
    },
    validatedInfos: function () {
      return this.email != "" && this.pseudo != "";
    },
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
      this.waitingUpdateAvatar = true;

      const formData = new FormData();
      formData.append("image", this.file);

      API.put("/auth/avatar", formData, { isFormData }).then((response) => {
        if (!response.error) {
          self.$store.dispatch("changeAvatar", response.user);
        }
        self.waitingUpdateAvatar = false;
      });
    },
    updatePassword: function () {
      const self = this;
      this.waitingUpdatePassword = true;
      const body = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      API.put("/auth/password", body).then((response) => {
        if (!response.error) {
          self.messageUpdatePassword = response.message;
          self.oldPassword = "";
          self.newPassword = "";
        } else {
          self.messageUpdatePassword = response.error;
        }
        self.waitingUpdatePassword = false;
        setTimeout(function () {
          self.messageUpdatePassword = "";
        }, 5000);
      });
    },
    updateInfos: function () {
      const self = this;
      this.waitingUpdateInfos = true;

      const body = {
        email: this.email,
        pseudo: this.pseudo,
      };
      API.put("/auth/account", body).then((response) => {
        if (!response.error) {
          self.messageUpdateInfos = response.message;
          self.$store.dispatch("changeInfos", response.user);
        } else {
          self.messageUpdateInfos = response.error;
        }
        self.waitingUpdateInfos = false;
      });
    },
    toggleDeleteModal: function () {
      this.showDeleteModal = !this.showDeleteModal;
    },
  },
};
</script>
<style lang=""></style>
