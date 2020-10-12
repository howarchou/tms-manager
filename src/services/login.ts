import { request } from 'umi';
import { API } from '@/services/API';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
}

export async function fakeAccountLogin(params: LoginParamsType): Promise<API.LoginResponse> {
  const { username: user_name, password } = params;
  const response = await request('/api/login', {
    method: 'POST',
    data: { user_name, password },
  });
  // status 为0 登录成功
  return { ...response, status: response.status === 0 ? 'ok' : 'error', type: params.type };
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
