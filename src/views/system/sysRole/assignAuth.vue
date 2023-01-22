<template>
  <div class="app-container">
    <div style="padding: 20px 20px 0 20px;">
      授权角色：{{ $route.query.roleName }}
    </div>
    <el-tree
      style="margin: 20px 0"
      ref="tree"
      :data="sysMenuList"
      node-key="id"
      show-checkbox
      default-expand-all
      :props="defaultProps"
    />
    <div style="padding: 20px 20px;">
      <el-button :loading="loading" type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button @click="$router.push('/system/sysRole')" size="mini" icon="el-icon-refresh-right">返回</el-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import api from '@/api/system/sysMenu'
export default {
  //import引入的组件需要注入到对象中才能使用",
  components: {

  },
  data() {
    //这里存放数据",
    return {
      loading: false, // 用来标识是否正在保存请求中的标识, 防止重复提交
      sysMenuList: [], // 所有
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    };
  },
  //监听属性 类似于data概念",
  computed: {

  },
  //监控data中的数据变化",
  watch: {

  },
  //方法集合",
  methods: {
    /*
         初始化
         */
    fetchData() {
      const roleId = this.$route.query.id
      api.toAssign(roleId).then(result => {
        const sysMenuList = result.data
        this.sysMenuList = sysMenuList
        const checkedIds = this.getCheckedIds(sysMenuList)
        console.log('getPermissions() checkedIds', checkedIds)
        this.$refs.tree.setCheckedKeys(checkedIds)
      })
    },

    /*
    得到所有选中的id列表
    */
    getCheckedIds (auths, initArr = []) {
      return auths.reduce((pre, item) => {
        if (item.select && item.children.length === 0) {
          pre.push(item.id)
        } else if (item.children) {
          this.getCheckedIds(item.children, initArr)
        }
        return pre
      }, initArr)
    },

    /*
    保存权限列表
    */
    save() {
      debugger
      //获取到当前子节点
      //const checkedNodes = this.$refs.tree.getCheckedNodes()
      //获取到当前子节点及父节点
      const allCheckedNodes = this.$refs.tree.getCheckedNodes(false, true);
      let idList = allCheckedNodes.map(node => node.id);
      console.log(idList)
      let assginMenuVo = {
        roleId: this.$route.query.id,
        menuIdList: idList
      }
      this.loading = true
      api.doAssign(assginMenuVo).then(result => {
        this.loading = false
        this.$message.success(result.$message || '分配权限成功')
        this.$router.push('/system/sysRole');
      })
    }
  },
  //生命周期 - 创建之前",数据模型未加载,方法未加载,html模板未加载
  beforeCreate() {
  },

  //生命周期 - 创建完成（可以访问当前this实例）",数据模型已加载，方法已加载,html模板已加载,html模板未渲染
  created() {
    this.fetchData()
  },
  //生命周期 - 挂载之前",html模板未渲染
  beforeMount() {

  },

  //生命周期 - 挂载完成（可以访问DOM元素）",html模板已渲染
  mounted() {

  },

  //生命周期 - 更新之前",数据模型已更新,html模板未更新
  beforeUpdate() {

  },
  //生命周期 - 更新之后",数据模型已更新,html模板已更新
  updated() {

  },
  //生命周期 - 销毁之前",
  beforeDestroy() {

  },
  destroyed() {

  },
  //生命周期 - 销毁完成",
  //如果页面有keep-alive缓存功能，这个函数会触发",
  activated() {

  },
}


// "http-get请求": {
//   "prefix": "httpget",
//     "body": [
//     "this.\({",
//     "url: this.\\$http.adornUrl(''),",
//     "method: 'get',",
//     "params: this.\\$http.adornParams({})",
//     "}).then(({ data }) => {",
//     "})"
//   ],
//     "description": "httpGET请求"
// },
// "http-post请求": {
//   "prefix": "httppost",
//     "body": [
//     "this.\({",
//     "url: this.\\$http.adornUrl(''),",
//     "method: 'post',",
//     "data: this.\\$http.adornData(data, false)",
//     "}).then(({ data }) => { });"
//   ],
//     "description": "httpPOST请求"
// }
// }

</script>

<style scoped>

</style>
