<template>
    <el-form-item label="Device Targeting">
        <el-checkbox-group v-model="selected_devices">
            <el-checkbox v-for="device in devices"
                :key="device.slug"
                :label="device.slug"
            >
            </el-checkbox>
        </el-checkbox-group>
    </el-form-item>
</template>

<script>
export default {
    data() {
        return {
            devices: [],
            selected_devices: []
        }
    },
    created() {
            this.$axios.get('util/devices')
                .then((data) => {
                    let devices = data.data
                    this.devices = devices

                })
                .catch((e) => {
                })
    },
    watch: {
        selected_devices() {
            this.$emit('setDevices', this.selected_devices);
        }
    }
}
</script>

<style lang="scss">
    .el-checkbox__label{
        text-transform: capitalize !important;
    }
</style>