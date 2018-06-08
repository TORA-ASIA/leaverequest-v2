function LRMyLeaveRemailViewModel(parent){
	var self =this;
	
	ko.contentDialog.show();

    
	this.leavedays = ko.observableArray([]);

	this.loadAllLeaveDay= function(callback){		    		    
		ToraAsiaLeaveRequestInfo.Services.GetLeaveRemain(self.leavedays,_spPageContextInfo.userId).then(function(){
				//OK
				//console.log(self.leavedays());
				callback();

		});
	}
	this.calulateDay = function(data){
		//console.log(data);
		var maxd = parseInt(data.MaxLeaveValue.toString(),10);
		var inprod = parseInt(data.MyUseDay.inprogress.toString(),10);
		var appd = parseInt(data.MyUseDay.approve.toString(),10);
		return maxd - inprod - appd ;
	}
	this.loadAllLeaveDay(function(){
		ko.contentDialog.hide();
	});

}
