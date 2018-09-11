<template lang="pug">
  .profile-container
    .container(v-if="userInfo !== ''")
      .row
        .col-xl-2
          img.user-avatar(:src="userInfo.userProfile.avatarUrl")
        .col-xl-4.name
          .name-list
            a(:href="userInfo.userProfile.url")
              p.user-login(v-text="userInfo.userProfile.login")
            p.user-name(v-text="userInfo.userProfile.name")
          p.user-bio(v-text="userInfo.userProfile.bio")
        .col-xl-2.col-offset-xl-2.follow
          .follow-count(v-text="userInfo.userProfile.followers.totalCount")
          .follow-label Followers
        .col-xl-2.follow
          .follow-count(v-text="userInfo.userProfile.following.totalCount")
          .follow-label Following
      .row.user-info
        .col-xl-3
          .row.user-info-item
            .col-4
              .user-info-item-icon.yellow
                .iconfont.icon-location
            .col-8
              .user-info-item-label Location
              .user-info-item-value(v-text="userInfo.userProfile.location || 'Unknown'" style="font-size: 16px")
        .col-xl-3
          .row.user-info-item
            .col-4
              .user-info-item-icon.purple
                .iconfont.icon-rili
            .col-8
              .user-info-item-label Join GitHub At
              .user-info-item-value(v-text="userInfo.userProfile.createdAt.substring(0, 10)")
        .col-xl-3
          .row.user-info-item
            .col-4
              .user-info-item-icon.green
                .iconfont.icon-cangku(style="font-size: 24px")
            .col-8
              .user-info-item-label Own Repositories
              .user-info-item-value(v-text="userInfo.userRepos.repositories.totalCount")
        .col-xl-3
          .row.user-info-item
            .col-4
              .user-info-item-icon.red
                .iconfont.icon-tijiao
            .col-8
              .user-info-item-label Contributed Last Year
              .user-info-item-value(v-text="userInfo.userCommits.reduce((v, i) => v + i.count, 0)")
      .row.user-commit-container
        .col-12
          .user-commit-title Contributions in the last year
          commit-chart.commit-chart(:chart-data="userInfo.userCommits")
      .row.chart-row
        .col-md-6
          .normal-chart-title Stars per Repo(top 10)
          star-repo-chart(:chart-data="userInfo.userRepos.repositories.edges")
        .col-md-6
          .normal-chart-title Commits per Repo(top 10)
          commit-repo-chart(:chart-data="userInfo.userRepos.repositories.edges")
      .row.chart-row
        .col-md-6
          .normal-chart-title Repos per Language
          repo-lang-chart(:chart-data="userInfo.userRepos.repositories.edges")
        .col-md-6
          .normal-chart-title Commits per Language
          commit-lang-chart(:chart-data="userInfo.userRepos.repositories.edges")
</template>

<script>
import CommitChart from '@/components/charts/CommitChart'
import StarRepoChart from '@/components/charts/StarRepoChart'
import CommitRepoChart from '@/components/charts/CommitRepoChart'
import RepoLangChart from '@/components/charts/RepoLangChart'
import CommitLangChart from '@/components/charts/CommitLangChart'

export default {
  name: 'Profile',
  data () {
    return {
      userName: this.$route.params.userName,
      userInfo: ''
    }
  },
  methods: {
    async getUserData () {
      const res = await this.$http.get(`/api/userInfo/${this.userName}`)
      if (res.data.success) {
        this.userInfo = res.data.userInfo
        localStorage.setItem(this.userName, JSON.stringify(this.userInfo))
      }
    },
    init () {
      const userInfo = localStorage.getItem(this.userName)
      if (!userInfo) {
        this.getUserData()
      } else {
        this.userInfo = JSON.parse(userInfo)
      }
      this.$emit('changeLoadingListener', false)
      document.title = `${this.userName}'s Github Profile Chart`
    }
  },
  created () {
    this.init()
  },
  components: {
    'commit-chart': CommitChart,
    'star-repo-chart': StarRepoChart,
    'commit-repo-chart': CommitRepoChart,
    'repo-lang-chart': RepoLangChart,
    'commit-lang-chart': CommitLangChart
  }
}
</script>

<style lang="stylus" scoped>
.profile-container
  padding 96px 0 50px 0
  // height 100%
.container
  height 100%
.user-avatar
  width 100%
.name
  display flex
  flex-direction column
  justify-content space-between
  padding-left 32px
  a
    text-decoration none
.user-login,
.user-name,
.user-bio
  text-align left
  color #37DAE7
.user-login
  font-size 36px
  font-weight bold
.user-name
  margin-top 8px
  font-size 24px
  color #A0A0A0
.user-bio
  font-size 18px
  color #A0A0A0
.follow
  display flex
  flex-direction column
  justify-content flex-start
  text-align right
  color #A0A0A0
  .follow-count
    font-size 36px
  .follow-label
    font-size 16px
    font-weight bold
.user-info
  margin-top 32px
.user-info-item
  background #FFF
  box-shadow rgba(0, 0, 0, 0.05) 0px 0px 40px
  height 90px
  margin 0
  text-align left
  .col-4
    padding 20px 20px
  .col-8
    padding 0 8px 0 0px
  .user-info-item-icon
    width 50px
    height 50px
    border-radius 25px
    position relative
    opacity .8
    line-height 50px
    text-align center
    img
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
    .iconfont
      font-size 20px
    &.yellow
      background #FFEDD0
      color #E0AB60
    &.purple
      background #E5E0FF
      color #695CB6
    &.green
      background #C4F9ED
      color #4BCDAD
    &.red
      background #FFD9DE
      color #F1637F
  .user-info-item-label
    font-size 14px
    color #A0A0A0
    font-weight bold
    margin-top 18px
  .user-info-item-value
    margin-top 12px
    font-size 18px
    font-weight bold
    color #39373C
.user-commit-container
  margin-top 48px
.user-commit-title,
.normal-chart-title
  color #33D3E1
  font-weight bold
  font-size 18px
  text-align left
  position relative
  &::after
    content ''
    position absolute
    bottom -10px
    left 0
    right 0
    height 2px
    background #33D3E1
    opacity .5
.commit-chart,
.chart-row
  margin-top 20px
.chart-row > div
  position relative
</style>

<style lang="stylus">
.g2-legend
  left 0 !important
.g2-legend-list
  display flex
  flex-direction column
  align-items flex-start
.g2-legend-list li
  display block !important
</style>
