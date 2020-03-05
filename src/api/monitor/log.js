import http from '@/global/http'

export function getErrDetail(id) {
  return http({
    url: 'api/logs/error/' + id,
    method: 'get'
  })
}

export function delAllError() {
  return http({
    url: 'api/logs/del/error',
    method: 'delete'
  })
}

export function delAllInfo() {
  return http({
    url: 'api/logs/del/info',
    method: 'delete'
  })
}
