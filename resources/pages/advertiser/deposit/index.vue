<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <Deposit :balance="balance"/>
        </el-col>
        <el-col :span="24" class="my-2">
            <TransactionHistory :transactions="transactions"/>
        </el-col>
    </el-row>
</template>

<script>
import Deposit from '@/components/Advertiser/Deposit/Deposit';
import TransactionHistory from '@/components/Advertiser/Deposit/TransactionHistory';

export default {
    components: {
        Deposit,
        TransactionHistory

    },
    data(){
        return {
            balance: 400,
            transactions: [
                {
                    cost: 400,
                    created_at: '2019-12-25'
                },
            ]
        }
    }
    
}
</script>
