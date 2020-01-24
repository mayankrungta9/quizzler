package com.synechron;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.springframework.lang.NonNull;

@Entity
@Table(name = "quiz")
public class Quiz {
	
	@Id	
	private int id;
	
	@Column(name = "description")
	
	private String description;
	
	@Column(name = "type")
	
	private String type;
	
	@Column(name = "option1")
	
	private String option1;
	

	
	@Column(name = "option2")
	
	private String option2;
	
	@Column(name = "option3")
	
	private String option3;
	
	@Column(name = "option4")
	
	private String option4;
	
	
	
	@Column(name = "url")

	private String url;

	@Column(name = "answer")

	private String answer;

	public int getId() {
		return id;
	}



	public String getAnswer() {
		return answer;
	}



	public void setAnswer(String answer) {
		this.answer = answer;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public String getOption1() {
		return option1;
	}



	public void setOption1(String option1) {
		this.option1 = option1;
	}



	public String getOption2() {
		return option2;
	}



	public void setOption2(String option2) {
		this.option2 = option2;
	}



	public String getOption3() {
		return option3;
	}



	public void setOption3(String option3) {
		this.option3 = option3;
	}



	public String getOption4() {
		return option4;
	}



	public void setOption4(String option4) {
		this.option4 = option4;
	}



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}
	
	
	
}
