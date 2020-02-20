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
                            <el-button type="primary" size="mini" class="float-right" @click="filterCampaigns">Filter</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-input placeholder="Search by Name" v-model="filter.search">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <hr>
                <h4>Countries</h4>
                <countries @setCountries="setCountries"/>
                <hr>
                <h4>Categories</h4>
                <categories @setCategories="setCategories"/>
            </el-card>
        </el-col>
        <el-col :span="19">
            <el-card class="campaign-table">
                <div slot="header">
                    <el-row>
                        <el-col :xs="24" class="text-center text-md-left my-1">
                            <span class="h2 text-capitalize">Campaigns</span>
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="12">
                    <el-col :span="24">
                        <el-table-wrapper v-loading="loading" :data="tableData" :columns="columns" :pagination="pagination">
                            <template slot-scope="scope" slot="title-slot">
                                <router-link v-if="!scope.row.is_removed" :to="{name: 'partner-campaigns-campaignId', params: {campaignId: scope.row.id}}" class="text-capitalize">
                                    {{ scope.row.title.length > 30 ? scope.row.title.substring(0, 30) + '...' : scope.row.title }}
                                </router-link>
                                <span class="text-capitalize" v-else >{{ scope.row.title.length > 30 ? scope.row.title.substring(0, 30) + '...' : scope.row.title }}</span>
                            </template>
                            <template slot-scope="scope" slot="conversion_goal-slot">
                                <el-tag effect="dark" size="mini" type="primary" class="text-capitalize">{{ scope.row.conversion_goal }}</el-tag>
                            </template>
                            <template slot-scope="scope" slot="commision-slot">
                                <span class="text-success font-weight-bold">{{ scope.row.commision | numFormat('0,0.00') }} $</span>
                            </template>
                            <template slot-scope="scope" slot="active-slot">
                                <el-tag effect="dark" size="mini" :type="scope.row.is_removed ? 'danger' : (scope.row.is_active ? 'success' : 'warning')" :class="{ 'bg-muted': !scope.row.is_active, 'text-capitalize': true }">{{ scope.row.is_removed ? 'removed' : (scope.row.is_active ? 'live' : 'paused') }}</el-tag>
                            </template>
                        </el-table-wrapper>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import Categories from "@/components/utils/CampaignCategories";
import Countries from "@/components/utils/CountrySelect";

export default {
    components: {
        Categories,
        Countries,
    },
    props: {
        campaigns: {
            type: Array | null,
            required: true
        }
    },
    data() {
        return {
            tableData: this.campaigns,
            filter: {
                search: '',
                countries: [],
                categories: [],
            },
            loading: false,
            columns: [
                {
                    prop: 'id', label: 'Campaign ID', width: 130
                }, {
                    prop: 'title', label: 'Title',  width: 280, scopedSlot: 'title-slot'
                }, {
                    prop: 'conversion_goal', label: 'Conversion Goal', scopedSlot: 'conversion_goal-slot'
                }, {
                    prop: 'commision', label: 'Commision', width: 140, scopedSlot: 'commision-slot', sortable: true,
                },  {
                    prop: 'is_active', label: 'Status', width: 140, scopedSlot: 'active-slot', sortable: true,
                }
                
            ],
            pagination: {
                pageSize: 20,
                layout: ' prev, pager, next',
            },
        }
    },

    methods: {
        filterCampaigns(){
            this.tableData = this.filterByCategory(this.filterByCountry(this.filterBySearch(this.campaigns, this.filter.search), this.filter.countries), this.filter.categories)
        },
        filterBySearch(campaigns, keyword){
            const search = keyword.trim();
            if(!search.length) return campaigns;
            return campaigns.filter(campaign => campaign.title.toLowerCase().indexOf(search.toLowerCase()) > -1);
        },
        filterByCategory(campaigns, categories){
            if(!categories.length) return campaigns;
            return campaigns.filter(campaign => campaign.categories.find(category => categories.includes(category.slug)))
        },
        filterByCountry(campaigns, countries){
            if(!countries.length) return campaigns;
            return campaigns.filter(campaign => campaign.countries.find(country => countries.includes(country.code)));
        },
        setCategories(categories){
            this.filter.categories = categories
        },
        setCountries(countries){
            this.filter.countries = countries
        }
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