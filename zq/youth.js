/*
更新时间: 2021-03-13 16:20
赞赏:中青邀请码`46308484`,农妇山泉 -> 有点咸，万分感谢
本脚本仅适用于中青看点极速版领取青豆
食用说明请查看本仓库目录Taskconf/youth/readme.md，其中打卡挑战赛可通过Boxjs开关，报名时间为23点，早起打卡时间为早5点，报名需1000青豆押金，打卡成功可返1000+青豆，打卡失败则押金不予返还，请注意时间运行，
转发文章获得青豆不实，请无视

*/

const $ = new Env("中青看点");

const notify = $.isNode() ? require('./sendNotify') : '';
//const youthNode = $.isNode() ? require('./youth_env') : '';

// 可设置部分
let notifyInterval = $.getdata("notifytimes") || 50; //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
let ONCard = $.getdata('zqcard') || "false"; //早起打卡开关
let s = $.getdata('delay_rotary_zq') || "10"; //转盘延迟时间
let withdrawcash = $.getdata('zqcash') || 30; //提现金额
let cardTime = $.getdata('zqtime') || "05"; //打卡时间
let readtimes = 0;

// 需获取部分
let withdrawUrl = $.getdata('cashurl_zq'); //提现地址，可选
let withdrawBody = $.getdata('cashbody_zq'); //提现请求，可选
let cookieYouth = $.getdata('youthheader_zq');
let artBody = $.getdata('read_zq');
let readTimes = $.getdata('readtime_zq');

//声明部分
let rotaryscore = 0,
    doublerotary = 0;
let cookieArr = [],
    cookie = '';
let readArr = [],
    articbody = '';
let timeArr = [],
    timebody = '';

// 脚本部分
var __encode = 'jsjiami.com',
    _a = {},
    _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65", "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];
