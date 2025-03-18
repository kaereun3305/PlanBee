// src/pages/Join.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 import
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import "../css/Join.css";

const Join = () => {
  const [isJoined, setIsJoined] = useState(false);
  const groupName = "Group 1";
  const navigate = useNavigate(); // useNavigate 훅

  // YES 버튼 클릭
  const handleYesClick = () => {
    // “가입하셨습니다” 화면을 잠시 보여준 뒤 이동할 수도 있지만,
    // 바로 group 페이지로 이동하고 싶다면 navigate("/group") 호출
    navigate("/group");
  };

  // NO 버튼 클릭
  const handleNoClick = () => {
    alert("가입이 취소되었습니다!");
    navigate("/social"); // 취소 시 Social로 이동(원하는 경로로)
  };

  return (
    <div className="main_container">
      <Banner />
      <div className="sidebar_and_content">
        <SideBar />
        <div className="main_content">
          <div className="join_container">
            {!isJoined ? (
              <>
                <h2 className="join_title">
                  {groupName}에 가입하시겠습니까?
                </h2>
                <div className="join_button_area">
                  <button className="join_yes" onClick={handleYesClick}>
                    YES
                  </button>
                  <button className="join_no" onClick={handleNoClick}>
                    NO
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 만약 가입 완료 화면을 잠깐 보여주고 싶다면 여기서 처리.
                    현재는 handleYesClick에서 바로 /group으로 이동하므로
                    isJoined를 쓰지 않아도 돼. */}
                <h2 className="join_title">
                  {groupName}에 가입하신 걸 환영합니다!
                </h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
