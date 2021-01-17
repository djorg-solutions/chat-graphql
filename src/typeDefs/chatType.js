import { gql } from 'apollo-server-express'

export default gql`
 type Chat{
   id: ID!
   name: String!
   comments: [Comment]
   owner: User!
   guests: [User!]!
   createdAt: Date!
 }

 extend type Query {
  chat(id:ID): Chat! 
  chats:[Chat!]!
 }
 
 extend type Mutation {
  newChat(name: String!, owner: ID, guests: [String!]!): Chat
 }
`