import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// export const getUser = query({
//     args:{email:v.string()},
//     handler:async (ctx, args)=>{
//         return await ctx.table('users').get('email', args.email).edge('profile');
//     }
// })

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
