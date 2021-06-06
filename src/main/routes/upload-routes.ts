import multerConfig from '@/main/config/multer'

import { Router } from 'express'
import multer from 'multer'

export default (router: Router): void => {
  router.post('/test', multer(multerConfig).single('file'),
    (req, res, next) => {
      console.log(req.file)
      res.json({ reqFile: req.file })
    })
}
