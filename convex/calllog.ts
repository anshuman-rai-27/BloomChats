import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCallLog = mutation(
    {
        args: { from: v.id('users'), to: v.id('users') },
        handler: async (ctx, args) => {
            const calllog = await ctx.db.query('callLogs').filter((q)=>q.or(
                q.and(
                    q.eq(q.field('from'), args.from), q.eq(q.field('to'), args.to)
                ),
                q.and(
                    q.eq(q.field('to'), args.from), q.eq(q.field('from'), args.to)
                )
            )).filter((q)=>q.eq(q.field('status'), 'ONGOING')).first();
            if(calllog){
                return calllog._id;
            }
            const id = await ctx.db.insert('callLogs', {
                from: args.from,
                to: args.to,
                status: "ONGOING"
            })
            return id
        }
    }
)

export const getCallLog= query({
    args:{fromEmail:v.string()},
    handler: async (ctx,args)=>{
        const user = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.fromEmail)).first()
        const callLogs =  await ctx.db.query('callLogs').filter((q)=>q.eq(q.field('from'),user!._id!)).collect();
        const newCallLogs = []
        for(let i= 0 ; i < callLogs.length ; i++){
            const user = await ctx.db.get(callLogs[i].to);
            newCallLogs.push({...callLogs[i], user})
        }
        return newCallLogs;
    }
})


export const updateCallLog = mutation({
    args: { callLogId: v.id('callLogs'), status: v.union(v.literal('COMPLETED'), v.literal('ONGOING')) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.callLogId, {
            status: args.status
        })
    }
})