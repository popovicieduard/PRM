<template>
    <div>
        <el-row>
            <el-col :span="24">
                <DashboardMetrics
                :statistics="statistics"
                :loading="loading"
                @changeDate="changeDate"
                @loading="changeLoading"
                />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="my-3">
                <DashboardGraph
                :statistics="graphStats"
                :loading="loading"
                :date="date"
                :key="dateKey"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DashboardMetrics from '@/components/Partner/Dashboard/DashboardMetrics'
import DashboardGraph from '@/components/Partner/Dashboard/DashboardGraph'
import moment from 'moment'
import qs from 'qs'

export default {
    components: {
        DashboardMetrics,
        DashboardGraph
    },
    props: {
        stats: {
            type: Object | null,
            required: true
        },
        graph: {
            type: Array | null,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            graphStats: this.graph,
            statistics: this.stats,
            dateKey: null,
            date: [moment().startOf('month').format(), moment().endOf('month').format()]
        }
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading;
        },
async changeDate(date){
            try {
                this.date = date
                const { data } = await this.$axios.get(`partner/clicks`, {
                    params: {
                        between: date
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                });
                const leads = data.filter(click => click.is_lead == 1 && click.is_active == 1).length
                const clicks = data.length
                const earnings = data.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)
                this.changeLoading()
                this.statistics = {
                    clicks: clicks,
                    leads: leads,
                    earnings: earnings 
                }
                this.graphStats = data
                this.dateKey = moment(date[1]).valueOf() / moment(date[0]).valueOf()
            } catch (error) {
                let _error = error.response.data
                if(_error.constructor === Array){
                    _error.forEach((error) =>{
                    setTimeout(() => {
                        this.$notify.error({
                        title: 'Error',
                        message: error.message,
                        });
                    }, 100);
                    })
                }else{
                    if(this){
                        this.$notify.error({
                            title: 'Error',
                            message: _error.message,
                        });
                    }
                }
            }
        }
    }
}
</script>