import { multerUpload } from '../../main/config/multer'
import { expressRouterAdapter } from '@/main/adapters'
import { makeFileUploadController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/upload', multerUpload, expressRouterAdapter(makeFileUploadController()))
}