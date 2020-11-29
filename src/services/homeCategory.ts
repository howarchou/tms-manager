/**
 *  Created by pw on 2020/11/29 7:29 下午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getHomeCategorys(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.Home_Category>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.Home_Category>>(
    '/api/tops' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveHomeCategory(params: API.Home_Category): Promise<API.Home_Category> {
  const { id, ...others } = params;
  const path = id ? `/api/tops/${id}` : '/api/tops';
  const result = await request<API.BaseResponse<API.Home_Category>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function deleteHomeCategory(params: API.Home_Category) {
  return await request(`/api/tops/${params.id}`, { method: 'DELETE' });
}
