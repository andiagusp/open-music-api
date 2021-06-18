const routes = (handler) => [
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongs
  }
]

module.exports = routes
