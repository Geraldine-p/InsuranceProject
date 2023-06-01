<template>
    <div>
        <div class="addForm">
            <h4>创建险种</h4>
            <el-form
                    ref="form"
                    :model="insertData"
                    label-width="80px"
                    :inline="true"
                    size="small"
                    class="demo-dynamic"
            >
                <el-row :gutter="24" type="flex" justify="center">
                    <el-col :span="24 / 2">
                        <el-form-item label="保险名称">
                            <el-input v-model="insertData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年免赔额">
                            <el-input v-model="insertData.deductible"></el-input>
                        </el-form-item>
                        <el-form-item label="保费">
                            <el-input v-model.number="insertData.premium"></el-input>
                        </el-form-item>
                    </el-col>

                    <!--动态增加保险内容-->
                    <el-col :span="24 / 2">
                    <div v-for="(item, index) in insertData.content" :key="index">
                        <el-form-item
                            label="保障内容"
                            :prop="'content.' + index + '.description'"
                            :rules="{
                            required: true, message: '描述不能为空', trigger: 'blur'
                            }"
                        >
                            <el-input v-model="item.description"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="赔偿金额"
                            :prop="'content.' + index + '.compensation'"
                            :rules="{
                            required: true, message: '金额不能为空', trigger: 'blur'
                            }"
                        >
                        <el-input v-model.number="item.compensation"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <i class="el-icon-delete" @click="deleteItem(item, index)" />
                        </el-form-item>
                    </div>
                    <el-button type="success" plain @click="addItem">添加保障内容</el-button>
                </el-col>
                    <!--在这里插入原有保障内容代码-->                    
                    <!--在这里插入原有保障内容代码-->  
                </el-row>
                <el-row></el-row>
                <el-form-item style="display: flex; justify-content: center">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="$refs.form.resetFields()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <h4>查看所有险种</h4>
        <div>
            当前有
            <span style="font-weight: bold; font-size: 20px">{{
                dataList.length
                }}</span
            >个险种
        </div>
        <el-table
                :data="dataList"
                style="width: 100%; margin-top: 20px"
                height="350px"
        >
            <el-table-column prop="id" label="#" width="50px"></el-table-column>
            <el-table-column prop="name" label="保险名称"></el-table-column>
            <el-table-column label="保险内容">
                <template slot-scope="scoped">
                    <div v-for="item in scoped.row.content">
                        <el-tag size="mini"
                        >{{ item.description }}
                            <span style="color: black">{{ item.compensation }}</span></el-tag
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="deductible" label="年免赔额"></el-table-column>
            <el-table-column prop="premium" label="保费"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "Type",
    data() {
        return {
            dataList: [],
            insertData: {
                name: "", //保险名称
                content:[{
                    description: '',
                    compensation: ''
                }
            ],
                deductible: "", //年免赔额
                premium: "", //保费
            },
        };
    },
    methods: {
        getData() {
            axios.get("http://vaala.cloud:9046/insurance/list").then((res) => {
                this.dataList = res.data.data.insurance_list;
            });
        },
        onSubmit() {
            // 对this.insertData使用es6的解构赋值拿到每个数据
            let {name, content, deductible, premium} = this.insertData;
            // 非空判断
            if (!name || !content || !deductible || !premium) {
                this.$message({
                    message: "请填写完整信息",
                    type: "warning",
                });
                return;
            }
            // 如果this.insertData.content中两个元素有一个为空
            if (!content[0].description || !content[0].compensation || !content[1].description || !content[1].compensation) {
                this.$message({
                    message: "请填写完整保险信息",
                    type: "warning",
                });
                return;
            }

            axios.post("http://vaala.cloud:9046/insurance/create", {
                name: this.insertData.name,
                // content: [
                //     {
                //         description: this.insertData.content[0].description,
                //         compensation: this.insertData.content[0].compensation,
                //     },
                //     {
                //         description: this.insertData.content[1].description,
                //         compensation: this.insertData.content[1].compensation,
                //     },
                // ],
                content: this.insertData.content,
                deductible: parseInt(this.insertData.deductible),
                premium: this.insertData.premium,
            })
                .then((res) => {
                    if (res.data.code === 200) {
                        this.$message({
                            message: "创建成功",
                            type: "success",
                        });
                    } else {
                        this.$message({
                            message: "创建失败",
                            type: "error",
                        });
                    }
                    this.getData();
                });
        },
        addItem() {
            this.insertData.content.push({
                description: '',
                compensation: ''
        })
        },
        deleteItem(item, index) {
            this.insertData.content.splice(index, 1)
        },

    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped lang="scss">
h4 {
  padding: 0 10px;
  margin: 20px 0;
  border-left: 3px solid #ccc;
}
</style>
