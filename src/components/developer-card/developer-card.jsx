import { useState, useEffect } from 'react';
import cn from 'classnames';

import { Card, Rate, Typography, Badge } from 'antd';
const { Title, Text } = Typography;

import styles from './index.module.css';

export const DeveloperCard = ({ developer, isFilterActive }) => {
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [remainingSkills, setRemainingSkills] = useState([]);

  const cardWidth = 350;
  const largeSize = isFilterActive ? styles.developerCardLarge : '';

  useEffect(() => {
    let visible = [];
    let remaining = [];

    for (const skill of developer.skills) {
      const skillWidth = skill.length * 15;

      if (cardWidth - visible.reduce((totalWidth, s) => totalWidth + s.width, 0) >= skillWidth) {
        visible.push({ skill, width: skillWidth });
      } else {
        remaining.push(skill);
      }
    }

    setVisibleSkills(visible);
    setRemainingSkills(remaining);
  }, [developer.skills]);

  return (
    <Card className={cn(styles.developerCard, largeSize)} hoverable>
      <>
        <div className={styles.cardTop}>
          <div className={cn(styles.developerImageWrapper)}>
            <img className={styles.developerImage} src={developer.imgUrl} alt="разработчик" />
          </div>

          <div className={cn(styles.cardTopInnerWrapper)}>
            <Title className={styles.developerName} level={3}>
              {developer.name} {developer.surname.charAt(0)}.
            </Title>

            <p className={styles.developerLocation}>{developer.location}</p>

            <Rate disabled allowHalf defaultValue={developer.rating} />
          </div>
        </div>

        <div className={cn(styles.cardBottomInnerWrapper)}>
          <div className={styles.cardMiddle}>
            <div className={styles.developerGrade}>
              <Text className={styles.developerGradeText}>{developer.grade}</Text>
            </div>

            <Title className={styles.developerSpecialization} level={4}>
              {developer.specialization}
            </Title>
          </div>

          <div className={styles.developerRate}>
            <p className={styles.developerRateText}>
              <span className="visually-hidden">Ставка разработчика:</span> {developer.hourlyRate}{' '}
              Руб./час
            </p>
          </div>

          <div className={styles.developerSkills}>
            {visibleSkills.map(({ skill }) => (
              <div key={skill} className={styles.developerSkill}>
                <Text>{skill}</Text>
              </div>
            ))}
            {remainingSkills.length > 0 && (
              <Badge
                count={`+ ${remainingSkills.length}`}
                style={{ marginLeft: '5px', backgroundColor: '#52c41a' }}
              />
            )}
          </div>
        </div>
      </>
    </Card>
  );
};
