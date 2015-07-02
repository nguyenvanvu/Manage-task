package models;

import java.util.List;
import com.avaje.ebean.Ebean;
import com.avaje.ebean.SqlQuery;
import com.avaje.ebean.SqlRow;

public class Redmine {
	public static Redmine redmine;
	
	private Redmine(){}
	
	public static Redmine getInstance(){
		if(redmine == null)
			redmine = new Redmine();		
		return redmine;
	}
	
	public int findMaxPointOfMonth(int userId){
		String sql = "  SELECT DATE_FORMAT(closed_on, '%Y-%m'), SUM(point) AS total "+
					 "  FROM (SELECT i.customized_id  FROM custom_values AS i JOIN users AS u ON i.`value` = u.id WHERE i.custom_field_id = 7 AND u.id = :p_userId) AS us "+
					 " 	 	 JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND `value` != 'Re-code (Bug)') AS t ON(us.customized_id=t.customized_id)"+
					 "		 JOIN (SELECT p.customized_id, i.closed_on, p.`value` * 1 AS point FROM custom_values AS p INNER JOIN issues AS i ON(p.customized_id=i.id) WHERE p.custom_field_id = 11 AND (p.`value` * 1 > 0) GROUP BY p.customized_id, i.closed_on, p.`value`) AS pt ON(pt.customized_id = us.customized_id) "+
					 "	GROUP BY YEAR(pt.closed_on), MONTH(pt.closed_on) "+
					 "	ORDER BY total DESC " +
					 "	Limit 0, 1";
		
		SqlQuery query = Ebean.createSqlQuery(sql);
		query.setParameter("p_userId", userId);		
		SqlRow row = query.findUnique();		
		return (null != row && null != row.getInteger("total")) ? row.getInteger("total") : 0;
	}
	
	public int findCurrentPointOfMonth(int userId){
		String sql =  " SELECT SUM(point) AS total "
					+ "	FROM (SELECT i.customized_id FROM custom_values AS i JOIN users AS u ON i.`value` = u.id WHERE i.custom_field_id = 7 AND u.id = :p_userId) AS us"
					+ " 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND `value` != 'Re-code (Bug)') AS t ON(us.customized_id=t.customized_id)"
					+ " 	JOIN ( "
					+ "			SELECT p.customized_id, p.`value` * 1 AS point "
					+ "			FROM custom_values AS p INNER JOIN issues AS i ON(p.customized_id=i.id) "
					+ "			WHERE p.custom_field_id = 11 AND (p.`value` * 1 > 0) AND DATE_FORMAT(i.closed_on, '%Y%m') = DATE_FORMAT(NOW(), '%Y%m') "
					+ "			GROUP BY p.customized_id, i.closed_on, p.`value` "
					+ "	) AS pt ON(pt.customized_id = us.customized_id) ";
	
		SqlQuery query = Ebean.createSqlQuery(sql);
		query.setParameter("p_userId", userId);		
		SqlRow row = query.findUnique();
		return (null != row && null != row.getInteger("total")) ? row.getInteger("total") : 0;
	}
	
	public int findPointOfMonth(int userId){
		String sql =  " SELECT SUM(point) AS total "
					+ "	FROM (SELECT i.customized_id FROM custom_values AS i JOIN users AS u ON i.`value` = u.id WHERE i.custom_field_id = 7 AND u.id = :p_userId) AS us "
					+ " 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND `value` != 'Re-code (Bug)') AS t ON(us.customized_id=t.customized_id)"
					+ " 	JOIN ( "
					+ "			SELECT p.customized_id, p.`value` * 1 AS point "
					+ "			FROM custom_values AS p INNER JOIN issues AS i ON(p.customized_id=i.id) "
					+ "			WHERE p.custom_field_id = 11 AND (p.`value` * 1 > 0) AND DATE_FORMAT(i.closed_on, '%Y%m') = DATE_FORMAT(NOW(), '%Y%m') "
					+ "			GROUP BY p.customized_id, i.closed_on, p.`value` "
					+ "	) AS pt ON(pt.customized_id = us.customized_id) ";
	
		SqlQuery query = Ebean.createSqlQuery(sql);
		query.setParameter("p_userId", userId);		
		SqlRow row = query.findUnique();
		return (null != row && null != row.getInteger("total")) ? row.getInteger("total") : 0;
	}
	
