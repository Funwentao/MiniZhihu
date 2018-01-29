import jwt from 'jsonwebtoken';

export default function (Router) {

    const router = new Router({
        prefix:'api'
    })

    router.post(
        '/signup',
        async(ctx,next) =>{
            const {username, password} = ctx.request.body;

        }
    )


}