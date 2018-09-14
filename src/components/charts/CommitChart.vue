<template lang="pug">
  #commit-chart-container
</template>

<script>
import { Chart } from '@antv/g2'

export default {
  name: 'CommitChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  methods: {
    initChart () {
      const chart = new Chart({
        container: 'commit-chart-container',
        forceFit: true,
        height: 300,
        padding: [20, 40, 50, 40]
      })
      const convertData = this.chartData.map(v => ({
        date: v.date + '-01',
        count: v.count
      }))
      chart.source(convertData, {
        date: {
          type: 'time',
          mask: 'YYYY-MM'
        }
      })
      chart.axis('date', {
        label: {
          textStyle: {
            fontSize: '11'
          },
          formatter: val => {
            return val.substring(0, 7)
          }
        }
      })
      chart.tooltip({
        showTitle: false,
        crosshairs: {
          type: 'cross',
          style: {
            stroke: '#2EBECF',
            strokeOpacity: 0.5,
            lineWidth: 1,
            lineDash: [3, 3]
          }
        }
      })
      const tooltipMap = (date, count) => ({ name: date, value: `${count} Commits` })
      chart.area().position('date*count').color('#33D3E1').shape('smooth').tooltip('date*count', tooltipMap)
      chart.line().position('date*count').color('#33D3E1').shape('smooth').tooltip('date*count', tooltipMap)
      chart.point().position('date*count').color('#2EBECF').size(4).shape('circle').opacity(0.5).tooltip('date*count', tooltipMap)
      chart.render()
    }
  },
  mounted () {
    try {
      this.initChart()
    } catch (e) {
      this.$msg.warning('缺少必要数据，可能会无法准确显示图表')
    }
  }
}
</script>
