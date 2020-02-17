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
import _ from 'lodash'
import qs from 'qs'


export default {
    components: {
        StatisticsTable,

    },
    data(){
        return {
            leads: null,
            partners: null
        }
    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.get(`advertiser/clicks`, {
                params: {
                    between: [moment().startOf('month').format(), moment().endOf('month').format()],
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
