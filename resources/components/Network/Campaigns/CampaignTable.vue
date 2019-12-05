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
                <el-select
                v-model="filter.countries"
                filterable
                multiple
                collapse-tags
                placeholder="Select Countries"
                >
                    <el-option
                        v-for="country in countries"
                        :key="country.value"
                        :label="country.label"
                        :value="country.value"
                    ></el-option>
                </el-select>
                <hr>
                <h4>Categories</h4>
                <el-select
                v-model="filter.categories"
                filterable
                multiple
                collapse-tags
                placeholder="Select Categories"
                >
                    <el-option
                        v-for="category in categories"
                        :key="category.value"
                        :label="category.label"
                        :value="category.value"
                    ></el-option>
                </el-select>
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
                            <template slot-scope="scope" slot="name-slot">
                                <router-link :to="{name: 'network-campaigns-campaignId', params: {campaignId: scope.row.id}}" class="text-capitalize">
                                    {{ scope.row.name.length > 30 ? scope.row.name.substring(0, 30) + '...' : scope.row.name }}
                                </router-link>
                            </template>
                            <template slot-scope="scope" slot="conversion_goal-slot">
                                <el-tag effect="dark" size="mini" type="primary" class="text-capitalize">{{ scope.row.conversion_goal }}</el-tag>
                            </template>
                            <template slot-scope="scope" slot="rate-slot">
                                <span class="text-success font-weight-bold">{{ scope.row.rate | numFormat('0,0.00') }} $</span>
                            </template>
                            <template slot-scope="scope" slot="epc-slot">
                                <span>{{ scope.row.epc | numFormat('0,0.00') }}</span>
                            </template>
                        </el-table-wrapper>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import CountrySelect from '@/components/utils/CountrySelect';
import CampaignCategories from '@/components/utils/CampaignCategories';

export default {
    props: {
        campaigns: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            countries: CountrySelect.data,
            categories: CampaignCategories.data,
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
                    prop: 'name', label: 'Name',  width: 280, scopedSlot: 'name-slot'
                }, {
                    prop: 'conversion_goal', label: 'Conversion Goal', scopedSlot: 'conversion_goal-slot'
                }, {
                    prop: 'rate', label: 'Rate', width: 140, scopedSlot: 'rate-slot', sortable: true,
                }, {
                    prop: 'epc', label: 'EPC', width: 100, scopedSlot: 'epc-slot', sortable: true,
                }, 
                
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
            return campaigns.filter(campaign => campaign.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        },
        filterByCategory(campaigns, categories){
            if(!categories.length) return campaigns;
            return campaigns.filter(campaign => campaign.categories.find(category => categories.includes(category)))
        },
        filterByCountry(campaigns, countries){
            if(!countries.length) return campaigns;
            return campaigns.filter(campaign => campaign.countries.find(country => countries.includes(country)));
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