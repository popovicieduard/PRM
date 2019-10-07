<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="12" class="mt-2">
                    <h2>Lead - {{ lead.id }}</h2>
                </el-col>
                <el-col :span="12" class="mt-2">
                    <el-tooltip :content="'Cancel / Activate Lead - ' + lead.id" placement="left" class="float-right">
                        <el-switch
                            :value="lead.active"
                            active-color="#2dce89"
                            @change="changeLeadActiveStatus()"
                            v-loading="loading">
                        </el-switch>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>
        <el-row v-loading="loading">
            <el-col :span="24">
                <el-table :data="[lead]" class="single-lead-table">
                    <el-table-column
                        prop="click_id"
                        label="Click ID">
                    </el-table-column>
                    <el-table-column
                        prop="partner_id"
                        label="Partner ID">
                        <template slot-scope="scope">
                            <router-link :to="{name: 'advertiser-statistics-partner-partnerId', params: {partnerId: scope.row.partner_id}}" class="text-capitalize">
                                {{ scope.row.partner_id }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="campaign_id"
                        label="Campaign ID / Name"
                        width="280">
                        <template slot-scope="scope">
                            <router-link :to="{name: 'advertiser-statistics-campaign-campaignId', params: {campaignId: scope.row.campaign_id}}" class="text-capitalize">
                                {{ scope.row.campaign_name.length > 30 ? scope.row.campaign_id + ' / ' + scope.row.campaign_name.substring(0, 30) + '...' : scope.row.campaign_id + ' / ' + scope.row.campaign_name }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cost"
                        label="Cost">
                        <template slot-scope="scope">
                            <span class="text-success font-weight-bold">{{ scope.row.cost | numFormat('0,0.00') }} $</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="created_at"
                        label="Date"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="active"
                        label="Status"
                        width="100">
                        <template slot-scope="scope">
                            <el-tag effect="dark" size="mini" :type="scope.row.active ? 'success' : 'danger' " class="text-capitalize">{{ scope.row.active ? 'active' : 'cancelled' }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="[click]" class="single-lead-table">
                    <el-table-column
                        prop="ip"
                        label="Click IP Address">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="primary" class="text-capitalize bg-muted text-white">{{ scope.row.ip }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="device"
                        label="Device">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="primary" class="text-capitalize">{{ scope.row.device }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="country"
                        label="Country">
                        <template slot-scope="scope">
                            <el-tag size="mini" type="primary" class="text-capitalize">{{ scope.row.country | country }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: {
            lead: {
                type: Object,
                required: true
            },
            click: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false
            }
        },
        created(){
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        methods: {
            getLeadActiveStatus(id){
                return this.lead.active;
            },
            setLeadActiveStatus(id, payLoad){
                return this.lead.active = payLoad;
            },
            changeLeadActiveStatus(id){
                this.loading = true;
                
                var confirmType = this.partner_status ? 'success' : 'error';
                var confirmMessage = this.partner_status ? 'Activate Lead ?' : 'Cancel Lead ?';

                var messageType = this.partner_status ? 'Lead Activated' : 'Lead Cancelled';

                this.$confirm(confirmMessage, 'Info', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: confirmType
                }).then(() => {
                    var leadStatus = this.getLeadActiveStatus(id)

                    var leadStatusMessage = leadStatus ? 'Lead has been cancelled' : "Lead has been activated";
                    var leadStatusType = leadStatus ? 'error' : 'success';

                    setTimeout(() => {
                        this.setLeadActiveStatus(id, !leadStatus)
                        this.$notify({
                            message: leadStatusMessage,
                            type: leadStatusType
                        });
                        this.loading = false;
                    }, 1000)
                }).catch(() => {
            
                });
            },
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