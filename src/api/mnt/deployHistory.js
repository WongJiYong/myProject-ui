import http from '@/global/http'

export function del(ids) {
  return http({
    url: 'api/deployHistory',
    method: 'delete',
    data: ids
  })
}

/**
 * 版本回退
 * @param data 选中行
 */
export function reducte(data) {
  return http({
    url: 'api/deploy/serverReduction',
    method: 'post',
    data
  })
}
