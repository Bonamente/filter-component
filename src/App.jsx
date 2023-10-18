import { useState } from 'react';

import { Card, Button, Space, ConfigProvider, theme } from 'antd';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';
const { defaultAlgorithm, darkAlgorithm } = theme;

import cn from 'classnames';

import { DeveloperList } from './components/developer-list';

import developersData from './developersData.json';
import filtersData from './filtersData.json';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeSelect = () => {
    setIsDarkMode((previousValue) => !previousValue);
    if (isDarkMode) {
      document.documentElement.style.setProperty('color-scheme', 'light');
    } else {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }
  };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState('');

  const { skills, grades } = filtersData;

  const isFilterActive = selectedSkills.length > 0;
  const visibility = selectedSkills.length > 0 ? 'visible' : '';

  const handleSkillSelect = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(updatedSkills);
  };

  const handleGradeSelect = (grade) => {
    const updatedGrades = selectedGrades.includes(grade)
      ? selectedGrades.filter((g) => g !== grade)
      : [...selectedGrades, grade];

    setSelectedGrades(updatedGrades);
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setSelectedGrades([]);
  };

  const devsToShow = developersData
    .filter((developer) => {
      if (selectedSkills.length === 0) return true;
      return developer.skills.some((skill) => selectedSkills.includes(skill));
    })
    .filter((developer) => {
      if (selectedGrades.length === 0) return true;
      return selectedGrades.includes(developer.grade);
    });

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm
      }}>
      <main>
        <div className="site-container">
          <Button
            className="theme-button"
            onClick={handleThemeSelect}
            icon={isDarkMode ? <BulbOutlined /> : <BulbFilled />}
          />
          <div className="inner-wrapper">
            <div className="filter-wrapper">
              <Card className={cn('developer-filter', visibility)}>
                <h2 className="skill-filter-title">Навыки</h2>
                <Space size={[5, 5]} wrap>
                  {skills.map((skill, index) => (
                    <Button
                      className="skill-button"
                      key={index}
                      type={selectedSkills.includes(skill) ? 'primary' : 'default'}
                      onClick={() => handleSkillSelect(skill)}>
                      {skill}
                    </Button>
                  ))}

                  <div className={cn('extra-actions', visibility)}>
                    <div>
                      <h2 className="grade-filter-title">Грейд</h2>
                      <Space size={[5, 5]} wrap>
                        {grades.map((grade, index) => (
                          <Button
                            key={index}
                            type={selectedGrades.includes(grade) ? 'primary' : 'default'}
                            onClick={() => handleGradeSelect(grade)}>
                            {grade}
                          </Button>
                        ))}
                      </Space>

                      <Button
                        type="primary"
                        className="clear-filters-btn"
                        onClick={handleClearFilters}>
                        Сбросить фильтры
                      </Button>
                    </div>
                  </div>
                </Space>
              </Card>
            </div>

            <div className="developer-list-wrapper">
              <DeveloperList developers={devsToShow} isFilterActive={isFilterActive} />
            </div>
          </div>
        </div>
      </main>
    </ConfigProvider>
  );
}

export default App;
