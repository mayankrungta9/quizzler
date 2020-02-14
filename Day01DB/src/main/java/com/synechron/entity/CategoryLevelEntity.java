package com.synechron.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(CategoryLevelEntityPK.class)
@Table(name = "user_category_level")
public class CategoryLevelEntity implements Serializable {
	public CategoryLevelEntity() {
	}

	@Id
	@Column(name = "user_id")
	private String userId;

	@Id
	@Column(name = "category_id")

	private int categoryId;

	@Column(name = "level")

	private int level;

	@Column(name = "numb_of_ques")
	private int numbOfQues;

	public int getNumbOfQues() {
		return numbOfQues;
	}

	public void setNumbOfQues(int numbOfQues) {
		this.numbOfQues = numbOfQues;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public CategoryLevelEntity(String userId, int categoryId, int level) {
		super();
		this.userId = userId;
		this.categoryId = categoryId;
		this.level = level;
	}
	

}
