<template>
    <div>
        <el-card class="statistics-header" shadow="">
            <el-row>
                <el-col :xs="24" :sm="12" class="text-center text-md-left my-1">
                    <span class="h2 text-capitalize">Partner - <span class="text-primary">{{ getPartnerId() }}</span> - Statistics</span>
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
                <template slot-scope="scope" slot="campaign-id-slot">
                    <router-link :to="{name: 'advertiser-statistics-campaign-campaignId', params: {campaignId: scope.row.campaign_id}}" class="text-capitalize">
                        {{scope.row.campaign_id }}
                    </router-link>
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
import qs from 'qs'

export default {
    props: {
        leads: {
            type: Array | null,
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
                    prop: 'id', label: 'Lead ID', wdith: 100, scopedSlot: 'lead-id-slot'
                }, {
                    prop: 'campaign_id', label: 'Campaign ID', width: 280, scopedSlot: 'campaign-id-slot' ,
                }, {
                    prop: 'cost', label: 'Cost', width: 80, scopedSlot: 'cost-slot',
                }, {
                    prop: 'ip_address', label: 'IP', width: 120
                }, {
                    prop: 'created_at', label: 'Date', width: 180, sortable: true,
                }
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
        getPartnerId(){
            return parseInt(this.$route.params.partnerId)
        },
        async changeDateRange(){
            try {
                this.loading = true;
                await this.$axios.get('advertiser/clicks', {
                    params: {
                        between: this.currentDate,
                        partner: this.getPartnerId()
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then((data) => {
                    let leads = data.data.filter(click => click.is_lead == 1 && click.is_active == 1)
                    this.leadTableData = leads
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

