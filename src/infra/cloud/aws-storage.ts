import { UploadFileStorage, LoadFileStorage } from '@/data/protocols'
import { AwsHelper } from '@/infra/cloud'

import fs from 'fs'

export class AwsStorage implements UploadFileStorage, LoadFileStorage {
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

    // eslint-disable-next-line no-unneeded-ternary
    return isValid ? true : false
  }

  async loadFile (loadFileParams: LoadFileStorage.Params): Promise<any> {
    const { bucket, fileName } = loadFileParams
    const awsS3 = AwsHelper.getClientS3()
    const file = awsS3.getObject({
      Bucket: bucket,
      Key: fileName
    }, (_err, data) => {
      return data
    })
    return file
  }
}
