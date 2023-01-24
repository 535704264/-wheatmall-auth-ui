<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="请求路径">
              <el-input style="width: 95%" v-model="searchObj.requestUri" placeholder="请求路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="请求方式/IP"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="16" >
          <el-col :span="8">
            <el-form-item label="操作时间">
              <el-date-picker
                v-model="createTimes"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-right: 10px;width: 95%;"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin-left: 15px">
            <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
          </el-col>
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

      <el-table-column prop="requestUri" label="请求路径" />
      <el-table-column prop="requestMethod" label="请求方式" width="80"/>
      <el-table-column prop="requestParams" label="请求参数" />
      <el-table-column prop="ip" label="操作IP" width="120"/>
      <el-table-column prop="errorInfo" label="异常信息"  :show-overflow-tooltip="true" min-width="300"/>

      <el-table-column prop="creator" label="操作人员" width="90"/>
      <el-table-column prop="createDate" label="操作时间" width="110"/>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="info(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
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

    <!--详情-->
    <el-dialog
      title="异常详情"
      :visible.sync="dialogVisible"
      width="40%"
      >
      <el-descriptions  :column="1" direction="vertical" :colon="false">
        <el-descriptions-item  labelStyle="font-weight: 700">{{errorInfo}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import api from '@/api/system/sysErrorLog'
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
      searchObj: {requestUri:"", keyword:""}, // 查询表单对象
      listLoading: false,
      createTimes: [],
      dialogVisible: false,
      errorInfo: "",
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
      if(this.createTimes && this.createTimes.length === 2) {
        this.searchObj.createTimeBegin = this.createTimes[0]
        this.searchObj.createTimeEnd = this.createTimes[1]
      }
      this.searchObj.page = page
      this.searchObj.limit = this.limit

      api.getPageList(this.searchObj).then(
        response => {
          this.list = response.data.list
          this.total = response.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },
    resetData() {
      this.searchObj = {requestUri:"", keyword:""}
      this.createTimes = []
      this.fetchData()
    },
    info(id) {
      api.getById(id).then(resp=>{
        this.errorInfo = resp.data.errorInfo
      })
      this.dialogVisible = true
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


</script>

<style scoped>
.search-div {
  padding:10px;border: 1px solid #EBEEF5;border-radius:3px;
}
</style>
