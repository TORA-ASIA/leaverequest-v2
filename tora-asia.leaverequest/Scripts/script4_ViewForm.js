function LRApproveViewModel(parent,itemId,taskid,backtoform,isviewonly,showdate,ishrform){
   //taskid,ishrform
    ko.contentDialog.show();
    showdate = (typeof showdate!== "undefined"?showdate:false);
    ishrform = (typeof ishrform!== "undefined"?ishrform:false)

	var self =this;
	this.listTasksTitle = ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.Title;
	this.listFormTitle = ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title;
	this.dateformate = ko.dateformat.normal;
	this.isHR =  ko.observable(parent.isHr());
	this.isManager =  ko.observable(parent.isManager());
	this.ishrForm =  ko.observable(ishrform);
	this.backtoform = ko.observable(backtoform );
	this.isviewOnly = ko.observable(isviewonly);
	this.isOwner = ko.observable((backtoform === 'idhomepage'||backtoform ==='idmyhistory'));

	this.BackToText = ko.observable(isviewonly?"Close":"Cancel" );
	
	this.isshowdate  = ko.observable(showdate );
	
	this.title= ko.observable();
	this.leavetype = ko.observable();
	this.otherleavetype= ko.observable();
	this.fromdate = ko.observable();	
	this.fromdatetype = ko.observable();
	this.todatevisible = ko.observable(false);
	this.todate = ko.observable();
	this.todatetype = ko.observable();	
	this.totalday = ko.observable();    
    this.phonenumber= ko.observable();
	this.reason= ko.observable();		
	this.leavedays = ko.observableArray([]);
	this.requesterId = ko.observable();
	this.taskreason= ko.observable();
	this.leavestatus = ko.observable();
	this.cancelleavestatus = ko.observable();
	this.cancelworkflow = ko.observable();
	this.istaskgenerate = ko.observable(false);
	this.isgraterthentoday = ko.observable(true);
	this.singleLeaveremail =  ko.computed(function() {
        return ko.utils.arrayFilter(self.leavedays(), function(d) {
				return d.Title === 	self.leavetype()                
		});

    }, this);
	this.calulateDay = function(data){
		//console.log(data);
		var maxd = parseInt(data.MaxLeaveValue.toString(),10);
		var inprod = parseInt(data.MyUseDay.inprogress.toString(),10);
		var appd = parseInt(data.MyUseDay.approve.toString(),10);
		return maxd - appd ;
	}
	this.SaveTasksClick = function(type,data){
		swal({
		  title:"Are you sure to "+type+" ?",
		 // text: "To create Lists!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		   // swal("Poof! Your imaginary file has been deleted!", {
		    //  icon: "success",
		   // });
		   		ko.contentDialog.show();
		   		var approvestatus = (type==="Approve"?type+"d":type+"ed");
					//console.log(approvestatus );
					var setfieldata = [
									{
										Title:"TaskReason",
										Value: self.taskreason()
									},	
									{
										Title:"PercentComplete",
										Value: 1
									},	
									{
										Title:"Status",
										Value: 'Completed'
									},	
									{
										Title:"TaskOutcome",
										Value: approvestatus 
									}								
								];
					var optioninside = {
					            listTitle:self.listTasksTitle,
					            data :setfieldata,
								itemid :taskid
				    }
				   // parent.navLinkClick("idapprove");
				    ko.SaveDatatoList(optioninside ,function(id){   
				    		//self.courseID (id);
			            	//self.saveImagefilesVideo(self.title(),id);
			            	swal(type+" Success", {
							      icon: "success",
							    }).then(() => {
									ko.contentDialog.hide();
				            	    parent.navLinkClick(self.backtoform());							
				           });	
			            	//if(!self.ishrForm()){
			            	//	parent.navLinkClick(self.backtoform());
			            	//}
			            	//else{
			            	//	 parent.navLinkClick("idhrapprove");
			            	//}
					});
		  } 		
		 });

		/*var r = confirm("Are you sure to "+type+" ?");
		if(r){
					var approvestatus = (type==="Approve"?type+"d":type+"ed");
					//console.log(approvestatus );
					var setfieldata = [
									{
										Title:"TaskReason",
										Value: self.taskreason()
									},	
									{
										Title:"PercentComplete",
										Value: 1
									},	
									{
										Title:"Status",
										Value: 'Completed'
									},	
									{
										Title:"TaskOutcome",
										Value: approvestatus 
									}								
								];
					var optioninside = {
					            listTitle:self.listTasksTitle,
					            data :setfieldata,
								itemid :taskid
				    }
				   // parent.navLinkClick("idapprove");
				    ko.SaveDatatoList(optioninside ,function(id){   
				    		//self.courseID (id);
			            	//self.saveImagefilesVideo(self.title(),id);
			            	alert("Save Success");
			            	parent.navLinkClick(self.backtoform());
			            	//if(!self.ishrForm()){
			            	//	parent.navLinkClick(self.backtoform());
			            	//}
			            	//else{
			            	//	 parent.navLinkClick("idhrapprove");
			            	//}
					});

			
		}*/
	
	}
    this.CancelClick = function(data){
    	swal({
		  title:"Are you sure to cancel?",
		 // text: "To create Lists!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		   // swal("Poof! Your imaginary file has been deleted!", {
		    //  icon: "success",
		   // });
		   		ko.contentDialog.show();
					var setfieldata = [
									{
										Title:"CancelWorkflow",
										Value: "true"
									}
					];
					var optioninside = {
					      listTitle:self.listFormTitle ,
					      data :setfieldata,
						  itemid :itemId
				    }
		   							   
		   							   
		   							   // parent.navLinkClick("idapprove");
				    ko.SaveDatatoList(optioninside ,function(id){   
				    		//self.courseID (id);
			            	//self.saveImagefilesVideo(self.title(),id);
			            	swal("Cancel Success", {
							      icon: "success",
							    }).then(() => {
									ko.contentDialog.hide();
				            	    parent.navLinkClick(self.backtoform());					
				           });	
			            	//if(!self.ishrForm()){
			            	//	parent.navLinkClick(self.backtoform());
			            	//}
			            	//else{
			            	//	 parent.navLinkClick("idhrapprove");
			            	//}
					});
		  } 		
		 });
