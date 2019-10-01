<template>
        <el-row>
                <el-col>
                        <SingleCampaign :campaign="campaign" :todayLeads="todayLeads"/>
                </el-col>
        </el-row>
</template>

<script>
import SingleCampaign from '@/components/Advertiser/Campaigns/SingleCampaign'
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
                                url: "https://landing.com/?click_id={CLICK_ID}",
                                countries: ['RO', 'US', 'GB', 'AT'],
                                devices: ["Mobile", "Desktop"],
                                commision: 5.22,
                                cap: 25,
                                active: true,
                                tested: true,
                                removed: false
                        },
                        todayLeads: 25,
                }
        }
}
</script>