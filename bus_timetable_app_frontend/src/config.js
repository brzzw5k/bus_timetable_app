exports.BACKEND_URL = 'http://localhost:3000'
exports.BUS_STOP_SERVICE_DELAYS_URL = (id) => {
  return 'http://ckan2.multimediagdansk.pl/delays?stopId=' + id
}
