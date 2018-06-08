function LRTasksViewModel(parent, ishrform) {
    ishrform = (typeof ishrform !== "undefined") ? ishrform : false;
    var self = this;
    this.listtaskstitle = ToraAsiaLeaveRequestInfo.ListManagement.WorkflowTaskList.Title;
    this.listformtitle = ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title;
    //this.tasksdatas = ko.observableArray();

    this.datawithpaging = ko.observable(new datawithpaging());

    this.isHR = ko.observable(parent.isHr());
    this.isManager = ko.observable(parent.isManager());
    this.curUser = ko.observable(ToraAsiaLeaveRequestInfo.Services.GetUserId());
    this.ishrForm = ko.observable(ishrform);

    this.generateQuery = function () {

        var allquery = [];
        var queryBegin = [];
        allquery.push(String.format(ko.defaultquery, "Neq", "Status", "Choice", "Completed", "", ""));
        allquery.push(String.format(ko.defaultquery, "Contains", "RelatedItems", "Text", "[{\"ItemId\":", "", ""));
        if (self.isManager() || (self.ishrForm() && self.isHR())) {
            allquery.push(String.format(ko.defaultquery, "Eq", "AssignedTo", "Lookup", self.curUser(), "LookupId='TRUE'", ""));
        }
        if (!self.ishrForm()) {

            queryBegin.push(String.format(ko.defaultquery, "BeginsWith", "Title", "Text", "อนุมัติการลา", "", ""));
            queryBegin.push(String.format(ko.defaultquery, "BeginsWith", "Title", "Text", "อนุมัติขอยกเลิกการลา", "", ""));

        }
        else {
            queryBegin.push(String.format(ko.defaultquery, "BeginsWith", "Title", "Text", "Review การลา", "", ""));
            queryBegin.push(String.format(ko.defaultquery, "BeginsWith", "Title", "Text", "Review ขอยกเลิกการลา", "", ""));
        }
        allquery.push(ko.MergeCAMLConditions(queryBegin, ko.MergeType.Or))
        //var datearr = [];
        /*if(typeof self.fromdate() !== "undefined" && self.fromdate()!== null){
            allquery.push(String.format(ko.defaultquery,"Geq","StartDate","DateTime",self.fromdate().format("YYYY-MM-DD") ,"","IncludeTimeValue='False' "));
        }
        if(typeof self.todate() !== "undefined" && self.todate()!== null){
            allquery.push(String.format(ko.defaultquery,"Leq","StartDate","DateTime",self.todate().format("YYYY-MM-DD"),"","IncludeTimeValue='False' "));
        }
        if(typeof self.leavetype() !== "undefined" && self.leavetype()!== null&& self.leavetype()!== ""){
            allquery.push(String.format(ko.defaultquery,"Eq","LeaveType","Text",self.leavetype(),"",""));
        }
        if(self.officersId().length > 0){
            var usersarr = [];
            ko.utils.arrayForEach(self.officersId(), function(uid ) {
                usersarr.push(String.format(ko.defaultquery,"Eq","Requester" ,"Lookup",uid ,"LookupId='TRUE'",""));         
            });
            allquery.push(ko.MergeCAMLConditions(usersarr ,ko.MergeType.Or));
            
        }
        */
        if (allquery.length > 0) {
            return "<Where>" + ko.MergeCAMLConditions(allquery, ko.MergeType.And) + "</Where>";
        }
        return "";
    }
    this.loadTasksData = function (callback) {
        var querytxt = self.generateQuery();
        var listServices = new SharePointClient.Services.JSOM.ListServices();

        //Get SP clientContext
        var context = new SharePointClient.Services.JSOM.Context();
        //Create Caml object
        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
        camlQuery
        .ViewAttribute("")
        .Query(querytxt)
        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
        //.OrderByIndex()
        .RowLimit(30);
        //.FolderServerRelativeUrl(self.selectdFolder());
        //Get All list items batch by list name
        var relatedfield = [
            { field: "LeaveId", type: "Default", typefield: "ID" },
            { field: "LeaveTitle", type: "Default", typefield: "Title" },
            { field: "StartDate", type: "Date", format: ko.dateformat.normal },
            { field: "NumberOfDay" },
            { field: "LeaveStatus" },
            { field: "CancelLeaveStatus" },
            { field: "LeaveType" }
        ]
        var options = {};
        options.fileData = [
            { field: "Id", type: "Default", typefield: "ID" },
            { field: "Title" },
            {
                field: "RelatedItems", type: "RelatedItems", typefield: "RelatedItems",
                relatedField: relatedfield, relatedListName: self.listformtitle
            }
        ];
        options.format = ko.dateformat.nomal;

        listServices.GetListItemsBatchByListName(context,
                self.listtaskstitle, camlQuery.BuildQuery()).Execute(function (result) {
                    //console.log(result.get_count());
                    //console.log(result);
                    var alldata = ko.getdataFromEnum({
                        ItemEnum: result,
                        filedDisplay: options.fileData,
                        format: options.format
                    }, options);

                    var olddata = self.datawithpaging().rows();
                    var newdata = olddata.concat(alldata);
                    self.datawithpaging().rows(newdata);


                    var nextpost = result.get_listItemCollectionPosition();
                    if (nextpost == null) {
                        if (callback) {
                            callback();
                        }

                    }
                });

    }
    this.goToApproveForm = function (data) {
        //console.log(data.LeaveId());
        //parent.selectTemplate("idwating");
        //parent.selectModel (new LRApproveViewModel(parent,data.LeaveId(),data.Id,self.ishrForm()));
        //parent.selectTemplate("idapproveform");
        //GoToApproveViewModel(parent,data);
        var isviewonly = true;
        if ((self.ishrForm() && !self.isManager() && self.isHR()) ||
			(!self.ishrForm() && self.isManager() && !self.isHR())
		   ) {
            isviewonly = false;
        }

        parent.GoToApproveViewModel(parent, data, data.LeaveId(), (ishrform ? "idhrapprove" : "idapprove"), isviewonly, self.isManager(), self.ishrForm());
    }
    ko.contentDialog.show();
    this.loadTasksData(function () {
        ko.contentDialog.hide();
        //console.log(self.tasksdatas());
    });
}
