<template>
  <el-card class="graph" id="graph">
    <div slot="header">
      <span class="h2 text-capitalize">Graph</span>
    </div>
    <div v-if="loading" class="my-2">
      <content-loader
        :height="120"
        :speed="2"
        primaryColor="#9814fd"
        secondaryColor="#f32cfb">

        <rect x="10" y="0" rx="1" ry="1" width="380" height="105" />
      </content-loader>
    </div>
    <div v-else class="my-2">
      <client-only>
        <apexchart :width="width" height="300" type="area" :options="chartOptions" :series="series"></apexchart>
      </client-only>
    </div>
  </el-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    statistics: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    date: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      series: [
        {
          name: "Clicks",
          data: [30, 40, 28, 51, 42, 109, 100,32, 44, 32, 34, 1,]
        },
        {
          name: "Leads",
          data: [11, 32, 45, 32, 34, 52, 41, 32, 32, 25, 61, 2,]
        },
        {
          name: "Earnings",
          data: [61, 12, 85, 62, 44, 22.22, 11,32, 45, 56, 32, 6,]
        },

      ],
      chartOptions: {
        colors: ['#008FFB', '#FEBC3B', '#2dce89'],
        legend: {
            show: false,
        },
        markers: {
            size: 0,
            strokeColors: '#fff',
        },
        fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: ['#008FFB', '#FEBC3B', '#2dce89'],
              shadeIntensity: 0,
              type: 'vertical',
              opacityFrom: 0.6,
              opacityTo: 0,
              stops: [0, 70, 100, 100]
            },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
            curve: "smooth",
            width: 4,
        },
        yaxis: {
          labels: {
            style: {
              fontFamily: 'LLBrown',
            }
          }
        },
        xaxis: {
          type: "category",
          categories: this.graphDateRange(this.date[0], this.date[1]),
          labels: {
            style: {
              fontFamily: 'LLBrown',
            }
          },
        },
        tooltip: {
            enabled: true,
            shared: true,
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: 'LLBrown'
            },
            x: {
                show: true,
                format: 'dd MMM',
                formatter: undefined,
            },
            y: [
              {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toLocaleString();
                  }
                  return y;
                  
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toLocaleString();
                  }
                  return y;
                  
                }
              }, {
                formatter: function (y) {
                  if(typeof y !== "undefined") {
                    return  y.toLocaleString() + " $";
                  }
                  return y;
                  
                }
              }
            ],
        },
      },
      width: 0
    };
  },
  mounted() {
    var element = document.getElementById("graph");
    this.width = element.offsetWidth - 30;
  },
  methods: {
    graphDateRange(startDate, endDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var endDate = moment(endDate);
      while (currentDate <= endDate) {
          dateArray.push( moment(currentDate).format('DD MMM') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
    }
  },
};
</script>

<style lang="scss">
.graph {
  min-height: 450px;

  .apexcharts-xaxistooltip-text{
    font-family: 'LLBrown' !important;
  }

}
</style>