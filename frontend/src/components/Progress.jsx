import React, { useState } from "react";

const ProgressBar = () => {
  // progress는 0~1 사이의 값
  const [progress, setProgress] = useState(0.4); // 예: 40%

  const getBarStyle = () => {
    if (progress === null)
      return { height: "0%", backgroundColor: "#ff3b3b" }; // progress가 null일 때는 스타일 적용하지 않음

    const progressPercentage = progress * 100; // progress를 백분율로 변환

    // height는 progress에 맞춰 비례적으로 설정
    const barHeight = `${progressPercentage}%`;

    // background-color를 progress 값에 따라 동적으로 설정
    let barColor = "#f4cc3a"; // 기본값: 노란색
    if (progressPercentage <= 30) {
      barColor = "#ff3b3b"; // 0% - 30%는 빨간색
    } else if (progressPercentage > 30 && progressPercentage <= 70) {
      barColor = "#ffdb3a"; // 30% - 70%는 노란색
    } else {
      barColor = "#4caf50"; // 70% 이상은 녹색
    }

    console.log("적용될 색상:", barColor); // 여기에서 출력되는 색상이 정상적인지 확인

    return {
      width: "100%",        // 가로 폭 100%
      height: barHeight,    // 세로 길이 = progressPercentage%
      backgroundColor: barColor,
      transition: "height 0.3s ease"
    };
  };

  return (
    <div style={{ width: "50px", height: "200px", backgroundColor: "#ddd" }}>
      <div style={getBarStyle()} />
    </div>
  );
};

export default ProgressBar;
