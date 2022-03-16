import { request } from 'umi';
import type { API } from '@/services/API';
export type QueryPartnerParamer = {
  page_no: number;
  page_size: number;
}
export async function queryPartners(params: QueryPartnerParamer) {
  const res = await request<API.ListResponse<API.Partner[]>>('/api/partners', params)
  return res.payload
}

export async function getPartner(id?: string) {
  const { payload } = await request<API.BaseResponse<API.Partner>>(`/api/partner/${id}`);
  return payload
}
