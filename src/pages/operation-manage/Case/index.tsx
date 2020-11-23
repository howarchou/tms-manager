/**
 *  Created by pw on 2020/11/16 9:54 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm } from 'antd';
import styles from './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Space, Table } from 'antd';
import { HomeBannerStatus } from '@/services/API.Enum';
import { API } from '@/services/API';
import { customSetting } from '../../../../config/defaultSettings';
import { getCases, saveCase, deleteCase } from '@/services/case';
import { history } from 'umi';
import moment from 'moment';
import { preview } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default function () {
  const [data, setData] = useState<API.ListResponsePayload<API.Case>>();
  const [page, setPage] = useState(DEFAULT_PAGE_NO);

  useEffect(() => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = (params: API.ListParam) => {
    getCases(params).then((res) => {
      setData(res);
    });
  };

  const handlePreview = (record: API.Case) => {
    preview(`case-detail?id=${record.encode_id}`);
  };

  const columns = [
    {
      title: '案例标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '案例名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '团建日期',
      dataIndex: 'date',
      key: 'date',
      render: (text: number) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.Case) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '封面图片',
      key: 'cover',
      dataIndex: 'cover',
      render: (text: string) => {
        const imgUrl = !!~text.indexOf(customSetting.globalFileUrl)
          ? text
          : `${customSetting.globalFileUrl}${text}`;
        return <img className={styles.case_column_img} src={imgUrl} />;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: API.Case) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleState(record)}>
            {record.status === HomeBannerStatus.UP ? '下架' : '上架'}
          </a>
          <a onClick={() => handlePreview(record)}>预览</a>
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

  const handleEdit = (record?: API.Case) => {
    history.push({ pathname: '/operation/edit-case', query: { id: record?.id } });
  };

  const handleDel = async (record: API.Case) => {
    await deleteCase(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handleState = async (record: API.Case) => {
    await saveCase({
      ...record,
      status: record.status === HomeBannerStatus.DOWN ? HomeBannerStatus.UP : HomeBannerStatus.DOWN,
    });
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
  };

  return (
    <PageContainer>
      <div className={styles.caseWrapper}>
        <div className={styles.case_add}>
          <Button type={'primary'} onClick={() => handleEdit()}>
            新增
          </Button>
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
