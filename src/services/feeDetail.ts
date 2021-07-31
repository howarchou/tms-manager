/**
 *  Created by pw on 2020/10/24 3:43 下午.
 */
import type { API } from '@/services/API';
import { request } from '@@/plugin-request/request';

export interface FeeDetailSaveIF {
  activity_id: string;
  fees: API.FeeDetail[];
}

export async function getFeeDetails(
  type: string,
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.Order>> {
  const { page_no = 1, page_size = 10 } = params;
  const path = `/api/fees/${type}`;
  const result = await request<API.ListResponse<API.Order>>(
    path + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveFeeDetail(type: string = 'order', data: FeeDetailSaveIF) {
  const path = `/api/fees/${type}`;
  const result = await request<API.BaseResponse<API.Order>>(path, {
    method: 'POST',
    data,
  });
  return result.payload;
}

export async function getFeeDetail(id: string, type: string): Promise<API.FeeDetail[]> {
  const path = `/api/fees/${type}/${id}`;
  const restult = await request<any>(path, {
    method: 'GET',
  });
  return restult.payload as API.FeeDetail[];
}
