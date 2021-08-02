import { Controller } from '@/presentation/protocols'

import { Request, Response } from 'express'

export const expressRouterAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.file || {})
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      if (httpResponse.body.file) {
        res.attachment(httpResponse.body.fileName)
        httpResponse.body.file.pipe(res)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
