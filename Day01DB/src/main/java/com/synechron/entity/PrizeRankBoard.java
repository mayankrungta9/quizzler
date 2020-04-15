package com.synechron.entity;

import java.io.Serializable;

import javax.persistence.Entity;


public class PrizeRankBoard implements Serializable {

	int start_rank;
	int end_rank;
	int prizeMoney;
	
	
	public int getStart_rank() {
		return start_rank;
	}


	public void setStart_rank(int start_rank) {
		this.start_rank = start_rank;
	}


	public int getEnd_rank() {
		return end_rank;
	}


	public void setEnd_rank(int end_rank) {
		this.end_rank = end_rank;
	}


	public int getPrizeMoney() {
		return prizeMoney;
	}


	public void setPrizeMoney(int prizeMoney) {
		this.prizeMoney = prizeMoney;
	}


	public PrizeRankBoard(int start_rank, int end_rank, int prizeMoney) {
		super();
		this.start_rank = start_rank;
		this.end_rank = end_rank;
		this.prizeMoney = prizeMoney;
	}


	@Override
	public String toString() {
		return "PrizeRankBoard [start_rank=" + start_rank + ", end_rank=" + end_rank + ", prizeMoney=" + prizeMoney
				+ "]";
	}
	
}
