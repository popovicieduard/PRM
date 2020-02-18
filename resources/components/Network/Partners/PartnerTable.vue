<template>
    <el-row :gutter="12">
        <el-col :span="5" class="filter-card">
            <el-card>
                <div slot="header">
                    <el-row>
                        <el-col :span="12">
                            <h2 class="text-capitalize my-1">Filter</h2>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" size="mini" class="float-right" @click="filterPartners">Filter</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-input placeholder="Search Partner" v-model="filter.search">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-card>
        </el-col>
        <el-col :span="19">
            <el-card class="campaign-table">
                <div slot="header">
                    <el-row>
                        <el-col :xs="24" class="text-center text-md-left my-1">
                            <span class="h2 text-capitalize">Partners</span>
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-table-wrapper v-loading="loading" :data="tableData" :columns="columns" :pagination="pagination">
                            <template slot-scope="scope" slot="username-slot">
                                {{ scope.row.username.length > 30 ? scope.row.username.substring(0, 30) + '...' : scope.row.username }}
                            </template> 
                            <template slot-scope="scope" slot="join_date-slot">
                                {{ scope.row.created_at }}
                            </template>
                            <template slot-scope="scope" slot="active-slot">
                                <el-tag effect="dark" size="mini" :type="scope.row.is_active == true ? 'success' : 'danger' " class="text-capitalize">{{ scope.row.is_active == true ? 'Active' : 'Inactive' }}</el-tag>
                            </template>
                            <template slot-scope="scope" slot="status-slot"> 
                                <el-tooltip content="Activate / Deactivate Partner" placement="left" class="float-right">
                                    <el-switch
                                        :value="getUserActiveStatus(scope.row.id)"
                                        active-color="#2dce89"
                                        @change="changeUserActiveStatus(scope.row.id)">
                                    </el-switch>
                                </el-tooltip>
                            </template>
                        </el-table-wrapper>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        partners: {
            type: Array | null,
            required: true
        }
    },
    data() {
        return {
            tableData: this.partners,
            filter: {
                search: '',
            },
            loading: false,
            columns: [
                {
                    prop: 'id', label: 'Partner ID', width: 130
                }, {
                    prop: 'username', label: 'Username', scopedSlot: 'username-slot'
                }, {
                    prop: 'email', label: 'Email', width: 160, scopedSlot: 'email-slot'
                }, {
                    prop: 'created_at', label: 'Join Date', width: 180, scopedSlot: 'join_date-slot', sortable: true,
                }, {
                    prop: 'active', label: 'Active ?', width: 100, scopedSlot: 'active-slot'
                }, {
                    prop: 'status', label: '', width: 60, scopedSlot: 'status-slot'
                }
                
            ],
            pagination: {
                pageSize: 20,
                layout: ' prev, pager, next',
            },
        }
    },

    methods: {
        filterPartners(){
            this.tableData = this.filterBySearch(this.partners, this.filter.search)
        },
        filterBySearch(partners, filter_search){
            const search = filter_search.trim();
            if(!search.length) return partners;
            return partners.filter(partner => 
                partner.username.toLowerCase().indexOf(search.toLowerCase()) > -1
             || partner.email.toLowerCase().indexOf(search.toLowerCase()) > -1
             );
        },
        getUserActiveStatus(id){
            return this.partners.find(partner => partner.id === id).is_active ? true : false;
        },
        setUserActiveStatus(id, payLoad){
            return this.partners.find(partner => partner.id === id).is_active = payLoad;
        },
        async changeUserActiveStatus(id){

            var userStatus = this.getUserActiveStatus(id)

            var userStatusMessage = userStatus ? 'Partner has been deactivated' : "User has been activated";
            var userStatusType = userStatus ? 'info' : 'success';

            try {
                this.loading = true;
                await this.$axios.patch(
                    `network/user/status/${id}`, {
                        status: !userStatus,
                    }
                ).then((data) => {
                    let user = data.data

                    this.setUserActiveStatus(user.id, !userStatus)
                    this.$notify({
                        message: userStatusMessage,
                        type: userStatusType
                    });
                    this.loading = false;
                    
                })
            } catch (error) {
                this.loading = false;
                let _error = error.response.data
                if(_error.constructor === Array){
                    _error.forEach((error) =>{
                    setTimeout(() => {
                        this.$notify.error({
                        title: 'Error',
                        message: error.message,
                        });
                    }, 100);
                    })
                }else{
                    if(this){
                    this.$notify.error({
                        title: 'Error',
                        message: _error.message,
                    });
                    }
                }
            }
        },
    }
}
</script>

<style lang="scss">
    .filter-card{
        position: sticky !important;
        position: -webkit-sticky !important;
        top: -20px !important;
        z-index: 2000;

        .upb-date-range{
            z-index: 20;
        }
    }
</style>