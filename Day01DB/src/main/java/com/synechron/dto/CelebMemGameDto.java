package com.synechron.dto;

public class CelebMemGameDto {
	
	
	private int id;
	private String url;
	


	public CelebMemGameDto(int id, String url1) {
		super();
		this.id = id;
		this.url = url1;
	}



	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}
	
	


}
