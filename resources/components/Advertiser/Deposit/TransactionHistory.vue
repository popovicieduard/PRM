<template>
    <el-card class="transactions-table">
        <div slot="header">
            <span class="h2 text-capitalize">Transaction History</span>
        </div>
        <client-only>
            <el-table-wrapper :data="tableData" :columns="columns" :pagination="pagination">
                <template slot-scope="scope" slot="cost-slot">
                    <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
                </template>
                <template slot="pdf-slot">
                    <el-button type="primary" size="small">Download PDF</el-button>
                </template>
            </el-table-wrapper>
        </client-only>
    </el-card>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        transactions: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            tableData: this.transactions,
            columns: [
                {
                    prop: 'created_at', label: 'Date',
                }, {
                    prop: 'cost', label: 'Cost', scopedSlot: 'cost-slot'
                }, {
                    prop: 'pdf', label: 'Invoice', scopedSlot: 'pdf-slot'
                }
                
            ],
            pagination: {
                pageSize: 5,
                layout: ' prev, pager, next',
            },
        }
    },
    methods: {

    },
}
</script>

<style lang="scss">
</style>