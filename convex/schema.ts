import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";
import { v } from "convex/values";

const schema = defineEntSchema({
    users:defineEnt({
        name:v.string(),
        description: v.string(),
        email:v.string(),
        publicKey:v.string(),
    }).edge('session').edges('group', {to:'groups', table:"groupchat"}),

    messages:defineEnt({
        content:v.string()
    }).edge('group'),

    sessions:defineEnt({
        deviceId:v.string(),
    }).edge('user'),

    groups: defineEnt({
        name:v.string(),
        description:v.string(),
        isDm:v.boolean(),
        owner:v.optional(v.id('users'))
    }).edge('message').edges('user', {to:'users', table:"groupchat"})
})

export default schema;

export const entDefinitions = getEntDefinitions(schema); 

