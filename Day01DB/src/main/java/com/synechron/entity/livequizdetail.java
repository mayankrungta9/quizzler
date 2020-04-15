package com.synechron.entity;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "livequizdetail")
public class livequizdetail {
	
	@Id	
	@Column(name = "id")
	private int id;
	
	@Column(name = "quiz_name")
	
	private String quizName;
	
	
@Column(name = "type")
	
	private int type;

@Column(name = "entryfee")

private int entryfee;

@Column(name = "winning_amt")

private int winningAmt;

@Column(name = "winning_type")

private int winningType;

@Column(name = "start_date")

private Date start_date;



@Column(name = "end_date")

private Date end_date;

@Column(name = "total_users_played")
private int totalUsersPlayed;



public int getTotalUsersPlayed() {
	return totalUsersPlayed;
}

public void setTotalUsersPlayed(int totalUsersPlayed) {
	this.totalUsersPlayed = totalUsersPlayed;
}

public Date getEnd_date() {
	return end_date;
}

public void setEnd_date(Date end_date) {
	this.end_date = end_date;
}

@Column(name = "status")

private int status;

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getQuizName() {
	return quizName;
}

public void setQuizName(String quizName) {
	this.quizName = quizName;
}

public int getType() {
	return type;
}

public void setType(int type) {
	this.type = type;
}

public int getEntryfee() {
	return entryfee;
}

public void setEntryfee(int entryfee) {
	this.entryfee = entryfee;
}

public int getWinningAmt() {
	return winningAmt;
}

public void setWinningAmt(int winningAmt) {
	this.winningAmt = winningAmt;
}

public int getWinningType() {
	return winningType;
}

public void setWinningType(int winningType) {
	this.winningType = winningType;
}





public int getStatus() {
	return status;
}

public void setStatus(int status) {
	this.status = status;
}

public Date getStart_date() {
	return start_date;
}

public void setStart_date(Date start_date) {
	this.start_date = start_date;
}




}
