/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#00d54b',
          secondary: '#222222',
        },
      },
    },
  },
})
