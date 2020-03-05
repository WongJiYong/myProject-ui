import http from '@/global/http'

export function del(ids) {
  return http({
    url: 'api/pictures',
    method: 'delete',
    data: ids
  })
}

export function sync() {
  return http({
    url: 'api/pictures/synchronize',
    method: 'post'
  })
}

export default { del, sync }
