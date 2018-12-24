import request from '@/utils/request';
/**
 * 获取当前学年
 * @return {[type]}         [description]
 */
export function getCurrentYear(data = {}) {
  return request({
    method: 'put',
    url: '/api/school/read/currentYear',
    data,
  });
}
/**
 * 获取学年列表
 * @return {[type]}         [description]
 */
export function getYearList(data = {}) {
  return request({
    method: 'put',
    url: '/api/school/read/getSchoolYears',
    data,
  });
}
/**
 * 获取学生学籍信息
 * @return {[type]}         [description]
 */
export function queryStuClassInfo(data) {
  return request({
    method: 'put',
    url: '/api/MobileUserStuStatus/read/queryStuClassInfo',
    data,
  });
}
/**
 * 查询学年下 该学生所在年级的考试
 * @return {[type]}         [description]
 */
export function queryExamList(data) {
  return request({
    method: 'put',
    url: '/api/v1/examMobile/taskinfo/list',
    // headers: "{'api-version':'1.0'}",
    data,
  });
}
/**
 * 根据学生id 考试任务 获取该学生该考试的情况
 * @return {[type]}         [description]
 */
export function examSturesult(data) {
  return request({
    method: 'put',
    url: '/api/v1/examMobile/getExamStuResulltByStuId',
    data,
  });
}
/**
 * 根据学生id获取学生所有的考试总分
 * @param  {[string]} stuId [学生id]
 * @return {[type]}         [description]
 */
export function selectStuTotal(data) {
  return request({
    method: 'put',
    url: '/api/v1/examMobile/read/queryExamResultByStuId',
    data,
  });
}
/**
 * 根据学年 教师id 获取该教师的 代课信息（班级 考试 科目）
 * @param  {[string]} teaId [用户id]
 * @param  {[string]} yearId [学年id]
 * @return {[type]}         [description]
 */
export function getTeaCouInfo(data) {
  return request({
    method: 'put',
    url: '/api/v1/examMobile/queryClassByTea',
    data,
  });
}
/**
 * 根据考试任务id 班级id 科目id 获取班级考试的详情
 * @return {[type]}         [description]
 */
export function queryTeaClassExamResult(data) {
  return request({
    method: 'put',
    url: '/api/v1/examMobile/read/queryTeaClassExamResult',
    data,
  });
}
