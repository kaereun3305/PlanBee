import React, { useState } from "react";
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import "../css/Group.css";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("제목"); // 정렬 옵션 상태 추가
  const [searchType, setSearchType] = useState("최신순"); // 새로운 드롭다운 검색 타입
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 드롭다운 상태
  const navigate = useNavigate();

  // 드롭다운 토글
  const handleToggle = () => setIsOpen(!isOpen);

  // 드롭다운 항목 선택 시 정렬 기준 변경
  const handleOptionClick = (option) => {
    setSortOption(option);
    setIsOpen(false);
  };

  // 검색 드롭다운 토글
  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

  // 검색 드롭다운 선택 시 검색 타입 변경
  const handleSearchOptionClick = (option) => {
    setSearchType(option);
    setIsSearchOpen(false);
  };

  // 검색창 입력
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // 검색 실행
  const handleSearch = () => console.log(`검색어: ${searchTerm} (검색 기준: ${searchType})`);

  return (
    <div className="main_container">
      <Banner />
      <div className="sidebar_and_content">
        <SideBar />

        <div className="main_content group_container">
          <div className="white_box">
            <div className="group_top_bar">
              <h2 className="group_name">Group name</h2>

              {/* 상단 우측 버튼 모음 */}
              <div className="group_top_right">
                <span className="group_member_count">현재 인원 : 30</span>

                {/* 탈퇴 버튼 */}
                <div className="group_drop">
                  <button className="leave_icon">탈퇴하기</button>
                </div>
                {/* 정렬버튼*/}
                <div className="search_dropdown" onClick={handleSearchToggle}>
                {searchType}
                {isSearchOpen && (
                  <div className="search_dropdown_menu">
                    <div className="dropdown_option" onClick={() => handleSearchOptionClick("최신순")}>
                      최신순
                    </div>
                    <div className="dropdown_option" onClick={() => handleSearchOptionClick("오래된 순")}>
                      오래된 순
                    </div>
                    <div className="dropdown_option" onClick={() => handleSearchOptionClick("조회수 많은 순")}>
                      조회수 많은 순
                    </div>
                  </div>
                )}
              </div>

                {/* 정렬 버튼 */}
                <div className="group_sort">
                  <div className="sort_button" onClick={handleToggle}>
                    {sortOption}
                    {isOpen && (
                      <div className="sort_dropdown visible">
                        <div className="dropdown_option" onClick={() => handleOptionClick("제목")}>
                          제목
                        </div>
                        <div className="dropdown_option" onClick={() => handleOptionClick("내용")}>
                          내용
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 검색창 */}
                  <div className="group_search">
                    <input
                      type="text"
                      className="search_input"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    <div className="search_icon" onClick={handleSearch}>
                    <img src="../img/search_icon.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="group_black_line" />

            

            {/* 게시글 목록 */}
            <div className="post_list">
              <div className="post_item">
                <div className="post_text">오늘 한 일 자랑해봅니다.</div>
                <div className="post_meta">
                  <span className="post_author">작성자</span>
                  <span className="post_date">2025.03.09 03:39</span>
                  <span className="post_views">조회수 26</span>
                </div>
              </div>

              <div className="post_item">
                <div className="post_text">내일 안산에 실기 보시는 분 계신가요?</div>
                <div className="post_meta">
                  <span className="post_author">작성자</span>
                  <span className="post_date">2025.03.09 01:56</span>
                  <span className="post_views">조회수 6</span>
                </div>
              </div>

              <div className="post_item">
                <div className="post_text">제목</div>
                <div className="post_meta">
                  <span className="post_author">작성자</span>
                  <span className="post_date">2025.03.09 01:06</span>
                  <span className="post_views">조회수 2</span>
                </div>
              </div>
              <div className="post_item">
                <div className="post_text">제목</div>
                <div className="post_meta">
                  <span className="post_author">작성자</span>
                  <span className="post_date">2025.03.09 01:06</span>
                  <span className="post_views">조회수 2</span>
                </div>
              </div>
              <div className="post_item">
                <div className="post_text">제목</div>
                <div className="post_meta">
                  <span className="post_author">작성자</span>
                  <span className="post_date">2025.03.09 01:06</span>
                  <span className="post_views">조회수 2</span>
                </div>
              </div>
            </div>

            

            {/* 글쓰기 아이콘 */}
            <div className="write_icon" onClick={() => navigate("/writeform")}>
              <div>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
