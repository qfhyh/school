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
    <div>
      <p class="title">学 年</p>
      <div class="select">
        <button  v-for="(item,index) in this.yearList" :key="index" v-if="index<6"
        :class="{active:index === isActive}" @click="updateXn(item,index)">
          {{item.name}}</button>
      </div>
      <div style="background:#F8F8F8;height:7px;"></div>
      <p class="title">年 级</p>
      <div class="select">
        <button  v-for="(item,index) in this.gradeList" :key="index"
        :class="{active:index === isActiveNj}" @click="updateNj(item,index)">
          {{item.gradeName}}</button>
      </div>
      <div style="background:#F8F8F8;height:7px;"></div>
      <p class="title">班 级</p>
      <div class="select">
        <button  v-for="(item,index) in this.showClassList" :key="index"
        :class="{active:index === isActiveBj}" @click="updateBj(item,index)">
          {{item.className}}</button>
      </div>
      <div style="background:#F8F8F8;height:7px;"></div>
      <p class="title">考试名称</p>
      <div class="exam">
        <button  v-for="(item,index) in this.showTaskList" :key="index"
        :class="{active:index === isActiveRw}" @click="updateRw(item,index)">
          {{item.examName}}</button>
      </div>
      <div style="background:#F8F8F8;height:7px;"></div>
      <p class="title">查询科目</p>
      <div class="select">
        <button  v-for="(item,index) in this.showCourseList" :key="index"
        :class="{active:index === isActiveKm}" @click="updateKm(item,index)">
          {{item.courseName}}</button>
      </div>
      <button class="submit" @click="select()">查  询</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import backButton from '@/components/backButton/backButton.vue';
import { getYearList, getTeaCouInfo } from '@/services/exam';

