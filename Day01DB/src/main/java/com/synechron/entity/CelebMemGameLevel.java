package com.synechron.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "celeb_mem_game_level")
public class CelebMemGameLevel {
	
	@Id	
	@Column(name = "level")
	private int level;
	
	@Column(name = "row")
	private int row;
	
	@Column(name = "column")
	private int column;

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getColumn() {
		return column;
	}

	public void setColumn(int column) {
		this.column = column;
	}

	

}
