// src/pages/Social.jsx
import React from 'react';
import Banner from '../components/Banner';
import SideBar from '../components/SideBar';
import '../css/Social.css'; 
import { Link } from "react-router-dom";

const Social = () => {
  return (
    <div className="main_container">
      <Banner />

      <div className="sidebar_and_content">
        <SideBar />

        {/* 메인 영역 */}
        <div className="main_content">
          {/* 상단 제목 영역 (선택 사항) */}
          <div className="social_header">
          </div>

          {/* 소셜 컨테이너 */}
          <div className="social_container">
            {/* 그룹 리스트 */}
            
            <div className="group_list">
                <div className="group_item">
                    <div className="group_left">
                    <div className="group_title">Group 1</div>
                    <div className="group_desc">그룹 설명</div>
                    </div>
                    <div className="group_right">
                    <button className="join_button">
                    <Link 
                      to="/join" 
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Join
                    </Link></button>
                    </div>
                </div>
              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 2</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 3</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 4</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

           
                <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 5</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 6</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>
              
              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 7</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

           
                <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 8</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

              <div className="group_item">
                <div className="group_left">
                  <div className="group_title">Group 9</div>
                  <div className="group_desc">그룹 설명</div>
                </div>
                <div className="group_right">
                  <button className="join_button">Join</button>
                </div>
              </div>

            </div> 
            {/* end of group_list */}
          </div>
          {/* end of social_container */}
        </div>
        {/* end of main_content */}
      </div>
      {/* end of sidebar_and_content */}
    </div>
  );
};

export default Social;
