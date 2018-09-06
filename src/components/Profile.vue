<template lang="pug">
  div(class="profile-container").
    {{userName}}
    {{userProfile}}
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      userName: this.$route.params.userName,
      userProfile: ''
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    getUserData () {
      this.$http.get(`/api/userInfo/${this.userName}`)
        .then(res => console.log('userData!!', res))
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

