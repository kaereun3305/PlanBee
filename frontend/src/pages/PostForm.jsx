import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaArrowLeft } from "react-icons/fa";
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import "../css/PostForm.css";

const PostForm = () => {
  const navigate = useNavigate();
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [showCommentMenu, setShowCommentMenu] = useState(null);

  const togglePostMenu = () => setShowPostMenu(!showPostMenu);
  const toggleCommentMenu = (id) =>
    setShowCommentMenu(showCommentMenu === id ? null : id);

  return (
    <div className="main_container">
      <Banner />
      <div className="sidebar_and_content">
        <SideBar />
        <div className="main_content">
          <div className="post_container">
            {/* 🔹 뒤로가기 버튼 */}
            <button className="back_button" onClick={() => navigate(-1)}>
              <FaArrowLeft className="back_icon" />
            </button>

            {/* 🔹 제목 & 드롭다운 */}
            <div className="post_header">
              <h2 className="post_title">오늘 한 일 자랑해봅니다.</h2>
              <button className="options_button" onClick={togglePostMenu}>
                <FaEllipsisV />
              </button>
              {showPostMenu && (
                <div className="dropdown_menu post_dropdown">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              )}
            </div>

            {/* 🔹 밑줄 */}
            <hr className="post_divider" />

            {/* 🔹 작성자, 조회수, 날짜 */}
            <div className="post_info">
              <span>작성자</span>
              <span>조회수: 26</span>
              <span>2025.03.29 03:39</span>
            </div>

            {/* 🔹 게시글 내용 */}
            <div className="post_content">
              <p>아무것도 안 했습니다.</p>
              <p>죄송하게 됐습니다.</p>
              <p>저도 뭐라도 하고 싶었습니다.</p>
            </div>

            {/* 🔹 댓글 섹션 */}
            <div className="comment_section">
              {/* 🔹 댓글 1 */}
              <div className="comment">
                <div className="comment_user">
                  <div className="user_avatar red_avatar"></div>
                  <span className="user_name">오늘부터 진짜 열심히 산다</span>
                  <button
                    className="options_button"
                    onClick={() => toggleCommentMenu(1)}
                  >
                    <FaEllipsisV />
                  </button>
                  {showCommentMenu === 1 && (
                    <div className="dropdown_menu comment_dropdown">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  )}
                </div>
                <div className="comment_text_box">
                  <p className="comment_text">이 분 뭐하는 분이죠?</p>
                  <span className="comment_time">2분 전</span>
                </div>
              </div>

              {/* 🔹 댓글 2 */}
              <div className="comment">
                <div className="comment_user">
                  <div className="user_avatar gray_avatar"></div>
                  <span className="user_name">그러다가 돼버렸지 미루니</span>
                  <button
                    className="options_button"
                    onClick={() => toggleCommentMenu(2)}
                  >
                    <FaEllipsisV />
                  </button>
                  {showCommentMenu === 2 && (
                    <div className="dropdown_menu comment_dropdown">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  )}
                </div>
                <div className="comment_text_box">
                  <p className="comment_text">
                    저도 아무것도 안 했어요. 인생은 원래 다 그런겁니다.
                  </p>
                  <span className="comment_time">1분 전</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