(function (_0xd642x1) {
    _0xd642x1[_0xb483[0]] = _0xb483[1]
})(_a);
var __Oxb5591 = ["\x75\x6E\x64\x65\x66\x69\x6E\x65\x64", "\x64\x6F\x6E\x65", "\x69\x73\x4E\x6F\x64\x65", "\x6E\x61\x6D\x65", "\u60A8\u672A\u83B7\u53D6\u4E2D\u9752\x43\x6F\x6F\x6B\x69\x65", "\u8BF7\u8FDB\u5165\u4EFB\u52A1\u4E2D\u5FC3\u83B7\u53D6", "\x6D\x73\x67", "\x66\x69\x6E\x61\x6C\x6C\x79", "\x6C\x6F\x67\x45\x72\x72", "\x63\x61\x74\x63\x68", "\x20\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x20\u60A8\u5171\u63D0\u4F9B", "\x6C\x65\x6E\x67\x74\x68", "\u4E2A\u4E2D\u9752\u8D26\u53F7\x20\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D\x3D", "\x6C\x6F\x67", "\u3010\u63D0\u793A\u3011\u8BF7\u5148\u83B7\u53D6\u4E2D\u9752\u770B\u70B9\u4E00\x63\x6F\x6F\x6B\x69\x65", "", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6B\x61\x6E\x64\x69\x61\x6E\x2E\x79\x6F\x75\x74\x68\x2E\x63\x6E\x2F\x75\x2F\x6D\x68\x6B\x6A\x4E", "\x69\x6E\x64\x65\x78", "\x6D\x61\x74\x63\x68", "\x0A\x20\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x20", "\x20\u73B0\u91D1\x3A\x20", "\u5143\x20\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x2A\x0A", "\u5F00\u59CB\u8F6C\u76D8\u62BD\u5956\u4EFB\u52A1", "\x77\x61\x69\x74", "\x73\x74\x61\x74\x75\x73", "\u8F6C\u76D8", "\uD83C\uDF89", "\x64\x65\x73\x63", "\u3010\u8F6C\u76D8\u62BD\u5956\u3011\x20\x2B", "\u4E2A\u9752\u8C46\x20\u5269\u4F59", "\u6B21\x0A", "\u8F6C\u76D8\u62BD\u5956\x3A\x20\u5171\u8BA1\x2B", "\u6B21", "\u3010\u8F6C\u76D8\u53CC\u500D\u3011\x20\x2B", "\u9752\u8C46\x20\u5269\u4F59", "\u8F6C\u76D8\u53CC\u500D\x3A\x20\x2B", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6B\x64\x2E\x79\x6F\x75\x74\x68\x2E\x63\x6E\x2F", "\x26", "\x2A\x2F\x2A", "\x67\x7A\x69\x70\x2C\x20\x64\x65\x66\x6C\x61\x74\x65\x2C\x20\x62\x72", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6B\x64\x2E\x79\x6F\x75\x74\x68\x2E\x63\x6E\x2F\x68\x35\x2F\x32\x30\x31\x39\x30\x33\x30\x31\x74\x61\x73\x6B\x63\x65\x6E\x74\x65\x72\x2F\x69\x6F\x73\x2F\x69\x6E\x64\x65\x78\x2E\x68\x74\x6D\x6C\x3F", "\x6B\x64\x2E\x79\x6F\x75\x74\x68\x2E\x63\x6E", "\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x35\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x43\x50\x55\x20\x69\x50\x68\x6F\x6E\x65\x20\x4F\x53\x20\x31\x34\x5F\x35\x20\x6C\x69\x6B\x65\x20\x4D\x61\x63\x20\x4F\x53\x20\x58\x29\x20\x41\x70\x70\x6C\x65\x57\x65\x62\x4B\x69\x74\x2F\x36\x30\x35\x2E\x31\x2E\x31\x35\x20\x28\x4B\x48\x54\x4D\x4C\x2C\x20\x6C\x69\x6B\x65\x20\x47\x65\x63\x6B\x6F\x29\x20\x4D\x6F\x62\x69\x6C\x65\x2F\x31\x35\x45\x31\x34\x38", "\x58\x4D\x4C\x48\x74\x74\x70\x52\x65\x71\x75\x65\x73\x74", "\x57\x65\x62\x41\x70\x69\x2F\x4E\x65\x77\x54\x61\x73\x6B\x49\x6F\x73\x2F\x67\x65\x74\x53\x69\x67\x6E", "\x70\x61\x72\x73\x65", "\x6D\x6F\x6E\x65\x79", "\x75\x73\x65\x72", "\x64\x61\x74\x61", "\x73\x69\x67\x6E\x5F\x64\x61\x79", "\x73\x63\x6F\x72\x65", "\x73\x75\x62", "\u3010\u6536\u76CA\u603B\u8BA1\u3011", "\u9752\u8C46\x20\u73B0\u91D1\u7EA6", "\u5143", "\u8D26\u53F7\x3A", "\x6E\x69\x63\x6B\x6E\x61\x6D\x65", "\x7A\x71\x5F\x6E\x69\x63\x6B", "\x73\x65\x74\x64\x61\x74\x61", "\u8D26\u53F7", "\u5408\u4E00", "\x69\x73\x5F\x73\x69\x67\x6E", "\u3010\u7B7E\u5230\u7ED3\u679C\u3011\uD83D\uDD01\x20\x28\u4ECA\u5929\x2B", "\x73\x69\x67\x6E\x5F\x73\x63\x6F\x72\x65", "\u9752\u8C46\x29\u5DF2\u8FDE\u7B7E", "\u5929\x0A\x3C\u672C\u6B21\u6536\u76CA\x3E\x20\uFF1A\x0A", "\x70\x6F\x73\x74", "\x57\x65\x62\x41\x70\x69\x2F\x4E\x65\x77\x54\x61\x73\x6B\x49\x6F\x73\x2F\x67\x65\x74\x54\x61\x73\x6B\x4C\x69\x73\x74\x3F", "\x64\x61\x69\x6C\x79", "\x6C\x69\x73\x74", "\x62\x75\x74", "\x74\x69\x74\x6C\x65", "\x69\x64", "\x72\x65\x77\x61\x72\x64\x5F\x61\x63\x74\x69\x6F\x6E", "\u53BB", "\x32", "\uFF0C", "\uFF0C\u5DF2\u9886\u53D6\u9752\u8C46", "\u3010", "\u3011\u2705", "\u9752\u8C46\x0A", "\x31", "\x61\x63\x74\x69\x6F\x6E", "\u5DF2\u5B8C\u6210\x20\uFF0C\u53BB\u9886\u53D6\u5956\u52B1\u9752\u8C46", "\x30", "\u6253\u5361\u8D5A\u94B1", "\x74\x72\x75\x65", "\x37", "\x65\x76\x65\x6E\x74", "\x74\x61\x73\x6B\x5F\x64\x61\x69\x6C\x79\x5F\x64\x69\x76\x69\x64\x65\x6E\x64", "\x31\x30", "\u672A\u5B8C\u6210\uFF0C\u53BB\u505A\u4EFB\u52A1", "\u7B49\u5F85\x35\x73\u6267\u884C\u7B2C", "\u83B7\u53D6\u4EFB\u52A1\u5931\u8D25\uFF0C", "\x57\x65\x62\x41\x70\x69\x2F\x4E\x65\x77\x54\x61\x73\x6B\x49\x6F\x73\x2F\x73\x65\x6E\x64\x54\x77\x65\x6E\x74\x79\x53\x63\x6F\x72\x65\x3F\x61\x63\x74\x69\x6F\x6E\x3D", "\u83B7\u5F97\u9752\u8C46", "\x67\x65\x74", "\x57\x65\x62\x41\x70\x69\x2F\x4E\x65\x77\x54\x61\x73\x6B\x49\x6F\x73\x2F\x73\x69\x67\x6E", "\u7B7E\u5230\u5931\u8D25\uFF0C\x43\x6F\x6F\x6B\x69\x65\u5DF2\u5931\u6548\u203C\uFE0F", "\u3010\u7B7E\u5230\u7ED3\u679C\u3011\u6210\u529F\x20\uD83C\uDF89\x20\u9752\u8C46\x3A\x20\x2B", "\uFF0C\u660E\u65E5\u9752\u8C46\x3A\x20\x2B", "\x6E\x65\x78\x74\x53\x63\x6F\x72\x65", "\x0A", "\x57\x65\x62\x41\x70\x69\x2F\x41\x72\x74\x69\x63\x6C\x65\x54\x6F\x70\x2F\x6C\x69\x73\x74\x73\x4E\x65\x77\x54\x61\x67", "\x69\x74\x65\x6D\x73", "\x61\x63\x63\x6F\x75\x6E\x74\x5F\x69\x64", "\u53BB\u8F6C\u53D1\u6587\u7AE0", "\x20\x2D\x2D\x2D\x2D\x2D\x20", "\x61\x63\x63\x6F\x75\x6E\x74\x5F\x6E\x61\x6D\x65", "\x57\x65\x62\x41\x70\x69\x2F\x53\x68\x61\x72\x65\x4E\x65\x77\x2F\x67\x65\x74\x53\x68\x61\x72\x65\x41\x72\x74\x69\x63\x6C\x65\x52\x65\x77\x61\x72\x64", "\x61\x72\x74\x69\x63\x6C\x65\x5F\x69\x64\x3D", "\u8F6C\u53D1\u6210\u529F\uFF0C\u5171\u8BA1\u8F6C\u53D1", "\x73\x68\x61\x72\x65\x5F\x6E\x75\x6D", "\u7BC7\u6587\u7AE0\uFF0C\u83B7\u5F97\u9752\u8C46", "\x4B\x44\x41\x70\x70\x2F\x32\x2E\x30\x2E\x30\x20\x28\x69\x50\x68\x6F\x6E\x65\x3B\x20\x69\x4F\x53\x20\x31\x34\x2E\x35\x3B\x20\x53\x63\x61\x6C\x65\x2F\x33\x2E\x30\x30\x29", "\x65\x72\x72\x6F\x72\x5F\x63\x6F\x64\x65", "\u3010\u81EA\u52A8\u63D0\u73B0\u3011\u63D0\u73B0", "\u5143\u6210\u529F", "\x31\x30\x30\x30\x32", "\u81EA\u52A8\u63D0\u73B0\u5931\u8D25\uFF0C", "\x74\x65\x78\x74", "\x68\x6F\x6D\x65\x54\x69\x6D\x65", "\u81EA\u52A8\u63D0\u73B0\u5931\u8D25\x2C", "\x6D\x65\x73\x73\x61\x67\x65", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x67\x65\x74\x4D\x61\x69\x6E\x44\x61\x74\x61\x3F\x26", "\x63\x6F\x64\x65", "\x48\x48", "\x74\x69\x6D\x65", "\x32\x32", "\u6BCF\u65E5\u6253\u5361\u5DF2\u62A5\u540D\uFF0C\u8BF7\u6BCF\u5929\u65E9\u6668", "\u70B9\u8FD0\u884C\u6253\u5361", "\u3010\u6253\u5361\u62A5\u540D\u3011\uD83D\uDD14\x20\u5F85\u660E\u65E9", "\u70B9\u6253\u5361\x5C\x6E", "\u6253\u5361\u65F6\u95F4\u5DF2\u5230\uFF0C\u53BB\u6253\u5361", "\u4ECA\u65E5\u60A8\u672A\u62A5\u540D\u65E9\u8D77\u6253\u5361\uFF0C\u62A5\u540D\u65F6\u95F4\u7EDF\u4E00\u8BBE\u7F6E\u6210\u665A\u4E0A\x32\x33\u70B9", "\u6253\u5361\u7533\u8BF7\u5931\u8D25", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x73\x69\x67\x6E\x55\x70", "\u3010\u6253\u5361\u62A5\u540D\u3011\u6253\u5361\u62A5\u540D", "\u2705\x0A", "\u6BCF\u65E5\u62A5\u540D\u6253\u5361\u6210\u529F\uFF0C\u62A5\u540D\u65F6\u95F4\x3A", "\x4D\x4D\x2D\x64\x64\x20\x48\x48\x3A\x6D\x6D", "\u3010\u6253\u5361\u62A5\u540D\u3011\uD83D\uDD14", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x64\x6F\x43\x61\x72\x64\x3F", "\u3010\u65E9\u8D77\u6253\u5361\u3011", "\x63\x61\x72\x64\x5F\x74\x69\x6D\x65", "\x2C", "\u65E9\u8D77\u6253\u5361\u6210\u529F\uFF0C\u6253\u5361\u65F6\u95F4\x3A", "\x5C\x6E", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x73\x68\x61\x72\x65\x53\x74\x61\x72\x74\x3F", "\u7B49\u5F85\x32\x73\uFF0C\u53BB\u6253\u5361\u5206\u4EAB", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x73\x68\x61\x72\x65\x45\x6E\x64\x3F", "\x20\u6253\u5361\u5206\u4EAB\x2B", "\u9752\u8C46", "\x57\x65\x62\x41\x70\x69\x2F\x50\x75\x6E\x63\x68\x43\x61\x72\x64\x2F\x6C\x75\x63\x6B\x64\x72\x61\x77\x3F", "\u3010\u4E03\u65E5\u7B7E\u5230\u3011\x20\x2B\x20", "\x75\x2F\x37\x42\x71\x4F\x75", "\x57\x65\x62\x41\x70\x69\x2F\x50\x72\x6F\x6D\x6F\x74\x69\x6F\x6E\x2F\x73\x68\x61\x72\x65\x52\x65\x77\x61\x72\x64\x44\x6F\x75\x62\x6C\x65\x54\x77\x65\x6C\x76\x65\x3F", "\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F97", "\u4ECA\u65E5", "\x57\x65\x62\x41\x70\x69\x2F\x50\x72\x6F\x6D\x6F\x74\x69\x6F\x6E\x2F\x62\x61\x73\x65\x44\x6F\x75\x62\x6C\x65\x54\x77\x65\x6C\x76\x65\x3F", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x66\x6F\x63\x75\x73\x2E\x79\x6F\x75\x74\x68\x2E\x63\x6E\x2F\x76\x2F\x6F\x48\x69\x36\x5A\x2F\x73\x68\x61\x72\x65\x3F", "\x68\x65\x61\x64\x65\x72\x73", "\x57\x65\x62\x41\x70\x69\x2F\x69\x6E\x76\x69\x74\x65\x2F\x6F\x70\x65\x6E\x48\x6F\x75\x72\x52\x65\x64", "\u3010\u65F6\u6BB5\u5B9D\u7BB1\u3011\x20\x2B", "\u9752\u8C46\uFF0C", "\u5206\u949F\u540E\u518D\u6B21\u5956\u52B1\x0A", "\u65F6\u6BB5\u5B9D\u7BB1\x3A", "\x57\x65\x62\x41\x70\x69\x2F\x69\x6E\x76\x69\x74\x65\x2F\x73\x68\x61\x72\x65\x45\x6E\x64", "\x57\x65\x62\x41\x70\x69\x2F\x53\x68\x61\x72\x65\x53\x69\x67\x6E\x4E\x65\x77\x2F\x67\x65\x74\x46\x72\x69\x65\x6E\x64\x41\x63\x74\x69\x76\x65\x4C\x69\x73\x74", "\x61\x63\x74\x69\x76\x65\x5F\x6C\x69\x73\x74", "\x62\x75\x74\x74\x6F\x6E", "\x75\x69\x64", "\x57\x65\x62\x41\x70\x69\x2F\x53\x68\x61\x72\x65\x53\x69\x67\x6E\x4E\x65\x77\x2F\x73\x65\x6E\x64\x53\x63\x6F\x72\x65\x56\x32\x3F\x66\x72\x69\x65\x6E\x64\x5F\x75\x69\x64\x3D", "\u3010\u597D\u53CB\u7EA2\u5305\u3011\x2B", "\u4E2A\u9752\u8C46\x0A", "\u60A8\u7684\u597D\u53CB", "\u5DF2\u7B7E\u5230\uFF0C\u6211\u5F97\u7EA2\u5305\x20\x2B", "\u4E2A\u9752\u8C46", "\x74\x61\x73\x6B\x43\x65\x6E\x74\x65\x72\x2F\x67\x65\x74\x41\x64\x56\x69\x64\x65\x6F\x52\x65\x77\x61\x72\x64", "\x74\x79\x70\x65\x3D\x74\x61\x73\x6B\x43\x65\x6E\x74\x65\x72", "\u89C2\u770B\u89C6\u9891\u5E7F\u544A", "\x6E\x75\x6D", "\u6B21\x20\x2B", "\x57\x65\x62\x41\x70\x69\x2F\x4E\x65\x77\x54\x61\x73\x6B\x49\x6F\x73\x2F\x72\x65\x63\x6F\x72\x64\x4E\x75\x6D\x3F\x61\x63\x74\x69\x6F\x6E\x3D", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x69\x6F\x73\x2E\x62\x61\x65\x72\x74\x74\x2E\x63\x6F\x6D\x2F\x76\x35\x2F", "\x69\x6F\x73\x2E\x62\x61\x65\x72\x74\x74\x2E\x63\x6F\x6D", "\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64", "\x47\x61\x6D\x65\x2F\x47\x61\x6D\x65\x56\x69\x64\x65\x6F\x52\x65\x77\x61\x72\x64\x2E\x6A\x73\x6F\x6E", "\x73\x75\x63\x63\x65\x73\x73", "\u6FC0\u52B1\u89C6\u9891\x20", "\x6D\x69\x73\x73\x69\x6F\x6E\x2F\x6D\x73\x67\x52\x65\x64\x2E\x6A\x73\x6F\x6E", "\u3010\u56DE\u8BBF\u5956\u52B1\u3011\x2B", "\x61\x72\x74\x69\x63\x6C\x65\x2F\x63\x6F\x6D\x70\x6C\x65\x74\x65\x2E\x6A\x73\x6F\x6E", "\x72\x65\x61\x64\x5F\x73\x63\x6F\x72\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\u3010\u9605\u8BFB\u5956\u52B1\u3011\x2B", "\u9605\u8BFB\u5956\u52B1\x20\x2B", "\x6D\x61\x78\x5F\x6E\x6F\x74\x69\x63\x65", "\u770B\u592A\u4E45\u4E86\uFF0C\u6362\x31\u7BC7\u8BD5\u8BD5", "\x75\x73\x65\x72\x2F\x73\x74\x61\x79\x2E\x6A\x73\x6F\x6E", "\u3010\u9605\u8BFB\u65F6\u957F\u3011\u5171\u8BA1", "\x66\x6C\x6F\x6F\x72", "\u5206\u949F\x0A", "\u9605\u8BFB\u65F6\u957F\u5171\u8BA1", "\u5206\u949F", "\u3010\u9605\u8BFB\u65F6\u957F\u3011\u274E\x20\u672A\u83B7\u53D6\u9605\u8BFB\u65F6\u957F\u8BF7\u6C42\x0A", "\u9605\u8BFB\u65F6\u957F\u7EDF\u8BA1\u5931\u8D25\uFF0C\u539F\u56E0\x3A", "\x57\x65\x62\x41\x70\x69\x2F\x53\x68\x61\x72\x65\x4E\x65\x77\x2F\x62\x65\x72\x65\x61\x64\x45\x78\x74\x72\x61\x4C\x69\x73\x74", "\u53C2\u6570\u9519\u8BEF", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x74\x61\x73\x6B\x4C\x69\x73\x74", "\x64\x65\x73\x63\x72\x69\x70\x74\x69\x6F\x6E", "\u8BA1\u65F6\u7EA2\u5305", "\u53EF\u9886\u53D6\uFF0C\u53BB\u9886\u9752\u8C46", "\x74\x6F\x74\x61\x6C\x5F\x74\x69\x6D\x65", "\x63\x6F\x75\x6E\x74\x64\x6F\x77\x6E", "\uFF0C\u65F6\u95F4\u5012\u8BA1\u65F6", "\u6210\u529F\uFF0C\u9886\u53D6", "\x75\x6E\x69\x74", "\x57\x65\x62\x41\x70\x69\x2F\x54\x69\x6D\x65\x50\x61\x63\x6B\x65\x74\x2F\x67\x65\x74\x52\x65\x77\x61\x72\x64", "\u83B7\u5F97", "\u3011\u83B7\u5F97", "\x57\x65\x62\x41\x70\x69\x2F\x53\x68\x61\x72\x65\x4E\x65\x77\x2F\x65\x78\x65\x63\x45\x78\x74\x72\x61\x63\x74\x54\x61\x73\x6B", "\x26\x61\x63\x74\x69\x6F\x6E\x3D", "\x57\x65\x62\x41\x70\x69\x2F\x52\x6F\x74\x61\x72\x79\x54\x61\x62\x6C\x65\x2F\x74\x75\x72\x6E\x52\x6F\x74\x61\x72\x79\x3F\x5F\x3D", "\x6E\x6F\x77", "\u7B49\u5F85", "\u79D2\u8FDB\u884C\u5F00\u59CB\u8F6C\u76D8\u4EFB\u52A1", "\x72\x65\x6D\x61\x69\x6E\x54\x75\x72\x6E", "\x64\x6F\x75\x62\x6C\x65\x4E\x75\x6D", "\u8FDB\u884C", "\u6B21\u8F6C\u76D8\uFF0C\u83B7\u5F97", "\u7B49\u5F85\x31\x30\x73\uFF0C\u83B7\u5F97\u53CC\u500D\u9752\u8C46", "\x74\x69\x6D\x65\x73", "\x63\x68\x65\x73\x74\x4F\x70\x65\x6E", "\x72\x65\x63\x65\x69\x76\x65\x64", "\x26\x6E\x75\x6D\x3D", "\x57\x65\x62\x41\x70\x69\x2F\x52\x6F\x74\x61\x72\x79\x54\x61\x62\x6C\x65\x2F\x63\x68\x65\x73\x74\x52\x65\x77\x61\x72\x64\x3F\x5F\x3D", "\u3010\u8F6C\u76D8\u5B9D\u7BB1", "\u3011", "\x31\x30\x30\x31\x30", "\u4ECA\u65E5\u62BD\u5956\u5B8C\u6210\x0A", "\x57\x65\x62\x41\x70\x69\x2F\x52\x6F\x74\x61\x72\x79\x54\x61\x62\x6C\x65\x2F\x74\x6F\x54\x75\x72\x6E\x44\x6F\x75\x62\x6C\x65\x3F\x5F\x3D", "\x69\x73\x5F\x64\x6F\x75\x62\x6C\x65", "\u83B7\u5F97\u53CC\u500D\u9752\u8C46\x2B", "\x73\x63\x6F\x72\x65\x31", "\x77\x61\x70\x2F\x75\x73\x65\x72\x2F\x62\x61\x6C\x61\x6E\x63\x65\x3F", "\x3C\u6536\u76CA\u7EDF\u8BA1\x3E\x20\uFF1A\x0A", "\x67\x72\x6F\x75\x70", "\x68\x69\x73\x74\x6F\x72\x79", "\x3C\u4ECA\u65E5\u5408\u8BA1\x3E\uFF1A\x20", "\x20\u9752\u8C46", "\x20", "\u60A8\u7684\u4F59\u989D\u7EA6\u4E3A", "\u5143\uFF0C\u5DF2\u53EF\u4EE5\u63D0\u73B0", "\x73\x65\x6E\x64\x4E\x6F\x74\x69\x66\x79", "\x39\x39", "\x20\x20", "\x23", "\x70\x75\x73\x68", "\x73\x70\x6C\x69\x74", "\x59\x4F\x55\x54\x48\x5F\x48\x45\x41\x44\x45\x52", "\x65\x6E\x76", "\x59\x4F\x55\x54\x48\x5F\x41\x52\x54\x42\x4F\x44\x59", "\x59\x4F\x55\x54\x48\x5F\x54\x49\x4D\x45", "\x66\x6F\x72\x45\x61\x63\x68", "\x6B\x65\x79\x73", "\x67\x65\x74\x54\x69\x6D\x65\x7A\x6F\x6E\x65\x4F\x66\x66\x73\x65\x74", "\x7A\x68", "\x6C\x6F\x6E\x67", "\x74\x6F\x4C\x6F\x63\x61\x6C\x65\x53\x74\x72\x69\x6E\x67", "\x0A\x20\x3D\x3D\x3D\x20\u811A\u672C\u6267\u884C", "\x20\x3D\x3D\x3D\x20\x0A", "\x6D\x65\x74\x68\x6F\x64", "\x4F\x50\x54\x49\x4F\x4E\x53", "\x75\x72\x6C", "\x52\x65\x66\x65\x72\x65\x72", "\x79\x6F\x75\x74\x68\x68\x65\x61\x64\x65\x72\x5F\x7A\x71", "\u83B7\u53D6\x43\x6F\x6F\x6B\x69\x65\x3A\x20\u6210\u529F\x2C\x20\x73\x69\x67\x6E\x68\x65\x61\x64\x65\x72\x56\x61\x6C\x3A\x20\x24\x7D", "\u83B7\u53D6\x43\x6F\x6F\x6B\x69\x65\x3A\x20\u6210\u529F\uD83C\uDF89", "\x3F", "\x72\x65\x61\x64\x5F\x7A\x71", "\u83B7\u53D6\u9605\u8BFB\x3A\x20\u6210\u529F\x2C\x20\x61\x72\x74\x69\x63\x62\x6F\x64\x79\x3A\x20", "\u83B7\u53D6\u9605\u8BFB\u8BF7\u6C42\x3A\x20\u6210\u529F\uD83C\uDF89", "\x62\x6F\x64\x79", "\x72\x65\x61\x64\x74\x69\x6D\x65\x5F\x7A\x71", "\u83B7\u53D6\u9605\u8BFB\u65F6\u957F\x3A\x20\u6210\u529F\x2C\x20\x74\x69\x6D\x65\x62\x6F\x64\x79\x56\x61\x6C\x3A\x20", "\u83B7\u53D6\u9605\u8BFB\u65F6\u957F\x3A\x20\u6210\u529F\uD83C\uDF89", "\x63\x61\x73\x68\x62\x6F\x64\x79\x5F\x7A\x71", "\x63\x61\x73\x68\x75\x72\x6C\x5F\x7A\x71", "\x2C\x20\u83B7\u53D6\u63D0\u73B0\u8BF7\u6C42\x3A\x20\u6210\u529F\x2C\x20\x77\x69\x74\x68\x64\x72\x61\x77\x55\x72\x6C\x3A\x20", "\x2C\x20\u83B7\u53D6\u63D0\u73B0\u8BF7\u6C42\x3A\x20\u6210\u529F\x2C\x20\x77\x69\x74\x68\x64\x72\x61\x77\x42\x6F\x64\x79\x3A\x20", "\u83B7\u53D6\u63D0\u73B0\u8BF7\u6C42\x3A\x20\u6210\u529F\uD83C\uDF89", "\u5220\u9664", "\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A", "\u671F\u5F39\u7A97\uFF0C", "\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C", "\x6A\x73\x6A\x69\x61", "\x6D\x69\x2E\x63\x6F\x6D"];
if (isGetCookie = typeof $request !== __Oxb5591[0x0]) {
    GetCookie();
    $[__Oxb5591[0x1]]()
} else {
    if (!$[__Oxb5591[0x2]]() && !cookieYouth) {
        $['msg']($['name'], __Oxb5591[0x4], __Oxb5591[0x5])
    } else {
        !(async () => {
            await configApi();
            $['log'](`${__Oxb5591[0xa]}${cookieArr[__Oxb5591[0xb]]}${__Oxb5591[0xc]}`);
            if (!cookieArr[0x0]) {
                $['msg']($['name'], __Oxb5591[0xe], '', {
                    '\x6F\x70\x65\x6E\x2D\x75\x72\x6C': __Oxb5591[0x10]
                });
                return
            };
            for (let _0xc2e1x2 = 0; _0xc2e1x2 < cookieArr[__Oxb5591[0xb]]; _0xc2e1x2++) {
                if (cookieArr[_0xc2e1x2]) {
                    cookie = cookieArr[_0xc2e1x2], articbody = readArr[_0xc2e1x2], timebody = timeArr[_0xc2e1x2], $[__Oxb5591[0x11]] = _0xc2e1x2 + 1
                };
                myuid = cookie['match'](/uid=\d+/);
                await userInfo();
                nick = nick ? nick : null;
                $['log'](__Oxb5591[0x13] + nick + __Oxb5591[0x14] + cash + __Oxb5591[0x15]);
                await bonusTask();
                await TaskCenter();
                await openbox();
                await getAdVideo();
                await gameVideo();
                await readArticle();
                $['log'](__Oxb5591[0x16]);
                for (k = 0; k < 5; k++) {
                    await $[__Oxb5591[0x17]](s * 1000);
                    await rotary();
                    if (rotaryres[__Oxb5591[0x18]] == 0) {
                        rotarynum = `${__Oxb5591[0x19]}${rotaryres['msg']}${__Oxb5591[0x1a]}`;
                        break
                    }
                };
                if (rotaryres[__Oxb5591[0x18]] == 1) {
                    $[__Oxb5591[0x1b]] += __Oxb5591[0x1c] + rotaryscore + __Oxb5591[0x1d] + rotarytimes + __Oxb5591[0x1e];
                    $['log'](`${__Oxb5591[0x1f]}${rotaryscore}${__Oxb5591[0x1d]}${rotarytimes}${__Oxb5591[0x20]}`);
                    if (doubleTimes !== 0) {
                        $[__Oxb5591[0x1b]] += __Oxb5591[0x21] + doublerotary + __Oxb5591[0x22] + doubleTimes + __Oxb5591[0x1e];
                        $['log'](`${__Oxb5591[0x23]}${doublerotary}${__Oxb5591[0x22]}${doubleTimes}${__Oxb5591[0x20]}`)
                    }
                };
                await earningsInfo();
                await showmsg()
            }
        })()[__Oxb5591[0x9]]((_0xc2e1x1) => {
            return $[__Oxb5591[0x8]](_0xc2e1x1)
        })[__Oxb5591[0x7]](() => {
            return $[__Oxb5591[0x1]]()
        })
    }
};

function kdHost(_0xc2e1x4, _0xc2e1x5) {
    return {
        url: __Oxb5591[0x24] + _0xc2e1x4 + `${__Oxb5591[0x25]}${myuid}${''}`,
        headers: {
            '\x41\x63\x63\x65\x70\x74': __Oxb5591[0x26],
            '\x41\x63\x63\x65\x70\x74\x2D\x45\x6E\x63\x6F\x64\x69\x6E\x67': __Oxb5591[0x27],
            '\x52\x65\x66\x65\x72\x65\x72': __Oxb5591[0x28] + cookie,
            '\x48\x6F\x73\x74': __Oxb5591[0x29],
            '\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74': __Oxb5591[0x2a],
            '\x58\x2D\x52\x65\x71\x75\x65\x73\x74\x65\x64\x2D\x57\x69\x74\x68': __Oxb5591[0x2b]
        },
        body: _0xc2e1x5
    }
}

function userInfo() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x2c]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            signinfo = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (signinfo[__Oxb5591[0x18]] == 1) {
                cash = signinfo[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x2e]], signday = signinfo[__Oxb5591[0x30]][__Oxb5591[0x31]], totalscore = signinfo[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x32]];
                $[__Oxb5591[0x33]] = `${__Oxb5591[0x34]}${totalscore}${__Oxb5591[0x35]}${cash}${__Oxb5591[0x36]}`;
                nick = __Oxb5591[0x37] + signinfo[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x38]];
                if (cookieArr[__Oxb5591[0xb]] == 1) {
                    $['setdata'](nick, __Oxb5591[0x39])
                } else {
                    $['setdata'](__Oxb5591[0x3b] + cookieArr[__Oxb5591[0xb]] + __Oxb5591[0x3c], __Oxb5591[0x39])
                };
                if (parseInt(cash) >= withdrawcash && !withdrawBody == false) {
                    await withDraw()
                };
                if (signinfo[__Oxb5591[0x30]][__Oxb5591[0x3d]] == false) {
                    await getsign();
                    if (signday == 6) {
                        await SevCont()
                    }
                } else {
                    if (signinfo[__Oxb5591[0x30]][__Oxb5591[0x3d]] == true) {
                        $[__Oxb5591[0x1b]] = __Oxb5591[0x3e] + signinfo[__Oxb5591[0x30]][__Oxb5591[0x3f]] + __Oxb5591[0x40] + signday + __Oxb5591[0x41]
                    }
                }
            } else {
                $['log'](signinfo['msg']);
                return
            };
            _0xc2e1x7()
        })
    })
}

