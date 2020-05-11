package com.synechron;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;


@SpringBootApplication
@EnableCaching
public class Day01DbApplication {

	public static void main(String[] args) {
		
	SpringApplication.run(Day01DbApplication.class, args);
		String ss ="\"test\"";
		////System.out.println(ss.replace("\"", ""));
		//Service.getRankDistribution(80,40,100,30);
	}

	

}
