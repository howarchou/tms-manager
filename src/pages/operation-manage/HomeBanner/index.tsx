/**
 *  Created by pw on 2020/10/9 12:15 上午.
 */
import React, { useEffect, useState } from 'react';
import { Popconfirm } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Table } from 'antd';
import AddBannerModal from '@/pages/operation-manage/HomeBanner/AddBannerModal';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { getBanners, saveBanner, deleteBanner } from '@/services/banner';
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
    getBanners(params).then((res) => {
      setData(res);
    });
  };

  const columns = [
    {
      title: 'banner名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '跳转链接',
      dataIndex: 'link',
      key: 'link',
    }, {
      title: '地区',
      dataIndex: 'province',
      key: 'province'
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.HomeBanner) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
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
      title: '操作',
      key: 'action',
      render: (text: string, record: API.HomeBanner) => (
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

  const handleEdit = (record: API.HomeBanner) => {
    setEditData(record);
    setOpenModal(uuid(8));
  };

  const handleDel = async (record: API.HomeBanner) => {
    await deleteBanner(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleState = async (record: any) => {
    if(record.province === '北京') {
      record.province = 11
    }
    else if(record.province === '上海') {
      record.province = 31
    }
    delete record.area;
    const banner = {...record} as API.HomeBanner
    await saveBanner({
      ...banner,
      status: banner.status === HomeBannerStatus.DOWN ? HomeBannerStatus.UP : HomeBannerStatus.DOWN,
    });
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handAddResult = (banner: API.HomeBanner) => {
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
          <AddBannerModal onAdd={handAddResult} open={openModal} data={editData} />
        </div>
        <Table
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
