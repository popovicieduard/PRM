<template>
    <div>
        <DashboardStatistics :stats="stats" />
        <el-row :gutter="12">
            <el-col :xs="24" :md="24" :lg="18" class="mb-1">
                <DashboardLatestLeads />
            </el-col>
            <el-col :xs="24" :md="24" :lg="6" class="my-1">
                <DashboardCampaignList />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DashboardStatistics from '@/components/Advertiser/Dashboard/DashboardStatistics';
import DashboardLatestLeads from '@/components/Advertiser/Dashboard/DashboardLatestLeads';
import DashboardCampaignList from '@/components/Advertiser/Dashboard/DashboardCampaignList';

export default {
    scrollToTop: true,
    components: {
        DashboardStatistics,
        DashboardLatestLeads,
        DashboardCampaignList,
    },
    data(){
        return {
            stats:{
                clicks: 50,
                leads: 5,
                spend: 20,
            }
        }
    },
}
</script>
