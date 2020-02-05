package com.synechron.entity;

import java.io.Serializable;

public class CategoryLevelEntityPK implements Serializable {
	private int categoryId;
	private String userId;
public CategoryLevelEntityPK() {
		
	}
	public CategoryLevelEntityPK(int categoryId, String userId) {
		
		this.categoryId = categoryId;
		this.userId = userId;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + categoryId;
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CategoryLevelEntityPK other = (CategoryLevelEntityPK) obj;
		if (categoryId != other.categoryId)
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		return true;
	}
	
	
	
}

