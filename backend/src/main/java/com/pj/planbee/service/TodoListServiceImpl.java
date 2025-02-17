package com.pj.planbee.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pj.planbee.dto.TDdetailDTO;
import com.pj.planbee.dto.TDstartDTO;
import com.pj.planbee.dto.TodoListDTO;
import com.pj.planbee.mapper.TDdetailMapper;
import com.pj.planbee.mapper.TodoListMapper;


@Service
public class TodoListServiceImpl implements TodoListService {
@Autowired TDdetailMapper tdMap;
@Autowired TodoListMapper tlMap;


public HashMap<String, String> checkToday() { //오늘과 내일 날짜값을 String으로 변환하는 메소드
	LocalDateTime today = LocalDateTime.now();
	LocalDateTime tomorrow = LocalDateTime.now().plusDays(1);
	DateTimeFormatter form = DateTimeFormatter.ofPattern("yyMMdd"); //날짜 변환
	String todayStr = today.format(form); //오늘 날짜를 위 형식으로 변환
	String tomorrowStr = tomorrow.format(form); //내일 날짜를 위 형식으로 변환
	//System.out.println("내일날짜 변환: " + tomorrowStr);
	
	HashMap<String, String> todayTomo = new HashMap<String, String>();
	todayTomo.put("todayStr", todayStr);
	todayTomo.put("tomorrowStr", tomorrowStr); //오늘날짜에 대한 것만 입력하는 것이 안정성이 좋을 것 같음
	return todayTomo;
}
public int checkRow(String tdDate, String sessionId) { //열이 있는지 확인하는 메소드
	//순환문을 돌리면서 값이 있는지 확인한다.
	List<TDstartDTO> dateId = new ArrayList<TDstartDTO>();
	dateId = tlMap.getDate(sessionId); //sessionId에 해당하는 todoDate와 todoId를 가져온다
	int selectedtdId = 0; //return할 selectedId를 초기화
	System.out.println("service" + dateId.get(8).getTodo_date());
	
	for(int i =0; i<dateId.size(); i++) { //일치하는 열이 있는지 찾는다.
		if(dateId.get(i).getTodo_date().equals(tdDate)) {
			selectedtdId = dateId.get(i).getTodo_Id();
			break;
		}else {
			selectedtdId = 0;
		}
	}	
	
	return selectedtdId;
}
@Override
public void inputRow(String tdDate, String sessionId) { //
	tlMap.dateWrite(tdDate, sessionId); //열을 작성함	
	
}



public int tdIdSearch(String tdDate, String sessionId) { //날짜와 아이디에 해당하는 tdId를 써치하는 메소드
	List<TDstartDTO> dateId = tlMap.getDate(sessionId);
	//System.out.println("service: "+dateId.get(3).getTodo_Id());
	int selectedtdId = 0;
	for (int i =0; i<dateId.size(); i++) {//dateId 리스트를 순회하며,todayStr과 같은 날짜가 있는지 확인 
		if(dateId.get(i).getTodo_date().equals(tdDate)) {
			//리스트 중에 입력한 날짜와 같은 열, 세션아이디와 같은 값을 가진 열을 찾으면 그 고유번호를 반환함
			selectedtdId = dateId.get(i).getTodo_Id(); //for문 사용하여 index번화 반환하므로 1 더해줌
		}
	}
	return selectedtdId;
}

@Override
public List<TDdetailDTO> getTodo(int tdId) { //하루의 투두리스트를 가져오는 기능, 위에서 반환한 todolist고유 아이디로 가져옴
	List<TDdetailDTO> list = new ArrayList<TDdetailDTO>();
	list = tdMap.getTodo(tdId); 
	return list;
}

@Override //투두리스트 작성기능에 if 문 사용해서 todolist 값이 없으면 입력하는 기능을 만들어야함! 
public int todoWrite(TDdetailDTO dto) { //투두리스트 작성하는 기능, 성공시 결과값은 1
	
		int result =0;
		try {
			result = tdMap.todoWrite(dto);
		} catch (Exception e) {
			e.printStackTrace();
		}
	
	
	return result;
}

@Override
public int updateState(int tdDetailId, boolean state) {  //투두리스트 작업상태 업데이트 하는 기능
	//완료시 True혹은 t, 기본값은 False혹은 f
	int result =0;
	try {
		result = tdMap.updateState(tdDetailId, state);
		System.out.println(result);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public int todoModify(TDdetailDTO dto) { //투두리스트 자체 수정기능
	int result = 0;
	try {
		result = tdMap.todoModify(dto);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public int todoDel(int ToDoDetailID) { //투두리스트 한 개 삭제하는 기능
	int result = 0;
	try {
		result = tdMap.todoDel(ToDoDetailID);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public double todoProgress(int tdId) {
	
	double progress = 0.0;
	if(getTodo(tdId).size()==0){
	//todoId로 가져온 값이 표에서 하나도 없으면, 그냥 0을 반환한다.
		System.out.println("ser:"+ getTodo(tdId));
		progress = 0.0;
		System.out.println("ser.progress:tdlist_detail 표에 값이 없음");
		
	}else {
		//else인 경우에 아래 tc를 실행한다
		try {
			double complete = tdMap.getComplete(tdId); //완료한 것만 가져옴
			double total = tdMap.getTotal(tdId); //전체 리스트를 가져옴
			
			progress = complete/total;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	return progress;
}

@Override
public List<TodoListDTO> getMemo(int tdId) {
	List<TodoListDTO> list = new ArrayList<TodoListDTO>();
	try {
		list = tlMap.getMemo(tdId);
		//System.out.println("ser:"+ list);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return list;
}

@Override
public int memoWrite(TodoListDTO listDto) {
	int result = 0;
	try {
		result = tlMap.memoWrite(listDto);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public int memoDel(int tdId) {
	int result =0;
	
	try {
		result = tlMap.memoDel(tdId);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public String dateSearch(int tdId) {
	
	String date = null;
	try {
		date = tlMap.dateSearch(tdId);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return date;
}

@Override
public int regiProgress(int tdId, double progress) {
	int result = 0;
	
	try {
		result = tlMap.regiProgress(tdId, progress);
	} catch (Exception e) {
		e.printStackTrace();
	}
	return 0;
}



}
