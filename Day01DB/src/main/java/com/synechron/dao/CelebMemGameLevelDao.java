package com.synechron.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.CelebMemGameLevel;

public interface CelebMemGameLevelDao extends JpaRepository<CelebMemGameLevel, Integer>{

	CelebMemGameLevel findByLevel(int level);
	
	
}










