ko.dateformat={
	normal:"DD MMM YYYY",
	self:"DD MMM YYYY",
	tolist:"MM/DD/YYYY HH:mm:ss",
	tolistnoTime:"MM/DD/YYYY",
	endcircletoList:"MM/DD",
}
ko.defaultquery = "<{0}>"+
						"<FieldRef Name='{1}' {4}/>"+
						"<Value {5} Type='{2}'>{3}</Value>"+
				"</{0}>";

ko.MergeType = { Or: 'Or', And: 'And' };
 
			///
			/// Merge CAML conditions in code
			///
			/// A list of conditions to merge into alternative or conjunction
			/// MergeType.Or for alternative, MergeType.And for conjunction
			///
ko.MergeCAMLConditions = function(arrStrConditionsObj, objMergeType) {
				//var str = JSON.stringify(arrStrConditionsObj);
				var arrStrConditions = arrStrConditionsObj;
				//console.log(arrStrConditions);
				/*var neqformatstr = "<Neq>"+
										"<FieldRef Name='ID'/>"+
										"<Value Type='Text'>{0}</Value>"+
									"</Neq>";
				for(var j = 0;j<arrStrConditionsObj.length;j++){
					arrStrConditions.push(String.format(neqformatstr,arrStrConditionsObj[j].Id));
				}*/
			    // No conditions => empty response
			    if (arrStrConditions.length == 0) return "";//String.format(neqformatstr,0);
			 
			    // Initialize temporary variables
			    var typeStart = (objMergeType == ko.MergeType.And ? "<And>" : "<Or>");
			    var typeEnd = (objMergeType == ko.MergeType.And ? "</And>" : "</Or>");
			    var  arrStrComplexConditions ;
			    var i;
			 	
			    // Build hierarchical structure
			    while (arrStrConditions.length > 1) { // Two or more items
			       arrStrComplexConditions = [];
			 	   //console.log("len:"+arrStrConditions.length);
			        // Loop
			        
			        for (i = 0; i < arrStrConditions.length; i += 2) {
			        	//console.log(arrStrConditions[i]);
			            if (arrStrConditions.length == i + 1) // Only one condition left
			                arrStrComplexConditions.push(arrStrConditions[i]);
			 
			            else // Two conditions – merge
			                arrStrComplexConditions.push(typeStart +arrStrConditions[i] +arrStrConditions[i+1] + typeEnd);
			        }
			 
			        // Re-set the initial array
			        arrStrConditions = arrStrComplexConditions;
			        //console.log(arrStrComplexConditions);
			    }
			 	//console.log(arrStrConditions);
			    // return
			    return arrStrConditions[0];
}

