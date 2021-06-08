import { UploadFileStorage } from '@/data/protocols'
import { UploadFile } from '@/domain/usecases'

import { S3 } from 'aws-sdk'
import fs from 'fs'

export class AwsStorage implements UploadFileStorage {
  async uploadFile (uploadFileParams: UploadFile.Params): Promise<boolean> {
    const awsS3 = new S3({
      region: 'us-east-2'
    })

    awsS3.putObject({
      Bucket: 'elciess',
      Key: uploadFileParams.filename,
      ACL: 'public-read',
      Body: fs.promises.readFile(uploadFileParams.path)
    })

    return Promise.resolve(true)
  }
}
