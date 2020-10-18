import { HomeBannerStatus } from '@/services/API.Enum';

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

  export interface AddAccount {
    email: string;
    phone: string;
    name: string;
    password: string;
    role: 'admin' | 'user';
  }

  export interface TeamBuilding {
    id: string;
    name: string;
    playType: string;
    price: string;
    capacity: string;
    cycle: string;
    area: string;
    display: string;
  }

  export interface TeamBuildingNew {
    id?: string;
    address: string;
    area: string;
    booking_notes?: string;
    cost_statement?: string;
    cover: string;
    description: string;
    duration: number; // 团建天数
    hold_max: number; // 容纳人数(最大)
    hold_min: number; // 容纳人数(最小)
    method: number; //玩法
    name: string;
    planner: string; //团建策划师
    price: number; //人均消费(单位分)
    profit: string; //收益
    schedule: string; // 行程安排
    stars: string; //推荐指数
    tags: string; //标签，多个以空格分隔
    warm_tips: string; //温馨提示
  }

  export interface TeamBuildingPlan {
    id: string;
    day: number;
    time: number;
    supplier: string;
    supplierProject: string;
  }

  export interface HomeBanner {
    id: string;
    name: string;
    link: string;
    sort: number;
    status: HomeBannerStatus;
    cover: string;
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
    link: string;
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
}