ko.errorquery = function(sender, args){
	console.log('Request failed. ' + args.get_message() + 
            		'\n' + args.get_stackTrace());
}
ko.getUserId = function (loginNameArr,callback) {
		    var context = new SP.ClientContext.get_current();
		    var userarr = [];
		    ko.utils.arrayForEach(loginNameArr, function(loginName ) {
                var user = context.get_web().ensureUser(loginName);
		    	userarr.push(user);
		    	context.load(user);
            });
		    
		    context.executeQueryAsync(function(){
		    	var uidarr = [];
		    	ko.utils.arrayForEach(userarr, function(u ) {
	                uidarr.push(u.get_id());	            
	            });
		    	if(callback){
		    		callback(uidarr);
		    	}
		    },ko.errorquery);
}	
ko.getRelatedObjectData = function(itemobj,relatedata,curr,option){
		
		var option2 = $.extend({},option);
			option2.filedDisplay = curr.relatedField;
		var defaultitemobj = {}
		for(var i=0;i<option2.filedDisplay.length;i++){
			defaultitemobj[option2.filedDisplay[i].field] = ko.observable("default");
		}
		$.extend(itemobj,defaultitemobj);	
		var relateddataobj = JSON.parse(relatedata);

		//Get SP clientContext
		SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
				                //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
		var hostcontext = new SharePointClient.Services.JSOM.Context();
				                //get current context
		var ctx = hostcontext.GetClientContext();
				                //get current web  
		var web = hostcontext.GetWeb();
				                
		//SharePointClient.Configurations.IsCrossDomainRequest = false;
		
		var item = web.get_lists().getByTitle(curr.relatedListName).getItemById(relateddataobj[0].ItemId);
		ctx.load(item);
		ctx.executeQueryAsync(function() {
			ko.readFieldData(item,option2,itemobj);
			//$.extend(itemobj,newitemobj );	
			//	  itemobj[curr.field](resultdata );
		},ko.errorquery);	
}
ko.getLookupInfo = function(itemobj,lookupId,curr,option){
			//console.log(courseId);
			var ctx = new SP.ClientContext(option.ctxUrl);
			var item = ctx.get_web().get_lists().getByTitle(curr.listName).getItemById(lookupId);
			ctx.load(item);
			ctx.executeQueryAsync(function() {
				  var resultdata = "";
				  var formatdate = curr.format ||option.format;
				   if(item){
				   	 switch(curr.fieldtype){
				   	 	case"Date":
				   	 		resultdata = moment(item.get_item(curr.typefield)).format(formatdate );
							break;
						default:
							resultdata = item.get_item(curr.typefield);
						break;
				   	 	
				   	 }
			      }
				itemobj[curr.field](resultdata );
			},ko.errorquery);	
}
ko.readFieldData = function(oListItem,options,olditemobj){
	//format = format||ko.dateformat.nomal;
	var isupdate = (typeof olditemobj !== 'undefined'?true:false);
	var itemobj = {}
							    for(var i=0;i<options.filedDisplay.length;i++){
							        		var cur  = options.filedDisplay [i];
							        		var itemvalue = "";
							        		switch(cur.type){
							        			case "LookupText":
							        					itemvalue  = oListItem.get_item(cur.typefield).get_lookupValue();
							        				 break;
							        			case "LookupId":
							        					itemvalue  = (oListItem.get_item(cur.typefield).get_lookupId());;
										        	break;
							        			case "MapLookupInfo":
							        					itemvalue  = ko.observable("");
							        					//var v2 = (oListItem.get_item(cur.typefield).get_lookupId());;
							        					var  courseId = oListItem.get_item("ID");
							        					if(typeof cur.lookup !== "undefined"){
							        						var ldata = oListItem.get_item(cur.lookup);
							        						if(ldata  !== null){
							        							courseId  = ldata.get_lookupId();
							        						}
							        					}
							        					ko.getLookupInfo(itemobj,courseId ,cur,options)
							        				 break;
												case "RelatedItems":
													  var relatedata = oListItem.get_item(cur.typefield);
							        				  //itemobj[cur.field] = relatedata 
													  itemvalue   = 	relatedata ;		
							        				  var  curItemId = oListItem.get_item("ID");
							        				  ko.getRelatedObjectData (itemobj,relatedata ,cur,options)
							        				  //$.extend( itemobj, {"TestJa":"AAA"} );
							        				break;
							        			case "UserMulitple":
							        					var selecfield = (cur.typefield)?cur.typefield:cur.field;
							        					var domain = "i:0#.f|membership|";
							        					var groupsp = oListItem.get_item(selecfield );
													     var groupsptxt = "";
													     if(groupsp !== null){
														for(var j=0;j<groupsp.length;j++){
															  	var loginname = groupsp[j].$6_2;
															  	//console.log(loginname);
															  	if(loginname!==null && loginname.length > 0){
															  		groupsptxt+= (j>0?";":"")+domain +loginname;
															  	}
															  	else{
															  		groupsptxt+= (j>0?";":"")+groupsp[j].get_lookupValue();
															  	}
															  }
														}
														 itemvalue   = groupsptxt;
	
							        					//itemobj[cur.field] = groupsptxt;
							        				 break;
							        			case "LookupToObject":
							        					var selecfield = (cur.typefield)?cur.typefield:cur.field;
							        					 var coursesp = oListItem.get_item(selecfield );
														  var cousearr = [];
														  for(var j=0;j<coursesp .length;j++){
														  	var obj = {};
														  		obj.Title = coursesp[j].get_lookupValue(); 
														  		obj.Id = coursesp[j].get_lookupId();
														  		cousearr.push(obj);
														  }

							        				 	itemvalue   = cousearr ;

							        				 break;
												case "UseDay":
							        					var daytitile = oListItem.get_item(cur.typefield);
														var dayinprogress =  ko.utils.arrayFilter(cur.source, function(dv) {
											                return dv.LeaveStatus === "In Progress" && dv.LeaveType === daytitile
											                && dv.CancelLeaveStatus !== "Cancelled";
											            });
											            var dayapprove =  ko.utils.arrayFilter(cur.source, function(dv) {
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
														
							        				 	itemvalue   = dayobj ;

													break;
							        			case "DefaultImage":
							        					itemvalue    = (ko.observable(options.defaultimage+options.rendition));
							        				 break;
							        			case "Date":
							        					var selecfield = (cur.typefield)?cur.typefield:cur.field;
							        					//console.log(selecfield);
							        					var formatdate = cur.format ||options.format;
							        					var curdate = new Date(oListItem.get_item(selecfield));
							        					itemvalue    =  moment(curdate).format(formatdate);
							        				 break;
							        			case "Index":
							        				 itemvalue    = (indexcount);
							        				break;
							        			case "Default":
							        				  itemvalue     = oListItem.get_item(cur.typefield);
							        				break;
							        			case "observableDefault":
							        				  var selecfield2 = (cur.typefield)?cur.typefield:cur.field;
	
							        				  itemvalue  = ko.observable(oListItem.get_item(selecfield2 ));
							        				break;

							        			case "observableEmpty":
							        				  itemvalue  = ko.observable();
							        				break;

							        			case "Replace":
							        				  itemvalue   = oListItem.get_item(cur.typefield).replace(cur.replace,cur.replacewith);
							        				break;
							        			case "ThumbnailOrFileRef":
							        				    var thumbailimg = null;
											        	try{
											        	 thumbailimg = oListItem.get_item('AlternateThumbnailUrl');
											        	}catch(e){}
												        //console.log(thumbailimg);
												        var thumbnailimgurl  = (thumbailimg !== null)?thumbailimg.get_url():oListItem.get_item('FileRef');

							        				  itemvalue   = ko.observable(thumbnailimgurl);
							        				break;
							        			case "FileRefOrGuid":
							        					var concattxt = cur.concatstr ||"";
											        	var fileref = oListItem.get_item('FileRef')+concattxt;
											        	try{
											        	 var thumbailimg = oListItem.get_item('AlternateThumbnailUrl');
											        	 fileref = oListItem.get_item('UniqueId').toString();
											        	}catch(e){}
							        				  itemvalue     =  ko.observable(fileref );
							        				break;
							        			default:
							        					itemvalue   = (oListItem.get_item(cur.field));
							        				break;
							        		}
							        		
							        		if(!isupdate){
								        		itemobj[cur.field] = itemvalue ;
								        	}
								        	else{
								        		olditemobj[cur.field](itemvalue);
								        	}

							        		
	}
			
	return itemobj ;
}

ko.getdataFromEnum = function(options,otheroption){
					var listItemEnumerator = options.ItemEnum.getEnumerator(),
						curentPage = options.curentPage||0,
						filedDisplay = options.filedDisplay || [],
						perPage = 	options.perPage || 0
						options.format = options.format || ko.dateformat.nomal;
						
						options = ko.utils.extend(options, otheroption);
						var alldata = [];
					    var indexcount = (curentPage*perPage)+1;
					        while (listItemEnumerator.moveNext()) 
					        {
					        	var oListItem = listItemEnumerator.get_current();
					        	//var oListItem = items.getEnumerator().$8_0[0];
					        			var itemobj = ko.readFieldData(oListItem,options)
							        	alldata.push(itemobj);
							        	indexcount ++;
								
					        }
		return alldata;
	}

ko.queryData = function(options,callback){
		//options.ctxUrl = options.ctxUrl || _spPageContextInfo.webAbsoluteUrl;
		options.fileData = options.fileData || [];
		options.format = options.format ||ko.dateformat.nomal;
		//options.defaultimage  = options.defaultimage  || ko.defaultImg;
		options.rendition = options.rendition || "";
		
		var fieldDataDefault  = [];
		//if(options.listtype){
		//	ko.utils.objectForEach(ko.selfFiled[options.listtype], function (key, value) {
		//      	fieldDataDefault  .push({ field : value });
		//    });
		//}
		fieldDataDefault   = fieldDataDefault.concat(options.fileData);
		options.fileData  = fieldDataDefault;
    //console.log(options.fileData);
    //Get SP clientContext
		SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
    //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
		var hostcontext = new SharePointClient.Services.JSOM.Context();
    //get current context
		var ctx = hostcontext.GetClientContext();
    //get current web  
		var web = hostcontext.GetWeb();

		//SharePointClient.Configurations.IsCrossDomainRequest = false;
		//var ctx = new SP.ClientContext(options.ctxUrl);
		
		var camlQuery =  new SP.CamlQuery();
		
		if(options.queryText){
            camlQuery.set_viewXml(options.queryText);
        }

		
		var items = web.get_lists().getByTitle(options.listTitle).getItems(camlQuery);
		ctx.load(items);
		ctx.executeQueryAsync(function() {
				//var listItemEnumerator = items.getEnumerator();
				var alldata = 	ko.getdataFromEnum({
					        	ItemEnum:items,
					        	filedDisplay:options.fileData,
					        	format :options.format			        	
				        	},options)	;			 
					if(callback){
					    callback(alldata,options);
					 }
				},ko.errorquery );


}
ko.queryDataById = function(options,callback){
		//options.ctxUrl = options.ctxUrl || _spPageContextInfo.webAbsoluteUrl;
		options.fileData = options.fileData || [];
		options.format  = options.format || ko.dateformat.nomal;
		options.defaultimage  = options.defaultimage  || ko.defaultImg;
		options.rendition = options.rendition || "";
		
		var fieldDataDefault  = [];
		//if(options.listtype){
		//	ko.utils.objectForEach(ko.selfFiled[options.listtype], function (key, value) {
		//      	fieldDataDefault  .push({ field : value });
		 //   });
		//}
		fieldDataDefault   = fieldDataDefault.concat(options.fileData);
		options.filedDisplay = fieldDataDefault;

    //var ctx = new SP.ClientContext(options.ctxUrl);

        //Get SP clientContext
		    SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
        //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
		    var hostcontext = new SharePointClient.Services.JSOM.Context();
        //get current context
		    var ctx = hostcontext.GetClientContext();
        //get current web  
		    var web = hostcontext.GetWeb();

		    //SharePointClient.Configurations.IsCrossDomainRequest = false;
		
		    var item = web.get_lists().getByTitle(options.listTitle).getItemById(options.ItemId);
		
		ctx.load(item );
		ctx.executeQueryAsync(function() {
				//var listItemEnumerator = items.getEnumerator();
				var alldata = ko.readFieldData(item,options);			 
					if(callback){
					    callback(alldata);
					 }
				},ko.errorquery );


}
ko.SaveDatatoList=function(options,callback){
		//options.ctxUrl = options.ctxUrl || _spPageContextInfo.webAbsoluteUrl;
		var data = options.data || [];
		options.itemid = options.itemid || 0;
		if (options.listTitle) {
		                //Get SP clientContext
		                SharePointClient.Configurations.IsCrossDomainRequest = ToraAsiaLeaveRequestInfo.Services.IsCrossDomain;
		                //SharePointClient.Configurations.SPUrl = utility.GetHostUrl();
		                var hostcontext = new SharePointClient.Services.JSOM.Context();
		                //get current context
		                var ctx = hostcontext.GetClientContext();
		                //get current web  
		                var web = hostcontext.GetWeb();

		                //SharePointClient.Configurations.IsCrossDomainRequest = false;
		                //var ctx = new SP.ClientContext(options.ctxUrl);
		                var oList = web.get_lists().getByTitle(options.listTitle);
                        
						var itemCreateInfo = new SP.ListItemCreationInformation();
					    var oListItem  = null;
					    if(options.itemid === 0){
					   		 oListItem   = oList.addItem(itemCreateInfo);
					    }
					    else{
					    	oListItem  = oList.getItemById(options.itemid);

					    }
					    
					  	for(var i=0;i<data.length;i++){
					  		oListItem.set_item(data[i].Title,data[i].Value);
					  	}			        
					    oListItem.update();
					
					    ctx.load(oListItem);					
		    			ctx.executeQueryAsync(function() {
		    				//console.log("success"+oListItem.get_item("ID"));
		    				if(callback){
		    					
		    					callback(parseInt(oListItem.get_item("ID"),10),oListItem);
		    				}
		    				//self.saveImagefilesVideo(oListItem.get_item("Title"),parseInt(oListItem.get_item("ID"),10));
							  // Get the first items rollup image, just as an example
						},ko.errorquery);
	}
}
/********Start Binding Handlers***************/
ko.bindingHandlers.peoplepicker= (function(){
	 var self = this,
         unwrap = ko.utils.unwrapObservable; //support older KO versions that did not have ko.unwrap
         
         this.checkSPFuncLoaded = function(callback){
         		SP.SOD.executeOrDelayUntilScriptLoaded(function() {
		         try{
				        SP.SOD.registerSod("clientpeoplepicker.js", SP.Utilities.Utility.getLayoutsPageUrl("clientpeoplepicker.js"));
				        }catch(e){}

		        SP.SOD.executeOrDelayUntilScriptLoaded(function() {
		        	SP.SOD.executeOrDelayUntilScriptLoaded(function() {
		        			if(callback){
						       callback();
						    } 		
		        	},"clientpeoplepicker.js");
		        	SP.SOD.executeFunc("clientpeoplepicker.js", false, function() {});		            
		        },
		        "clienttemplates.js");
		        SP.SOD.executeFunc("clienttemplates.js", false, function() {});
		    },
		    "sp.js");
		 	SP.SOD.executeFunc("sp.js", false, function() {});
         }
	    this.valuchange = function(valueAccessor,option){
    		var observable = valueAccessor();
		     try{
		     	 var olddata = observable();
		     	 
			     var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[option.peoplePickerElementId+"_TopSpan"];

			     //console.log(userInfo );
			     //console.log(peoplePicker);
			     var keys = peoplePicker.GetAllUserKeys();
			    // console.log(olddata );
			     //console.log(keys );
			    // console.log(keys );
			     if((olddata !== keys && typeof olddata  !== 'undefined')||(keys.length > 0 && typeof olddata  === 'undefined')){
			     	option.oldvaluetmp(keys);
			     	observable(keys );
			     	
			     	
			     }
		     }catch(e){}
    }
	this.loadpeopleData= function(valueAccessor,option){
	        var schema = {};  
	        schema['SearchPrincipalSource'] = 15;  
	        schema['ResolvePrincipalSource'] = 15;  
	        schema['MaximumEntitySuggestions'] = 50;  
	        schema['Width'] = '280px';  
	        schema['AllowMultipleValues'] = option.AllowMultipleValues;  
	        if (option.PeopleorGroup == 'PeopleOnly') schema['PrincipalAccountType'] = 'User';  
	        else schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';  
	        if (option.GroupID > 0) {  
	            schema['SharePointGroupID'] = option.GroupID  
	        }  
	        // Render and initialize the picker.  
	        // Pass the ID of the DOM element that contains the picker, an array of initial  
	        // PickerEntity objects to set the picker value, and a schema that defines  
	        // picker properties.  
	        SPClientPeoplePicker_InitStandaloneControlWrapper(option.peoplePickerElementId, null, schema);  
	        SPClientPeoplePicker.SPClientPeoplePickerDict[option.peoplePickerElementId+"_TopSpan"].OnUserResolvedClientScript=function (peoplePickerElementId, selectedUsersInfo) {
		        	self.valuchange(valueAccessor,option);
		    };	    
	}
	this.setData=function(option){
	    	//console.log(currentvalue  );
	    	var peoplePickerObject = SPClientPeoplePicker.SPClientPeoplePickerDict[option.peoplePickerElementId+"_TopSpan"];
	  	    	peoplePickerObject.SetEnabledState(option.disabled);
	  	    	//console.log(element.id);
			if(typeof currentvalue  !== "undefined" && element.id === option.peoplePickerElementId){

				if(typeof option.oldvaluetmp() === 'undefined')
					{
						
						//var userName = "i:0#.f|membership|chalermwit.kh@tora-asia.com;i:0#.f|membership|weeraya.j@tora-asia.com";

							var valuearr = currentvalue.split(';')
							//console.log(valuearr.length );
							var obj = [];
							for (var index in valuearr ) {  
								//obj.push({ Key:userName });
								//console.log(userName);
								peoplePickerObject.AddUnresolvedUser({ Key:valuearr[index ]}, true);
								//peoplePickerObject.AddUserKeys(valuearr[index ]);
							}
							option.oldvaluetmp(currentvalue) ;
					}
				}
	 }

	return {
		 init: function (element, valueAccessor, allBindingsAccessor, data, context) {
				var options = allBindingsAccessor().peopleOptions || {};
		    	//console.log(options.disabled);
		    	options.peoplePickerElementId=element.id,
				options.AllowMultipleValues= options.AllowMultipleValues ||false,
				options.PeopleorGroup= options.PeopleorGroup || 'PeopleOnly',
				options.GroupID = options.GroupID || 0;
				options.oldvaluetmp= options.oldvaluetmp|| ko.observable();
				self.checkSPFuncLoaded(function(){
					self.loadpeopleData(valueAccessor,options);
				});
				//self.loadpeopleData(valueAccessor,options);

	    	},
	    update: function (element, valueAccessor, allBindingsAccessor) {
	    	    var options = allBindingsAccessor().peopleOptions || {};
		    	//console.log(options.disabled);
		    	options.peoplePickerElementId=element.id,
				options.AllowMultipleValues= options.AllowMultipleValues ||false,
				options.PeopleorGroup= options.PeopleorGroup || 'PeopleOnly',
				options.GroupID = options.GroupID || 0;
				options.oldvaluetmp= options.oldvaluetmp|| ko.observable();
				options.disabled = !options.disabled;
				self.checkSPFuncLoaded(function(){
					self.setData(options);	
				});
				//self.setData(options);

	    }

	}

})(jQuery);
ko.validation.makeBindingHandlerValidatable('peoplepicker');

ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        var thisFormat = 'DD/MM/YYYY HH:mm';
        var defaultvalue = valueAccessor()();
       // console.log(defaultvalue );
        //console.log(defaultvalue );
		
		options.useCurrent =  (options.useCurrent !== undefined)?options.useCurrent:false;
		options.format =  (options.format !== undefined)?options.format :thisFormat;
		var plusday = allBindingsAccessor().plusday || 0;
		options.minDate = (typeof options.minDate !== "undefined" && options.minDate!== null)?moment(options.minDate.format(options.format)).add(plusday  , 'days'):false;
		/*if(options.plusday > 0){
			
		}
		else{
			options.minDate = (typeof options.minDate !== "undefined" && options.minDate!== null)?options.minDate:false;
		}*/
		if(typeof defaultvalue  !== 'undefined' && defaultvalue  !== null){
       		options.defaultDate = moment(defaultvalue,options.format) ;
		}
		
        $(element).datetimepicker(options);
		
        //handle the field changing
		ko.utils.registerEventHandler(element, "dp.change", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(event.date);
            }
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datetimepicker("destroy");
        });
        
         $(element).parent().find(".input-group-addon").click(function(){
		 	$(element).trigger('focus');
		 });


    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        var thisFormat = 'DD/MM/YYYY HH:mm';
        var defaultvalue = valueAccessor()();
        
		options.format =  (options.format !== undefined)?options.format :thisFormat;
       	var plusday = allBindingsAccessor().plusday || 0;		
       	options.minDate = (typeof options.minDate !== "undefined" && options.minDate!== null)?moment(options.minDate.format(options.format)).add(plusday  , 'days'):false;
		
		var diff = 9999;
		if(typeof defaultvalue  !== 'undefined' && defaultvalue  !== null){
			diff = defaultvalue .diff(options.minDate, 'days');
			//console.log(diff);
       		//$(element).data("DateTimePicker").date(defaultvalue )		
       	}   
       	else{
       		defaultvalue = null;
       	}  
       	
       	$(element).data("DateTimePicker").date(defaultvalue )	
       	if(!isNaN(diff) && diff < 0){
       		$(element).data("DateTimePicker").clear()
       	}  	
       	$(element).data("DateTimePicker").minDate(options.minDate);
    }
};
ko.validation.makeBindingHandlerValidatable('datepicker');

