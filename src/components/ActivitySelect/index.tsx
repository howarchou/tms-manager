import React, { useState } from 'react';
import { Select } from 'antd';
import querystring from 'querystring';
import { getActivities } from '@/services/activity';

interface ActivitySelectProps {
  value?: string;
  onChange?: (value: any) => void;
}

const { Option } = Select;


const ActivitySelect: React.FC<ActivitySelectProps> = ({ onChange }) => {
  const [data, setData] = useState([]);

  // const handleChange = (data: string) => {
  //   setInputValue(data);
  // };

  let timeout: NodeJS.Timeout | null;

  const fetch = (keywords: any, callback: { (d: any): void; (arg0: any[]): void; }) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    async function fake() {
      const str = querystring.encode({
        code: 'utf-8',
        q: keywords,
      });
      const list = await getActivities({ page_no: 1, page_size: 9999 });
      const temp: any[] = [];
      list.data.map(d => {
        temp.push({
          value: d.id,
          text: d.name,
        });
        return temp;
      });
      callback(temp);
    }

    timeout = setTimeout(fake, 300);
  };

  const options = data.map(d => {
    return (
      <Option key={d.value} value={d.value}>{d.text}</Option>
    );
  });

  const handleSearch = (v: any) => {
    if (v) {
      fetch(v, (d: any) => setData(d));
    } else {
      setData([]);
    }
  };

  return (
    <Select
      showSearch
      allowClear={true}
      placeholder={'团建名称'}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={onChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

export default ActivitySelect;
