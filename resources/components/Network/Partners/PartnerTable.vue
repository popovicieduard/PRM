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
                                <router-link :to="{name: 'network-partners-partnerId', params: {partnerId: scope.row.id}}" class="text-capitalize">
                                    {{ scope.row.username.length > 30 ? scope.row.username.substring(0, 30) + '...' : scope.row.username }}
                                </router-link>
                            </template> 
                            <template slot-scope="scope" slot="join_date-slot">
                                {{ scope.row.created_at }}
                            </template>
                            <template slot-scope="scope" slot="active-slot">
                                <el-tag effect="dark" size="mini" :type="scope.row.active == true ? 'success' : 'danger' " class="text-capitalize">{{ scope.row.active == true ? 'Active' : 'Inactive' }}</el-tag>
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
            type: Array,
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
                    prop: 'first_name', label: 'First Name', scopedSlot: 'first_name-slot'
                },{
                    prop: 'last_name', label: 'Last Name', scopedSlot: 'last_name-slot'
                }, {
                    prop: 'email', label: 'Email', width: 160, scopedSlot: 'email-slot'
                }, {
                    prop: 'created_at', label: 'Join Date', width: 180, scopedSlot: 'join_date-slot', sortable: true,
                }, {
                    prop: 'active', label: 'Active ?', width: 100, scopedSlot: 'active-slot'
                },
                
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
             || partner.first_name.toLowerCase().indexOf(search.toLowerCase()) > -1
             || partner.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
             );
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