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

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app
    .use(cors())
    .use(session(CONFIG,app))
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

