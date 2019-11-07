<template>
    <el-card class="latest-leads">
        <div slot="header">
            <span class="h2 text-capitalize">Latest leads</span>            
            <router-link :to="{name: 'partner-statistics' }" tag="button" class="el-button el-button--mini btn-primary text-white float-right border-0">See All</router-link>
        </div>
        <el-row :gutter="12">
            <el-col :span="24">
                <client-only>
                    <el-table-wrapper :data="tableData" :columns="columns" :pagination="pagination">
                    <template slot-scope="scope" slot="earnings-slot">
                        <span class="text-success font-weight-bold">{{ scope.row.earnings }} $</span>
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
                    {
                        clickId: 231231,
                        date: 2018,
                        partnerId: 52,
                        campaign: 'test',
                        earnings: 50
                    }
                ],
                columns: [
                    {
                        prop: 'date', label: 'Date'
                    }, {
                        prop: 'clickId', label: 'Click ID'
                    }, {
                        prop: 'campaign', label: 'Campaign'
                    }, {
                        prop: 'earnings', label: 'Earnings', width: 90, scopedSlot: 'earnings-slot'
                    },
                    
                ],
                pagination: {
                    pageSize: 10,
                    layout: ' prev, pager, next',
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