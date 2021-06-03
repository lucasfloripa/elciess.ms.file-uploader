/* eslint-disable import/first */
import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config({ path: './src/main/config/config.env' })

import env from '@/main/config/env'
import { app } from '@/main/config'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
