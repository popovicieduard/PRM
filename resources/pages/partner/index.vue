<template>
    <div>
        <DashboardStatistics :stats="stats" />
        <el-row :gutter="12">
            <el-col :span="24" class="mb-1">
                <DashboardLatestLeads />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DashboardStatistics from '@/components/Partner/Dashboard/DashboardStatistics';
import DashboardLatestLeads from '@/components/Partner/Dashboard/DashboardLatestLeads';

export default {
    components: {
        DashboardStatistics,
        DashboardLatestLeads,
    },
    data(){
        return {
            stats:{
                clicks: 50,
                leads: 5,
                earnings: 20,
            }
        }
    },
}
</script>
