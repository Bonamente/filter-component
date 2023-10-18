import { List } from 'antd';
import { DeveloperCard } from './developer-card/developer-card';

export const DeveloperList = ({ developers, isFilterActive }) => {
  return (
    <List
      grid={{
        gutter: 16,
        column: isFilterActive ? 1 : undefined,
        xs: isFilterActive ? 1 : 1,
        sm: isFilterActive ? 1 : 3,
        md: isFilterActive ? 1 : 3,
        lg: isFilterActive ? 1 : 4,
        xl: isFilterActive ? 1 : 4,
        xxl: isFilterActive ? 1 : 4
      }}
      locale={{
        emptyText: <h3 style={{ fontWeight: 'bold' }}>Нет подходящих специалистов</h3>
      }}
      dataSource={developers}
      renderItem={(item) => (
        <List.Item>
          <DeveloperCard developer={item} isFilterActive={isFilterActive} />
        </List.Item>
      )}
    />
  );
};
