<template>
  <div class="app-container">
    <div class="search-div">
      <el-form label-width="70px" size="small">
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="请求路径">
              <el-input style="width: 95%" v-model="searchObj.operUrl" placeholder="请求路径"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关 键 字">
              <el-input style="width: 95%" v-model="searchObj.keyword" placeholder="操作模块/操作人"></el-input>
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
          <el-clo :span="8" style="margin-left: 15px">
            <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
          </el-clo>
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

      <el-table-column prop="title" label="系统模块" />
      <el-table-column prop="operatorType" label="操作类型" />
      <el-table-column prop="businessType" label="请求方式" />
      <el-table-column prop="operUrl" label="请求路径" />
      <el-table-column prop="operName" label="操作人员" />
      <el-table-column prop="operIp" label="操作IP"/>

      <el-table-column prop="status" label="操作状态" >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">正常</span>
          <span v-if="scope.row.status === 1">异常</span>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="创建时间" />
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
      title="日志详情"
      :visible.sync="dialogVisible"
      width="40%">
      <el-descriptions  :column="1" direction="vertical">
        <el-descriptions-item  labelStyle="font-weight: 700" label="请求路径">{{operUrl}}</el-descriptions-item>
        <el-descriptions-item  labelStyle="font-weight: 700" label="请求参数">{{operParam}}</el-descriptions-item>
        <el-descriptions-item labelStyle="font-weight: 700" label="返回结果">{{jsonResult}}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import api from '@/api/system/sysOperLog'
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
      dialogVisible: false,
      jsonResult: "无",
      operParam: "无",
      operUrl:""
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
    },
    info(id) {
        api.getById(id).then(resp=>{
          this.jsonResult = resp.data.jsonResult
          this.operParam = resp.data.operParam
          this.operUrl = resp.data.operUrl
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
