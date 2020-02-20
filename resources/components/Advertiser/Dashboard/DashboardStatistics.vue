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
import moment from 'moment'
import DashboardMetrics from '@/components/Advertiser/Dashboard/DashboardMetrics';
import DashboardFunnelGraph from '@/components/Advertiser/Dashboard/DashboardFunnelGraph';
import qs from 'qs'

export default {
    components: {
        DashboardMetrics,
        DashboardFunnelGraph
    },
    props: {
        stats: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            loading: false,
            statistics: this.stats,
            dateKey: moment().startOf('month').valueOf() / moment().endOf('month').valueOf()
        }
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading;
        },
        async changeDate(date){
            try {
                const { data } = await this.$axios.get(`advertiser/clicks`, {
                    params: {
                        between: date
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                });
                const leads = data.filter(click => click.is_lead == 1 && click.is_active == 1).length
                const clicks = data.length
                const spend = data.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => a + b.cost, 0)
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