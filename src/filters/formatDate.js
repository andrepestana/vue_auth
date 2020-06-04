import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(value).format('MM/DD/YYYY hh:mm:ss')
  }
})

Vue.filter('formatDate', function(value) {
    if (value) {
      return moment(value).format('MM/DD/YYYY')
    }
  })