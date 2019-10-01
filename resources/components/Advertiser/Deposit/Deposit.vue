<template>
    <el-card class="campaign-table">
        <div slot="header">
            <el-row>
                <el-col :span="24" class="mt-2">
                    <span class="h2 text-capitalize">Deposit</span>
                </el-col>
            </el-row>
        </div>
        <el-row>
            <el-col :span="12" class="mt-2">
                <h2 class="">Balance: <span class="text-success">{{ balance | numFormat('0,0.00') }} $</span></h2>
            </el-col>
            <el-col :span="12">
                <el-button type="success" class="float-right" size="medium">Make Deposit</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
    props: {
        balance: {
            type: Number,
            required: true
        },
    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style lang="scss">

</style>