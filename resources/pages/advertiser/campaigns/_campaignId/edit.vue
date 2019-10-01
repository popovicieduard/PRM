<template>
        <el-row>
                <el-col>
                        <EditCampaign :campaign="campaign"/>
                </el-col>
        </el-row>
</template>

<script>
import EditCampaign from '@/components/Advertiser/Campaigns/EditCampaign'
export default {
        components: {
                EditCampaign
        },
        data() {
                return {
                        campaign:{
                                id: 421321,
                                name: "Test",
                                title: "Test",
                                description: "Short 3 page submit No survey traffic",
                                instructions: "No testerino now please",
                                image: "https://via.placeholder.com/500",
                                conversion_goal: "sign-up",
                                categories: ['b2b', 'ecommerce'],
                                url: "https://landing.com/?click_id={CLICK_ID}",
                                countries: ['RO', 'US', 'GB', 'AT'],
                                devices: ["Mobile", "Desktop"],
                                commision: 5.2,
                                cap: 25,
                                status: 'paused',
                        },
                }
        }
}
</script>