import { multerUpload } from '../../main/config/multer'
import { expressRouterAdapter, expressMiddlewareAdapter } from '@/main/adapters'
import { makeFileUploadController, makeFileLoadController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/upload', expressMiddlewareAdapter(makeAuthMiddleware()), multerUpload, expressRouterAdapter(makeFileUploadController()))
  router.get('/load', expressMiddlewareAdapter(makeAuthMiddleware()),expressRouterAdapter(makeFileLoadController()))
}
