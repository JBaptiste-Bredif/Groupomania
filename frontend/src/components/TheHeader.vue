<template>
  <div class="min-w-full bg-white flex justify-between items-center shadow-md">
    <router-link to="/" class="max-w-lg">
      <img src="../assets/logo.png" alt="Logo groupomania" />
    </router-link>

    <div class="flex items-center m-4">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="flex items-center border shadow-md hover:border-2 hover:border-white w-16 rounded-full"
          >
            <img
              :src="avatar"
              alt="Avatar"
              class="rounded-full aspect-square"
            />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <router-link
                  :class="[
                    active ? 'bg-orange-600 text-white' : 'text-gray-900',
                    'group flex rounded-md items-center w-full gap-4 px-2 py-2 text-md',
                  ]"
                  to="/profil"
                >
                  <i class="fas fa-user-cog"></i>
                  Paramètres
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active ? 'bg-orange-600 text-white' : 'text-gray-900',
                    'group flex rounded-md items-center gap-4 w-full px-2 py-2 text-md',
                  ]"
                  @click="disconnect()"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  Se déconnecter
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  computed: {
    avatar: function () {
      return this.$store.state.user.photoUrl;
    },
  },
  methods: {
    disconnect: function () {
      this.$store.dispatch("disconnect");
    },
  },
};
</script>
<style lang=""></style>
