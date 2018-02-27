import Koa from 'koa';
import Router from 'koa-router';
import parser from 'koa-bodyparser';
import body from 'koa-body';
import cors from 'koa2-cors';
import views from 'koa-views';
import session from 'koa-session-minimal';
import staticServer from 'koa-static';
import mongoConnection from './db/connection';

import api from './routes/api';
import routes from './routes/routes';

const app = new Koa();


const CONFIG = {
    key: 'session-id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
    cookie: {                   // 与 cookie 相关的配置
        domain: 'localhost',    // 写 cookie 所在的域名
        path: '/',              // 写 cookie 所在的路径
        maxAge: 1000 * 30,      // cookie 有效时长
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
};

app
    .use(cors())
    .use(session(CONFIG))
    .use(body({ multipart: true }))
    .use(parser({ multipart: true }))
    .use(views('../view'))
    .use(api(Router))
    .use(routes(Router))
    .use(staticServer('../dist'))
    .use(staticServer('../src'));


(async()=>{
    try{
        await mongoConnection();
    }catch (e){
        console.error('ERROR:',e);
    }

    app.listen(3000,'0.0.0.0',()=>{
        console.log('server running on port 3000');
    })

})();

