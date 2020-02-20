<template>
    <el-row>
        <el-col>
            <SingleCampaign v-if="campaign" :campaign="campaign"/>
        </el-col>
    </el-row>
</template>

<script>
import SingleCampaign from '@/components/Partner/Campaigns/SingleCampaign'

export default {
        components: {
            SingleCampaign
        },
        created() {
            if(!this.campaign){
                this.$router.push({'name': 'partner-campaigns'})
            }
        },
        data() {
            return {
                    campaign: null,
            }
        },
        async asyncData({ $axios, route }) {
            try {
                const { data } = await $axios.get(
                    `partner/campaign/${route.params.campaignId}`
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
}
</script>