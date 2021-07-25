import { HomeBannerStatus } from '@/services/API.Enum';
import { FormInstance } from 'antd/es/form';

declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
    email?: string;
    mobile?: string;
    id: string;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export type LoginType = 'ok' | 'error' | number;
  export interface LoginResponse {
    status?: LoginType;
    type?: string;
    payload: LoginData;
  }

  export interface LoginData {
    id: string;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    name: string;
    email: string;
    mobile: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  export interface Account {
    id?: number;
    email: string;
    mobile: string;
    name: string;
    password: string;
    role: 'admin' | 'user';
  }

  export interface TeamBuilding {
    id: string;
    name: string;
    playType: string;
    price: number;
    capacity: string;
    cycle: string;
    area: number;
    display: string;
  }

  export interface TeamBuildingNew {
    avatar?: string;
    id?: number;
    encode_id?: string;
    series_number?: number;
    address: string;
    area: number;
    booking_notes?: string;
    cost_statement?: string;
    safety_notes?: string;
    cover: string;
    description: string;
    duration: number; // 团建天数
    sort: number; // 排序
    type?: number; // 类别
    status?: number; // 状态(0 下架; 1 上架）
    people_number: number; // 团建人数
    hold_max: number; // 容纳人数(最大)
    hold_min: number; // 容纳人数(最小)
    method: number; // 玩法
    name: string; // 团建名称
    planner: string; // 团建策划师
    price: number; // 人均消费(单位分)
    profit: number; // 收益
    schedule: TeamBuilding_Schedules; // 行程安排
    fee: FeeDetail; // 费用明细
    stars: string; // 推荐指数
    tags: string; // 标签，多个以空格分隔
    warm_tips: string; // 温馨提示
    mobile: string;
    place?: TeamBuilding_Place;
    feature?: TeamBuilding_Feature;
  }

  // interface TeamBuilding_Schedules {
  //   activity_id: string;
  //   sections: TeamBuilding_Schedule_Section[];
  // }

  interface TeamBuilding_Schedules {
    title: string;
    sub_title: string;
    date: number;
    icon: number;
    items: TeamBuilding_Schedule_Item[];
  }

  interface TeamBuilding_Schedule_Item {
    day: number;
    time: number;
    supplier: number;
    supplierProject: number;
  }

  export interface TeamBuilding_Place {
    pictures: string[];
    description: string;
  }

  export interface TeamBuilding_Feature {
    picture?: string;
    description?: string;
  }

  export interface TeamBuildingPlan {
    id: string;
    day: number;
    time: number;
    supplier: string;
    supplierProject: string;
    form?: FormInstance;
  }

  export interface HomeBanner {
    id: string;
    name: string;
    link: string;
    sort: number;
    status: HomeBannerStatus;
    cover: string;
  }

  export interface Type {
    id: number;
    province: number;
    name: string;
    icon: string;
    iconUnselect: string;
    iconLarge: string;
    sort: number;
    isTop: number;
  }

  export interface BaseResponse<T> {
    message: string;
    payload: T;
  }

  export interface ListResponse<T> {
    message: string;
    payload: ListResponsePayload<T>;
  }

  export interface ListResponsePayload<T> {
    data: T[];
    page_no: number;
    page_size: number;
    total_count: number;
    total_page: number;
  }

  export interface ListParam {
    page_no: number;
    page_size: number;
    area?: number;
    name?: string;
  }

  export interface Recommend {
    id: string;
    name: string;
    link: string;
    sort: number;
    status: HomeBannerStatus;
    cover: string;
  }

  export interface SeasonHot {
    id: string;
    name: string;
    keywords: string;
    area: string;
    sort: number;
    status: HomeBannerStatus;
    cover: string;
  }

  export interface PhotoWall {
    id: string;
    link: string;
    sort: number;
    status: HomeBannerStatus;
    cover: string;
    name?: string;
  }

  export interface ConfigValue {
    [key: string]: BaseConfig[];
  }

  export interface BaseConfig {
    value: string;
    text: string;
    items?: BaseConfig[];
  }

  export interface Order {
    id?: string;
    order_no: string;
    name: string;
    amount: number;
    area: number;
    address: string;
    start_date: number;
    days: number;
    price: number;
    planner: string;
    planner_mobile: string;
    company: string;
    contact: string;
    contact_mobile: string;
    status: number;
    remark: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    source: number;
  }

  export interface FeeDetail {
    cost_price: number;
    days: number;
    intro: string;
    name: string;
    num: number;
    price: number;
    total_price: number;
  }

  export interface Case {
    id?: string;
    encode_id?: string;
    activity_id?: number;
    address: string;
    banners?: string[];
    city: integer;
    cover: string;
    date: number;
    days: string;
    distance: string;
    logo: string;
    name: string;
    people: string;
    photos?: string[];
    schedule?: Case_Schedule[];
    sort: number;
    title: string;
    status: HomeBannerStatus;
    activity?: TeamBuildingNew;
  }

  export interface Case_Schedule {
    day: number;
    items: Case_Schedule_Item[];
  }

  export interface Case_Schedule_Item {
    time: number;
    text: string;
  }

  export interface Home_Category {
    id?: number;
    province?: string;
    type_icon: string;
    type_name: string;
    type_id: number;
    activity_id: number;
    status: HomeBannerStatus;
    sort: number;
    activity?: API.TeamBuildingNew;
  }
}
