package com.synechron;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.synechron.dao.CategoryDao;
import com.synechron.dao.CategoryLevelDao;
import com.synechron.dao.QuestionReportedDao;
import com.synechron.dao.QuizDao;
import com.synechron.dao.UserCoinsDao;
import com.synechron.dao.UserDao;
import com.synechron.entity.Category;
import com.synechron.entity.CategoryLevelEntity;
import com.synechron.entity.QuestionReported;
import com.synechron.entity.Quiz;
import com.synechron.entity.User;
import com.synechron.entity.UserCoins;
import com.synechron.exception.QuestionAlreadyReported;

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
	
	@Autowired
	private QuestionReportedDao questionReportedDao;

	@PersistenceContext
	private EntityManager entityManager;

	@PostMapping(path = "/all", consumes = "application/json", produces = "application/json")

	public List<Quiz> getAll(@RequestBody CategoryLevelEntity categoryLevel) {
		int level = categoryLevel.getLevel();
		int categoryId = categoryLevel.getCategoryId();
		List<Quiz> quizList = quizDao.findAll();

		//List<Quiz> quizList = quizDao.findAllByCategoryIdAndLevel(categoryId, level);
		Collections.shuffle(quizList);
		return quizList;
	}

	@GetMapping(path = "/getCategory", produces = "application/json")

	public List<Category> getCategoryAll() {
		List<Category> categoryList = categoryDao.findAll();

		return categoryList;
	}

	@PostMapping(path = "/getCategoryLevel/{userId}/{categoryId}", produces = "application/json", consumes = "application/json")

	public CategoryLevelEntity getCategoryLevel(@PathVariable String userId,@PathVariable int categoryId) {

		CategoryLevelEntity categoryLevelEntity = categoryLevelDao.findByUserIdAndCategoryId(userId,
				categoryId);
		if (null == categoryLevelEntity) {
			categoryLevelEntity=new CategoryLevelEntity(userId,categoryId,1);
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
//throw new UserNotFoundException();
		return categoryLevelDao.save(categoryLevelEntity);

	}
	
	@GetMapping(path = "/getUserCoins/{userId}", produces = "application/json")

	public UserCoins getUserCoins(@PathVariable String userId) {

		 Optional<UserCoins> usercoins = userCoinsDao.findById(userId);
		
		 return usercoins.orElse(new UserCoins());
	}
	@PostMapping(path = "/saveUserCoins", consumes = "application/json", produces = "application/json")

	public UserCoins saveUserCoins(@RequestBody UserCoins userCoins) {

		return userCoinsDao.save(userCoins);

	}
	
	@PostMapping(path = "/reportQuestion", consumes = "application/json", produces = "application/json")

	public ResponseEntity<QuestionReported>  reportQuestion(@RequestBody QuestionReported questionReported) {

		if( questionReportedDao.findById(questionReported.getQid()).isPresent())
		{
			throw new QuestionAlreadyReported();
		}
		else {
			questionReportedDao.save(questionReported);
		return new ResponseEntity<>(questionReported,HttpStatus.OK);
		}
	}
	
	@PostMapping(path = "/redirectPaytm", produces =  MediaType.TEXT_HTML_VALUE)

	public String  redirectPaytm( Test params ) {

		
		 return paytm.redirectToPaytm(params).toString();
		 
	}
	
	@PostMapping(path = "/callback", produces =  MediaType.TEXT_HTML_VALUE)

	public String  callBack( PaytmResponse params ) {
		try {
			return PaytmResponse.reVerify(params);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "errro";
		
	}
}
