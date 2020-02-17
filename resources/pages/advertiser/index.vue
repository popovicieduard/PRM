<template>
    <div>
        <DashboardStatistics :stats="stats" />
    </div>
</template>

<script>
import DashboardStatistics from '@/components/Advertiser/Dashboard/DashboardStatistics';
import qs from 'qs'
import moment from 'moment'

export default {
    components: {
        DashboardStatistics,
    },
    data(){
        return {
            stats: null
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
            const leads = data.filter(click => click.is_lead == 1 && click.is_active == 1).length
            const clicks = data.length
            const spend = data.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)
            return { stats: {
                clicks: clicks,
                leads: leads,
                spend: spend 
            } };
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
