import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
    ...authTables,
    profiles:defineTable({
        name:v.string(),
        description:v.string(),
        imgUrl:v.optional(v.string()),
        userId:v.id('users'),
        groupId:v.array(v.id('groups'))
    }),
    messages:defineTable({
        from:v.id('users'),
        content:v.string(),
        groupId:v.id('groups')
    }),
    sessions:defineTable({
        deviceId:v.string(),
        user:v.id('users')
    }),
    groups:defineTable({
        name:v.string(),
        description:v.string(),
        isDm:v.boolean(),
        owner:v.id('users'),
        users:v.array(v.id('users')),
        messages:v.array(v.id('messages'))
    }) 
})
export default schema;

// import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
// import { v } from "convex/values";

// const schema = defineEntSchema({
//     users:defineEnt({
//         publicKey:v.string(),
//         password:v.string(),
//     }).field('email', v.string(), {unique:true}).edge('session').edges('group', {to:'groups', table:"groupchat"}).edge('profile'),

//     profiles:defineEnt({
//         name:v.string(),
//         description: v.string(),
//     }).edge('user'),
//     messages:defineEnt({
//         from:v.id('users'),
//         content:v.string()
//     }).edge('group'),

//     sessions:defineEnt({
//         deviceId:v.string(),
//     }).edge('user'),

//     groups: defineEnt({
//         name:v.string(),
//         description:v.string(),
//         isDm:v.boolean(),
//         owner:v.optional(v.id('users'))
//     }).edge('message').edges('user', {to:'users', table:"groupchat"})
// })

// export default schema;

// export const entDefinitions = getEntDefinitions(schema); 

