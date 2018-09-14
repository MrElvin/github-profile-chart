import Vue from 'vue'
import Main from './main.vue'

const LoadingContructor = Vue.extend(Main)

const getStyle = (dom, pseudoElt, attr) => getComputedStyle(dom, pseudoElt).getPropertyValue(attr)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    Vue.nextTick(() => {
      el.originalPosition = getStyle(el, null, 'position')
      el.originalOverflow = getStyle(el, null, 'overflow')
      if (binding.modifiers.fullscreen) {
        insertDom(document.body, el, binding)
      } else {
        insertDom(el, el, binding)
      }
    })
  } else {
    el.instance.$on('after-leave', () => {
      if (binding.modifiers.fullscreen) {
        document.body.style.overflow = el.originalOverflow
        document.body.style.position = el.originalPosition
      } else {
        el.style.overflow = el.originalOverflow
        el.style.position = el.originalPosition
      }
    })
    el.instance.visible = false
  }
}

const insertDom = (parent, el) => {
  if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
    parent.style.position = 'relative'
  }
  if (el.originalOverflow !== 'hidden') {
    parent.style.overflow = 'hidden'
  }
  parent.appendChild(el.loading)
  Vue.nextTick(() => {
    el.instance.visible = true
  })
  el.domInserted = true
}
export default {
  install (Vue) {
    Vue.directive('loading', {
      bind (el, binding) {
        const loading = new LoadingContructor({
          el: document.createElement('div'),
          data: {
            fullscreen: !!binding.modifiers.fullscreen
          }
        })
        el.instance = loading
        el.loading = loading.$el
        binding.value && toggleLoading(el, binding)
      },
      update (el, binding) {
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },
      unbind (el, binding) {
        if (el.domInserted === true) {
          el.loading &&
          el.loading.parentNode &&
          el.mask.parentNode.removeChild(el.loading)
        }
      }
    })
  }
}
