"use strict";

const { GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql'),
    app = require('express')();
const MeType = require('../types/index.js');
let mock = require('../mock.json');
//console.log(mock);
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me: {
            type: new GraphQLList(MeType),
            description: 'the current user identified by the id',
            args: {
                key : { type: new GraphQLList(GraphQLInt)}
            },
            resolve: (obj, args, ctx) => {
                console.log(args.key.length);
                if (args.key.length > 0) {
                    return mock.filter((item) => {
                        if (args.key.indexOf(item.userId)> -1) {
                            return item;
                        }
                    })
                }
                else {
                    return mock.slice(0,100)
                }
                return
            }
        }
    }
})
const schema = new GraphQLSchema({
    query: RootQueryType
})
const graphqlHTTP = require('express-graphql');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('application listening over port ', port);
})

//const query = process.argv[2]
//const { graphql } = require('graphql');
//graphql(schema, query).then((result) => console.log(result));
