package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.synechron.entity.LiveQuizPoints;



public interface LiveQuizPointsDao extends JpaRepository<LiveQuizPoints, Integer>{

	List<LiveQuizPoints> findFirst10ByQuizIdOrderByPointsAsc(int quizId);   
	

	int countByQuizId(int quizId);
	
	@Query(value ="select RANK () OVER ( ORDER BY points) as rank_no  from live_quiz_points where user_id='udit' and quiz_id='1' and points=200",nativeQuery= true)
	int getRank();
}










