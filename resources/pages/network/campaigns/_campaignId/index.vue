<template>
        <el-row>
                <el-col>
                        <SingleCampaign :campaign="campaign" />
                </el-col>
        </el-row>
</template>

<script>
import SingleCampaign from '@/components/Network/Campaigns/SingleCampaign'
export default {
        components: {
                SingleCampaign
        },
        data() {
                return {
                        campaign:{
                                id: 421321,
                                title: "Test",
                                description: "Short 3 page submit No survey traffic",
                                instructions: "No testerino now please",
                                image: "https://via.placeholder.com/500",
                                conversion_goal: "sign-up",
                                categories: ['b2b', 'ecommerce'],
                                url: "https://landing.com/",
                                countries: ['RO', 'US', 'GB', 'AT'],
                                devices: ["Mobile", "Desktop"],
                                commision: 5.22,
                                cap: 25,
                                active: true,
                                tested: true,
                                removed: false
                        },
                }
        }
}
</script>