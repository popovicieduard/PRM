<template>
    <el-card class="campaign-table">
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="text-center text-md-left mt-2">
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
                        <span>{{ scope.row.clicks | numFormat('0,0') }}</span>
                    </template>
                    <template slot-scope="scope" slot="leads-slot">
                        <span>{{ scope.row.leads | numFormat('0,0') }}</span>
                    </template>
                    <template slot-scope="scope" slot="spend-slot">
                        <span class="text-success font-weight-bold">{{ scope.row.spend | numFormat('0,0.00') }} $</span>
                    </template>
                    <template slot-scope="scope" slot="name-slot">
                        <router-link :to="{name: 'advertiser-campaigns-campaignId', params: {campaignId: scope.row.id}}" class="text-capitalize" v-if="!scope.row.removed">
                            {{ scope.row.name.length > 30 ? scope.row.name.substring(0, 30) + '...' : scope.row.name }}
                        </router-link>
                        <span v-else class="text-capitalize">
                            {{ scope.row.name }}
                        </span>
                    </template>
                    <template slot-scope="scope" slot="active-slot">
                        <el-tag effect="dark" size="mini" :type="scope.row.removed ? 'danger' : (scope.row.active ? 'success' : '')" :class="{ 'bg-muted': !scope.row.active, 'text-capitalize': true }">{{ scope.row.removed ? 'removed' : (scope.row.active ? 'live' : 'paused') }}</el-tag>
                    </template>
                    <template slot-scope="scope" slot="status-slot"> 
                        <el-tooltip content="Start / Pause Campaign" placement="left" class="float-right" v-if="scope.row.tested && !scope.row.removed">
                            <el-switch
                                :value="scope.row.active"
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
            type: Array,
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
                    prop: 'name', label: 'Name', scopedSlot: 'name-slot'
                }, {
                    prop: 'clicks', label: 'Clicks', width: 140, scopedSlot: 'clicks-slot'
                }, {
                    prop: 'leads', label: 'Leads', width: 140, scopedSlot: 'leads-slot'
                }, {
                    prop: 'spend', label: 'Spend',  scopedSlot: 'spend-slot', width: 140
                }, {
                    prop: 'active', label: 'Status',  scopedSlot: 'active-slot', width: 140
                }, {
                    prop: 'tested', label: '', width: 1
                }, {
                    prop: 'status', label: '', width: 60, scopedSlot: 'status-slot'
                }
                
            ],
            pagination: {
                pageSize: 5,
                layout: ' prev, pager, next',
            },
        }
    },
    methods: {
        getCampaignActiveStatus(id){
            return this.campaigns.find(campaign => campaign.id === id).active;
        },
        setCampaignActiveStatus(id, payLoad){
            return this.campaigns.find(campaign => campaign.id === id).active = payLoad;
        },
        changeCampaignActiveStatus(id){
            this.$nextTick(() => {
                this.loading = true;

                var campaignStatus = this.getCampaignActiveStatus(id)

                var campaignStatusMessage = campaignStatus ? 'Campaign has been paused' : "Campaign has been started";
                var campaginStatusType = campaignStatus ? 'info' : 'success';

                setTimeout(() => {
                    this.setCampaignActiveStatus(id, !campaignStatus)
                    this.$notify({
                        message: campaignStatusMessage,
                        type: campaginStatusType
                    });
                    this.loading = false;
                }, 1000)

            })
        },
    },
}
</script>

<style lang="scss">

</style>