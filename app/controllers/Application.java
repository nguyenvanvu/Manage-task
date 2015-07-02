package controllers;

import play.mvc.*;
import play.data.*;
import static play.data.Form.*;
import models.*;
import views.html.*;

public class Application extends Controller {
	public static Result index(){
		return redirect(routes.Dashboard.index());
    }
	
    public static class Login{        
        public int id;
    	public String login;
        public String password;
        
        public String validate() {
        	User user;
            if((user = User.authenticate(login, password)) == null){
                return "Invalid user or password";
            }
            
            session("email", user.mail);
            session("user_id", String.valueOf(user.id));            
            return null;
        }
    }

    /**
     * Login page.
     */
    public static Result login() {
        return ok(login.render(form(Login.class)));
    }
    
    /**
     * Handle login form submission.
     */
    public static Result authenticate(){
        Form<Login> loginForm = form(Login.class).bindFromRequest();
        if(loginForm.hasErrors()) {
            return badRequest(login.render(loginForm));
        } 
        else{
            return redirect(routes.Application.index());
        }
    }

    /**
     * Logout and clean the session.
     */
    public static Result logout() {
        session().clear();
        flash("success", "You've been logged out");
        return redirect(routes.Application.login());
    }
}
