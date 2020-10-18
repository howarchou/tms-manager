/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Space, Table } from 'antd';
import AddRecommendModal from './AddRecommendModal';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { getRecommends, saveRecommend, deleteRecommend } from '@/services/recommend';
import { uuid } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.HomeBanner>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [editData, setEditData] = useState<API.HomeBanner>({} as API.HomeBanner);
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getRecommends(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '封面跳转链接',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: '缩略图',
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
      render: (text: string, record: API.SeasonHot) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.Recommend) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleState(record)}>下架</a>
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
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
  };

  return (
    <PageContainer>
      <div className={styles.home_banner}>
        <div className={styles.home_banner_add}>
          <AddRecommendModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
          size="large"
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.page_size, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
}
