<template>
    <el-dialog v-model="localIsVisibal" title="认领门户">
        <el-table :data="[item]">
            <el-table-column property="name" label="名字" width="170" />
            <el-table-column property="company" label="机构" width="170" />
            <el-table-column property="year" label="年份" width="170"/>
            <el-table-column property="source" label="来源" width="170"/>
        </el-table>
    </el-dialog>
</template>
<style></style>
<script>
export default {
    props: {
        isVisibal: Boolean,
        item: Object
    },

    data() {
        return {
            localIsVisibal: this.isVisibal
        };
    },
    watch: {
        isVisibal(newVal) {
            this.localIsVisibal = newVal;
        },
        localIsVisibal(newVal) {
            if (newVal !== this.isVisibal) {
                this.$emit('update:isVisibal', newVal);
            }
        }
    }
}
</script>