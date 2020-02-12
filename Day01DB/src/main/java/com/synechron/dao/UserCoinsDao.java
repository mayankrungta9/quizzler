package com.synechron.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.synechron.entity.UserCoins;

public interface UserCoinsDao extends JpaRepository<UserCoins, String> {

}

