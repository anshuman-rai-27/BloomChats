import { v } from "convex/values"
import { mutation, query } from "./_generated/server"


export const getUser = query({
    args:{},
    handler:async (ctx, args)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            return;
        }
        return await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), user.email)).collect();
    }
})
export const getPublicKey = mutation({
    args:{email:v.string(), publicKey:v.string()},
    handler:async(ctx,args)=>{
        const userInfo = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
        const userPublicKey = await ctx.db.query('userPublicKey').filter((q)=>q.eq(q.field('user'), userInfo!._id)).first()
        if(userPublicKey){
            return userPublicKey.publicKey;
        }
        await ctx.db.insert('userPublicKey',{
            publicKey:args.publicKey,
            user:userInfo!._id
        })
        return args.publicKey
    }
})
// export const createUser = mutation({
//     args:{email:v.string(), password:v.string(), name:v.string(), publicKey:v.string(), deviceId:v.string()},
//     handler:async (ctx,args) =>{

//         const profileId = await ctx.db.insert('profiles',{
//             name:args.name,
//             description:""
//         })
//         await ctx.table("users").insert({
//             email:args.email,
//             password:args.password,
//             publicKey:args.publicKey
//         })
//     }
// })
