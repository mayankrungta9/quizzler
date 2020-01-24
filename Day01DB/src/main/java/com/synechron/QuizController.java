package com.synechron;

import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizDao quizDao;

	@Autowired
	private QuizAnswerDao quizAnsewerDao;
	@PersistenceContext
	private EntityManager entityManager;

	@GetMapping(path = "/all", produces = "application/json")

	public List<Quiz> getAll() {
		List<Quiz> quizList = quizDao.findAll();

		return quizList;
	}

	@PostMapping(path = "/getResult", produces = "application/json")

	public Integer getResult(@RequestBody QuizAnswerModel quizAnserObj) {
		return quizAnsewerDao.findAllByIdAndAnswer(quizAnserObj.getQuizId(),quizAnserObj.getAnswer());
		
		
	}
	
	/*
	 * public static void main(String s[]) { Gson gson = new Gson();
	 * 
	 * QuizAnswerModel obj = new QuizAnswerModel(); List<Integer> list = new
	 * ArrayList<>(); list.add(1); list.add(2); obj.setAnswer(list);
	 * obj.setQuizId(list);
	 * 
	 * // 2. Java object to JSON string String jsonInString = gson.toJson(obj);
	 * 
	 * System.out.println(jsonInString); }
	 */
}
