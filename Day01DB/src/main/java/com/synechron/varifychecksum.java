/*
 * package com.synechron;
 * 
 * import java.util.TreeMap;
 * 
 * public class varifychecksum { public static void main(String s[]) { String
 * paytmChecksum = null;
 * 
 * Create a TreeMap from the parameters received in POST TreeMap<String, String>
 * paytmParams = new TreeMap<String, String>(); for (Entry<String, String[]>
 * requestParamsEntry : request.getParameterMap().entrySet()) { if
 * ("CHECKSUMHASH".equalsIgnoreCase(requestParamsEntry.getKey())){ paytmChecksum
 * = requestParamsEntry.getValue()[0]; } else {
 * paytmParams.put(requestParamsEntry.getKey(),
 * requestParamsEntry.getValue()[0]); } }
 * 
 *//**
	 * Verify checksum Find your Merchant Key in your Paytm Dashboard at
	 * https://dashboard.paytm.com/next/apikeys
	 *//*
		 * boolean isValidChecksum =
		 * CheckSumServiceHelper.getCheckSumServiceHelper().verifycheckSum(
		 * "YOUR_KEY_HERE", paytmParams, paytmChecksum); if (isValidChecksum) {
		 * System.out.append("Checksum Matched"); } else {
		 * System.out.append("Checksum Mismatched"); } } }
		 */