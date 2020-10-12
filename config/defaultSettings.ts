import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '团建系统',
  pwa: false,
  logo: 'http://yytms.cicisoft.cn/asset/logo/logo.png',
  iconfontUrl: '//at.alicdn.com/t/font_2063097_wevr4bi17f.js',
} as LayoutSettings & {
  pwa: boolean;
};

export const customSetting = {
  globalFileUrl: 'http://yytms.cicisoft.cn/',
};
