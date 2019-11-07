<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="24" class="my-1">
                    <span class="h2 text-capitalize">Info</span>
                </el-col>
            </el-row>
        </div>
        <el-row type="flex" justify="center">
            <el-col :span="14">
                <el-card shadow="never">
                    <el-form :model="form_data" label-width="140px">
                        <el-form-item label="Full Name:" class="mb-1">
                            <el-input v-model="form_data.full_name"></el-input>
                        </el-form-item>
                        <el-form-item label="Company Name:" class="mb-1">
                            <el-input v-model="form_data.company_name"></el-input>
                        </el-form-item>
                        <el-form-item label="VAT Number:" class="mb-1">
                            <el-input v-model="form_data.vat_number"></el-input>
                        </el-form-item>
                        <el-form-item label="Address:" class="mb-1">
                            <el-input v-model="form_data.address"></el-input>
                        </el-form-item>
                        <el-form-item label="City:" class="mb-1">
                            <el-input v-model="form_data.city"></el-input>
                        </el-form-item>
                        <el-form-item label="Country:" class="mb-1">
                            <el-select
                                v-model="form_data.country"
                                filterable
                                style="width: 100%"
                            >
                            <el-option
                                v-for="country in countries"
                                :key="country.value"
                                :label="country.label"
                                :value="country.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="ZIP Code:" class="mb-1">
                            <el-input v-model="form_data.zip_code"></el-input>
                        </el-form-item>
                        <el-form-item label="Email:" class="mb-1">
                            <el-input v-model="form_data.email"></el-input>
                        </el-form-item>
                        <el-form-item label="Phone Number:" class="mb-1">
                            <el-input v-model="form_data.phone_number"></el-input>
                        </el-form-item>
                        <hr>
                        <div class="text-center">
                            <el-button 
                            type="primary" 
                            @click="submitForm" 
                            style="width: 100%"
                            :loading="form_loading">
                            Update
                            </el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import CountrySelect from '@/components/utils/CountrySelect'

export default {
    props: {
        advertiser: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            form_data: {
                ...this.advertiser
            },
            countries: CountrySelect.data,
            form_loading: false
        }
    },
    methods: {
        submitForm(){
            this.form_loading = true;
            setTimeout(() => {
                this.form_loading = false;
            }, 2000);
        }
    },
}
</script>

<style lang="scss">

</style>