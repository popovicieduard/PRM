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
import moment from 'moment'
import DashboardMetrics from '@/components/Network/Dashboard/DashboardMetrics';
import DashboardNetworkStats from '@/components/Network/Dashboard/DashboardNetworkStats';
import DashboardFunnelGraph from '@/components/Network/Dashboard/DashboardFunnelGraph';

export default {
    components: {
        DashboardMetrics,
        DashboardNetworkStats,
        DashboardFunnelGraph,
    },
    props: {
        stats: {
            type: Object,
            required: true
        },
        networkStats: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            statistics: this.stats,
            networkStatistics: this.networkStats,
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
                    clicks: 50,
                    commisions: 50,
                    clicks: 30,
                    leads: 2,
                }
            }
        }
    }
}
</script>