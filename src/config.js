export const {
    NODE_ENV = 'development',
    SECRET = 'aslkdlkaj108309jdfjdfjd54asd',

    DB_USERNAME = '',
    DB_PASSWORD = 'bfnNlgS5gnhCdZhl',
    DB_HOST = 'localhost',
    DB_PORT = 27017,
    DB_NAME = 'chat'

} = process.env

export const IN_PROD = NODE_ENV === 'production'