/**
 *  Created by pw on 2020/10/24 12:52 下午.
 */
import moment from 'moment';
import { API } from '@/services/API';

export function detailMapper(order: API.Order) {}

export function detailDefaultValues(data?: API.Order) {
  return {
    status: data?.status || 1,
    area: data?.area || 110101,
    start_date: data?.start_date ? moment(data.start_date) : moment(),
    source: data?.source || 1,
  };
}

interface DetailDescribeIF {
  key: string;
  label: string;
  type?: string; // 默认是text
  union?: string[]; // 联合的key
}

export function detailDescribe(): DetailDescribeIF[] {
  return [
    { key: 'order_no', label: '订单ID' },
    { key: 'status', label: '订单状态' },
    { key: 'uncompleted_reason', label: '未成单原因' },
    { key: 'name', label: '订单名称' },
    { key: 'price', label: '订单金额' },
    { key: 'area', label: '活动地区' },
    { key: 'address', label: '详细地址' },
    { key: 'start_date', label: '活动起始时间' },
    { key: 'days', label: '活动天数' },
    { key: 'planner', label: '活动策划师' },
    { key: 'description', label: '活动描述' },
    { key: 'company', label: '客户公司' },
    { key: 'people_number', label: '团建人数' },
    { key: 'contact', label: '客户联系人' },
    { key: 'contact_mobile', label: '客户电话' },
    { key: 'from_area_name', label: '客户来访地区' },
    { key: 'source', label: '来源' },
    { key: 'remark', label: '备注' },
  ];
}
