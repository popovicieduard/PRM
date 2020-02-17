<template>
    <el-row>
        <el-col :span="24">
            <client-only>
                <CampaignStatistics :leads="leads" :partners="partners"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import CampaignStatistics from '@/components/Advertiser/Statistics/Campaign/CampaignStatistics';
import moment from 'moment';
import qs from 'qs'
import _ from 'lodash'

export default {
    components: {
        CampaignStatistics,

    },
    data(){
        return {
            leads: null,
            partners: null
        }
    },
    async asyncData({ $axios, route }) {
        try {
            const { data } = await $axios.get(`advertiser/clicks`, {
                params: {
                    between: [moment().startOf('month').format(), moment().endOf('month').format()],
                    campaign: parseInt(route.params.campaignId)
                },
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            });
            const grouped = _.groupBy(data, click => click.user_id);
            return { leads: data.filter(element => element.is_lead == 1), partners: grouped };
        } catch (error) {
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
    }
    
}
</script>
