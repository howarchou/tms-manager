import { request } from 'umi';
import { API } from '@/services/API';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent(id?: string) {
  const { payload, status } = await request<API.LoginResponse>(`/api/users/${id}`);
  return status === 0 ? converToUser(payload as API.LoginData) : undefined;
}

function converToUser(payload: API.LoginData): API.CurrentUser {
  return {
    userid: payload.id,
    id: payload.id,
    name: payload.name,
    email: payload.email,
    mobile: payload.mobile,
  };
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
