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
import CampaignTable from '@/components/Partner/Campaigns/CampaignTable';

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
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5.1,
                    epc: 0.04,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['bizopp']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 5,
                    epc: 0.02,
                    countries: ['RO', 'DE'],
                    conversion_goal: 'sign-up',
                    categories: ['dating']

                }, {
                    id: 50,
                    name: 'Test 4',
                    rate: 4,
                    epc: 0.02,
                    countries: ['RO', 'DE', 'GB'],
                    conversion_goal: 'sign-up',
                    categories: ['b2b']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 2,
                    epc: 0.02,
                    countries: ['RO'],
                    conversion_goal: 'survey',
                    categories: ['b2b']

                }, {
                    id: 50,
                    name: 'Short 3 page submit No survey traffic',
                    rate: 3,
                    epc: 0.02,
                    countries: ['RO', 'GB', 'AT'],
                    conversion_goal: 'sign-up',
                    categories: ['dating']

                },
            ]
        }
    }
    
}
</script>