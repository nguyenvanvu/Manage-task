package shinway.oauth;

import play.Play;

import java.io.IOException;
import java.util.Arrays;

import com.google.api.client.googleapis.auth.oauth2.GoogleBrowserClientRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.gson.Gson;

public class GoogleHelper{
	private static GoogleHelper googleHelper;
	
	private GoogleHelper(){}
	
	public static GoogleHelper getInstance(){
		if(googleHelper == null)
			googleHelper = new GoogleHelper();
		
		return googleHelper;
	}
	
	public String redirectUrl(){
		return new GoogleBrowserClientRequestUrl(
   			 Play.application().configuration().getString("google.oauth2.clientId"),
   			 Play.application().configuration().getString("google.oauth2.callback"), 
   			 Arrays.asList(Play.application().configuration().getString("google.oauth2.scope").split(";"))
		).setState("/profile").build();
	}
	
	public UserInfo profile(String token){		    	
    	GoogleCredential credential = new GoogleCredential().setAccessToken(token);
    	HttpRequestFactory requestFactory = (new NetHttpTransport()).createRequestFactory(credential);
    	GenericUrl requestUrl = new GenericUrl(Play.application().configuration().getString("google.oauth2.info"));
    	
    	HttpRequest request;
    	try {
			request = requestFactory.buildGetRequest(requestUrl);
			request.getHeaders().setContentType("application/json");			
			HttpResponse response = request.execute();
			
			if(200 == response.getStatusCode()){
				return (new Gson()).fromJson(response.parseAsString(), shinway.oauth.UserInfo.class);			
			}	    	
	    	
		}
    	catch(IOException e){
			e.printStackTrace();
		}   	
    	
		return null;
	}
}
