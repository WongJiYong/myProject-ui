import http from '@/global/http'

export function get() {
  return http({
    url: 'api/qiNiuContent/config',
    method: 'get'
  })
}

export function update(data) {
  return http({
    url: 'api/qiNiuContent/config',
    data,
    method: 'put'
  })
}

export function download(id) {
  return http({
    url: 'api/qiNiuContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return http({
    url: 'api/qiNiuContent/synchronize',
    method: 'post'
  })
}

export function del(ids) {
  return http({
    url: 'api/qiNiuContent',
    method: 'delete',
    data: ids
  })
}

export default { del, download, sync }
