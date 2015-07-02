package models;

import javax.persistence.*;

import play.db.ebean.*;
import play.data.validation.*;
import shinway.oauth.SHA1;

@Entity 
@Table(name="users")
public class User extends Model {
	private static final long serialVersionUID = 1L;

	@Id
    public Integer id;
	
    @Constraints.Required
    public String mail;
    
    @Constraints.Required
    public String login;

    @Constraints.Required
    @Column(name="hashed_password")
    public String password;
    
    public String salt;
    
    public Integer status;

    public static Model.Finder<Integer, User> find = new Model.Finder<Integer, User>(Integer.class, User.class);    
    
    public static User authenticate(String login, String password){
    	if(null == login || login.trim().equals("") || null == password || password.trim().equals("")){
    		return null;    		
    	}
    	
    	User user = find.where()
    					.eq("login", login)
    					.eq("status", 1)
    					.findUnique();
		
    	if(null != user){
			try {
				String encrypt = SHA1.encrypt(user.salt+SHA1.encrypt(password));				  
				if(!user.password.equals(encrypt)){
	    			user = null;
	    		}
			} 
			catch(Exception e){				
				e.printStackTrace();
				user = null;
			}    			
    	}
    	
    	return user;
    }
}