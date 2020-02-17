<template>
        <el-row>
                <el-col>
                        <SingleCampaign v-if="campaign" :campaign="campaign"/>
                </el-col>
        </el-row>
</template>

<script>
import SingleCampaign from '@/components/Advertiser/Campaigns/SingleCampaign'
export default {
        components: {
                SingleCampaign
        },
        async asyncData({ $axios, params }) {
            try {
                const { data } = await $axios.get(
                    `advertiser/campaign/${params.campaignId}`
                );
                return { campaign: data };
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
    },
    created() {
        if(!this.campaign || this.campaign.is_removed){
            this.$router.push({'name': 'advertiser-campaigns'})
        }
    },
    data() {
            return {
                    campaign: null,
            }
    }
}
</script>