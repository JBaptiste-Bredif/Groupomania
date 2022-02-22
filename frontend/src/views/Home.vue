<template>
  <div class="flex flex-col gap-10">
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input w-full p-2 rounded"
        type="text"
        placeholder="Une envie de partager ?"
      />
    </div>
    <div v-for="publication in publications" v-bind:key="publication.id">
      <Publication
        :id="publication.id"
        :avatar="publication.User.photoUrl"
        :pseudo="publication.User.pseudo"
        :description="publication.description"
        :image="publication.photoUrl"
        :countLikes="publication.countLikes"
        :createdAt="publication.createdAt"
        :updatedAt="publication.updatedAt"
        :userId="publication.userId"
        @deletePublication="deletePublication"
      />
      <!-- @deletePublication="(val) => deletePublication" NE FONCTIONNE PAS -->
      <!-- @deletePublication emit par Publication(component) -->
    </div>
  </div>
</template>

<script>
import { API } from "@/services/API.js";
import Publication from "@/components/Publication.vue";

export default {
  name: "Home",
  components: {
    Publication,
  },
  data() {
    return {
      publications: [],
    };
  },
  async mounted() {
    const self = this;
    await API.get("/publication")
      .then(function (response) {
        console.log("🚀 ~ file: Home.vue ~ line 34 ~ (response", response);
        if (!response.error) {
          self.publications = response.publications;
        } else {
          console.log("🚀 ~ file: Home.vue ~ line 29 ~ response", response);
        }
      })
      .catch(function (error) {
        console.log("🚀 ~ file: Home.vue ~ line 39 ~ mounted ~ error", error);
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
  },
};
</script>

<style></style>
