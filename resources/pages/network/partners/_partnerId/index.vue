<template>
        <el-row>
                <el-col>
                        <SinglePartner :partner="partner"/>
                </el-col>
        </el-row>
</template>

<script>
import SinglePartner from '@/components/Network/Partners/SinglePartner';
import moment from 'moment';

export default {
        components: {
                SinglePartner
        },
        data() {
                return {
                        partner:{
                                id: 50,
                                username: 'nothing',
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