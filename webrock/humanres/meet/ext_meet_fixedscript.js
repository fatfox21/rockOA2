var panel = {
	xtype:'rockgridform',tablename:'meet',formtitle:'固定会议',exceltitle:'固定会议',keywhere:'and type=1',celleditbool:true,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'会议室',dataIndex:'hyname',search:true,autowidth:true
	},{
		text:'主题',dataIndex:'title',search:true,autowidth:true
	},{
		text:'开始时间',dataIndex:'startdt',width:100,search:true
	},{
		text:'截止时间',dataIndex:'enddt',width:100,search:true
	},{
		text:'参会人员',dataIndex:'joinname',width:'10%',search:true,autowidth:true
	},{
		text:'频率',dataIndex:'rate',width:'10%',search:true,autowidth:true
	},{
		text:'启用',dataIndex:'state',width:60,renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false},search:true,atype:'select'
	},{
		text:'操作时间',dataIndex:'optdt',width:150,search:true
	},{
		text:'发起人',dataIndex:'optname',width:70,search:true
	},{
		text:'说明',dataIndex:'explain',flex:1,align:'left'
	},{
		text:'ID',dataIndex:'id',width:50
	}],
	formwidth:350,
	formparams:{
		submitfields:'hyname,title,startdt,enddt,state,joinid,joinname,rate,optname,explain',
		params:{int_filestype:'state',otherfields:'optdt={now},optid={adminid},type=1,status=1'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'会议室',name:'hynamePost',allowBlank: false,xtype:'optioncombo',optionmnum:'meeting'
		},{
			fieldLabel:''+bitian+'主题',name:'titlePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'频率',name:'ratePost',editable:false,xtype:'checkcombo',allowBlank: false,store:js.arraystr('工作日,周一,周二,周三,周四,周五,周六,周日')
		},{
			fieldLabel:''+bitian+'开始时间',name:'startdtPost',xtype:'rockdate',format:'H:i:00',allowBlank: false
		},{
			fieldLabel:''+bitian+'截止时间',name:'enddtPost',xtype:'rockdate',format:'H:i:00',allowBlank: false
		},{
			name:'joinidPost',id:'joinid_'+rand+'',hidden:true
		},{
			fieldLabel:'参会人员',nameidfields:'joinid_'+rand+'',name:'joinnamePost',xtype:'changedeptuser',changetitle:'选择参会人员',changetype:'deptusercheck'
		},{
			fieldLabel:'&nbsp;',name:'statePost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:''+bitian+'发起人',name:'optnamePost',allowBlank: false,value:adminname
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield'
		}]
		
	}
}

return {
	panel:panel
};