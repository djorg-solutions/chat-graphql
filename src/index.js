import 'dotenv/config';
import cors from 'cors';
import {createServer} from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {IN_PROD, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, SECRET} from './config';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import jwt from 'jsonwebtoken';
import schemaDirectives from './directives';

var mongoose = require('mongoose');

(async ()=>{

  try {

    await mongoose.connect(`mongodb+srv://jorge:${DB_PASSWORD}@cluster0.cn88n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false
    });
     const app = express();
     app.use(cors());
  
     const addUser = async  (req) => {

      const token = req.headers.authorization
      try {
       const { user } = await jwt.verify(token, SECRET)
       req.user = user
      } catch (error) {
        console.log(error)
      }
      req.next()
    }

    app.use(addUser);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings:{
          'request.credentials':'include'
        }
      },
      context:({req, res}) => ({req, res })
    })

    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT || 8000, () => {
      console.log('Apollo Server On');
    })
  
  } catch (e) {
    console.error(e)
  }
})()
