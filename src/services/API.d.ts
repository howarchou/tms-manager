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
    ID: string;
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
    ID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
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
}
