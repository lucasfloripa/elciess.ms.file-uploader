import { Router } from 'express'

export default (router: Router): void => {
  router.post('/test', (req, res, next) => {
    res.send('Hello World')
  })
}
