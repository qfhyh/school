<template>
  <div class="addressBook">
    <back-button></back-button>
    <van-nav-bar
      title="成绩系统"
      left-text=""
      right-text=" "
      left-arrow
      fixed />
    <div>
      <p class="examName">{{this.taskName}}</p>
      <div style="background:#F8F8F8;height:10px;"></div>
      <van-row  class="total" type="flex" justify="center">
        <van-col style="border-right:1px solid #B0C4DE" span="12">
          <p style="margin-bottom:15px;">平均分</p><p>{{this.zfpjf.pjf}}</p></van-col>
        <van-col style="border-right:1px solid #B0C4DE;color:#3399FF;" span="12">
          <p style="margin-bottom:15px;">年级排名</p><p>{{this.zfpjf.rank}}</p></van-col>
      </van-row>
      <div style="background:#F8F8F8;height:10px;"></div>
      <ul class="xsfs">
        <li><span style="width:30%">学生姓名</span><span>总分</span><span>排名</span></li>
        <li v-for="(item,index) in this.gxsfs" :key="index">
          <span>{{item.stuName}}</span><span>{{item.total}}</span><span>{{item.rank}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import backButton from '@/components/backButton/backButton.vue';
import { queryTeaClassExamResult } from '@/services/exam';

export default {
  name: 'examTeaResult',
  data() {
    return {
      taskName: '',
      result: [],
      zfpjf: {},
      gxsfs: [],
    };
  },
  components: {
    'back-button': backButton,
  },
  methods: {
    async queryTeaClassExamResult() {
      const param = this.$route.params;
      this.taskName = param.taskName;
      const data = await queryTeaClassExamResult(param);
      this.result = data.data;
      if (this.result && this.result.zfpjf.length > 0) {
        this.result.zfpjf.forEach((element) => {
          this.zfpjf = element;
          this.zfpjf.rank = Math.round(this.zfpjf.rank);
        });
      }
      this.gxsfs = this.result.gxsfs;
    },
  },
  mounted() {
    this.queryTeaClassExamResult();
  },
};
</script>
<style scoped>
  .addressBook {
    padding-top: 44px;
  }
  .examName {
    margin: 4%;
    color: #3399FF;
  }
  .total {
    text-align:center;
    padding:15px 0;
  }
  .xsfs li{
    padding:3%;
    border-bottom: 1px solid #B0C4DE;
    text-align:center;
  }
  .xsfs span{
    width: 30%;
    display: -moz-inline-box;
    display:inline-block;
  }
</style>