function TaskCenter() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x43]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                taskres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (taskres[__Oxb5591[0x18]] == 1) {
                    await friendsign();
                    for (dailys of taskres[__Oxb5591[0x45]][__Oxb5591[0x44]]) {
                        button = dailys[__Oxb5591[0x46]], title = dailys[__Oxb5591[0x47]], dayid = dailys[__Oxb5591[0x48]], reward_act = dailys[__Oxb5591[0x49]];
                        await $[__Oxb5591[0x17]](500);
                        $['log'](__Oxb5591[0x4a] + title);
                        if (dailys[__Oxb5591[0x18]] == __Oxb5591[0x4b]) {
                            $['log'](title + __Oxb5591[0x4c] + button + __Oxb5591[0x4d] + dailys[__Oxb5591[0x32]]);
                            $[__Oxb5591[0x1b]] += `${__Oxb5591[0x4e]}${title}${__Oxb5591[0x4f]}` + dailys[__Oxb5591[0x32]] + __Oxb5591[0x50]
                        } else {
                            if (dailys[__Oxb5591[0x18]] == __Oxb5591[0x51] && dailys[__Oxb5591[0x52]] != '') {
                                $['log'](dailys[__Oxb5591[0x47]] + __Oxb5591[0x53]);
                                await $[__Oxb5591[0x17]](600);
                                await getAction(reward_act)
                            } else {
                                if (dailys[__Oxb5591[0x18]] == __Oxb5591[0x54]) {
                                    if (title == __Oxb5591[0x55] && ONCard == __Oxb5591[0x56]) {
                                        await CardStatus()
                                    } else {
                                        if (dayid == __Oxb5591[0x57]) {
                                            await readTime()
                                        } else {
                                            if (dailys[__Oxb5591[0x58]] == __Oxb5591[0x59]) {
                                                await Census()
                                            } else {
                                                if (dayid == __Oxb5591[0x5a]) {
                                                    $['log'](title + __Oxb5591[0x5b]);
                                                    for (x = 0; x < 5; x++) {
                                                        $['log'](__Oxb5591[0x5c] + (x + 1) + __Oxb5591[0x20]);
                                                        await $[__Oxb5591[0x17]](5000);
                                                        await recordAdVideo(reward_act)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                $['log'](__Oxb5591[0x5d] + e)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function getAction(_0xc2e1xe) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0x5e] + _0xc2e1xe), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1xf = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1xf[__Oxb5591[0x18]] == 1) {
                $['log'](__Oxb5591[0x5f] + _0xc2e1xf[__Oxb5591[0x32]])
            } else {
                if (_0xc2e1xf[__Oxb5591[0x18]] == 0) {
                    $['log'](_0xc2e1xf['msg'])
                }
            };
            _0xc2e1x7()
        })
    })
}

function getsign() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x61]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            signres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (signres[__Oxb5591[0x18]] == 2) {
                sub = `${__Oxb5591[0x62]}`;
                $['msg']($['name'], sub, '');
                return
            } else {
                if (signres[__Oxb5591[0x18]] == 1) {
                    $[__Oxb5591[0x1b]] = `${__Oxb5591[0x63]}${signres[__Oxb5591[0x32]]}${__Oxb5591[0x64]}${signres[__Oxb5591[0x65]]}${''}` + __Oxb5591[0x66];
                    await comApp()
                }
            };
            _0xc2e1x7()
        })
    })
}

