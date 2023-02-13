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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    breakpoint: {
      thresholds: {
        xs: 340,
        sm: 540,
        md: 800,
        lg: 1280,
      }
    },
    themes: {
      light: {
        colors: {
          primary: '#539D57',
          secondary: '#333333',
        },
      },
    },
  },
})
