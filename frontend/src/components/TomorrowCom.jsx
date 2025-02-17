import React, { useEffect, useState } from "react";
import {
  getFormattedTomorrowYYYYMMDD,
  getFormattedTomorrowYYMMDD,
} from "./DateUtils";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "../css/TodayCom.css";

const TomorrowCom = () => {
  const [todoDetailsTomorrow, setTodoDetailsTomorrow] = useState([]); //내일 todolist 목록 불러오기기
  const [memo, setMemo] = useState(""); //메모 fetch
  const [isAdding, setIsAdding] = useState(false); //todolist 추가
  const [newTask, setNewTask] = useState({ tdDetail: "", tdDetailTime: "" }); //todolist 추가가
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    //내일의 todolist 가져오는 기능
    const fetchTodoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/planbee/todolist/${getFormattedTomorrowYYMMDD()}`
        );
        if (Array.isArray(response.data)) {
          setTodoDetailsTomorrow(response.data);
        } else {
          console.error("내일의 데이터 에러", response.data);
        }
      } catch (error) {
        console.error("내일의 데이터 fetch 에러", error);
      }
    };
    //내일의 Memo 가져오는 함수
    const fetchMemo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/planbee/todolist/getMemo/${getFormattedTomorrowYYMMDD()}`
        );
        setMemo(response.data); // 응답 데이터에서 메모 저장
      } catch (error) {
        console.error("메모 데이터 fetch 에러", error);
      }
    };

    fetchTodoDetails();
    fetchMemo();
  }, []);
  useEffect(() => {
    console.log("현재 memo 값:", memo);
  }, [memo]);

  //todolist 체크박스 상태 변경 함수
  const handleCheckboxChange = async (id) => {
    const updatedTodoDetails = todoDetailsTomorrow.map((item) =>
      item.tdDetailId === id
        ? { ...item, tdDetailState: !item.tdDetailState } //false인 경우 true로 바꿈
        : item
    );

    setTodoDetailsTomorrow(updatedTodoDetails);

    //변경된 상태를 저장한 후 api 요청 보내기기
    const changedItem = updatedTodoDetails.find(
      (item) => item.tdDetailId === id
    );

    try {
      await axios.put("http://localhost:8080/planbee/todolist/state", {
        tdDetailId: changedItem.tdDetailId,
        tdId: changedItem.tdId,
        tdDetail: changedItem.tdDetail,
        tdDetailTime: changedItem.tdDetailTime,
        tdDetailState: changedItem.tdDetailState, // 반전된 상태값을 저장시켜서 전송송
      });
    } catch (error) {
      console.error("체크박스 처리 오류:", error);
    }
  };

  const handleEditClick = (id) => {
    console.log("수정 버튼 클릭, 아이디:", id);
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8080/planbee/todolist/detail/${id}`)
      .then(() => {
        setTodoDetailsTomorrow((prev) =>
          prev.filter((item) => item.tdDetailId !== id)
        );
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };
  const handleCompleteClick = (id) => {
    setTodoDetailsTomorrow((prev) =>
      prev.map((item) =>
        item.tdDetailId === id ? { ...item, tdDetailState: true } : item
      )
    );
  };
  const handleAddTask = () => {
    if (newTask.tdDetail.trim() && newTask.tdDetailTime.trim()) {
      const newTaskData = {
        tdDetail: newTask.tdDetail,
        tdDetailTime: newTask.tdDetailTime,
        tdDetailState: false,
      };

      axios
        .post(
          `http://localhost:8080/planbee/todolist/${getFormattedTomorrowYYMMDD()}`,
          newTaskData
        )
        .then((response) => {
          setTodoDetailsTomorrow((prev) => [...prev, response.data]);
          setNewTask({ tdDetail: "", tdDetailTime: "" });
          setIsAdding(false);
        })
        .catch((error) => {
          console.error("추가 실패:", error);
        });
    }
  };
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
  return (
    <div className="todolist">
      <div className="todolist_index">Tomorrow</div>
      <div className="todolist_content">
        <h2 className="todolist_date">{getFormattedTomorrowYYYYMMDD()}</h2>
        <table className="todolist_checkbox">
          <tbody>
            {todoDetailsTomorrow.map((item) => (
              <tr key={item.tdDetailId}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.tdDetailState}
                    onChange={() => handleCheckboxChange(item.tdDetailId)}
                  />
                </td>
                <td>{item.tdDetail}</td>
                <td>{item.tdDetailTime}</td>
                <td style={{ position: "relative" }}>
                  {/* 수정 아이콘 */}
                  <span onClick={() => toggleDropdown(item.tdDetailId)}>🖉</span>

                  {/* 애니메이션 적용된 버튼 그룹 */}
                  <AnimatePresence>
                    {dropdownOpen === item.tdDetailId && (
                      <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: "absolute",
                          left: "-120px", // 아이콘 왼쪽으로 위치
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <button
                          onClick={() => handleEditClick(item.tdDetailId)}
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.tdDetailId)}
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => handleCompleteClick(item.tdDetailId)}
                        >
                          완료
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isAdding ? (
          <div>
            <input
              type="text"
              placeholder="할 일 입력"
              value={newTask.tdDetail}
              onChange={(e) =>
                setNewTask({ ...newTask, tdDetail: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="목표 시간"
              value={newTask.tdDetailTime}
              onChange={(e) =>
                setNewTask({ ...newTask, tdDetailTime: e.target.value })
              }
            />
            <button onClick={handleAddTask}>완료</button>
          </div>
        ) : (
          <button onClick={() => setIsAdding(true)}>일정 추가</button>
        )}
        <div className="todolist_memo">
          <h3>Memo</h3>
          <div className="memomemo">{memo}</div>
        </div>
      </div>
    </div>
  );
};

export default TomorrowCom;
