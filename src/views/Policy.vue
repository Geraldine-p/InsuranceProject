<template>
    <div>
        <h4>添加保单</h4>
        <el-form ref="form" :model="insertPolicyForm" label-width="auto" :inline="true" size="small">
            <div class="insurer">
                <h5 style="margin: 10px 0;">投保人</h5>
                <div>
                    <el-form-item label="姓名">
                        <el-input v-model="insertPolicyForm.insurer.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="insertPolicyForm.insurer.id_number"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="insertPolicyForm.insurer.gender" label="1">男</el-radio>
                        <el-radio v-model="insertPolicyForm.insurer.gender" label="2">女</el-radio>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="地址">
                        <el-input v-model="insertPolicyForm.insurer.address"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="insertPolicyForm.insurer.phone"></el-input>
                    </el-form-item>
                </div>

            </div>
            <div class="insured">
                <h5 style="margin: 10px 0;">被保险人</h5>
                <div>
                    <el-form-item label="姓名">
                        <el-input v-model="insertPolicyForm.insured.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="insertPolicyForm.insured.id_number"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="insertPolicyForm.insured.gender" label="1">男</el-radio>
                        <el-radio v-model="insertPolicyForm.insured.gender" label="2">女</el-radio>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="地址">
                        <el-input v-model="insertPolicyForm.insured.address"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="insertPolicyForm.insured.phone"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="beneficiary">
                <h5 style="margin: 10px 0;">受益人</h5>
                <div>
                    <el-form-item label="姓名">
                        <el-input v-model="insertPolicyForm.beneficiary.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="insertPolicyForm.beneficiary.id_number"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="insertPolicyForm.beneficiary.gender" label="1">男</el-radio>
                        <el-radio v-model="insertPolicyForm.beneficiary.gender" label="2">女</el-radio>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="地址">
                        <el-input v-model="insertPolicyForm.beneficiary.address"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="insertPolicyForm.beneficiary.phone"></el-input>
                    </el-form-item>
                </div>
            </div>
            <el-form-item label="保单号">
                <el-input v-model="insertPolicyForm.number"></el-input>
            </el-form-item>
            <el-form-item label="险种ID">
                <el-select v-model="insertPolicyForm.insurance_id" placeholder="请选择">
                    <el-option
                            v-for="(item,index) in insuranceList"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>          
            <el-form-item label="保险期间">
                <el-date-picker
                        type="date"
                        v-model="insertPolicyForm.start_time"
                        placeholder="开始日期">
                </el-date-picker>
                <el-date-picker
                        type="date"
                        v-model="insertPolicyForm.end_time"
                        :picker-options="pickerOptions"
                        placeholder="结束日期">

                </el-date-picker>
            </el-form-item>


            <el-form-item style="display: flex;justify-content: center">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <h4>查看所有保单</h4>
        <el-table :data="dataList" style="width: 100%">
            <el-table-column prop="id" label="#"></el-table-column>
            <el-table-column prop="insurance_id" label="险种ID"></el-table-column>
            <el-table-column prop="insurer.name" label="投保人"></el-table-column>
            <el-table-column prop="beneficiary.name" label="受益人"></el-table-column>
            <el-table-column prop="insured.name" label="被保险⼈"></el-table-column>
            <el-table-column prop="number" label="保单号"></el-table-column>
            <el-table-column label="开始时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.start_time|format }}</span>
                </template>
            </el-table-column>
            <el-table-column label="结束时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.start_time|format }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: 'Type',
    data() {
        return {

            dataList: [],
            insuranceList: [],
            insertPolicyForm: {
                "insurer": { // 保险⼈
                    "name": "",
                    "id_number": "",
                    "gender": '',
                    "address": "",
                    "phone": ""
                },
                "insured": { // 被保险⼈
                    "name": "",
                    "id_number": "",
                    "gender": '',
                    "address": "",
                    "phone": ""
                },
                "beneficiary": { // 受益⼈
                    "name": "",//受益人姓名
                    "id_number": "",//身份证号
                    "gender": '',//性别
                    "address": "",//地址
                    "phone": ""//电话
                },
                "number": "", // 保单号
                "insurance_id": '', // 险种ID
                "start_time": '', // 开始时间戳
                "end_time": '' // 结束时间戳
            },
        }
    },
    //动态计算禁用时间
    computed:{
        pickerOptions(){
                let that = this;
                return {
                disabledDate(time) {
                    return time.getTime() < that.insertPolicyForm.start_time.getTime();
                }
            }
        }
    },
    methods: {
        onSubmit() {
            //做一个非空判断
            let {
                insurer,
                insured,
                beneficiary,
                number,
                insurance_id,
                start_time,
                end_time
            } = this.insertPolicyForm
            if (!insurer || !insured || !beneficiary || !number || !insurance_id || !start_time || !end_time) return this.$message.error('请填写完整信息')
            // 把日期转换成时间戳
            this.insertPolicyForm.start_time = new Date(this.insertPolicyForm.start_time).getTime()
            this.insertPolicyForm.end_time = new Date(this.insertPolicyForm.end_time).getTime()

            let data = this.insertPolicyForm
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.post('http://vaala.cloud:9046/policy/create', {
                "insurer": {
                    "name": this.insertPolicyForm.insurer.name,
                    "id_number": this.insertPolicyForm.insurer.id_number,
                    "gender": parseInt(this.insertPolicyForm.insurer.gender),
                    "address": this.insertPolicyForm.insurer.address,
                    "phone": this.insertPolicyForm.insurer.phone
                },
                "insured": {
                    "name": this.insertPolicyForm.insured.name,
                    "id_number": this.insertPolicyForm.insured.id_number,
                    "gender": parseInt(this.insertPolicyForm.insured.gender),
                    "address": this.insertPolicyForm.insured.address,
                    "phone": this.insertPolicyForm.insured.phone
                },
                "beneficiary": {
                    "name": this.insertPolicyForm.beneficiary.name,
                    "id_number": this.insertPolicyForm.beneficiary.id_number,
                    "gender": parseInt(this.insertPolicyForm.beneficiary.gender),
                    "address": this.insertPolicyForm.beneficiary.address,
                    "phone": this.insertPolicyForm.beneficiary.phone
                },
                "number": this.insertPolicyForm.number,
                "insurance_id": this.insertPolicyForm.insurance_id,
                "start_time": this.insertPolicyForm.start_time,
                "end_time": this.insertPolicyForm.end_time
            }).then(res => {
                console.log(res)
                if (res.data.code === 200) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                }

                this.getData();
            }).catch(err => {
                console.log(err)
            })
        },
        getData() {
            axios.get('http://vaala.cloud:9046/policy/list').then(res => {
                this.dataList = res.data.data.policy_list

            }).catch(err => {
                console.log(err)
            })
        },
        getInsuranceList() {
            axios.get('http://vaala.cloud:9046/insurance/list').then(res => {
                console.log(res.data.data.insurance_list)
                let insurance_list = res.data.data.insurance_list
                insurance_list.forEach(item => {
                    // 把item里的id和name亿对象形式放到this.insuranceList里
                    this.insuranceList.push({
                        id: item.id,
                        name: item.name
                    })
                    console.log(this.insuranceList)
                })
                // this.insuranceList = res.data.data.insurance_list

            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getData();
        this.getInsuranceList()
    },
    filters: {
        format(value) {
            let date = new Date(value)
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            return `${year}-${month}-${day}`
        }
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
