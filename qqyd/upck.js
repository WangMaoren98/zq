let qqyduserck = $[_0xb7df('0x224', 'o6me')](_0xb7df('0x64', 'oSHO')) || 0x1;
let qqydapp = $[_0xb7df('0x84', 'G@^c')]('qqydapp', []);

if (typeof $request !== _0xb7df('0x1e4', '7@$l')) {
    console.log('测试抓取ck上传')
    await getCk();
}
async function getCk() {
    if ($request['url']['match'](/\/pkg11955\/promoteReadTimeInit/)) {
        const cookie = $request['headers']['Cookie'];
        let _0xacc1ae = qqyduserck - 0x1;
        if (qqydapp[_0xacc1ae]) {
            qqydapp[_0xacc1ae]['cookie'] = cookie;
        } else {
            qqydapp[_0xacc1ae] = {
                'cookie': cookie
            };
        }
        $['setdata'](JSON[_0xb7df('0x5f', '%@U2')](qqydapp, null, 0x2), _0xb7df('0x70', 'G@^c'));
        $['msg']($['name'], 'QQ阅读账号' + (_0xacc1ae + 0x1) + 'Cookie获取成功！🎉');
    }
    if ($request['url']['match'](/\/common\/log/)) {
        const _0xfff27c = JSON['stringify']($request['headers']);
        const _0x55964b = $request['body'];
        $['log'](_0x55964b);
        let _0x23d77c = qqyduserck - 0x1;
        if (qqydapp[_0x23d77c]) {
            qqydapp[_0x23d77c]['rhkey'] = _0xfff27c;
            qqydapp[_0x23d77c]['rbkey'] = _0x55964b;
        } else {
            qqydapp[_0x23d77c] = {
                'rhkey': _0xfff27c,
                'rbkey': _0x55964b
            };
        }
        $['setdata'](JSON['stringify'](qqydapp, null, 0x2), 'qqydapp');
        $['msg']($['name'], 'QQ阅读账号' + (_0x23d77c + 0x1) + '阅读基础获取成功！🎉');
    }
}

function taskHomeCoin(cookie) {
    return new Promise((resolve) => {

        const body = {"type":type,"id":id,"apiMapping":"/active/taskHomeCoin"}
        $.post(taskurl(body), (err, resp, data) => {
            try {
                data = JSON.parse(data);
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}