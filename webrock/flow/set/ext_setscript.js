var grid,bool=false;
var fieldsdata = {},changeid=0,win;
function clicksetwhere(){
	var a = grid.changedata;
	if(isempt(a.table)){
		js.msg('msg','没有设置表');
		return;
	}
	wherewindows.show('工作流['+a.name+']对应表上记录',a.table,'flowset_'+a.num+'', 1);
}
function clicksetfield(){
	var lx=0;
	if(isempt(grid.changedata.table)){
		js.msg('msg','没有设置表');
		return;
	}
	if(!win){
		var cans = winopt({title: '选择字段',width:400,border:false,
			items:getistess([]),
			buttons:[{
				text:'确定',icon:gicons('ok'),handler:quesngsho
			},{
				text:'取消',icon:gicons('cancel'),handler:function(){win.close()}
			}]
		});
		win = Ext.create('Ext.Window',cans);
		lx = 1;
	}
	if(lx==1){
		grid.destroypanel.push(win);
	}
	changeid = grid.changedata.id;
	if(!fieldsdata[changeid])fieldsdata[changeid]=grid.changedata.fields;
	win.show();
	win.setTitle('选择['+grid.changedata.name+']字段');
	getfielshoe();
}
function quesngsho(){
	if(bool)return;
	var a = getcmp('itemsel_'+rand+'');
	var val = a.getValue().join(',');
	fieldsdata[changeid] = val;
	js.msg('wait','保存中...');
	bool = true;
	$.post(js.getajaxurl('savefields',mode,dir),{id:changeid,fields:val},function(){
		js.msg('success','保存成功');
		bool=false;
	});
}
function getistess(a){
	return {
		xtype:'itemselector',
		height:300,
		id:'itemsel_'+rand+'',
		store: a,
		fromTitle: '可选字段',
		toTitle: '已选择'
	};
}

var _olidtabl;
function getfielshoe(){
	var table = grid.changedata.table;
	if(_olidtabl == table){
		getcmp('itemsel_'+rand+'').setValue(fieldsdata[changeid]);
		return;
	}	
	$.post(js.getajaxurl('getfields','public'),{table:table,atype:0},function(da){
		var d = js.decode(da);
		win.removeAll();
		win.add(getistess(d));
		var fields = fieldsdata[changeid];
		if(isempt(fields))fields='';
		var a = getcmp('itemsel_'+rand+'');
		a.setValue(fields);
	});
	_olidtabl = table;
}

function clickpipei(){
	var sid = grid.getSelectValue();
	if(sid==''){
		js.msg('msg','没有选择行')
		return;
	}
	getcmp('msg_'+rand+'').setText(js.getmsg('匹配中...', '#ff6600'));
	$.post(js.getajaxurl('pipei',mode,dir),{id:sid},function(da){
		getcmp('msg_'+rand+'').setText(js.getmsg(da,'#000000'));
	});
}
function setcoursename(){
	var da = grid.changedata;
	rockoption.setlist('['+da.name+']进程名称', 'flowcoursename_'+da.id);
}

