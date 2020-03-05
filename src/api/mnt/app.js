import http from '@/global/http'

export function add(data) {
  return http({
    url: 'api/app',
    method: 'post',
    data
  })
}

export function del(ids) {
  return http({
    url: 'api/app',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return http({
    url: 'api/app',
    method: 'put',
    data
  })
}

export default { add, edit, del }
