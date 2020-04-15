package com.synechron;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
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
import com.synechron.dao.LiveQuizDao;
import com.synechron.dao.LiveQuizPointsDao;
import com.synechron.dao.QuestionReportedDao;
import com.synechron.dao.QuizDao;
import com.synechron.dao.UserDao;
import com.synechron.entity.Category;
import com.synechron.entity.CategoryLevelEntity;
import com.synechron.entity.LiveQuizPoints;
import com.synechron.entity.PrizeRankBoard;
import com.synechron.entity.QuestionReported;
import com.synechron.entity.Quiz;
import com.synechron.entity.User;
import com.synechron.entity.livequizdetail;
import com.synechron.exception.QuestionAlreadyReported;
import com.synechron.service.Service;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")
@EnableCaching
public class QuizController {

	@Autowired
	private QuizDao quizDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private LiveQuizDao liveQuizDao;
	
	@Autowired
	private LiveQuizPointsDao liveQuizPointsDao;
	
	@Autowired
	private CategoryLevelDao categoryLevelDao;

	
	
	@Autowired
	private QuestionReportedDao questionReportedDao;

	@PersistenceContext
	private EntityManager entityManager;

	@PostMapping(path = "/all", consumes = "application/json", produces = "application/json")
	//@Cacheable(value="books", key=""+"#categoryLevel.categoryId"+"-"+"(#categoryLevel.level)")	
	public List<Quiz> getAll(@RequestBody CategoryLevelEntity categoryLevel) throws InterruptedException {
		int level = categoryLevel.getLevel();
		int categoryId = categoryLevel.getCategoryId();
		//List<Quiz> quizList = quizDao.findAll();
		
		List<Quiz> quizList = quizDao.findAllByCategoryIdAndLevel(categoryId, level);
		Collections.shuffle(quizList);
		return quizList;
	}
	//@Cacheable("category")
	@GetMapping(path = "/getCategory" ,produces = "application/json")
	
	public List<Category> getCategoryAll() throws InterruptedException {
		List<Category> categoryList = categoryDao.findAll();
		
		return categoryList;
	}

@GetMapping(path = "/getActiveLiveQuiz" ,produces = "application/json")
	
	public List<livequizdetail> getActiveLiveQuiz() throws InterruptedException {
	Date date = new Date();
	
	List<livequizdetail> liveQuizDtl=liveQuizDao.findByStatusAndDateLessThanQuery(date);
	List<livequizdetail> 	liveQuizDtlRes=new ArrayList<livequizdetail>();
	liveQuizDtl.forEach(obj->{
		obj.setTotalUsersPlayed(liveQuizPointsDao.countByQuizId(obj.getId()));
		liveQuizDtlRes.add(obj);
		
		 
	});
		return liveQuizDtlRes;
	}
	@GetMapping(path = "/getLiveQuiz/{categoryId}", produces = "application/json")

	public List<Quiz> getLiveQuiz(@PathVariable int categoryId) {

			List<Quiz> quizList = quizDao.findAllByCategoryId(categoryId);
			Collections.shuffle(quizList);
			return quizList.stream().limit(10).collect(Collectors.toList());
	}
	
	
	@GetMapping(path = "/getRankDistribution/{quizId}", produces = "application/json")

	public List<PrizeRankBoard> getRankDistribution(@PathVariable int quizId) {

		int loggedInUserCount=liveQuizPointsDao.countByQuizId(quizId);
			System.out.println(loggedInUserCount);
			livequizdetail quizObj=liveQuizDao.findById(quizId);
		return Service.getRankDistribution(100,40,quizObj.getWinningAmt(),loggedInUserCount);
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

		User userDetail=userDao.findByUserId(user.getUserId());
		if(null !=userDetail)
			return userDetail;
		
		return userDao.save(user);
	}
	
	@PostMapping(path = "/updateUserCoins", consumes = "application/json", produces = "application/json")

	public User updateUserCoins(@RequestBody User user) {

		User userDetail=userDao.findByUserId(user.getUserId());
		if(null !=userDetail)
		{
			userDetail.setCoins(user.getCoins());
			return userDao.save(userDetail);
		}
		
		return user;
	}
	
	
	@PostMapping(path = "/saveliveQuizPoints", consumes = "application/json", produces = "application/json")

	public LiveQuizPoints saveliveQuizPoints(@RequestBody LiveQuizPoints liveQuizPoints) {

		
			
			return liveQuizPointsDao.save(liveQuizPoints);
		
	}
	
	
	@GetMapping(path = "/getUserData/{userId}",  produces = "application/json")

	public User getUser(@PathVariable String userId) {

		
		return userDao.findByUserId(userId);
	} 
	
	@GetMapping(path = "/getLiveQuizLeaderBoard/{quizId}",  produces = "application/json")

	public List<LiveQuizPoints> getLiveQuizLeaderBoard(@PathVariable int quizId) {

		
		 List<LiveQuizPoints> top10Records = liveQuizPointsDao.findFirst10ByQuizIdOrderByPointsAsc(quizId);
		Collections.reverse( top10Records); 
		 
		 return top10Records;
	}

	@PostMapping(path = "/saveUserCategoryLevel", consumes = "application/json", produces = "application/json")

	public CategoryLevelEntity saveUserCategoryLevelsaveUserCategoryLevel(
			@RequestBody CategoryLevelEntity categoryLevelEntity) {
//throw new UserNotFoundException();
		return categoryLevelDao.save(categoryLevelEntity);

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
	
	
	
	
}
