<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!--SharePoint  2-->
<%--    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="clientforms.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="autofill.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />--%>

    <!--Jquery  3-->
    <link href="../Scripts/lib/jquery-ui-1.11.4/jquery-ui.min.css" rel="Stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/lib/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/lib/jquery-ui-1.11.4/jquery-ui.min.js"></script>

    <!--Other  2-->
    <script type="text/javascript" src="../Scripts/lib/moment-with-locales.js"></script>
    <script type="text/javascript" src="../Scripts/lib/moment-weekday-calc.js"></script>
    <script type="text/javascript" src="../Scripts/lib/SharePointClient.js"></script>

    <!--Bootstrap 6-->
    <link href="../Scripts/lib/bootstrap-4.1.0-dist/css/bootstrap.css" rel="Stylesheet" type="text/css" />
    <link href="../Scripts/lib/fontawesome 5.0.13/css/fontawesome-all.min.css" rel="Stylesheet" type="text/css" />
    <link href="../Scripts/lib/bootstrap-datetimepicker-build.css" rel="Stylesheet" type="text/css" />
    <link href="../Scripts/lib/bootstrap-select-v4.min.css"rel="Stylesheet" type="text/css" />
    <script type="text/javascript" src="../Scripts/lib/popper.min.js"></script>
    <script type="text/javascript" src="../Scripts/lib/bootstrap-4.1.0-dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/lib/if-b4-breakpoint.js"></script>
    <script type="text/javascript" src="../Scripts/lib/bootstrap-datetimepicker.js"></script>
    <script type="text/javascript" src="../Scripts/lib/bootstrap-select-v4.min.js"></script>

    <!--Knockout 4-->
    <script type="text/javascript" src="../Scripts/lib/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="../Scripts/lib/knockout.validation.min.js"></script>
    <script type="text/javascript" src="../Scripts/lib/knockout.mapping-latest.js"></script>
    <script type="text/javascript" src="../Scripts/lib/knockout-jqAutocomplete.js"></script>

    <!--pagination 3-->
    <link rel="stylesheet" type="text/css" href="../Scripts/lib/bs_pagination-master/jquery.bs_pagination.css"/>
    <script type="text/javascript" src="../Scripts/lib/bs_pagination-master/jquery.bs_pagination.min.js"></script>
    <script type="text/javascript" src="../Scripts/lib/bs_pagination-master/localization/en.min.js"></script>

    <!--sweetalert 2-->
    <%--<link rel="stylesheet" type="text/css" href="../Scripts/lib/sweetalert-master/sweetalert.css"/>
    <script type="text/javascript" src="../Scripts/lib/sweetalert-master/sweetalert.min.js"></script>--%>
    <script type="text/javascript" src="../Scripts/lib/sweetalert2.all.js"></script>

    <!--My Scripts 12-->
    <link rel="stylesheet" type="text/css" href="../Content/style.css"/>
    <script type="text/javascript" src="../Scripts/knockout-custom.js"></script>
    <script type="text/javascript" src="../Scripts/tora-setup.js"></script>
    <script type="text/javascript" src="../Scripts/dic_en.js"></script>
    <script type="text/javascript" src="../Scripts/dic_th.js"></script>
    <script type="text/javascript" src="../Scripts/script0_global.js"></script>
    <script type="text/javascript" src="../Scripts/script1_New.js"></script>
    <script type="text/javascript" src="../Scripts/script2_Home.js"></script>
    <script type="text/javascript" src="../Scripts/script3_History.js"></script>
    <script type="text/javascript" src="../Scripts/script4_ViewForm.js"></script>
    <script type="text/javascript" src="../Scripts/script5_Tasks.js"></script>
    <script type="text/javascript" src="../Scripts/script6_Setting.js"></script>
    <script type="text/javascript" src="../Scripts/script7_BeginSetting.js"></script>
    <script type="text/javascript" src="../Scripts/script8_myleaveremain.js"></script>
    <script type="text/javascript" src="../Scripts/ready.js"></script>

