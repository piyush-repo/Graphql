
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');
let address = {
    12:{
        id:'12',
        location:'USA',
        phno:'8989898989'
    },
    21:{
        id:'21',
        location:'USA',
        phno:'8989898989'
    },
    31:{
        id:'31',
        location:'USA',
        phno:'8989898989'
    },
    41:{
        id:'41',
        location:'USA',
        phno:'8989898989'
    }
}
const addresstype = new GraphQLObjectType({
    name:'address',
    fields:{
        id:{type:GraphQLID},
        location:{type:GraphQLString},
        phno:{type:GraphQLString}
    }
})
exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID },
        userId:{type:new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstname:{type: new GraphQLNonNull(GraphQLString) },
        last_name:{type: new GraphQLNonNull(GraphQLString) },
        address:{
            type:addresstype,
        resolve(obj, args, ctx){
            var sno = obj.userId;
            return address[sno];
        }}
    }
})

module.exports = exports;