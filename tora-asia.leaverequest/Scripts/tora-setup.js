var ToraAsiaLeaveRequestInfo = ToraAsiaLeaveRequestInfo || {};
(function () {
    "use strict";
    ToraAsiaLeaveRequestInfo.AddNameSpace = function (namespace) {
        ///<summary>
        /// Define New Namespance or class into the root namespace.
        ///</summary>
        /// <param name="namespace" type="String">Name of the new namespace.</param>
        /// <returns type="Object">Parent namespace</returns>
        var nsparts = namespace.split("."), parent = ToraAsiaLeaveRequestInfo, i = 0, partname;

        // we want to be able to include or exclude the root namespace so we strip
        // it if it's in the namespace
        if (nsparts[0] === "ToraAsiaLeaveRequestInfo") {
            nsparts = nsparts.slice(1);
        }

        // loop through the parts and create a nested namespace if necessary
        for (i = 0; i < nsparts.length; i++) {
            partname = nsparts[i];
            // check if the current parent already has the namespace declared
            // if it isn't, then create it
            if (!parent[partname]) {
                parent[partname] = {};
            }
            // get a reference to the deepest element in the hierarchy so far
            parent = parent[partname];
        }
        // the parent is now constructed with empty namespaces and can be used.
        // we return the outermost namespace
        return parent;
    };

    //#region ListManagement

    ToraAsiaLeaveRequestInfo.AddNameSpace("ListManagement");
    ToraAsiaLeaveRequestInfo.ListManagement = {
        //AdminHr
        //AdminHr: {
        //    Title: "LRAdminHr",
        //    ID:null,
        //    Url:null
        //},
       /* A1: {
            Title: "testForDel1",
            ID:null,
            Url:null
        },
		 A2: {
            Title: "testForDel2",
            ID:null,
            Url:null
        },*/

        //LeaveMaxDate
        LeaveMaxDate: {
            Title: "LRLeaveMaxDate1",
            ID:null,
            Url:null
        },
        //Officer
        Officer: {
            Title: "LROfficer1",
            ID:null,
            Url:null
        },
        //Options
        Options: {
            Title: "LROptions1",
            ID:null,
            Url:null
        },
        //RequestForm
        RequestForm: {
            Title: "LRRequestForm1",
            ID:null,
            Url:null
        },
        Holidays : {
            Title: "LRHolidays1",
            ID:null,
            Url:null
        },
        //WorkflowHistoryList
        WorkflowHistoryList: {
            Title: "LRWorkflowHistoryList1",
            ID: null,
            Url:null
        },
        //WorkflowTaskList
        WorkflowTaskList: {
            Title: "LRWorkflowTaskList2",
            ID: null,
            Url:null
        }
    };
    //#endregion

    //#region ListManagement

    ToraAsiaLeaveRequestInfo.AddNameSpace("Services");
    ToraAsiaLeaveRequestInfo.Services = {
        CurrentUrl: "",
        CurrentHostUrl: "",
        CurrentAppUrl: "",
    	WorkFlowDefName:"LeaveReqeustWF",//"WF Not Use",//"LeaveReqeustWF",
    	WorkFlowName:"APP Leave Request",//"WF Not Use",//"APP Leave Request",//"Leave Request",//for subscription
    	WorkflowDefId:null,
    	WorkflowSubscriptionId: null,
        isSiteAdmin:false,
    	IsCrossDomain:false,
    	IsFeatureActivate:false,
    	IsWorkflowMapingOption:false,
    	IsFoundWorkflowOption:false,
    	IsWorkflowMaping:false,
    	IsFoundWorkflow:false,
    	IsSetEndCircle:false,
    	EndCircleDate:null,
    	EndCircleID:0,
    	WorkflowMapingID:0,
    	FoundWorkflowID:0,
    	ActivateFeatureID:0,
    	WorkingDaysID:0,
    	WorkTypeID:0,
    	WorkType:"ปัดเศษทิ้ง",
    	WorkingDays:[],
    	OfficerInfo:[],
    	OfficerHR:[],
    	HoliDays:[],
    	WorkDayYear:0,
    	WorkDayRatio: 0,
    	swalalrt: function (opt,funcok,funcother) {
    	    swal(opt)
                .then(function (r) {
    	        if (r.value) {
    	            if (typeof funcok !== "undefined" && typeof funcok === "function" && funcok !== null) {
    	                funcok();
    	            }
    	        }
    	        if (typeof funcother !== "undefined" && typeof funcother === "function" && funcother !== null) {
    	            funcother();
    	        }
    	    });
    	},
    	queryDataJSOM: function (props, funcsuccess,d/*defect*/) {
    	    props.listtitle = props.listtitle || "";
    	    if (props.listtitle.length === 0) {
    	        if (callback) {
    	            callback();
    	        }

    	    }
    	    props.query = props.query || "";
    	    props.view = props.view || "";
    	    props.orderby = props.orderby || "<FieldRef Name='Created' Ascending='false'/>";
    	    props.rowlimit = props.rowlimit || 100;
    	    props.options = props.options || {};


    	    //if(typeof valueAccessor() === "undefined"){
    	    //	valueAccessor(new ToraAsiaSarabun.Services.datawithpaging())
    	    //}

    	    var listServices = new SharePointClient.Services.JSOM.ListServices();

    	    //Get SP clientContext
    	    var context = new SharePointClient.Services.JSOM.Context();
    	    //Create Caml object
    	    var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
    	    var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();

    	    camlQuery
            .ViewAttribute(props.view)
            .Query(props.query)
            .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
            .OrderByMe(props.orderby)
            .RowLimit(props.rowlimit);
    	    //.FolderServerRelativeUrl(self.selectdFolder());

    	    listServices.GetListItemsBatchByListName(context,
                    props.listtitle, camlQuery.BuildQuery()).Execute(funcsuccess, function () {
                        d.reject();
                    });

    	},
    	CalulateWorkDay:function(rootcallback){
    		if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0){
    				//console.log(ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0]);
    				var curofficer = ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0];
    				
    				//console.log(curofficer );
		    		var startworkdatestr = curofficer.OfficerStartWorking;
		    		if(ToraAsiaLeaveRequestInfo.Services.EndCircleDate !== null && startworkdate !== null){
		    			
		    			var curuserYear = curofficer.OfficerYear;
		    			var curuserQuata = curofficer.OfficerQuata;
		    			var officerworktype = ToraAsiaLeaveRequestInfo.Services.WorkType;
		    		
		    			var startworkdate = moment(startworkdatestr );
		    			var circlestr = ToraAsiaLeaveRequestInfo.Services.EndCircleDate.format("DD/MM/YYYY");
		    			var usergender = curofficer.OfficerGender;
		    			
		    			//console.log(usergender);
		    			
		    			var curdatestr = moment().format("DD/MM/YYYY")
		    			var endC = moment(circlestr.toString() ,"DD/MM/YYYY");
		    			var beginC = moment(circlestr.toString() ,"DD/MM/YYYY");
		    			var diffday = moment(curdatestr ,"DD/MM/YYYY").diff(endC, 'd');
		    			if(diffday <= 0){
		    				beginC.add({days:1,years:-1}); 
		    			}	
		    			else{
		    				endC.add({years:1}); 
		    				beginC.add({days:1}); 
		    			}
		    			
		    			var focusyear = beginC.year();
		    			//console.log(focusyear);
		    			
		    			//.add({days:1,years:-1});
		    			//var circleupdate =  moment(circlestr.toString() ,"DD/MM/YYYY").add({days:1});
						var myyear = moment().diff(startworkdate, 'y');
						var mymonth = endC.diff(startworkdate, 'M');
						
						if(curuserQuata === null && officerworktype === "ปัดเศษทิ้ง"){
							myyear = (myyear >0? myyear-1:0);
						}
						//console.log(mymonth%12 );
						
						
						//Get All Leave
						var getAllleave = function(callback){
			    			var options = {
							listTitle:ToraAsiaLeaveRequestInfo.ListManagement.LeaveMaxDate.Title,
								fileData :[
									{field:"Id",type:"Default",typefield:"ID"},
									{field:"Title"},
									{field:"MaxLeaveValue"},
									{field:"GenderMaxDate"},
									{field:"ShowHide"},
									{field:"MinimumYear"}
								],
								queryText:"<View><Query><OrderBy><FieldRef Name='SortIndex'/></OrderBy></Query></View>"
							}
							ko.queryData(options ,function(data){
								//console.log(data);
								if(typeof callback !== "undefined"){
									callback(data);
								}
							});
						}
						
						//Find Leave ลาบวช/ลาคลอด
						var getLeavebyGender = function(callback){
							
							var allquery = [];
						    var allquerystr = "";
						    if(usergender === "Female"){
								allquery.push(String.format(ko.defaultquery,"Eq","LeaveType" ,"Text","ลาคลอด","","")); 
								allquery.push(String.format(ko.defaultquery,"Eq","LeaveStatus" ,"Text","Approved","","")); 
								
								var datequery=[];
								datequery.push(String.format(ko.defaultquery,"Geq","StartDate" ,"DateTime",beginC.format("YYYY-MM-DD"),"","IncludeTimeValue='False'")); 
								datequery.push(String.format(ko.defaultquery,"Leq","StartDate" ,"DateTime",endC.format("YYYY-MM-DD"),"","IncludeTimeValue='False'")); 
								
								allquery.push(ko.MergeCAMLConditions(datequery,ko.MergeType.Or));
							}
							else if(usergender === "Male"){
								allquery.push(String.format(ko.defaultquery,"Eq","LeaveType" ,"Text","ลาบวช","","")); 
								allquery.push(String.format(ko.defaultquery,"Eq","LeaveStatus" ,"Text","Approved","","")); 
							}

							if(allquery.length > 0){
						   		allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
						   	}

			    			var options = {
							listTitle:ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title,
								fileData :[
									{field:"Id",type:"Default",typefield:"ID"},
								],
								queryText:"<View><Query>"+allquerystr +"</Query></View>"
							}
							ko.queryData(options ,function(data){
								//console.log(data);
								if(typeof callback !== "undefined"){
									callback(data);
								}

							});
						}
						
						//Find Spacial Leave
		    			var getSpacialLeave = function(callback){
			    			var options = {
							listTitle:ToraAsiaLeaveRequestInfo.ListManagement.LeaveMaxDate.Title,
								fileData :[
									{field:"Id",type:"Default",typefield:"ID"},
									{field:"Title"},
									{field:"MaxLeaveValue"},
									{field:"GenderMaxDate"},
									{field:"ShowHide"},
									{field:"MinimumYear"},
									
								],
								queryText:"<View><Query><OrderBy><FieldRef Name='SortIndex' Ascending='True'/><FieldRef Name='MinimumYear' Ascending = 'False'/></OrderBy></Query></View>"
							}
							ko.queryData(options ,function(data){
								//console.log(data);
								if(typeof callback !== "undefined"){
									callback(data);
								}

							});
						}
						
						//var successRuning
						if( curuserQuata === null || curuserYear !== focusyear ){
							var maxruning = 2;
							var curruning = 0;
							var allleavetype = [];
							var myleavearr = [];
							var countleaves = 0;
							
							var successLoad = function(){
								//console.log("Load Success");
								//console.log("myyear : " + myyear );
								//console.log(countleaves);
								
								//find all leave user has permission
								var filter1 = ko.utils.arrayFilter(allleavetype, function(p) {
									switch(p.Title){
										case "ลาบวช":
										   return (p.MinimumYear <= myyear && usergender  === "Male" && countleaves === 0)
										case "ลาคลอด":
										return (p.MinimumYear <= myyear && usergender  === "Female" && countleaves === 0)
										default:
											return (p.MinimumYear <= myyear && p.GenderMaxDate === "All")
									}
					                
					            });
					            
					            var myrealleave = [];
								//Loop add officer Leave
								ko.utils.arrayForEach(filter1, function(item) {
									var curitem = $.extend({}, item);
									if(curuserQuata === null && officerworktype === "คำนวณตามสัดส่วน" && curitem.MinimumYear > 0){
											//console.log(mymonth%12 );
									    var oldmax = curitem.MaxLeaveValue;
									    var newmax =  Math.floor(oldmax * ((mymonth%12)/12));
										curitem.MaxLeaveValue = newmax;
									}
									
							    	if(myrealleave.length === 0 && curitem.MaxLeaveValue > 0){
							    		myrealleave.push(curitem);
							    	}
							    	else{
							    		var curindex = -1;
							    		var funiqu = ko.utils.arrayFilter(myrealleave, function(p,index) {
							    			curindex = index;
											return p.Title === item.Title && p.MinimumYear < item.MinimumYear 				                
							            });
										if(funiqu.length ===0 && curitem.MaxLeaveValue > 0){
											myrealleave.push(curitem);
										}
										else{
											if(curindex > -1  && curitem.MaxLeaveValue > 0){
												myrealleave[curindex] = curitem;
											}
										}
							    	}
							    });
							    //console.log(filter1 );
								//console.log(myrealleave);
								
							    //Save to Officer List
							    var addfieldata = [
									{
										Title:"OfficerQuata",
										Value: JSON.stringify(myrealleave)
									},
									{
										Title:"OfficerYear",
										Value: focusyear 
									}								
								];
								var optioninside = {
								            listTitle:ToraAsiaLeaveRequestInfo.ListManagement.Officer.Title,
								            data :addfieldata,
											itemid :curofficer.ID
							    }
						   
					   			// parent.navLinkClick("idapprove");
							    ko.SaveDatatoList(optioninside ,function(id){   
							    	curofficer.OfficerQuata  = JSON.stringify(myrealleave);
							    	curofficer.OfficerYear = focusyear ;
							    	rootcallback();
								});

								
								//console.log(allleavetype);
								//console.log(countleaves);
								
							}
							
							getAllleave(function(d){
								allleavetype  = d.slice();
								curruning++;
								if(curruning  === maxruning ){
									successLoad();
								}
							});
							getLeavebyGender(function(d){
								countleaves= d.length;
								curruning++;
								if(curruning  === maxruning ){
									successLoad();
								}

							});
							//console.log(startworkdate);
			    			//console.log(beginC.format("DD/MM/YYYY"));
			    			//console.log(endC.format("DD/MM/YYYY"));
			    			
			    			//console.log(mymonth );
			    			//console.log(myyear);
			    			//console.log(ToraAsiaLeaveRequestInfo.Services.WorkType);
						}
						else{
							rootcallback();
						}
		    			//var startworkdate = moment(startworkdatestr );
		    			//var endC = ToraAsiaLeaveRequestInfo.Services.EndCircleDate;
		    			//var beginC = endC.add(1, 'days').add(-1, 'years');
		    			
		    			//console.log(ToraAsiaLeaveRequestInfo.Services.EndCircleDate.toString());
		    			
		    			//.startOf('hour').fromNow();   
		    			//moment("20111031", "YYYYMMDD").
		    		}
		    		else{
		    			rootcallback();
		    		}
    		}
    		else{
    			rootcallback();
    		}
			
    	},
    	GetHolidaysData:function(){	
    		var deferred = $.Deferred();     
    					
						var qdate = "<Where>"+
							      "<And>"+
							         "<Geq>"+
							            "<FieldRef Name='HolidayDate' />"+
							            "<Value Type='DateTime'>"+
							               "<Today OffsetDays='-180' />"+
							            "</Value>"+
							         "</Geq>"+
							         "<Leq>"+
							            "<FieldRef Name='HolidayDate' />"+
							            "<Value Type='DateTime'>"+
							               "<Today OffsetDays='180' />"+
							            "</Value>"+
							         "</Leq>"+
							      "</And>"+
							   "</Where>";

						var options = {};
						options.fileData = [
							{ field: "ID" },
							{ field: "Title" },
							{ field: "HolidayDate", type: "Date", format: ko.dateformat.normal }
						];
						var props = {};
						props.listtitle = ToraAsiaLeaveRequestInfo.ListManagement.Holidays.Title;
						props.query = qdate;
						props.rowlimit = 1000;
						//props.options = options;
						ToraAsiaLeaveRequestInfo.Services.queryDataJSOM(props,function (result) {
						    var alldata = ko.getdataFromEnum({
						        ItemEnum: result,
						        filedDisplay: options.fileData
						    }, options);
						    deferred.resolve(alldata);
						}, deferred);
            /*
						//console.log(qdate );      
						var listServices = new SharePointClient.Services.JSOM.ListServices();
				
				        //Get SP clientContext
				        SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				        var context = new SharePointClient.Services.JSOM.Context();				
				         //SharePointClient.Configurations.IsCrossDomainRequest = false;
				        //Create Caml object
				        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				        camlQuery
				        .ViewAttribute("")
				        .Query(qdate )
				        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
				        //.OrderByIndex()
				        .RowLimit(1000);
				        

				        //.FolderServerRelativeUrl(self.selectdFolder());
				        listServices.GetListItemsBatchByListName(context, 
				        		ToraAsiaLeaveRequestInfo.ListManagement.Holidays.Title, camlQuery.BuildQuery()).Execute(function (result) {
				               // console.log(result.get_count());
				               //console.log(result);
				               var alldata = 	ko.getdataFromEnum({
							        	ItemEnum:result,
							        	filedDisplay:options.fileData		        	
						        	},options)	;
				              // var listItemEnumerator = result.getEnumerator();
				              // while (listItemEnumerator.moveNext()) 
						      //  {
						      //  	var oListItem = listItemEnumerator.get_current();
							//		ToraAsiaLeaveRequestInfo.Services.IsSetEndCircle = true;	
							//		ToraAsiaLeaveRequestInfo.Services.EndCircleDate = moment(oListItem.get_item("Details"),ko.dateformat.endcircletoList);
							//		ToraAsiaLeaveRequestInfo.Services.EndCircleID = oListItem.get_item("ID")						
						     //   }

				               deferred.resolve(alldata);
				        		});

                                */
			return deferred.promise();
    	},  	
    	GetEndCircleData:function(){
    		var deferred = $.Deferred();  
    		ToraAsiaLeaveRequestInfo.Services.GetOptionsData().then(function(dobtion){
									if(dobtion!=null){
										ko.utils.arrayForEach(dobtion, function(ddata) {
									    	switch(ddata.Title){
									    		case "EndCircleYear":
									    				if(ddata.Details !== null){
									    					ToraAsiaLeaveRequestInfo.Services.IsSetEndCircle = true;
									    					ToraAsiaLeaveRequestInfo.Services.EndCircleDate = moment(ddata.Details,ko.dateformat.endcircletoList);
									    				}
									    				//console.log(ddata.ID);
									    				ToraAsiaLeaveRequestInfo.Services.EndCircleID = ddata.ID;	
									    			break;
									    	}
									    });	
									}
								deferred.resolve();	
							},function(){
								deferred.reject();
							});
			return deferred.promise();

    	},
    	GetOptionsData:function(){	
    	    var deferred = $.Deferred();

    	    var options = {};
    	    options.fileData =[
                {field:"ID"},
                {field:"Title"},
                {field:"Details"}
    	    ];
    	    var props = {};
    	    props.listtitle = ToraAsiaLeaveRequestInfo.ListManagement.Options.Title;
    	    props.rowlimit = 30;
    	    //props.options = options;
    	    ToraAsiaLeaveRequestInfo.Services.queryDataJSOM(props, function (result) {
    	        var alldata = ko.getdataFromEnum({
    	            ItemEnum: result,
    	            filedDisplay: options.fileData
    	        }, options);
    	        deferred.resolve(alldata);
    	    }, deferred);
					//var listServices = new SharePointClient.Services.JSOM.ListServices();
				
				    //    //Get SP clientContext
				    //    SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				    //    var context = new SharePointClient.Services.JSOM.Context();				
				    //     //SharePointClient.Configurations.IsCrossDomainRequest = false;
				    //    //Create Caml object
				    //    var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				    //    var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				    //    camlQuery
				    //    .ViewAttribute("")
				    //    .Query()
				    //    .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				    //    .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
				    //    //.OrderByIndex()
				    //    .RowLimit(30);
				    //    var options = {};
				    //    options.fileData =[
					//		{field:"ID"},
					//		{field:"Title"},
					//		{field:"Details"}
					//	];

				    //    //.FolderServerRelativeUrl(self.selectdFolder());
				    //    listServices.GetListItemsBatchByListName(context, 
				    //    		ToraAsiaLeaveRequestInfo.ListManagement.Options.Title, camlQuery.BuildQuery()).Execute(function (result) {
				    //           // console.log(result.get_count());
				    //           //console.log(result);
				    //           var alldata = 	ko.getdataFromEnum({
					//		        	ItemEnum:result,
					//		        	filedDisplay:options.fileData		        	
					//	        	},options)	;
				    //          // var listItemEnumerator = result.getEnumerator();
				    //          // while (listItemEnumerator.moveNext()) 
					//	      //  {
					//	      //  	var oListItem = listItemEnumerator.get_current();
					//		//		ToraAsiaLeaveRequestInfo.Services.IsSetEndCircle = true;	
					//		//		ToraAsiaLeaveRequestInfo.Services.EndCircleDate = moment(oListItem.get_item("Details"),ko.dateformat.endcircletoList);
					//		//		ToraAsiaLeaveRequestInfo.Services.EndCircleID = oListItem.get_item("ID")						
					//	     //   }

				    //           deferred.resolve(alldata);
				    //    }); 
			return deferred.promise();
    	},  	
        GetAllMyLeaveRequest:function(requestvalue,qry){
    			qry = qry || "";
    			var deferred = $.Deferred();
            //SharePointClient.Services.JSOM.Initialize(function () {
    			SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
    			var listServices = new SharePointClient.Services.JSOM.ListServices();


				        //Get SP clientContext
				        var context = new SharePointClient.Services.JSOM.Context();				
				        //Create Caml object
				        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				        camlQuery
				        .ViewAttribute("")
				        .Query(qry)
				        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				        .OrderByMe("<FieldRef Name='Modified' Ascending='false'/>")
				        //.OrderByIndex()
				        .RowLimit(30);
				        //.FolderServerRelativeUrl(self.selectdFolder());
            //Get All list items batch by list name

				        //SharePointClient.Configurations.IsCrossDomainRequest = false;
				        var options = {};
				        options.fileData =[
							{field:"Id",type:"Default",typefield:"ID"},
							{field:"Title"},
							{field:"StartDate",type:"Date",format:ko.dateformat.normal},
							{field:"NumberOfDay"},
							{field:"LeaveStatus"},
							{field:"CancelLeaveStatus"},
							{field:"LeaveType"},
						];
						options.format = ko.dateformat.normal;

				        listServices.GetListItemsBatchByListName(context, 
				        		ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title, camlQuery.BuildQuery()).Execute(function (result) {
				                //console.log(result.get_count());
				               //console.log(result);
				               var alldata = 	ko.getdataFromEnum({
							        	ItemEnum:result,
							        	filedDisplay:options.fileData,
							        	format :options.format			        	
						        	},options)	;	

								 var olddata = requestvalue();
								 var newdata = olddata.concat(alldata);
						         requestvalue(newdata);

				               
				               var nextpost = result.get_listItemCollectionPosition();
					            if(nextpost ==null){
					            		deferred.resolve();
					            }
				        }); 
			//});
			return deferred.promise();
    	},
    	GetLeaveMaxDate:function(myleavedays,myrequestdata,typeselectquery,callback){
    	
    		if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0){
    				var objquata = JSON.parse(ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerQuata);
    				ko.utils.arrayForEach(objquata , function(item) {
						var daytitile = item.Title;
						var dayinprogress =  ko.utils.arrayFilter(myrequestdata, function(dv) {
								return dv.LeaveStatus === "In Progress" && dv.LeaveType === daytitile
										&& dv.CancelLeaveStatus !== "Cancelled";
						});
						var dayapprove =  ko.utils.arrayFilter(myrequestdata, function(dv) {
								return dv.LeaveStatus === "Approved" && dv.LeaveType === daytitile 
										&& dv.CancelLeaveStatus !== "Cancelled";
						});
						var dayobj = {};
						var suminprogress = 0;
						var sumapprove = 0;
														//var sumcancel = 0;
						ko.utils.arrayForEach(dayinprogress, function(item) {
							suminprogress += parseInt(item.NumberOfDay,10);
						});
						ko.utils.arrayForEach(dayapprove, function(item) {
							sumapprove += parseInt(item.NumberOfDay,10);
						});

						dayobj.inprogress = suminprogress ;
						dayobj.approve = sumapprove ;	
						item = $.extend(item, {"MyUseDay":dayobj });								
						//itemvalue   = dayobj ;
					
					});
					myleavedays(objquata );
					//console.log(myleavedays());
					if(typeof callback !== "undefined"){
							callback();
					}

    		//var daytitile = oListItem.get_item(cur.typefield);
														
			}
			else{
				if(typeof callback !== "undefined"){
							callback();
						}
			}
    		//console.log(myrequestdata);
    		/*var deferred = $.Deferred();
    				//SharePointClient.Services.JSOM.Initialize(function () {
    				    var listServices = new SharePointClient.Services.JSOM.ListServices();
				
				        //Get SP clientContext
				        var context = new SharePointClient.Services.JSOM.Context();				
				        //Create Caml object
				        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				        camlQuery
				        .ViewAttribute("")
				        .Query(typeselectquery)
				        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				        .OrderByMe("<FieldRef Name='SortIndex' Ascending='true'/>")
				        //.OrderByIndex()
				        .RowLimit(30);
				        //.FolderServerRelativeUrl(self.selectdFolder());
				        						 //Get All list items batch by list name
				        var options = {};
				        options.fileData =[
							{field:"Id",type:"Default",typefield:"ID"},
							{field:"Title"},
							{field:"MaxLeaveValue"},
							{field:"ShowHide"},
							{field:"GenderMaxDate"},
							{field:"MyUseDay",type:"UseDay",typefield:"Title",source:myrequestdata},
						];
						options.format = ko.dateformat.nomal;

				        listServices.GetListItemsBatchByListName(context, 
				        		ToraAsiaLeaveRequestInfo.ListManagement.LeaveMaxDate.Title, camlQuery.BuildQuery()).Execute(function (result) {
				                //console.log(result.get_count());
				               //console.log(result);
				               var alldata = 	ko.getdataFromEnum({
							        	ItemEnum:result,
							        	filedDisplay:options.fileData,
							        	format :options.format			        	
						        	},options)	;	

								 var olddata = myleavedays();
								 var newdata = olddata.concat(alldata);
						         myleavedays(newdata);

				               
				               var nextpost = result.get_listItemCollectionPosition();
					            if(nextpost ==null){
					            	deferred.resolve();
					            }
				        }); 

		   // });
								
		
			    return deferred.promise();*/
	
	    },  
	    deleteCancelRequestTask:function(itemid){
	    	var deferred = $.Deferred();
				var qtext = "";
   				var allquery = [];
   				var deltaskid = [];
		   		//var queryBegin = [];
		   		allquery.push(String.format(ko.defaultquery,"Neq","Status","Choice","Completed","",""));
		   		allquery.push(String.format(ko.defaultquery,"Contains","RelatedItems","Text","[{\"ItemId\":"+itemid,"",""));
				if(allquery.length > 0){
		   			qtext  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
		   		}

	        var listServices = new SharePointClient.Services.JSOM.ListServices();
	
				        //Get SP clientContext
				        SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				        var context = new SharePointClient.Services.JSOM.Context();	
				        //SharePointClient.Configurations.IsCrossDomainRequest = false;
				         //var hostcontext = new SharePointClient.Services.JSOM.Context();
	                    // var appCtxSite = listService.JSOM // new SP.AppContextSite(context, utility.GetHostUrl());
	                    //get current context
	                    var ctx = context.GetClientContext();
	                    //get current web  
	                    var curweb = context.GetWeb();
						//activateFeature(ctx,curweb);
				        //Create Caml object
				        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				        camlQuery
				        .ViewAttribute("")
				        .Query(qtext  )
				        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
				        //.OrderByIndex()
				        .RowLimit(30);
				        //.FolderServerRelativeUrl(self.selectdFolder());

				        listServices.GetListItemsBatchByListName(context, 
				        		ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.Title, camlQuery.BuildQuery()).Execute(function (result) {
								var listEnumerator = result.getEnumerator();
									//var featureInfo = '';
									while (listEnumerator.moveNext()) {
										var curitem = listEnumerator.get_current();
										//console.log(curitem.get_item("WF4InstanceId"));
										deltaskid.push(curitem.get_id());
										//featureInfo += 'Feature ID: ' + oneFeature.get_definitionId() + '\n';
										//guid = oneFeature.get_definitionId();
									}
				               
				               var nextpost = result.get_listItemCollectionPosition();
					            if(nextpost ==null){
					            	//if(callback){
									//	callback();
									//}
									//console.log(deltaskid);
									if(deltaskid.length>0){
										var oList = curweb.get_lists().getByTitle(ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.Title);
										ko.utils.arrayForEach(deltaskid, function(uid ) {
							                var oListItem = oList.getItemById(uid );
							                oListItem.deleteObject();
	    
							            });
							            ctx.executeQueryAsync(function () {
			                            //alert("Sharepoint custom list is created Successfully..")
			                            	return deferred.resolve('Tasks deleted');											
			                            	//return deferred.resolve();                         
											//return deferred.resolve(list.get_id(),listRootFolder.get_serverRelativeUrl());
				                        }, function (sender, args) {
				                            //return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
				                           return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
				                        });
			                        }
			                        else{
			                        	return deferred.resolve('no tasks');
			                        }

					            }
				}); 
			 return deferred.promise();	
		},	
		deleteAllList:function(){
	    	var deferred = $.Deferred();
					   var listServices = new SharePointClient.Services.JSOM.ListServices();
					    //Get SP clientContext
				        SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				        var context = new SharePointClient.Services.JSOM.Context();	
				        //SharePointClient.Configurations.IsCrossDomainRequest = false;
				         //var hostcontext = new SharePointClient.Services.JSOM.Context();
	                    // var appCtxSite = listService.JSOM // new SP.AppContextSite(context, utility.GetHostUrl());
	                    //get current context
	                    var ctx = context.GetClientContext();
	                    //get current web  
	                    var curweb = context.GetWeb();
	                    /*var delobj= {
	                    	A1: {
					            Title: "testForDel1",
					            ID:null,
					            Url:null
					        },
							 A2: {
					            Title: "testForDel2",
					            ID:null,
					            Url:null
					        }
	                    }*/
	                    //ToraAsiaLeaveRequestInfo.ListManagement
					   	ko.utils.objectForEach(ToraAsiaLeaveRequestInfo.ListManagement, function (key, value) {
                        //alert(key + ": " + value);
                        	var curkey = key;
                        	var curvalue = value;
                        	var oList = curweb.get_lists().getByTitle(curvalue.Title);
                        	oList.deleteObject();
                        });
							            
						ctx.executeQueryAsync(function () {
			                            //alert("Sharepoint custom list is created Successfully..")
			                return deferred.resolve('lists deleted');											
			                            	//return deferred.resolve();                         
											//return deferred.resolve(list.get_id(),listRootFolder.get_serverRelativeUrl());
				        }, function (sender, args) {
				                            //return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
				            return deferred.reject('Failed to delete lists. Error:' + args.get_message());
				        });
			 return deferred.promise();	
		},	
		getTaskByRequestId:function(itemid){
	    	var deferred = $.Deferred();
				var qtext = "";
   				var allquery = [];
   				var deltaskid = [];
		   		//var queryBegin = [];
		   		allquery.push(String.format(ko.defaultquery,"Neq","Status","Choice","Completed","",""));
		   		allquery.push(String.format(ko.defaultquery,"Contains","RelatedItems","Text","[{\"ItemId\":"+itemid,"",""));
				if(allquery.length > 0){
		   			qtext  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
		   		}

	        var listServices = new SharePointClient.Services.JSOM.ListServices();
	
				        //Get SP clientContext
				        SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				        var context = new SharePointClient.Services.JSOM.Context();	
				        //SharePointClient.Configurations.IsCrossDomainRequest = false;
				         //var hostcontext = new SharePointClient.Services.JSOM.Context();
	                    // var appCtxSite = listService.JSOM // new SP.AppContextSite(context, utility.GetHostUrl());
	                    //get current context
	                    var ctx = context.GetClientContext();
	                    //get current web  
	                    var curweb = context.GetWeb();
						//activateFeature(ctx,curweb);
				        //Create Caml object
				        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				        camlQuery
				        .ViewAttribute("")
				        .Query(qtext  )
				        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
				        //.OrderByIndex()
				        .RowLimit(5);
				        //.FolderServerRelativeUrl(self.selectdFolder());

				        listServices.GetListItemsBatchByListName(context, 
				        		ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.Title, camlQuery.BuildQuery()).Execute(function (result) {
								var listEnumerator = result.getEnumerator();
									//var featureInfo = '';
									while (listEnumerator.moveNext()) {
										var curitem = listEnumerator.get_current();
										//console.log(curitem.get_item("WF4InstanceId"));
										deltaskid.push(curitem.get_id());
										//featureInfo += 'Feature ID: ' + oneFeature.get_definitionId() + '\n';
										//guid = oneFeature.get_definitionId();
									}
				               
				               var nextpost = result.get_listItemCollectionPosition();
					            if(nextpost ==null){
					            	//if(callback){
									//	callback();
									//}
									//console.log(deltaskid);
									deferred.resolve(deltaskid.length>0);	
									//if(deltaskid.length>0){
									//	return deferred.resolve(true);	
									//}
			                        //else{
			                        //	return deferred.resolve('no tasks');
			                       // }

					            }
				}); 
			 return deferred.promise();	
		},	
	    GetOfficerInfo:function(ishr){
	    		ishr = (typeof ishr!== "undefined")?ishr:false;
    			var allmyrequest = ko.observableArray([]);
			    var allquery = [];
			    var allquerystr = "";
			    if(!ishr){
					allquery.push(String.format(ko.defaultquery,"Eq","Officer" ,"Lookup",_spPageContextInfo.userId,"LookupId='TRUE'","")); 
				}
				else{
					allquery.push(String.format(ko.defaultquery,"Eq","OfficerPosition" ,"Text","HR","","")); 

				}
				//allquery = allquery.concat(otherqueryarr )	;				
				if(allquery.length > 0){
			   		allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
			   	}

				var deferred = $.Deferred();

				var options = {};
				options.fileData = [
                    { field: "ID" },
                    { field: "Title" },
                    { field: "Officer" },
                    { field: "OfficerGender" },
                    { field: "OfficerPosition" },
                    { field: "OfficerDepartment" },
                    { field: "OfficerManager" },
                    { field: "OfficerStartWorking", type: "Date", format: ko.dateformat.normal },
                    { field: "OfficerQuata" },
                    { field: "OfficerYear" }
				];
				var props = {};
				props.listtitle = ToraAsiaLeaveRequestInfo.ListManagement.Officer.Title;
				props.query = allquerystr;
				props.rowlimit = 30;
	        //props.options = options;
				ToraAsiaLeaveRequestInfo.Services.queryDataJSOM(props, function (result) {
				    var alldata = ko.getdataFromEnum({
				        ItemEnum: result,
				        filedDisplay: options.fileData,
				        format: options.format
				    }, options);
				    if (!ishr) {
				        ToraAsiaLeaveRequestInfo.Services.OfficerInfo = alldata;
				    }
				    else {
				        ToraAsiaLeaveRequestInfo.Services.OfficerHR = alldata;
				    }

				    var nextpost = result.get_listItemCollectionPosition();
				    if (nextpost == null) {
				        deferred.resolve();
				    }
				}, deferred);

    			//SharePointClient.Services.JSOM.Initialize(function () {
    			//var listServices = new SharePointClient.Services.JSOM.ListServices();
				
				//        //Get SP clientContext
				//        var context = new SharePointClient.Services.JSOM.Context();				
				//        //Create Caml object
				//        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
				//        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
				//        camlQuery
				//        .ViewAttribute("")
				//        .Query(allquerystr)
				//        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
				//        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
				//        //.OrderByIndex()
				//        .RowLimit(30);
				//        //.FolderServerRelativeUrl(self.selectdFolder());
				//        						 //Get All list items batch by list name
				//        var options = {};
				//        options.fileData =[
				//			{field:"ID"},
				//			{field:"Title"},
				//			{field:"Officer"},
				//			{field:"OfficerGender"},
				//			{field:"OfficerPosition"},
				//			{field:"OfficerDepartment"},
				//			{field:"OfficerManager"},
				//			{field:"OfficerStartWorking",type:"Date",format:ko.dateformat.normal},
				//			{field:"OfficerQuata"},
				//			{field:"OfficerYear"}
				//		];

				//        listServices.GetListItemsBatchByListName(context, 
				//        		ToraAsiaLeaveRequestInfo.ListManagement.Officer.Title, camlQuery.BuildQuery()).Execute(function (result) {
				//                //console.log(result.get_count());
				//               //console.log(result);
				//               var alldata = 	ko.getdataFromEnum({
				//			        	ItemEnum:result,
				//			        	filedDisplay:options.fileData,
				//			        	format :options.format			        	
				//		        	},options)	;	
				//		        if(!ishr){	
				//					ToraAsiaLeaveRequestInfo.Services.OfficerInfo = alldata ;
				//				}
				//				else{
				//					ToraAsiaLeaveRequestInfo.Services.OfficerHR = alldata ;
				//				}
				               
				//               var nextpost = result.get_listItemCollectionPosition();
				//	            if(nextpost ==null){
				//	            		deferred.resolve();
				//	            }
				//        }); 
			//});
			return deferred.promise();
    	}, 
    	GetLeaveRemain:function(myleavedays,requesterId,seletesometype){
		    var deferred = $.Deferred();
		    
		    
		    /*var subgendertype = "";
		    if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0) 
        	{	
        		var usergender = ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerGender;
        		var subgender = [];  
        		subgender.push(String.format(ko.defaultquery,"Eq","GenderMaxDate" ,"Text","All","",""));   	
        		subgender.push(String.format(ko.defaultquery,"Eq","GenderMaxDate" ,"Text",usergender,"",""));   
        		subgendertype  = "<Where>"+ko.MergeCAMLConditions(subgender,ko.MergeType.Or)+"</Where>";
        	}

		    
		    seletesometype= seletesometype|| subgendertype ;
		    var allmyrequest = ko.observableArray([]);
		    var allquery = [];
		    var allquerystr = "";
			allquery.push(String.format(ko.defaultquery,"Eq","Requester" ,"Lookup",requesterId,"LookupId='TRUE'","")); 
						//allquery = allquery.concat(otherqueryarr )	;				
			if(allquery.length > 0){
		   		allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
		   	}
		   
        	
		   	ToraAsiaLeaveRequestInfo.Services.GetAllMyLeaveRequest(allmyrequest,allquerystr).then(function(){
			   	ToraAsiaLeaveRequestInfo.Services.GetLeaveMaxDate(myleavedays,allmyrequest(),seletesometype).then(function(){
				    	deferred.resolve();
				 });		
			});*/
			if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0){
	    				//console.log(ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0]);
	    		var subgendertype = "";
			    if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0) 
	        	{	
	        		var usergender = ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerGender;
	        		var subgender = [];  
	        		subgender.push(String.format(ko.defaultquery,"Eq","GenderMaxDate" ,"Text","All","",""));   	
	        		subgender.push(String.format(ko.defaultquery,"Eq","GenderMaxDate" ,"Text",usergender,"",""));   
	        		subgendertype  = "<Where>"+ko.MergeCAMLConditions(subgender,ko.MergeType.Or)+"</Where>";
	        	}
	
			    
			    seletesometype= seletesometype|| subgendertype ;
			    var allmyrequest = ko.observableArray([]);
			    var allquery = [];
			    var allquerystr = "";
				allquery.push(String.format(ko.defaultquery,"Eq","Requester" ,"Lookup",requesterId,"LookupId='TRUE'","")); 
							//allquery = allquery.concat(otherqueryarr )	;				
				if(allquery.length > 0){
			   		allquerystr  = "<Where>"+ ko.MergeCAMLConditions(allquery,ko.MergeType.And)+"</Where>";
			   	}
			   
	        	
			   	ToraAsiaLeaveRequestInfo.Services.GetAllMyLeaveRequest(allmyrequest,allquerystr).then(function(){
				   	ToraAsiaLeaveRequestInfo.Services.GetLeaveMaxDate(myleavedays,allmyrequest(),seletesometype,function(){
				   		deferred.resolve();
				   	});
				   	//.then(function(){
					 //   	deferred.resolve();
					// });		
				});			
			}
			else{
				deferred.resolve();
			}
		    return deferred.promise();

    	},
		CheckFoundWorflow : function (context,currentWEB) {
			                        // Create a new Deferred object
			var deferred = $.Deferred();
									
			context.load(currentWEB);
									 // Workflow Services API entry point - WorkflowServiceManager object
			var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, currentWEB);
			context.load(servicesManager);
								
			var workflowDefinitions = servicesManager.getWorkflowDeploymentService().enumerateDefinitions(false);
			context.load(workflowDefinitions);

			
			context.executeQueryAsync(function () {
			                            //alert("Sharepoint custom list is created Successfully..")
			                            // enumerateDefinition returns ClientCollection object
			var definitionsEnum = workflowDefinitions.getEnumerator();
									        		// Going through the definitions
			while (definitionsEnum.moveNext()) {
									
				var def = definitionsEnum.get_current();
									
									            // Displaying information about this definition - DisplayName and Id
				if(def.get_displayName() === ToraAsiaLeaveRequestInfo.Services.WorkFlowDefName){
						deferred.resolve(def) ;
					} 
				}

			    return deferred.resolve(null);
			 }, function (sender, args) {
			                            //console.log('Failed to create list. Error:' + args.get_message());
			    return deferred.reject('Failed to find workflow. Error:' + args.get_message());
			 });
			
			                        // Return the Deferred's Promise object
		   return deferred.promise();
		},
    	CheckworkflowMapping : function (context,currentWEB ) {
						 var deferred = $.Deferred();
						
                       			

		                    	var wfServicesManager = new SP.WorkflowServices.WorkflowServicesManager(context, currentWEB );
								var workflowSubscriptionService=wfServicesManager.getWorkflowSubscriptionService();				
								var workflowAssociations= workflowSubscriptionService.enumerateSubscriptionsByList(
									ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.ID
								);								
		                        context.load(workflowAssociations);
		                        context.executeQueryAsync(function () {
		                            //alert("Sharepoint custom list is created Successfully..")
		                            var association= workflowAssociations.getEnumerator();
		                            while (association.moveNext()) {
									       var curin = 	association.get_current();
									       if(curin.get_name() === ToraAsiaLeaveRequestInfo.Services.WorkFlowName){
									       		ToraAsiaLeaveRequestInfo.Services.IsWorkflowMaping = true;
									       		ToraAsiaLeaveRequestInfo.Services.WorkflowSubscriptionId = curin.get_id().toString();
									       		break;
									       }    
									}	
									return deferred.resolve();                         
									//return deferred.resolve(list.get_id(),listRootFolder.get_serverRelativeUrl());
		                        }, function (sender, args) {
		                            return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
		                        });
		                                               // Return the Deferred's Promise object
						return deferred.promise();
        },
        CheckActivateFeature : function (context,currentWEB ) {
			var deferred = $.Deferred();
				//context.load(site);
				
				//var activateFeature = function(ctx,web){
				//		var rawGuid = 'ec918931-c874-4033-bd09-4f36b2e31fef';
				//		var guid = new SP.Guid('{'+rawGuid+'}');
				//		var featDefinition = web.get_features().add(guid, true, SP.FeatureDefinitionScope.farm);
				//		ctx.executeQueryAsync(function () {
							//console.log('Activate feature success');
				//			foundfeature  = true;
				//			return deferred.resolve(foundfeature);    
			//			}, function (sender, args) {
							//return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
			//				 deferred.reject('Failed to activate feature. Error:' + args.get_message());
				//		});
				
			//	}

				
				var featureCollection= currentWEB.get_features();
				context.load(featureCollection);
				context.executeQueryAsync(function () {
		            var listEnumerator = featureCollection.getEnumerator();
					//var featureInfo = '';
					var foundfeature = false;
					while (listEnumerator.moveNext()) {
						var oneFeature = listEnumerator.get_current();
						//featureInfo += 'Feature ID: ' + oneFeature.get_definitionId() + '\n';
						//guid = oneFeature.get_definitionId();
						if(oneFeature.get_definitionId().toString() === 'ec918931-c874-4033-bd09-4f36b2e31fef'){
							foundfeature  = true;
						}
					}
					//if(!foundfeature){
					//	console.log("feature not activate");
					//	activateFeature(context,currentWEB );
					//}
					//else{
					//	return deferred.resolve(foundfeature);    
					//}
					return deferred.resolve(foundfeature);    
					                     
									//return deferred.resolve(list.get_id(),listRootFolder.get_serverRelativeUrl());
		       }, function (sender, args) {
		            return deferred.reject('Failed to read site features. Error:' + args.get_message());
		      });

             return deferred.promise();
        },
        ActivateFeature:function(){
        	 var deferred = $.Deferred();
			                //Get SP clientContext
			   SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
			                //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
			   var hostcontext = new SharePointClient.Services.JSOM.Context();
			   //get current context
			   var hostCtx = hostcontext.GetClientContext();
			   //get current web  
			   var hostWeb = hostcontext.GetWeb();
			   
			   var rawGuid = 'ec918931-c874-4033-bd09-4f36b2e31fef';
			   var guid = new SP.Guid('{'+rawGuid+'}');
			   var featDefinition = hostWeb .get_features().add(guid, true, SP.FeatureDefinitionScope.farm);
			   hostCtx .executeQueryAsync(function () {
			   			ToraAsiaLeaveRequestInfo.Services.IsFeatureActivate= true;	
							//console.log('Activate feature success');
							//foundfeature  = true;
							return deferred.resolve();    
				}, function (sender, args) {
							//return deferred.reject('Failed to find workflow assosiate list. Error:' + args.get_message());
							 deferred.reject('Failed to activate feature. Error:' + args.get_message());
			   });

			   
			return deferred.promise();
        },
        CloneWorkflow:function(){
        	 var rootdeferred = $.Deferred();
			                //Get SP clientContext
			                SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
			                //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
			                var hostcontext = new SharePointClient.Services.JSOM.Context();
			                //get current context
			                var hostCtx = hostcontext.GetClientContext();
			                //get current web  
			                var hostWeb = hostcontext.GetWeb();
			                
			                SharePointClient.Configurations.IsCrossDomainRequest = false;
			                var appcontext = new SharePointClient.Services.JSOM.Context();
			                //var appCtx = new SP.AppContextSite(hostcontext, utility.GetHostUrl());
			                var appCtx = appcontext.GetClientContext();
			                
			                var appWeb = appcontext.GetWeb();
			

			                var saveWorkflowDefinition = function (ctx, web, myDefinition, hostDefinition) {
			                    // Create a new Deferred object
			                    var deferred = $.Deferred();
			
			                    // we have to repeat the procedure of getting WorkflowServicesManager object because
			                    // it should be retrieved for each web separately
			                    ctx.load(web);
			                    var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(ctx, web);
			                    ctx.load(servicesManager);
										
			                    // Save and publish the definition
			                    //myDefinition.set_displayName(myDefinition.get_displayName());
			                    console.log('App Definition info :' + myDefinition.get_id() + ":" + myDefinition.get_displayName());
			
			                    var workflow = new SP.WorkflowServices.WorkflowDefinition(ctx);
			                    workflow.set_displayName(myDefinition.get_displayName());
			                    workflow.set_xaml(myDefinition.get_xaml());
			                    ko.utils.objectForEach(myDefinition.get_properties(), function (key, value) {
			                        if (key !== "Definition.Id") {
			                            workflow.setProperty(key, value);
			                        }
			                    });
			                    if (hostDefinition !== null) {
			                        console.log('Host Definition info :' + hostDefinition.get_id() + ":" + hostDefinition.get_displayName());
			                        workflow.set_id(hostDefinition.get_id());
			                    }
			                   
			                    servicesManager.getWorkflowDeploymentService().saveDefinition(workflow);
			                    //servicesManager.getWorkflowDeploymentService().publishDefinition(myDefinition.get_id());
			                    ctx.load(workflow);
			                    ctx.executeQueryAsync(function (sender, args) {
			                       
			                        console.log('Definition saved to site ' + workflow.get_id() + web.get_url());
			                        //onsole.log("publish success");
			                        //deferred.resolve();
			                        servicesManager.getWorkflowDeploymentService().publishDefinition(workflow.get_id());
			                        ctx.executeQueryAsync(function (sender2, arg2) {
			                            console.log("publish success");
			                            deferred.resolve(workflow);
			                        }, function (sender2, args2) {
			                            //console.log('Failed to create list. Error:' + args.get_message());
			                            return deferred.reject('Failed to publish workflow. Error:' + args2.get_message());
			                        });
			
										
			                    },function (sender, args) {
			                        //console.log('Failed to create list. Error:' + args.get_message());
			                        return deferred.reject('Failed to save workflow. Error:' + args.get_message());
			                    });
			                    // Return the Deferred's Promise object
			                    return deferred.promise();
			
			                }
			                ToraAsiaLeaveRequestInfo.Services.CheckFoundWorflow(hostCtx,hostWeb).then(function (hostdef) {
			                        ToraAsiaLeaveRequestInfo.Services.CheckFoundWorflow(appCtx,appWeb).then(function (defin) {
			                            if (defin !== null) {
			                                //var defid = defin.get_id();
			                                saveWorkflowDefinition(hostCtx, hostWeb, defin, hostdef).then(function (wdef) {
			                                	ToraAsiaLeaveRequestInfo.Services.IsFoundWorkflow = true;
			                                	ToraAsiaLeaveRequestInfo.Services.WorkflowDefId = wdef.get_id().toString();
			                                    rootdeferred.resolve();
			                                }, function (mgs2) {
			                                    rootdeferred.reject(mgs2);
			
			                                });
			                            }
			                            else {
			                                rootdeferred.reject("Workflow not found");
			                            }
			                        }, function (msg) {
			                            rootdeferred.reject(msg);
			                        });
			                }, function (mgshost) {
			                    rootdeferred.reject(mgshost);
			                });
			               
			    return rootdeferred.promise();
        },
        AddWorkflowdefinitiontoList:function() {
			    var rootdeferred = $.Deferred();
			            //Get SP clientContext
			            SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
			            //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
			            var hostcontext = new SharePointClient.Services.JSOM.Context();
			            //get current context
			            var hostCtx = hostcontext.GetClientContext();
			            //get current web  
			            var hostWeb = hostcontext.GetWeb();
						
						//CrossDomain to default
			            //SharePointClient.Configurations.IsCrossDomainRequest = false;
			      
			       		var WorkflowAssociationToList = function (ctx, web, workflowDefinitionId) {
			                var listGuid = ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.ID;
			                // Create a new Deferred object
			                var deferred = $.Deferred();
			
			                ctx.load(web);
			
			                // Get WorkflowServicesManager object for the specified web
			                var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(ctx, web);
			                ctx.load(servicesManager);
			                // Creating the subscription
			                var sub = new SP.WorkflowServices.WorkflowSubscription(ctx);
			
			
			                sub.set_name(ToraAsiaLeaveRequestInfo.Services.WorkFlowName);
			                sub.set_enabled(true);
			                sub.set_definitionId(workflowDefinitionId);
			                sub.set_statusFieldName(ToraAsiaLeaveRequestInfo.Services.WorkFlowName);
			                sub.set_eventSourceId(listGuid);
			                sub.set_eventTypes(["WorkflowStart","ItemAdded","ItemUpdated"]);
			
			                // These 3 are MANDATORY! Otherwise the workflow will fail to complete
			                sub.setProperty("TaskListId", ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.ID);
			                sub.setProperty("HistoryListId", ToraAsiaLeaveRequestInfo.ListManagement.WorkflowHistoryList.ID);
			                sub.setProperty("FormData", "");
			
			                // Associate the workflow with the list
			                servicesManager.getWorkflowSubscriptionService().publishSubscriptionForList(sub, listGuid);
			
			                ctx.executeQueryAsync(function (sender, args) {
			
			                    console.log('Workflow association has been created successfully. Web: ' + web.get_url());
			                    deferred.resolve();
			
			                }, function (sender, args) {
			                    //console.log('Failed to create list. Error:' + args.get_message());
			                    return deferred.reject('Failed to add workflow subscription to list. Error:' + args.get_message());
			                });
			
			                // Return the Deferred's Promise object
			                return deferred.promise();
			
			            }
			            ToraAsiaLeaveRequestInfo.Services.CheckFoundWorflow(hostCtx,hostWeb).then(function (defin) {
			                if (defin !== null) {
			                    var defid = defin.get_id();
			                    WorkflowAssociationToList(hostCtx, hostWeb, defid).then(function () {
			                    	ToraAsiaLeaveRequestInfo.Services.IsWorkflowMaping = true;
			                        rootdeferred.resolve();
			                    },
			                    function (mgs3) {
			                        rootdeferred.reject(mgs3);
			
			                   });
			                }
			                else {
			                    rootdeferred.reject("Workflow not found");
			                }
			            }, function (msg) {
			                rootdeferred.reject(msg);
			            });
			
			    return rootdeferred.promise();
		},
        GetListInfomation: function(iscreatelist,callback){
            //SharePointClient.Configurations.IsApp = true;
            //SharePointClient.Configurations.IsCrossDomainRequest = true;
            //SharePointClient.Services.JSOM.Initialize(function () {
            		
                	var maxListCount = Object.keys(ToraAsiaLeaveRequestInfo.ListManagement).length;
                	var currentListCount = 0;
                    //Get SP clientContext
                    var hostcontext = new SharePointClient.Services.JSOM.Context();
                    // var appCtxSite = listService.JSOM // new SP.AppContextSite(context, utility.GetHostUrl());
                    //get current context
                    var context = hostcontext.GetClientContext();
                    //get current web  
                    var currentWEB = hostcontext.GetWeb();

                    var getListInfo = function (_listitle) {
                    // Create a new Deferred object
                        var deferred = $.Deferred();
                        // add list in host web  
                        var list = currentWEB.get_lists().getByTitle(_listitle);
                        var listRootFolder= list.get_rootFolder();
                        context.load(list);
                        context.load(listRootFolder);
                        context.load(currentWEB);
                        context.executeQueryAsync(function () {
                            //alert("Sharepoint custom list is created Successfully..")
                            var rootweb = currentWEB.get_url().replace(currentWEB.get_serverRelativeUrl(),"");
                            return deferred.resolve(list.get_id(),rootweb +listRootFolder.get_serverRelativeUrl());
                        }, function (sender, args) {
                            //console.log('Failed to create list. Error:' + args.get_message());
                            return deferred.reject('Failed to get list. Error:' + args.get_message());
                        });
                        // Return the Deferred's Promise object
                        return deferred.promise();
                    }
                    var setFieldToList = function (ctx,fieldColl, option, type) {
                        option.title = option.title || "";
                        option.internalname = option.internalname || "";
                        option.require = option.require || false;
                        option.arraychoice = option.arraychoice || new Array();
                        option.defaultvalue = option.defaultvalue || null;
                        option.allowmutiple = option.allowmutiple || false;
                        switch (type) {

                            case "Text":
                                //Add Single line of text field to the Field Collection    
                                var singleTextField = fieldColl.addFieldAsXml('<Field Type="Text" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //singleTextField.set_description("This is a single line of text field");
                                singleTextField.set_title(option.title);
                                singleTextField.update();
                                //var f1 = ctx.castTo(fieldcoll.addFieldAsXml('<Field Type="Text" DisplayName="' + title + '" Name="' + internalname + '" />', true, SP.AddFieldOptions.addToDefaultContentType), SP.FieldText);
                                    //console.log("About to set the field");
                                  //  f1.set_title(title);
                                    //f1.set_description("sample desc");
                                    //console.log("About to update");
                                   // f1.update();
                                break;
                            case "PlainText":
                                    //Add Plain Text field to the Field Collection    
                                var plainTextField = fieldColl.addFieldAsXml('<Field Type="Note" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" NumLines="10" RichText="FALSE" AppendOnly="TRUE" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                   // plainTextField.set_description("This is a Plain multi line field");
                                    plainTextField.set_title(option.title);
                                    plainTextField.update();
                                    break;
                            case "RichText":
                                //Add Rich Text field to the Field Collection    
                                var richTextField = fieldColl.addFieldAsXml('<Field Type="Note" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" NumLines="12" RichText="TRUE" AppendOnly="TRUE" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //richTextField.set_description("This is a Rich Text multi line field");
                                richTextField.set_title(option.title);
                                richTextField.update();
                                break;
                            case "EnhancedText":
                                //Add Enhanced Text field to the Field Collection    
                                var enhancedTextField = fieldColl.addFieldAsXml('<Field Type="Note" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" NumLines="8" RestrictedMode="TRUE" RichText="TRUE" RichTextMode="FullHtml" AppendOnly="TRUE" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //enhancedTextField.set_description("This is an Enhanced multi line field");
                                enhancedTextField.set_title(option.title);
                                enhancedTextField.update();
                                break;
                            case "Boolean":
                                //Add Boolean field to the Field Collection    
                                var booleanField = fieldColl.addFieldAsXml('<Field Type="Boolean" DisplayName="' + option.internalname + '" Name="' + option.internalname + '"><Default>0</Default></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
                                //booleanField.set_description("This is a boolean field");
                                booleanField.set_title(option.title);
                                booleanField.update();
                                break;
                            case "Image":
                                //Add Image Field to the field Collection     
                                var imageField = fieldColl.addFieldAsXml('<Field Type="URL" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="Image" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //imageField.set_description("This is an image field");
                                imageField.set_title(option.title);
                                imageField.update();
                                break;
                            case "URL":
                                //Add URL Field to the field Collection     
                                var hyperLinkField = fieldColl.addFieldAsXml('<Field Type="URL" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="Hyperlink" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //hyperLinkField.set_description("This is a hyperlink field");
                                hyperLinkField.set_title(option.title);
                                hyperLinkField.update();
                                break;
                            case "Number":
                                //Add Number field to the Field Collection    
                                var numberField = fieldColl.addFieldAsXml('<Field Type="Number" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //numberField.set_description("This is a number field");
                                numberField.set_title(option.title);
                                numberField.set_defaultValue(option.defaultvalue);
                                numberField.update();
                                break;
                            case "Percentage":
                                //Add Percentage field to the Field Collection    
                                var percentageField = fieldColl.addFieldAsXml('<Field Type="Number" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Percentage="TRUE" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //percentageField.set_description("This is a percentage field");
                                percentageField.set_title(option.title);
                                percentageField.update();
                                break;
                            case "User":
                                //Add User Field to the collection    
                                var userField =  ctx.castTo(
                                    fieldColl.addFieldAsXml('<Field Type="User" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="Hyperlink" />', true, SP.AddFieldOptions.addToDefaultContentType),
                                SP.FieldUser);
                                //userField.set_description("This is an user field");
                                userField.set_title(option.title);
                                userField.set_selectionMode(0);
                                userField.set_allowMultipleValues(option.allowmutiple);
                                userField.update();
                                break;
                            case "UserGroup":
                                //Add User Field to the collection    
                                var userField = ctx.castTo(
                                    fieldColl.addFieldAsXml('<Field Type="User" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="Hyperlink" />', true, SP.AddFieldOptions.addToDefaultContentType),
                                SP.FieldUser);
                                //userField.set_description("This is an user field");
                                userField.set_title(option.title);
                                userField.set_allowMultipleValues(option.allowmutiple);
                                userField.update();
                                break;
                            case "DateOnly":
                                //Add Date Only field to the Field Collection    
                                var dateField = fieldColl.addFieldAsXml('<Field Type="DateTime" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="DateOnly" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //dateField.set_description("This is a date field");
                                dateField.set_title(option.title);
                                dateField.update();
                                break;
                            case "DateTime":
                                //Add Date Time field to the Field Collection    
                                var dateTimeField = fieldColl.addFieldAsXml('<Field Type="DateTime" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="DateTime" />', true, SP.AddFieldOptions.addToDefaultContentType);
                                //dateTimeField.set_description("This is a DateTime field");
                                dateTimeField.set_title(option.title);
                                dateTimeField.update();
                                break;
                            case "ChoiceDropDown":
                                //Add Choice DropDown field to the Field Collection    
                                var choiceDropDownField = ctx.castTo(
                                fieldColl.addFieldAsXml('<Field Type="Choice" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="Dropdown" />', true, SP.AddFieldOptions.addToDefaultContentType),
                                SP.FieldChoice);
                                choiceDropDownField.set_title(option.title);
                                choiceDropDownField.set_choices(option.arraychoice);
                                if (option.defaultvalue !== null) {
                                    choiceDropDownField.set_defaultValue(option.defaultvalue);
                                }
                                choiceDropDownField.update();
                                break;
                            case "ChoiceRadio":
                                //Add Choice Radio Button field to the Field Collection     
                                var choiceDropDownField = ctx.castTo(
                                fieldColl.addFieldAsXml('<Field Type="Choice" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '" Format="RadioButtons" />', true, SP.AddFieldOptions.addToDefaultContentType),
                                SP.FieldChoice);
                                choiceDropDownField.set_title(option.title);
                                choiceDropDownField.set_choices(option.arraychoice);
                                choiceDropDownField.update();
                                break;
                            case "ChoiceCheckBox":
                                //Add Choice CheckBox field to the Field Collection     
                                var choiceDropDownField = ctx.castTo(
                                fieldColl.addFieldAsXml('<Field Type="MultiChoice" DisplayName="' + option.internalname + '" Name="' + option.internalname + '" Required="' + option.require + '"/>', true, SP.AddFieldOptions.addToDefaultContentType),
                                SP.FieldMultiChoice);
                                choiceDropDownField.set_title(option.title);
                                choiceDropDownField.set_choices(option.arraychoice);
                                choiceDropDownField.update();
                                break;
                        }
                    }
                    var createList = function (_key,pdata) {
                        // Create a new Deferred object
                        var deferred = $.Deferred();

                        //create object for list creation  
                        var listCreationInfo = new SP.ListCreationInformation();
                        listCreationInfo.set_title(pdata.Title);

                        //set list template
                        switch (_key) {
                            case "AdminHr":
                            case "LeaveMaxDate":
                            case "Officer":
                            case "Options":
                            case "Holidays":
                            case "RequestForm":
                                //provide template type - genericList is custom list template  
                                listCreationInfo.set_templateType(SP.ListTemplateType.genericList);
                                break;
                            case "WorkflowHistoryList":
                                //provide template type - genericList is custom list template  
                                listCreationInfo.set_templateType(SP.ListTemplateType.workflowHistory);
                                break;
                            case "WorkflowTaskList":
                                //provide template type - genericList is custom list template  
                                listCreationInfo.set_templateType(SP.ListTemplateType.tasks);
                                break;

                        }
                        

                        // add list in host web  
                        var list = currentWEB.get_lists().add(listCreationInfo);
                        // Get filed collection
                        var fldCollection = list.get_fields();
                        switch (_key) {
                         //example
                        //setFieldToList(context, fldCollection, { title: "AText", internalname: "AText" }, "Text");
                        //setFieldToList(context, fldCollection, { title: "APlainText", internalname: "APlainText" }, "PlainText");
                        //setFieldToList(context, fldCollection, { title: "ARichText", internalname: "ARichText" }, "RichText");
                        //setFieldToList(context, fldCollection, { title: "AEnhancedText", internalname: "AEnhancedText" }, "EnhancedText");
                        //setFieldToList(context, fldCollection, { title: "ABoolean", internalname: "ABoolean" }, "Boolean");
                        //setFieldToList(context, fldCollection, { title: "AImage", internalname: "AImage" }, "Image");
                        //setFieldToList(context, fldCollection, { title: "AURL", internalname: "AURL" }, "URL");
                        //setFieldToList(context, fldCollection, { title: "ANumber", internalname: "ANumber" }, "Number");
                        //setFieldToList(context, fldCollection, { title: "APercentage", internalname: "APercentage" }, "Percentage");
                        //setFieldToList(context, fldCollection, { title: "AUser", internalname: "AUser" }, "User");
                        //setFieldToList(context, fldCollection, { title: "AUserGroup", internalname: "AUserGroup",allowmutiple:true }, "UserGroup");
                        //setFieldToList(context, fldCollection, { title: "ADateOnly", internalname: "ADateOnly" }, "DateOnly");
                        //setFieldToList(context, fldCollection, { title: "ADateTime", internalname: "ADateTime" }, "DateTime");
                        //setFieldToList(context, fldCollection, { title: "AChoiceDropDown", internalname: "AChoiceDropDown", arraychoice: new Array("Admin", "HR"), defaultvalue: "HR" }, "ChoiceDropDown");
                        //setFieldToList(context, fldCollection, { title: "AChoiceRadio", internalname: "AChoiceRadio", arraychoice: new Array("Admin", "HR") }, "ChoiceRadio");
                        //setFieldToList(context, fldCollection, { title: "AChoiceCheckBox", internalname: "AChoiceCheckBox", arraychoice: new Array("Admin", "HR") }, "ChoiceCheckBox");
                            case "AdminHr":                               
                                setFieldToList(context, fldCollection, { title: "Officer", internalname: "Officer" }, "User");
                                setFieldToList(context, fldCollection, { title: "Position Type", internalname: "PositionType", arraychoice: new Array("Admin", "HR"), defaultvalue: "Admin" }, "ChoiceDropDown");
                                break;
                            case "LeaveMaxDate":
                                setFieldToList(context, fldCollection, { title: "Max Leave Value", internalname: "MaxLeaveValue" }, "Number");
                                setFieldToList(context, fldCollection, { title: "Sort Index", internalname: "SortIndex" }, "Number");
                                setFieldToList(context, fldCollection, { title: "Show Hide", internalname: "ShowHide" }, "Boolean");
                                setFieldToList(context, fldCollection, { title: "Gender", internalname: "GenderMaxDate", arraychoice: new Array("All", "Male", "Female"), defaultvalue: "All" }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Minimum Year", internalname: "MinimumYear",defaultvalue:"0" }, "Number");
                                break;
                            case "Officer":
                                setFieldToList(context, fldCollection, { title: "Officer", internalname: "Officer",require:true }, "User");
                                setFieldToList(context, fldCollection, { title: "Gender", internalname: "OfficerGender", arraychoice: new Array("Male", "Female"), require: true }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Position", internalname: "OfficerPosition" ,arraychoice: new Array("Admin", "HR","Manager","IT"), require: true}, "ChoiceCheckBox");
                                setFieldToList(context, fldCollection, { title: "Department", internalname: "OfficerDepartment" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Start Working", internalname: "OfficerStartWorking",require: true  }, "DateOnly");
                                setFieldToList(context, fldCollection, { title: "Manager", internalname: "OfficerManager" }, "User");
								setFieldToList(context, fldCollection, { title: "My Quata", internalname: "OfficerQuata" }, "PlainText");
								setFieldToList(context, fldCollection, { title: "Stamp Year", internalname: "OfficerYear" }, "Number");

                                break;
                            case "Options":
                                setFieldToList(context, fldCollection, { title: "Details", internalname: "Details" }, "Text");
                                break;
                            case "Holidays":
                                setFieldToList(context, fldCollection, { title: "HolidayDate", internalname: "HolidayDate" }, "DateOnly");
                                break;

                            case "RequestForm":
                                setFieldToList(context, fldCollection, { title: "Position", internalname: "OfficerPosition" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Unit", internalname: "OfficerUnit" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Division", internalname: "OfficerDivision" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Leave Type", internalname: "LeaveType", arraychoice: new Array("ลากิจ", "ลาป่วย", "อื่นๆ") }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Start Date", internalname: "StartDate" }, "DateOnly");
                                setFieldToList(context, fldCollection, { title: "Start Time", internalname: "StartTime", arraychoice: new Array("เช้า", "บ่าย", "เต็มวัน") }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "End Date", internalname: "EndDate" }, "DateOnly");
                                setFieldToList(context, fldCollection, { title: "End Time", internalname: "EndTime", arraychoice: new Array("เช้า", "บ่าย", "เต็มวัน") }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Number Of Day", internalname: "NumberOfDay" }, "Number");
                                setFieldToList(context, fldCollection, { title: "Reason", internalname: "Reason" }, "PlainText");
                                setFieldToList(context, fldCollection, { title: "Phone Number", internalname: "PhoneNumber" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Leave Status", internalname: "LeaveStatus", arraychoice: new Array("In Progress", "Approved", "Rejected", "Cancelled"), defaultvalue: "In Progress" }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Cancel Leave Status", internalname: "CancelLeaveStatus", arraychoice: new Array("In Progress", "Cancelled", "Rejected")}, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Other Leave Type", internalname: "OtherLeaveType" }, "Text");
                                setFieldToList(context, fldCollection, { title: "Request Type", internalname: "RequestType", arraychoice: new Array("New", "Cancel") }, "ChoiceDropDown");
                                setFieldToList(context, fldCollection, { title: "Requester", internalname: "Requester" }, "User");
                                setFieldToList(context, fldCollection, { title: "Manager", internalname: "OfficerManager" }, "User");
                                setFieldToList(context, fldCollection, { title: "Hr Approve", internalname: "HrApprove", allowmutiple: true }, "User");
                                setFieldToList(context, fldCollection, { title: "CancelWorkflow", internalname: "CancelWorkflow" }, "Text");
                                setFieldToList(context, fldCollection, { title: "CurrentUrl", internalname: "CurrentUrl" }, "Text");
                                setFieldToList(context, fldCollection, { title: "CurrentHostUrl", internalname: "CurrentHostUrl" }, "Text");
                                setFieldToList(context, fldCollection, { title: "CurrentAppUrl", internalname: "CurrentAppUrl" }, "Text");

                                break;
                              case "WorkflowTaskList":
                                setFieldToList(context, fldCollection, { title: "Task Reason", internalname: "TaskReason" }, "PlainText");
                                break;

                        }                     

                        var listRootFolder= list.get_rootFolder();

                        context.load(list);
                        context.load(listRootFolder);
                        context.load(currentWEB);
                        context.executeQueryAsync(function () {
                            //alert("Sharepoint custom list is created Successfully..")
                            var rootweb = currentWEB.get_url().replace(currentWEB.get_serverRelativeUrl(),"");
                            return deferred.resolve(list.get_id(),rootweb +listRootFolder.get_serverRelativeUrl());
                        }, function (sender, args) {
                            //console.log('Failed to create list. Error:' + args.get_message());
                            return deferred.reject('Failed to create list. Error:' + args.get_message());
                        });

                        // Return the Deferred's Promise object
                        return deferred.promise();
                    }
                    var createDefaultItemList = function (_key,pdata) {
                        // Create a new Deferred object
                        var deferred = $.Deferred();

                        // get list in host web  
                        var list = currentWEB.get_lists().getByTitle(pdata.Title);
                        
                        //New Item to List
                        switch (_key) {
                           case "LeaveMaxDate":
                               //ลากิจ
                                var itemCreateInfo = new SP.ListItemCreationInformation();
                                var listitem1 = list.addItem(itemCreateInfo );

                                listitem1.set_item('Title', 'ลากิจ');
                                listitem1.set_item('MaxLeaveValue', 6);
                                listitem1.set_item('SortIndex', 1);
                                listitem1.set_item('ShowHide', true);

                                listitem1.update();
                                //ลาป่วย
                                var listitem2 = list.addItem(itemCreateInfo );

                                listitem2.set_item('Title', 'ลาป่วย');
                                listitem2.set_item('MaxLeaveValue', 30);
                                listitem2.set_item('SortIndex', 2);
                                listitem2.set_item('ShowHide', true);

                                listitem2.update();
                                //อื่นๆ
                                var listitem3 = list.addItem(itemCreateInfo );

                                listitem3.set_item('Title', 'อื่นๆ');
                                listitem3.set_item('MaxLeaveValue', 90);
                                listitem3.set_item('SortIndex',4);
                                listitem3.set_item('ShowHide', false);

                                listitem3.update();
                                
                                //ลาพักร้อน
                                var listitem4 = list.addItem(itemCreateInfo );

                                listitem4.set_item('Title', 'ลาพักร้อน');
                                listitem4.set_item('MaxLeaveValue', 6);
                                listitem4.set_item('SortIndex', 3);
                                listitem4.set_item('ShowHide', true);

                                listitem4.update();
								//"Gender", internalname: "GenderMaxDate", arraychoice: new Array("All", "Male", "Female")
								// ลาบวช 
                                var listitem5 = list.addItem(itemCreateInfo );

                                listitem5 .set_item('Title', 'ลาบวช');
                                listitem5 .set_item('MaxLeaveValue', 15);
                                listitem5 .set_item('SortIndex', 5);
                                listitem5 .set_item('ShowHide', false);
                                listitem5 .set_item('GenderMaxDate', "Male");

                                listitem5 .update();
								
								//ลาคลอด
                                var listitem6 = list.addItem(itemCreateInfo );

                                listitem6 .set_item('Title', 'ลาคลอด');
                                listitem6 .set_item('MaxLeaveValue', 90);
                                listitem6 .set_item('SortIndex', 6);
                                listitem6 .set_item('ShowHide', false);
                                listitem6 .set_item('GenderMaxDate', "Female");


                                listitem6 .update();

                                break;
                            //case "Options":
                            //    break;
                        }

                        context.executeQueryAsync(function () {
                            //alert("Sharepoint custom list is created Successfully..")
                            return deferred.resolve();
                        }, function (sender, args) {
                            //console.log('Failed to create list. Error:' + args.get_message());
                            return deferred.reject('Failed to add default item to list. Error:' + args.get_message());
                        });

                        // Return the Deferred's Promise object
                        return deferred.promise();
                    }
                    
                    var loadAfterGetUserInfo=function(){
                    		ToraAsiaLeaveRequestInfo.Services.CalulateWorkDay(function(){
                    			callback();
                    		});
                    		
                    }
				
                    var loadGetCreateListSuccess = function(){
                    		var maxstepcheck = 7;
                    		var currentstepcount = 0;
                            
                    		/*var curuser = currentWEB.get_currentUser();
                    		context.load(curuser);
                    		context.executeQueryAsync(function () {
                    		    ToraAsiaLeaveRequestInfo.Services.isSiteAdmin = curuser.get_isSiteAdmin();
                    		    currentstepcount++
                    		    if (currentstepcount === maxstepcheck) {
                    		        loadAfterGetUserInfo();
                    		    }
                    		}, function (sender, args) {
                    		    currentstepcount++
                    		    if (currentstepcount === maxstepcheck) {
                    		        loadAfterGetUserInfo();
                    		    }
                    		});
                            */
							ToraAsiaLeaveRequestInfo.Services.CheckworkflowMapping(context,currentWEB ).then(function(){
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});
							ToraAsiaLeaveRequestInfo.Services.CheckFoundWorflow(context,currentWEB ).then(function(defw){
									if(defw!== null){
										ToraAsiaLeaveRequestInfo.Services.IsFoundWorkflow = true;	
										ToraAsiaLeaveRequestInfo.Services.WorkflowDefId = defw.get_id().toString();
										//console.log(ToraAsiaLeaveRequestInfo.Services.WorkflowDefId);
									}
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});

							ToraAsiaLeaveRequestInfo.Services.CheckActivateFeature(context,currentWEB ).then(function(isactivatge){
									if(typeof isactivatge !== 'undefined'){
										ToraAsiaLeaveRequestInfo.Services.IsFeatureActivate = isactivatge ;									
									}
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});
							ToraAsiaLeaveRequestInfo.Services.GetOptionsData().then(function(dobtion){
									if(dobtion!=null){
										ko.utils.arrayForEach(dobtion, function(ddata) {
									    	switch(ddata.Title){
									    		case "EndCircleYear":
									    				if(ddata.Details !== null){
									    					ToraAsiaLeaveRequestInfo.Services.IsSetEndCircle = true;
									    					ToraAsiaLeaveRequestInfo.Services.EndCircleDate = moment(ddata.Details,ko.dateformat.endcircletoList);
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.EndCircleID = ddata.ID;	

									    			break;
									    		case "FoundWorkflow":
									    				if(ddata.Details === "true"){
									    					ToraAsiaLeaveRequestInfo.Services.IsFoundWorkflowOption = true;	
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.FoundWorkflowID= ddata.ID;	
									    			break;
												case "WorkflowMaping":
									    				if(ddata.Details === "true"){
									    					ToraAsiaLeaveRequestInfo.Services.IsWorkflowMapingOption  = true;
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.WorkflowMapingID= ddata.ID;	
									    			break;
									    		case "ActivateFeature":
									    				if(ddata.Details === "true"){
									    					ToraAsiaLeaveRequestInfo.Services.IsFeatureActivate = true;
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.ActivateFeatureID = ddata.ID;	
									    		break;
									    		case "WorkingDays":
									    				if(ddata.Details !== null && ddata.Details !== ""){
									    					ToraAsiaLeaveRequestInfo.Services.WorkingDays = ddata.Details.split(',');
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.WorkingDaysID=ddata.ID;	
									    		break;
									    		case "WorkType":
									    				if(ddata.Details !== null && ddata.Details !== ""){
									    					ToraAsiaLeaveRequestInfo.Services.WorkType= ddata.Details;
									    				}
									    				ToraAsiaLeaveRequestInfo.Services.WorkTypeID=ddata.ID;	
									    		break;


									    	}
									    });	
									}
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});
							ToraAsiaLeaveRequestInfo.Services.GetOfficerInfo().then(function(){
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});
							ToraAsiaLeaveRequestInfo.Services.GetOfficerInfo(true).then(function(){
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});
							ToraAsiaLeaveRequestInfo.Services.GetHolidaysData().then(function(data){
									var holidaydata = [];
									ko.utils.arrayForEach(data, function(item) {
										holidaydata.push(item.HolidayDate);
								    });
									ToraAsiaLeaveRequestInfo.Services.HoliDays = holidaydata ;
									currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}
							},function(){
								 currentstepcount++
									if(currentstepcount === maxstepcheck ){
										loadAfterGetUserInfo();
									}

							});


							
                    	//callback();
                    }
                    ko.utils.objectForEach(ToraAsiaLeaveRequestInfo.ListManagement, function (key, value) {
                        //alert(key + ": " + value);
                        var curkey = key;
                        var curvalue = value;
                        getListInfo(curvalue.Title).then(function (id,url) {
                            curvalue.ID = id.toString();
                            curvalue.Url = url;
                            //ToraAsiaLeaveRequestInfo.ListManagement[curkey] = curvalue;
                            currentListCount++;
                            //console.log(ToraAsiaLeaveRequestInfo.ListManagement);
                            //console.log(currentListCount +"---"+maxListCount);
                            if (currentListCount === maxListCount) {
                                loadGetCreateListSuccess();
                            }
                        }, function (egr) {
                            console.log(egr);
                            if(iscreatelist){
		                            createList(curkey,curvalue).then(function (id2,url2) {
		                                curvalue.ID = id2.toString();
                            			curvalue.Url = url2;
		                                //ToraAsiaLeaveRequestInfo.ListManagement[curkey] = curvalue;
		                                createDefaultItemList(curkey,curvalue).then(function () {

			                                currentListCount++;
			                                if (currentListCount === maxListCount) {
			                                    loadGetCreateListSuccess();
			                                }
			                            }, function (egr3) {
			                                console.log(egr3);
			                                currentListCount++;
			                                if (currentListCount === maxListCount) {
			                                    loadGetCreateListSuccess();
			                                }
			                            });

		                                //currentListCount++;
		                                //if (currentListCount === maxListCount) {
		                                //    callback();
		                                //}
		                            }, function (egr2) {
		                                console.log(egr2);
		                                currentListCount++;
		                                if (currentListCount === maxListCount) {
		                                    loadGetCreateListSuccess();
		                                }
		                            });
                            }
                            else{
                            	currentListCount++;
		                        if (currentListCount === maxListCount) {
		                            callback();
		                        }

                            }
                        })
                    });
                    
            //});
        },
        StartWorkflow:function(ListItemId){	
    		var deferred = $.Deferred();               
			//Get SP clientContext
			SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
			  //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
			 var hostcontext = new SharePointClient.Services.JSOM.Context();
			 //get current context
			 var context= hostcontext.GetClientContext();                
			 //get current web  
			 var web = hostcontext.GetWeb();               
			 //SharePointClient.Configurations.IsCrossDomainRequest = false;
			 var subscriptionId = ToraAsiaLeaveRequestInfo.Services.WorkflowSubscriptionId;
			context.load(web);
			var servicesManager = SP.WorkflowServices.WorkflowServicesManager.newObject(context, web);
			context.load(servicesManager);
			var subs = servicesManager.getWorkflowSubscriptionService().getSubscription(subscriptionId);
			context.load(subs);
			var initiationParams = {};
			servicesManager.getWorkflowInstanceService().startWorkflowOnListItem(subs, ListItemId, initiationParams);
             context.executeQueryAsync(function () {
                            //alert("Sharepoint custom list is created Successfully..")
                            //var rootweb = currentWEB.get_url().replace(currentWEB.get_serverRelativeUrl(),"");
                            return deferred.resolve();
                        }, function (sender, args) {
                            //console.log('Failed to create list. Error:' + args.get_message());
                            return deferred.reject('Failed to create list. Error:' + args.get_message());
                        });

			 
			return deferred.promise();
    	},  	
        IsAllListCreated : function(){
        	var isallcrate = true;
        	//console.log(ToraAsiaLeaveRequestInfo.ListManagement);	
        	ko.utils.objectForEach(ToraAsiaLeaveRequestInfo.ListManagement, function (key, value) {
        		isallcrate  = (isallcrate && value.ID !== null)		    
		    });
			return isallcrate ;
        	
        },
        GetIsWorkflowMapping : function(){
        	if(ToraAsiaLeaveRequestInfo.Services.isSiteAdmin()){
				return ToraAsiaLeaveRequestInfo.Services.IsWorkflowMaping;	
			}
			return ToraAsiaLeaveRequestInfo.Services.IsWorkflowMapingOption;	
        },
        GetIsFoundWorkflow : function(){
        	if(ToraAsiaLeaveRequestInfo.Services.isSiteAdmin()){
				return ToraAsiaLeaveRequestInfo.Services.IsFoundWorkflow;	
			}
			return ToraAsiaLeaveRequestInfo.Services.IsFoundWorkflowOption;	
        },
		GetIsSetEndCircle : function(){
			return ToraAsiaLeaveRequestInfo.Services.IsSetEndCircle;	
        },
        GetIsFeatureActivate : function(){
			return ToraAsiaLeaveRequestInfo.Services.IsFeatureActivate;	
        },
        GetOfficerManager:function(){
        	if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length === 0) 
        	{	
        		return null;
        	}
        	else{
        		return ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerManager
        	}
        },
        GetOfficerHR:function(){
        	if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length === 0) 
        	{	
        		return null;
        	}
        	else{
        		//console.log(ToraAsiaLeaveRequestInfo.Services.OfficerHR);
        		var hrcoll = [];
        		ko.utils.arrayForEach(ToraAsiaLeaveRequestInfo.Services.OfficerHR, function(ouser ) {
		             hrcoll.push(ouser.Officer);         
		        });

        		return hrcoll;
        		//return ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerManager
        	}
        },
		GetUserId:function(){
        	return _spPageContextInfo.userId;
        },
		isSiteAdmin: function () {
		    return _spPageContextInfo.isSiteAdmin
            //return ToraAsiaLeaveRequestInfo.Services.isSiteAdmin;
        },
        isFoundOfficer:function(){
        	return ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length > 0;
        },
        isAdmin:function(){
        	if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length === 0) 
        	{	
        		return false;
        	}
        	else{
        		return ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerPosition.indexOf("Admin") > -1
        	}
        },
        isHr:function(){
        	if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length === 0) 
        	{	
        		return false;
        	}
        	else{
        		return ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerPosition.indexOf("HR") > -1
        	}
        },
        isManager:function(){
        	if(ToraAsiaLeaveRequestInfo.Services.OfficerInfo.length === 0) 
        	{	
        		return false;
        	}
        	else{
        		return ToraAsiaLeaveRequestInfo.Services.OfficerInfo[0].OfficerPosition.indexOf("Manager") > -1
        	}
        },
        isAppReady:function(){
			return ToraAsiaLeaveRequestInfo.Services.IsAllListCreated()
    					&&ToraAsiaLeaveRequestInfo.Services.GetIsWorkflowMapping()
    						&&ToraAsiaLeaveRequestInfo.Services.GetIsFoundWorkflow () 
    							&&ToraAsiaLeaveRequestInfo.Services.GetIsFeatureActivate();
        },


    };
    //#endregion
})();
