<template>
  <div
    @mouseenter="showTools = true"
    @mouseleave="showTools = false"
    class="relative"
  >
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-show="showTools"
        class="absolute flex justify-end top-0 left-0 w-full p-4 z-40"
      >
        <button
          @click="destroy"
          class="text-xs py-1 px-2 bg-yellow-500"
        >Удалить блок</button>
        <button
          @click="moveDown"
          class="ml-2 text-xs py-1 px-2 bg-yellow-500"
        >Переместить ниже</button>
        <button
          @click="moveUp"
          class="ml-2 text-xs py-1 px-2 bg-yellow-500"
        >Переместить выше</button>
      </div>
    </transition>

    <div
      class="w-full flex items-center"
      style="height:500px;"
    >
      <div class="w-1/2 bg-gray-100 bg-image h-full"></div>
      <div class="w-1/2 p-10">
        <div
          ref="title"
          class="header text-4xl mb-3"
        >
          {{ model.header }}
        </div>
        <div
          ref="text"
          class="text"
        >
          {{ model.text }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/autolink'
export default {
  name: 'textblock',
  data () {
    return {
      showTools: false,
      model: {
        header: 'Make something awesome',
        text: 'Book design is the art of incorporating the content, style, format, design, and sequence of the various components of a book into a coherent whole. In the words of Jan Tschichold, "methods and rules upon which it is impossible to improve, have been developed over centuries. To produce perfect books, these rules have to be brought back to life and applied. Front matter, or preliminaries, is the first section of a book, and is usually the smallest section in terms of the number of pages. Each page is counted, but no folio or page number is expressed, or printed, on either display pages or blank pages.'
      }
    }
  },
  async mounted () {
    await this.$nextTick()
    tinymce.init({
      target: this.$refs.text,
      menubar: false,
      inline: true,
      plugins: [
        'link',
        'lists',
        'autolink'
      ],
      toolbar: [
        'bold italic underline | fontsizeselect',
        'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent'
      ],
      valid_elements: 'p[style],strong,em,span[style],a[href],ul,ol,li',
      valid_styles: {
        '*': 'font-size,font-family,color,text-decoration,text-align'
      },
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean'
    })
    tinymce.init({
      target: this.$refs.title,
      menubar: false,
      inline: true,
      toolbar: [],
      valid_elements: 'p[style],strong,em,span[style],a[href],ul,ol,li',
      valid_styles: {
        '*': 'font-size,font-family,color,text-decoration,text-align'
      },
      powerpaste_word_import: 'clean',
      powerpaste_html_import: 'clean'
    })
  },
  methods: {
    destroy () {
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    },
    moveDown () {
      const nextSibling = this.$el.nextSibling
      if (nextSibling) {
        this.$el.parentNode.removeChild(this.$el)
        nextSibling.after(this.$el)
      }
    },
    moveUp () {
      const previousSibling = this.$el.previousSibling
      if (previousSibling) {
        this.$el.parentNode.removeChild(this.$el)
        previousSibling.before(this.$el)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  background: {
    image: url("https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&w=650&dpr=2");
    size: cover;
    position: center center;
  }
}
</style>
