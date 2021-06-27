/**
 *  Created by pw on 2020/10/11 10:34 上午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getTypes(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.Type>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.Type>>(
    // eslint-disable-next-line no-useless-concat
    '/api/types' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveRecommend(params: API.Recommend): Promise<API.Recommend> {
  const { id, ...others } = params;
  const path = id ? `/api/types/${id}` : '/api/types';
  const result = await request<API.BaseResponse<API.Recommend>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function deleteRecommend(params: API.Recommend) {
  return await request(`/api/banners/${params.id}`, { method: 'DELETE' });
}
