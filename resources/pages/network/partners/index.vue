<template>
    <el-row>
    <el-col :span="24" class="mb-1">
        <client-only>
            <PartnerTable :partners="partners"/>
        </client-only>
    </el-col>
    </el-row>
</template>

<script>
import PartnerTable from '@/components/Network/Partners/PartnerTable';
import moment from 'moment';

export default {
    components: {
        PartnerTable,

    },
    data(){
        return {
            partners: null
        }
    },
    async asyncData({ $axios }) {
        try {
            const { data } = await $axios.get(`network/partners`);
            return { partners: data};
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