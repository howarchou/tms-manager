/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Space, Table } from 'antd';
import AddSeasonHotModal from './AddSeasonHotModal';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { getSeasonHots, saveSeasonHot, deleteSeasonHot } from '@/services/seasonHot';
import { uuid } from '@/helpers';
import { customSetting } from '../../../../config/defaultSettings';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.SeasonHot>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [editData, setEditData] = useState<API.SeasonHot>({} as API.SeasonHot);
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getSeasonHots(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '城市',
      key: 'province',
      dataIndex: 'province',
    },
    {
      title: '区域',
      key: 'area',
      dataIndex: 'area',
    },
    {
      title: '目的地',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '关键词',
      key: 'keywords',
      dataIndex: 'keywords',
    },
    {
      title: '封面',
      key: 'cover',
      dataIndex: 'cover',
      render: (text: string) => {
        const imgUrl = !!~text.indexOf(customSetting.globalFileUrl)
          ? text
          : `${customSetting.globalFileUrl}${text}`;
        return <img className={styles.home_banner_column_img} src={imgUrl} />;
      },
    },
    {
      title: '排序',
      key: 'sort',
      dataIndex: 'sort',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.SeasonHot) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.SeasonHot) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleState(record)}>
            {record.status === HomeBannerStatus.UP ? '下架' : '上架'}
          </a>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => handleDel(record)}
            okText="删除"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: API.SeasonHot) => {
    setEditData(record);
    setOpenModal(uuid(8));
  };

  const handleDel = async (record: API.SeasonHot) => {
    await deleteSeasonHot(record);
    await fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleState = async (record: API.SeasonHot) => {
    await saveSeasonHot({
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
          <AddSeasonHotModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
          rowKey={'id'}
          size="large"
          columns={columns}
          dataSource={data?.data}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: false,
            current: page,
            total: data?.total_count,
            showTotal:
              (total, range) => `第 ${range[0]}-${range[1]} 项, 共 ${total} 项`,
            onChange: handlePageChange,
          }}
        />
      </div>
    </PageContainer>
  );
}
