package com.synechron.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.User;

public interface UserDao extends JpaRepository<User, Integer>{

	User findByUserId(String user_id);
	
	User findByUserIdAndPassword(String user_id,String password);
}










