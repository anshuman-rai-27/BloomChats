import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createBot = mutation({
    args:{name:v.string(), description:v.optional(v.string()), groupId:v.id('groups')},
    handler: async (ctx,args) =>{
        return await ctx.db.insert('bots',{
            name:args.name,
            description:args.description,
            groupId:args.groupId
        })
    }
})

export const createCommand = mutation({
    args:{command:v.string(), action:v.string(), botId:v.id('bots')},
    handler: async (ctx,args)=>{
        return await ctx.db.insert('commands',{
            command:args.command,
            action:args.action,
            botId:args.botId
        })
    }
})

export const getCommandsByGroupId = query({
    args:{groupId:v.id('groups')},
    handler: async( ctx,args)=>{
        const bots = await ctx.db.query('bots').filter((q)=>q.eq(q.field('groupId'), args.groupId)).collect();
        const commands = [];
        for(let i = 0 ; i < bots.length ; i++){
            const botCommands = await ctx.db.query('commands').filter((q)=>q.eq(q.field('botId'), bots[i]._id)).collect();
            commands.push(...botCommands);
        }
        return commands;
    }

})