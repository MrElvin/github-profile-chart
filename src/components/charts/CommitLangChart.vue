<template lang="pug">
  #commit-lang-chart-container
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  name: 'CommitLangChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  methods: {
    convertData () {
      const repos = this.chartData
      const tempObj = {}
      repos.map((v, k) => ({
        repoLang: v.node.primaryLanguage ? v.node.primaryLanguage.name : 'Unknown',
        repoCommits: v.node.defaultBranchRef.target.history.totalCount
      }))
        .forEach(v => {
          if (Object.keys(tempObj).indexOf(v.repoLang) === -1) {
            tempObj[v.repoLang] = v.repoCommits
          } else {
            tempObj[v.repoLang] += v.repoCommits
          }
        })
      return Object.keys(tempObj).map(v => ({ lang: v, commits: tempObj[v] }))
    },
    initChart () {
      const colorArr = ['#BCEBF0', '#FEEDD1', '#E5DFFF', '#C7FAED', '#FED9DE']
      const data = this.convertData()
      const chart = new Chart({
        container: 'commit-lang-chart-container',
        forceFit: true,
        height: 300,
        padding: [20, 0, 20, 0]
      })
      chart.legend('lang', {
        position: 'left-center',
        layout: 'vertical'
      })
      chart.tooltip({ showTitle: false })
      chart.source(data, {
        commits: {
          min: data.sort((a, b) => a.commits - b.commits)[0].commits,
          max: data.sort((a, b) => a.commits - b.commits)[data.length - 1].commits,
          tickCount: 5
        }
      })
      chart.coord('polar', { radius: 0.7 })
      chart.axis('lang', {
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      })
      chart.axis('commits', {
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      })
      chart.line().position('lang*commits').color('#BBEAEE').tooltip(false)
      chart.point().position('lang*commits').color('#BBEAEE').size(4).shape('circle').opacity(.5).style({
        stroke: '#fff',
        lineWidth: 1,
        fillOpacity: 1
      })
        .tooltip('lang*commits', (lang, commits) => ({ name: lang, value: `${commits} Commits` }))
      chart.area().position('lang*commits').color('#33D3E1').tooltip(false)
      chart.render()
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
