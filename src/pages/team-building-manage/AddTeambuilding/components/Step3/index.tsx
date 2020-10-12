import { Button, Result } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from '../../model';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
}

const Step3: React.FC<Step3Props> = (props) => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再增一笔团建
      </Button>
    </>
  );
  return <Result status="success" title="添加成功" extra={extra} className={styles.result} />;
};

export default connect(({ addteambuilding }: { addteambuilding: StateType }) => ({
  data: addteambuilding.step,
}))(Step3);
