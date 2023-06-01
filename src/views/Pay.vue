<template>
    <div>
        <h4>云端计算</h4>

        <el-form label-width="auto" label-position="left">
            <el-row :gutter="24" type="flex">
                <el-col :span="7">
                    <el-form-item label="筛选条件">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="筛选内容">
                        <el-input v-model="filterContent"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="计算内容">
                        <el-select v-model="computeValue" placeholder="请选择">
                            <el-option
                                    v-for="item in computeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button type="primary" @click="Pay">确定</el-button>
        </el-form>
        <el-card class="box-card my-card">
            <div>和<span>{{ ResultList.cost }}</span></div>

            <div>平均数<span>{{ ResultList.average }}</span></div>
        </el-card>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            // premiumSum:"",//积
            TypeList: [],
            ResultList: [],
            filterContent: "",//筛选内容
            value: "",//筛选条件
            computeValue: "",//计算内容
            options: [{
                value: 'insurer',
                label: '投保人身份证号'
            }, {
                value: 'beneficiary',
                label: '受益人身份证号'
            }, {
                value: 'insured',
                label: '被保人身份证号'
            }, {
                value: 'insuranceID',
                label: '险种'
            }],
            computeOptions: [{
                value: '选项1',
                label: '保费'
            }, {
                value: '选项2',
                label: '期间'
            }, {
                value: '选项3',
                label: '年龄'
            }]
        }
    },
    methods: {
        Pay() {
            // 非空判断
            if (!this.value || !this.filterContent) return this.$message.error('请选择筛选条件')
            if (this.value === 'insuranceID') {
                axios.get('http://vaala.cloud:9046/calculate/insuranceID/' + this.filterContent).then(res => {

                    if (res.data.code === 500) return this.$message.error('查询失败')
                    this.ResultList = res.data.data
                    console.log(this.ResultList)
                })
            } else {
                axios.post('http://vaala.cloud:9046/calculate/idNumber', {
                    object: this.value,
                    id_number: this.filterContent,
                }).then(res => {
                    if (res.data.code === 500) return this.$message.error('查询失败')
                    this.ResultList = res.data.data
                    console.log(this.ResultList)
                })
            }

        },
        
        // getTypeData() {
        //     axios.get('http://vaala.cloud:9046/policy/listDetail').then(res => {
        //         // console.log(res)
        //         this.TypeList = res.data.data.policy_list;
        //     })
        // }
    },
    mounted() {
        // this.getTypeData();
    },

}
</script>
<style scoped lang="scss">
h4 {
  padding: 0 10px;
  margin: 20px 0;
  border-left: 3px solid #ccc;
}

.my-card {
  width: 600px;
  margin: 20px 0;

  div {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 10px 0;
    border-bottom: 2px solid #409eff;

    span {
      margin: 0 20px;
      font-weight: bold;
    }
  }
}
</style>
