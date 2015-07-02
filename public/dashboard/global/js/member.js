;(function($){
	$.fn.Member = function(){};
	$.fn.Member.fillData = function(url,status,date){
		$.blockUI();
		$.post(url, {'req':'findIssue','status': status,'date':date}, function(data){
			  
	          var member = {}
	          var member_point = {}	
	          $.each(data.data, function(index, val){
					      if(!member[val.fullname]) member[val.fullname] = {};
					      if(!member[val.fullname][val.name]) member[val.fullname][val.name]= {};
					      member[val.fullname][val.name][val.subject] = val;
					      if(!member_point[val.fullname])  member_point[val.fullname] = 0;
					      member_point[val.fullname] += parseInt(val.est_point!=null?val.est_point:0);
				    
				    })
				    
			function priorityToString(priority_id){
		    	  var priority = "";
            	   var priorityColor = "";
            	   switch(priority_id){
	            	   case 1:
	            		   priority = "Low";
	            		   priorityColor = "label-success";
	            		   break;
	            	   case 2:
	            		   priority = "Normal";
	            		   priorityColor = "label-success";
	            		   break;
	            	   case	3:
	            		  
	            		   priority = "Hight";
	            		   priorityColor = "label-danger";
	            		   break;
	            	   case 4:
	            		   priority = "Urgent";
	            		   priorityColor = "label-danger";
	            		   break;
	            	   case 5:
	            		   priority = "Immediate";
	            		   priorityColor = "label-danger";
	            		   break;
	            		default: 
	            			
	            			break;
	            			   
            	   }
            	   return [priority,priorityColor];
            	   
		    }
	          
		     function statusToString(status_id){
				    	 	var status = "";
		            	   switch(status_id){
				            	   case 1:
				            		   status = "New";
				            		   break;
				            	   case 2:
				            		   status = "In Progress";
				            		   break;
				            	   case 3:
				            		   status = "Resolved";
				            		   break;
				            	   case 6:
				            		   status = "Feedback";
				            		   break;
				            	   case 7:
				            		   status = "VNS Tested";
				            		   break;
				            	   case 8:
				            		   status = "JPS Uploaded";
				            		   break;
				            	   case 9:
				            		   status = "Pending";	
				            		   break;
				            	   case 5:
				            		   status = "Closed";
				            		   break;
				            	   default: break;	   
		            	   }
		            	   return status;
		            	   
			}
		  
		     function trackerToString(tracker_id){
		    	 switch(tracker_id){
		    	 case 1:
		    		 return "Bug";
		    	 case 2:
		    		 return "Feature";
		    	 case 3:
		    		 return "Change";
		    	 case 4:
		    		 return "Task";
		    	 case 5:
		    		 return "Question";
		    	default: 
		    		return "";
		    	 }
		     }
	          var index = 1; 
	          $.each(member, function(key, val){
	                var rowMember = $.fn.Dashboard.template('<tr class="treegrid-{index}">'
												                              +'<td>{fullname}</td>'
												                              +'<td></td>'
												                              +'<td>{point} điểm</td>'
												                              +'<td></td>'
												                              +'<td></td>'
												                              +'<td></td>'
												                              +'</tr>',
												                              {"fullname": key,
												                               "index":index,
												                               "point": member_point[key]
												                            	});
					$(".tree-projects tbody").append(rowMember);
	                index++;
	                var index1 = index;
	                $.each(val, function(k, v){
	                	 var project_total = 0;
	                	 $.each(v, function(k1, v1){
	                		 project_total += parseInt(v1.est_point!=null?v1.est_point:0);
	                	 })
	                     var rowProject = $.fn.Dashboard.template(
	                          '<tr class="treegrid-{index} treegrid-parent-{index1}">'
	                             		  +'<td>{project_name}</td>'
	                                      +'<td></td>'
	                                      +'<td>{project_total} điểm</td>'
	                                      +'<td></td>'
	                                      +'<td></td>'
	                                      +'<td></td>'
	                         + '</tr>',
	                             	{"project_name":k,
			                         "index": index,
			                         "index1":index1 - 1,
			                         "project_total":project_total
	                      });
					      $(".tree-projects tbody").append(rowProject);
					      index++;
					      var index2 = index;
					      $.each(v, function(k1, v1){
	                          	var row =  $.fn.Dashboard.template('<tr class="treegrid-{index} treegrid-parent-{index2}">'
							                                            +'<td><a class="text-primary" target = "_blank" href="http://192.168.100.102/issues/{id}">{subject}</a></td>'
							                                            +'<td>{tracker}</td>'
							                                            +'<td>{point}</td>'
							                                            +'<td>{status}</td>'
							                                            +'<td>{deadline}</td>'
							                                            +'<td><div class="label {priorityColor}">{priority}</div></td>'
							                                         +'</tr>',
					                                            {"index": index,
					                                            "index2":index2 -1,
					                                            "id":v1.id,
					                                            "subject":v1.parent_id ? "> " + v1.subject:v1.subject,
					                                            "point": v1.est_point?v1.est_point:0 ,
					                                            "status":statusToString(v1.status_id),
					                                            "deadline":v1.due_date?v1.due_date:"",
					                                            "priority":priorityToString(v1.priority_id)[0],
					                                            "priorityColor":priorityToString(v1.priority_id)[1],
					                                            "tracker":trackerToString(v1.tracker_id)
					                                            
					            });
	                          	$(".tree-projects tbody").append(row); 
					            index++;
	                    })  
	                })
	          }) 
	          
	          $('.tree-projects').treegrid({
		            expanderExpandedClass: 'fa fa-caret-down',
		            expanderCollapsedClass: 'fa fa-caret-right',
		            //'initialState': 'collapsed',
		      });
	          
	          $.unblockUI();
		})
	};
	$.fn.Member.load = function(url){
		$.fn.Member.fillData(url,'','');
		$("#lblClosed").click(function(){
			$(".form-control").hide();
		})
		$("#lblOpen").click(function(){
			$(".form-control").show();
		})
		$( "#cboDate" ).change(function() {
			
			//$.fn.Member.fillData(url,'1','2');
		});
		
	};

})(jQuery);