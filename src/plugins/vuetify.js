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
import { VDataTable } from 'vuetify/labs/VDataTable'
export default createVuetify({
  components: {
    VDataTable,
  },
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
