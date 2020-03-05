import http from '@/global/http'

export function add(data) {
  return http({
    url: 'api/server',
    method: 'post',
    data
  })
}

export function del(ids) {
  return http({
    url: 'api/server',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return http({
    url: 'api/server',
    method: 'put',
    data
  })
}

export default { add, edit, del }
