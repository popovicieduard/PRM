<template>
    <el-card class="funnel-graph" id="funnel-graph">
        <div slot="header">
            <span class="h2 text-capitalize">Funnel Graph</span>
        </div>
        <div v-loading="loading">
            <client-only>
                <vue-funnel-graph v-if="sum > 0 && width != ''" :width="width" :height="height" :labels="labels"
                    :values="values" :colors="colors" :direction="direction"
                    :gradient-direction="gradientDirection"
                    :animated="true" :display-percentage="false"
                ></vue-funnel-graph>
            </client-only>
            <h3 class="text-center font-weight-700 text-muted" v-if="sum <= 0">No Data</h3>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        stats: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true,
        }
    },
    data() {
      return {
          sum: null,
          labels: ['Spend - $', 'Clicks', 'Leads', 'Conversion Rate - %'],
          colors: [
              ['#f32cfb', '#9814fd'], // color set for "Impressions" segment
          ],
          values: [
            [this.stats.spend],[this.stats.clicks],[this.stats.leads],[this.stats.conversionRate]
          ],
          direction: 'horizontal',
          gradientDirection: 'horizontal',
          height: 250,
          width: 0,
          elements: null
      };
    },
    mounted(){
        this.sum = this.values.reduce(function (a,b){
            return a + b
        }, 0);
        var element =  document.getElementById('funnel-graph');
        this.width = element.offsetWidth - 100;
    }
}
</script>

<style lang="scss">
    .funnel-graph{
        .label__value{
            font-size: 1.1rem !important;
            color: #000 !important;
            font-weight: 600 !important;
        }

        .label__title{
            font-size: 0.85rem !important;
        }
        .label__segment-percentages{
            display: none !important;
        }
        .el-card__body{
            text-align: center;
        }
    }
</style>