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
                {{ scope.row.id }}
            </template>
            <template slot-scope="scope" slot="campaign-name-slot">
                <span class="text-capitalize">
                    {{ scope.row.campaign.title.length > 30 ? scope.row.campaign_id + ' / ' + scope.row.campaign.title.substring(0, 30) + '...' : scope.row.campaign_id + ' / ' + scope.row.campaign.title }}
                </span>
            </template>
            <template slot-scope="scope" slot="earnings-slot">
                <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
            </template>
            <template slot-scope="scope" slot="country-slot">
                <el-tooltip class="item" effect="dark" :content="scope.row.country.name" placement="top">
                    <span><country-flag :country='scope.row.country.code' size='normal'/></span>
                </el-tooltip>
            </template>
            <template slot-scope="scope" slot="device-slot">
                <el-tag size="small">
                    <span class="font-weight-bold text-capitalize">{{ scope.row.device.name }}</span>
                </el-tag>
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
                    prop: 'campaign_name', label: 'Campaign ID / Name', width: 280, scopedSlot: 'campaign-name-slot' ,
                }, {
                    prop: 'cost', label: 'Earnings', scopedSlot: 'earnings-slot',
                }, {
                    prop: 'country', label: 'Country', scopedSlot: 'country-slot',
                }, {
                    prop: 'Device', label: 'Device', scopedSlot: 'device-slot',
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
        async changeDateRange(){
            try {
                this.loading = true;
                await this.$axios.get('partner/clicks', {
                    params: {
                        between: this.currentDate
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then((data) => {
                    let clicks = data.data
                    let leads = clicks.filter(click => click.is_lead == 1 && click.is_active == 1)
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

<style lang="scss">
    .flag{
        height: 58px !important;
    }
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