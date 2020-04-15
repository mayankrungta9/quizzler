package com.synechron.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.synechron.entity.livequizdetail;

public interface LiveQuizDao extends JpaRepository<livequizdetail, Integer>{


	@Query("select re from livequizdetail re where  re.start_date< CONVERT_TZ(now(), 'UTC',  'Asia/Kolkata') ")
	List<livequizdetail> findByStatusAndDateLessThanQuery(Date date);
	
	livequizdetail findById(int quizId);
}