function btns(bo){
	getcmp('setwheres_'+rand+'').setDisabled(bo);
	getcmp('setwhere_'+rand+'').setDisabled(bo);
	getcmp('setcourse_'+rand+'').setDisabled(bo);
	getcmp('course_'+rand+'').setDisabled(bo);
	getcmp('inputla_'+rand+'').setDisabled(bo);
}
function setcoursela(){
	var a 	= grid.changedata;
	addtabs('['+a.name+']进程管理','flow,course,setid='+a.id+',table='+a.table+',index='+index+'','flowset'+a.id+'');
}
function setinputla(){
	var a 	= grid.changedata;
	var url = js.getajaxurl('$view','input','flow',{setid:a.id});
	js.open(url, 950,530);
}
var panel = {
	xtype:'rockgridform',tablename:'flow_set',formtitle:'工作流配置',searchtools:false,
	checkcolumns:true,delbool:false,celleditbool:true,defaultorder:'`sort`',
	clickgrid:function(){
		btns(false);
	},
	tbar:[{
		text:'字段设置',icon:gicons('table_gear'),id:'setwheres_'+rand+'',handler:clicksetfield,disabled:true
	},'-',{
		text:'设置条件',handler:clicksetwhere,id:'setwhere_'+rand+'',disabled:true
	},'-',{
		text:'设置进程名称',handler:setcoursename,id:'setcourse_'+rand+'',disabled:true
	},'-',{
		text:'<font color=red>进程管理</font>',icon:gicons('sitemap'),id:'course_'+rand+'',handler:setcoursela,disabled:true
	},'-',{
		text:'<font color=blue>表单元素设置</font>',icon:gicons('application_form'),id:'inputla_'+rand+'',handler:setinputla,disabled:true
	},'-',{
		text:'重新匹配流程',handler:clickpipei
	},{
		xtype:'tbtext',id:'msg_'+rand+''
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'分类',dataIndex:'type',width:50,autowidth:true
	},{
		text:'编号',dataIndex:'num',width:50,autowidth:true
	},{
		text:'名称',dataIndex:'name',width:100,autowidth:true
	},{
		text:'对应表',dataIndex:'table',width:90,autowidth:true
	},{
		text:'排序号',dataIndex:'sort',width:70,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'站内提醒',dataIndex:'zntx',width:80,sortable:true,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'REIM提醒',dataIndex:'imtx',width:80,sortable:true,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'邮件提醒',dataIndex:'emtx',width:80,sortable:true,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'单号规则',dataIndex:'sericnum',autowidth:true,width:120,renderer:function(v){
			return v+'序号';
		}
	},{
		text:'摘要',align:'left',dataIndex:'summary',flex:1,renderer:rendercont
	},{
		text:'有流程?',dataIndex:'isflow',autowidth:true,width:70,sortable:true,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'app模块',dataIndex:'isapp',autowidth:true,width:75,sortable:true,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'ID',dataIndex:'id',width:50
	}],
	formwidth:600,
	formparams:{
		submitfields:'name,num,sort,table,summary,type,zntx,imtx,emtx,isflow,sericnum,isapp',
		params:{int_filestype:'sort,zntx,imtx,emtx,isflow,isapp',otherfields:'optdt={now}'},autoScroll:false,
		url:publicsave(mode, dir),
		aftersaveaction:'pandtablela',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'编号',name:'numPost',allowBlank: false
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'分类',name:'typePost',allowBlank: false,xtype:'optioncombo',optionmnum:'flowfenlei'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'对应的表',name:'tablePost'
		},{
			fieldLabel:''+bitian+'单号规则',name:'sericnumPost',allowBlank: false
		},{
			fieldLabel:'摘要',name:'summaryPost',xtype:'textareafield',height:60
		},{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				fieldLabel:'&nbsp;',name:'zntxPost',xtype:'checkboxfield',boxLabel:'站内提醒',inputValue:'1',checked:true,labelSeparator:''
			},{
				fieldLabel:'&nbsp;',labelWidth:10,name:'imtxPost',xtype:'checkboxfield',boxLabel:'REIM提醒',inputValue:'1',checked:false,labelSeparator:''
			},{
				fieldLabel:'&nbsp;',labelWidth:10,name:'emtxPost',xtype:'checkboxfield',boxLabel:'邮件提醒',inputValue:'1',checked:false,labelSeparator:''
			},{
				fieldLabel:'&nbsp;',labelWidth:10,name:'isflowPost',xtype:'checkboxfield',boxLabel:'有流程',inputValue:'1',checked:true,labelSeparator:''
			},{
				fieldLabel:'&nbsp;',labelWidth:10,name:'isappPost',xtype:'checkboxfield',boxLabel:'APP模块',inputValue:'1',checked:true,labelSeparator:''
			}]
		}]
	}
};


return {
	panel:panel,
	init:function(){
		grid = rock[index];
	}
};