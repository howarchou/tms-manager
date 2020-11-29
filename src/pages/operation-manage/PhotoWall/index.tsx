/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Space, Table } from 'antd';
import AddPhotoMallModal from './AddPhotoMallModal';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { getPhotoWalls, savePhotoWall, deletePhotoWall } from '@/services/photoWall';
import { uuid } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.PhotoWall>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [editData, setEditData] = useState<API.PhotoWall>({} as API.PhotoWall);
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getPhotoWalls(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '图片',
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
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.PhotoWall) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.PhotoWall) => (
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

  const handleEdit = (record: API.PhotoWall) => {
    setEditData(record);
    setOpenModal(uuid(8));
  };

  const handleDel = async (record: API.PhotoWall) => {
    await deletePhotoWall(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleState = async (record: API.PhotoWall) => {
    await savePhotoWall({
      ...record,
      status: record.status === HomeBannerStatus.DOWN ? HomeBannerStatus.UP : HomeBannerStatus.DOWN,
    });
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handAddResult = (banner: API.PhotoWall) => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
  };

  return (
    <PageContainer>
      <div className={styles.home_banner}>
        <div className={styles.home_banner_add}>
          <AddPhotoMallModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
          size="large"
          rowKey={'id'}
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.page_size, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
}
