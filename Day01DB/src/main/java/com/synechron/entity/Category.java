package com.synechron.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
	
	@Id	
	@Column(name = "category_id")
	private int categoryId;
	
	@Column(name = "category_name")
	
	private String categoryName;
	
	@Column(name = "url")
	
	private String url;
	
@Column(name = "level")
	
	private int level;

	public int getLevel() {
	return level;
}

public void setLevel(int level) {
	this.level = level;
}

	

	public int getCategoryId() {
	return categoryId;
}

public void setCategoryId(int categoryId) {
	this.categoryId = categoryId;
}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}
