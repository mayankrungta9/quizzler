package com.synechron;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synechron.dao.CategoryDao;
import com.synechron.dao.CategoryLevelDao;
import com.synechron.dao.QuizDao;
import com.synechron.dao.UserDao;
import com.synechron.entity.Category;
import com.synechron.entity.CategoryLevelEntity;
import com.synechron.entity.Quiz;
import com.synechron.entity.User;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizDao quizDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private CategoryLevelDao categoryLevelDao;

	@PersistenceContext
	private EntityManager entityManager;

	@PostMapping(path = "/all", consumes = "application/json",produces = "application/json")

	public List<Quiz> getAll(@RequestBody CategoryLevelEntity categoryLevel) {
		int level=categoryLevel.getLevel();
		String userId = categoryLevel.getUserId();
		int categoryId=categoryLevel.getCategoryId();
		if (level == 0) {
			CategoryLevelEntity categoryLevelEntity = categoryLevelDao.findByUserIdAndCategoryId(userId, categoryId);
			if (categoryLevelEntity == null) {
				level = 1;
			} else {
				level = categoryLevelEntity.getLevel();
			}
		}
		List<Quiz> quizList = quizDao.findAllByCategoryIdAndLevel(categoryId, level);

		return quizList;
	}

	@GetMapping(path = "/getCategory", produces = "application/json")

	public List<Category> getCategoryAll() {
		List<Category> categoryList = categoryDao.findAll();

		return categoryList;
	}

	@PostMapping(path = "/saveUser", consumes = "application/json", produces = "application/json")

	public User saveUser(@RequestBody User user) {

		return userDao.save(user);
	}

}
