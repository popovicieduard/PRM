<template>
    <el-row>
        <el-col :span="24">
            <client-only>
                <PartnerLeads :leads="leads"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import PartnerLeads from '@/components/Advertiser/Statistics/Partner/PartnerLeads';
import qs from 'qs'
import moment from 'moment'

export default {
    components: {
        PartnerLeads,
    },
    data(){
        return {
                leads: null
        }
    },
    async asyncData({ $axios, route }) {
        try {
            const { data } = await $axios.get(`advertiser/clicks`, {
                params: {
                    between: [moment().startOf('month').format(), moment().endOf('month').format()],
                    partner: parseInt(route.params.partnerId)
                },
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            });
            return { leads: data.filter(element => element.is_lead == 1)};
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
