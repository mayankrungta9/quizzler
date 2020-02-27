package com.synechron;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.MediaType;

import com.paytm.pg.merchant.CheckSumServiceHelper;

public class paytm {
	/* initialize a TreeMap object */
	public static StringBuilder redirectToPaytm(Test test){
		System.out.println(MediaType.APPLICATION_FORM_URLENCODED_VALUE);
	TreeMap<String, String> paytmParams = new TreeMap<String, String>();
	paytmParams.put("MID", "XDHpNI74287338480146");

	/* Find your WEBSITE in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
	paytmParams.put("WEBSITE", "WEBSTAGING");

	/* Find your INDUSTRY_TYPE_ID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
	paytmParams.put("INDUSTRY_TYPE_ID", "Retail");

	/* WEB for website and WAP for Mobile-websites or App */
	paytmParams.put("CHANNEL_ID", "WEB");

	/* Enter your unique order id */
	paytmParams.put("ORDER_ID",test.getOrder_id());

	/* unique id that belongs to your customer */
	paytmParams.put("CUST_ID", test.getCust_id());

	/* customer's mobile number */
	paytmParams.put("MOBILE_NO", "7777777777");

	/* customer's email */
	paytmParams.put("EMAIL", "mayankrungta9@gmail.com");

	/**
	* Amount in INR that is payble by customer
	* this should be numeric with optionally having two decimal points
	*/
	paytmParams.put("TXN_AMOUNT", test.getAmount()+"");

	/* on completion of transaction, we will send you the response on this URL */
	paytmParams.put("CALLBACK_URL", "http://localhost:8080/quiz/callback");

	/**
	* Generate checksum for parameters we have
	* You can get Checksum JAR from https://developer.paytm.com/docs/checksum/
	* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
	*/
	String checksum="";
	try {
		checksum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum("c%hOnpLTC!56%oe1", paytmParams);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
System.out.println(checksum);
	/* for Staging */
	String url = "https://securegw-stage.paytm.in/order/process";

	/* for Production */
	// String url = "https://securegw.paytm.in/order/process";

	/* Prepare HTML Form and Submit to Paytm */
	StringBuilder outputHtml = new StringBuilder();
	outputHtml.append("<html>");
	outputHtml.append("<head>");
	outputHtml.append("<title>Merchant Checkout Page</title>");
	outputHtml.append("</head>");
	outputHtml.append("<body>");
	outputHtml.append("<center><h1>Please do not refresh this page...</h1></center>");
	outputHtml.append("<form method='post' action='" + url + "' name='paytm_form'>");

	for(Map.Entry<String,String> entry : paytmParams.entrySet()) {
	    outputHtml.append("<input type='hidden' name='" + entry.getKey() + "' value='" + entry.getValue() + "'>");
	}

	outputHtml.append("<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'>");
	outputHtml.append("</form>");
	outputHtml.append("<script type='text/javascript'>");
	outputHtml.append("document.paytm_form.submit();");
	outputHtml.append("</script>");
	outputHtml.append("</body>");
	outputHtml.append("</html>");
return outputHtml;
	}
	
}