/*
		var r = confirm("Are you sure to cancel?");
		if(r){
				var setfieldata = [
									{
										Title:"CancelWorkflow",
										Value: "true"
									}
					];
					var optioninside = {
					      listTitle:self.listFormTitle ,
					      data :setfieldata,
						  itemid :itemId
				    }
				   // parent.navLinkClick("idapprove");
				    ko.SaveDatatoList(optioninside ,function(id){   

						alert("Save Success");
					    parent.navLinkClick(self.backtoform());

						//ToraAsiaLeaveRequestInfo.Services.deleteCancelRequestTask(id).then(function(e){
						//	alert("Save Success");
					    //    parent.navLinkClick(self.backtoform());
		
						//},function(e){
						//	console.log(e);
						//})


					});


		}
	*/
	}
	this.ReqquestCancelClick= function(data){
		 swal({
		  title:"Are you sure to Request Cancel?",
		 // text: "To create Lists!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		   // swal("Poof! Your imaginary file has been deleted!", {
		    //  icon: "success",
		   // });
		   		ko.contentDialog.show();
					var addfieldata = [
						{
							Title:"RequestType",
							Value: "Cancel"
						},
						{
							Title:"CancelLeaveStatus",
							Value: "In Progress"
						}														
					];
					var optioninside = {
					            listTitle:self.listFormTitle ,
					            data :addfieldata,
								itemid :itemId
				    }
		   							   
		   							   
		   							   // parent.navLinkClick("idapprove");
				    ko.SaveDatatoList(optioninside ,function(id){   
				    		//self.courseID (id);
			            	//self.saveImagefilesVideo(self.title(),id);
			            	swal("Request Cancel Success", {
							      icon: "success",
							    }).then(() => {
									ko.contentDialog.hide();
				            	    parent.navLinkClick(self.backtoform());					
				           });	
			            	//if(!self.ishrForm()){
			            	//	parent.navLinkClick(self.backtoform());
			            	//}
			            	//else{
			            	//	 parent.navLinkClick("idhrapprove");
			            	//}
					});
		  } 		
		 });
