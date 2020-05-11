package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Integer>{

	List<Category> findAllByType(String type);
	
	
}










