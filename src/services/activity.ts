/**
 *  Created by pw on 2020/10/11 4:55 下午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getActivities(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.TeamBuilding>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.TeamBuilding>>(
    '/api/activities' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}
