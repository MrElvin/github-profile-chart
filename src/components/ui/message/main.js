import Vue from 'vue'
import Main from './main.vue'

const MessageConstructor = Vue.extend(Main)
let instance = null

const Message = (options) => {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  return instance.vm
}

['success', 'info', 'warning', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default Message
