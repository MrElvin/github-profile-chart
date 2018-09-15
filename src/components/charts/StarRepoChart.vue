<template lang="pug">
  #star-repo-chart-container
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  name: 'StarRepoChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  methods: {
    convertData () {
      const repos = this.chartData
      return repos.map((v, i) => {
        return {
          repoName: v.node.name,
          repoUrl: v.node.url,
          repoStars: v.node.stargazers.totalCount
        }
      })
        .sort((a, b) => b.repoStars - a.repoStars)
        .slice(0, 10)
    },
    initChart () {
      const colorArr = ['#BCEBF0', '#FEEDD1', '#E5DFFF', '#C7FAED', '#FED9DE']
      const chart = new Chart({
        container: 'star-repo-chart-container',
        forceFit: true,
        height: 300,
        padding: { left: 240 }
      })
      chart.legend('repoName', {
        useHtml: true,
        offsetX: 30,
        containerTpl: '<div class="g2-legend" style="height:auto;width:auto;font-size: 12px;line-height:20px;color:rgb(140,140,140);">' +
          '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;text-align=left;"></ul>' +
        '</div>',
        itemTpl: (value, color, checked, index) => {
          checked = checked ? 'checked' : 'unChecked'
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color +
            ' style="cursor: pointer;margin-bottom:5px;display:block">' +
            '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:8px;background-color:' + color + ';"></i>' +
            '<span class="g2-legend-text">' + value + '</span>' +
            '</li>'
        }
      })
      chart.tooltip({ showTitle: false })
      chart.source(this.convertData())
      chart.coord('theta', { radius: 0.9 })
      chart.intervalStack().position('repoStars').color('repoName', colorArr)
        .tooltip('repoName*repoStars', (repoName, repoStars) => ({ name: repoName, value: `${repoStars} Stars` }))
        .style({ lineWidth: 1, stroke: '#fff' })
      chart.on('interval:click', ev => open(ev.data._origin.repoUrl))
      chart.render()
    }
  },
  mounted () {
    try {
      this.initChart()
    } catch (e) {
      this.$msg.warning('Missing necessary data, may not display the chart accurately')
    }
  }
}
</script>
