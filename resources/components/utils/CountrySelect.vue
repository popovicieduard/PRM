<template>
    <el-form-item label="Country Targeting">
        <el-select
        v-model="selected_countries"
        filterable
        multiple
        collapse-tags
        placeholder="Select"
        >
        <el-option
            v-for="country in countries"
            :key="country.code"
            :label="country.name"
            :value="country.code"
        ></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
export default {
    data() {
        return {
            countries: [],
            selected_countries: []
        }
    },
    created() {
            this.$axios.get('util/countries')
                .then((data) => {
                    let countries = data.data
                    this.countries = countries

                })
                .catch((e) => {
                })
    },
    watch: {
        selected_countries() {
            this.$emit('setCountries', this.selected_countries);
        }
    }
}
</script>