function getArt() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x67]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            artres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (artres[__Oxb5591[0x18]] == 1) {
                for (arts of artres[__Oxb5591[0x30]][__Oxb5591[0x68]]) {
                    titlename = arts[__Oxb5591[0x47]];
                    account = arts[__Oxb5591[0x69]];
                    if (arts[__Oxb5591[0x18]] == __Oxb5591[0x51]) {
                        $['log'](__Oxb5591[0x6a]);
                        $['log'](titlename + __Oxb5591[0x6b] + arts[__Oxb5591[0x6c]]);
                        await artshare(arts[__Oxb5591[0x48]]);
                        break
                    }
                }
            };
            _0xc2e1x7()
        })
    })
}

function artshare(_0xc2e1x13) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x6d], cookie + __Oxb5591[0x25] + __Oxb5591[0x6e] + _0xc2e1x13), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            shareres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (shareres[__Oxb5591[0x18]] == 1) {
                $['log'](__Oxb5591[0x6f] + shareres[__Oxb5591[0x30]][__Oxb5591[0x68]][__Oxb5591[0x70]] + __Oxb5591[0x71] + shareres[__Oxb5591[0x30]][__Oxb5591[0x32]])
            };
            _0xc2e1x7()
        })
    })
}

function withDraw() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        const _0xc2e1x15 = {
            url: withdrawUrl,
            headers: {
                '\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74': __Oxb5591[0x72]
            },
            body: withdrawBody
        };
        $[__Oxb5591[0x42]](_0xc2e1x15, (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            withDrawres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (withDrawres[__Oxb5591[0x73]] == 0) {
                $[__Oxb5591[0x1b]] = `${__Oxb5591[0x74]}${withdrawcash}${__Oxb5591[0x75]}` + __Oxb5591[0x66];
                $['msg']($['name'], $[__Oxb5591[0x33]], $[__Oxb5591[0x1b]])
            } else {
                if (withDrawres[__Oxb5591[0x73]] == __Oxb5591[0x76]) {
                    $['log'](`${__Oxb5591[0x77]}${withDrawres[__Oxb5591[0x79]][__Oxb5591[0x78]]}${''}`)
                } else {
                    $['log'](__Oxb5591[0x7a] + withDrawres[__Oxb5591[0x7b]])
                }
            };
            _0xc2e1x7()
        })
    })
}

