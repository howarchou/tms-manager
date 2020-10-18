/**
 *  Created by pw on 2020/9/2 10:28 下午.
 */
import { request } from 'umi';
import { API } from '@/services/API';

export async function addAccount(params: API.AddAccount) {
  return request('/api/login/outLogin');
}

export async function getAccounts() {}
