import Koa from 'koa';
import Router from 'koa-router';
import parser from 'koa-bodyparser';
import cors from 'koa2-cors';
import views from 'koa-views';
import staticServer from 'koa-static';

import api from './routes/api';
import routes from './routes/routes';

const app = new Koa();



app
    .use(cors())
    .use(parser())
    .use(views('../view'))
//    .use(api(Router))
    .use(routes(Router))
    .use(staticServer('../dist'))
    .use(staticServer('../src'));

app.listen(3000,'localhost',()=>{
    console.log('server running on port 3000');
})