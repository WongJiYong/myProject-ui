import http from '@/global/http'

export function get() {
  return http({
    url: 'api/email',
    method: 'get'
  })
}

export function update(data) {
  return http({
    url: 'api/email',
    data,
    method: 'put'
  })
}

export function send(data) {
  return http({
    url: 'api/email',
    data,
    method: 'post'
  })
}
