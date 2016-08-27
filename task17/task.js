/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
  /*数据格式演示
  "day":{
    "北京":{
      "2016-01-01":50,
      "2016-01-01":50,
      "2016-01-01":50,
      "2016-01-01":50,
      ...
    }
    "上海":{
      ...
      ...
    }
    ...
  }
  "week":{
    "北京":{
      "第1周":50,
      "第2周":50,
      "第3周":50,
      "第4周":50,
      ...
    }
    "上海":{
      ...
      ...
    }
    ...
  }
  "month":{
    "北京":{
      "第1月":50,
      "第2月":50,
      "第3月":50,
    }
    "上海":{
      ...
      ...
    }
    ...
  }
  */
};

// 记录当前页面的表单选项和随机数最大值
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day",
  nowMaxValue: -1
}

/**
 * 渲染图表
 */
function renderChart(object) {
  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  // 将渲染区的高度设置为(aqi最大值+5px)
  aqiChartWrap.style.height = pageState.nowMaxValue+5;
  aqiChartWrap.innerHTML = "";
  for(var key in object){
    var div = document.createElement("div");
    div.style.height = object[key];
    div.setAttribute("class",pageState.nowGraTime+"-div");
    div.title = key+"指数为:"+object[key];
    aqiChartWrap.appendChild(div);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(a) {
  var time = a.value;

  if (time!=pageState.nowGraTime && a.checked) {
    pageState.nowGraTime = time;
    console.log('time is changed to '+pageState.nowGraTime);
  }
  // 设置对应数据
  var data = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  // 调用图表渲染函数
  renderChart(data);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  var city = this.value;
  if (city != pageState.nowSelectCity) {
    pageState.nowSelectCity = city;
    console.log('city now change to '+pageState.nowSelectCity);
  }
  // 设置对应数据
  var data = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  // 调用图表渲染函数
  renderChart(data);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formGraTime = document.getElementById('form-gra-time');
  pageState.nowGraTime = "day";
  // 事件委托
  formGraTime.addEventListener('click',function(event){
    if (event.target && event.target.nodeName == "INPUT") {
      graTimeChange(event.target);
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCity = document.getElementById("city-select");
  var cityArr = [];
  for (var i in aqiSourceData) {
  	cityArr.push(i);
  }
  var optionsHTML="";
  for (var i = 0; i < cityArr.length; i++) {
  	optionsHTML += "<option>"+cityArr[i]+"</option>";
  }
  pageState.nowSelectCity = cityArr[0];
  selectCity.innerHTML = optionsHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  selectCity.onchange = citySelectChange;
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 寻找最大值任务**********
  var maxValue = pageState.nowMaxValue;

  // 将原始的源数据处理成图表需要的数据格式
  var week = {},count=1;
  var month = {},mcount=1;

  for(var city in aqiSourceData){
    console.log(city);
    week[city] = {}; // 创建以city为key的week对象

    var sum = 0;
    var weekdays = 0;
    
    for(date in aqiSourceData[city]){
      
      if (aqiSourceData[city][date]>maxValue) {
        maxValue = aqiSourceData[city][date];
      }

      sum+=aqiSourceData[city][date]; //累计求和
      weekdays++; //同时计数计数周期内的天数
    
      var x = new Date(date); //得到当天的一个日期对象
      if (x.getDay() == 0 || date == "2016-03-31") //要是碰到周日或者末尾了就停了计算
      {
        week[city]["第"+count+"周"] = Math.round(sum/weekdays);
        console.log("第"+count+"周:"+Math.round(sum/weekdays));
        // 算完之后一切归零
        sum = 0;
        weekdays = 0;
        count++;
      }
    }
    count = 1; // 循环完一次城市后，week计数初始化
  }

  for(var city in aqiSourceData){
    console.log(city);
    month[city] = {};
    var sum = 0;
    var monthdays = 0;
    for(date in aqiSourceData[city]){
      sum+=aqiSourceData[city][date];
      monthdays++;
      var x = new Date(date);
      if (x.getMonth() == mcount || date == "2016-03-31") {
        month[city]["第"+mcount+""] = Math.round(sum/monthdays);
        console.log("第"+mcount+"月:"+Math.round(sum/monthdays));
        sum = 0;
        monthdays = 0;
        mcount++;
      }
    }
    mcount = 1;
  }
  // 处理好的数据存到chartData中
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
  pageState.nowMaxValue = maxValue;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart(chartData[pageState.nowGraTime][pageState.nowSelectCity]);
}

init();