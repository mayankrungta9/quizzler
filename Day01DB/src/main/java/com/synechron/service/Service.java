package com.synechron.service;

import java.util.ArrayList;
import java.util.List;

import com.synechron.entity.PrizeRankBoard;

public class Service {
	
	public static List <PrizeRankBoard> getRankDistribution(int prizePer, int winnerPer,
			int totalMoney,int totalParticipant) {
		
		if (totalParticipant<=40) {
			totalParticipant=40;
		}
		int distributionPer=prizePer/4;
		int rankCounter=0;
		double prizeDisForEachGrp=(totalMoney*distributionPer)/100;
		double totalWinner=(totalParticipant*winnerPer)/100;
		int grp1= (int)(Math.ceil((totalWinner*10)/100));
		int grp2=(int)Math.ceil((totalWinner*20)/100);
		int grp3=(int)Math.ceil((totalWinner*30)/100);
		int grp4=(int)Math.ceil((totalWinner*40)/100);
		
		int grp1PrizeDis = (int)Math.ceil(prizeDisForEachGrp/grp1);
		int grp2PrizeDis = (int)Math.ceil(prizeDisForEachGrp/grp2);
		int grp3PrizeDis = (int)Math.ceil(prizeDisForEachGrp/grp3);
		int grp4PrizeDis = (int)Math.ceil(prizeDisForEachGrp/grp4);
		
		
		PrizeRankBoard rankGrp1= new PrizeRankBoard(1,grp1,grp1PrizeDis);
		rankCounter=grp1;
		PrizeRankBoard rankGrp2= new PrizeRankBoard(rankCounter+1,rankCounter+grp2,grp2PrizeDis);
		rankCounter+=grp2;
		PrizeRankBoard rankGrp3= new PrizeRankBoard(rankCounter+1,rankCounter+grp3,grp3PrizeDis);
		rankCounter+=grp3;
		PrizeRankBoard rankGrp4= new PrizeRankBoard(rankCounter+1,rankCounter+grp4,grp4PrizeDis);
		List <PrizeRankBoard> list = new ArrayList<PrizeRankBoard>();
		
		list.add(rankGrp1);
		list.add(rankGrp2);
		list.add(rankGrp3);
		list.add(rankGrp4);
		return list;
//		System.out.println(grp1+" "+grp1PrizeDis);
//		System.out.println(grp2+" "+grp2PrizeDis);
//		System.out.println(grp3+" "+grp3PrizeDis);
//		System.out.println(grp4+" "+grp4PrizeDis);
//	System.out.println((prizePer*totalMoney)/100);
//		
//		System.out.println((grp1*Math.ceil(prizeDisForEachGrp/grp1))
//			+(grp2*Math.ceil(prizeDisForEachGrp/grp2))
//				+(grp3*Math.ceil(prizeDisForEachGrp/grp3))
//				+(grp4*Math.ceil(prizeDisForEachGrp/grp4))
//				);
	}
}
