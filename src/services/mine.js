import request from '@/utils/request';

/**
 * 获取验证码
 * @param  {[type]} typeText "修改密码验证码"
 * @param  {[type]} type 3
 * @param  {[type]} phone 手机号
 * @return {[type]}      [description]
 */
export function getCode(data) {
  return request({
    method: 'post',
    url: '/api/loginBeforeMobile/send/code',
    data,
  });
}

/**
 * 忘记密码
 * @param  {[type]} userId
 * @param  {[type]} safecode
 * @param  {[type]} phone 手机号
 * @param  {[type]} passWord
 * @return {[type]}      [description]
 */
export function setPsd(data) {
  return request({
    method: 'post',
    url: '/api/loginBeforeMobile/update/passwordByCode',
    data,
  });
}

/**
 * 修改密码
 * @param  {[type]} loginId
 * @param  {[type]} oldPassword
 * @param  {[type]} password
 * @return {[type]}      [description]
 */
export function setNewPsd(data) {
  return request({
    method: 'post',
    url: '/api/mobileSysUser/update/password',
    data,
  });
}