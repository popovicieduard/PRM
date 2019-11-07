<template>
    <div>
        <DashboardStatistics :stats="stats" :networkStats="networkStats"/>
        <el-row :gutter="12" class="d-none">
            <el-col :span="16" class="mb-1">
                <DashboardTopCampaigns />
            </el-col>
            <el-col :span="8" class="mb-1">
                <DashboardTopPartners />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DashboardStatistics from '@/components/Network/Dashboard/DashboardStatistics';
import DashboardTopCampaigns from '@/components/Network/Dashboard/DashboardTopCampaignsList';
import DashboardTopPartners from '@/components/Network/Dashboard/DashboardTopPartnersList';

export default {
    components: {
        DashboardStatistics,
        DashboardTopCampaigns,
        DashboardTopPartners
    },
    data(){
        return {
            stats:{
                clicks: 20,
                commisions: 50,
                leads: 5,
            },
            networkStats: {
                advertisers: 50,
                partners: 150,
                active_campaigns: 20
            }
        }
    },
}
</script>
