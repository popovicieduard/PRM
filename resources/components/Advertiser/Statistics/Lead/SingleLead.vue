<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="24" class="my-1">
                    <h2>Lead - <span class="text-primary">{{ this.$route.params.leadId }}</span></h2>
                </el-col>
            </el-row>
        </div>
        <el-row v-if="lead" v-loading="loading">
            <el-col :span="24">
                <table v-loading="loading" class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition ll-table mb-5">
                    <thead class="border-bottom">
                        <tr>
                            <th scope="col"><div class="cell">Partner ID</div></th>
                            <th scope="col"><div class="cell">Campaign ID</div></th>
                            <th scope="col"><div class="cell">Country</div></th>
                            <th scope="col"><div class="cell">Device</div></th>
                            <th scope="col"><div class="cell">Cost</div></th>
                            <th scope="col"><div class="cell">IP</div></th>
                            <th scope="col"><div class="cell">Status</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div class="cell">
                            <nuxt-link :to="{name: 'advertiser-statistics-partner-partnerId', params:{partnerId: lead.user_id}}">
                                {{lead.user_id}}
                            </nuxt-link>   
                            </div></td>
                            <td><div class="cell">
                                <nuxt-link :to="{name: 'advertiser-statistics-campaign-campaignId', params:{campaignId: lead.campaign_id}}">
                                    {{lead.campaign_id}}
                                </nuxt-link>       
                            </div></td>
                            <td><div class="cell">
                                <el-tooltip class="item" effect="dark" :content="lead.country.name" placement="top">
                                    <span><country-flag :country='lead.country.code' size='normal'/></span>
                                </el-tooltip>
                            </div></td>
                            <td><div class="cell">
                                <el-tag class="text-capitalize" size="small" effect="plain">{{ lead.device.name }}</el-tag>                                    
                            </div></td>
                            <td><div class="cell">
                                <span class="text-success font-weight-bold">{{lead.cost | numFormat('0,0.00')}} $</span>    
                            </div></td>
                            <td><div class="cell">
                                <span>{{lead.ip_address}}</span>    
                            </div></td>
                            <td><div class="cell">
                                <el-tag effect="dark" size="mini" :type="lead.is_active ? 'success' : 'danger' " class="text-capitalize">{{ lead.is_active ? 'active' : 'cancelled' }}</el-tag>
                            </div></td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: {
            lead: {
                type: Object | null,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                leadColumns: [
                    {
                        prop: 'id', label: 'Lead / Click ID', wdith: 100, scopedSlot: 'lead-id-slot'
                    }, {
                        prop: 'partner_id', label: 'Partner ID', scopedSlot: 'partner-id-slot',
                    }, {
                        prop: 'campaign_id', label: 'Campaign ID', width: 120, scopedSlot: 'campaign-id-slot' ,
                    }, {
                        prop: 'cost', label: 'Cost', width: 80, scopedSlot: 'cost-slot',
                    }, {
                        prop: 'ip_address', label: 'IP', width: 120
                    }, {
                        prop: 'created_at', label: 'Date', width: 180, sortable: true,
                    }, {
                        prop: 'active', label: 'Status', width: 100, scopedSlot: 'active-slot', sortable: true,
                    },
                ],
            }
        }
    }
</script>

<style lang="scss">
    .single-lead-table{
        td {
            border-bottom: 0px solid #fff !important;
        }

        th {
            // border-bottom: 0px solid #fff !important;
        }

        &::before{
            content: none;
        }
    }
</style>