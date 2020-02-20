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
import _ from 'lodash'

export default {
  props: {
    statistics: {
      type: Object | null,
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
          data: []
        },
        {
          name: "Leads",
          data: []
        },
        {
          name: "Earnings",
          data: []
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
  created() {
    _.map(this.grouped, (element, index) => {
      var clicks = element.length
      var leads = element.filter(click => click.is_lead == 1 && click.is_active == 1).length
      var earnings = element.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)

      this.series[0].data.push(clicks)
      this.series[1].data.push(leads)
      this.series[2].data.push(earnings.toFixed(2))
    })
  },
  computed: {
    grouped(){
      return _.groupBy(this.statistics, click => moment(click.created_at).format('YYYY-MM-DD'))
    },
    getClicks(){
      console.log(statistics)
    }
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