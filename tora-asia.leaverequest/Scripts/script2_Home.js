function LRHomeViewModel(parent){
	var self =this;
	
	ko.contentDialog.show();
	this.datawithpaging = ko.observable(new datawithpaging({pageSize : 5}));
	beforid ="idhomepage";
	/*this.showPaging = ko.observable(true);
    this.pageSize = ko.observable(5);
	this.leavedatas = ko.observableArray([]);
	this.pagingObj = ko.observable();
	//this.leavedatas
	//this.leavedata = ko.computed(function() {
    //    //var first = self.pageNumber() * self.nbPerPage;
    //    return self.leavedatas.slice(0, 5);
    //});
    this.totalItems = ko.computed(function() {
          return self.leavedatas().length;
    }, this);

    this.pageIndex = ko.observable(0),
    this.gotoPage = function(data) {
        self.pageIndex(data);
    },
    this.maxPageIndex = ko.computed(function() {
      // var m =Math.ceil(self.rows().length / self.pageSize());
      // console.log(m);
       return Math.ceil(self.leavedatas().length / self.pageSize());
   }, this);
    this.leavedata = ko.computed(function() {
        //console.log(self.rows());
        var curpage =self.pageIndex();
        var size = self.pageSize();
        var start = (curpage===0?curpage:curpage-1) * size;
        return self.leavedatas().slice(start, start + size);
    }, self);
    this.ishasdata = ko.computed(function() {
          return self.leavedatas().length > 0;
    }, this);
    */
    
    this.bindStatus = function(data){
    	var ls = data["LeaveStatus"];
    	var cls = data["CancelLeaveStatus"];
    	var cssdath = "";
    	var csslscolor ="color-yellow";
    	var cssclscolor ="color-yellow";
    	if(ls=== "Approved"){
    		csslscolor ="color-green";
    	}
    	else if(ls=== "Rejected" || ls === "Cancelled"){
    		csslscolor ="color-red";
    		
    	}
		if(cls === "Rejected" || cls === "Cancelled"){
			cssclscolor ="color-red";
		}
    	if(cls === "Cancelled"){
    		cssdath = "txt-dash";
    	}
    	var arrls = [];
    	arrls.push("<span class='"+cssdath+" "+csslscolor +"'>"+ls+"</span>");
    	if(cls !== null && cls !== "Rejected"){
    		arrls.push("<span class='"+cssclscolor +"'>"+cls+"</span>");

		}
    	return arrls.join(" ");
    }
    this.goToApproveForm = function(data){
		//console.log(data.LeaveId());
		//parent.selectTemplate("idwating");
		//parent.selectModel (new LRApproveViewModel(parent,data.LeaveId(),data.Id,self.ishrForm()));
		//parent.selectTemplate("idapproveform");
		parent.GoToApproveViewModel(parent,data,data.Id,"idhomepage",true,false);
	}

    
	this.leavedays = ko.observableArray([]);
	this.leavedaysfilter = ko.computed(function() {
        //console.log(self.rows());
        //self.leavedatas()    
        return ko.utils.arrayFilter(self.leavedays (), function(prod) {
                return prod.ShowHide === true;
            });
    
    }, self);

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
	this.loadAllLeaveData= function(callback){		 
		var allquery = [];
		    var allquerystr = "";
			allquery .push(String.format(ko.defaultquery,"Eq","Requester" ,"Lookup",_spPageContextInfo.userId,"LookupId='TRUE'","")); 
								
			if(allquery.length > 0){
		   		allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
		   	}

		ToraAsiaLeaveRequestInfo.Services.GetAllMyLeaveRequest(self.datawithpaging().rows,allquerystr ).then(function(){
				//OK
				callback();
		});   		    
	}
	this.countloading = ko.observable(0);
	//console.log(gcurrentPageIndex);
	this.loadAllLeaveData(function(){
		//console.log(self.leavedatas());
		//console.log(self.leavedata());
		var oldcount = self.countloading();
		var newcount = oldcount +1;
		self.countloading(newcount );
		self.datawithpaging().pageIndex(gcurrentPageIndex);
		if(newcount === 2){
			ko.contentDialog.hide();
		}
	});
	this.loadAllLeaveDay(function(){
		//console.log(self.leavedays());
		var oldcount = self.countloading();
		var newcount = oldcount +1;
		self.countloading(newcount );
		if(newcount === 2){
			ko.contentDialog.hide();
		}

	});

}
