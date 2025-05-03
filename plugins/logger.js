// serverMiddleware/logger.js
export default function (req, res, next) {
    console.log('Incoming request:', req.url)
    next()
  }