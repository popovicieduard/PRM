<template>
    <div>
        <el-row>
            <el-col :span="24">
                <DashboardStatistics :stats="stats" @loading="changeLoading" :loading="loading"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="my-3">
                <DashboardFunnelGraph :stats="stats" :loading="loading" />
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :xs="24" :md="24" :lg="18" class="my-1">
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
import DashboardFunnelGraph from '@/components/Advertiser/Dashboard/DashboardFunnelGraph';

export default {
    scrollToTop: true,
    components: {
        DashboardStatistics,
        DashboardLatestLeads,
        DashboardCampaignList,
        DashboardFunnelGraph
    },
    data(){
        return {
            loading: false,
            stats:{
                clicks: 50,
                leads: 5,
                spend: 20,
                conversionRate: 3
            }
        }
    },
    methods: {
        changeLoading(){
            this.loading = !this.loading;
        }
    }
}
</script>
