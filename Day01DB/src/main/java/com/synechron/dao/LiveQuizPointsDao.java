package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.synechron.entity.LiveQuizPoints;



public interface LiveQuizPointsDao extends JpaRepository<LiveQuizPoints, Integer>{

	List<LiveQuizPoints> findFirst10ByQuizIdOrderByPointsAsc(int quizId);   
	

	int countByQuizId(int quizId);
	
	@Query(value ="select  id,points,user_id,quiz_id from (select RANK () OVER ( ORDER BY points desc) as quiz_id,points,user_id ,quiz_id as id   from live_quiz_points where  quiz_id=:quizId)b where points=:points Limit 0,1"
			,nativeQuery= true)
	LiveQuizPoints getCurrentRank(int quizId,int points);
	
	@Query(value ="select  id,points,user_id,quiz_id  from (select RANK () OVER ( ORDER BY points desc) as quiz_id,points,user_id ,quiz_id as id  from live_quiz_points where quiz_id=:quiz_id )b where user_id=:user_id Limit 0,1",nativeQuery= true)
	LiveQuizPoints getHighestRank(int quiz_id,String user_id);
	
}










