<template>
    <div>
        <el-row>
            <el-col :span="24">
                <DashboardMetrics
                :statistics="statistics"
                @changeDate="changeDate"
                @loading="changeLoading"
                :loading="loading"
                />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <DashboardNetworkStats
                :networkStats="networkStatistics"
                :loading="loading"
                />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="my-3">
                <DashboardFunnelGraph
                :statistics="statistics"
                :loading="loading"
                :key="dateKey"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DashboardMetrics from '@/components/Network/Dashboard/DashboardMetrics';
import DashboardNetworkStats from '@/components/Network/Dashboard/DashboardNetworkStats';
import DashboardFunnelGraph from '@/components/Network/Dashboard/DashboardFunnelGraph';
import moment from 'moment'
import qs from 'qs'


export default {
    components: {
        DashboardMetrics,
        DashboardNetworkStats,
        DashboardFunnelGraph,
    },
    props: {
        stats: {
            type: Object | null,
            required: true
        },
        networkStats: {
            type: Object | null,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            statistics: this.stats,
            networkStatistics: this.networkStats,
            dateKey: null
        }
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading;
        },
        async changeDate(date){
            try {
                const { data } = await this.$axios.get(`network/clicks`, {
                    params: {
                        between: date
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                });
                const leads = data.filter(click => click.is_lead == 1 && click.is_active == 1).length
                const clicks = data.length
                const spend = data.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)
                this.changeLoading()
                this.statistics = {
                    clicks: clicks,
                    leads: leads,
                    spend: spend 
                }
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