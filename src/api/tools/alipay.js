import http from '@/global/http'

export function get() {
  return http({
    url: 'api/aliPay',
    method: 'get'
  })
}

export function update(data) {
  return http({
    url: 'api/aliPay',
    data,
    method: 'put'
  })
}

// 支付
export function toAliPay(url, data) {
  return http({
    url: 'api/' + url,
    data,
    method: 'post'
  })
}
