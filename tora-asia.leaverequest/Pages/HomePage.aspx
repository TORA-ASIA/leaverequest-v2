<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Content/bootstrap.min.css" rel="Stylesheet" type="text/css" />
    <link href="../Content/style.css" rel="Stylesheet" type="text/css" />

    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="SP.RequestExecutor.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/SharePointClient.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.js"></script>

    <SharePoint:ScriptLink name="clientforms.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <SharePoint:ScriptLink name="autofill.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />


    <script type="text/javascript" src="../Scripts/knockout-3.4.2.js"></script>
    <script type="text/javascript" src="../Scripts/knockout.mapping-latest.js"></script>

    <script type="text/javascript" src="../Scripts/Pages/Homepage.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <script type="text/html" id="idhomepage">
        Homepage
    </script>
    <script type="text/html" id="idmyhistory">
        ประวัติการลา
    </script>
    <script type="text/html" id="idapprove">
        อนุมัติการลา
    </script>
    <script type="text/html" id="idofficerinfo">
        ข้อมูลการลาของพนักงาน
    </script>
    <script type="text/html" id="idsetting">
        ตั้งค่า
    </script>
    <%--<WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />--%>
            <div class="col-xs-12 header themeColor">
                <div class="container">
                    <h2 class="txtheader">ยินดีต้อนรับ</h2>
                </div>
            </div>
        <div class="col-xs-12 contentblock">
            <div class="container">
                    <div class="contentdata" id="LeaveRequestContent">
                        <div class="leftnav">
                            <ul class="list-group">
                                <li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idhomepage') }, click: navLinkClick.bind($data, 'idhomepage')"></li>
                                <li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idmyhistory') }, click: navLinkClick.bind($data, 'idmyhistory')"></li>
                                <li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idapprove') }, click: navLinkClick.bind($data, 'idapprove')"></li>
                                <li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idofficerinfo') }, click: navLinkClick.bind($data, 'idofficerinfo')"></li>
                                <li class="list-group-item" data-bind="css: { 'active': checkLinkActive('idsetting') }, click: navLinkClick.bind($data, 'idsetting')"></li>
                            </ul>
                        </div>
                        <div class="rightcontent">
                            <div data-bind="template: { name: selectTemplate }"></div>

                            <button type="button" id="btnCreate">Create SP List</button>  
                            <button type="button" id="btnCloneWFtoHost">CopyWorkflow to Host</button>  
                            <button type="button" id="btnAddWorkflowToList">Add Workflow to List</button>  
                        </div>
                    </div>                 
                   
            </div>
        </div>
            <div class="col-xs-12 footer themeColor">
                <div class="container">
                    <span class="txtfooter">Copyright © 2015 Tora Asia (Thailand) Co., Ltd. All rights reserved.</span>
                </div>
            </div>

</asp:Content>
