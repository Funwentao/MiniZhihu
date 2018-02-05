import jwt from 'jsonwebtoken';
import UserModel from '../db/schema/user';
import fs from 'fs';


export default function (Router) {

    const router = new Router({
        prefix:'/api'
    })

    router.post(
        '/signup',
        async(ctx,next) =>{
            const {username, password} = ctx.request.body;
            console.log(username,password);
            const user = await UserModel.findOne({username}).exec();
            if(user){
                ctx.body = {status:0,msg:'用户已存在'};
            }else{
                await UserModel({username,password}).save();
                ctx.body = {status: 1, msg: '注册成功' };
            }
        }
    );

    router.post(
        '/login',
        async (ctx, next) => {
            const { username, password } = ctx.request.body;
            const user = await UserModel.findOne({ username }).exec()
            if(!user) {
                ctx.body = { status: 0, msg: '用户不存在' }
            } else {
                if(user.password !== password) {
                    ctx.body = { status: 0, msg: '密码不正确' }
                } else {
                    const token = jwt.sign({name: user.username}, 'secret', {
                        expiresIn: 60*60  // token到期时间设置
                    })
                    user.token = token;
                    await user.save();
                    ctx.body = { status: 1, msg: '登陆验证成功', token, username }
                }
            }
        }
    )

    router.post(
        '/upload',
        async(ctx,next) => {
            const file = ctx.request.body.files.file
            console.log(ctx.request.body.files.file);
            console.log(ctx.request.body.files.file.name);
            const path = '../src/img/';
            const reader = fs.createReadStream(file.path);
            const writer = fs.createWriteStream(path + file.name);
            await reader.pipe(writer);
            ctx.body = { status: 1, msg: '上传成功',path:file.name};
        }
    )
    return router.routes();

}