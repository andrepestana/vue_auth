import Vue from 'vue'

Vue.filter('yesOrNo', function(value) {
  if (value) {
    return 'Yes'
  } else {
      return 'No'
  }
})