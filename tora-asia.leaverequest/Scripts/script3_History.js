function LRHistoryViewModel(parent, searchuser) {
    var self = this;
    this.listrequestformtitle = ToraAsiaLeaveRequestInfo.ListManagement.RequestForm.Title;
    this.listleavetypetitle = ToraAsiaLeaveRequestInfo.ListManagement.LeaveMaxDate.Title;
    this.dateformate = ko.dateformat.normal;
    this.fromdate = ko.observable();
    this.todate = ko.observable();
    this.leavetype = ko.observable();
    this.leavetypearr = ko.observableArray();
    //console.log(beforehistory);
    this.datawithpaging = ko.observable(new datawithpaging());
    this.datawithpaging().rows(beforehistory);
    //if (beforehistory.length > 0 && gcurrentPageIndex > 0) {
        this.datawithpaging().pageIndex(gcurrentPageIndex);
   // }
    beforid = (searchuser ? "idofficerinfo" : "idmyhistory")
    //this.leavedatas = ko.observableArray();

    this.issearch = ko.observable(beforehistory.length > 0);

    this.officers = ko.observable();
    this.officerstmp = ko.observable();
    this.defaultUid = [];
    if (!searchuser) {
        self.defaultUid.push(_spPageContextInfo.userId);
    }

    this.officersId = ko.observableArray(self.defaultUid);


    this.loadLeaveChoice = function (callback) {
        var options = {
            listTitle: self.listleavetypetitle,
            fileData: [
				{ field: "Id", type: "Default", typefield: "ID" },
				{ field: "Title" }
            ]
        }
        ko.queryData(options, function (data) {
            self.leavetypearr(data);
        });

    }
    this.loadLeaveChoice();
    this.generateQuery = function () {

        var allquery = [];
        //var datearr = [];
        if (typeof self.fromdate() !== "undefined" && self.fromdate() !== null) {
            allquery.push(String.format(ko.defaultquery, "Geq", "StartDate", "DateTime", self.fromdate().format("YYYY-MM-DD"), "", "IncludeTimeValue='False' "));
        }
        if (typeof self.todate() !== "undefined" && self.todate() !== null) {
            allquery.push(String.format(ko.defaultquery, "Leq", "StartDate", "DateTime", self.todate().format("YYYY-MM-DD"), "", "IncludeTimeValue='False' "));
        }
        if (typeof self.leavetype() !== "undefined" && self.leavetype() !== null && self.leavetype() !== "") {
            allquery.push(String.format(ko.defaultquery, "Eq", "LeaveType", "Text", self.leavetype(), "", ""));
        }
        if (self.officersId().length > 0) {
            var usersarr = [];
            ko.utils.arrayForEach(self.officersId(), function (uid) {
                usersarr.push(String.format(ko.defaultquery, "Eq", "Requester", "Lookup", uid, "LookupId='TRUE'", ""));
            });
            allquery.push(ko.MergeCAMLConditions(usersarr, ko.MergeType.Or));

        }

        if (allquery.length > 0) {
            return "<Where>" + ko.MergeCAMLConditions(allquery, ko.MergeType.And) + "</Where>";
        }
        return "";
    }

    this.searchClick = function () {
        self.datawithpaging().rows([]);
        self.issearch(true);
        //console.log(self.officers());
        var officertxt = self.officers();
        ko.contentDialog.show();
        if (typeof officertxt !== "undefined" && officertxt !== "") {
            ko.getUserId(officertxt.split(';'), function (uidarr) {
                //console.log(uidarr);
                self.officersId(uidarr)
                self.loadAllLeaveData(self.generateQuery(), function () {
                    ko.contentDialog.hide();
                    beforehistory = self.datawithpaging().rows();
                });
            });
        }
        else {
            self.officersId(self.defaultUid);
            self.loadAllLeaveData(self.generateQuery(), function () {
                ko.contentDialog.hide();
                beforehistory = self.datawithpaging().rows();
            });
        }
    }
    this.loadAllLeaveData = function (query, callback) {

        var listServices = new SharePointClient.Services.JSOM.ListServices();

        //Get SP clientContext
        var context = new SharePointClient.Services.JSOM.Context();
        //Create Caml object
        var camlConstant = SharePointClient.Constants.CAML_CONSTANT;
        var camlQuery = new SharePointClient.CamlExtension.JSOM.CamlQuery();
        camlQuery
        .ViewAttribute("")
        .Query(query)
        .QueryThrottleMode(camlConstant.CAML_QUERY_THROTTLE_MODE.OVERRIDE)
        .OrderByMe("<FieldRef Name='Created' Ascending='false'/>")
        //.OrderByIndex()
        .RowLimit(30);
        //.FolderServerRelativeUrl(self.selectdFolder());
        //Get All list items batch by list name
        var options = {};
        options.fileData = [
            { field: "Id", type: "Default", typefield: "ID" },
            { field: "Title" },
            { field: "StartDate", type: "Date", format: ko.dateformat.normal },
            { field: "NumberOfDay" },
            { field: "LeaveStatus" },
            { field: "CancelLeaveStatus" },
            { field: "LeaveType" },
        ];
        options.format = ko.dateformat.nomal;

        listServices.GetListItemsBatchByListName(context,
                self.listrequestformtitle, camlQuery.BuildQuery()).Execute(function (result) {
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
        parent.GoToApproveViewModel(parent, data, data.Id, (searchuser ? "idofficerinfo" : "idmyhistory"), true, false);
    }
}
