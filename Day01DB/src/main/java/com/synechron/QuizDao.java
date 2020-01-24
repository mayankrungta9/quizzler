package com.synechron;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDao extends JpaRepository<Quiz, Integer>{

	List<Quiz> findAllById(int id);
	
	
}










