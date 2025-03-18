import React, { useEffect, useState } from "react";
import axios from "axios";

const MaxStreak = () => {
  const [maxStreak, setMaxStreak] = useState(null);
  useEffect(() => {
    const fetchMaxStreak = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/planbee/calendar/maxStreak`,
          { withCredentials: true }
        );
        console.log(response.data);
        setMaxStreak(response.data);
      } catch (error) {
        console.error("최대 진척도 fetch 에러", error);
      }
    };

    fetchMaxStreak();
  }, []);
  return (
    <div className="max_streak">
      <h3>최대 연속 달성일</h3>
      <div className="max_streak_days">
        <span className="curStreak_data">
          {maxStreak !== null ? maxStreak : "로딩 중..."}
        </span>
        <span className="curStreak_days">days</span>
      </div>
    </div>
  );
};

export default MaxStreak;
