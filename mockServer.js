let express = require('express');
let Mock = require('mockjs');
let app = express();



const myNodePage = {
    router : '/ee/noble/user/myNodePage',
    data : Mock.mock({
        "data": {
            "nobleList": [
                {
                    "coinType": 0,
                    "logoUrl": "",
                    "nobleCoin": 0,
                    "nobleType": "King",
                    "openPrice": 0,
                    "privilegeList": [
                        {
                            "bizId": "",
                            "bizType": 1,
                            "iconUrl": "https://showme-livecdn.elelive.net/avatar/10933499?1=1&t=1622822726354",
                            "imageUrl": "https://showme-livecdn.elelive.net/avatar/10933499?1=1&t=1622822726354",
                            "isShow": 0,
                            "status": 0,
                            "weight": 0
                        }
                    ],
                    "protectDays": 0,
                    "renewPrice": 0,
                    "salesCode": "",
                    "salesName": "",
                    "status": 0,
                    "supportRenew": true,
                    "vaildDays": 0,
                    "weight": 0
                },

                {
                    "coinType": 0,
                    "logoUrl": "",
                    "nobleCoin": 0,
                    "nobleType": "Duke",
                    "openPrice": 0,
                    "privilegeList": [
                        {
                            "bizId": "",
                            "bizType": 1,
                            "iconUrl": "https://showme-livecdn.elelive.net/avatar/10933499?1=1&t=1622822726354",
                            "imageUrl": "https://showme-livecdn.elelive.net/avatar/10933499?1=1&t=1622822726354",
                            "isShow": 0,
                            "status": 0,
                            "weight": 0
                        }
                    ],
                    "protectDays": 0,
                    "renewPrice": 0,
                    "salesCode": "",
                    "salesName": "",
                    "status": 0,
                    "supportRenew": true,
                    "vaildDays": 0,
                    "weight": 0
                }
            ],
            "userNobleInfo": {
                "avatar": "https://showme-livecdn.elelive.net/avatar/10933499?1=1&t=1622822726354",
                "etime": "22",
                "nickname": "小敏",
                "nobleCoin": 0,
                "nobleType": "",
                "status": 0,
                "stime": "22",
                "userId": "11",
                "haveOpened":0,  //是否开通
            }
        },
        "msg": "",
        "status": 200,
        "timestamp": 0,
        "traceId": ""
    })

}

const dataArr = [myNodePage];
for(let i=0;i<dataArr.length;i++){
    let item = dataArr[i];
    app.all(item.router, function(req, res) {
        res.json(item.data);
    });
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//监听3000端口
app.listen('3001');
console.log('mock服务启动')