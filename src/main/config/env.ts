export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://elciess:planeta05@elciess.ihcok.mongodb.net/elciess',
  port: process.env.PORT || 2020,
  jwtSecret: process.env.JWT_SECRET || '3lc1355'
}
