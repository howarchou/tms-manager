/**
 *  Created by pw on 2020/11/23 11:12 下午.
 */
export function preview(pathname: string) {
  const w: any = window.open('about:blank');
  w.location.href = `${window.location.protocol}//pre.yuyuetuanjian.cn/${pathname}`;
  // w.location.href = `http://127.0.0.1:6677/${pathname}`;
}