	public List<SqlRow> findPointOfHalfMonth(int userId){
		String sql =  " SELECT DATE_FORMAT(closed_on, '%m/%d') AS closed_on, SUM(point) AS total"
					+ "	FROM (SELECT i.customized_id FROM custom_values AS i JOIN users AS u ON i.`value` = u.id WHERE i.custom_field_id = 7 AND u.id = :p_userId ) AS us"
					+ " 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND `value` != 'Re-code (Bug)') AS t ON(us.customized_id=t.customized_id)"
					+ " 	JOIN ("
					+ "			SELECT p.customized_id, i.closed_on, p.`value` * 1 AS point"
					+ "			FROM custom_values AS p INNER JOIN issues AS i ON(p.customized_id=i.id)"
					+ "			WHERE p.custom_field_id = 11 AND (p.`value` * 1 > 0) AND DATE(i.closed_on) BETWEEN (DATE(NOW()) - INTERVAL 35 DAY) AND DATE(NOW())"
					+ "			GROUP BY p.customized_id, i.closed_on, p.`value`"
					+ "	) AS pt ON(pt.customized_id = us.customized_id)"
					+ "	GROUP BY DATE(closed_on)"
					+ "	ORDER BY DATE(closed_on)";
	
		SqlQuery query = Ebean.createSqlQuery(sql);
		query.setParameter("p_userId", userId);		
		return query.findList();
	}
	
	public List<SqlRow> findPointOfMember(){
		String sql =  " SELECT  fn.fullname, SUM(sum) AS total"
					+ " FROM ("
					+ "		SELECT us.id, us.fullname, t.`value` AS task_type, SUM(pt.`value`) AS sum"
					+ "		FROM (SELECT i.customized_id, u.id, CONCAT(u.firstname, u.lastname) AS fullname FROM custom_values AS i	JOIN users AS u ON i.`value` = u.id WHERE i.custom_field_id = 7) AS us"
					+ " 		JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND `value` != 'Re-code (Bug)') AS t1 ON(us.customized_id=t1.customized_id)"
					+ "			JOIN (SELECT i.customized_id, i.`value` FROM custom_values AS i WHERE i.custom_field_id = 12) AS t ON(t.customized_id=us.customized_id)"
					+ "			JOIN ("
					+ "				SELECT p.customized_id, i.closed_on, p.`value` * 1 AS `value`"
					+ "				FROM custom_values AS p INNER JOIN issues AS i ON(p.customized_id=i.id)"
					+ "				WHERE p.custom_field_id = 11 AND  (p.`value` * 1 > 0) AND YEAR(i.closed_on) = YEAR(NOW()) AND MONTH(i.closed_on) = MONTH(NOW())"
					+ "				GROUP BY p.customized_id, i.closed_on, p.`value`"
					+ "			) AS pt ON(pt.customized_id = us.customized_id)"
					+ "		GROUP BY us.id, us.fullname, t.`value`"
					+ "	) AS fn"
					+ "	GROUP BY fn.id, fn.fullname"
					+ "	ORDER BY total DESC";
	
		SqlQuery query = Ebean.createSqlQuery(sql);				
		return query.findList();
	}
	
	public List<SqlRow> findPointOfProject(){
		String sql =  " SELECT pj.id, pj.`name`, DATE_FORMAT(i.closed_on, '%m/%d') AS date_on, SUM(p.`value`) AS total"
					+ " FROM custom_values AS p	"
					+ "			JOIN issues AS i ON(p.customized_id=i.id) JOIN projects AS pj ON(i.project_id=pj.id)"
					+ " 	 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND (`value` != 'Test (Feature + Change)' OR `value` != 'Re-test (Bug)')) AS t ON(p.customized_id=t.customized_id)"				
					+ "	WHERE p.custom_field_id = 11 AND (p.`value` * 1 > 0) AND DATE(i.closed_on) BETWEEN (DATE(NOW()) - INTERVAL 6 DAY) AND DATE(NOW())"
					+ "	GROUP BY pj.id, DATE_FORMAT(i.closed_on, '%m/%d')"
					+ " ORDER BY total";
	
		SqlQuery query = Ebean.createSqlQuery(sql);				
		return query.findList();
	}
	
	public List<SqlRow> findPointEstOfProject(){
		String sql =  " SELECT pj.id, pj.`name`, DATE_FORMAT(i.created_on, '%m/%d') AS date_on, SUM(p.`value`) AS total"
					+ "	FROM custom_values AS p "
					+ "			JOIN issues AS i ON(p.customized_id=i.id) JOIN projects AS pj ON(i.project_id=pj.id)"
					+ " 	 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND (`value` != 'Test (Feature + Change)' OR `value` != 'Re-test (Bug)')) AS t ON(p.customized_id=t.customized_id)"
					+ "	WHERE p.custom_field_id = 13 AND (p.`value` * 1 > 0) AND DATE(i.created_on) BETWEEN (DATE(NOW()) - INTERVAL 6 DAY) AND DATE(NOW())"
					+ "	GROUP BY pj.id, DATE_FORMAT(i.created_on, '%m/%d')"
					+ "	ORDER BY total";
	
		SqlQuery query = Ebean.createSqlQuery(sql);				
		return query.findList();
	}
	
