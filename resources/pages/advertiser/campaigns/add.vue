<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <AddCampaign />
        </el-col>
    </el-row>
</template>

<script>
import AddCampaign from '@/components/Advertiser/Campaigns/AddCampaign';

export default {
    components: {
        AddCampaign,

    },
}
</script>
