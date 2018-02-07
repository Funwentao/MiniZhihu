import Koa from 'koa';
import Router from 'koa-router';
import parser from 'koa-bodyparser';
import body from 'koa-body';
import cors from 'koa2-cors';
import views from 'koa-views';
import staticServer from 'koa-static';
import mongoConnection from './db/connection';

import api from './routes/api';
import routes from './routes/routes';

const app = new Koa();



app
    .use(cors())
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

    app.listen(3000,'localhost',()=>{
        console.log('server running on port 3000');
    })

})();

