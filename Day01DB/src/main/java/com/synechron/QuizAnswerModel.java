package com.synechron;

import java.util.ArrayList;
import java.util.List;

public class QuizAnswerModel {

	private ArrayList<Integer> quizId;
	private ArrayList<Integer> answer;
	public ArrayList<Integer> getQuizId() {
		return quizId;
	}
	public void setQuizId(ArrayList<Integer> quizId) {
		this.quizId = quizId;
	}
	public ArrayList<Integer> getAnswer() {
		return answer;
	}
	public void setAnswer(ArrayList<Integer> answer) {
		this.answer = answer;
	}
	
}
