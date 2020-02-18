<template>
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
</template>

<script>
export default {
    props: {
        propCategories: Array
    },
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
        if(this.propCategories){
            this.selected_categories = this.propCategories.map(category => category.slug)
        }
    },
    watch: {
        selected_categories() {
            this.$emit('setCategories', this.selected_categories);
        }
    }
}
</script>