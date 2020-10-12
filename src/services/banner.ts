/**
 *  Created by pw on 2020/10/11 10:34 上午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getBanners(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.HomeBanner>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.HomeBanner>>(
    '/api/banners' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveBanner(params: API.HomeBanner): Promise<API.HomeBanner> {
  const { ID, ...others } = params;
  const path = ID ? `/api/banners/${ID}` : '/api/banners';
  const result = await request<API.BaseResponse<API.HomeBanner>>(path, {
    method: ID ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}
