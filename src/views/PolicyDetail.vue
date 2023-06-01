<template>
    <div>
        <h4>查看所有保单详情</h4>
        <el-table :data="[dataList]" style="width: 100%">
            <el-table-column prop="id" label="#"></el-table-column>
            <el-table-column prop="insurance_id" label="险种ID"></el-table-column>
            <el-table-column prop="beneficiary.name" label="受益人"></el-table-column>
            <el-table-column prop="insured.name" label="被保险⼈"></el-table-column>
            <el-table-column prop="insurer.name" label="投保人"></el-table-column>
            <el-table-column prop="number" label="保单号"></el-table-column>
            <el-table-column prop="start_time" label="开始时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            dataList: []
        }
    },
    methods: {
        getData() {
            axios.get('http://vaala.cloud:9046/policy/listDetail').then(res => {
                console.log(res.data.data)
                // this.dataList = res.data.data.policy_list

            }).catch(err => {
                console.log(err)
            })
        },
    },
    mounted() {
        this.getData()
    }


}
</script>


<style scoped lang="scss">
h4 {
  padding: 0 10px;
  margin: 20px 0;
  border-left: 3px solid #ccc;
}
</style>
