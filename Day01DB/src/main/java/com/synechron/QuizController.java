package com.synechron;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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
import com.synechron.dao.CelebMemGameDao;
import com.synechron.dao.CelebMemGameLevelDao;
import com.synechron.dao.LiveQuizDao;
import com.synechron.dao.LiveQuizPointsDao;
import com.synechron.dao.PathFinderDao;
import com.synechron.dao.QuestionReportedDao;
import com.synechron.dao.QuizDao;
import com.synechron.dao.UserDao;
import com.synechron.dto.CelebMemGameAndLevelDto;
import com.synechron.dto.CelebMemGameDto;
import com.synechron.dto.PathFinderDto;
import com.synechron.entity.Category;
import com.synechron.entity.CategoryLevelEntity;
import com.synechron.entity.CelebMemGame;
import com.synechron.entity.CelebMemGameLevel;
import com.synechron.entity.LiveQuizPoints;
import com.synechron.entity.PathFinderEntity;
import com.synechron.entity.PrizeRankBoard;
import com.synechron.entity.QuestionReported;
import com.synechron.entity.Quiz;
import com.synechron.entity.User;
import com.synechron.entity.livequizdetail;
import com.synechron.exception.QuestionAlreadyReported;
import com.synechron.service.Service;

import sun.net.www.content.audio.x_aiff;

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
	private PathFinderDao pathFinderDao;

	@Autowired
	private CelebMemGameDao CelebMemGameDao;

	@Autowired
	private CelebMemGameLevelDao celebMemGameLevelDao;
	
	@Autowired
	private QuestionReportedDao questionReportedDao;

	@PersistenceContext
	private EntityManager entityManager;

	@PostMapping(path = "/all", consumes = "application/json", produces = "application/json")
	// @Cacheable(value="books",
	// key=""+"#categoryLevel.categoryId"+"-"+"(#categoryLevel.level)")
	public List<Quiz> getAll(@RequestBody CategoryLevelEntity categoryLevel) throws InterruptedException {
		int level = categoryLevel.getLevel();
		int categoryId = categoryLevel.getCategoryId();
		// List<Quiz> quizList = quizDao.findAll();

		List<Quiz> quizList = quizDao.findAllByCategoryIdAndLevel(categoryId, level);
		Collections.shuffle(quizList);
		return quizList;
	}

	// @Cacheable("category")
	@GetMapping(path = "/getCategory/{type}", produces = "application/json")

	public List<Category> getCategoryAll(@PathVariable String type) throws InterruptedException {
		List<Category> categoryList = categoryDao.findAllByType(type);
		return categoryList;
	}

	@GetMapping(path = "/getActiveLiveQuiz", produces = "application/json")

	public List<livequizdetail> getActiveLiveQuiz() throws InterruptedException {
		Date date = new Date();

		List<livequizdetail> liveQuizDtl = liveQuizDao.findByStatusAndDateLessThanQuery(date);
		List<livequizdetail> liveQuizDtlRes = new ArrayList<livequizdetail>();
		liveQuizDtl.forEach(obj -> {
			obj.setTotalUsersPlayed(liveQuizPointsDao.countByQuizId(obj.getId()));
			liveQuizDtlRes.add(obj);

		});
		return liveQuizDtlRes;
	}

	@GetMapping(path = "/getPathFinderGameData/{level}", produces = "application/json")

	public List<PathFinderDto> getPathFinderGameData(@PathVariable int level) throws InterruptedException {

		List<PathFinderEntity> pathFinderEntity = pathFinderDao.findAllByLevel(level);
		Collections.shuffle(pathFinderEntity);

		List<PathFinderDto> pathFinderDto = new ArrayList<PathFinderDto>();
		pathFinderEntity.forEach(obj -> {
			ArrayList<Integer> pathArray = getIntegerArray(obj.getPath());
			ArrayList<Integer> obstacleArray = getIntegerArray(obj.getObstacleArray());
			pathFinderDto.add(new PathFinderDto(obstacleArray, pathArray, obj.getSourceUrl(), obj.getTargetUrl(),
					obj.getObstacleUrl(), obj.getRow(), obj.getColumn()));

		});
		return pathFinderDto;
	}

	
	private ArrayList<Integer> getIntegerArray(String obj) {
		ArrayList<Integer> pathArray = new ArrayList<Integer>();
		for (String number : obj.split(",")) {
			pathArray.add(Integer.parseInt(number));
		}
		return pathArray;
	}

	@GetMapping(path = "/getLiveQuiz/{categoryId}", produces = "application/json")

	public List<Quiz> getLiveQuiz(@PathVariable int categoryId) {

		List<Quiz> quizList = quizDao.findAllByCategoryId(categoryId);
		Collections.shuffle(quizList);
		return quizList.stream().limit(50).collect(Collectors.toList());
	}

	@GetMapping(path = "/getCelebGameImage/{level}", produces = "application/json")

	public CelebMemGameAndLevelDto getCelebGameImage(@PathVariable int level) {
	CelebMemGameLevel celebMemGameLevel=	celebMemGameLevelDao.findByLevel(level);
	int column = celebMemGameLevel.getColumn();
	int row = celebMemGameLevel.getRow();
	int size= column*row/2;	
	int time = celebMemGameLevel.getTime();
	ArrayList<ArrayList<CelebMemGameDto>> celebMemGameDtoList =new ArrayList<ArrayList<CelebMemGameDto> >();
	
	
		List<CelebMemGame> celebMemGame = CelebMemGameDao.findAll();
		Collections.shuffle(celebMemGame);
		int counter=1;
		while(counter<=3) {
			ArrayList<CelebMemGameDto> celebMemGameDto = new ArrayList<CelebMemGameDto>();
			final int  var=counter;
			System.out.println(var);
			List<CelebMemGame> celebMemGameTemp = celebMemGame.stream().filter(x->x.getType()==var).limit(size).collect(Collectors.toList());
			celebMemGameTemp.stream().forEach(obj -> {
			celebMemGameDto.add(new CelebMemGameDto(obj.getId(), obj.getUrl1()));
			celebMemGameDto.add(new CelebMemGameDto(obj.getId(), obj.getUrl2()));
		});
		Collections.shuffle(celebMemGameDto);
		celebMemGameDtoList.add(celebMemGameDto);
		counter++;
		}
		
		
		return new CelebMemGameAndLevelDto(celebMemGameDtoList,row,column,time);
	}

	@GetMapping(path = "/getRankDistribution/{quizId}", produces = "application/json")

	public List<PrizeRankBoard> getRankDistribution(@PathVariable int quizId) {

		int loggedInUserCount = liveQuizPointsDao.countByQuizId(quizId);
		System.out.println(loggedInUserCount);
		livequizdetail quizObj = liveQuizDao.findById(quizId);
		return Service.getRankDistribution(100, 40, quizObj.getWinningAmt(), loggedInUserCount);
	}

	@GetMapping(path = "/getCurrentRank/{quizId}/{points}", produces = "application/json")

	public LiveQuizPoints getCurrentRank(@PathVariable int quizId,@PathVariable int points) {

		return liveQuizPointsDao.getCurrentRank( quizId, points);
	}
	
	@GetMapping(path = "/getHighestRank/{quizId}/{userId}", produces = "application/json")

	public LiveQuizPoints getHighestRank(@PathVariable int quizId,@PathVariable String userId) {

		return liveQuizPointsDao.getHighestRank( quizId, userId);
	}

	@PostMapping(path = "/getCategoryLevel/{userId}/{categoryId}", produces = "application/json", consumes = "application/json")

	public CategoryLevelEntity getCategoryLevel(@PathVariable String userId, @PathVariable int categoryId) {

		CategoryLevelEntity categoryLevelEntity = categoryLevelDao.findByUserIdAndCategoryId(userId, categoryId);
		if (null == categoryLevelEntity) {
			categoryLevelEntity = new CategoryLevelEntity(userId, categoryId, 1);
		}
		return categoryLevelEntity;
	}

	@PostMapping(path = "/createOrGetUser", consumes = "application/json", produces = "application/json")

	public User saveUser(@RequestBody User user) {

		
		User userDetail = userDao.findByUserId(user.getUserId());
		if(userDetail!=null) {
			return userDetail;
		}
		return userDao.save(user);
	}

	@PostMapping(path = "/checkLogin", consumes = "application/json", produces = "application/json")

	public User checkLogin(@RequestBody User user) {

		

		return userDao.findByUserIdAndPassword(user.getUserId(), user.getPassword());
	}
	
	@PostMapping(path = "/registerUser", consumes = "application/json", produces = "application/json")

	public User regusterUser(@RequestBody User user) {

		User userDetail = userDao.findByUserId(user.getUserId());
		if(userDetail!=null)
		{
			return null;
		}
		else {
		return	userDao.save(user);
		}
	}
	
	@PostMapping(path = "/updateUser", consumes = "application/json", produces = "application/json")

	public User updateUserCoins(@RequestBody User user) {

		return userDao.save(user);
	}

	@PostMapping(path = "/saveliveQuizPoints", consumes = "application/json", produces = "application/json")

	public LiveQuizPoints saveliveQuizPoints(@RequestBody LiveQuizPoints liveQuizPoints) {

		return liveQuizPointsDao.save(liveQuizPoints);

	}

	@GetMapping(path = "/getUserData/{userId}", produces = "application/json")

	public User getUser(@PathVariable String userId) {

		return userDao.findByUserId(userId);
	}

	@GetMapping(path = "/getLiveQuizLeaderBoard/{quizId}", produces = "application/json")

	public List<LiveQuizPoints> getLiveQuizLeaderBoard(@PathVariable int quizId) {

		List<LiveQuizPoints> top10Records = liveQuizPointsDao.findFirst10ByQuizIdOrderByPointsAsc(quizId);
		Collections.reverse(top10Records);

		return top10Records;
	}

	@PostMapping(path = "/saveUserCategoryLevel", consumes = "application/json", produces = "application/json")

	public CategoryLevelEntity saveUserCategoryLevelsaveUserCategoryLevel(
			@RequestBody CategoryLevelEntity categoryLevelEntity) {
//throw new UserNotFoundException();
		return categoryLevelDao.save(categoryLevelEntity);

	}

	@PostMapping(path = "/reportQuestion", consumes = "application/json", produces = "application/json")

	public ResponseEntity<QuestionReported> reportQuestion(@RequestBody QuestionReported questionReported) {

		if (questionReportedDao.findById(questionReported.getQid()).isPresent()) {
			throw new QuestionAlreadyReported();
		} else {
			questionReportedDao.save(questionReported);
			return new ResponseEntity<>(questionReported, HttpStatus.OK);
		}
	}

	int getRank() {
		EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("PERSISTENCE");
		EntityManager em = entityManagerFactory.createEntityManager();
		Query q = em.createNativeQuery("select RANK () OVER ( \r\n" + "		ORDER BY points\r\n"
				+ "	) rank_no  from live_quiz_points where user_id='udit' and quiz_id='1' and points=200;");
		int res = (Integer) q.getSingleResult();

		System.out.println(res);
		return res;
	}
}
