import http from '@/global/http'

export function count() {
  return http({
    url: 'api/visits',
    method: 'post'
  })
}

export function get() {
  return http({
    url: 'api/visits',
    method: 'get'
  })
}

export function getChartData() {
  return http({
    url: 'api/visits/chartData',
    method: 'get'
  })
}
