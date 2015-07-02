package controllers;

import java.util.HashMap;
import java.util.Map;

import play.mvc.Controller;
import play.mvc.Result;
import models.Redmine;
import play.libs.Json;
import play.mvc.*;
import views.html.*;

@Security.Authenticated(shinway.oauth.Secured.class)
public class Dashboard extends Controller{	
	public static Result index(){		
    	return ok(index.render());
    }
	
	public static Result project(){
		return ok(project.render());
	}
	
	public static Result member(){
		return ok(member.render());
	}
	
	public static Result service(){
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("data", 0);
		
		Map<String, String[]> values = request().body().asFormUrlEncoded();
		int userId = Integer.valueOf(session("user_id"));
		Map<String, Object> row = null;
		String[] req = null;
		
		if(null != values && null != (req = values.get("req"))){
			 switch(req[0]){
				 case "findMaxPointOfMonth":
					 row = new HashMap<String, Object>();
					 row.put("max_of_month",60/* Redmine.getInstance().findMaxPointOfMonth(userId)*/);
					 row.put("current_month",10/* Redmine.getInstance().findCurrentPointOfMonth(userId)*/);
					 result.put("data", row);
					 break;
				 case "findPointOfMonth":
					 result.put("data", Redmine.getInstance().findPointOfMonth(userId));
					 break;	 
				 case "findPointOfHalfMonth":
					 result.put("data", Redmine.getInstance().findPointOfHalfMonth(userId));
					 break;	 	
				 case "findPointOfMember":
					 result.put("data", Redmine.getInstance().findPointOfMember());
					 break;	
				 case "findPointOfProject":
					 row = new HashMap<String, Object>();
					 row.put("finished", Redmine.getInstance().findPointOfProject());
					 row.put("estimated", Redmine.getInstance().findPointEstOfProject());
					 row.put("open_issue", Redmine.getInstance().findPointEstOfProjectWithOpenIssue());
					 result.put("data", row);
					 break;
				 case "findTodoList":
					 result.put("data", Redmine.getInstance().findTodoList(userId));
					 
					 break;
				 case "findIssue":
					int date = 0;
					int status = 0;
					 
					if(null != values.get("date")&&  values.get("date")[0]!= "" ){
						date = Integer.valueOf(values.get("date")[0]);
					}
					if(null != values.get("status") && values.get("status")[0] != "" ){
						status = Integer.valueOf(values.get("status")[0]);
					}					
				 	result.put("data", Redmine.getInstance().findIssue(status, date));
				 	break;
			 }			
		}
		
		return ok(Json.toJson(result));
	}	
}