//overide from knockout-jqAutocomplete.js
ko.bindingHandlers.customautoComplete = (function(){
	 var self = this,
         unwrap = ko.utils.unwrapObservable; //support older KO versions that did not have ko.unwrap
	  //if dealing with local data, the default filtering function
        this.defaultFilter = function(item, term) {
            term = term && term.toLowerCase();
            return (item || item === 0) && ko.toJSON(item).toLowerCase().indexOf(term) > -1;
        };

        //filter/map options to be in a format that autocomplete requires
        this.processOptions = function(valueAccessor, filter, data, request, response) {
            var item, index, length,
                items = unwrap(data) || [],
                results = [],
                props = this.getPropertyNames(valueAccessor);
				//console.log(items );
				//console.log(filter);

            //filter/map items
            for (index = 0, length = items.length; index < length; index++) {
                item = items[index];

                if (!filter || filter(item, request.term)) {
                    results.push({
                        label: props.label ? item[props.label] : item.toString(),
                        value: props.input ? item[props.input] : item.toString(),
                        actual: props.value ? item[props.value] : item,
                        data: item
                    });
                }
            }

            //call autocomplete callback to display list
            response(results);
        };

        //if specified, use a template to render an item
        this.renderItem = function(templateName, context, ul, item) {
            var $li = $("<li></li>").appendTo(ul),
                itemContext = context.createChildContext(item.data);

            //apply the template binding
            ko.applyBindingsToNode($li[0], { template: templateName }, itemContext);

            //clean up
            $li.one("remove", ko.cleanNode.bind(ko, $li[0]));

            return $li;
        };

        //retrieve the property names to use for the label, input, and value
        this.getPropertyNames = function(valueAccessor) {
        	//console.log(valueAccessor)
            var options = ko.toJS(valueAccessor);
            //console.log(options)

            return {
                label: options.labelProp || options.valueProp,
                input: options.inputProp || options.labelProp || options.valueProp,
                value: options.valueProp
            };
        };

        //default global options passed into autocomplete widget
        this.options = {
            autoFocus: true,
            delay: 50
        };
		this.updateValue=function (element, valueAccessor, allBindingsAccessor) {
	         var propNames, sources,
                options =  allBindingsAccessor().autoCompleteOptions|| {},
                value = valueAccessor()();

            if (!value && value !== 0) {
                value = "";
            }

            // find the appropriate value for the input
            sources = unwrap(options.source);
            propNames = self.getPropertyNames(options);
			//console.log(propNames);
            // if there is local data, then try to determine the appropriate value for the input
            if ($.isArray(sources) && propNames.value) {
                value = ko.utils.arrayFirst(sources, function (opt) {
                        return opt[propNames.value] == value;
                    }
                ) || value;
            }
			//console.log(value);
            if (propNames.input && value && typeof value === "object") {
            	//console.log("here");
                element.value = value[propNames.input];
            }
            else {
            	//console.log("here2");
                element.value = value;
            }
	    }

	return {
		 init: function (element, valueAccessor, allBindingsAccessor, data, context) {
	      var existingSelect, existingChange,
                options  = allBindingsAccessor().autoCompleteOptions|| {},
                config = {},
                filter = typeof options.filter === "function" ? options.filter : self.defaultFilter;
			
			
			//options.dataValue = ko.observable();
            //extend with global options
            ko.utils.extend(config, self.options);
            //override with options passed in binding
            ko.utils.extend(config, options);

            //get source from a function (can be remote call)
            if (typeof options.source === "function" && !ko.isObservable(options.source)) {
                config.source = function(request, response) {
                    //provide a wrapper to the normal response callback
                    var callback = function(data) {
                        self.processOptions(options, null, data, request, response);
                    };

                    //call the provided function for retrieving data
                    options.source.call(context.$data, request.term, callback);
                };
            }
            else {
                //process local data
                config.source = self.processOptions.bind(self, options, filter, options.source);
            }
			//console.log(options.change);
			//console.log(config.change);
            //save any passed in select/change calls
            existingSelect = typeof config.select === "function" && config.select;
            existingChange = typeof config.change === "function" && config.change;
          //  existingFocus = typeof config.focus === "function" && config.focus ;


            //handle updating the actual value
            config.select = function(event, ui) {
            	//console.log(ui);
            //	console.log("select");

                if (ui.item && ui.item.actual) {
                	var observable = valueAccessor();
                    observable(ui.item.actual);
					//console.log(options.dataValue);
                    if (ko.isWriteableObservable(options.dataValue)) {
                        options.dataValue(ui.item.data);
                    }
                }
				
                if (existingSelect) {
                    existingSelect.apply(this, arguments);
                }
                $(this).blur(); 
            };

            //user made a change without selecting a value from the list
            config.change = function(event, ui) {
            	//console.log("change");
            	//console.log(ui.item)
                if (!ui.item || !ui.item.actual) {
                	                	// options.value(event.target && event.target.value);
                	
                    var observable = valueAccessor();
                    if((event.target && event.target.value).length === 0){
                    	observable(event.target && event.target.value);
                    }
					self.updateValue(element, valueAccessor, allBindingsAccessor);
					
                    if (ko.isWriteableObservable(options.dataValue)) {
                        options.dataValue(null);
                    }
                }
                if (existingChange) {
                	//console.log("change22");
                    existingChange.apply(this, arguments);
                }
               // self.update();
            };
            
            
		  //generate New Div
		 // config.append.next()
		 if(!config.appendTo){
		 	$(element).parent().append("<div class='ui-autocomplete-box'></div>")
		 }		
		 config.appendTo = 	config.appendTo || $(element).next();
		// console.log(config.appendTo)
		 
		 	//minLength
		 	config.minLength = config.minLength||0;
 			//console.log(config);
            //initialize the widget
            var widget = $(element).autocomplete(config).data("ui-autocomplete");

            //render a template for the items
            if (options.template) {
                widget._renderItem = self.renderItem.bind(self, options.template, context);
            }

            //destroy the widget if KO removes the element
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                if (widget && typeof widget.destroy === "function") {
                    widget.destroy();
                    widget = null;
                }
            });
	
	    },
	    update: function (element, valueAccessor, allBindingsAccessor) {
	    	self.updateValue(element, valueAccessor, allBindingsAccessor);
	      /*   var propNames, sources,
                options =  allBindingsAccessor().autoCompleteOptions|| {},
                value = valueAccessor()();

            if (!value && value !== 0) {
                value = "";
            }

            // find the appropriate value for the input
            sources = unwrap(options.source);
            propNames = self.getPropertyNames(options);
			//console.log(propNames);
            // if there is local data, then try to determine the appropriate value for the input
            if ($.isArray(sources) && propNames.value) {
                value = ko.utils.arrayFirst(sources, function (opt) {
                        return opt[propNames.value] == value;
                    }
                ) || value;
            }
			//console.log(value);
            if (propNames.input && value && typeof value === "object") {
            	console.log("here");
                element.value = value[propNames.input];
            }
            else {
            	console.log("here2");
                element.value = value;
            }*/
	    }

	}

})(jQuery);
ko.validation.makeBindingHandlerValidatable('customautoComplete');

