package com.synechron;

import java.util.Collections;
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

import com.synechron.dao.CategoryDao;
import com.synechron.dao.CategoryLevelDao;
import com.synechron.dao.QuizDao;
import com.synechron.dao.UserCoinsDao;
import com.synechron.dao.UserDao;
import com.synechron.entity.Category;
import com.synechron.entity.CategoryLevelEntity;
import com.synechron.entity.Quiz;
import com.synechron.entity.User;
import com.synechron.entity.UserCoins;

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

	@Autowired
	private UserCoinsDao userCoinsDao;

	@PersistenceContext
	private EntityManager entityManager;

	@PostMapping(path = "/all", consumes = "application/json", produces = "application/json")

	public List<Quiz> getAll(@RequestBody CategoryLevelEntity categoryLevel) {
		int level = categoryLevel.getLevel();

		String userId = categoryLevel.getUserId();
		int categoryId = categoryLevel.getCategoryId();
		if (level == 0) {
			CategoryLevelEntity categoryLevelEntity = categoryLevelDao.findByUserIdAndCategoryId(userId, categoryId);
			if (categoryLevelEntity == null) {
				level = 1;
			} else {
				level = categoryLevelEntity.getLevel();

			}
		}
		List<Quiz> quizList = quizDao.findAllByCategoryIdAndLevel(categoryId, level);
		Collections.shuffle(quizList);
		return quizList;
	}

	@GetMapping(path = "/getCategory", produces = "application/json")

	public List<Category> getCategoryAll() {
		List<Category> categoryList = categoryDao.findAll();

		return categoryList;
	}

	@PostMapping(path = "/getCategoryLevel", produces = "application/json", consumes = "application/json")

	public CategoryLevelEntity getCategoryLevel(@RequestBody CategoryLevelEntity categoryLevel) {

		CategoryLevelEntity categoryLevelEntity = categoryLevelDao.findByUserIdAndCategoryId(categoryLevel.getUserId(),
				categoryLevel.getCategoryId());
		if (null == categoryLevelEntity) {
			categoryLevelEntity = categoryLevel;

			categoryLevelEntity.setLevel(1);
		}
		return categoryLevelEntity;
	}

	@PostMapping(path = "/saveUser", consumes = "application/json", produces = "application/json")

	public User saveUser(@RequestBody User user) {

		return userDao.save(user);
	}

	@PostMapping(path = "/saveUserCategoryLevel", consumes = "application/json", produces = "application/json")

	public CategoryLevelEntity saveUserCategoryLevelsaveUserCategoryLevel(
			@RequestBody CategoryLevelEntity categoryLevelEntity) {

		return categoryLevelDao.save(categoryLevelEntity);

	}

	@PostMapping(path = "/saveUserCoins", consumes = "application/json", produces = "application/json")

	public UserCoins saveUserCoins(@RequestBody UserCoins userCoins) {

		return userCoinsDao.save(userCoins);

	}
}
