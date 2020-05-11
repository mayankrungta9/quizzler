package com.synechron.dto;

import java.util.List;


public class PathFinderDto {

	private List<Integer> obstaclePosArray;
	
	private List<Integer> pathArray;

private String sourceUrl;

private String targetUrl;

private String obstacleUrl;

private int row;

private int column;

public List<Integer> getObstaclePosArray() {
	return obstaclePosArray;
}

public void setObstaclePosArray(List<Integer> obstaclePosArray) {
	this.obstaclePosArray = obstaclePosArray;
}

public List<Integer> getPathArray() {
	return pathArray;
}

public void setPathArray(List<Integer> pathArray) {
	this.pathArray = pathArray;
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

public PathFinderDto(List<Integer> obstaclePosArray,List<Integer> pathArray, String sourceUrl, String targetUrl, String obstacleUrl,
		int row, int column) {
	super();
	this.obstaclePosArray = obstaclePosArray;
	this.pathArray = pathArray;
	this.sourceUrl = sourceUrl;
	this.targetUrl = targetUrl;
	this.obstacleUrl = obstacleUrl;
	this.row = row;
	this.column = column;
}



}



