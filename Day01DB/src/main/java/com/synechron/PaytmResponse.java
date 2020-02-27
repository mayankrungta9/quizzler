package com.synechron;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.TreeMap;
import org.json.JSONObject;

import com.google.gson.JsonObject;
import com.paytm.pg.merchant.CheckSumServiceHelper;

public class PaytmResponse {
	private String CURRENCY;
	private String GATEWAYNAME;
	private String RESPMSG;
	private String BANKNAME;
	private String PAYMENTMODE;
	private String MID;
	private String RESPCODE;
	private String TXNID;
	private String TXNAMOUNT;
	private String ORDERID;
	private String STATUS;
	private String BANKTXNID;
	private String TXNDATE;
	private String CHECKSUMHASH;
	public String getCURRENCY() {
		return CURRENCY;
	}
	public void setCURRENCY(String cURRENCY) {
		CURRENCY = cURRENCY;
	}
	public String getGATEWAYNAME() {
		return GATEWAYNAME;
	}
	public void setGATEWAYNAME(String gATEWAYNAME) {
		GATEWAYNAME = gATEWAYNAME;
	}
	public String getRESPMSG() {
		return RESPMSG;
	}
	public void setRESPMSG(String rESPMSG) {
		RESPMSG = rESPMSG;
	}
	public String getBANKNAME() {
		return BANKNAME;
	}
	public void setBANKNAME(String bANKNAME) {
		BANKNAME = bANKNAME;
	}
	public String getPAYMENTMODE() {
		return PAYMENTMODE;
	}
	public void setPAYMENTMODE(String pAYMENTMODE) {
		PAYMENTMODE = pAYMENTMODE;
	}
	public String getMID() {
		return MID;
	}
	public void setMID(String mID) {
		MID = mID;
	}
	public String getRESPCODE() {
		return RESPCODE;
	}
	public void setRESPCODE(String rESPCODE) {
		RESPCODE = rESPCODE;
	}
	public String getTXNID() {
		return TXNID;
	}
	public void setTXNID(String tXNID) {
		TXNID = tXNID;
	}
	public String getTXNAMOUNT() {
		return TXNAMOUNT;
	}
	public void setTXNAMOUNT(String tXNAMOUNT) {
		TXNAMOUNT = tXNAMOUNT;
	}
	public String getORDERID() {
		return ORDERID;
	}
	public void setORDERID(String oRDERID) {
		ORDERID = oRDERID;
	}
	public String getSTATUS() {
		return STATUS;
	}
	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}
	public String getBANKTXNID() {
		return BANKTXNID;
	}
	public void setBANKTXNID(String bANKTXNID) {
		BANKTXNID = bANKTXNID;
	}
	public String getTXNDATE() {
		return TXNDATE;
	}
	public void setTXNDATE(String tXNDATE) {
		TXNDATE = tXNDATE;
	}
	public String getCHECKSUMHASH() {
		return CHECKSUMHASH;
	}
	public void setCHECKSUMHASH(String cHECKSUMHASH) {
		CHECKSUMHASH = cHECKSUMHASH;
	}
	@Override
	public String toString() {
		return "PaytmResponse [CURRENCY=" + CURRENCY + ", GATEWAYNAME=" + GATEWAYNAME + ", RESPMSG=" + RESPMSG
				+ ", BANKNAME=" + BANKNAME + ", PAYMENTMODE=" + PAYMENTMODE + ", MID=" + MID + ", RESPCODE=" + RESPCODE
				+ ", TXNID=" + TXNID + ", TXNAMOUNT=" + TXNAMOUNT + ", ORDERID=" + ORDERID + ", STATUS=" + STATUS
				+ ", BANKTXNID=" + BANKTXNID + ", TXNDATE=" + TXNDATE + ", CHECKSUMHASH=" + CHECKSUMHASH + "]";
	}
	
	public static String reVerify(PaytmResponse response) throws Exception{
	TreeMap<String, String> paytmParams = new TreeMap<String, String>();
	String responseData = "";

	paytmParams.put("MID", "XDHpNI74287338480146");
	paytmParams.put("ORDERID", response.getORDERID());
	String checksum = CheckSumServiceHelper.getCheckSumServiceHelper().genrateCheckSum("c%hOnpLTC!56%oe1", paytmParams);
	paytmParams.put("CHECKSUMHASH", checksum);
	JSONObject obj = new JSONObject(paytmParams);
	String post_data = obj.toString();
	URL url = new URL("https://securegw-stage.paytm.in/order/status");
	try {
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Content-Type", "application/json");
		connection.setDoOutput(true);

		DataOutputStream requestWriter = new DataOutputStream(connection.getOutputStream());
		requestWriter.writeBytes(post_data);
		requestWriter.close();
				InputStream is = connection.getInputStream();
		BufferedReader responseReader = new BufferedReader(new InputStreamReader(is));
		if ((responseData = responseReader.readLine()) != null) {
			System.out.append("Response: " + responseData);
		}
		// System.out.append("Request: " + post_data);
		responseReader.close();
		
	} catch (Exception exception) {
		exception.printStackTrace();
	}
	return responseData;
	}
}
