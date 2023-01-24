import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysErrorLog'

export default {


  getPageList(searchObj) {
    return request({
      url: `${api_name}/page`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/info/${id}`,
      method: 'get',
    })
  },

}
