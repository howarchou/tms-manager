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
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    name: 'order.manage',
    icon: 'table',
    path: '/order',
    routes: [
      {
        path: '/order/list',
        name: 'list',
        icon: 'smile',
        component: './order-manage',
      },
    ],
  },
  {
    name: 'bill.manage',
    icon: 'table',
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
    icon: 'table',
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
    icon: 'table',
    path: '/operation',
    routes: [
      {
        path: '/operation/banner',
        name: 'banner',
        icon: 'smile',
        component: './operation-manage/HomeBanner',
      },
      {
        path: '/operation/recommend',
        name: 'recommend',
        icon: 'smile',
        component: './operation-manage/RecommendCategory',
      },
      {
        path: '/operation/seasonhot',
        name: 'seasonhot',
        icon: 'smile',
        component: './operation-manage/SeasonHot',
      },
      {
        path: '/operation/customer-case',
        name: 'customer-case',
        icon: 'smile',
        component: './operation-manage/CustomerCase',
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
    icon: 'table',
    path: '/supplier',
    routes: [
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
    icon: 'table',
    path: '/team-building',
    routes: [
      {
        path: '/team-building/list',
        name: 'list',
        icon: 'smile',
        component: './team-building-manage/TeamBuildingList',
      },
    ],
  },
  {
    name: 'materials.manage',
    icon: 'table',
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
    icon: 'table',
    path: '/account',
    routes: [
      {
        path: '/account/list',
        name: 'list',
        icon: 'TeamOutlined',
        component: './account-manage/AccountList',
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
