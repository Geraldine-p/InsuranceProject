<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-input placeholder="请输入保单号" v-model.number="SearchKey"></el-input>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
        </el-row>

        <div class="SearchContent" v-if="dataList.length!==0">
            <el-descriptions class="margin-top" :column="3" border size="small" style="margin-top: 10px">

                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        投保人
                    </template>
                    {{ dataList.insurer.name }}

                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{ dataList.insurer.phone }}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    {{ dataList.insurer.address }}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        性别
                    </template>
                    <div v-if="dataList.insurer.gender==1">男</div>
                    <div v-if="dataList.insurer.gender==2">女</div>
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        身份证号
                    </template>

                    {{ dataList.insurer.id_number }}
                    <!--<el-tag size="small">学校</el-tag>-->
                </el-descriptions-item>

            </el-descriptions>
            <el-descriptions class="margin-top" :column="3" border size="small" style="margin-top: 10px">

                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        被保险人
                    </template>
                    {{ dataList.insured.name }}

                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{ dataList.insured.phone }}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    {{ dataList.insured.address }}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        性别
                    </template>
                    <div v-if="dataList.insured.gender==1">男</div>
                    <div v-if="dataList.insured.gender==2">女</div>
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        身份证号
                    </template>

                    {{ dataList.insured.id_number }}
                    <!--<el-tag size="small">学校</el-tag>-->
                </el-descriptions-item>

            </el-descriptions>
            <el-descriptions class="margin-top" :column="3" border size="small" style="margin-top: 10px">

                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        受益人
                    </template>
                    <!--{{ dataList.insurer.name }}-->
                    {{ dataList.beneficiary.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>

                    {{ dataList.beneficiary.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    {{ dataList.beneficiary.address }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        性别
                    </template>
                    <div v-if="dataList.beneficiary.gender==1">男</div>
                    <div v-if="dataList.beneficiary.gender==2">女</div>
                    <!--<el-tag size="small">学校</el-tag>-->
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        身份证号
                    </template>

                    {{ dataList.beneficiary.id_number }}
                    <!--<el-tag size="small">学校</el-tag>-->
                </el-descriptions-item>

            </el-descriptions>
            <el-descriptions class="margin-top" :column="4" border size="small" style="margin-top: 10px">
                <el-descriptions-item>
                    <template slot="label">
                        保险名称
                    </template>
                    <!--{{ dataList.insurer.name }}-->
                    {{ dataList.insurance.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        险种名称&赔偿金额
                    </template>

                    <div v-for="item in dataList.insurance.content">

                        <el-tag size="small">&nbsp;{{ item.description }} {{ item.compensation }}</el-tag>

                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        年免赔额
                    </template>
                    {{ dataList.insurance.deductible }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">

                        保费
                    </template>
                    {{ dataList.insurance.premium }}
                </el-descriptions-item>


            </el-descriptions>
            <el-descriptions class="margin-top" :column="3" border style="margin-top: 10px">
                <el-descriptions-item>
                    <template slot="label">

                        保单号
                    </template>
                    {{ dataList.number }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        险种ID
                    </template>

                    {{ dataList.insurance.id }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        时间
                    </template>
                    {{ dataList.start_time|startTime }}至{{ dataList.end_time|endTime }}
                </el-descriptions-item>


            </el-descriptions>
        </div>
        <div class="SearchContent" v-if="dataList.length===0"
             style="display: flex;justify-content: center;margin-top: 50px"><h3>暂无数据</h3></div>
    </div>
</template>
<script>

import axios from "axios";

export default {
    name: 'Search',
    data() {
        return {
            SearchKey: '',
            dataList: []
        }
    },
    methods: {
        search() {
            let policyNumberDetail = 'http://vaala.cloud:9046/search/policyNumberDetail/'
            if (!this.SearchKey) return this.$message('请输入保单号')
            axios.get(policyNumberDetail + this.SearchKey).then(res => {


                if (res.data.code === 200) {
                    this.dataList = res.data.data["policy"]
                }
                if (res.data.code === 500) {
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(err => {
                console.log(err)
            })
        },

    },
    filters: {
        startTime: function (val) {
            console.log(val)
            let date = new Date(val)
            let year = date.getFullYear()

            let month = date.getMonth() + 1
            let day = date.getDate()
            return year + '-' + month + '-' + day

        },
        endTime: function (val) {
       
            let date = new Date(val)
            let year = date.getFullYear()

            let month = date.getMonth() + 1
            let day = date.getDate()
            return year + '-' + month + '-' + day
        }
    }
}
</script>
<style scoped lang="scss">

</style>
