import http from '@/global/http'

export function add(data) {
  return http({
    url: 'api/database',
    method: 'post',
    data
  })
}

export function del(ids) {
  return http({
    url: 'api/database',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return http({
    url: 'api/database',
    method: 'put',
    data
  })
}

export function testDbConnection(data) {
  return http({
    url: 'api/database/testConnect',
    method: 'post',
    data
  })
}

export default { add, edit, del, testDbConnection }
