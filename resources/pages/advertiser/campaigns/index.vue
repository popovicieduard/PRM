<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <client-only>
                <CampaignTable :campaigns="campaigns"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import CampaignTable from '@/components/Advertiser/Campaigns/CampaignTable';

export default {
    components: {
        CampaignTable,

    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.get(
                `advertiser/campaigns`
            );
            return { campaigns: data };
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
    data(){
        return {
            campaigns: null
        }
    }
    
}
</script>
