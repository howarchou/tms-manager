/**
 *  Created by pw on 2020/9/2 9:34 下午.
 */
import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

const CreateModal: React.FC<ModalProps> = (props) => {
  return <Modal {...props}>{props.children}</Modal>;
};

export default CreateModal;
