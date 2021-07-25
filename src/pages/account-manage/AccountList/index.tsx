import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';
import { Table, Tag, Space, Popconfirm } from 'antd';
import AddModal from './AddModal';
import type { API } from '@/services/API';
import { deleteAccount, getAccounts } from '@/services/account';
import { deleteActivity } from '@/services/activity';
import { uuid } from '../../../helpers/uuid';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default () => {
  const [editData, setEditData] = useState<API.Account>({} as API.Account);
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [data, setData] = useState<API.ListResponsePayload<API.Account>>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const handleAdd = (values: API.Account, isAdd: boolean) => {
    if (isAdd) {
      fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
    } else {
      // const findIndex = data.findIndex((record) => record.phone === values.phone);
      // data[findIndex] = values;
      // setData(data.slice());
    }
  };

  const handleEdit = (record: API.Account) => {
    setEditData(record);
    setVisible(true);
  };

  const handleDel = async (record: API.Account) => {
    await deleteAccount(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePageChange = (page: number) => {
    setPage(page);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const fetchData = (params: API.ListParam) => {
    getAccounts(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    // {
    //   title: '角色',
    //   key: 'role',
    //   dataIndex: 'role',
    //   render: (tag: string) => <Tag color="green">{tag.toUpperCase()}</Tag>,
    // },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size='middle'>
          <a onClick={() => handleEdit(record)}>修改密码</a>
          <Popconfirm
            title='确认删除?'
            onConfirm={() => handleDel(record)}
            okText='删除'
            cancelText='取消'
          >
            <a>删除</a>
          </Popconfirm>
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
        <Table columns={columns} dataSource={data?.data}
               pagination={{
                 hideOnSinglePage: true,
                 showSizeChanger: false,
                 current: page,
                 total: data?.total_count,
                 showTotal:
                   (total, range) => `第 ${range[0]}-${range[1]} 项, 共 ${total} 项`,
                 onChange: handlePageChange,
               }} />
      </div>
    </PageContainer>
  );
};
