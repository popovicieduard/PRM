<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <client-only>
                <StatisticsTable :leads="leads"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import StatisticsTable from '@/components/Partner/Statistics/StatisticsTable';
import moment from 'moment';
import qs from 'qs'

export default {
    components: {
        StatisticsTable,

    },
    data(){
        return {
            leads: null
        }
    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.get(`partner/clicks`, {
                params: {
                    between: [moment().startOf('month').format(), moment().endOf('month').format()],
                },
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            });
            return { leads: data.filter(element => element.is_lead == 1) };
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
