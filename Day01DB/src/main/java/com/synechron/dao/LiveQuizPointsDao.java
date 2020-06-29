package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.synechron.entity.LiveQuizPoints;



public interface LiveQuizPointsDao extends JpaRepository<LiveQuizPoints, Integer>{

	@Query(value ="select RAND()*100000 as id,points, username as user_id ,current_rank as quiz_id from (\r\n" + 
			"select rank() over (order by points desc) current_rank ,a.user_id,points, IF(first_name = '',b.user_id,first_name) username from live_quiz_points a, user b\r\n" + 
			"where a.user_id = b.user_id\r\n" + 
			"and quiz_id = :quizId)main \r\n" + 
			"order by points desc "
			,nativeQuery= true)
	List<LiveQuizPoints> getLiveQuizLeaderBoard(int quizId);   
	

	int countByQuizId(int quizId);
	
	@Query(value ="select  id,points,user_id,quiz_id from (select RANK () OVER ( ORDER BY points desc) as quiz_id,points,user_id ,quiz_id as id   from live_quiz_points where  quiz_id=:quizId)b where points=:points Limit 0,1"
			,nativeQuery= true)
	LiveQuizPoints getCurrentRank(int quizId,int points);
	
	@Query(value ="select  id,points,user_id,quiz_id  from (select RANK () OVER ( ORDER BY points desc) as quiz_id,points,user_id ,quiz_id as id  from live_quiz_points where quiz_id=:quiz_id )b where user_id=:user_id Limit 0,1",nativeQuery= true)
	LiveQuizPoints getHighestRank(int quiz_id,String user_id);
	
}










