import type { Effect, Reducer } from 'umi';

import { getDefaultValue } from '@/helpers';
import type { API } from '@/services/API';

export interface StateType {
  current?: string;
  step?: API.TeamBuildingNew;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    clearFormData: Reducer;
  };
}

const Model: ModelType = {
  namespace: 'addteambuilding',

  state: {
    current: 'basic',
    step: { ...(getDefaultValue() as any) },
  },

  effects: {
    *submitStepForm({ payload }, { put }) {
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },

    clearFormData(state) {
      return {
        ...state,
        step: {},
      };
    },
  },
};

export default Model;
