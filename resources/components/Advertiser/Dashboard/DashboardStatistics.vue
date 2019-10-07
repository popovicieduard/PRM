<template>
    <div>
        <el-row>
            <el-col :span="24">
                <DashboardMetrics
                :statistics="statistics"
                :date="date"
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
            date: [moment().startOf('month'), moment().endOf('month')],
            dateKey: null
        }
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading;
        },
        changeDate(date){
            if(this.date){
                this.date = date;
                this.dateKey = date[1] / date[0];
                this.statistics = {
                    spend: 50,
                    clicks: 30,
                    leads: 2,
                }
            }
        }
    }
}
</script>