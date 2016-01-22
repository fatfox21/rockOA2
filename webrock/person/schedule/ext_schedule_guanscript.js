var dt = params.dt;
if(!dt)dt='';
var panel = {
	xtype:'rockgridform',tablename:'schedule',formtitle:'日程',celleditbool:true,iconqz:'calendar_',defaultorder:'startdt desc',url:publicstore(mode,dir),
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'标题',dataIndex:'title',flex:1,editor:'textfield',search:true,align:'left'
	},{
		text:'开始时间',dataIndex:'startdt',width:170,search:true
	},{
		text:'截止时间',dataIndex:'enddt',width:170,search:true
	},{
		text:'说明',align:'left',dataIndex:'explain',flex:1
	}],
	storebeforeaction:'guanbefore',
	paramsbase:{dt:dt},
	tbarleft:[{
		xtype:'datefield',emptyText:'日期',editable:false,width:100,format:'Y-m-d',id:'dt_'+rand+''
	}],
	outsearch:function(){
		var _dts = getcmp('dt_'+rand+'').getRawValue();
		this.setparams({dt:_dts});
		return '';
	},
	formwidth:500,
	formparams:{
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'标题',name:'titlePost',allowBlank: false
		},{
			name:'ratecontPost',hidden:true,xtype:'textareafield'
		},{
			xtype: 'fieldcontainer',id:'shijian_'+rand+'',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'时间从',name:'startdtPost',xtype:'datetimefield',value:new Date(),width:250,allowBlank: false
			},{
				xtype:'displayfield',value:'<div align="center">至</div>',width:30,hideLabel:true
			},{
				name:'enddtPost',xtype:'datetimefield',hideLabel:true,width:160
			}]
		},{
			fieldLabel:'说明',name:'explainPost',height:60,xtype:'textareafield'
		}],
		submitfields:'title,startdt,enddt,explain',
		params:{int_filestype:'',otherfields:'optdt={now},optname={admin},uid={adminid}'}
	}
};

return {
	panel:panel
};
