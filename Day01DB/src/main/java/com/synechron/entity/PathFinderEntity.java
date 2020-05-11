package com.synechron.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "path_finder")
public class PathFinderEntity {
	
	@Id	
	@Column(name = "game_id")
	private int gameId;
	
	@Column(name = "level")
	
	private int level;
	
	@Column(name = "obstacle_array")
	
	private String obstacleArray;
	
@Column(name = "path")	
	private String path;

@Column(name = "source_url")
private String sourceUrl;

@Column(name = "target_url")
private String targetUrl;

@Column(name = "obstacle_url")
private String obstacleUrl;

@Column(name = "row")
private int row;

@Column(name = "column")
private int column;

public int getGameId() {
	return gameId;
}

public void setGameId(int gameId) {
	this.gameId = gameId;
}

public int getLevel() {
	return level;
}

public void setLevel(int level) {
	this.level = level;
}

public String getObstacleArray() {
	return obstacleArray;
}

public void setObstacleArray(String obstacleArray) {
	this.obstacleArray = obstacleArray;
}

public String getPath() {
	return path;
}

public void setPath(String path) {
	this.path = path;
}

public String getSourceUrl() {
	return sourceUrl;
}

public void setSourceUrl(String sourceUrl) {
	this.sourceUrl = sourceUrl;
}

public String getTargetUrl() {
	return targetUrl;
}

public void setTargetUrl(String targetUrl) {
	this.targetUrl = targetUrl;
}

public String getObstacleUrl() {
	return obstacleUrl;
}

public void setObstacleUrl(String obstacleUrl) {
	this.obstacleUrl = obstacleUrl;
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



