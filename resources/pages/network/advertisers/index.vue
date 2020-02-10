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
            advertisers:[
                {
                    id: 50,
                    username: 'nothing',
                    company_name: 'MaxBounty',
                    first_name: 'first name',
                    last_name: 'last name',
                    email: 'eduard@test.com',
                    created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                    active: true,

                }, {
                    id: 51,
                    username: 'test',
                    company_name: 'Test2',
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