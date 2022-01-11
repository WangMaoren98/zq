/*
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注册地址：https://wanheng.ouqiyouxuan.com/#/register
whPhone:手机号#密码
export whPhone='手机号#密码'  多用户用@隔开
boxjs地址:https://gitee.com/gossh520/script/raw/master/byxiaopeng.boxjs.json
*/

// [task_local]
//#万恒
// 10 8 * * * https://gitee.com/gossh520/script/raw/master/whapp.js, tag=万恒, enabled=true
const $ = new Env('万恒APP签到');
const notify = $.isNode() ? require('./sendNotify') : '';
let status;
status = (status = ($.getval("whstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let whPhoneArr = [];
let whPhone = $.isNode() ? (process.env.whPhone ? process.env.whPhone : "") : ($.getdata('whPhone') ? $.getdata('whPhone') : "");
let whPhones = "";
let DD = RT(10000, 15000);
let tz = ($.getval('whtz') || '1');
let host = `https://wanheng.ouqiyouxuan.com/`
$.message = ''
//开始运行
!(async () => {
  if (typeof $request !== "undefined") {
    // whck()
  } else {
    if (!$.isNode()) {
      whPhoneArr.push($.getdata('whPhone'))
      let count = ($.getval('whcount') || '1');
      for (let i = 2; i <= count; i++) {
        whPhoneArr.push($.getdata(`whPhone${i}`))
      }
      if (!whPhoneArr[0]) {
        $.log(`\n【傻吊提示】：你没有填写账户密码跑个嘚`)
        $.message += `\n【傻吊提示】：你没有填写账户密码跑个嘚`
      } else {
        console.log(`-------------共${whPhoneArr.length}个账号-------------\n`)
      }
      for (let i = 0; i < whPhoneArr.length; i++) {
        if (whPhoneArr[i]) {
          whPhone = whPhoneArr[i];
          $.index = i + 1;
          console.log(`\n开始【万恒账户 ${$.index}】`)
          zhanghu = whPhone.split('#')
          user = zhanghu[0]
          mima = zhanghu[1]
          await byxiaopeng()
        }
      }
    } else {
      if (process.env.whPhone && process.env.whPhone.indexOf('@') > -1) {
        whPhoneArr = process.env.whPhone.split('@');
        console.log(`您选择的是用"@"隔开\n`)
      } else {
        whPhones = [process.env.whPhone]
      };
      Object.keys(whPhones).forEach((item) => {
        if (whPhones[item]) {
          whPhoneArr.push(whPhones[item])
        }
      })
      if (!whPhoneArr[0]) {
        $.log(`\n【傻吊提示】：你没有填写账户密码跑个嘚`)
        $.message += `\n【傻吊提示】：你没有填写账户密码跑个嘚`
      } else {
        console.log(`-------------共${whPhoneArr.length}个账号-------------\n`)
      }
      for (let k = 0; k < whPhoneArr.length; k++) {
        whPhone = whPhoneArr[k]
        $.index = k + 1;
        console.log(`\n开始【万恒账户 ${$.index}】`)
        zhanghu = whPhone.split('#')
        user = zhanghu[0]
        mima = zhanghu[1]
        await byxiaopeng()
      }
    }
    }
  message() //通知
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

//要执行的代码
async function byxiaopeng() {
  await login()
}
//登录
function login(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}api/index/login`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      },
      body: `{"username":"${user}","password":"${mima}","token":null}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data);
        if (result.code == 1) {
          token = result.data.token
          $.log(`\ntoken获取成功开始执行签到`)
          await $.wait(3000)
          await info()//签到
          await $.wait(1000)
          await dati(167,1)//答题
          await $.wait(1000)
          await dati(170,4)//答题
          await $.wait(1000)
          await dati(173,3)//答题
          await $.wait(1000)
          await dati(176,4)//答题
          await $.wait(1000)
          await dati(177,1)//答题
        } else {
          $.log(`\n【登录状态】：${result.info}`)
          $.message += `\n【登录状态】：${result.info}`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//获取个人信息
function info(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}api/user/info`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      },
      body: `{"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 1) {
          $.message += `\n【欢迎吊毛用户】 ${result.data.name}`
          $.message += `\n【账户余额】：${result.data.money}`
          $.message += `\n【账户积分】：${result.data.integral}`
          await $.wait(1000)
          await sign()//签到
        } else {
          $.log(`\n获取个人资料失败`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}
//签到
function sign(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}api/user/sign`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      },
      body: `{"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 1) {
          if (result.info == '请实名认证后再签到！') {
            $.log(`\n错误信息：` + result.info)
            $.message += `\n错误信息：` + result.info
          } else {
            $.log(`\n签到成功获得现金` + result.data.reward)
            $.message += `\n签到成功获得现金` + result.data.reward
          }
        } else {
          $.log(`\n【签到状态】：${result.info}`)
          $.message += `\n【签到状态】：${result.info}`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}

//答题
function dati(id,key) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/index/getask`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      },
      body: `{"id":${id},"key":${key},"token":"${token}"}`,
    }
    $.post(url, async (err, resp, data) => {
      try {
        result = JSON.parse(data)
        if (result.code == 1) {
          tmid = result.data.id
          $.log(`\n答题结果:` + result.info + `\n开始下一题`)
          $.message += `\n答题结果:` + result.info
        } else {
            $.log(`\n返回错误信息：` + result.info)
            $.message += `\n返回错误信息：` + result.info
          }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, 0)
  })
}

function RT(X, Y) {
  do rt = Math.floor(Math.random() * Y);
  while (rt < X)
  return rt;
}

//通知
async function message() {
  if (tz == 1) {
      $.msg($.name, "", $.message)
  }
  if ($.isNode()) {
      await notify.sendNotify($.name, $.message)
  }
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}