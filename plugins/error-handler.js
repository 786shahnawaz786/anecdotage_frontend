// plugins/error-handler.js
export default function (context, inject) {
    // 1. Handle Axios errors
    context.$axios.onError((error) => {
      const code = error.response?.status
      const message = error.response?.data?.message || 'An error occurred'
      
      // Specific handling for 500 errors
      if (code === 500) {
        console.error('Server Error:', error.response?.data)
        
        // Redirect to error page in production
        if (process.env.NODE_ENV === 'production') {
          context.error({ statusCode: 500, message: 'Server Error' })
        } else {
          // Show detailed error in development
          console.groupCollapsed('Axios Error Details')
          console.log('Request:', error.config)
          console.log('Response:', error.response)
          console.groupEnd()
        }
        return Promise.reject(error)
      }
      
      // Handle other status codes
      switch (code) {
        case 401:
          context.$auth.logout()
          context.redirect('/login')
          break
        case 404:
          context.error({ statusCode: 404, message: 'Not Found' })
          break
        default:
          console.error(`HTTP Error ${code}:`, message)
      }
      
      return Promise.reject(error)
    })
  
    // 2. Handle Vue Router warnings (like the named route issue)
    if (process.client) {
      const originalWarn = console.warn
      console.warn = function(...args) {
        // Filter out the specific Vue Router warning
        if (args[0]?.includes('[vue-router] Named Route')) {
          console.groupCollapsed('Router Configuration Warning')
          originalWarn.apply(console, args)
          console.log('Suggested fix:')
          console.log('- Remove name from parent route with default child')
          console.log('- Move name to default child route')
          console.log('- Update all router links accordingly')
          console.groupEnd()
          return
        }
        originalWarn.apply(console, args)
      }
    }
  
    // 3. Global error handler
    context.app.nuxt.error = (err) => {
      console.error('Global error handler:', err)
      
      // Handle specific error types
      if (err.message?.includes('Cannot read properties of null')) {
        console.warn('Null reference error detected - check your data bindings')
      }
      
      // In production, show user-friendly error
      if (process.env.NODE_ENV === 'production') {
        context.error({
          statusCode: 500,
          message: 'Something went wrong. Please try again later.'
        })
      }
    }
  
    // 4. Inject helper methods
    inject('handleError', (error) => {
      console.error('Handled error:', error)
      // Add custom error handling logic here
    })
  }