import Koa from 'koa';
import Router from 'koa-router';
import parser from 'koa-bodyparser';
import cors from 'koa2-cors';
import views from 'koa-views';
import staticServer from 'koa-static-plus';
import convert from 'koa-convert';

//import api from './routes/api';
import routes from './routes/routes';

const app = new Koa();

app
    .use(cors())
    .use(parser())
    .use(convert(staticServer('../dist'),{
        pathPrefix: '/dist'
    }))
    .use(views('../view'))
//    .use(api(Router))
    .use(routes(Router));

app.listen(3000,'localhost',()=>{
    console.log('server running on port 3000');
})