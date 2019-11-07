<template>
    <el-row :gutter="12">
        <el-col :span="24" class="mb-1">
            <PostbackForm />
        </el-col>
    </el-row>
</template>

<script>
import PostbackForm from '@/components/Partner/Postback/PostbackForm';

export default {
    components: {
        PostbackForm,
    },
    data(){
        return {

        }
    },
}
</script>
