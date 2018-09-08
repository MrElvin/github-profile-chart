<template lang="pug">
  #repo-lang-chart-container
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  name: 'RepoLangChart',
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
      repos.map(v => v.node.primaryLanguage ? v.node.primaryLanguage.name : 'Unknown')
        .forEach(lang => {
          if (Object.keys(tempObj).indexOf(lang) === -1) {
            tempObj[lang] = 1
          } else {
            tempObj[lang]++
          }
        })
      return Object.keys(tempObj).map(v => ({ lang: v, count: tempObj[v] }))
    },
    initChart () {
      const colorArr = ['#BCEBF0', '#FEEDD1', '#E5DFFF', '#C7FAED', '#FED9DE']
      const chart = new Chart({
        container: 'repo-lang-chart-container',
        forceFit: true,
        height: 300,
        padding: [0, -140, 0, 140]
      })
      chart.legend('lang', {
        useHtml: true,
        position: 'left-center',
        offsetX: 30,
        containerTpl: '<div class="g2-legend" style="height:auto;width:auto;font-size: 12px;line-height:20px;color:rgb(140,140,140);">' +
          '<ul class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;text-align=left;"></ul>' +
        '</div>',
        itemTpl: (value, color, checked, index) => {
          checked = checked ? 'checked' : 'unChecked';
          return '<li class="g2-legend-list-item item-' + index + ' ' + checked +
            '" data-value="' + value + '" data-color=' + color +
            ' style="cursor: pointer;margin-bottom:5px;display:block">' +
            '<i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:8px;background-color:' + color + ';"></i>' +
            '<span class="g2-legend-text">' + value + '</span>' +
            '</li>';
        },
      })
      chart.tooltip({ showTitle: false })
      chart.source(this.convertData())
      chart.coord('polar', { innerRadius: 0.2 })
      chart.axis(false)
      chart.interval().position('lang*count').color('lang', colorArr)
        .tooltip('lang*count', (lang, count) => ({ name: lang, value: `${count} Repos` }))
        .style({ lineWidth: 1, stroke: '#fff' })
      chart.render()
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
