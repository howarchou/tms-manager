/**
 *  Created by pw on 2020/11/16 10:25 下午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function getCases(params: API.ListParam): Promise<API.ListResponsePayload<API.Case>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.Case>>(
    '/api/cases' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveCase(params: API.Case): Promise<API.Case> {
  const { id, ...others } = params;
  const path = id ? `/api/cases/${id}` : '/api/cases';
  const result = await request<API.BaseResponse<API.Case>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function deleteCase(params: API.Case) {
  return await request(`/api/cases/${params.id}`, { method: 'DELETE' });
}

export async function getCaseById(id: string): Promise<API.Case> {
  const result = await request<API.BaseResponse<API.Case>>('/api/cases/' + `${id}`);
  return result.payload;
}
