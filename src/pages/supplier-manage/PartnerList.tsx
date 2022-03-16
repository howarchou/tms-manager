/**
 *  Created by pw on 2020/8/29 4:38 下午.
 */
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/team-building-manage/TeamBuildingList.less';
import { Space, Table } from 'antd';
import { history } from '@@/core/history';
import type { API } from '@/services/API';
import moment from 'moment';
import { QueryPartnerParamer, queryPartners} from '@/services/partner'

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

// eslint-disable-next-line func-names
export default function() {
  const [data, setData] = useState<API.ListResponsePayload<API.Partner[]>>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE}).then(() => {});
  }, []);


  const [page, setPage] = useState(DEFAULT_PAGE_NO);

  const fetchData = async (params: QueryPartnerParamer) => {
    const v = await queryPartners(params);
    if(v) setData(v);
  };


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '合作伙伴',
      dataIndex: 'partner_type',
      key: 'partner_type',
      width: 120,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '业务类型',
      dataIndex: 'service_type',
      key: 'service_type',
      width: 120,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '联系人',
      dataIndex: 'contact_name',
      key: 'contact_name',
      width: 120,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contact_mobile',
      key: 'contact_mobile',
      width: 120,
      textWrap: 'word-break',
      ellipsis: true,
    },

    {
      title: '备注',
      key: 'remark',
      dataIndex: 'remark',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'created_at',
      dataIndex: 'created_at',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
      render: (text: number) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
      fixed: 'right',
      render: (text: string, record: any) => (
        <Space size='middle'>
          {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
          <a onClick={() => handleDetail(record)}>查看</a>
        </Space>
      ),
    },
  ];

  const handleDetail = (record: API.Order) => {
    // @ts-ignore
    history.push({
      pathname: '/supplier/partner-detail',
      query: { id: record.id },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE });
  };

  return (
    <PageContainer title={'合作伙伴列表'}>
      <div className={styles.team_building_list}>
        <Table
          key={'order_list'}
          // @ts-ignore
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
          size='middle'
        />
      </div>
    </PageContainer>
  );
}
