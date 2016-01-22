
var  panel = {
	xtype:'rockgridform',tablename:'task',celleditbool:true,formtitle:'任务',iconqz:'time_',
	url:publicstore(mode,dir),storeafteraction:'taskaftershow',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',dataIndex:'typename',width:80,search:true
	},{
		text:'名称',dataIndex:'name',width:80,autowidth:true,search:true,editor:'textfield'
	},{
		text:'处理地址',dataIndex:'url',width:80,autowidth:true,search:true
	},{
		text:'启用',dataIndex:'status',width:60,editor:{xtype:'combo',editable:false,store:js.arraystr()},renderer:renderbox,search:true,atype:'select'
	},{
		text:'运行频率',align:'left',dataIndex:'ratecont',width:100,search:true,autowidth:true,renderer:rendercont
	},{
		text:'最后运行',dataIndex:'lastrundt',width:90,search:true,atype:'date',renderer:function(v){
			if(!isempt(v))v=v.replace(' ','<br>');
			return v;
		}
	},{
		text:'最后状态',dataIndex:'lastrunzt',width:80,search:true,boxdata:js.arraystr('#888888|未运行,green|成功,red|失败'),renderer:renderbox
	},{
		text:'说明',dataIndex:'explain',autowidth:true,search:true,editor:'textfield'
	},{
		text:'提醒通知',dataIndex:'todocont',width:80,autowidth:true,align:'left'
	}],
	formadd:function(){
		getcmp('ratels_'+rand+'').reset();
	},
	formedit:function(f, d){
		getcmp('ratels_'+rand+'').loadinfor(d.id);
	},
	formwidth:500,
	formparams:{
		url:publicsave('task','system'),labelWidth:70,
		submitfields:'typename,name,url,status,ratecont,explain,zntx,emtx,confuid',autoScroll:false,
		params:{int_filestype:'status,zntx,emtx,confuid',otherfields:'optdt={now},optname={admin},optid={adminid}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'',value:'',name:'timeidPost',hidden:true
		},{
			fieldLabel:'',value:'',name:'ratecontPost',xtype:'textareafield',hidden:true
		},{
			fieldLabel:''+bitian+'类型',name:'typenamePost',allowBlank: false,xtype:'optioncombo',optionmnum:'tasktype'
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'处理地址',name:'urlPost',allowBlank: false
		},{
			xtype:'rockrate',fieldLabel:'运行频率',tablename:'task',id:'ratels_'+rand+''
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
		},{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'&nbsp;',name:'statusPost',xtype:'checkboxfield',boxLabel:'启用',inputValue:'1',checked:true,labelSeparator:''
			},{
				fieldLabel:'&nbsp;',name:'zntxPost',xtype:'checkboxfield',boxLabel:'站内通知',inputValue:'1',labelSeparator:''
			},{
				fieldLabel:'&nbsp;',name:'emtxPost',xtype:'checkboxfield',boxLabel:'邮件通知',inputValue:'1',labelSeparator:''
			}]
		},{
			fieldLabel:'接收对象',name:'confuidPost',value:'0',defaultstore:[['0','-无-']],xtype:'rockcombo',optionmnum:'tasktype',valuefields:'id',url:js.getajaxurl('gettaskuser','task','system')
		}],
		submitcheck:function(o){
			var s='',s1='';
			var a = getcmp('ratels_'+rand+'').getresult();
			s=a[0];
			s1=a[1];
			if(s=='')return '没有添加运行频率';
			o.setVal('timeid', s);
			o.setVal('ratecont', s1);
			return '';
		}
	}
};


return {
	panel:panel
};