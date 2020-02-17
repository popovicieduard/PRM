<template>
    <el-row>
        <el-col :span="24" class="my-2">
            <PasswordForm/>
        </el-col>
    </el-row>
</template>

<script>
import PasswordForm from '@/components/utils/PasswordForm';

export default {
    components: {
        PasswordForm
    }
    
}
</script>
