<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <Profile :advertiser="AuthObject"/>
        </el-col>
        <el-col :span="24" class="my-2">
            <PasswordForm/>
        </el-col>
    </el-row>
</template>

<script>
import Profile from '@/components/Advertiser/Settings/Profile';
import PasswordForm from '@/components/Advertiser/Settings/PasswordForm';

export default {
    components: {
        Profile,
        PasswordForm

    },
    data(){
        return {
            AuthObject: {
                full_name: 'Eduard Popovici',
                company_name: 'Upboost SRL',
                vat_number: 'RO41023583',
                address: 'str Stefan Lupsa nr4',
                city: 'Oradea',
                country: 'RO',
                zip_code: '410538',
                email: 'office@upboost.ro',
                phone_number: '40741654019',
            },
        }
    }
    
}
</script>
