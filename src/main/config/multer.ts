import multer from 'multer'
import crypto from 'crypto'

const tmpFilePath = `${__dirname}/../../tmp`

const multerConfig = {
  dest: tmpFilePath,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tmpFilePath)
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, file.originalname)

        file.originalname = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.originalname)
      })
    }
  })
}

const multerUpload = multer(multerConfig).single('file')

export { multerUpload }
