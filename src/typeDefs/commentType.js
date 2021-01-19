import { gql } from 'apollo-server-express'

export default gql`
 type Comment{
   id: ID!
   description: String!
   user: User!
   chat: Chat!
   createdAt: Date!
 }

 type CommentNew{
   id: String
   description: String
   createdAt: Date!
   chat: ID
   username: String 
 }

 extend type Query {
  comments:[Comment!]!
 }
 
 extend type Mutation {
  newComment(description: String!, user: ID!, chat:ID!): Comment
 }

 extend type Subscription {
  commentAdded: CommentNew
 }
`