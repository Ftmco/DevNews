export { default as CoreAppBar } from '../..\\components\\core\\AppBar.vue'
export { default as CoreBottomNavigation } from '../..\\components\\core\\BottomNavigation.vue'
export { default as CoreNavigationDrawer } from '../..\\components\\core\\NavigationDrawer.vue'
export { default as CoreTheLoading } from '../..\\components\\core\\TheLoading.vue'
export { default as CoreTheSnackbar } from '../..\\components\\core\\TheSnackbar.vue'
export { default as AccountBase } from '../..\\components\\account\\AccountBase.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
