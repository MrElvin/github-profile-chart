<template lang="pug">
  #commit-repo-chart-container
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  name: 'CommitRepoChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  methods: {
    convertData () {
      const repos = this.chartData.filter(v => v.node.defaultBranchRef !== null)
      return repos.map((v, i) => {
        return {
          repoName: v.node.name,
          repoUrl: v.node.url,
          repoCommits: v.node.defaultBranchRef.target.history.totalCount
        }
      })
        .sort((a, b) => b.repoCommits - a.repoCommits)
        .slice(0, 10)
    },
    initChart () {
      const colorArr = ['#BCEBF0', '#FEEDD1', '#E5DFFF', '#C7FAED', '#FED9DE']
      const chart = new Chart({
        container: 'commit-repo-chart-container',
        forceFit: true,
        height: 300,
        padding: [0, -140, 0, 0]
      })
      chart.legend('repoName', {
        useHtml: true,
        position: 'left-center',
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
      chart.coord('theta', { radius: 0.7 })
      chart.intervalStack().position('repoCommits').color('repoName', colorArr)
        .tooltip('repoName*repoCommits', (repoName, repoCommits) => ({ name: repoName, value: `${repoCommits} Commits` }))
        .style({ lineWidth: 1, stroke: '#fff' })
      chart.on('interval:click', ev => open(ev.data._origin.repoUrl))
      chart.render()
    }
  },
  mounted () {
    try {
      this.initChart()
    } catch (e) {
      console.log(e)
      this.$msg.warning('缺少必要数据，可能会无法准确显示图表')
    }
  }
}
</script>
