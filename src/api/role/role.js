import request from '@/utils/request'

// 常量
const api_name = '/admin/system/sysRole'

export default {

  getPageList(searchObj) {
    return request({
      url: `${api_name}`+ '/page',
      method: 'get',
      params: searchObj
    })
  }
}


