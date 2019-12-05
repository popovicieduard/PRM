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
            partners:[
                {
                    id: 50,
                    username: 'nothing',
                    first_name: 'first name',
                    last_name: 'last name',
                    email: 'eduard@test.com',
                    created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                    active: true,

                }, {
                    id: 51,
                    username: 'test',
                    first_name: 'first name',
                    last_name: 'second name',
                    email: 'test@test.com',
                    created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                    active: false,

                },
            ]
        }
    }
    
}
</script>