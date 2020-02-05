package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.Quiz;

public interface QuizDao extends JpaRepository<Quiz, Integer>{

	List<Quiz> findAllById(int id);
	List<Quiz> findAllByCategoryIdAndLevel(int categoryId, int level);
	
}










