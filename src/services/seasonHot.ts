/**
 *  Created by pw on 2020/10/11 10:34 上午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getSeasonHots(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.SeasonHot>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.SeasonHot>>(
    '/api/hotspots' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveSeasonHot(params: API.SeasonHot): Promise<API.SeasonHot> {
  const { id, ...others } = params;
  const path = id ? `/api/hotspots/${id}` : '/api/hotspots';
  const result = await request<API.BaseResponse<API.Recommend>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function deleteSeasonHot(params: API.SeasonHot) {
  return await request(`/api/banners/${params.id}`, { method: 'DELETE' });
}
