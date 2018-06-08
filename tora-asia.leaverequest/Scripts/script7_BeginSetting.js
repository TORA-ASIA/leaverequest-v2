function LRBeginSettingViewModel(parent){
	var self = this;
	this.obtionListName = ToraAsiaLeaveRequestInfo.ListManagement.Options.Title;
	this.isAllcreate = ko.observable(ToraAsiaLeaveRequestInfo.Services.IsAllListCreated());
	this.isFeatureActivate = ko.observable(ToraAsiaLeaveRequestInfo.Services.GetIsFeatureActivate());
	this.isfoundWorkflow = ko.observable(ToraAsiaLeaveRequestInfo.Services.GetIsFoundWorkflow ());
	this.isWorkflowMap = ko.observable(ToraAsiaLeaveRequestInfo.Services.GetIsWorkflowMapping());
	
	
	this.createStep = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //return true;
        return !self.isAllcreate();
    });
    this.featureStep = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //return true;
        return self.isAllcreate() && !self.isFeatureActivate();
    });

    this.foundworkflowStep = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //return true;
        return self.isAllcreate()&&self.isFeatureActivate();
    });

    this.mapWorkflowStep = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //return true;
        return self.isAllcreate()&&self.isFeatureActivate()&& self.isfoundWorkflow ()  && !self.isWorkflowMap();
    });
	this.deleteStep = ko.computed(function() {
        //var first = self.pageNumber() * self.nbPerPage;
        //return true;
        return self.isAllcreate()&&self.isFeatureActivate() && self.isfoundWorkflow () && self.isWorkflowMap();
    });
    this.currentStep = ko.computed(function() {
    	var curstep = 1;
    	if(self.isAllcreate()&&self.isFeatureActivate()&&self.isfoundWorkflow ()&&self.isWorkflowMap()){
    		curstep = 5;
    	}
    	else if(self.isAllcreate ()&&self.isFeatureActivate()&&self.isfoundWorkflow ()){
    		curstep =4;
		}
		else if(self.isAllcreate ()&&self.isFeatureActivate()){
    		curstep =3;
		}
		else if(self.isAllcreate ()){
    		curstep =2;
		}

		//console.log(curstep );
    	//if(self.createStep()){ return 1;}
    	//if(self.hasworkflowStep ()){ return 2;}
    	//if(self.mapWorkflowStep()){ return 3;}
    	//if(self.deleteStep()){ return 4;}
    	return curstep ;
    });
    this.CreateListClick = function () {
        ToraAsiaLeaveRequestInfo.Services.swalalrt({
            title: gswalText.admin.createlist,
            //text: "To save data!",
            type: 'warning',
            showCancelButton: true,
        }, function () {
            ko.contentDialog.show();
            ToraAsiaLeaveRequestInfo.Services.GetListInfomation(true, function () {
                //self.isAllcreate(true);
                //console.log(self);
                ToraAsiaLeaveRequestInfo.Services.swalalrt({
                    title: gswalText.admin.createlistsuccess,
                    type: 'success'
                }, null, function () {
                    ko.contentDialog.hide();
                    self.isAllcreate(ToraAsiaLeaveRequestInfo.Services.IsAllListCreated());
                    parent.isBeginSetupSuccess(ToraAsiaLeaveRequestInfo.Services.isAppReady());
                });
            });
        });
	}
    this.ActivateFeatureClick = function () {
        ToraAsiaLeaveRequestInfo.Services.swalalrt({
            title: gswalText.admin.activatefeature,
            //text: "To save data!",
            type: 'warning',
            showCancelButton: true,
        }, function () {
            ko.contentDialog.show();
            ToraAsiaLeaveRequestInfo.Services.ActivateFeature().then(function () {
                //UpdateSetupID
                var setfieldata = [
                                {
                                    Title: "Title",
                                    Value: "ActivateFeature",
                                },
                                {
                                    Title: "Details",
                                    Value: "true"
                                }
                ];
                var optioninside = {
                    listTitle: self.obtionListName,
                    data: setfieldata,
                    itemid: ToraAsiaLeaveRequestInfo.Services.ActivateFeatureID
                }
                // parent.navLinkClick("idapprove");
                ko.SaveDatatoList(optioninside, function (id) {
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: gswalText.admin.activatefeaturesuccess,
                        type: 'success'
                    }, null, function () {
                        ko.contentDialog.hide();
                        ToraAsiaLeaveRequestInfo.Services.ActivateFeatureID = id;
                        self.isFeatureActivate(ToraAsiaLeaveRequestInfo.Services.GetIsFeatureActivate());
                        parent.isBeginSetupSuccess(ToraAsiaLeaveRequestInfo.Services.isAppReady());
                    });
                });
            },
                function (merr) {
                    //console.log(merr);
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: merr,
                        type: 'error'
                    }, null, function () {
                        ko.contentDialog.hide();
                    });

                });
        });
	}

    this.CloneWorkflowClick = function () {

        ToraAsiaLeaveRequestInfo.Services.swalalrt({
            title: gswalText.admin.clonewf,
            //text: "To save data!",
            type: 'warning',
            showCancelButton: true,
        }, function () {
            ko.contentDialog.show();
            ToraAsiaLeaveRequestInfo.Services.CloneWorkflow().then(function () {
                var setfieldata = [
                        {
                            Title: "Title",
                            Value: "FoundWorkflow",
                        },
                        {
                            Title: "Details",
                            Value: "true"
                        }
                ];
                var optioninside = {
                    listTitle: self.obtionListName,
                    data: setfieldata,
                    itemid: ToraAsiaLeaveRequestInfo.Services.FoundWorkflowID
                }
                // parent.navLinkClick("idapprove");
                ko.SaveDatatoList(optioninside, function (id) {
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: gswalText.admin.clonewfsuccess,
                        type: 'success'
                    }, null, function () {
                        ko.contentDialog.hide();
                        ToraAsiaLeaveRequestInfo.Services.FoundWorkflowID = id;
                        self.isfoundWorkflow(ToraAsiaLeaveRequestInfo.Services.GetIsFoundWorkflow());
                        parent.isBeginSetupSuccess(ToraAsiaLeaveRequestInfo.Services.isAppReady());
                    });

                });
            },
                function (merr) {
                    //console.log(merr);
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: merr,
                        type: 'error'
                    }, null, function () {
                        ko.contentDialog.hide();
                    });

                });
        });
	}

    this.MappingWorkflowClick = function () {
        ToraAsiaLeaveRequestInfo.Services.swalalrt({
            title: gswalText.admin.mapwf,
            //text: "To save data!",
            type: 'warning',
            showCancelButton: true,
        }, function () {
            ko.contentDialog.show();
            ToraAsiaLeaveRequestInfo.Services.AddWorkflowdefinitiontoList().then(function () {
                var setfieldata = [
                        {
                            Title: "Title",
                            Value: "WorkflowMaping",
                        },
                        {
                            Title: "Details",
                            Value: "true"
                        }
                ];
                var optioninside = {
                    listTitle: self.obtionListName,
                    data: setfieldata,
                    itemid: ToraAsiaLeaveRequestInfo.Services.WorkflowMapingID
                }
                // parent.navLinkClick("idapprove");
                ko.SaveDatatoList(optioninside, function (id) {
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: gswalText.admin.mapwfsuccess,
                        type: 'success'
                    }, null, function () {
                        ko.contentDialog.hide();
                        ToraAsiaLeaveRequestInfo.Services.WorkflowMapingID = id;
                        self.isWorkflowMap(ToraAsiaLeaveRequestInfo.Services.GetIsWorkflowMapping());
                        parent.isBeginSetupSuccess(ToraAsiaLeaveRequestInfo.Services.isAppReady());
                    });

                });
            },
                function (merr) {
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: merr,
                        type: 'error'
                    }, null, function () {
                        ko.contentDialog.hide();
                    });

                });
        });
	}
    this.DeleteListClick = function () {
        ToraAsiaLeaveRequestInfo.Services.swalalrt({
            title: gswalText.admin.deletelist,
            //text: "To save data!",
            type: 'warning',
            showCancelButton: true,
        }, function () {
            ko.contentDialog.show();
            ToraAsiaLeaveRequestInfo.Services.deleteAllList().then(function (m) {
                ToraAsiaLeaveRequestInfo.Services.swalalrt({
                    title: m,
                    type: 'success'
                }, null, function () {
                    ko.contentDialog.hide();
                    window.location.href = window.location.href;
                });
            },
                function (merr) {
                    ToraAsiaLeaveRequestInfo.Services.swalalrt({
                        title: merr,
                        type: 'error'
                    }, null, function () {
                        ko.contentDialog.hide();
                    });
                });
           
        });
	}



}
