import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';
import { getActivityDetail } from '@/services/activity';
import { Dispatch } from '@@/plugin-dva/connect';

const { Step } = Steps;

interface AddteambuildingProps {
  current: StateType['current'];
  location?: any;
  dispatch?: Dispatch;
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 1, component: <Step2 /> };
    case 'result':
      return { step: 2, component: <Step3 /> };
    case 'info':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const Addteambuilding: React.FC<AddteambuildingProps> = ({ current, location, dispatch }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const id = location?.query?.id;

  useEffect(() => {
    if (id) {
      getActivityDetail(id).then((data) => {
        if (dispatch) {
          dispatch({
            type: 'addteambuilding/saveStepFormData',
            payload: data,
          });
        }
      });
    }
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  return (
    <PageContainer>
      <Card bordered={false}>
        <div className={styles.pageConntaier}>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="基本信息" />
            <Step title="制定方案" />
            <Step title="完成" />
          </Steps>
          {stepComponent}
        </div>
      </Card>
    </PageContainer>
  );
};

export default connect(({ addteambuilding }: { addteambuilding: StateType }) => ({
  current: addteambuilding.current,
}))(Addteambuilding);
