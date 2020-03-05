import http from '@/global/http'

export function testDbConnect(data) {
  return http({
    url: 'api/database/testConnect',
    method: 'post',
    data
  })
}

export function testServerConnect(data) {
  return http({
    url: 'api/serverDeploy/testConnect',
    method: 'post',
    data
  })
}
