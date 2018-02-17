export default function (Router) {
    const router = new Router();

    /**
     * 登录注册页面
     */
    router.get('/',async(ctx,next) => {
        await ctx.render('login');
    });

    /**
     * 首页
     */
    router.get('/index',async(ctx,next) => {
        await ctx.render('index');
    });

    /**
     * 收藏
     */
    router.get('/collection',async(ctx,next) => {
        await ctx.render('collection');
    });

    /**
     * 关注
     */
    router.get('/like',async(ctx,next) => {
        await ctx.render('like');
    });

    /**
     * 我的
     */
    router.get('/my',async(ctx,next) => {
        await ctx.render('my');
    });

    /**
     * 我的提问
     */
    router.get('/questions',async(ctx,next) => {
        await ctx.render('questions');
    });

    /**
     * 我的文章
     */
    router.get('/articles',async(ctx,next) => {
        await ctx.render('articles');
    });



    return router.routes();
}