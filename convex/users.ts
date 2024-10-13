import { v } from "convex/values"
import { mutation, query } from "./_generated/server"


export const getUser = query({
    args:{email:v.string()},
    handler:async (ctx, args)=>{
        return await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
    }
})

export const getUserByUserId = query({
    args:{userId:v.id('users')},
    handler:async(ctx,args)=>{
        return await ctx.db.get(args.userId);
    }
})

export const setPublicKey = mutation({
    args:{email:v.string(), publicKey:v.string()},
    handler:async(ctx,args)=>{
        const userInfo = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
        await ctx.db.insert('userPublicKey',{
            publicKey:args.publicKey,
            user:userInfo!._id
        })
        return args.publicKey
    }
})

export const getPublicKey = mutation({
    args:{email:v.string()},
    handler:async(ctx,args)=>{
        const userInfo = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).first();
        const publicKey = await ctx.db.query('userPublicKey').filter((q)=>q.eq(q.field('user'), userInfo!._id)).first();
        return publicKey!.publicKey
    }
})
