/**
 *  Created by pw on 2020/10/18 12:51 下午.
 */
import Cookies from 'js-cookie';
import { GLOBAL_CONFIG } from '@/services/Constants';
import { API } from '@/services/API';
interface AreaIF {
  value: number;
  text: string;
}

export function areaConfig(): API.BaseConfig[] {
  return getCookieValueByKey('activity_area');
}

export function methodConfig(): API.BaseConfig[] {
  return getCookieValueByKey('activity_method');
}

export function profitConfig(): API.BaseConfig[] {
  return getCookieValueByKey('activity_profit');
}

export function durationConfig(): API.BaseConfig[] {
  return getCookieValueByKey('activity_duration');
}

export function getDefaultValue(data?: API.TeamBuildingNew): API.TeamBuildingNew {
  return {
    area: data?.area || 1,
    method: data?.method || 1,
    profit: data?.profit || 1,
    duration: data?.duration || 1,
  } as API.TeamBuildingNew;
}

function getCookieValueByKey(key: string): API.BaseConfig[] {
  const result = Cookies.getJSON(GLOBAL_CONFIG) as API.ConfigValue;
  return result[key] || [];
}

interface DetailDescribeIF {
  key: string;
  label: string;
  type?: string; // 默认是text
  union?: string[]; // 联合的key
}

export function detailDescribe(): DetailDescribeIF[] {
  return [
    { key: 'series_number', label: 'ID' },
    { key: 'name', label: '订单名称' },
    { key: 'area', label: '活动地区' },
    { key: 'address', label: '详细地址' },
    { key: 'method', label: '团建玩法' },
    { key: 'profit', label: '团建收益' },
    { key: 'hold_people', label: '容纳人数', type: 'complex', union: ['hold_min', 'hold_max'] },
    { key: 'price', label: '人均消费' },
    { key: 'planner', label: '团建策划师' },
    { key: 'mobile', label: '策划师电话' },
    { key: 'description', label: '活动描述' },
    { key: 'tags', label: '标签' },
    { key: 'cover', label: '封面图', type: 'attachment' },
    { key: 'booking_notes', label: '预定须知' },
    { key: 'warm_tips', label: '温馨提示' },
    { key: 'stars', label: '推荐指数', type: 'stars' },
  ];
}
