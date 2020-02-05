package com.synechron.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.Category;

public interface CategoryDao extends JpaRepository<Category, Integer>{

	Category findById(int id);
	
	
}










