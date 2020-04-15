package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.synechron.entity.LiveQuizPoints;



public interface LiveQuizPointsDao extends JpaRepository<LiveQuizPoints, Integer>{

	List<LiveQuizPoints> findFirst10ByQuizIdOrderByPointsAsc(int quizId);   
	

	int countByQuizId(int quizId);
}










