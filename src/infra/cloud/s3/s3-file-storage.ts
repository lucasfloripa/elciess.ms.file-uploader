import { UploadFileStorage, LoadFileStorage } from '@/data/protocols'
import { AwsHelper } from '@/infra/helpers'

import fs from 'fs'

export class S3FileStorage implements UploadFileStorage, LoadFileStorage {
  async uploadFile (uploadFileParams: UploadFileStorage.Params): Promise<boolean> {
    const { bucket, originalname, path, mimetype } = uploadFileParams
    const awsS3 = AwsHelper.getClientS3()
    const fileContent = await fs.promises.readFile(path)
    const isValid = await awsS3.putObject({
      Bucket: bucket,
      Key: originalname,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: mimetype
    }).promise()
      .then(data => data.ETag)

    fs.unlinkSync(path)

    // eslint-disable-next-line no-unneeded-ternary
    return isValid ? true : false
  }

  async loadFile (loadFileParams: LoadFileStorage.Params): Promise<any> {
    const { bucket, originalName } = loadFileParams
    const awsS3 = AwsHelper.getClientS3()
    const readStream = awsS3.getObject({
      Bucket: bucket,
      Key: originalName
    }).createReadStream()
    return readStream
  }
}
