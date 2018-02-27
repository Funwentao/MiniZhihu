import jwt from 'jsonwebtoken';
import UserModel from '../db/schema/user';
import QuestionModel from '../db/schema/question';
import ArticleModel from '../db/schema/article';
import fs from 'fs';


export default function (Router) {

    const router = new Router({
        prefix:'/api'
    })

    router.post(
        '/signup',
        async(ctx,next) =>{
            const {username, password} = ctx.request.body;
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
            const user = await UserModel.findOne({ username }).exec();
            if(!user) {
                ctx.body = { status: 0, msg: '用户不存在' }
            } else {
                if(user.password !== password) {
                    ctx.body = { status: 0, msg: '密码不正确' }
                } else {
                    const token = jwt.sign({name: user.username}, 'secret', {
                        expiresIn: 60*60  // token到期时间设置
                    });
                    user.token = token;
                    await user.save();
                    ctx.session.username = username;
                    ctx.body = { status: 1, msg: '登陆验证成功', token, username }
                }
            }
        }
    )

    router.post(
        '/upload',
        async(ctx,next) => {
            const file = ctx.request.body.files.file;
            const path = '../src/img/';
            const reader = fs.createReadStream(file.path);
            let i = file.name.lastIndexOf('.');
            let fileType = file.name.slice(i-1);
            let filename = new Date().getTime()+fileType;
            const writer = fs.createWriteStream(path + filename);
            await reader.pipe(writer);
            ctx.body = { status: 1, msg: '上传成功',path:filename};
        }
    );

    router.post(
        '/updateInformation',
        async(ctx,next) => {
            const {pic,oldName,newName} = ctx.request.body;
            const password = ctx.request.body.password;
            const user = await UserModel.findOne({ username:oldName }).exec();
            user.username = newName;
            user.headPic = pic;
            if(!password.trim()){
                user.password = user.password;
            }else{
                user.password = password;
            }
            await user.save();
            ctx.body={status:1,msg:'更新成功'};
        }
    );


    router.post(
        '/publishQuestion',
        async(ctx,next) => {
            const {author,title,content} = ctx.request.body;
            const question = new QuestionModel({author,title,content});
            await question.save();
            await UserModel.update({username:author},{$push:{question:question._id}});
            ctx.body={status:1,msg:'发布成功'};

        }
    );


    router.get(
        '/getInformation',
        async(ctx,next) => {
            const {username} = ctx.request.query;
            const user = await UserModel.findOne({ username }).exec();
            const {headPic,articles,question,like,beLiked,collections,answer} = user;
            const al= articles.length,
                ql = question.length,
                ll = like.length,
                bl = beLiked.length,
                anl = answer.length,
                cl = collections.length;
            ctx.body={status:1,headPic,username,al,ql,ll,bl,cl,anl};
        }
    );


    router.get(
        '/getQuestions',
        async(ctx,next)=>{
            const {username} = ctx.request.query;
            const questions = await QuestionModel.find({author:username}).exec();
            ctx.body = {status:1,questions:questions.reverse()};
        }
    );

    router.get(
        '/getArticles',
        async(ctx,next)=>{
            const {username} = ctx.request.query;
            const articles = await ArticleModel.find({author:username}).exec();
            ctx.body = {status:1,articles:articles.reverse()};
        }
    );


    router.post(
        '/publishArticle',
        async(ctx,next)=>{
            const {author,title,content} = ctx.request.body;
            const article = new ArticleModel({author,title,content});
            await article.save();
            await UserModel.update({username:author},{$push:{articles:article._id}});
            ctx.body={status:1,msg:'发布成功'};
        }
    );

    router.get(
        '/getAll',
        async(ctx,next)=>{
            const articles = await ArticleModel.find();
            const questions = await QuestionModel.find();
            let i = 0,j=0,all=[];
            while(i<articles.length&&j<questions.length){
                if(articles[i].create_time>questions[j].create_time){
                    all.push(questions[j++]);
                }else{
                    all.push(articles[i++]);
                }
            }
            if(i!==articles.length){
                all.push(...articles.slice(i));
            }else{
                all.push(...questions.slice(j))
            }
            ctx.body = {status:1,all:all.reverse()};
        }
    );

    router.get(
        '/getMyLike',
        async(ctx,next)=>{
            const {username} = ctx.request.query;
            const {like} = await UserModel.findOne({ username }).exec();
            const jsonMap = [];
            let temp = {};
            for(let i = 0,l = like.length;i<l;i++){
                temp.userId = like[i];
                let user = await UserModel.findOne({_id:like[i]}).exec();
                temp.userHead = user.headPic;
                temp.username = user.username;
                temp.bl = user.beLiked.length;
                jsonMap.push(temp);
            }

            ctx.body = {status:1,like:jsonMap}
        }
    );

    router.get('/article_detail/:aid',async(ctx,next) => {
        const _id = ctx.params.aid;
        const {username,type} = ctx.request.query;
        const user = await UserModel.findOne({username}).exec();
        let article ;
        if(type==='article'){
            article = await ArticleModel.findOne({_id}).exec();
            article.comments = article.comments.reverse();
        }else{
            article = await QuestionModel.findOne({_id}).exec();
            article.answer = article.answer.reverse();
        }
        const author = article.author;
        const writer_user = await UserModel.findOne({username:author}).exec();
        const like = (user.like.indexOf(username)!==-1);
        const collect = (user.collections.indexOf(_id + '|' + type)!==-1);
        ctx.body = {
            status:1,
            headPic:writer_user.headPic,
            username:writer_user.username,
            article,
            like,
            collect
        };
    });

    router.post('/publish_comment',async(ctx,next)=>{
       const {_id,username,comment,type} = ctx.request.query;
       let commentItem = {};
       const user = await UserModel.findOne({username}).exec();
       commentItem.headPic = user.headPic;
       commentItem.username = username;
       commentItem.time = new Date().toLocaleString();
       commentItem.content = comment;
       if(type==='question'){
           await QuestionModel.update({_id},{$push:{answer:commentItem}});
       }else{
           await ArticleModel.update({_id},{$push:{comments:commentItem}});
       }
       await UserModel.update({username},{$push:{answer:{type,_id}}});
       ctx.body = {
           status:1,
           msg:'保存成功'
       }
    });


    router.get('/like',async(ctx,next)=>{
        const {writer,username} = ctx.request.query;
        let user= await UserModel.findOne({username}).exec();
        let like = user.like;
        if(like.indexOf(writer)===-1){
            like.push(writer)
        }else{
            let i = like.indexOf(writer);
            like.splice(i,1);
        }
        user.like = like;
        user.save();
        ctx.body = {
            status:1,
            msg:'操作成功'
        }
    });

    router.get('/collect',async(ctx,next)=>{
        const {_id,username,type} = ctx.request.query;
        let user = await UserModel.findOne({username}).exec();
        let collections = user.collections;
        if(collections.indexOf(_id + '|' + type)===-1){
            collections.push(_id + '|' + type)
        }else{
            let i = collections.indexOf(_id + '|' + type);
            collections.splice(i,1);
        }
        user.collections = collections;
        user.save();
        ctx.body = {
            status:1,
            msg:'操作成功'
        }
    });

    router.get('/getCollections',async(ctx,next)=>{
        const {username} = ctx.request.query;
        let {collections} = await UserModel.findOne({username}).exec();
        let c = [];
        for(let i = 0,l = collections.length;i<l;i++){
            let temp = collections[i].split('|');
            let _id = temp[0],type = temp[1];
            if(type==='article'){
                let t = await ArticleModel.findOne({_id}).exec();
                c.push(t);
            }else{
                let t = await QuestionModel.findOne({_id}).exec();
                c.push(t);
            }
        }
        ctx.body = {status:1,collections:c};
    });
    return router.routes();
}