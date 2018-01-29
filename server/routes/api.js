import jwt from 'jsonwebtoken';
import UserModel from '../db/schema/user';

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
            const { username, password } = ctx.request.body
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
                    user.token = token
                    await user.save()
                    ctx.body = { status: 1, msg: '登陆验证成功', token, username }
                }
            }
        }
    )

    return router.routes();

}