<template>
    <el-card class="campaign-table">
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="text-center text-md-left my-1">
                    <span class="h2 text-capitalize">Campaigns</span>
                </el-col>
                <el-col :xs="24" :sm="12" class="text-center text-md-right">
                    <router-link :to="{name: 'advertiser-campaigns-add' }" tag="button" class="el-button el-button--small upb-bg-primary text-white float-right border-0"><i class="el-icon-circle-plus-outline"></i> Add</router-link>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="12">
            <el-col :span="24">
                <el-table-wrapper v-loading="loading" :data="tableData" :columns="columns" :pagination="pagination">
                    <template slot-scope="scope" slot="clicks-slot">
                        <span>{{ getClicks(scope.row.id) | numFormat('0,0') }}</span>
                    </template>
                    <template slot-scope="scope" slot="leads-slot">
                        <span>{{ getLeads(scope.row.id) | numFormat('0,0') }}</span>
                    </template>
                    <template slot-scope="scope" slot="spend-slot">
                        <span class="text-success font-weight-bold">{{ getSpend(scope.row.id) | numFormat('0,0.00') }} $</span>
                    </template>
                    <template slot-scope="scope" slot="title-slot">
                        <router-link :to="{name: 'advertiser-campaigns-campaignId', params: {campaignId: scope.row.id}}" class="text-capitalize" v-if="!scope.row.is_removed">
                            {{ scope.row.title.length > 30 ? scope.row.title.substring(0, 30) + '...' : scope.row.title }}
                        </router-link>
                        <span v-else class="text-capitalize">
                            {{ scope.row.title }}
                        </span>
                    </template>
                    <template slot-scope="scope" slot="active-slot">
                        <el-tag effect="dark" size="mini" :type="scope.row.is_removed ? 'danger' : (scope.row.is_active ? 'success' : 'warning')" :class="{ 'bg-muted': !scope.row.is_active, 'text-capitalize': true }">{{ scope.row.is_removed ? 'removed' : (scope.row.is_active ? 'live' : 'paused') }}</el-tag>
                    </template>
                    <template slot-scope="scope" slot="status-slot"> 
                        <el-tooltip content="Start / Pause Campaign" placement="left" class="float-right" v-if="!scope.row.is_removed">
                            <el-switch
                                :value="getCampaignActiveStatus(scope.row.id)"
                                active-color="#2dce89"
                                @change="changeCampaignActiveStatus(scope.row.id)">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-wrapper>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    props: {
        campaigns: {
            type: Array | null,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            tableData: this.campaigns,
            columns: [
                {
                    prop: 'id', label: 'Campaign ID', width: 130
                }, {
                    prop: 'title', label: 'Title', scopedSlot: 'title-slot'
                }, {
                    prop: 'clicks', label: 'Clicks', width: 140, scopedSlot: 'clicks-slot'
                }, {
                    prop: 'leads', label: 'Leads', width: 140, scopedSlot: 'leads-slot'
                }, {
                    prop: 'spend', label: 'Spend',  scopedSlot: 'spend-slot', width: 140
                }, {
                    prop: 'active', label: 'Status',  scopedSlot: 'active-slot', width: 140
                }, {
                    prop: 'status', label: '', width: 60, scopedSlot: 'status-slot'
                }
                
            ],
            pagination: {
                pageSize: 10,
                layout: ' prev, pager, next',
            },
        }
    },
    methods: {
        getClicks(id){
            let campaign = this.campaigns.find(campaign => campaign.id === id)
            return campaign.__meta__.clicks
        },
        getLeads(id){
            let campaign = this.campaigns.find(campaign => campaign.id === id)
            return campaign.__meta__.leads
        },
        getSpend(id){
            let campaign = this.campaigns.find(campaign => campaign.id === id)
            return campaign.clicks.reduce((a, b) => +a + +b.spend, 0);
        },
        getCampaignActiveStatus(id){
            return this.campaigns.find(campaign => campaign.id === id).is_active ? true : false;
        },
        setCampaignActiveStatus(id, payLoad){
            return this.campaigns.find(campaign => campaign.id === id).is_active = payLoad;
        },
        async changeCampaignActiveStatus(id){

            var campaignStatus = this.getCampaignActiveStatus(id)

            var campaignStatusMessage = campaignStatus ? 'Campaign has been paused' : "Campaign has been started";
            var campaginStatusType = campaignStatus ? 'info' : 'success';

            try {
                this.loading = true;
                await this.$axios.patch(
                    `advertiser/campaign/status/${id}`, {
                        status: !campaignStatus,
                    }
                ).then((data) => {
                    let campaign = data.data

                    this.setCampaignActiveStatus(campaign.id, !campaignStatus)
                    this.$notify({
                        message: campaignStatusMessage,
                        type: campaginStatusType
                    });
                    this.loading = false;
                    
                })
            } catch (error) {
                this.loading = false;
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
        },
    },
}
</script>

<style lang="scss">

</style>