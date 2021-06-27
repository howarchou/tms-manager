/**
 *  Created by pw on 2020/9/2 10:28 下午.
 */
import { request } from 'umi';
import type { API } from '@/services/API';

export async function saveAccount(param: API.Account) {
  const { id, ...others } = param;
  const path = id ? `/api/users/${id}` : '/api/users';
  const result = await request<API.BaseResponse<API.Account>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function getAccounts(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.Account>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.Account>>(
    `/api/users?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function deleteAccount(param: API.Account) {
  return await request(`/api/users/${param.id}`, { method: 'DELETE' });
}
