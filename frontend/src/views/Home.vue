<template>
  <div class="place-self-start flex flex-col gap-6 max-w-2xl w-full mx-auto">
    <button
      class="w-full p-2 rounded bg-white rounded-2xl text-left text-neutral-400 my-3"
      @click="togglePublicationModal()"
    >
      <span class="sm:ml-4">Une envie de partager ?</span>
    </button>

    <div v-for="publication in publications" v-bind:key="publication.id">
      <Publication
        :id="publication.id"
        :avatar="publication.User.photoUrl"
        :pseudo="publication.User.pseudo"
        :description="publication.description"
        :image="publication.photoUrl"
        :createdAt="publication.createdAt"
        :updatedAt="publication.updatedAt"
        :userId="publication.userId"
        :arrayUsersLike="publication.Likes"
        @deletePublication="(publicationId) => deletePublication(publicationId)"
      />
    </div>
    <Modal
      :showModal="showPublicationModal"
      :waiting="waitingPublishing"
      @closePublicationModal="togglePublicationModal()"
      @publish="(publication) => publish(publication)"
    />
  </div>
</template>

<script>
import { API } from "@/services/API.js";
import Publication from "@/components/Publication.vue";
import Modal from "@/components/modals/ModalCreatePublication.vue";

export default {
  name: "Home",
  components: {
    Publication,
    Modal,
  },
  data() {
    return {
      publications: [],
      showPublicationModal: false,
      waitingPublishing: false,
    };
  },
  async mounted() {
    const self = this;
    await API.get("/publication").then(function (response) {
      if (!response.error) {
        self.publications = response.publications;
      }
    });
  },
  methods: {
    deletePublication: function (publicationId) {
      const self = this;
      API.delete("/publication/" + publicationId).then((response) => {
        if (response.error) {
          return false;
        }
        self.publications = self.publications.filter(function (publication) {
          if (publication.id !== publicationId) {
            return publication;
          }
        });
      });
    },
    publish: function (data) {
      const self = this;
      const isFormData = true;
      this.waitingPublishing = true;

      let body = {
        description: data.description,
      };

      const formData = new FormData();
      formData.append("image", data.file);
      formData.append("data", JSON.stringify(body));
      body = formData;

      API.post("/publication", body, { isFormData }).then((response) => {
        if (!response.error) {
          // ajoute la dernière publication en haut de la page
          self.publications.unshift(response.publication);
        }
        self.waitingPublishing = false;
        this.togglePublicationModal();
      });
    },
    togglePublicationModal: function () {
      // on ne veut pas fermer le modal si une publication est en cours
      if (this.waitingPublishing) {
        return false;
      }
      this.showPublicationModal = !this.showPublicationModal;
    },
  },
};
</script>

<style></style>
