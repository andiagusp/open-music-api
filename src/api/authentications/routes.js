const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.loginAuthenticationHandler
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.updateTokenAuthenticationHandler
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteTokenAuthenticationsHandler
  }
]

module.exports = routes
