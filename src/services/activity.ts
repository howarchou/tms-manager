/**
 *  Created by pw on 2020/10/11 4:55 下午.
 */
import { request } from 'umi';
import type { API } from '@/services/API';

export async function getActivities(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.TeamBuildingNew>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.TeamBuildingNew>>(
    `/api/activities?page_no=${page_no}&page_size=${page_size}&area=${params.area}&name=${params.name}`,
  );
  return result.payload;
}

export async function saveActivity(params: API.TeamBuildingNew) {
  const { id, ...others } = params;
  const path = id ? `/api/activities/${id}` : '/api/activities';
  const result = await request<API.BaseResponse<API.TeamBuildingNew>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function updateActivityState(id: number, state: boolean) {
  const path = state ? `/api/activities/${id}/enable` : `/api/activities/${id}/disable`;
  return request(path, { method: 'PUT' });
}

export async function getActivityDetail(id: string): Promise<API.TeamBuildingNew> {
  const result = await request<API.BaseResponse<API.TeamBuildingNew>>(`/api/activities/${id}`, {
    method: 'GET',
  });
  return result.payload;
}

export async function deleteActivity(params: API.TeamBuildingNew) {
  return await request(`/api/activities/${params.id}`, { method: 'DELETE' });
}
