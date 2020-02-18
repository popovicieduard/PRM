<template>
    <el-row>
    <el-col :span="24" class="mb-1">
        <client-only>
            <AdvertiserTable :advertisers="advertisers"/>
        </client-only>
    </el-col>
    </el-row>
</template>

<script>
import AdvertiserTable from '@/components/Network/Advertisers/AdvertiserTable';
import moment from 'moment';

export default {
    components: {
        AdvertiserTable,

    },
    data(){
        return {
            advertisers: null
        }
    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.get(`network/advertisers`);
            return { advertisers: data};
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