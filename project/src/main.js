// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from '../node_modules/echarts'
import axios from 'axios'
import qs from 'qs'
/////////////////////
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
axios.defaults.baseURL = "/api";

axios.defaults.timeout = 300000;

axios.interceptors.request.use( (config) => {
    let token = sessionStorage.getItem('userToken');
    if(token){
      config.headers.Authorization = token;
    }
    if (config.headers["Content-Type"] === "application/json"){
      return config;
    }
    // debugger;
    // config.url.indexOf('/soft-detail/create') != -1||config.url.indexOf('/soft-detail/update') != -1||(config.url.indexOf('/soft-standBook/import') != -1 ||
    if(config.url == "/stock-in-register/import" || config.url === '/soft-detail/create' || config.url === "/soft-detail/update" || config.url === "/soft-standBook/import"
    || config.url == '/stock-in-register/single-register'){
      return config
    }else{
      config.method == 'post' ? config.data = qs.stringify(config.data) : '';
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  });
axios.interceptors.response.use(
  (response)=>{
  if (response.data.code === 12){
    router.replace({
      path: '/' // 到登录页重新获取token
    })

  }
  return response;
  },
  err=>{
  }
)
import {
   Pagination,
  Dialog,
  // Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  // Menu,
  //Submenu,
  //MenuItem,
  // MenuItemGroup,
  Input,
  InputNumber,
   Radio,
  // RadioGroup,
   RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
   Switch,
  Select,
   Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
   DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
   Breadcrumb,
   BreadcrumbItem,
  Form,
  FormItem,
   Tabs,
   TabPane,
  Tag,
  Tree,
  // Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Badge,
  Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  // Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
 Vue.use(Radio);
// Vue.use(RadioGroup);
 Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
 Vue.use(Switch);
Vue.use(Select);
 Vue.use(Option);
// Vue.use(OptionGroup);
Vue.use(Button);
// Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
 Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Tooltip);
 Vue.use(Breadcrumb);
 Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
 Vue.use(Tabs);
 Vue.use(TabPane);
Vue.use(Tag);
 Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Badge);
Vue.use(Card);
// Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */

Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
};

window.eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
