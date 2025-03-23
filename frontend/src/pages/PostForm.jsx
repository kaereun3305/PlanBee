import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaArrowLeft } from "react-icons/fa";
import Banner from "../components/Banner";
import SideBar from "../components/SideBar";
import "../css/PostForm.css";

const PostForm = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null); // 게시글 또는 댓글 드롭다운 활성화 상태

  // 🔹 메뉴 토글 함수 (게시글 및 댓글용)
  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // 🔹 댓글 데이터 (추후 API 연동 가능)
  const comments = [
    {
      id: 1,
      avatarClass: "red_avatar",
      userName: "오늘부터 진짜 열심히 산다",
      text: "이 분 뭐하는 분이죠?",
      time: "2분 전",
    },
    {
      id: 2,
      avatarClass: "gray_avatar",
      userName: "그러다가 돼버렸지 미루니",
      text: "저도 아무것도 안 했어요. 인생은 원래 다 그런겁니다.",
      time: "1분 전",
    },
  ];

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

            {/* 🔹 게시글 제목 & 드롭다운 */}
            {/* 🔹 게시글 제목 & 드롭다운 */}
<div className="post_header">
  <h2 className="post_title">오늘 한 일 자랑해봅니다.</h2>

  {/* ✅ 이 부분을 wrapper로 감싸줌 */}
  <div className="dropdown_wrapper">
    <button className="options_button" onClick={() => toggleMenu("post")}>
      <FaEllipsisV />
    </button>
    {activeMenu === "post" && (
      <div className="dropdown_menu post_dropdown">
        <button>댓글달기</button>
        <button>수정</button>
        <button>삭제</button>
      </div>
    )}
  </div>
</div>

            {/* 🔹 밑줄 */}
            <hr className="post_divider" />

            {/* 🔹 작성자 정보 */}
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
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment_user">
                    <div className={`user_avatar ${comment.avatarClass}`} />
                    <span className="user_name">{comment.userName}</span>
                    <button className="options_button" onClick={() => toggleMenu(comment.id)}>
                      <FaEllipsisV />
                    </button>
                    {activeMenu === comment.id && (
                      <div className="dropdown_menu comment_dropdown">
                        <button>댓글달기</button>
                        <button>수정</button>
                        <button>삭제</button>
                        
                      </div>
                    )}
                  </div>
                  <div className="comment_text_box">
                    <p className="comment_text">{comment.text}</p>
                    <span className="comment_time">{comment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