function CardStatus() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0x7c] + cookie), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            punchcard = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (punchcard[__Oxb5591[0x7d]] == 1) {
                if (punchcard[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x18]] == 0 && $[__Oxb5591[0x7f]](__Oxb5591[0x7e]) > __Oxb5591[0x80]) {
                    await punchCard()
                } else {
                    if (punchcard[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x18]] == 2) {
                        $['log'](__Oxb5591[0x81] + cardTime + __Oxb5591[0x82]);
                        $[__Oxb5591[0x1b]] += `${__Oxb5591[0x83]}${cardTime}${__Oxb5591[0x84]}`
                    } else {
                        if (punchcard[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x18]] == 3 && $[__Oxb5591[0x7f]](__Oxb5591[0x7e]) == cardTime) {
                            $['log'](__Oxb5591[0x85]);
                            await endCard()
                        } else {
                            if (punchcard[__Oxb5591[0x30]][__Oxb5591[0x2f]][__Oxb5591[0x18]] == 0) {
                                $['log'](__Oxb5591[0x86])
                            }
                        }
                    }
                }
            } else {
                if (punchcard[__Oxb5591[0x7d]] == 0) {
                    $['log'](__Oxb5591[0x87] + _0xc2e1xb)
                }
            };
            _0xc2e1x7()
        })
    })
}

function punchCard() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x88]), (_0xc2e1x9, _0xc2e1x18, _0xc2e1xb) => {
            punchcardstart = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (punchcardstart[__Oxb5591[0x7d]] == 1) {
                $[__Oxb5591[0x1b]] += __Oxb5591[0x89] + punchcardstart['msg'] + __Oxb5591[0x8a];
                $['log'](__Oxb5591[0x8b] + `${''}${$[__Oxb5591[0x7f]](__Oxb5591[0x8c])}${''}`)
            } else {
                $[__Oxb5591[0x1b]] += __Oxb5591[0x8d] + punchcardstart['msg'] + __Oxb5591[0x66]
            };
            _0xc2e1x7()
        })
    })
}

function endCard() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x8e]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            punchcardend = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (punchcardend[__Oxb5591[0x7d]] == 1) {
                $[__Oxb5591[0x1b]] += __Oxb5591[0x8f] + punchcardend[__Oxb5591[0x30]][__Oxb5591[0x90]] + __Oxb5591[0x91] + punchcardend['msg'] + __Oxb5591[0x8a];
                $['log'](__Oxb5591[0x92] + `${''}${punchcardend[__Oxb5591[0x30]][__Oxb5591[0x90]]}${''}`);
                await $[__Oxb5591[0x17]](1000);
                await Cardshare()
            } else {
                if (punchcardend[__Oxb5591[0x7d]] == 0) {
                    $[__Oxb5591[0x1b]] += `${__Oxb5591[0x8f]}${punchcardend['msg']}${__Oxb5591[0x93]}`
                }
            };
            _0xc2e1x7()
        })
    })
}

