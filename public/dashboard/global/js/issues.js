/* 
 * 	issues client-side 
 *  @author VuNguyen vunv.shinway@gmail.com
 */

;(function($){
	$.fn.Issues = function(){};
	
	$.fn.Issues.fillData = function(url, status, date){
		$.blockUI();
		$.post(url, {'req':'findIssue','status':status,'date': date}, function(data){
			  if(data.data){
			    
			    var project = {}
			    var issues = []
			    
			    $.each(data.data, function(index, val){
				      if(!project[val.name]) project[val.name] = {};
				      if(val.parent_id == null)
				        project[val.name][val.subject] = val;
				      else issues.push(val)
			    
			    })
			    
			    //total issues
			     $.each(project, function(index, val){
			            $.each(val, function(i, v){
				              var total = 0;
				              $.each(issues, function(i1, v1){
					                if(v1.parent_id == v.id)
					                	total+= parseInt(v1.est_point!=null?v1.est_point:0);
					                 
				              })
				              project[index][i]["total"] = total;
			          
			        })
           
			    })
			    //project_toal
			    var project_total = {};
	            $.each(project, function(index, val){
		               var total = 0;
		               $.each(val, function(i, v){
		            	   total += v.total;
		               })
		               project_total[index]= total; 
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
			 
			    
			    var index = 1;
			     $.each(project, function(key, val){
			         
				        var rowProject_name = $.fn.Dashboard.template('<tr class="treegrid-{index}">'
											                              +'<td>{project_name}</td>'
											                              +'<td></td>'
											                              +'<td>{point} điểm</td>'
											                              +'<td></td>'
											                              +'<td></td>'
											                              +'<td></td>'
											                              +'</tr>',
											                              {"project_name": key,
											                               "index":index,
											                            	"point":project_total[key]});
				        $(".tree-projects tbody").append(rowProject_name);
				        index++;
				        var index1 = index;
				       
				        $.each(val, function(k, v){
				           
				           var rowParent = $.fn.Dashboard.template(
				              '<tr class="treegrid-{index} treegrid-parent-{index1}">'
				                 +'<td><a class="text-primary" target = "_blank" href="http://192.168.100.102/issues/{id}">{project_subject}</a></td>'
				                          +'<td>{fullname}</td>'
				                          +'<td>{point} điểm</td>'
				                          +'<td>{status}</td>'
				                          +'<td>{deadline}</td>'
				                          +'<td><div class="label {priorityColor}">{priority}</div></td>'
				             + '</tr>',{"project_subject":v.subject,
				                	 	"id":v.id,
					                	 "index": index,
					                	 "index1":index1 - 1,
					                	 "fullname":v.fullname,
					                	 "point":v.total,
					                	 "status":statusToString(v.status_id),
					                	 "deadline":v.due_date?v.due_date:"",
					                	 "priority":priorityToString(v.priority_id)[0],
					                	 "priorityColor":priorityToString(v.priority_id)[1]});
				            $(".tree-projects tbody").append(rowParent);
				             index++;
				             var index2 = index;
				            
				             $.each(issues, function(k1, v1){
				               if(v1.parent_id == v.id){
				            	   
				            	 
				            	   
				            	   //priority
				            	   var priority = "";
				            	   var priorityColor = "";
				            	   switch(v1.priority_id){
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
				            	   
				            	   //status
				            	   var status = "";
				            	   switch(v1.status_id){
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
				            	   
				                    var row =  $.fn.Dashboard.template('<tr class="treegrid-{index} treegrid-parent-{index2}">'
				                                            +'<td><a class="text-primary" target = "_blank" href="http://192.168.100.102/issues/{id}">{subject}</a></td>'
				                                            +'<td>{fullname}</td>'
				                                            +'<td>{point}</td>'
				                                            +'<td>{status}</td>'
				                                            +'<td>{deadline}</td>'
				                                            +'<td>'
				                                            +'<div class="label {priorityColor}">{priority}</div>'
				                                            +'</td>'
				                                            +'</tr>',{"index": index,
				                                            					"index2":index2 -1,
				                                            					"id":v1.id,
				                                            					"subject":v1.subject,
				                                            					"fullname": v1.fullname,
				                                            					"point":v1.est_point ? v1.est_point : "" ,
				                                            					"status":status,
				                                            					"deadline": v1.due_date ? v1.due_date : "",
				                                            					"priority":priority,
				                                            					"priorityColor":priorityColor});
				                    $(".tree-projects tbody").append(row); 
				                    index++;
				               }
				         })   
			        }) 			        
			     })  
			  }
			  $('.tree-projects').treegrid({
		            expanderExpandedClass: 'fa fa-caret-down',
		            expanderCollapsedClass: 'fa fa-caret-right',
		            //'initialState': 'collapsed',
		        });
			  $.unblockUI();		  
		})

	};
	$.fn.Issues.load = function(url){
		
		$.fn.Issues.fillData(url,'1', '2');
		$("#lblClosed").click(function(){
			$(".form-control").hide();
		})
		$("#lblOpen").click(function(){
			$(".form-control").show();
		})
		
			
	};
	
})(jQuery);