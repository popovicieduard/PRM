<template>
    <div>
        <DashboardStatistics :stats="stats" :graph="graph" />
    </div>
</template>

<script>
import DashboardStatistics from '@/components/Partner/Dashboard/DashboardStatistics';
import moment from 'moment'
import qs from 'qs'

export default {
    components: {
        DashboardStatistics,
    },
    data(){
        return {
            stats: null,
            graph: null
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
            const leads = data.filter(click => click.is_lead == 1 && click.is_active == 1).length
            const clicks = data.length
            const earnings = data.filter(click => click.is_lead == 1 && click.is_active == 1).reduce((a, b) => +a + +b.cost, 0)
            return { 
                stats: {
                    clicks: clicks,
                    leads: leads,
                    earnings: earnings
                },
                graph: data
            };
        } catch (error) {
            console.log(error)
            // let _error = error.response.data
            // if(_error.constructor === Array){
            //     _error.forEach((error) =>{
            //     setTimeout(() => {
            //         this.$notify.error({
            //         title: 'Error',
            //         message: error.message,
            //         });
            //     }, 100);
            //     })
            // }else{
            //     if(this){
            //         this.$notify.error({
            //             title: 'Error',
            //             message: _error.message,
            //         });
            //     }
            // }
        }
    }
}
</script>
