<template>
    <el-card class="latest-leads">
        <div slot="header">
            <span class="h2 text-capitalize">Latest leads</span>            
            <router-link :to="{name: 'advertiser-statistics' }" tag="button" class="el-button el-button--mini btn-primary text-white float-right border-0">See All</router-link>
        </div>
        <el-row :gutter="12">
            <el-col :span="24">
                <client-only>
                    <el-table-wrapper :data="tableData" :columns="columns" :pagination="pagination">
                    <template slot-scope="scope" slot="cost-slot">
                        <span class="text-success font-weight-bold">{{ scope.row.cost }} $</span>
                    </template>
                    </el-table-wrapper>
                </client-only>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [
                    // {
                    //     clickId: 231231,
                    //     date: 2018,
                    //     partnerId: 52,
                    //     campaign: 'test',
                    //     cost: 50
                    // }
                ],
                columns: [
                    {
                        prop: 'date', label: 'Date', width: 170
                    }, {
                        prop: 'clickId', label: 'Click ID', width: 170
                    }, {
                        prop: 'partnerId', label: 'Partner ID', width: 170
                    }, {
                        prop: 'campaign', label: 'Campaign'
                    }, {
                        prop: 'cost', label: 'Cost', width: 60, scopedSlot: 'cost-slot'
                    },
                    
                ],
                pagination: {
                    pageSize: 5,
                    layout: ' prev, pager, next',
                    // pageSizes: [5, 10, 50, 100],
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    .latest-leads{
        min-height: 230px;
    }
</style>