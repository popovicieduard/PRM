<template>
    <el-form-item label="Campaign Categories">
        <el-select
        v-model="selected_categories"
        multiple
        collapse-tags
        placeholder="Select Categories"
        >
        <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.name"
            :value="category.slug"
        ></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            selected_categories: []
        }
    },
    created() {
            this.$axios.get('util/categories')
                .then((data) => {
                    let categories = data.data
                    this.categories = categories

                })
                .catch((e) => {
                })
    },
    watch: {
        selected_categories() {
            this.$emit('setCategories', this.selected_categories);
        }
    }
}
</script>