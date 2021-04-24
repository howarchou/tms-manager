/**
 *  Created by pw on 2020/10/18 12:51 下午.
 */
import { GLOBAL_CONFIG } from '@/services/Constants';
import { API } from '@/services/API';
import DB_ICON from '@/assets/schedule/大巴车.png';
import JD_ICON from '@/assets/schedule/景点.png';
import TZHD_ICON from '@/assets/schedule/拓展活动.png';
import XX_ICON from '@/assets/schedule/休息.png';
import YC_ICON from '@/assets/schedule/用餐.png';

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

export function tagsConfig(): API.BaseConfig[] {
  return getCookieValueByKey('activity_tags');
}

export function caseCityConfig(): API.BaseConfig[] {
  return getCookieValueByKey('case_city');
}

export function starConfig(): any[] {
  return getCookieValueByKey('activity_star');
}

export function scheduleIconConfig(): any[] {
  return [
    { icon: DB_ICON, text: '大巴车', value: 1 },
    { icon: JD_ICON, text: '景点', value: 2 },
    { icon: TZHD_ICON, text: '拓展活动', value: 3 },
    { icon: XX_ICON, text: '休息', value: 4 },
    { icon: YC_ICON, text: '用餐', value: 5 },
  ];
}

export function typeIconConfig(): any[] {
  return getCookieValueByKey('activity_type_icon');
}

export function activityTypeConfig(): any[] {
  return getCookieValueByKey('activity_type');
}

export function orderSourceConfig(): any[] {
  return getCookieValueByKey('order_source');
}

export function orderStatusConfig(): any[] {
  return getCookieValueByKey('order_status');
}

export function getDefaultValue(data?: API.TeamBuildingNew): API.TeamBuildingNew {
  return {
    area: data?.area || 110101,
    method: data?.method || 1,
    profit: data?.profit || 1,
    duration: data?.duration || 1,
    people_number: data?.people_number || 1,
    sort: data?.sort || 0,
    type: data?.type || undefined,
  } as API.TeamBuildingNew;
}

function getCookieValueByKey(key: string): API.BaseConfig[] {
  const result = JSON.parse(localStorage.getItem(GLOBAL_CONFIG) || '') as API.ConfigValue;
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
