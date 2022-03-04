<template>
  <div class="min-w-full bg-white flex justify-between items-center">
    <router-link to="/">
      <img src="../assets/logo.png" class="object-fit max-w-sm" alt="" />
    </router-link>

    <div class="mr-6">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="flex items-center shadow-md hover:shadow-2xl w-16 aspect-square rounded-full"
          >
            <img :src="avatar" alt="" class="object-cover rounded-full" />
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
                    active ? 'bg-orange-500 text-white' : 'text-gray-900',
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
                    active ? 'bg-orange-500 text-white' : 'text-gray-900',
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