export default {
  name: 'examTea',
  data() {
    return {
      yearId: '',
      gradeId: '',
      classId: '',
      pjClassId: '',
      courseId: '',
      taskId: '',
      taskName: '',
      yearName: '',
      yearList: '',
      isActive: 0,
      isActiveNj: 0,
      isActiveBj: 0,
      isActiveRw: 0,
      isActiveKm: 0,
      isBzr: false,
      gradeList: [],
      taskList: [],
      classList: [],
      courseList: [],
      showClassList: [],
      showTaskList: [],
      showCourseList: [],
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
    updateXn(item, index) {
      this.isActive = index;
      this.yearId = item.id;
      this.getTeaCouInfo();
    },
    updateNj(item, index) {
      this.isActiveNj = index;
      this.gradeId = item.gradeId;
      this.defaultClassListAndTaskList();
    },
    updateBj(item, index) {
      this.isActiveBj = index;
      this.classId = item.classId;
      this.pjClassId = item.pjClassId;
      this.isBzr = item.isBzr;
      this.defaultCouList();
    },
    updateRw(item, index) {
      this.isActiveRw = index;
      this.taskId = item.examId;
      this.taskName = item.examName;
    },
    updateKm(item, index) {
      this.isActiveKm = index;
      this.courseId = item.courseId;
    },
    // 数组去重
    unique(arr, param) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr[param]) && res.set(arr[param], 1));
    },
    select() {
      this.$router.push({
        name: 'examTeaResult',
        params: {
          taskId: this.taskId,
          classId: this.classId,
          courseId: this.courseId,
          taskName: this.taskName,
        },
      });
    },
    async getYearList() {
      const data = await getYearList();
      this.yearId = data.data[0].id;
      this.yearList = data.data;
      this.getTeaCouInfo();
    },
    async getTeaCouInfo() {
      this.gradeList = [];
      this.classList = [];
      this.taskList = [];
      this.courseList = [];
      this.isBzr = false;
      const data = await getTeaCouInfo({ yearId: this.yearId, teaId: this.userInfo.id });
      this.pjclassList = data.data.pjclassList;
      if (this.pjclassList && this.pjclassList.length > 0) {
        this.pjclassList.forEach((element) => {
          const njList = {};
          const bjList = {};
          njList.gradeId = element.schoolGrade.id;
          njList.gradeName = element.schoolGrade.name;
          bjList.classId = element.schoolClassInfo.id;
          bjList.className = element.schoolClassInfo.bJMC;
          bjList.pjClassId = element.id;
          bjList.gradeId = element.schoolGrade.id;
          if (element.bzrteadherId === this.userInfo.id) {
            bjList.isBzr = true;
          } else {
            bjList.isBzr = false;
          }
          this.gradeList.push(njList);
          this.classList.push(bjList);
        });
        this.gradeList = this.unique(this.gradeList, 'gradeId');
        this.gradeId = this.gradeList[0].gradeId;
        this.classList = this.unique(this.classList, 'classId');
      }
      this.examTaskList = data.data.examTaskList;
      if (this.examTaskList && this.examTaskList.length > 0) {
        this.examTaskList.forEach((element) => {
          const ksList = {};
          ksList.examId = element.id;
          ksList.examName = element.examName;
          ksList.gradeId = element.gradeId;
          this.taskList.push(ksList);
        });
        this.taskList = this.unique(this.taskList, 'examId');
      }
      this.defaultClassListAndTaskList();
      this.cctList = data.data.cctList;
      if (this.cctList && this.cctList.length > 0) {
        this.cctList.forEach((element) => {
          const dkList = {};
          dkList.pjClassId = element.classId;
          dkList.courseId = element.course.id;
          dkList.courseName = element.course.kcmc;
          this.courseList.push(dkList);
        });
      }
      this.defaultCouList();
    },
    defaultClassListAndTaskList() {
      this.showClassList = [];
      this.classList.forEach((element) => {
        if (element.gradeId === this.gradeId) {
          this.showClassList.push(element);
        }
      });
      if (this.showClassList.length > 0) {
        this.classId = this.showClassList[0].classId;
        this.pjClassId = this.showClassList[0].pjClassId;
        this.isBzr = this.showClassList[0].isBzr;
      }
      this.showTaskList = [];
      this.taskList.forEach((element) => {
        if (element.gradeId === this.gradeId) {
          this.showTaskList.push(element);
        }
      });
      if (this.showTaskList.length > 0) {
        this.taskId = this.showTaskList[0].examId;
        this.taskName = this.showTaskList[0].examName;
      }
    },
    defaultCouList() {
      this.showCourseList = [];
      if (this.isBzr) {
        this.showCourseList.push({ pjClassId: this.pjClassId, courseId: '', courseName: '总分' });
      }
      this.courseList.forEach((element) => {
        if (element.pjClassId === this.pjClassId) {
          this.showCourseList.push(element);
        }
      });
      if (this.showCourseList.length > 0) {
        this.courseId = this.showCourseList[0].courseId;
      }
    },
  },
  mounted() {
    this.getYearList();
  },
};
</script>
<style scoped>
  .addressBook {
    padding-top: 44px;
  }
  .title {
    padding: 4%;
  }
  .select {
    padding: 0 2%;
    margin: 0 auto;
    margin-bottom: 2%;
  }
  .select button {
    width: 29.3%;
    border:1px solid#E0E0E0;
    border-radius:0.4em;
    padding: 2% 0;
    margin:0 2%;
    margin-bottom: 1%;
  }
  .exam {
    padding: 0 2%;
    margin: 0 auto;
    margin-bottom: 2%;
  }
  .exam button {
    width: 92%;
    border:1px solid#E0E0E0;
    border-radius:0.4em;
    padding: 2% 0;
    margin:0 2%;
    margin-bottom: 1%;
  }
  .active {
    background: #3399FF;
    color: #eee;
  }
  .submit {
    width: 70%;
    color: #eee;
    background: #3399FF;
    border:1px solid#E0E0E0;
    border-radius:1em;
    padding: 2% 0;
    margin:4% 15%;
    margin-bottom:10%;
  }
</style>
