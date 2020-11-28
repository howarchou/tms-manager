/**
 *  Created by pw on 2020/10/18 5:28 下午.
 */

import { request } from 'umi';
import { API } from '@/services/API';
import { GLOBAL_CONFIG } from '@/services/Constants';

export async function globalConfig(): Promise<API.ConfigValue> {
  const result = await request<API.BaseResponse<API.ConfigValue>>('/api/cache/settings');
  const config = result.payload;
  localStorage.setItem(GLOBAL_CONFIG, JSON.stringify(config));
  return config;
}
