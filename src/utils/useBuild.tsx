import type { API } from "@/services/API"
import type { FormInstance } from "antd/lib/form/hooks/useForm"
import { Button, message, Popconfirm } from "antd"
import React from "react"
import { saveActivity } from "@/services/activity"
import { history } from "@@/core/history"
import type { Dispatch } from "@@/plugin-dva/connect"

export const useBuild = ( data: API.TeamBuildingNew, form: FormInstance, dispatch?: Dispatch, submitting?: boolean ) => {

  const handleSaveCache = () => {
    const buildInfo = { ...data, ...form.getFieldsValue() }
    delete buildInfo.created_at
    delete buildInfo.updated_at
    delete buildInfo.deleted_at
    delete buildInfo.id
    localStorage.setItem('tms_build_info', JSON.stringify(buildInfo))
    message.success('缓存成功');
  }
  const handleAllSubmit = async () => {
    if (!dispatch) return
    const values = await form.validateFields()
    // const values = await getFieldsValue();
    dispatch({
      type: 'addteambuilding/saveStepFormData',
      payload: values,
    })
    dispatch({
      type: 'addteambuilding/saveCurrentStep',
      payload: {},
    })

    if (data?.id === undefined || data?.id === 0) {
      data.status = 0
    }
    const params: any = {
      ...data,
      ...values,
    }
    const result = await saveActivity(params)
    if (result) {
      history.push({
        pathname: '/team-building/list',
      })
      // onFinish()
      if (dispatch) {
        dispatch({
          type: 'addteambuilding/saveStepFormData',
          payload: {},
        })
        dispatch({
          type: 'addteambuilding/saveCurrentStep',
          payload: 'notice',
        })
      }
    }
  }
  const SaveCacheButton = <Button onClick={ handleSaveCache }
    danger
    style={ { marginRight: 8 } }>
    草稿
  </Button>
  const SubmitButton = <Popconfirm title="确定取消?"
    onConfirm={ handleAllSubmit }
    okText="确定"
    cancelText="取消">
    <Button loading={ submitting }
      danger
      type="primary"
      style={ { marginRight: 8 } }>
      提交保存
    </Button></Popconfirm>
  return [ SaveCacheButton, SubmitButton ]

}
