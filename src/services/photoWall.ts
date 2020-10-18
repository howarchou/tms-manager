/**
 *  Created by pw on 2020/10/11 10:34 上午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getPhotoWalls(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.PhotoWall>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.PhotoWall>>(
    '/api/logos' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function savePhotoWall(params: API.PhotoWall): Promise<API.PhotoWall> {
  const { id, ...others } = params;
  const path = id ? `/api/logos/${id}` : '/api/logos';
  const result = await request<API.BaseResponse<API.PhotoWall>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function deletePhotoWall(params: API.PhotoWall) {
  return await request(`/api/banners/${params.id}`, { method: 'DELETE' });
}
