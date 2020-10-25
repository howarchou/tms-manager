import { API } from '@/services/API';
import { request } from '@@/plugin-request/request';

/**
 *  Created by pw on 2020/10/24 11:41 上午.
 */
export async function getOrders(
  params: API.ListParam,
): Promise<API.ListResponsePayload<API.Order>> {
  const { page_no = 1, page_size = 10 } = params;
  const result = await request<API.ListResponse<API.Order>>(
    '/api/orders' + `?page_no=${page_no}&page_size=${page_size}`,
  );
  return result.payload;
}

export async function saveOrder(params: API.Order) {
  const { id, ...others } = params;
  const path = id ? `/api/orders/${id}` : '/api/orders';
  const result = await request<API.BaseResponse<API.Order>>(path, {
    method: id ? 'PUT' : 'POST',
    data: others,
  });
  return result.payload;
}

export async function getOrderDetail(id: string): Promise<API.Order> {
  const restult = await request<API.BaseResponse<API.Order>>(`/api/orders/${id}`, {
    method: 'GET',
  });
  return restult.payload;
}
