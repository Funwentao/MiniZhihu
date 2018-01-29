export default function (Router) {
    const router = new Router();


    router.get('/',async(ctx,next) => {
        await ctx.render('login');
    })


    return router.routes();
}