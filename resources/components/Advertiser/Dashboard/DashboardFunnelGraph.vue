<template>
    <el-card class="funnel-graph" id="funnel-graph">
        <div slot="header">
            <span class="h2 text-capitalize">Funnel Graph</span>
        </div>
        <div v-if="loading" class="my-2">
            <content-loader
                    :height="120"
                    :speed="2"
                    primaryColor="#9814fd"
                    secondaryColor="#f32cfb"
                >
                <rect x="55" y="2" rx="1" ry="1" width="15" height="5" /> 
                <rect x="50" y="12" rx="1" ry="1" width="25" height="5" />

                <rect x="150" y="2" rx="1" ry="1" width="15" height="5" /> 
                <rect x="145" y="12" rx="1" ry="1" width="25" height="5" />

                <rect x="245" y="2" rx="1" ry="1" width="15" height="5" /> 
                <rect x="240" y="12" rx="1" ry="1" width="25" height="5" />

                <rect x="340" y="2" rx="1" ry="1" width="15" height="5" /> 
                <rect x="325" y="12" rx="1" ry="1" width="45" height="5" />

                <rect x="10" y="30" rx="1" ry="1" width="380" height="90" />
            </content-loader>
        </div>
        <div v-else class="my-2">
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
        statistics: {
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
            [this.statistics.spend],[this.statistics.clicks],[this.statistics.leads],[(this.clicks ? this.statistics.leads / this.statistics.clicks * 100 : 0)]
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