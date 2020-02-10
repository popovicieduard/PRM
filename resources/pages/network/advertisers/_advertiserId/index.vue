<template>
        <el-row>
                <el-col>
                        <SingleAdvertiser :advertiser="advertiser"/>
                </el-col>
        </el-row>
</template>

<script>
import SingleAdvertiser from '@/components/Network/Advertisers/SingleAdvertiser';
import moment from 'moment';

export default {
        components: {
                SingleAdvertiser
        },
        data() {
                return {
                        advertiser:{
                                id: 50,
                                username: 'adv1',
                                company_name: 'MaxBounty',
                                first_name: 'first name',
                                last_name: 'last name',
                                email: 'eduard@test.com',
                                created_at: moment().format('DD MMM YYYY - HH:mm:ss'),
                                active: true,
                        },
                }
        }
}
</script>