;(function($){
	$.fn.Project = function(){};
	
	$.fn.Project.row = function(){
		var row = {};
		for(i=6; i>-1; i--){
			var day = Date.today().add(-i).days().toString("MM/dd");
			row[day] = {'fin':0, 'est':0};	
			
		}		
		return row;
	};
	
	$.fn.Project.load = function(url){
		$.post(url, {'req':'findPointOfProject'}, function(data){
			var total = $.fn.Project.row();
			var result = {};
			var project = {};
			
			if(data.data.open_issue){
				$.each(data.data.open_issue, function(index, row){
					project[row.name] = row.total;
				});
			}
			if(data.data.estimated){
				$.each(data.data.estimated, function(index, row){
					if(!result[row.name]){
						result[row.name] = $.fn.Project.row();								
					}					
					result[row.name][row.date_on].est = row.total;
					total[row.date_on].est += parseInt(row.total);
				});
			}
			if(data.data.finished){
				$.each(data.data.finished, function(index, row){
					if(!result[row.name]){
						result[row.name] = $.fn.Project.row();								
					}					
					result[row.name][row.date_on].fin = row.total;
					total[row.date_on].fin += parseInt(row.total);
				});	
			}
			
			$.fn.Project.display(result, project, total);
		})
	};
	
	$.fn.Project.display = function(result, project, total){		
		$(".dashboard_running_project_list > thead > tr").remove();
		$(".dashboard_running_project_list > tbody > tr").remove();		
		
		var header = '<tr><th>Tên</th>';
		for(i=6; i>-1; i--){
			var day = Date.today().add(-i).days().toString("MM/dd");
			header += '<th>' + day + '</th>';	
		}
		header += '<th>Đã xong</th><th>Còn lại</th></tr>';		
		$(".dashboard_running_project_list > thead").append(header);
		
		var finished = 0;
		var not_yet = 0;
		
		var contents = new Array();
		$.each(result, function(name, row){
			var fin = 0;
			var est = project[name] || 0;
			not_yet	+= est;
				
			content = '<tr><td>' + name + '</td>';
            $.each(row, function(index, col){
				fin += col.fin*1;
				finished += col.fin*1;
				content += '<td align="center">+' + col.est*1 + '/-' + col.fin*1 + '</td>';
			});
            content += '<td align="center">' + fin + '</td><td align="center">' + est + '</td></tr>';			
			contents.push({'text':content, 'value':est});
		});
		
		contents.sort(function(a, b){
		   if(a.value > b.value){
				return -1;
		   }
		   else if(a.value < b.value){
				return 1;
		   } 
		   return 0;
    	});
		
		if(total){
			content = '<tr><td style="font-weight:bold;">Tổng số</td>';
			$.each(total, function(index, value){
				content += '<td align="center" style="font-weight:bold;">+' + value.est + '/-' + value.fin + '</td>';
			});
			content += '<td align="center" style="font-weight:bold;">' + finished + '</td><td align="center" style="font-weight:bold;">' + not_yet + '</td></tr>';
			$(".dashboard_running_project_list > tbody").append(content);
		}
		
		$.each(contents, function(index, row){
			$(".dashboard_running_project_list > tbody").append(row.text);
		});
	};
})(jQuery);