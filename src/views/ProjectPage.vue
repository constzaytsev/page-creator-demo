<template>
  <div class="relative">
    <div ref="page"></div>
    <div
      v-if="!childrenLength"
      class="absolute flex w-full h-screen items-center justify-center"
    >
      <div class="text-center">
        <div class="mb-2 text-gray-500">Cтраница {{ activePageDetails.title }}</div>
        <div class="text-xl text-gray-800">Блоков нет</div>
      </div>
    </div>
    <button
      @click="open = true"
      class="fixed left-0 bottom-0 ml-4 mb-4 z-40 rounded-lg text-white py-4 px-8 uppercase bg-indigo-600 cursor-pointer"
    >Добавить блок</button>

    <transition
      name="slide-left"
      mode="out-in"
    >
      <div
        v-if="open"
        v-click-outside="hide"
        class="fixed top-0 left-0 h-screen p-10 w-64 z-50 bg-gray-100"
      >

        <div class="text-xl mb-4">Доступные блоки</div>

        <div
          @click="addTextBlock1"
          class="border-2 w-full h-32 cursor-pointer mb-6 bg-white"
        >
          <div class="text-sm p-2 uppercase text-gray-700">Блок 1</div>
        </div>

        <div
          @click="addTextBlock2"
          class="border-2 w-full h-32 cursor-pointer mb-6 bg-white"
        >
          <div class="text-sm p-2 uppercase text-gray-700">Блок 2</div>
        </div>

      </div>
    </transition>

  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'
import Vue from 'vue'
import TextBlock1 from '@/components/TextBlock1'
import TextBlock2 from '@/components/TextBlock2'

export default {
  name: 'ProjectPage',
  data () {
    return {
      open: false,
      childrenLength: 0
    }
  },
  computed: {
    ...mapState(['activePage', 'activePageDetails']),
    ...mapGetters(['activePageDetails'])
  },
  created () {
    this.setActivePage(+this.$route.params.pageId)
  },
  mounted () {
    const targetNode = this.$refs.page
    const config = { attributes: false, childList: true, subtree: false }
    const callback = () => {
      this.childrenLength = this.$children.length
    }
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  },
  methods: {
    ...mapMutations(['setActivePage']),
    addTextBlock1 () {
      const R = Vue.extend(TextBlock1)
      const block = new R({
        parent: this
      }).$mount()
      this.$refs.page.appendChild(block.$el)
    },
    addTextBlock2 () {
      const R = Vue.extend(TextBlock2)
      const block = new R({
        parent: this
      }).$mount()
      this.$refs.page.appendChild(block.$el)
    },
    hide () {
      this.open = false
    }
  }
}
</script>
