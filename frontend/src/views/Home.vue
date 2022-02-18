<template>
  <div>
    <div v-for="publication in publications" v-bind:key="publication.id">
      <Publications
        :avatar="publication.User.photoUrl"
        :pseudo="publication.User.pseudo"
        :description="publication.description"
        :image="publication.photoUrl"
        :countLikes="publication.countLikes"
        :createdAt="publication.createdAt"
        :updatedAt="publication.updatedAt"
      />
    </div>
  </div>
</template>

<script>
import Publications from "@/components/Publication.vue";
export default {
  name: "App",
  components: {
    Publications,
  },
  data() {
    return {
      publications: [
        {
          id: 2,
          userId: 1,
          description: "Enfaite je n'ai pas trop aimé",
          photoUrl: null,
          photoId: null,
          countLikes: 0,
          createdAt: "2022-02-03T17:29:29.000Z",
          updatedAt: "2022-02-04T10:11:37.000Z",
          UserId: 1,
          User: {
            pseudo: "Test",
            photoUrl:
              "https://res.cloudinary.com/dqo9zo8zm/image/upload/v1643376857/defaultAvatar_fwcicz.png",
            photoId: "defaultAvatar_fwcicz",
          },
        },
        {
          id: 3,
          userId: 1,
          description: "Ceci est une publication",
          photoUrl:
            "http://res.cloudinary.com/dqo9zo8zm/image/upload/v1643909949/publication/kkxsiul98h6gxatyunqw.png",
          photoId: "publication/kkxsiul98h6gxatyunqw",
          countLikes: 0,
          createdAt: "2022-02-03T17:39:11.000Z",
          updatedAt: "2022-02-03T17:39:11.000Z",
          UserId: 1,
          User: {
            pseudo: "Test",
            photoUrl:
              "https://res.cloudinary.com/dqo9zo8zm/image/upload/v1643376857/defaultAvatar_fwcicz.png",
            photoId: "defaultAvatar_fwcicz",
          },
        },
      ],
    };
  },
};
</script>

<style></style>
