import SC from 'socketcluster-client'

const isDef = v => v !== undefined

const addListeners = function () {
  if (isDef(this.$options.socket)) {
    const config = this.$options.socket

    if (config.events) {
      const prefix = config.prefix || ''

      Object.keys(config.events).forEach(e => {
        const cb = config.events[e].bind(this)
        cb.fn = config.events[e] // hook for remove listener
        this.$ws.on(prefix + e, cb)
      })
    }
  }
}

const removeListeners = function () {
  if (isDef(this.$options.socket)) {
    const config = this.$options.socket

    if (config.events) {
      const prefix = config.prefix || ''

      Object.keys(config.events).forEach(e => {
        const cb = config.events[e]
        this.$ws.off(prefix + e, cb)
      })
    }
  }
}

export default {
  install (Vue, opts = {}) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[vue-socketcluster] install')
    }

    const { store, port } = opts

    const socket = SC.connect({ port })

    if (isDef(store)) {
      const moduleName = opts.moduleName || 'ws'
      store.registerModule(moduleName, {
        namespaced: true,
        state: { client: socket }
      })
    }

    Vue.mixin({
      beforeCreate: addListeners,
      beforeDestroy: removeListeners
    })

    Object.defineProperty(Vue.prototype, '$ws', {
      get () { return socket }
    })
  }
}
