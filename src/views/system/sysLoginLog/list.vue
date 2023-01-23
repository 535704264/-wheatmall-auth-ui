<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="用户名/Ip地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="访问时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-right: 10px;width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;">

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="120"/>
      <el-table-column prop="ipaddr" label="登陆Ip地址" width="130"/>
      <el-table-column prop="status" label="登陆状态" width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">success</span>
          <span v-if="scope.row.status === 1">failure</span>
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="提示信息" />
      <el-table-column prop="accessTime" label="访问时间" width="160"/>
      <el-table-column prop="createTime" label="创建时间" width="160"/>

    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: right;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import api from '@/api/system/sysLoginLog'

export default {
  //import引入的组件需要注入到对象中才能使用",
  components: {

  },
  data() {
    //这里存放数据",
    return {
      list: null, // banner列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      listLoading: false,
      createTimes: [],
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
    fetchData(page=1) {
      this.page = page
      if(this.createTimes && this.createTimes.length === 2) {
        this.searchObj.createTimeBegin = this.createTimes[0]
        this.searchObj.createTimeEnd = this.createTimes[1]
      }

      api.getPageList(this.page, this.limit, this.searchObj).then(
        response => {
          this.list = response.data.list
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    resetData() {
      this.searchObj = {}
      this.createTimes = []
      this.fetchData()
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
.search-div {
  padding:10px;border: 1px solid #EBEEF5;border-radius:3px;
}
</style>
