import http from '@/global/http'

export function add(data) {
  return http({
    url: 'api/serverDeploy',
    method: 'post',
    data
  })
}

export function del(ids) {
  return http({
    url: 'api/serverDeploy',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return http({
    url: 'api/serverDeploy',
    method: 'put',
    data
  })
}

export default { add, edit, del }
