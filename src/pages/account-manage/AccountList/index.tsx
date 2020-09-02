import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { Table, Tag, Space } from 'antd';
import AddModal from './AddModal';

export default () => {
  const [data, setData] = useState<API.AddAccount[]>([]);
  const [editData, setEditData] = useState<API.AddAccount>({} as API.AddAccount);
  const [visible, setVisible] = useState(false);

  const handleAdd = (values: API.AddAccount, isAdd: boolean) => {
    if (isAdd) {
      setData(data.concat(values));
    } else {
      const findIndex = data.findIndex((record) => record.phone === values.phone);
      data[findIndex] = values;
      setData(data.slice());
    }
  };

  const handleEdit = (record: API.AddAccount) => {
    setEditData(record);
    setVisible(true);
  };

  const handleDel = (record: API.AddAccount) => {
    setData(data.filter((line) => line.phone !== record.phone));
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role',
      render: (tag: string) => <Tag color="green">{tag.toUpperCase()}</Tag>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDel(record)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <div className={styles.main}>
        <div className={styles.table_header}>
          <AddModal onAdd={handleAdd} data={editData} visibleModal={visible} />
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </PageContainer>
  );
};
