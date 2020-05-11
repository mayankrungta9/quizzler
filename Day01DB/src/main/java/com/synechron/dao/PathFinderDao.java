package com.synechron.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.PathFinderEntity;

public interface PathFinderDao extends JpaRepository<PathFinderEntity, Integer>{

	List<PathFinderEntity> findAllByLevel(int level);
	
	
}










