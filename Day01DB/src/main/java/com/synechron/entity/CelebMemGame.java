package com.synechron.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "celeb_mem_game")
public class CelebMemGame {
	
	@Id	
	@Column(name = "id")
	private int id;
	
	@Column(name = "url1")
	
	private String url1;
	
	@Column(name = "url2")
	
	private String url2;

	@Column(name = "type")
	
	private int type;

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl1() {
		return url1;
	}

	public void setUrl1(String url1) {
		this.url1 = url1;
	}

	public String getUrl2() {
		return url2;
	}

	public void setUrl2(String url2) {
		this.url2 = url2;
	}
	

}
