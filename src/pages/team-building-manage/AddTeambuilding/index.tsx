import React, { useState, useEffect } from 'react';
import { Card, Steps } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import styles from './style.less';
import { getActivityDetail } from '@/services/activity';
import type { Dispatch } from '@@/plugin-dva/connect';
import { history } from 'umi';
import HeaderBack from '@/components/HeaderBack';

const { Step } = Steps;

interface AddTeamBuildingProps {
  current: StateType['current'];
  location?: any;
  dispatch?: Dispatch;
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'place':
      return { step: 1, component: <Step2 /> };
    case 'schedule':
      return { step: 2, component: <Step3 /> };
    case 'fee':
      return { step: 3, component: <Step4 /> };
    case 'notice':
      return { step: 4, component: <Step5 /> };
    case 'basic':
    default:
      return { step: 0, component: <Step1 /> };
  }
};

const AddTeamBuilding: React.FC<AddTeamBuildingProps> = ({ current, location  }) => {
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const id = location?.query?.id;

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  const handleLeftClick = () => {
    history.push({
      pathname: '/team-building/list',
    });
  };

  return (
    <PageContainer
      title={<HeaderBack title={id ? '编辑团建' : '添加团建'} onBackClick={handleLeftClick} />}
    >
      <Card bordered={false}>
        <div className={styles.pageContainer}>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="团建" />
            <Step title="场地" />
            <Step title="行程" />
            <Step title="费用" />
            <Step title="须知" />
          </Steps>
          {stepComponent}
        </div>
      </Card>
    </PageContainer>
  );
};

const AddTeamBuildingWrapper = (props: any) => {
  const { dispatch, location } = props;
  const id = location?.query?.id;
  useEffect(() => {
    if (id) {
      getActivityDetail(id).then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleUpdateData(data);
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleUpdateData(undefined, true);
    }
  }, [id]);

  const handleUpdateData = (data: any, clear: boolean = false) => {
    if (dispatch) {
      const action = clear ? 'clearFormData' : 'saveStepFormData';
      dispatch({
        type: `addteambuilding/${action}`,
        payload: data,
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  return <AddTeamBuilding {...props} />;
};

export default connect(({ addteambuilding }: { addteambuilding: StateType }) => ({
  current: addteambuilding.current,
}))(AddTeamBuildingWrapper);
