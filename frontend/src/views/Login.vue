<template>
  <div class="card mx-auto">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="card__action" @click="switchToCreateAccount()">
        Créer un compte
      </span>
    </p>
    <p class="card__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="card__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <form action="">
      <div class="form-row">
        <input
          v-model="email"
          class="form-row__input"
          type="email"
          placeholder="Adresse mail"
          autocomplete="username"
        />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input
          v-model="pseudo"
          class="form-row__input"
          type="text"
          placeholder="Pseudo"
        />
      </div>
      <div class="form-row">
        <input
          v-model="password"
          class="form-row__input"
          type="password"
          autocomplete="current-password"
          placeholder="Mot de passe"
        />
      </div>
    </form>
    <div class="form-row" v-if="status && status != 'loading'">
      {{ status }}
    </div>
    <div class="form-row">
      <button
        @click="login()"
        class="button disabled:opacity-75"
        :disabled="!validatedFields"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="button disabled:opacity-75"
        :disabled="!validatedFields"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      pseudo: "",
      nom: "",
      password: "",
    };
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        return (
          this.email != "" && this.pseudo != "" && this.password.length >= 8
        );
      } else {
        return this.email != "" && this.password.length >= 8;
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      if (!this.validatedFields) {
        return false;
      }
      const self = this;
      self;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.$router.push("/");
        });
    },
    createAccount: function () {
      if (!this.validatedFields) {
        return false;
      }
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          pseudo: this.pseudo,
          password: this.password,
        })
        .then(function () {
          self.login();
        });
    },
  },
};
</script>

<style scoped>
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
