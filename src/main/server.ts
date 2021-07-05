/* eslint-disable import/first */
import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config({ path: './src/main/config/.env' })

import env from '@/main/config/env'
import app from './config/app'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