function Cardshare() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x94]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            sharestart = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (sharestart[__Oxb5591[0x7d]] == 1) {
                $['log'](__Oxb5591[0x95]);
                await $[__Oxb5591[0x17]](2000);
                $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x96]), (_0xc2e1x9, _0xc2e1x18, _0xc2e1xb) => {
                    shareres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                    if (shareres[__Oxb5591[0x7d]] == 1) {
                        $[__Oxb5591[0x1b]] += `${__Oxb5591[0x97]}${shareres[__Oxb5591[0x30]][__Oxb5591[0x32]]}${__Oxb5591[0x98]}` + __Oxb5591[0x66];
                        $['msg']($['name'], '', $[__Oxb5591[0x1b]])
                    } else {};
                    _0xc2e1x7()
                })
            }
        })
    })
}

function SevCont() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x99]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x1c = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x1c[__Oxb5591[0x7d]] == 1) {
                $[__Oxb5591[0x1b]] += `${__Oxb5591[0x9a]}${_0xc2e1x1c[__Oxb5591[0x30]][__Oxb5591[0x32]]}${__Oxb5591[0x98]}` + __Oxb5591[0x66]
            } else {
                if (_0xc2e1x1c[__Oxb5591[0x7d]] == 0) {}
            };
            _0xc2e1x7()
        })
    })
}

function Census() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x9b]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            await toshare();
            _0xc2e1x7()
        })
    })
}

function toshare() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x9c]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x1f = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x1f[__Oxb5591[0x73]] == __Oxb5591[0x54]) {
                $['log'](__Oxb5591[0x9d] + _0xc2e1x1f[__Oxb5591[0x30]] + __Oxb5591[0x98])
            } else {
                $['log'](__Oxb5591[0x9e] + _0xc2e1x1f[__Oxb5591[0x7b]])
            };
            await rewards();
            _0xc2e1x7()
        })
    })
}

function rewards() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0x9f]), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x1f = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            _0xc2e1x7()
        })
    })
}

function int() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        let _0xc2e1x15 = {
            url: __Oxb5591[0xa0],
            headers: kdHost()[__Oxb5591[0xa1]]
        };
        $[__Oxb5591[0x42]](_0xc2e1x15, (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            _0xc2e1x7()
        })
    })
}

function openbox() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xa2]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x23 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x23[__Oxb5591[0x7d]] == 1) {
                boxretime = _0xc2e1x23[__Oxb5591[0x30]][__Oxb5591[0x7f]];
                $[__Oxb5591[0x1b]] += __Oxb5591[0xa3] + _0xc2e1x23[__Oxb5591[0x30]][__Oxb5591[0x32]] + __Oxb5591[0xa4] + _0xc2e1x23[__Oxb5591[0x30]][__Oxb5591[0x7f]] / 60 + __Oxb5591[0xa5];
                await boxshare();
                await getArt();
                await int()
            } else {
                $['log'](__Oxb5591[0xa6] + _0xc2e1x23['msg'])
            };
            _0xc2e1x7()
        })
    })
}

function boxshare() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xa7]), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x25 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x25[__Oxb5591[0x7d]] == 1) {};
            _0xc2e1x7()
        })
    })
}

function friendsign() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0xa8]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x27 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x27[__Oxb5591[0x73]] == __Oxb5591[0x54] && _0xc2e1x27[__Oxb5591[0x30]][__Oxb5591[0xa9]][__Oxb5591[0xb]] > 0) {
                friendsitem = _0xc2e1x27[__Oxb5591[0x30]][__Oxb5591[0xa9]];
                for (friends of friendsitem) {
                    if (friends[__Oxb5591[0xaa]] == 1) {
                        await $[__Oxb5591[0x17]](2000);
                        await friendSign(friends[__Oxb5591[0xab]], friends[__Oxb5591[0x38]])
                    }
                }
            };
            _0xc2e1x7()
        })
    })
}

function friendSign(_0xc2e1x29, _0xc2e1x2a) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0xac] + _0xc2e1x29), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x2b = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x2b[__Oxb5591[0x73]] == __Oxb5591[0x54]) {
                $[__Oxb5591[0x1b]] += __Oxb5591[0xad] + _0xc2e1x2b[__Oxb5591[0x30]][0x0][__Oxb5591[0x32]] + __Oxb5591[0xae];
                $['log'](__Oxb5591[0xaf] + _0xc2e1x2a + __Oxb5591[0xb0] + _0xc2e1x2b[__Oxb5591[0x30]][0x0][__Oxb5591[0x32]] + __Oxb5591[0xb1])
            } else {
                $['log'](_0xc2e1x2b[__Oxb5591[0x7b]])
            };
            _0xc2e1x7()
        })
    })
}

function getAdVideo() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xb2], __Oxb5591[0xb3]), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x2d = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x2d[__Oxb5591[0x18]] == 1) {
                $['log'](__Oxb5591[0xb4] + _0xc2e1x2d[__Oxb5591[0xb5]] + __Oxb5591[0xb6] + _0xc2e1x2d[__Oxb5591[0x32]] + __Oxb5591[0x98])
            };
            _0xc2e1x7()
        })
    })
}

function recordAdVideo(_0xc2e1xe) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0xb7] + _0xc2e1xe), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                record = JSON[__Oxb5591[0x2d]](_0xc2e1xb)
            } catch (e) {
                $['log'](__Oxb5591[0x5d] + e)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function batHost(_0xc2e1x4, _0xc2e1x5) {
    return {
        url: __Oxb5591[0xb8] + _0xc2e1x4,
        headers: {
            '\x55\x73\x65\x72\x2D\x41\x67\x65\x6E\x74': __Oxb5591[0x72],
            '\x48\x6F\x73\x74': __Oxb5591[0xb9],
            '\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65': __Oxb5591[0xba]
        },
        body: _0xc2e1x5
    }
}

function gameVideo() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](batHost(__Oxb5591[0xbb], articbody), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            gameres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (gameres[__Oxb5591[0xbc]] == true) {
                $['log'](__Oxb5591[0xbd] + gameres[__Oxb5591[0x68]][__Oxb5591[0x32]])
            };
            _0xc2e1x7()
        })
    })
}

function comApp() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](batHost(__Oxb5591[0xbe], articbody), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            comres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (comres[__Oxb5591[0xbc]] == true) {
                $[__Oxb5591[0x1b]] += __Oxb5591[0xbf] + comres[__Oxb5591[0x68]][__Oxb5591[0x32]] + __Oxb5591[0xae]
            };
            _0xc2e1x7()
        })
    })
}

function readArticle() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](batHost(__Oxb5591[0xc0], articbody), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                readres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (_0xc2e1xb[__Oxb5591[0xc2]](__Oxb5591[0xc1]) > -1 && readres[__Oxb5591[0x68]][__Oxb5591[0xc1]] != 0) {
                    $[__Oxb5591[0x1b]] += __Oxb5591[0xc3] + readres[__Oxb5591[0x68]][__Oxb5591[0xc1]] + __Oxb5591[0xae];
                    $['log'](`${__Oxb5591[0xc4]}${readres[__Oxb5591[0x68]][__Oxb5591[0xc1]]}${__Oxb5591[0xb1]}`)
                } else {
                    if (readres[__Oxb5591[0x68]][__Oxb5591[0xc5]] == __Oxb5591[0xc6]) {}
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e + _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function readTime() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](batHost(__Oxb5591[0xc7], timebody), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x34 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x34[__Oxb5591[0x73]] == 0) {
                readtimes = _0xc2e1x34[__Oxb5591[0x7f]] / 60;
                $[__Oxb5591[0x1b]] += `${__Oxb5591[0xc8]}` + Math[__Oxb5591[0xc9]](readtimes) + __Oxb5591[0xca];
                $['log'](__Oxb5591[0xcb] + Math[__Oxb5591[0xc9]](readtimes) + __Oxb5591[0xcc])
            } else {
                if (_0xc2e1x34[__Oxb5591[0x73]] == 200001) {
                    $[__Oxb5591[0x1b]] += __Oxb5591[0xcd];
                    $['log'](`${__Oxb5591[0xce]}${_0xc2e1x34['msg']}${''}`)
                }
            };
            _0xc2e1x7()
        })
    })
}

