<template>
    <el-row>
        <el-col :span="24">
            <client-only>
                <PartnerLeads :is_blocked="is_blocked" :partner_id="partner_id" :leads="leads"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import PartnerLeads from '@/components/Advertiser/Statistics/Partner/PartnerLeads';
import moment from 'moment';

export default {
    components: {
        PartnerLeads,
    },
    data(){
        return {
                partner_id: this.$route.params.partnerId,
                is_blocked: false,
                leads:[
                        {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                 {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },                {
                        id: 50,
                        click_id: 5132,
                        partner_id: 523,
                        campaign_name: 'Short 3 Page Submit No Survey Traffic',
                        campaign_id: 42,
                        cost: 52,
                        created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                        ip_address: '92.523.32.512',
                        active: true
                        },
                ],
        }
    }
    
}
</script>
