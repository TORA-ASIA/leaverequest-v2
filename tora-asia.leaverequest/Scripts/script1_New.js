function moreThenOne(type){
	type = type || false;
	var self =this;
	this.todate = ko.observable().extend({ required: type });	
	
	this.errors = ko.validation.group(self);
	//return this.value ;
}
function ohterLeavetype(type){
	type = type || false;
	var self =this;
	this.othertype = ko.observable().extend({ required: type });	
	
	this.errors = ko.validation.group(self);
	//return this.value ;
}

function LRNewViewModel(parent){
	ko.contentDialog.show();
	var self =this;
	this.listrequestformtitle = ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title;
	this.listleavetypetitle = ToraAsiaLeaveRequestInfo.ListManagement.LeaveMaxDate.Title;
	this.dateformate = ko.dateformat.normal;
	this.title= ko.observable(_spPageContextInfo.userDisplayName).extend({ required: true });
	this.leavetype = ko.observable().extend({ required: true });
	this.leavetypearr = ko.observableArray();
	this.otherleavetype= ko.observable();
	
	this.leavedatetypearr = ko.observableArray(["เช้า","บ่าย","เต็มวัน"]);
	this.fromdate = ko.observable().extend({ required: true });	
	this.fromdatetype = ko.observable("เต็มวัน");
	//this.todate = ko.observable(new dynamicExtend(true));
	//console.log(this.todate());
	this.todatetype = ko.observable("เต็มวัน");
	
	this.morebool = ko.observable(false);
	this.moretemplate= ko.observable("idwating");
	this.moreModel = ko.observable(new moreThenOne(false));
	this. workingdday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	this.totalday = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        var holiday = [];
        var workingdday = self.workingdday.slice();
        var notcountarr = ["ลาป่วย","ลากิจ","ลาพักร้อน"];
        if(typeof self.leavetype() !== "undefined"){
	           	if(notcountarr.indexOf(self.leavetype()[0]) > -1){
	           	workingdday  = ToraAsiaLeaveRequestInfo.Services.WorkingDays.slice();
	           	holiday  = ToraAsiaLeaveRequestInfo.Services.HoliDays.slice();
	        }
        }
        //console.log( workingdday  );  	
        var calday = 0;
        if(!self.morebool()&& typeof self.fromdate() !== "undefined" && self.fromdate()!== null){
        	//case 1 day
	        	calday = moment().weekdayCalc({  
				  rangeStart: self.fromdate().format(self.dateformate),  
				  rangeEnd: self.fromdate().format(self.dateformate),  
				  weekdays: workingdday ,  
				  exclusions: holiday 
				})

        	if(self.fromdatetype() !== "เต็มวัน"){
        		calday -=0.5;
        	}
        }
        else if(typeof self.fromdate() !== "undefined" && self.fromdate()!== null &&
        	typeof self.moreModel().todate() !== "undefined" && self.moreModel().todate()!== null){
        	calday = moment().weekdayCalc({  
				  rangeStart: self.fromdate().format(self.dateformate),  
				  rangeEnd: self.moreModel().todate().format(self.dateformate),  
				  weekdays: workingdday ,  
				  exclusions: holiday 
				})

        	/*var diff = self.moreModel().todate().diff(self.fromdate(), 'days')+1;
        	calday  = diff ;
        	if(self.fromdatetype() === "บ่าย"){
        		calday -=0.5;
        	}
        	if(self.todatetype() === "เช้า"){
        		calday -=0.5;
        	}*/

        	//console.log(diff);
        }
        
        return calday;
    }).extend({ min: 0.5 });
    this.leavedays = ko.observableArray([]);
	this.loadAllLeaveDay= function(callback){		    		    
		ToraAsiaLeaveRequestInfo.Services.GetLeaveRemain(self.leavedays,_spPageContextInfo.userId).then(function(){
				//OK
				callback();

		});
	}

    this.phonenumber= ko.observable().extend({ required: true,number:true});
	this.reason= ko.observable();
	this.requester = ko.observable(SP.FieldUserValue.fromUser(_spPageContextInfo.userLoginName));
	
	this.othertyptemplate= ko.observable("idwating");
	this.othertypModel= ko.observable(new ohterLeavetype(false));
	this.isotherType = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //console.log(self.leavetype());
        var isother = false;
        if(typeof self.leavetype() !== "undefined"){
        	isother = (self.leavetype()[0]==="อื่นๆ");
        }
        if(isother ){
			//self.moretemplate("idwating");
			self.othertyptemplate("idotherLeaveType");
		}
		else{
			self.othertyptemplate("idwating");
		}	
		self.othertypModel(new ohterLeavetype(isother));
		        
        return isother;
    },self);
	this.moreclick = function(){
		var oldmore = self.morebool();
		if(!oldmore){
			//self.moretemplate("idwating");
			self.fromdatetype("เต็มวัน");
			self.moretemplate("idmorethenone");
		}
		else{
			self.moretemplate("idwating");
		}		
		self.moreModel(new moreThenOne(!oldmore));
		self.morebool (!oldmore);
		
		
	}
	
	this.SaveSubmit = function(parent){
		//var officehr = ToraAsiaLeaveRequestInfo.Services.GetOfficerHR();
		//console.log(officehr );
	    //console.log(self.leavedays());
	    swal({
	        title: "Are you sure?",
	        text: "To save data!",
	        type: 'warning',
	        showCancelButton: true,
	    }).then(function (willDelete) {
	        if (willDelete) {
	            self.saveToDB();
	        }
	    });
		//swal({
		//  title: "Are you sure?",
		//  text: "To save data!",
		//  icon: "warning",
		//  buttons: true,
		//  dangerMode: true,
		//})
		//.then((willDelete) => {
		//  if (willDelete) {
		//   // swal("Poof! Your imaginary file has been deleted!", {
		//    //  icon: "success",
		//   // });
		//    self.saveToDB();
		//  } else {
		//    //swal("Your imaginary file is safe!");
		//  }
		//});
		//var r = confirm("Are you sure to Save Data?");
		
		//swal("Good job!", "You clicked the button!", "success");
		
		//if(r){
			//console.log(self.errors().length);
			//console.log(self.moreModel().errors().length);
		// }

	}	
	this.saveToDB = function(){
		if (self.errors().length == 0 && self.moreModel().errors().length == 0 & self.othertypModel().errors().length == 0) {
					var ltype = self.leavetype ()[0].trim();
					var diff =/* moment().weekdayCalc({  
								  rangeStart: self.fromdate().format(self.dateformate),  
								  rangeEnd: moment().format(self.dateformate),  
								  weekdays: self.workingdday.slice()  ,
								  exclusions:[]
								})*/
					//console.log(diff );
					
					moment(self.fromdate().format(ko.dateformat.tolistnoTime)).diff(moment(moment().format(ko.dateformat.tolistnoTime)), 'days');
					//console.log(diff);
					var notcountarr = ["ลากิจ","ลาพักร้อน","ลาบวช","ลาคลอด"];
					if(diff < 0 && notcountarr.indexOf(ltype) > -1 ){
					    //alert("ลากิจ ต้องเลือกวันที่ลา มากกว่า วันนี้");
					    swal({
					        title: "ไม่สามารถเลือกวันลาย้อนหลังได้",
					        text: "To save data!",
					        type: 'error'
					    });
						//swal("ไม่สามารถเลือกวันลาย้อนหลังได้", {
					    //  icon: "error",
					    //});
						return ;
					}
					
					var findday = ko.utils.arrayFilter(self.leavedays(), function(item) {
						//suminprogress += parseInt(item.NumberOfDay,10);
						return item.Title === ltype ;
					});
					//console.log(findday );
					if(findday .length > 0){
						var findday0 = findday[0]
						//var cal
						var canleaveday = findday0.MaxLeaveValue	-
								findday0.MyUseDay.inprogress -
									findday0.MyUseDay.approve ;
									
						if( canleaveday -self.totalday() < 0){
							//alert("จำนวนวันลาเกิน สามารถลาได้สูงสุด " +canleaveday + " วัน");
							swal("จำนวนวันลาเกิน สามารถลาได้สูงสุด " +canleaveday + " วัน", {
						      icon: "error",
						    });

							return;
						}
					}
		//console.log(findday );


			
					var mymanager = ToraAsiaLeaveRequestInfo.Services.GetOfficerManager();
					if(mymanager  === null){
						//alert("Manager Not Found");
						swal("Manager Not Found", {
						      icon: "error",
						    });

						return;
					}
					var officehr = ToraAsiaLeaveRequestInfo.Services.GetOfficerHR();
					//console.log(officehr );
					var addfieldata = [
					            	{
										Title:"Title",
										Value: self.title()
									},
									{
										Title:"LeaveType",
										Value: ltype 
									},
									{
										Title:"StartDate",
										Value: self.fromdate().format(ko.dateformat.tolistnoTime)
									},	
									{
										Title:"StartTime",
										Value: self.fromdatetype()
									},	
									{
										Title:"NumberOfDay",
										Value: self.totalday()
									},	
									{
										Title:"Reason",
										Value: self.reason()
									},	
									{
										Title:"PhoneNumber",
										Value: self.phonenumber()
									},	
									{
										Title:"OtherLeaveType",
										Value: self.otherleavetype()
									},
									{
										Title:"RequestType",
										Value: "New" 
									},
									{
										Title:"Requester",
										Value: self.requester()
									},
									{
										Title:"OfficerManager",
										Value: mymanager 
									},
									{
										Title:"CurrentUrl",
										Value: ToraAsiaLeaveRequestInfo.Services.CurrentUrl 
									},	
									{
										Title:"CurrentHostUrl",
										Value: ToraAsiaLeaveRequestInfo.Services.CurrentHostUrl 
									},
									{
										Title:"CurrentAppUrl",
										Value: ToraAsiaLeaveRequestInfo.Services.CurrentAppUrl 
									},				
																
								];
					if(self.morebool()){
						addfieldata.push({
										Title:"EndDate",
										Value: self.moreModel().todate().format(ko.dateformat.tolistnoTime)
									});
						addfieldata.push({
										Title:"EndTime",
										Value: self.todatetype()
									});
					}
					if(self.isotherType()){
						addfieldata.push({
										Title:"OtherLeaveType",
										Value: self.othertypModel().othertype()
									});
					}
					if(officehr !== null){
						addfieldata.push({
										Title:"HrApprove",
										Value: officehr 
									});

					}
					var optioninside = {
					            listTitle:self.listrequestformtitle ,
					            data :addfieldata,
								itemid :0
				    }
				    ko.contentDialog.show();
				    ko.SaveDatatoList(optioninside ,function(id){   
				    		//self.courseID (id);
			            	//self.saveImagefilesVideo(self.title(),id);
			            	//alert("Save Success");
			            	swal("Save Success", {
						      icon: "success",
						    }).then(() => {
								ko.contentDialog.hide();
			            	   parent.navLinkClick("idhomepage");

							});
							//ko.contentDialog.hide();
			            	//parent.navLinkClick("idhomepage");

			            	//ToraAsiaLeaveRequestInfo.Services.StartWorkflow(id).then(function(){
			            	//	alert("Save Success");
			            	//	parent.navLinkClick("idhomepage");

			            	//},function(){
			            	//	alert("Start Workflow Error");
			            	//});
					})


			   } else {
			        //alert('Please check your submission.');
			        swal("Please check your submission.", {
						      icon: "error",
						    });

			        self.errors.showAllMessages();
			        self.moreModel().errors.showAllMessages();
			        self.othertypModel().errors.showAllMessages();
			        
			 }
	
	}
	this.loadLeaveChoice= function(callback){	
		/*var options = {
		listTitle:self.listleavetypetitle ,
			fileData :[
				{field:"Id",type:"Default",typefield:"ID"},
				{field:"Title"}
			],
			queryText:"<View><Query><OrderBy><FieldRef Name='SortIndex'/></OrderBy></Query></View>"
		}
		ko.queryData(options ,function(data){
			self.leavetypearr(data);
		});*/
		if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0){
    				var objquata = JSON.parse(ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerQuata);
    				self.leavetypearr(objquata);
    				//console.log(self.leavetypearr());
		}
		    		    
	}
	this.loadLeaveChoice();
	this.loadAllLeaveDay(function(){
		ko.contentDialog.hide();
	});

	this.errors = ko.validation.group(self,{deep:true,live:true});
}
