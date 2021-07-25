/**
 *  Created by pw on 2020/8/29 5:23 下午.
 */
import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Popconfirm, Col, Form, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './TeamBuildingList.less';
import { API } from '@/services/API';
import { deleteActivity, getActivities, saveActivity, updateActivityState } from '@/services/activity';
import { HomeBannerStatus } from '@/services/API.Enum';
import { history } from 'umi';

import {
  areaConfig,
  durationConfig,
  methodConfig,
} from '@/helpers/config';
import { preview } from '@/helpers';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

const { Option, OptGroup } = Select;

export default () => {
  const [data, setData] = useState<API.ListResponsePayload<API.TeamBuildingNew>>();
  const [queryArea, setQueryArea] = useState<number>(0);
  const [queryName, setQueryName] = useState<string>('');

  useEffect(() => {
    const listParam = { page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE, area: 0, name: '' };
    fetchData(listParam);
  }, []);
  const [page, setPage] = useState(DEFAULT_PAGE_NO);

  const fetchData = async (params: API.ListParam) => {
    const data = await getActivities(params);
    setData(data);
  };

  // const handAddResult = () => {
  //   // data.push(values);
  //   // setData(data.slice());
  //   // fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  //   history.push({ pathname: '/team-building/add' });
  // };

  const handleAdd = () => {
    history.push({ pathname: '/team-building/add' });
  };

  const handleState = async (record: API.TeamBuildingNew) => {
    await updateActivityState(record.id!!, !record.status);
    await fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE, area: queryArea, name: queryName });
  };

  // const handleDetail = (record: API.TeamBuildingNew) => {
  //   history.push({
  //     pathname: '/team-building/detail',
  //     query: { id: record.id },
  //   });
  // };

  const handleEdit = (record: API.TeamBuildingNew) => {
    history.push({
      pathname: '/team-building/add',
      query: { id: record?.id ? record.id.toString() : '' },
    });
  };

  const handlePreview = (record: API.TeamBuildingNew) => {
    preview(`teambuilding-teambuilding-detail?id=${record.encode_id}`);
  };

  const handleSearchNameChange = (e: any) => {
    setQueryName(e.target.value);
  };

  const handleSearchAreaChange = (e: any) => {
    setQueryArea(e ?? 0);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE, area: queryArea, name: queryName });
  };

  const handleSearch = () => {
    setPage(1)
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE, area: queryArea, name: queryName });
  };

  const handleDel = async (record: API.TeamBuildingNew) => {
    await deleteActivity(record);
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_SIZE, area: queryArea, name: queryName });
  };

  const columns = [
    {
      title: '活动ID',
      dataIndex: 'series_number',
      key: 'series_number',
      width: 210,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '团建玩法',
      dataIndex: 'method',
      key: 'method',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (value: string) => {
        let text: string = '';
        methodConfig().forEach(method => {
          if (method.value === value) {
            text = method.text;
          }
        });
        return text;
      },
    },
    {
      title: '人均价格',
      key: 'price',
      dataIndex: 'price',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: '团建人数',
      key: 'people_number',
      dataIndex: 'people_number',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (people_number: number, record: API.TeamBuildingNew) => `${people_number} 人`,
    },
    {
      title: '团建天数',
      key: 'duration',
      dataIndex: 'duration',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (value: string) => {
        let text: string = '';
        durationConfig().forEach(duration => {
          if (duration.value === value) {
            text = duration.text;
          }
        });
        return text;
      },
    },
    {
      title: '活动地区',
      key: 'area',
      dataIndex: 'area',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (value: string) => {
        let text: string = '';
        areaConfig().forEach(province => {
          province.items?.forEach(area => {
              if (area.value === value) {
                text = area.text;
              }
            },
          );
        });
        return text;
      },
    },
    {
      title: '是否展示',
      key: 'status',
      dataIndex: 'status',
      width: 80,
      textWrap: 'word-break',
      ellipsis: true,
      render: (text: string, record: API.TeamBuildingNew) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      textWrap: 'word-break',
      ellipsis: true,
      fixed: 'right',
      render: (text: string, record: API.TeamBuildingNew) => (
        <Space size='middle'>
          <a onClick={() => handleState(record)}>
            {record.status === HomeBannerStatus.UP ? '下架' : '上架'}
          </a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handlePreview(record)}>预览</a>
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
      <div className={styles.team_building_list}>
        <div className={styles.team_building_add}>
          <Button type='primary' onClick={handleAdd}>
            添加
          </Button>
          <div className={styles.team_building_search}>
            <Select placeholder={'请选择活动地区'} allowClear={true} onChange={handleSearchAreaChange}>
              {areaConfig().map((province) => {
                  return (
                    <OptGroup key={'activity-area'} label={province.text}>
                      {
                        province.items?.map((area) => {
                          return (
                            <Option key={area.value} value={area.value}>
                              {area.text}
                            </Option>
                          );
                        })
                      }
                    </OptGroup>
                  );
                },
              )}
            </Select>
            <input type='text' placeholder={'活动名称'} value={queryName} onChange={handleSearchNameChange} />
            <Button type='primary' icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
          </div>
        </div>
        <Table
          rowKey='id'
          // @ts-ignore
          columns={columns}
          dataSource={data?.data}
          hideOnSinglePage={true}
          showSizeChanger={false}
          current={page}
          pagination={{ total: data?.total_count, onChange: handlePageChange }}
          size={'middle'}
        />
      </div>
    </PageContainer>
  );
};
