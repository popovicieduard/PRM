<template>
    <el-row>
        <el-col :span="24" class="mb-1">
            <client-only>
                <CampaignTable :campaigns="campaigns"/>
            </client-only>
        </el-col>
    </el-row>
</template>

<script>
import CampaignTable from '@/components/Advertiser/Campaigns/CampaignTable';

export default {
    components: {
        CampaignTable,

    },
    data(){
        return {
            campaigns:[
                {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    clicks: 5,
                    leads: 20,
                    spend: 50,
                    active: false,
                    tested: true,
                    removed: false
                },
                {
                    id: 52,
                    name: 'test',
                    clicks: 5,
                    leads: 20,
                    spend: 50,
                    active: false,
                    tested: false,
                    removed: true
                }
            ]
        }
    }
    
}
</script>
