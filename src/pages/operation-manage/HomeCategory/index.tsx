/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Space, Table } from 'antd';
import AddHomeCategoryModal from './AddHomeCategoryModal';
// import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { getHomeCategorys, deleteHomeCategory } from '@/services/homeCategory';
import { uuid } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.Home_Category>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);
  const [editData, setEditData] = useState<API.Home_Category>({} as API.Home_Category);
  const [openModal, setOpenModal] = useState('');

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getHomeCategorys(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'type_name',
      key: 'type_name',
      render: (text: string, record: API.Home_Category) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img style={{ width: 16, height: 16, marginRight: 4 }} src={record?.type_icon} />
            <div>{text}</div>
          </div>
        );
      },
    },
    {
      title: '关联团建',
      dataIndex: 'activity.id',
      key: 'activity.id',
      render: (text: number, record: API.Home_Category) => record?.activity?.name,
    },
    {
      title: '团建图片',
      key: 'activity.cover',
      dataIndex: 'activity.cover',
      render: (text: string, record: API.Home_Category) => {
        const value = record?.activity?.cover || '';
        const imgUrl = !!~value.indexOf(customSetting.globalFileUrl)
          ? text
          : `${customSetting.globalFileUrl}${value}`;
        return <img className={styles.home_banner_column_img} src={imgUrl} />;
      },
    },
    // {
    //   title: '状态',
    //   key: 'status',
    //   dataIndex: 'status',
    //   render: (text: string, record: API.Home_Category) => {
    //     return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
    //   },
    // },

    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.Home_Category) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          {/*<a onClick={() => handleState(record)}>下架</a>*/}
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

  const handleEdit = (record: API.Home_Category) => {
    setEditData(record);
    setOpenModal(uuid(8));
  };

  const handleDel = async (record: API.Home_Category) => {
    await deleteHomeCategory(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  // const handleState = async (record: API.Home_Category) => {
  //   await saveHomeCategory({
  //     ...record,
  //     status: record.status === HomeBannerStatus.DOWN ? HomeBannerStatus.UP : HomeBannerStatus.DOWN,
  //   });
  //   fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  // };

  const handAddResult = (banner: API.Home_Category) => {
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
          <AddHomeCategoryModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
          rowKey={'id'}
          size="large"
          columns={columns}
          dataSource={data?.data}
          pagination={{
            total: data?.total_count,
            onChange: handlePageChange,
          }}
        />
      </div>
    </PageContainer>
  );
}
