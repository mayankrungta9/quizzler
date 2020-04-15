package com.synechron.entity;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "live_quiz_points")
public class LiveQuizPoints {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private String id;
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "quiz_id")
	
	private int quizId;
	
	
@Column(name = "points")
	
	private int points;


public String getUserId() {
	return userId;
}


public void setUserId(String userId) {
	this.userId = userId;
}


public int getQuizId() {
	return quizId;
}


public void setQuizId(int quizId) {
	this.quizId = quizId;
}


public int getPoints() {
	return points;
}


public void setPoints(int points) {
	this.points = points;
}



}
