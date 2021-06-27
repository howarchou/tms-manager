/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Space, Table } from 'antd';
import { HomeBannerStatus, OrderType } from '@/services/API.Enum';
import type { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { saveRecommend, deleteRecommend, getTypes } from '@/services/recommend';
import { uuid } from '@/helpers';
import moment from 'moment';
import AddTypeModal from './AddTypeModal';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.Type>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [editData, setEditData] = useState<API.Type>({} as API.Type);
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getTypes(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '城市',
      dataIndex: 'province',
      key: 'province',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '图标(未选择)',
      dataIndex: 'icon_unselect',
      key: 'icon_unselect',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '图标(大)',
      dataIndex: 'icon_large',
      key: 'icon_large',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true
    },
    {
      title: '首页显示?',
      key: 'is_top',
      dataIndex: 'is_top',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      fixed: 'right',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleDetail(record)}>查看</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: API.SeasonHot) => {
    setEditData(record);
    setOpenModal(uuid(8));
  };

  const handleDel = async (record: API.SeasonHot) => {
    await deleteRecommend(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleState = async (record: API.SeasonHot) => {
    await saveRecommend({
      ...record,
      status: record.status === HomeBannerStatus.DOWN ? HomeBannerStatus.UP : HomeBannerStatus.DOWN,
    });
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handAddResult = (banner: API.SeasonHot) => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  return (
    <PageContainer>
      <div className={styles.home_banner}>
        <div className={styles.home_banner_add}>
          <AddTypeModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
          size="large"
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.total_count, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
}
