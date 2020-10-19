/**
 *  Created by pw on 2020/10/11 4:55 下午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getActivities(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.TeamBuildingNew>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.TeamBuildingNew>>(
    '/api/activities' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveActivitying(params: API.TeamBuildingNew) {
  const { id, ...others } = params;
  const path = id ? `/api/activities/${id}` : '/api/activities';
  const result = await request<API.BaseResponse<API.TeamBuildingNew>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function getActivityDetail(id: string): Promise<API.TeamBuildingNew> {
  const restult = await request<API.BaseResponse<API.TeamBuildingNew>>(`/api/activities/${id}`, {
    method: 'GET',
  });
  return restult.payload;
}
