<template>
  <div class="relative w-full min-h-screen">
    <router-view />

    <div
      v-if="!activePage"
      class="absolute flex w-full h-full items-center justify-center"
    >
      <div class="text-xl text-gray-800">Выберите страницу для редактирования в структуре</div>
    </div>

    <button
      @click="open = true"
      class="fixed right-0 bottom-0 mr-4 mb-4 z-40 border-2 border-black rounded-lg py-4 px-8 uppercase cursor-pointer bg-white"
    >Структура</button>
    <transition
      name="slide-right"
      mode="out-in"
    >
      <div
        v-click-outside="hide"
        v-if="open"
        class="fixed top-0 right-0 h-full bg-gray-100 p-10 w-64 z-50 bg-white"
      >
        <div class="text-xl mb-4">Проект</div>
        <div
          v-for="page in pages"
          :key="page.id"
          class="cursor-pointer mb-4"
        >
          <div
            @click="setActivePage(page.id)"
            class="border-2 bg-white w-full h-32"
            :class="{'border-black': activePage === page.id}"
          >
          </div>
          <div class="text-xs p-2 uppercase text-gray-700">{{ page.title }}</div>
        </div>
        <div class="w-full text-center">
          <button
            @click="addPage"
            class="text-xl border-2 border-black rounded-full h-16 w-16 mx-auto"
          >+</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      open: false
    }
  },
  computed: {
    ...mapState(['activePage', 'pages'])
  },
  methods: {
    ...mapActions(['setActivePage', 'addPage']),
    hide () {
      this.open = false
    }
  }
}
</script>
