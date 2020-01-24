package com.synechron;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface QuizAnswerDao extends JpaRepository<QuizAnswer, Integer>{

	@Query(nativeQuery =true,value = "SELECT count(*) FROM quizanswer as qa  WHERE qa.id IN (:id) AND qa.answer IN (:answer)") 
    Integer findAllByIdAndAnswer(@Param("id") List<Integer> id,@Param("answer") List<Integer> answer);
	
}










