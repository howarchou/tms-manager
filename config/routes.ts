/**
 *  Creat
 *  ed by pw on 2020/8/29 4:34 下午.
 */
// umi routes: https://umijs.org/docs/routing
import { IRoute } from '@umijs/core';

const routes: IRoute[] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'register',
        path: '/user/registered',
        component: './user/Registered',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'order.manage',
    icon: 'icon-dingdan1',
    path: '/order',
    routes: [
      {
        path: '/order/list',
        name: 'list',
        icon: 'smile',
        component: './order-manage',
      },
      {
        path: '/order/add',
        component: './order-manage/AddOrder',
      },
      {
        path: '/order/detail',
        component: './order-manage/Detail',
      },
    ],
  },
  {
    name: 'bill.manage',
    icon: 'icon-zhangdan1',
    path: '/bill',
    routes: [
      {
        path: '/bill/list',
        name: 'list',
        icon: 'smile',
        component: './bill-manage/BillList',
      },
      {
        path: '/bill/settlement',
        name: 'settlement',
        icon: 'smile',
        component: './bill-manage/Settlement',
      },
    ],
  },
  {
    name: 'clue.manage',
    icon: 'icon-xiansuo',
    path: '/clue',
    routes: [
      {
        path: '/clue/order',
        name: 'order',
        icon: 'smile',
        component: './clue-manage/OrderClue',
      },
      {
        path: '/clue/supplier',
        name: 'supplier',
        icon: 'smile',
        component: './clue-manage/SupplierClue',
      },
    ],
  },
  {
    name: 'operation.manage',
    icon: 'icon-yunying1',
    path: '/operation',
    routes: [
      {
        path: '/operation/banner',
        name: 'banner',
        icon: 'smile',
        component: './operation-manage/HomeBanner',
      },
      // {
      //   path: '/operation/type',
      //   name: 'type',
      //   icon: 'smile',
      //   component: './operation-manage/Type',
      // },
      {
        path: '/operation/homeCategory',
        name: 'homeCategory',
        icon: 'smile',
        component: './operation-manage/HomeCategory',
      },
      {
        path: '/operation/seasonhot',
        name: 'seasonhot',
        icon: 'smile',
        component: './operation-manage/SeasonHot',
      },
      {
        path: '/operation/case/list',
        name: 'case.list',
        icon: 'smile',
        component: './operation-manage/Case',
      },
      {
        path: '/operation/edit-case',
        component: './operation-manage/Case/EditCase',
      },
      {
        path: '/operation/photo-wall',
        name: 'photo-wall',
        icon: 'smile',
        component: './operation-manage/PhotoWall',
      },
    ],
  },
  {
    name: 'supplier.manage',
    icon: 'icon-gongyingshang',
    path: '/supplier',
    routes: [
      {
        path: '/supplier/partner',
        name: 'partner',
        icon: 'smile',
        component: './supplier-manage/PartnerList',
      },
      {
        path: '/supplier/partner-detail',
        component: './supplier-manage/PartnerDetail',
      },
      {
        path: '/supplier/list',
        name: 'list',
        icon: 'smile',
        component: './supplier-manage/SupplierList',
      },
    ],
  },
  {
    name: 'team-building.manage',
    icon: 'icon-tuanjianhuodong',
    path: '/team-building',
    routes: [
      {
        path: '/team-building/list',
        name: 'list',
        icon: 'smile',
        component: './team-building-manage/TeamBuildingList',
      },
      {
        path: '/team-building/add',
        icon: 'smile',
        component: './team-building-manage/AddTeambuilding',
      },
      {
        path: '/team-building/detail',
        icon: 'smile',
        component: './team-building-manage/detail',
      },
    ],
  },
  {
    name: 'materials.manage',
    icon: 'icon-wuliao',
    path: '/materials',
    routes: [
      {
        path: '/materials/photo',
        name: 'photo',
        icon: 'smile',
        component: './materials-manage/PhotoManage',
      },
    ],
  },
  {
    name: 'account.manage',
    icon: 'icon-account',
    path: '/account',
    routes: [
      {
        path: '/account/list',
        name: 'list',
        icon: 'TeamOutlined',
        component: './account-manage/AccountList/index',
      },
      {
        path: '/account/auth',
        name: 'auth',
        icon: 'TeamOutlined',
        component: './account-manage/AuthManage',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

export default routes;
