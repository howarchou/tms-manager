/**
 *  Created by pw on 2020/9/2 10:28 下午.
 */
import { request } from 'umi';

export async function addAccount(params: API.AddAccount) {
  return request('/api/login/outLogin');
}

export async function getAccounts() {}
