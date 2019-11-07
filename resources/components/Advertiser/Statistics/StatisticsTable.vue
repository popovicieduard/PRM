<template>
    <div>
    <el-card class="statistics-header" shadow="">
        <el-row>
            <el-col :xs="24" :sm="12" class="text-center text-md-left my-1">
                <span class="h2 text-capitalize">Statistics</span>
            </el-col>
            <el-col :xs="24" :sm="12" class="text-center text-md-right upb-date-range">
                <el-date-picker
                v-model="currentDate"
                type="daterange"
                align="right"
                unlink-panels
                start-placeholder="Start date"
                end-placeholder="End date"
                format="dd MMM yyyy"
                :picker-options="pickerOptions"
                @change="changeDateRange">
                </el-date-picker>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="my-3" shadow="">
        <div slot="header">
            <h2>Leads</h2>
        </div>
        <el-table-wrapper v-loading="loading" :data="leadTableData" :columns="leadColumns" :pagination="pagination">
            <template slot-scope="scope" slot="lead-id-slot">
                <router-link :to="{name: 'advertiser-statistics-lead-leadId', params: {leadId: scope.row.id}}" class="text-capitalize">
                    {{ scope.row.id }}
                </router-link>
            </template>
            <template slot-scope="scope" slot="partner-id-slot">
                <router-link :to="{name: 'advertiser-statistics-partner-partnerId', params: {partnerId: scope.row.partner_id}}" class="text-capitalize">
                    {{ scope.row.partner_id }}
                </router-link>
            </template>
            <template slot-scope="scope" slot="campaign-name-slot">
                <router-link :to="{name: 'advertiser-statistics-campaign-campaignId', params: {campaignId: scope.row.campaign_id}}" class="text-capitalize">
                    {{ scope.row.campaign_name.length > 30 ? scope.row.campaign_id + ' / ' + scope.row.campaign_name.substring(0, 30) + '...' : scope.row.campaign_id + ' / ' + scope.row.campaign_name }}
                </router-link>
            </template>
            <template slot-scope="scope" slot="cost-slot">
                <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
            </template>
            <template slot-scope="scope" slot="active-slot">
                <el-tag effect="dark" size="mini" :type="scope.row.active ? 'success' : 'danger' " class="text-capitalize">{{ scope.row.active ? 'active' : 'cancelled' }}</el-tag>
            </template>
        </el-table-wrapper>
    </el-card>
    <el-card class="my-3" shadow="">
        <div slot="header">
            <h2>Partners</h2>
        </div>
        <el-table-wrapper v-loading="loading" :data="partnersTableData" :columns="partnersColumns" :pagination="pagination">
            <template slot-scope="scope" slot="partner-id-slot">
                <router-link :to="{name: 'advertiser-statistics-partner-partnerId', params: {partnerId: scope.row.id}}" class="text-capitalize">
                    {{ scope.row.id }}
                </router-link>
            </template>
            <template slot-scope="scope" slot="clicks-slot">
                <span>{{ scope.row.clicks | numFormat('0,0') }}</span>
            </template>
            <template slot-scope="scope" slot="leads-slot">
                <span>{{ scope.row.leads | numFormat('0,0') }}</span>
            </template>
            <template slot-scope="scope" slot="cost-slot">
                <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
            </template>
        </el-table-wrapper>
    </el-card>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        leads: {
            type: Array,
            required: true
        },
        partners: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            loading: false,
            currentDate: [moment().startOf('month'), moment().endOf('month')],
            leadTableData: this.leads,
            leadColumns: [
                {
                    prop: 'id', label: 'Lead ID', wdith: 100, scopedSlot: 'lead-id-slot'
                }, {
                    prop: 'click_id', label: 'Click ID',
                }, {
                    prop: 'partner_id', label: 'Partner ID', scopedSlot: 'partner-id-slot',
                }, {
                    prop: 'campaign_name', label: 'Campaign ID / Name', width: 280, scopedSlot: 'campaign-name-slot' ,
                }, {
                    prop: 'cost', label: 'Cost', width: 80, scopedSlot: 'cost-slot',
                }, {
                    prop: 'ip_address', label: 'IP', width: 120
                }, {
                    prop: 'created_at', label: 'Date', width: 180, sortable: true,
                }, {
                    prop: 'active', label: 'Status', width: 100, scopedSlot: 'active-slot', sortable: true,
                },
            ],
            partnersTableData: this.partners,
            partnersColumns: [
                {
                    prop: 'id', label: 'Partner ID', scopedSlot: 'partner-id-slot', sortable: true,
                }, {
                    prop: 'clicks', label: 'Clicks', scopedSlot: 'clicks-slot', sortable: true,
                }, {
                    prop: 'leads', label: 'Leads', scopedSlot: 'leads-slot', sortable: true,
                }, {
                    prop: 'cost', label: 'Cost', width: 140,  scopedSlot: 'cost-slot', sortable: true,
                },
            ],
            pagination: {
                pageSize: 10,
                layout: ' prev, pager, next',
            },
            pickerOptions: {
                shortcuts: [
                     {
                        text: 'Today',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('day'), moment().endOf('day')]);
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')]);
                        }
                    }, {
                        text: 'This month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('month'), moment().endOf('month')]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')]);
                        }
                    }
                ]
            },
        }
    },
    created(){
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    },
    methods: {
        changeDateRange(){
            this.loading = true;
            setTimeout(() => {
                this.loading = false;                
            }, 2000);
        },
    },
}
</script>

<style lang="scss">
    .el-loading-mask{
        z-index: 1999 !important;
    }
    .statistics-header{
        position: sticky !important;
        position: -webkit-sticky !important;
        top: -20px !important;
        z-index: 2000;

        .upb-date-range{
            z-index: 20;
        }
    }


</style>