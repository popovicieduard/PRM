<template>
    <div>
    <el-card class="statistics-header" shadow="">
        <el-row>
            <el-col :xs="24" :sm="12" class="text-center text-md-left my-1">
                <span class="h2 text-capitalize">Campaign - <span class="text-primary">{{ getCampaignId() }}</span> - Statistics</span>
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
                <router-link :to="{name: 'advertiser-statistics-partner-partnerId', params: {partnerId: scope.row.user_id}}" class="text-capitalize">
                    {{ scope.row.user_id }}
                </router-link>
            </template>
            <template slot-scope="scope" slot="cost-slot">
                <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
            </template>
            <template slot-scope="scope" slot="active-slot">
                <el-tag effect="dark" size="mini" :type="scope.row.is_active ? 'success' : 'danger' " class="text-capitalize">{{ scope.row.is_active ? 'active' : 'cancelled' }}</el-tag>
            </template>
        </el-table-wrapper>
    </el-card>
    <el-card class="my-3" shadow="">
        <div slot="header">
            <h2>Partners</h2>
        </div>
        <table v-loading="loading" class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition ll-table mb-5">
            <thead class="border-bottom">
                <tr>
                    <th scope="col"><div class="cell">Partner ID</div></th>
                    <th scope="col"><div class="cell">Clicks</div></th>
                    <th scope="col"><div class="cell">Leads</div></th>
                    <th scope="col"><div class="cell">Cost</div></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="partner in getPartners(partnerTableData)" :key="partner[0]">
                    <td><div class="cell">
                        <router-link :to="{name: 'advertiser-statistics-partner-partnerId', params: {partnerId: getPartnerId(partner)}}" class="text-capitalize">
                            {{ getPartnerId(partner) }}
                        </router-link>
                    </div></td>
                    <td><div class="cell">{{getPartnerClicks(partner)}}</div></td>
                    <td><div class="cell">{{getPartnerLeads(partner)}}</div></td>
                    <td><div class="cell text-success font-weight-bold">{{getPartnerSpend(partner) | numFormat('0,0.00')}} $</div></td>
                </tr>
            </tbody>
        </table>
    </el-card>
    </div>
</template>

<script>
import moment from 'moment'
import qs from 'qs'
import _ from 'lodash'

export default {
    props: {
        leads: {
            type: Array | null,
            required: true
        },
        partners: {
            type: Object | null,
            required: true
        },
    },
    data() {
        return {
            loading: false,
            currentDate: [moment().startOf('month').format(), moment().endOf('month').format()],
            leadTableData: this.leads,
            leadColumns: [
                {
                    prop: 'id', label: 'Lead / Click ID', scopedSlot: 'lead-id-slot'
                }, {
                    prop: 'partner_id', label: 'Partner ID', scopedSlot: 'partner-id-slot',
                }, {
                    prop: 'cost', label: 'Cost', scopedSlot: 'cost-slot',
                }, {
                    prop: 'ip_address', label: 'IP', 
                }, {
                    prop: 'created_at', label: 'Date', width: 180, sortable: true,
                }, {
                    prop: 'active', label: 'Status', width: 100, scopedSlot: 'active-slot', sortable: true,
                },
            ],
            partnerTableData: this.partners,
            pagination: {
                pageSize: 10,
                layout: ' prev, pager, next',
            },
            pickerOptions: {
                shortcuts: [
                     {
                        text: 'Today',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('day').format(), moment().endOf('day').format()]);
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'days').startOf('day').format(), moment().subtract(1, 'days').endOf('day').format()]);
                        }
                    }, {
                        text: 'This month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('month').format(), moment().endOf('month').format()]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'months').startOf('month').format(), moment().subtract(1, 'months').endOf('month').format()]);
                        }
                    }
                ]
            },
        }
    },
    methods: {
        getCampaignId(){
            return parseInt(this.$route.params.campaignId)
        },
        getPartners(partners){
            return Object.entries(partners)
        },
        getPartnerId(array){
            return array[0]
        },
        getPartnerClicks(array){
            return array[1].length
        },
        getPartnerLeads(array){
            return array[1].filter(click => click.is_lead == 1).length
        },
        getPartnerSpend(array){
            return array[1].filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)
        },
        async changeDateRange(){
            try {
                this.loading = true;
                await this.$axios.get('advertiser/clicks', {
                    params: {
                        between: this.currentDate,
                        campaign: this.getCampaignId()
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then((data) => {
                    let clicks = data.data
                    this.leadTableData = clicks
                    const grouped = _.groupBy(clicks, click => click.user_id);
                    this.partnerTableData = grouped
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

