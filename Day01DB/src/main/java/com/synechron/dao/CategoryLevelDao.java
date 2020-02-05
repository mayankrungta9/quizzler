package com.synechron.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.CategoryLevelEntity;

public interface CategoryLevelDao extends JpaRepository<CategoryLevelEntity, Integer>{

	CategoryLevelEntity findByUserIdAndCategoryId(String userId,int categoryId);
}










