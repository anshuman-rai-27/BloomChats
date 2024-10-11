import { v } from "convex/values";
import { mutation, query } from "./functions";

export const getMessageByGroupId = query({
    args:{id:v.id('groups')},
    handler:async (ctx, args)=>{
        return await ctx.table('messages').filter((q)=>q.eq(q.field('groupId'), args.id));
    }
})


export const createMessage = mutation({
    args:{content:v.string(),  to:v.id('users'), from:v.id('users')},
    handler:async (ctx, args) => {

    }
})
