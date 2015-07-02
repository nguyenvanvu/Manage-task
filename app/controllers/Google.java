package controllers;

import java.util.Map;
import shinway.oauth.*;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.*;
import models.*;

public class Google extends Controller{
	public static Result login() {
        return ok(google.render());
    }
        
    public static Result authenticate(){
    	Map<String, String[]> values = request().body().asFormUrlEncoded();    	
    	String[] access_token = values.get("access_token");
    	
    	if(null != access_token){
    		UserInfo googleAccount = GoogleHelper.getInstance().profile(access_token[0]);
    		if(null != googleAccount){
    			User user = User.find.where()
								.eq("mail", googleAccount.email)
								.eq("status", 1)
								.findUnique();
    			
    			if(null != user){
    				session("email", googleAccount.email);
    				session("user_id", String.valueOf(user.id));    				
    				
        			return redirect(routes.Application.index());	
    			}
    			else{
    				 flash("success", "Invalid email (" + googleAccount.email + ")");    				
    			}
    		}
    	}
    	
    	return redirect(routes.Application.login());
    }
}