function bonusTask() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xcf]), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            extrares = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            try {
                if (extrares[__Oxb5591[0x18]] == 2) {
                    $['log'](__Oxb5591[0xd0] + JSON[__Oxb5591[0xd1]](extrares))
                } else {
                    if (extrares[__Oxb5591[0x18]] == 1) {
                        for (extradata of extrares[__Oxb5591[0x30]][__Oxb5591[0xd2]]) {
                            taskname = extradata['name'], action = extradata[__Oxb5591[0x52]], ription = extradata[__Oxb5591[0xd3]];
                            if (taskname == __Oxb5591[0xd4] && extradata[__Oxb5591[0x18]] == 1) {
                                $['log'](taskname + __Oxb5591[0xd5]);
                                await TimePacket()
                            } else {
                                if (taskname == __Oxb5591[0xd4] && extradata[__Oxb5591[0x18]] == 0) {
                                    downtime = parseInt((extradata[__Oxb5591[0xd6]] - extradata[__Oxb5591[0xd7]]) / 60);
                                    $['log'](taskname + __Oxb5591[0xd8] + downtime + __Oxb5591[0xcc])
                                } else {
                                    if (extradata[__Oxb5591[0x18]] == 1) {
                                        await ExtractShare(action);
                                        $['log'](taskname + __Oxb5591[0xd9] + extradata[__Oxb5591[0x32]] + extradata[__Oxb5591[0xda]])
                                    } else {
                                        if (extradata[__Oxb5591[0x18]] == 0) {
                                            $['log'](__Oxb5591[0x4a] + taskname)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e + _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function TimePacket() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xdb], cookie), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                let _0xc2e1x34 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (_0xc2e1x34[__Oxb5591[0x7d]] == 1) {
                    $['log'](__Oxb5591[0xdc] + _0xc2e1x34[__Oxb5591[0x30]][__Oxb5591[0x32]] + __Oxb5591[0x98]);
                    $[__Oxb5591[0x1b]] += __Oxb5591[0x4e] + taskname + __Oxb5591[0xdd] + _0xc2e1x34[__Oxb5591[0x30]][__Oxb5591[0x32]] + __Oxb5591[0x50]
                } else {
                    if (_0xc2e1x34[__Oxb5591[0x7d]] == 0) {
                        $['log'](_0xc2e1x34['msg'])
                    }
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e + _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function ExtractShare(_0xc2e1x38) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(__Oxb5591[0xde], cookie + __Oxb5591[0xdf] + _0xc2e1x38), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                let _0xc2e1x1f = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (_0xc2e1x1f[__Oxb5591[0x18]] == 0) {
                    $['log'](_0xc2e1x1f['msg'])
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e + _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function rotary() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(`${__Oxb5591[0xe0]}${Date[__Oxb5591[0xe1]]()}${__Oxb5591[0x25]}`, cookie), async (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                rotaryres = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (rotaryres[__Oxb5591[0x18]] == 0) {
                    rotarynum = `${__Oxb5591[0x19]}${rotaryres['msg']}${__Oxb5591[0x1a]}`;
                    $['log'](rotarynum)
                } else {
                    if (rotaryres[__Oxb5591[0x18]] == 1) {
                        $['log'](__Oxb5591[0xe2] + s + __Oxb5591[0xe3]);
                        rotaryscore += rotaryres[__Oxb5591[0x30]][__Oxb5591[0x32]];
                        rotarytimes = rotaryres[__Oxb5591[0x30]][__Oxb5591[0xe4]];
                        doubleTimes = rotaryres[__Oxb5591[0x30]][__Oxb5591[0xe5]];
                        $['log'](__Oxb5591[0xe6] + parseInt(100 - rotarytimes) + __Oxb5591[0xe7] + rotaryres[__Oxb5591[0x30]][__Oxb5591[0x32]] + __Oxb5591[0x98]);
                        if (rotaryres[__Oxb5591[0x30]][__Oxb5591[0x32]] != 0 && doubleTimes != 0) {
                            $['log'](__Oxb5591[0xe8]);
                            await $[__Oxb5591[0x17]](10000);
                            await TurnDouble()
                        };
                        await rotaryCheck()
                    }
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e, _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function rotaryCheck() {
    return new Promise(async (_0xc2e1x7) => {
        let _0xc2e1x2 = 0;
        while (_0xc2e1x2 <= 3) {
            if (100 - rotarytimes >= rotaryres[__Oxb5591[0x30]][__Oxb5591[0xea]][_0xc2e1x2][__Oxb5591[0xe9]] && rotaryres[__Oxb5591[0x30]][__Oxb5591[0xea]][_0xc2e1x2][__Oxb5591[0xeb]] == 0) {
                await runRotary(_0xc2e1x2 + 1)
            };
            _0xc2e1x2++
        };
        _0xc2e1x7()
    })
}

function runRotary(_0xc2e1x3c) {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        const _0xc2e1x3d = cookie + __Oxb5591[0xec] + _0xc2e1x3c;
        $[__Oxb5591[0x42]](kdHost(`${__Oxb5591[0xed]}${Date[__Oxb5591[0xe1]]()}${__Oxb5591[0x25]}`, _0xc2e1x3d), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            let _0xc2e1x3e = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (_0xc2e1x3e[__Oxb5591[0x18]] == 1) {
                $[__Oxb5591[0x1b]] += `${__Oxb5591[0xee]}${_0xc2e1x3c}${__Oxb5591[0xef]}` + _0xc2e1x3e[__Oxb5591[0x30]][__Oxb5591[0x32]] + __Oxb5591[0xae]
            } else {
                if (_0xc2e1x3e[__Oxb5591[0x7d]] == __Oxb5591[0xf0]) {
                    $[__Oxb5591[0x1b]] += `${__Oxb5591[0xee]}${_0xc2e1x3c}${__Oxb5591[0xef]}` + __Oxb5591[0xf1]
                }
            };
            _0xc2e1x7()
        })
    })
}

function TurnDouble() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x42]](kdHost(`${__Oxb5591[0xf2]}${Date[__Oxb5591[0xe1]]()}${__Oxb5591[0x25]}`, cookie), (_0xc2e1x9, _0xc2e1xa, _0xc2e1xb) => {
            try {
                let _0xc2e1x40 = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
                if (_0xc2e1x40[__Oxb5591[0x30]][__Oxb5591[0xf3]] == 1) {
                    $['log'](__Oxb5591[0xf4] + _0xc2e1x40[__Oxb5591[0x30]][__Oxb5591[0xf5]]);
                    doublerotary += _0xc2e1x40[__Oxb5591[0x30]][__Oxb5591[0x32]]
                }
            } catch (e) {
                $[__Oxb5591[0x8]](e, _0xc2e1xa)
            } finally {
                _0xc2e1x7()
            }
        })
    })
}

function earningsInfo() {
    return new Promise((_0xc2e1x7, _0xc2e1x8) => {
        $[__Oxb5591[0x60]](kdHost(__Oxb5591[0xf6] + cookie), (_0xc2e1x9, _0xc2e1x18, _0xc2e1xb) => {
            infores = JSON[__Oxb5591[0x2d]](_0xc2e1xb);
            if (infores[__Oxb5591[0x18]] == 0) {
                $[__Oxb5591[0x1b]] += __Oxb5591[0xf7];
                for (i = 0; i < infores[__Oxb5591[0xf9]][0x0][__Oxb5591[0xf8]][__Oxb5591[0xb]]; i++) {
                    $[__Oxb5591[0x1b]] += __Oxb5591[0x4e] + infores[__Oxb5591[0xf9]][0x0][__Oxb5591[0xf8]][i]['name'] + __Oxb5591[0xef] + infores[__Oxb5591[0xf9]][0x0][__Oxb5591[0xf8]][i][__Oxb5591[0x2e]] + __Oxb5591[0xae]
                };
                $[__Oxb5591[0x1b]] += __Oxb5591[0xfa] + infores[__Oxb5591[0xf9]][0x0][__Oxb5591[0x32]] + __Oxb5591[0xfb]
            };
            _0xc2e1x7()
        })
    })
}
async function showmsg() {
    if ($[__Oxb5591[0x2]]() && rotaryres[__Oxb5591[0x18]] !== 0 && rotarytimes && (100 - rotarytimes) % 95 == 0 && cash >= 10) {
        await notify[__Oxb5591[0xff]]($['name'] + __Oxb5591[0xfc] + nick, __Oxb5591[0xfd] + cash + __Oxb5591[0xfe] + __Oxb5591[0x66] + $[__Oxb5591[0x33]] + __Oxb5591[0x66] + $[__Oxb5591[0x1b]])
    } else {
        if (rotaryres[__Oxb5591[0x18]] == 1 && rotarytimes >= 97) {
            $['msg']($['name'] + __Oxb5591[0xfc] + nick, $[__Oxb5591[0x33]], $[__Oxb5591[0x1b]])
        } else {
            if (rotaryres[__Oxb5591[0x18]] == 1 && rotarytimes % notifyInterval == 0) {
                $['msg']($['name'] + __Oxb5591[0xfc] + nick, $[__Oxb5591[0x33]], $[__Oxb5591[0x1b]])
            } else {
                if (rotaryres[__Oxb5591[0x18]] == 1 && rotarytimes == __Oxb5591[0x100]) {
                    $['msg']($['name'] + __Oxb5591[0x101] + nick + __Oxb5591[0xfc] + rotarynum, $[__Oxb5591[0x33]], $[__Oxb5591[0x1b]])
                } else {
                    console['log'](__Oxb5591[0x66] + $[__Oxb5591[0x33]] + __Oxb5591[0x66] + $[__Oxb5591[0x1b]])
                }
            }
        }
    }
}

function configApi() {
    if (!$[__Oxb5591[0x2]]() && cookieYouth[__Oxb5591[0xc2]](__Oxb5591[0x102]) == -1) {
        cookieArr[__Oxb5591[0x103]](cookieYouth), readArr[__Oxb5591[0x103]](artBody), timeArr[__Oxb5591[0x103]](readTimes)
    } else {
        if (!$[__Oxb5591[0x2]]() && cookieYouth[__Oxb5591[0xc2]](__Oxb5591[0x102]) > -1) {
            cookieYouth = cookieYouth['split'](__Oxb5591[0x102]), artBody = artBody['split'](__Oxb5591[0x25]), readTimes = readTimes['split'](__Oxb5591[0x25])
        } else {
            if ($[__Oxb5591[0x2]]()) {
                if (process[__Oxb5591[0x106]][__Oxb5591[0x105]] && process[__Oxb5591[0x106]][__Oxb5591[0x105]][__Oxb5591[0xc2]](__Oxb5591[0x102]) > -1) {
                    cookieYouth = process[__Oxb5591[0x106]][__Oxb5591[0x105]]['split'](__Oxb5591[0x102])
                } else {
                    if (process[__Oxb5591[0x106]][__Oxb5591[0x105]] && process[__Oxb5591[0x106]][__Oxb5591[0x105]][__Oxb5591[0xc2]](__Oxb5591[0x66]) > -1) {
                        cookieYouth = process[__Oxb5591[0x106]][__Oxb5591[0x105]]['split'](__Oxb5591[0x66])
                    } else {
                        cookieYouth = [process[__Oxb5591[0x106]][__Oxb5591[0x105]]]
                    }
                };
                if (process[__Oxb5591[0x106]][__Oxb5591[0x107]] && process[__Oxb5591[0x106]][__Oxb5591[0x107]][__Oxb5591[0xc2]](__Oxb5591[0x25]) > -1) {
                    artBody = process[__Oxb5591[0x106]][__Oxb5591[0x107]]['split'](__Oxb5591[0x25])
                } else {
                    if (process[__Oxb5591[0x106]][__Oxb5591[0x107]] && process[__Oxb5591[0x106]][__Oxb5591[0x107]][__Oxb5591[0xc2]](__Oxb5591[0x66]) > -1) {
                        artBody = process[__Oxb5591[0x106]][__Oxb5591[0x107]]['split'](__Oxb5591[0x66])
                    } else {
                        artBody = [process[__Oxb5591[0x106]][__Oxb5591[0x107]]]
                    }
                };
                if (process[__Oxb5591[0x106]][__Oxb5591[0x108]] && process[__Oxb5591[0x106]][__Oxb5591[0x108]][__Oxb5591[0xc2]](__Oxb5591[0x25]) > -1) {
                    readTimes = process[__Oxb5591[0x106]][__Oxb5591[0x108]]['split'](__Oxb5591[0x25])
                } else {
                    if (process[__Oxb5591[0x106]][__Oxb5591[0x108]] && process[__Oxb5591[0x106]][__Oxb5591[0x108]][__Oxb5591[0xc2]](__Oxb5591[0x66]) > -1) {
                        readTimes = process[__Oxb5591[0x106]][__Oxb5591[0x108]]['split'](__Oxb5591[0x66])
                    } else {
                        readTimes = [process[__Oxb5591[0x106]][__Oxb5591[0x108]]]
                    }
                }
            }
        };
        Object[__Oxb5591[0x10a]](cookieYouth)[__Oxb5591[0x109]]((_0xc2e1x44) => {
            if (cookieYouth[_0xc2e1x44]) {
                cookieArr[__Oxb5591[0x103]](cookieYouth[_0xc2e1x44])
            }
        });
        Object[__Oxb5591[0x10a]](artBody)[__Oxb5591[0x109]]((_0xc2e1x44) => {
            if (artBody[_0xc2e1x44]) {
                readArr[__Oxb5591[0x103]](artBody[_0xc2e1x44])
            }
        });
        Object[__Oxb5591[0x10a]](readTimes)[__Oxb5591[0x109]]((_0xc2e1x44) => {
            if (readTimes[_0xc2e1x44]) {
                timeArr[__Oxb5591[0x103]](readTimes[_0xc2e1x44])
            }
        })
    };
    timeZone = new Date()[__Oxb5591[0x10b]]() / 60;
    timestamp = Date[__Oxb5591[0xe1]]() + (8 + timeZone) * 60 * 60 * 1000;
    bjTime = new Date(timestamp)[__Oxb5591[0x10e]](__Oxb5591[0x10c], {
        hour12: false,
        timeZoneName: __Oxb5591[0x10d]
    });
    $['log'](__Oxb5591[0x10f] + bjTime + __Oxb5591[0x110])
}

function GetCookie() {
    if ($request && $request['method'] != `${'OPTIONS'}` && $request['url']['match'](/\/NewTaskIos\/getTaskList/)) {
        RefererVal = $request['headers']['Referer'];
        signheaderVal = RefererVal['match'](/&uid=\d+/) + RefererVal['match'](/&cookie=[_a-zA-Z0-9-]+/) + RefererVal['match'](/&cookie_id=[a-zA-Z0-9]+/);
        if (signheaderVal) {
            $['setdata'](signheaderVal, 'youthheader_zq')
        };
        $['log'](`${''}${$['name']}${'获取Cookie: 成功, signheaderVal: $}'}`);
        $['msg']($['name'], `${'获取Cookie: 成功🎉'}`, `${''}`)
    } else {
        if ($request && $request['method'] != `${'OPTIONS'}` && $request['url']['match'](/\/article\/info\/get/)) {
            articlebodyVal = $request['url']['split']('?')[0x1];
            if (articlebodyVal) {
                $['setdata'](articlebodyVal, 'read_zq')
            };
            $['log'](`${''}${$['name']}${'获取阅读: 成功, articbody: '}${articlebodyVal}${''}`);
            $['msg']($['name'], `${'获取阅读请求: 成功🎉'}`, `${''}`)
        } else {
            if ($request && $request['method'] != `${'OPTIONS'}` && $request['url']['match'](/\/v5\/user\/stay/)) {
                const _0xc2e1x46 = $request['body'];
                if (_0xc2e1x46) {
                    $['setdata'](_0xc2e1x46, 'readtime_zq')
                };
                $['log'](`${''}${$['name']}${'获取阅读时长: 成功, timebodyVal: '}${_0xc2e1x46}${''}`);
                $['msg']($['name'], `${'获取阅读时长: 成功🎉'}`, `${''}`)
            } else {
                if ($request && $request['method'] != `${'OPTIONS'}` && $request['url']['match'](/\/withdraw\d?\.json/)) {
                    const _0xc2e1x47 = $request['body'];
                    const _0xc2e1x48 = $request['url'];
                    if (_0xc2e1x47) {
                        $['setdata'](_0xc2e1x47, 'cashbody_zq')
                    };
                    if (_0xc2e1x48) {
                        $['setdata'](_0xc2e1x48, 'cashurl_zq')
                    };
                    $['log'](`${''}${$['name']}${', 获取提现请求: 成功, withdrawUrl: '}${_0xc2e1x48}${''}`);
                    $['log'](`${''}${$['name']}${', 获取提现请求: 成功, withdrawBody: '}${_0xc2e1x47}${''}`);
                    $['msg']($['name'], `${'获取提现请求: 成功🎉'}`, `${''}`)
                }
            }
        }
    }
}(function (_0xc2e1x49, _0xc2e1x4a, _0xc2e1x4b, _0xc2e1x4c, _0xc2e1x4d, _0xc2e1x4e) {
    _0xc2e1x4e = __Oxb5591[0x0];
    _0xc2e1x4c = function (_0xc2e1x4f) {
        if (typeof alert !== _0xc2e1x4e) {
            alert(_0xc2e1x4f)
        };
        if (typeof console !== _0xc2e1x4e) {
            console['log'](_0xc2e1x4f)
        }
    };
    _0xc2e1x4b = function (_0xc2e1x50, _0xc2e1x49) {
        return _0xc2e1x50 + _0xc2e1x49
    };
    _0xc2e1x4d = _0xc2e1x4b(__Oxb5591[0x125], _0xc2e1x4b(_0xc2e1x4b(__Oxb5591[0x126], __Oxb5591[0x127]), __Oxb5591[0x128]));
    try {
        _0xc2e1x49 = __encode;
        if (!(typeof _0xc2e1x49 !== _0xc2e1x4e && _0xc2e1x49 === _0xc2e1x4b(__Oxb5591[0x129], __Oxb5591[0x12a]))) {
            _0xc2e1x4c(_0xc2e1x4d)
        }
    } catch (e) {
        _0xc2e1x4c(_0xc2e1x4d)
    }
})({})

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}