ko.waitingDialog = ko.waitingDialog || (function ($) {
    'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null // This callback runs after the dialog was hidden
			}, options);

			// Configuring dialog
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		/**
		 * Closes dialog
		 */
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);

ko.bindingHandlers.selectPicker = {
  after: ['options'],   /* KO 3.0 feature to ensure binding execution order */
  init: function (element, valueAccessor, allBindingsAccessor) {
  	 var pickeroptions = allBindingsAccessor().selectPickerOptions || {};
     var $element = $(element);
     $element.addClass('selectpicker').selectpicker(pickeroptions );

     var doRefresh = function() {
         $element.selectpicker('refresh');
     },  subscriptions = [];

     // KO 3 requires subscriptions instead of relying on this binding's update
     // function firing when any other binding on the element is updated.

     // Add them to a subscription array so we can remove them when KO
     // tears down the element.  Otherwise you will have a resource leak.
     var addSubscription = function(bindingKey) {
         var targetObs = allBindingsAccessor.get(bindingKey);

         if ( targetObs && ko.isObservable(targetObs )) {
            subscriptions.push( targetObs.subscribe(doRefresh) );
         }
     };

     addSubscription('options');
     addSubscription('value');           // Single
     addSubscription('selectedOptions'); // Multiple

     ko.utils.domNodeDisposal.addDisposeCallback(element, function() { 
         while( subscriptions.length ) {
             subscriptions.pop().dispose();
         }
     } );
   },
   update: function (element, valueAccessor, allBindingsAccessor) {
   }
 };
 ko.bindingHandlers.bs_pagination = (function(){
	    var self = this,
         unwrap = ko.utils.unwrapObservable; //support older KO versions that did not have ko.unwrap
	  //if dealing with local data, the default filtering function
	   this.S4 = function() {
	     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	  }
	  this.createGuid = function(){
	   return (self.S4() + self.S4() + "-" + self.S4() + "-4" + self.S4().substr(0,3) + "-" + self.S4() + "-" + self.S4() + self.S4() + self.S4()).toLowerCase();
	  }
       this.bindPageing= function(element, valueAccessor, allBindingsAccessor,isfirst){
       		 var options = allBindingsAccessor().pagingOptions || {};
       		 var items = options.maxRowsPerPage;
		 	 var itemOnPage = options.rowsPerPage;
		 	 var curpage = options.currentPage || 1;
		 	 var allpage = Math.ceil(items / itemOnPage );
		 	 if(isfirst){
				 element.id = (element.id+self.createGuid()) ;
			 }
		 	 $(element).bs_pagination({
			    		currentPage:curpage,
						totalRows: items ,
						rowsPerPage: itemOnPage,
						totalPages:allpage,
						showRowsPerPage:false,
						onChangePage:function(evt,p){
							//console.log(index);
							if(typeof options.eventclick === 'function'){
								//var index = pageNumber-1;
								options.eventclick(p.currentPage);
							}
						}

					});
			/*if(typeof items  === 'number'&&typeof itemOnPage  === 'number'){
				var allpage = Math.ceil(items / itemOnPage );
			//	console.log(allpage);
				//console.log(allpage);
				if(items > 0 && allpage > 0 && itemOnPage !== items ){

				}
			}*/
       }

	return {
		 init: function (element, valueAccessor, allBindingsAccessor, data, context) {
	    	self.bindPageing(element, valueAccessor, allBindingsAccessor,true);
	     },
	    update: function (element, valueAccessor, allBindingsAccessor) {
	    	self.bindPageing(element, valueAccessor, allBindingsAccessor,false);

	    }

	}

})(jQuery);
/*ko.contentDialog.show = function(){
	$("#contentloading").show();
}
ko.contentDialog.hide = function(){
	$("#contentloading").hide();
}*/
ko.contentDialog= ko.contentDialog|| (function ($) {
    'use strict';
	return {
		show: function () {
			$("#contentloading").show();
		},
		hide: function () {
			$("#contentloading").hide();
		}
	};

})(jQuery);

 
 