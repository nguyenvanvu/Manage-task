;(function($){
	$.fn.Dashboard = function(){};	
	$.fn.Dashboard.chartA = function(url){
		$.fn.Project.load(url);
		
		$.post(url, {'req':'findMaxPointOfMonth'}, function(data){
			
			 var result = 0;
			 if(data.data && data.data.max_of_month != 0){

				 var current_day = (new Date()).getDate();
				    var current_month = data.data.current_month;
				    var max_of_month = data.data.max_of_month;
				    result = (current_month*100*30)/(max_of_month*current_day);
				    if(result > 100) result = 100;
				    result = Math.round(result);
				    
				    
			  }
			 
			 (new JustGage({
		            id: "gauge-chart",
		            value: result,
		            min: 0,
		            max: 100,
		            //title: "",
		            showInnerShadow: false,
		            levelColorsGradient: false
		        }));
			});
	}
	
	$.fn.Dashboard.chartB = function(url){

		$.post(url, {'req':'findPointOfMonth'}, function(data){
		  var result = 0;
		  if(data.data){
		    var pointOfMonth = data.data;
		    if(pointOfMonth >= 35){
		    	$(".chart-s1").addClass("active");
		    }
		    if(pointOfMonth >= 45){
		    	$(".chart-s2").addClass("active");
		    }
		    if(pointOfMonth >= 60){
		    	 
		    	  $(".chart-s3").addClass("active");
		    }
		    
		    result = (pointOfMonth*100)/60;
		  }
		  if(result > 100) result = 100;
		  result = result + '%';
		  $(".my-point").height(result);
		})
	}
	
	$.fn.Dashboard.chartC = function(url){
		$.post(url, {'req':'findPointOfMonth'}, function(data){
			  if(data.data){
			    
				    pointOfMonth = data.data;
				    $("#points").text( pointOfMonth);
				    if(pointOfMonth < 35 ){    
				         $("#pointConLai").text  ( 35 - pointOfMonth) ;
				         $("#level-s").text("S1"); 
				    }else if(pointOfMonth < 45 ){
				        
				         $("#pointConLai").text( 45 - pointOfMonth) ;
				         $("#level-s").text("S2") 
				    }else if(pointOfMonth < 60 ){
				        
				         $("#pointConLai").text( 60 - pointOfMonth );
				         $("#level-s").text("S3"); 
				    }else{
				    	$("#pointConLai"). text(0) ;
				       	$("#level-s").text("S3")
				    }
			    
			  }    
			})
	}
	
	$.fn.Dashboard.chartPointList = function(url){
		 $.post(url, {'req':'findPointOfHalfMonth'}, function(data){
		 	   var d1 = [
		 	              ["15/09", 10],
		 	              ["16/09", 26],
		 	              ["17/09", 49],
		 	              ["18/09", 46],
		 	              ["19/09", 54],
		 	              ["20/09", 29],
		 	              ["21/09", 42],
		 	              ["22/09", 13],
		 	              ["21/09", 42],
		 	              ["22/09", 13],
		 	              ["23/09", 57],
		 	              ["24/09", 35],
		 	              ["25/09", 48],
		 	              ["26/09", 26],
		 	              ["27/09", 49],
		 	              ["28/09", 46],
		 	              ["29/09", 54],
		 	              ["30/09", 29]
		 	          ];
		 	          
		 	  
		 	   if(data.data){
		 		   d1 = [];
		 		   $.each(data.data, function(i,val){
		 			   var arr = [val.closed_on,val.total];
		 			   d1.push(arr);
		 		   });
		 		   
		 	   }
		 	   $.plot("#chart-point-list", [
		 	                                {
		 	                                    data: d1,
		 	                                    label: "Point",
		 	                                    color: "#e0e0e0"
		 	                                }
		 	                            ], {
		 	                                series: {
		 	                                    bars: {
		 	                                        align: "center",
		 	                                        lineWidth: 0,
		 	                                        show: !0,
		 	                                        barWidth: .6,
		 	                                        fill: .9
		 	                                    }
		 	                                },
		 	                                grid: {
		 	                                    borderColor: "#fafafa",
		 	                                    borderWidth: 1,
		 	                                    hoverable: !0
		 	                                },
		 	                                tooltip: !0,
		 	                                tooltipOpts: {
		 	                                    content: "%x : %y",
		 	                                    defaultTheme: true
		 	                                },
		 	                                xaxis: {
		 	                                    tickColor: "#fafafa",
		 	                                    mode: "categories"
		 	                                },
		 	                                yaxis: {
		 	                                    tickColor: "#fafafa"
		 	                                },
		 	                                shadowSize: 0
		 	                            });
	
		});
	}
	
	$.fn.Dashboard.listPointMember = function(url){
		$.post(url, {'req':'findPointOfMember'}, function(data){
			  if(data.data){
			    $.each(data.data , function(i, val){
			      var size =  $(data.data).size();
			      if( i < size/2 ){
			         var rowleft = $.fn.Dashboard.template('<tr><td>{stt}</td><td>{name}</td><td>{point} điểm</td></tr>',{'stt': i + 1,'name':val.fullname ,'point':val.total});
			         $("#table-striped-left").append(rowleft);
			      }else{
			         var rowright = $.fn.Dashboard.template('<tr><td>{stt}</td><td>{name}</td><td>{point} điểm</td></tr>',{'stt': i + 1,'name':val.fullname ,'point':val.total});
			        $("#table-striped-right").append(rowright);
			      
			      }
			      
			    })
			  }
			})
	}
	$.fn.Dashboard.toDoList = function(url){
		$.post(url, {'req':'findTodoList'}, function(data){
			  if(data.data){
			    $.each(data.data, function(i, val){
			      var est_point = val.est_point;
			      var due_date = val.due_date;
			      if(!val.est_point)
			         est_point = 0;
			       if(!val.due_date)
			         due_date = "";
			       var level = "level1";
			      switch(val.priority_id){
			        case 5 :
			        case 4:
			          level = "level1";
			           break;
			        case 3: 
			          level = "level2";
			          break;
			        case 2: 
			          level = "level3";
			          break;
			        case 1:
			          level = "level4";
			          break;
			        default: 
			          level = "level1";
			      }
			      
			       var row = $.fn.Dashboard.template('<li class="list-group-item {level}">'
			                                               +   '<a target="_blank" href="{link_issues}">{project_name}'
			                                               +       '<div class="clear mtx">'
			                                               +           '<div class="tk-point">{est_point} điểm</div>'
			                                               +               '<div class="tk-deadline">{due_date}</div>'
			                                               +         '</div>'
			                                               +    '</a>'
			                                               +  '</li>',{'level': level,'link_issues':"http://192.168.100.102/issues/" + val.id,'project_name':val.subject, 'est_point': est_point,'due_date': due_date});
			    
			     
			      $(".sidebar-second ul").append(row);	
			    
			    });
			  }

			});


		
	}
	$.fn.Dashboard.slimscrollTodo  = function(){
		 $('.list-todo-scroll').slimScroll({
	            "width": '100%',
	            "height": '250px',
	            "wheelStep": 5
	        });
	}
	
	$.fn.Dashboard.handleTreeGrid = function(){
		 $('.tree-projects').treegrid({
	            expanderExpandedClass: 'fa fa-caret-down',
	            expanderCollapsedClass: 'fa fa-caret-right'
	        });
	}
	$.fn.Dashboard.load = function(url){		
		$.fn.Dashboard.chartA(url);
		$.fn.Dashboard.chartB(url);
		$.fn.Dashboard.chartC(url);
		$.fn.Dashboard.chartPointList(url);
		$.fn.Dashboard.listPointMember(url);
		$.fn.Dashboard.toDoList(url);
		$.fn.Dashboard.slimscrollTodo();
		
	};
	
	$.fn.Dashboard.project = function(url){
		$.fn.Dashboard.toDoList(url);
		$.fn.Dashboard.slimscrollTodo();
		$.fn.Dashboard.handleTreeGrid();		
	};
	
	$.fn.Dashboard.member = function(url){
		$.fn.Dashboard.toDoList(url);
		$.fn.Dashboard.slimscrollTodo();
		$.fn.Dashboard.handleTreeGrid();
	};
	
	$.fn.Dashboard.template = function(str, params){		
		if(str && params){
			return str.replace(/\{([^\}]+)\}/g, function(substr, found){
				return params[found];
			});
		}
	 
		return str;
	};
})(jQuery);