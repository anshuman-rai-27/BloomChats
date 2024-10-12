import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getMessageByGroupId = query({
    args:{groupId:v.id("groups")},
    handler: async(ctx, args)=>{
        return await ctx.db.query('messages').filter((q)=>q.eq(q.field('groupId'), args.groupId)).collect();

    }
})

export const createMessage = mutation({
    args:{content:v.string(), groupId:v.id('groups'), from:v.id('users')},
    handler:async (ctx,args)=>{
        await ctx.db.insert('messages', {
            from:args.from,
            content:args.content,
            groupId:args.groupId
        })

    }
})


// export const getMessageByGroupId = query({
//     args: { groupId: v.id('groups') },
//     handler: async (ctx, args) => {
//         return await ctx.table('messages').filter((q) => q.eq(q.field('groupId'), args.groupId));
//     }
// })


// export const createMessage = mutation({
//     args: { content: v.string(), from: v.id('users'), groupId: v.id('groups') },
//     handler: async (ctx, args) => {
//         try {
//             await ctx.table('messages').insert({
//                 from: args.from,
//                 content: args.content,
//                 groupId: args.groupId
//             })
//             return { error: null }
//         } catch (error) {
//             return { error };
//         }
//     }
// })
