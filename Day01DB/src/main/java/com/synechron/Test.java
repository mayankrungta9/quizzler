package com.synechron;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.MediaType;

import com.paytm.pg.merchant.CheckSumServiceHelper;

public class Test {
	String order_id;
	String cust_id;
	String industry_type_id;
	String channel_id;
	int amount;
	public String getOrder_id() {
		return order_id;
	}
	public void setOrder_id(String order_id) {
		this.order_id = order_id;
	}
	public String getCust_id() {
		return cust_id;
	}
	public void setCust_id(String cust_id) {
		this.cust_id = cust_id;
	}
	public String getIndustry_type_id() {
		return industry_type_id;
	}
	public void setIndustry_type_id(String industry_type_id) {
		this.industry_type_id = industry_type_id;
	}
	public String getChannel_id() {
		return channel_id;
	}
	public void setChannel_id(String channel_id) {
		this.channel_id = channel_id;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "Test [order_id=" + order_id + ", cust_id=" + cust_id + ", industry_type_id=" + industry_type_id
				+ ", channel_id=" + channel_id + ", amount=" + amount + "]";
	}
	
	
}
