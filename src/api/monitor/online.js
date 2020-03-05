import http from '@/global/http'

export function del(keys) {
  return http({
    url: 'auth/online',
    method: 'delete',
    data: keys
  })
}
