<template>
    <el-row>
        <el-col :span="24">
            <SingleLead :lead="lead" :click="click"/>
        </el-col>
    </el-row>
</template>

<script>
import moment from 'moment';
import SingleLead from '@/components/Advertiser/Statistics/Lead/SingleLead';

export default {
    components: {
        SingleLead,
    },
    data(){
        return {
            lead:{
                id: 50,
                click_id: 5132,
                partner_id: 523,
                campaign_name: 'Short 3 Page Submit No Survey Traffic',
                campaign_id: 42,
                cost: 52,
                created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                active: true
            },
            click: {
                id: 23,
                ip: '92.523.32.512',
                device: 'mobile',
                country: 'ro',
                
            }
        }
    },
}
</script>
