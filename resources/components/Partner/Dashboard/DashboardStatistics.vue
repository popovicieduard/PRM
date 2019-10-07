<template>
    <div>
        <el-row>
            <el-col :span="24">
                <DashboardMetrics
                :statistics="statistics"
                :date="date"
                :loading="loading"
                @changeDate="changeDate"
                @loading="changeLoading"
                />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="my-3">
                <DashboardGraph
                :statistics="statistics"
                :date="date"
                :loading="loading"
                :key="dateKey"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import moment from 'moment'
import DashboardMetrics from '@/components/Partner/Dashboard/DashboardMetrics';
import DashboardGraph from '@/components/Partner/Dashboard/DashboardGraph';

export default {
    components: {
        DashboardMetrics,
        DashboardGraph
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
            dateKey: null,
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
                    profit: 50,
                    clicks: 30,
                    leads: 2,
                }
            }
        }
    }
}
</script>