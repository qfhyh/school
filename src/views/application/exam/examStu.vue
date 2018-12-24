<template>
  <div class="addressBook">
    <back-button></back-button>
    <van-nav-bar
      title="成绩系统"
      left-text="返回"
      right-text=" "
      left-arrow
      fixed
      @click-left="onClickLeft"/>
      <van-cell-group>
      <van-cell class="select" v-model="yearName"  @click="showXn = true;"
      is-link border input-align="center"/>
        <van-popup v-model="showXn" position="bottom">
          <van-picker show-toolbar :columns="yearNameList" @cancel="showXn = false"
          @confirm="onXn"/>
        </van-popup>
      <van-cell class="select" v-model="examName" @click="showKs = true;" is-link border
      input-align="center"/>
        <van-popup v-model="showKs" position="bottom">
          <van-picker show-toolbar :columns="examNameList" @cancel="showKs = false"
          @confirm="onKs"/>
        </van-popup>
      </van-cell-group>
      <div style="background:#F8F8F8;height:7px;"></div>
      <van-row  class="total" type="flex" justify="center">
        <van-col style="color:#3399FF;border-right:1px solid #B0C4DE" span="8">
          <p style="margin-bottom:15px;">总分</p><p>{{this.examResult.total}}</p></van-col>
        <van-col style="border-right:1px solid #B0C4DE" span="8">
          <p style="margin-bottom:15px;">班级排名</p><p>{{this.examResult.bjpm}}</p></van-col>
        <van-col span="8"><p style="margin-bottom:15px;">年级排名
          </p><p>{{this.examResult.njpm}}</p></van-col>
      </van-row>
      <div style="background:#F8F8F8;height:7px;"></div>
      <van-row  class="total" type="flex"
      v-for="(row, index) in this.ksxqList" :key = "index">
        <van-col style="border-right:1px solid #B0C4DE;" span="6"
        v-for="(cj, index) in row" :key = "index">
          <p style="margin-bottom:15px;color:#3399FF;">{{cj.finalScore}}</p>
          <p>{{cj.examSubjectruleInfo.schoolCourse.kcmc}}</p></van-col>
      </van-row>
      <div style="background:#F8F8F8;height:15px;"></div>
      <div style="overflow-x: scroll">
        <div id="main" style="margin-top:10px;margin-bottom:15px;
        height: 300px;font-size: 5px;margin-left:5px;padding: 5px"></div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import backButton from '@/components/backButton/backButton.vue';
import { getCurrentYear, getYearList, queryStuClassInfo, queryExamList, examSturesult, selectStuTotal } from '@/services/exam';

export default {
  name: 'examStu',
  data() {
    return {
      userName: '',
      yearId: '',
      yearName: '',
      yearList: [],
      yearNameList: [],
      showXn: false,
      showKs: false,
      examName: '',
      examId: '',
      examInfoList: [],
      examNameList: [],
      totalScore: [],
      examResult: [],
      list: [],
      taskNameList: [],
      ksxqList: [],
    };
  },
  components: {
    'back-button': backButton,
  },
  computed: {
    ...mapGetters('system', ['userInfo']),
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onXn(value) {
      this.showXn = false;
      this.yearName = value;
      this.yearList.forEach((element) => {
        if (element.name === value) {
          this.yearId = element.id;
          this.queryStuClassInfo();
        }
      });
    },
    onKs(value) {
      this.showKs = false;
      this.examName = value;
      this.examList.forEach((element) => {
        if (element.examName === value) {
          this.examId = element.id;
          this.examSturesult();
        }
      });
    },
    async getCurrentYear() {
      const data = await getCurrentYear();
      this.yearId = data.data.id;
      this.yearName = data.data.name;
      this.queryStuClassInfo();
    },
    async getYearList() {
      const data = await getYearList();
      this.yearList = data.data;
      this.yearList.forEach((element) => {
        this.yearNameList.push(element.name);
      });
    },
    async queryStuClassInfo() {
      const stuListId = [];
      stuListId.push(this.userInfo.id);
      const data = await queryStuClassInfo({ schoolYearId: this.yearId, sysUserId: stuListId });
      if (data.data.schoolPjclassunion != null &&
      data.data.schoolPjclassunion.schoolGrade != null) {
        this.queryExamList(data.data.schoolPjclassunion.schoolGrade.id);
      }
    },
    async queryExamList(grade) {
      const data = await queryExamList({ yearId: this.yearId, gradeId: grade });
      this.examList = data.data;
      if (this.examList != null && this.examList.length > 0) {
        this.examId = this.examList[0].id;
        this.examName = this.examList[0].examName;
        this.examSturesult();
      }
      this.examNameList = [];
      this.examList.forEach((element) => {
        this.examNameList.push(element.examName);
      });
    },
    async examSturesult() {
      const data = await examSturesult({ stuId: this.userInfo.id, taskId: this.examId });
      this.examResult = data.data;
      if (this.examResult.bjpm) {
        this.examResult.bjpm = Math.round(this.examResult.bjpm);
      }
      if (this.examResult.njpm) {
        this.examResult.njpm = Math.round(this.examResult.njpm);
      }
      if (this.examResult.gkcj) {
        this.ksxqList = [];
        let x;
        const size = 4;
        for (x = 0; x < this.examResult.gkcj.length / size; x += 1) {
          const start = x * size;
          const end = start + size;
          this.ksxqList.push(this.examResult.gkcj.slice(start, end));
        }
      }
    },
    async selectStuTotal() {
      const { data } = await selectStuTotal({ stuId: this.userInfo.id });
      this.stuTotle = data;
      this.totalScore = [];
      this.taskNameList = [];
      let i = 1;
      this.totalScore[0] = {};
      this.taskNameList.push('');
      this.stuTotle.forEach((element) => {
        this.taskNameList.push(element.examName);
        this.totalScore[i] = { value: element.score, taskId: element.taskId, stuId: element.stuId };
        i += 1;
      });
      this.getEchars();
    },
    getEchars() {
      this.userName = this.userInfo.userName;
      // 基于准备好的dom，初始化echars实例
      const myChart = this.$echarts.init(document.getElementById('main'));
      window.onresize = myChart.resize;
      // myChart.on('click', params =>
      //   this.$router.push({
      //     name: 'stuExamInfo',
      //     params: { taskId: params.data.taskId, stuId: params.data.stuId },
      //   }));
      myChart.setOption({
        title: {
          text: '考试成绩总分走向',
          left: 'center',
        },
        calculable: true,
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: [0],
            show: false,
            start: 0,
            end: 50,
            zoomLock: true,
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            show: false,
            start: 0,
            end: 50,
            zoomLock: true,
          },
        ],
        grid: {
          left: '4%',
          right: '4%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.taskNameList,
          axisLabel: {
            interval: 0,
          },
          axisTick: {
            interval: 0,
            inside: true,
            alignWithLabel: true,
            lignWithLabel: true,
          },
        }],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [{
          type: 'line',
          smooth: true,
          clickable: true,
          showSymbol: true,
          symbol: 'circle',
          itemStyle: { normal: { color: '#3399FF', areaStyle: { type: 'default' }, label: { show: true } } },
          data: this.totalScore,
        }],
      });
    },
  },
  mounted() {
    this.getCurrentYear();
    this.getYearList();
    this.selectStuTotal();
  },
};
</script>
<style scoped>
  .addressBook {
    padding-top: 44px;
  }
  .select {
    width: 70%;
    margin:0 auto;
    color:#3399FF;
    text-align:center;
  }
  .total {
    text-align:center;
    padding:15px 0;
  }
</style>