	public List<SqlRow> findPointEstOfProjectWithOpenIssue(){
		String sql =  " SELECT pj.id, pj.`name`, SUM(p.`value`) AS total"
					+ " FROM custom_values AS p "
					+ "			JOIN issues AS i ON(p.customized_id=i.id) JOIN projects AS pj ON(i.project_id=pj.id)"
					+ " 	 	JOIN (SELECT customized_id FROM custom_values WHERE custom_field_id=12 AND (`value` != 'Test (Feature + Change)' OR `value` != 'Re-test (Bug)')) AS t ON(p.customized_id=t.customized_id)"
					+ " WHERE p.custom_field_id = 13 AND (p.`value` * 1 > 0) AND i.closed_on IS NULL"
					+ "	GROUP BY pj.id";

		SqlQuery query = Ebean.createSqlQuery(sql);				
		return query.findList();
	}
	
	public List<SqlRow> findTodoList(int userId){
		String sql =  "	SELECT p.name AS project_name, i.id, i.subject, cd2.`value` AS due_date, i.status_id, i.priority_id, cp.`value` AS est_point"
					+ "	FROM `issues` AS i JOIN projects AS p ON(i.project_id=p.id)"
					+ "	LEFT JOIN custom_values AS cd2 ON(cd2.customized_id=i.id AND cd2.custom_field_id=10)"
					+ "	LEFT JOIN custom_values AS cp ON(cp.customized_id=i.id AND cd2.custom_field_id=13)"
					+ "	WHERE i.`assigned_to_id` = :p_userId AND i.`status_id` IN(1,2,3,6,7,8,9) AND p.status=1"
					+ "	ORDER BY i.priority_id DESC, i.updated_on DESC";		
		
		SqlQuery query = Ebean.createSqlQuery(sql);
		query.setParameter("p_userId", userId);		
		return query.findList();
	}
	
	public List<SqlRow> findActivity(){
		return null;
	}
	
	public List<SqlRow> findIssue(int status, int date){
		String where = " AND i.status_id IN(1,2,3,6,7,8,9) ";		
		if(1 == status){
			where = " AND i.status_id = 5 ";			
			switch(date){
				case 4://last month
					where += " AND YEAR(i.closed_on)=YEAR(CURDATE()) AND MONTH(i.closed_on)=MONTH(DATE_ADD(CURDATE(), INTERVAL -1 MONTH))";
					break;
				case 3://this month
					where += " AND YEAR(i.closed_on)=YEAR(CURDATE()) AND MONTH(i.closed_on)=MONTH(CURDATE())";
					break;
				case 2://last week
					where += " AND DATE(i.closed_on) BETWEEN DATE_ADD(CURDATE(),INTERVAL -(WEEKDAY(CURDATE()) + 7) DAY) AND DATE_ADD(CURDATE(),INTERVAL -(WEEKDAY(CURDATE()) + 1) DAY)";	
					break;
				default://this week
					where += " AND DATE(i.closed_on) BETWEEN DATE_ADD(CURDATE(),INTERVAL -WEEKDAY(CURDATE()) DAY) AND CURDATE()";
					break;
			}
		}		
		
		String sql =  " SELECT i.id, p.`name`, i.`subject`, CONCAT(u.firstname, u.lastname) AS fullname, i.status_id, i.priority_id, i.tracker_id, i.parent_id, ept.value AS est_point, 0 AS point, cd2.`value` AS due_date"
					+ " FROM issues AS i"
					+ "		 LEFT JOIN custom_values AS cd2 ON(cd2.customized_id=i.id AND cd2.custom_field_id=10)"
					+ "		 LEFT JOIN (SELECT customized_id, `value` FROM custom_values WHERE custom_field_id=13 AND `value` * 1 > 0) AS ept ON(ept.customized_id=i.id)"
					+ " 	 JOIN projects AS p ON i.project_id = p.id"					
					+ " 	 JOIN users AS u ON i.assigned_to_id = u.id"
					+ " WHERE p.`status` = 1 "
					+ where
					+ " ORDER BY p.`name`, IF(i.parent_id IS NULL, i.id, i.parent_id), i.parent_id";
		
		SqlQuery query = Ebean.createSqlQuery(sql);				
		return query.findList();
	}
}
