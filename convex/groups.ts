import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createGroup = mutation({
    args:{name:v.string(), description:v.string(), isDm:v.boolean()},
    handler:async(ctx,args) =>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            //TODO: Need to do somethign about this
            return;
        }
        const userId = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), user.email)).first();
        try {
            const groupId = await ctx.db.insert('groups', {
                 description:args.description,
                 name:args.name,
                 isDm:args.isDm,
                 owner: userId!._id
            })
            await ctx.db.insert('groupchats',{
                userId:userId!._id,
                groupId:groupId
            })
            return {error:null}
        } catch (error) {
            console.error(error);
            return {error}
        }
    }
})

export const getGroupWithUserId = query({
    args:{},
    handler: async (ctx, args) =>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            //TODO: Need to do somethign about this
            return;
        }
        const userId = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), user.email)).first();
        try{
            const data = await ctx.db.query('groupchats').filter((q)=>q.eq(q.field('userId'), userId!._id)).collect()
            return {data, error:null};
        }catch(error){
            console.error(error);
            return {data:null, error}
        }
    }
})

export const joinGroup = mutation({
    args:{groupId:v.id('groups')},
    handler:async (ctx, args)=>{
        const user = await ctx.auth.getUserIdentity();
        if(!user){
            //TODO: Need to do somethign about this
            return;
        }
        const userId = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), user.email)).first();
        try {
            await ctx.db.insert('groupchats',{
                userId:userId!._id,
                groupId:args.groupId
            })    
            return {error:null}
        } catch (error) {
            console.error(error);
            return {error}
        }
    }
})