</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <script type="text/html" id="idnotpermission">
    	<div class="form-group">
            <div class="alert alert-primary">
              คุณยังไม่มีสิทธิ์ในการใช้งาน กรุณาติดต่อ Admin
            </div>
		</div>

    </script>

    <script type="text/html" id="idmorethenone">
        	<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>ถึงวันที่</span>
				</div>
				<div class="col-6 col-sm-9">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: todate,datepickerOptions:{format:$parent.dateformate,minDate:$parent.fromdate()},plusday:1" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>
    </script>
    <script type="text/html" id="idotherLeaveType">
			<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
				</div>
				<div class="col-6 col-sm-9">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:othertype"/>
				</div>
			</div>

    </script>
	<script type="text/html" id="idnewleaveform">
        <div class="col col-sm-8 mx-auto">
	       	 <div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>ชื่อ-สกุล</span>
				</div>
				<div class="col-6 col-sm-9">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:title"/>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>ประเภทวันลา</span>
				</div>
				<div class="col-6 col-sm-9 bootstrap-customselect">
                    <!--,selectPicker: {},selectPickerOptions:{liveSearch:true}-->
					<select class="form-control" data-bind="selectedOptions: leavetype,options: leavetypearr,optionsText: 'Title',optionsValue : 'Title', optionsCaption: 'select...'"></select>
				</div>
			</div>
			<div data-bind="template: { name: othertyptemplate,data:othertypModel() }"></div>
			<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>วันที่ลา</span>
				</div>
				<div class="col-6 col-sm-9">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: fromdate,datepickerOptions:{format:dateformate}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>
			<div class="row form-group" data-bind="visible:!morebool()">
				<div class="col-6 col-sm-3 control-label text-right">
				</div>
				<div class="col-6 col-sm-9">
					<select class="form-control form-select" data-bind="options:leavedatetypearr ,value: fromdatetype"></select>
				</div>
			</div>
			
			<div data-bind="template: { name: moretemplate,data:moreModel () }"></div>
			<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
				</div>
				<div class="col-6 col-sm-9 text-right">
					<button class="btn btn-sm btn-info" data-bind="text:(morebool ()?'ลา 1 วัน': 'ลามากกว่า 1 วัน'),click:moreclick "></button>
				</div>
			</div>

			 <div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>รวม</span>
				</div>
				<div class="col-6 col-sm-9">
                    <div class="input-group">
                        <input type="text"  autocomplete="off" class="form-control" data-bind="value:totalday,enable:false" /> 
                        <div class="input-group-append">
                          <div class="input-group-text">วัน</div>
                        </div>
                     </div>
				</div>
			</div>
			 <div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>เหตุผล</span>
				</div>
				<div class="col-6 col-sm-9">
					<textarea class="form-control" autocomplete="off" rows="4" data-bind="value:reason"></textarea>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-6 col-sm-3 control-label text-right">
					<span>หมายเลขโทรศัพท์</span>
				</div>
				<div class="col-6 col-sm-9">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:phonenumber"/>
				</div>
			</div>
			<div class="row form-group">
				<div class="col text-right">
					<button class="btn btn-primary" data-bind="click:SaveSubmit.bind($data,$parent)">Submit</button>
					<button class="btn btn-secondary" data-bind="click: $parent.navLinkClick.bind($data, 'idhomepage')">Cancel</button>
				</div>
			</div>
        </div>
    </script>
    <script type="text/html" id="idapproveform">
    		<div class="row form-group" data-bind="foreach: singleLeaveremail">
					<div class="col-xs-offset-0 col-md-offset-2 col-xs-5 col-sm-6 col-md-3 text-center">
						<div class="day-header"><span  data-bind="text:Title"></span><span> (คงเหลือ)</span></div>
						<div class="day-number themeColor">
							<table>
								<tbody>
									<tr>
										<td class="remain-day" data-bind="text:$parent.calulateDay($data)"></td>
	
									</tr>
								</tbody>
							</table>
						</div>
					</div>
			</div>
			<div class="row form-group" data-bind="visible:isOwner">
				<div class="col-xs-offset-0 col-md-offset-2 col-xs-12 col-sm-10" >
					<label data-bind="visible:cancelworkflow() === 'true'">Cancel processing</label >
					<button class="btn btn-danger" data-bind="visible:(leavestatus()==='In Progress' || cancelleavestatus() ==='In Progress') && cancelworkflow() !== 'true' && istaskgenerate(),click:CancelClick.bind($data)">Cancel</button>
					<button class="btn btn-danger" data-bind="visible:leavestatus()==='Approved'&& cancelleavestatus() !=='In Progress' && cancelleavestatus() !=='Cancelled'  && cancelworkflow() !== 'true' && !isgraterthentoday(),click: ReqquestCancelClick.bind($data)">Request Cancel</button>
				</div>
			</div>
	       	 <div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>ชื่อ-สกุล</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:title,enable:false"/>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>ประเภทวันลา</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:leavetype,enable:false"/>
				</div>
			</div>
			<div class="row form-group" data-bind="visible:otherleavetype()!== null">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
				</div>
				<div class="col-xs-10 col-sm-6">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:otherleavetype,enable:false"/>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>วันที่ลา</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<div class='input-group date dateTimes'>
						<input type="text" class="form-control" autocomplete="off" data-bind="value:fromdate,enable:false"/>
						<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
				</div>
				<div class="col-xs-10 col-sm-6">
					<input type="text" class="form-control form-sm" autocomplete="off" data-bind="value:fromdatetype,enable:false"/>
				</div>
			</div>
			<div data-bind="visible:todatevisible ">
				<div class="row form-group">
					<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
						<span>ถึงวันที่</span>
					</div>
					<div class="col-xs-10 col-sm-6">
						<div class='input-group date dateTimes'>
							<input type="text" class="form-control" autocomplete="off" data-bind="value:todate,enable:false"/>
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
						</div>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					</div>
					<div class="col-xs-10 col-sm-6">
						<input type="text" class="form-control form-sm" autocomplete="off" data-bind="value:todatetype,enable:false"/>
					</div>
				</div>

			</div>
			<div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>รวม</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<div class='input-group date dateTimes'>
						<input type="text" class="form-control form-select" autocomplete="off" data-bind="value:totalday ,enable:false"/>
						<span class="input-group-addon">วัน</span>
					</div>
				</div>
			</div>
			 <div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>เหตุผล</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<textarea class="form-control" autocomplete="off" rows="4" data-bind="value:reason,enable:false"></textarea>
				</div>
			</div>
			<div class="row form-group">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>หมายเลขโทรศัพท์</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<input type="text" class="form-control" autocomplete="off" data-bind="value:phonenumber,enable:false"/>
				</div>
			</div>
			 <div class="row form-group" data-bind="visible:!isHR()&&isManager()&&!isviewOnly()">
				<div class="col-sm-offset-2 col-xs-offset-0 col-xs-2 control-label">
					<span>เหตุผล (ถ้ามี)</span>
				</div>
				<div class="col-xs-10 col-sm-6">
					<textarea class="form-control" autocomplete="off" rows="4" data-bind="value:taskreason"></textarea>
				</div>
			</div>

			<div class="row form-group">
				<div class="col-xs-12 col-sm-10 text-right" >
					<button class="btn btn-primary" data-bind="visible:!isHR()&&isManager()&&!isviewOnly(),click:SaveTasksClick.bind($data,'Approve') ">Approve</button>
					<button class="btn btn-danger" data-bind="visible:!isHR()&&isManager()&&!isviewOnly(),click: SaveTasksClick.bind($data,'Reject')  ">Reject</button>
					<button class="btn btn-primary" data-bind="visible:ishrForm()&&isHR()&&!isManager()&&!isviewOnly(),click:SaveTasksClick.bind($data,'Approve') ">Acknowledge</button>
					<button class="btn btn-default" data-bind="text:BackToText ,click: $parent.navLinkClick.bind($data,backtoform() )"></button>
				</div>
			</div>
    </script>
	<script type="text/html" id="idwating">
        
    </script>
    <script type="text/html" id="idmyleaveremain">
        <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.searchleave.myleavetitle"></div>
		</div>
		<div class="form-group row p-3" data-bind="foreach: leavedays ">
				<div class="form-group col-6 col-sm-4 col-md-3 text-center">
					<div class="day-header" data-bind="text:Title"></div>
					<div class="day-number themeColor">
						<table>
							<tbody>
								<tr>
									<td class="remain-day" rowspan="3" data-bind="text:$parent.calulateDay($data)"></td>
									<td class="infomax-day" title="Max Days" data-bind="text:MaxLeaveValue"></td>
								</tr>
								<tr>
									<td class="infoapprove-day" title="Approved Days" data-bind="text:MyUseDay.approve"></td>
								</tr>
								<tr>
									<td class="infoinprogress-day" title="Inprogress Days" data-bind="text:MyUseDay.inprogress"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
		</div>
    </script>
	<script type="text/html" id="idhomepage">
        <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.remaintitle"></div>
		</div>
		<div class="form-group d-flex justify-content-center" data-bind="foreach: leavedaysfilter ">
				<div class="form-group col-6 col-sm-4 col-md-3 text-center">
					<div class="day-header" data-bind="text:Title"></div>
					<div class="day-number themeColor">
						<table>
							<tbody>
								<tr>
									<td class="remain-day" rowspan="3" data-bind="text:$parent.calulateDay($data)"></td>
									<td class="infomax-day" title="Max Days" data-bind="text:MaxLeaveValue"></td>
								</tr>
								<tr>
									<td class="infoapprove-day" title="Approved Days" data-bind="text:MyUseDay.approve"></td>
								</tr>
								<tr>
									<td class="infoinprogress-day" title="Inprogress Days" data-bind="text:MyUseDay.inprogress"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
		</div>
		<div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.historytitle"></div>	
		</div>
		<div class="form-group">
			<div class="col">
				<table class="table table-sm table-bordered">
						<thead class="thead-light">
							<tr>
								<th data-bind="text:gleavedic.tableheader.date"></th>
								<th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
                                <th data-bind="text:gleavedic.tableheader.status"></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td><a href="#" data-bind="text:StartDate,click:$parent.goToApproveForm"></a></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
								<td data-bind="html:$parent.bindStatus($data) "></td>
							</tr>

						</tbody>
					</table>
					<div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>
			</div>
		</div>
    </script>
    <script type="text/html" id="idmyhistory">
         <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.searchhistorytitle"></div>
		</div>

       	<div class="row p-3">
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.fromdate"></span>
				</div>
				<div class="col-8 col-sm-4">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: fromdate,datepickerOptions:{format:dateformate}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.todate"></span>
				</div>
				<div class="col-8 col-sm-4">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: todate,datepickerOptions:{format:dateformate,minDate:fromdate()}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>

		</div>
		<div class="row p-3">
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.type"></span>
				</div>
				<div class="col-8 col-sm-4 bootstrap-customselect">
					<select class="form-control" data-bind="selectedOptions: leavetype,options: leavetypearr,optionsText: 'Title',optionsValue : 'Title', optionsCaption: 'select...'"></select>				
				</div>
				<div class="col col-sm-6">
					<button class="btn btn-sm btn-info" data-bind="click:searchClick">Search</button>
				</div>
		</div>
		<div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.searchresult"></div>
		</div>
		<div class="form-group" data-bind="visible:issearch">
			<div class="col">
				<table class="table table-sm table-bordered">
						<thead class="thead-light">
							<tr>
								<th data-bind="text:gleavedic.tableheader.date"></th>
								<th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
                                <th data-bind="text:gleavedic.tableheader.status"></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td><a href="#" data-bind="text:StartDate,click:$parent.goToApproveForm"></a></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
								<td data-bind="text:LeaveStatus"></td>
							</tr>

						</tbody>
						<tbody data-bind="visible: !datawithpaging().ishasdata()" class="text-center">
							<tr>
                                <th colspan="4" data-bind="text:gleavedic.tableheader.nodata"></th>
							</tr>

						</tbody>

					</table>
				 <div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>

			</div>
		</div>

    </script>
    <script type="text/html" id="idapprove">
        <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.approvetitle"></div>	
		</div>
        <div class="form-group">
			<div class="col">
				<table class="table table-sm table-bordered">
						<thead class="thead-light">
							<tr>
                                <th data-bind="text: gleavedic.tableheader.list"></th>
								<th data-bind="text: gleavedic.tableheader.date"></th>
                                <th data-bind="text: gleavedic.tableheader.user"></th>
                                <th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td><a href="#" data-bind="text:Title,click:$parent.goToApproveForm"></a></td>
								<td data-bind="text:StartDate"></td>
								<td data-bind="text:LeaveTitle"></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
							</tr>

						</tbody>
						<tbody data-bind="visible: !datawithpaging().ishasdata()" class="text-center">
							<tr>
								<th colspan="5" data-bind="text:gleavedic.tableheader.nodata"></th>
							</tr>

						</tbody>

					</table>
				<div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>

			</div>
		</div>

    </script>
    <script type="text/html" id="idhrapprove">
        <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.accepttitle"></div>	
		</div>
        <div class="form-group">
			<div class="col">
				<table class="table table-sm table-bordered">
						<thead class="thead-light">
							<tr>
								<th data-bind="text: gleavedic.tableheader.list"></th>
								<th data-bind="text: gleavedic.tableheader.date"></th>
                                <th data-bind="text: gleavedic.tableheader.user"></th>
                                <th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td><a href="#" data-bind="text:Title,click:$parent.goToApproveForm"></a></td>
								<td data-bind="text:StartDate"></td>
								<td data-bind="text:LeaveTitle"></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
							</tr>

						</tbody>
						<tbody data-bind="visible: !datawithpaging().ishasdata()" class="text-center">
							<tr>
								<th colspan="5" data-bind="text:gleavedic.tableheader.nodata"></th>
							</tr>

						</tbody>

					</table>
					<div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>

			</div>
		</div>

    </script>

   <%-- <script type="text/html" id="idcancel">
       	 <div class="row form-group">
			<div class="col-xs-12">
				<span class="sp-header themeColor">ยกเลิกการลา</span>	
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12">
				<table class="table table-bordered">
						<thead class="thead-light">
							<tr>
								<th data-bind="text:gleavedic.tableheader.date"></th>
								<th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
                                <th data-bind="text:gleavedic.tableheader.status"></th>
								<th></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td data-bind="text:StartDate"></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
								<td data-bind="text:LeaveStatus"></td>
								<td data-bind="click:$parent.CancelClick"><button class="btn btn-danger btn-xs">ขอยกเลิก</button</td>
							</tr>

						</tbody>
						<tbody data-bind="visible: !datawithpaging().ishasdata()" class="text-center">
							<tr>
								<th colspan="5" data-bind="text:gleavedic.tableheader.nodata"></th>
							</tr>

						</tbody>

					</table>
					<div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>

			</div>
		</div>

    </script>--%>
    <script type="text/html" id="idofficerinfo">  
        <div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.searchusertitle"></div>	
		</div>
		<div class="row p-3">
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.officername"></span>
				</div>
				<div class="col-8 col-sm-4">
					<div id="ppkofficers" data-bind='peoplepicker:officers,peopleOptions:{AllowMultipleValues:true,PeopleorGroup:"ALL",oldvaluetmp:officerstmp}'></div> 
				</div>
			</div>

       	<div class="row p-3">
				<div class="col-4 col-sm-2 control-label">
                    <span data-bind="text: gleavedic.searchleave.fromdate"></span>
				</div>
				<div class="col-xs-8 col-sm-4">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: fromdate,datepickerOptions:{format:dateformate}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.todate"></span>
				</div>
				<div class="col-8 col-sm-4">
					<div class='input-group date dateTimes'>
						<input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: todate,datepickerOptions:{format:dateformate,minDate:fromdate()}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
					</div>
				</div>

		</div>
		<div class="row p-3">
				<div class="col-4 col-sm-2 control-label">
					<span data-bind="text: gleavedic.searchleave.type"></span>
				</div>
				<div class="col-8 col-sm-4 bootstrap-customselect">
					<select class="form-control" data-bind="selectedOptions: leavetype,options: leavetypearr,optionsText: 'Title',optionsValue : 'Title', optionsCaption: 'select...'"></select>
				</div>
				<div class="col col-sm-6">
					<button class="btn btn-sm btn-info" data-bind="click:searchClick">Search</button>
				</div>
		</div>

		<div class="form-group">
            <div class="alert alert-primary h5" data-bind="text: gleavedic.heading.searchresult"></div>	
		</div>
		<div class="form-group" data-bind="visible:issearch">
			<div class="col">
				<table class="table table-sm table-bordered">
						<thead class="thead-light">
							<tr>
								<th data-bind="text: gleavedic.tableheader.list"></th>
								<th data-bind="text: gleavedic.tableheader.date"></th>
                                <th data-bind="text: gleavedic.tableheader.user"></th>
                                <th data-bind="text:gleavedic.tableheader.days"></th>
                                <th data-bind="text:gleavedic.tableheader.types"></th>
							</tr>
						</thead>
						<tbody data-bind="foreach: datawithpaging().datas">
							<tr>
								<td><a href="#" data-bind="text:StartDate,click:$parent.goToApproveForm"></a></td>
								<td data-bind="text:Title"></td>
								<td data-bind="text:NumberOfDay"></td>
								<td data-bind="text:LeaveType"></td>
								<td data-bind="text:LeaveStatus"></td>
							</tr>

						</tbody>
						<tbody data-bind="visible: !datawithpaging().ishasdata()" class="text-center">
							<tr>
								<th colspan="5" data-bind="text:gleavedic.tableheader.nodata"></th>
							</tr>

						</tbody>

					</table>
					<div id="paging" data-bind="visible:datawithpaging().showPaging() && datawithpaging().maxPageIndex() > 1,bs_pagination:datawithpaging().pagingObj,pagingOptions:{maxRowsPerPage:datawithpaging().totalItems(),rowsPerPage:datawithpaging().pageSize(),currentPage:datawithpaging().pageIndex(),eventclick:datawithpaging().gotoPage}"></div>

			</div>
		</div>

    </script>
    <script type="text/html" id="idsetting">
        <div class="col col-sm-10 mx-auto">
    	    <div class="row form-group">
			    <div class="col col-sm-4">
				    <span class="end-circle-title" data-bind="text: gleavedic.setting.endcircle"></span>
			    </div>
			    <div class="col col-sm-4">
				    <div class='input-group date disableyear'>
						    <input type="text"  autocomplete="off" class="form-control" data-bind="datepicker: circledate,enable:circleEnable,datepickerOptions:{format:dateformate,viewMode:'months'}" /> <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
				    </div>
			    </div>
			    <div class="col col-sm-4">
				    <button class="btn btn-sm btn-info" data-bind="visible:!circleEnable(),click:enableEdit">Edit</button>
				    <button class="btn btn-sm btn-info" data-bind="visible:circleEnable(),click:saveNewDate ">Save</button>
				    <button class="btn btn-sm btn-danger" data-bind="visible:circleEnable(),click:disableEdit ">Cancel</button>
			    </div>
		    </div>
		    <div class="row form-group">
			    <div class="col col-sm-8">
				    <div class="card">
					    <div class="card-header text-center" data-bind="text: gleavedic.setting.workday"></div>
					    <div class="card-body row p-3" data-bind="foreach:allday">
						     <label class="col col-md-6 col-lg-4">
						        <input type="checkbox" data-bind="checkedValue: $data, checked: $parent.workingDays,enable:$parent.workingEnable"/>
						        <span data-bind="text:$data"></span>
						      </label>
					    </div>
				    </div>
			    </div>
			    <div class="col col-sm-4">
				    <button class="btn btn-sm btn-info" data-bind="visible:!workingEnable(),click:enableWorkingEdit ">Edit</button>
				    <button class="btn btn-sm btn-info" data-bind="visible:workingEnable(),click:saveNewWorkingDate ">Save</button>
				    <button class="btn btn-sm btn-danger" data-bind="visible:workingEnable(),click:disableWorkingEdit ">Cancel</button>
			    </div>
		    </div>
		    <div class="row form-group">
			    <div class="col col-sm-4">
				    <span class="end-circle-title" data-bind="text: gleavedic.setting.calwork"></span>
			    </div>
			    <div class="col col-sm-4">
				    <select class="form-control form-select" data-bind="options:worktypearr,value: worktype,enable:worktypeEnable"></select>
			    </div>
			    <div class="col col-sm-4">
				    <button class="btn btn-sm btn-info" data-bind="visible:!worktypeEnable(),click:enableWorktype ">Edit</button>
				    <button class="btn btn-sm btn-info" data-bind="visible:worktypeEnable(),click:saveNewWorktype ">Save</button>
				    <button class="btn btn-sm btn-danger" data-bind="visible:worktypeEnable(),click:disableWorktype ">Cancel</button>
			    </div>
		    </div>
        </div>
        <div class="row form-group" data-bind="foreach:NavLinkArr">
			<div class="col-xs-12 col-sm-6">
				<div class="setting-box">
					<a target="_blank" data-bind="attr:{href:url}">
                               <div class="d-flex flex-row align-items-center">
                                  <div class="p-2"><i class="fas icon-setting" data-bind="css: icon"></i></div>
                                  <div class="p-2"><span data-bind="text:title"></span></div>
                                </div>					
					</a>
				</div>
			</div>
		</div>
		
    </script>
    <script type="text/html" id="idbiginingwating"> 
		<div class="row form-group">
			<div class="col-xs-12 col-sm-6">
				<div class='input-group'>
					<span class="input-group-addon"><span class="glyphicon" data-bind="css:(currentStep()>1?'glyphicon-ok-circle':'')"></span></span>
					<button class="btn btn-primary form-control" data-bind="text:gleavedic.admin.btn.createlist,enable:createStep,click:CreateListClick"></button>					
				</div>				
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-6">
				<div class='input-group'>
					<span class="input-group-addon"><span class="glyphicon" data-bind="css:(currentStep()>2?'glyphicon-ok-circle':'')"></span></span>
					<button class="btn btn-primary form-control" data-bind="text:gleavedic.admin.btn.ativatefeature,enable:featureStep ,click:ActivateFeatureClick "></button>					
				</div>	
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-6">
				<div class='input-group'>
					<span class="input-group-addon"><span class="glyphicon" data-bind="css:(currentStep()>3?'glyphicon-ok-circle':'')"></span></span>
					<button class="btn btn-primary form-control" data-bind="text:gleavedic.admin.btn.clonewf,enable:foundworkflowStep ,click:CloneWorkflowClick "></button>					
				</div>	
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-6">
				<div class='input-group'>
					<span class="input-group-addon"><span class="glyphicon" data-bind="css:(currentStep()>4?'glyphicon-ok-circle':'')"></span></span>
					<button class="btn btn-primary form-control" data-bind="text:gleavedic.admin.btn.mappingwftolist,enable:mapWorkflowStep,click:MappingWorkflowClick "></button>					
				</div>	
			</div>
		</div>
		<div class="row form-group">
			<div class="col-xs-12 col-sm-6">
				<div class='input-group'>
					<span class="input-group-addon"></span>
					<button class="btn btn-danger form-control" data-bind="text:gleavedic.admin.btn.deletelist,enable:deleteStep,click:DeleteListClick "></button>					
				</div>	
			</div>
		</div>
    </script>
    <div class="app" id="LeaveRequestContent">
			<div class="sidebar">
				<div class="sidebar-inner">
					<div class="sidebar-logo">
						<div class="d-flex align-items-center">
							<a class="d-flex align-items-center" href="javascript:void(0);">
									<div class="logo d-flex align-items-center">
										<i class="fas fa-envelope mx-auto"></i>
									</div>
									<div class="align-middle">
										<h5 class="logo-text mb-0">Leave Request</h5>
									</div>
							</a>
							<div class="mobile-toggle sidebar-toggle pl-1">
								<a href="javascript:void(0);">
									<i class="fas fa-angle-double-left"></i>
								</a>
							</div>
						</div>
					</div>
                    <ul class="sidebar-menu list-group" data-bind="foreach:NavLinkArr ">
	                   <li data-bind="visible:isvisible">
                           <a class="nav-link d-flex align-items-center" href="javascript:void(0);" data-bind="css: { 'active': $parent.checkLinkActive(template) }, click: $parent.navLinkClick.bind($data, template)">
	                         <span class="icon-holder">
                                 <i class="fas " data-bind="css: icon"></i>
                              </span>
                              <span class="title" data-bind="text:title"></span>
                           </a>
	                   </li>
	                </ul>				
				</div>
			</div>
			<div class="page-container">
				<div class="header navbar d-flex align-items-center">
					<div class="header-container w-100">
						<div class="d-flex align-items-center">
						  <div class="d-flex align-items-center ">
							<a id="sidebar-toggle" class="sidebar-toggle p-2" href="javascript:void(0);">
								<i class="fas fa-align-justify"></i>
							</a>
						  </div>
						  <div class="pr-2">
							<h2 class="txtheader">ยินดีต้อนรับ  <span data-bind="text:userdisplayName"></span></h2>
						  </div>
						</div>
	
					</div>
				</div>	
				<main class="main-content bg-light">
					<div id="mainContent">
                        <div class="newleave">
	                    		<ul class="list-group" data-bind="visible: !notPermisson() && isBeginSetupSuccess()">
	                    			<li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idnewleaveform') }, click: navLinkClick.bind($data, 'idnewleaveform')">
	                                	<i class="fas fa-plus-square icon-nav pr-2"></i><span data-bind="text: gleavedic.btn.newform"></span>
	                                </li>
	                    		</ul>
	                    </div>
						<div class="panel panel-default">
						        	<div class="panel-heading"></div>
						        	<div class="panel-body p-3 bg-white shadow-sm" style="position:relative;">
						        		<div id="contentloading" class="sk-circle-block" style="display:none;">
							        		<div class="sk-circle">
											  <div class="sk-circle1 sk-child"></div>
											  <div class="sk-circle2 sk-child"></div>
											  <div class="sk-circle3 sk-child"></div>
											  <div class="sk-circle4 sk-child"></div>
											  <div class="sk-circle5 sk-child"></div>
											  <div class="sk-circle6 sk-child"></div>
											  <div class="sk-circle7 sk-child"></div>
											  <div class="sk-circle8 sk-child"></div>
											  <div class="sk-circle9 sk-child"></div>
											  <div class="sk-circle10 sk-child"></div>
											  <div class="sk-circle11 sk-child"></div>
											  <div class="sk-circle12 sk-child"></div>
											</div>		
										</div>					        		
			                            <div data-bind="template: { name: selectTemplate,data:selectModel() }"></div>
						        	</div>
						        </div>
					</div>
				</main>
				<footer class="bg-primary p-3 text-white text-center">
					<span class="txtfooter">Copyright © 2015 Tora Asia (Thailand) Co., Ltd. All rights reserved.</span>
				</footer>
			</div>
		</div>
    <!--
    	 <div >
	         <div class="col-xs-12 header themeColor">
	                <div class="container">
	                    <h2 class="txtheader">ยินดีต้อนรับ  <span data-bind="text:userdisplayName"></span></h2>
	                </div>
	         </div>
	        <div class="col-xs-12 contentblock" >
	            <div class="container">
	            		
	
	                    <div class="contentdata">
	                        <div class="leftnav">
	                            
	                        </div>
	                        <div class="rightcontent">
	                        	
	                        </div>
	                    </div>               
	            </div>	   			
	        </div>
            <div class="col-xs-12 footer themeColor">
                <div class="container">
                    
                </div>
            </div>
	</div>
        -->
</asp:Content>
