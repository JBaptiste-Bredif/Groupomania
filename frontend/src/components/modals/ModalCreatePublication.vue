<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="emitCloseEvent()"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="">
                <div class="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Créer une publication
                  </DialogTitle>
                  <div class="my-3">
                    <input
                      v-model="description"
                      type="text"
                      name=""
                      id=""
                      class="grow rounded-2xl min-w-full p-2 border-2"
                      placeholder="Que voulez-vous dire ?"
                      autofocus
                    />
                  </div>

                  <div class="my-3">
                    <input
                      id="imgSelector"
                      type="file"
                      class="hidden"
                      accept="image/png, image/jpeg, image/jpg, image/gif"
                      @change="onFileChange"
                    />
                  </div>
                  <div class="flex justify-center items-center">
                    <img v-if="url" :src="url" alt="Prévisualisation image" />
                  </div>
                  <div class="mx-auto flex justify-center my-2">
                    <button
                      v-if="!file"
                      class="bg-gray-300 px-8 py-2 rounded-full font-medium"
                      @click="openFileSelector()"
                    >
                      Ajouter une image
                    </button>
                    <button
                      v-else
                      class="bg-red-500 px-8 py-2 rounded-full font-medium text-white"
                      @click="deleteFileFromSelector()"
                    >
                      Supprimer l'image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-4"
            >
              <button-save
                :disabled="description == '' || waiting"
                :waiting="waiting"
                :message="'Publier'"
                @click="emitPublishEvent()"
              />
              <button
                v-if="!waiting"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="emitCloseEvent()"
              >
                Annuler
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import buttonSave from "@/components/ButtonSave.vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

export default {
  data() {
    return {
      url: null,
      description: "",
      file: "",
      waitingCount: 0,
    };
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    buttonSave,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    waiting: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // Dès qu'on fait une publication, waiting change 2 fois de status (publishing=> true, published =>false)
    // Il faut compter se nombre de changements, dès qu'on à un nombre pair celà veut dire que la boucle de publication est finit
    // On peut donc reset les éléments du Modal
    waiting: function () {
      this.waitingCount++;
      if (this.waitingCount % 2 == 0) {
        this.reset();
      }
    },
  },
  methods: {
    openFileSelector: function () {
      document.getElementById("imgSelector").click();
    },
    deleteFileFromSelector: function () {
      this.file = "";
      this.url = "";
      document.getElementById("imgSelector").target.files[0] = "";
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    emitCloseEvent: function () {
      this.$emit("closePublicationModal");
    },
    emitPublishEvent: function () {
      this.$emit("publish", {
        description: this.description,
        file: this.file,
      });
    },
    reset: function () {
      this.description = "";
      this.url = "";
      this.file = "";
    },
  },
};
</script>