/*
		var r = confirm("Are you sure to Request Cancel?");
		if(r){
			//console.log(self.errors().length);
			var addfieldata = [
						{
							Title:"RequestType",
							Value: "Cancel"
						},
						{
							Title:"CancelLeaveStatus",
							Value: "In Progress"
						}														
					];
					var optioninside = {
					            listTitle:self.listFormTitle ,
					            data :addfieldata,
								itemid :itemId
				    }
				    ko.SaveDatatoList(optioninside ,function(id){   
			            	alert("Request Cancel Success");
					        parent.navLinkClick(self.backtoform());
					});
		}

*/
	
	}

	this.queryLeaveForm=function(callback){
		 var options = {
				listTitle:self.listFormTitle ,
				fileData :[
					{field:"Title",type:"Default",typefield:"Title"},
					{field:"LeaveType"},
					{field:"StartDate",type:"Date",format:self.dateformate},
					{field:"StartTime"},
					{field:"EndDate",type:"Date",format:self.dateformate},
					{field:"EndTime"},
					{field:"NumberOfDay"},
					{field:"Reason"},
					{field:"PhoneNumber"},
					{field:"LeaveStatus"},
					{field:"CancelLeaveStatus"},
					{field:"OtherLeaveType"},
					{field:"Requester"},
					{field:"CancelWorkflow"}									  
				],
				ItemId:itemId
			}

			ko.queryDataById(options,function(dataitem){
				if(dataitem){
					//console.log(dataitem);
					self.title(dataitem.Title);
					self.leavetype(dataitem.LeaveType);
					self.otherleavetype(dataitem.OtherLeaveType);
					self.fromdate(dataitem.StartDate);	
					self.fromdatetype(dataitem.StartTime);
					var a = moment(dataitem.StartDate);
					var b = moment(moment().format(self.dateformate));
					var adifb = a.diff(b, 'days');
					//console.log(adifb );
					self.isgraterthentoday(adifb < 1);
					if(dataitem.EndTime !== null){
						self.todatevisible(true);
						self.todate(dataitem.EndDate);
						self.todatetype (dataitem.EndTime);	
					}
					self.totalday(dataitem.NumberOfDay);    
				    self.phonenumber(dataitem.PhoneNumber);
					self.reason(dataitem.Reason);
					if(dataitem.Requester!== null){
						self.requesterId(dataitem.Requester.get_lookupId());
					}
					self.leavestatus(dataitem.LeaveStatus);
					self.cancelleavestatus (dataitem.CancelLeaveStatus);
					self.cancelworkflow(dataitem.CancelWorkflow);
				}	
				callback();
			})
	
	}
	this.queryLeaveForm(function(){
		//console.log(self.requesterId());
		if(self.isshowdate()){
			ko.contentDialog.show();
			var allquery = [];
			var allquerystr = "";
				allquery.push(String.format(ko.defaultquery,"Eq","Title","Text",self.leavetype(),"","")); 
				
			if(allquery.length > 0){
			   	allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
			}
	 
		    		    
			ToraAsiaLeaveRequestInfo.Services.GetLeaveRemain(self.leavedays,self.requesterId(),allquerystr ).then(function(){
					//OK
					ko.contentDialog.hide();
			});
		}
		ko.contentDialog.hide();
	});
	ToraAsiaLeaveRequestInfo.Services.getTaskByRequestId(itemId).then(function(r){
		self.istaskgenerate(r);
	});
}

