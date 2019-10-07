<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <client-only>
                <StatisticsTable :leads="leads" :partners="partners"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import StatisticsTable from '@/components/Advertiser/Statistics/StatisticsTable';
import moment from 'moment';

export default {
    components: {
        StatisticsTable,

    },
    data(){
        return {
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
            partners: [
                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 42132,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 4213,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 4213,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 3212,
                    cost: 4213,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 4213,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 4213,
                },
                                {
                    id: 32,
                    clicks: 321312,
                    leads: 321,
                    cost: 4213,
                },
            ]
        }
    }
    
}
</script>
