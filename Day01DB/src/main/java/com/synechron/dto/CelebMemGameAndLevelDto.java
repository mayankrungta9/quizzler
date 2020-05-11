package com.synechron.dto;

import java.util.ArrayList;
import java.util.List;

public class CelebMemGameAndLevelDto {
	
	
	private ArrayList<ArrayList<CelebMemGameDto>> celebMemAndGameDto;
	private int row;
	private int column;
	public CelebMemGameAndLevelDto(ArrayList<ArrayList<CelebMemGameDto>> celebMemAndGameDto, int row, int column) {
		super();
		this.celebMemAndGameDto = celebMemAndGameDto;
		this.row = row;
		this.column = column;
	}
	public ArrayList<ArrayList<CelebMemGameDto>> getCelebMemAndGameDto() {
		return celebMemAndGameDto;
	}
	public void setCelebMemAndGameDto(ArrayList<ArrayList<CelebMemGameDto>> celebMemAndGameDto) {
		this.celebMemAndGameDto = celebMemAndGameDto;
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
