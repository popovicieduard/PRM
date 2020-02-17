<template>
    <el-row>
        <el-col :span="24">
            <SingleLead :lead="lead"/>
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
            lead: null
        }
    },
    async asyncData({ $axios, route }) {
        try {
            const { data } = await $axios.get(`advertiser/click/${route.params.leadId}`);
            return { lead: data};
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
