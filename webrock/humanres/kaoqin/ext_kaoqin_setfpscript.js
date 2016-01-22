var grid0,grid1,mid=0;
var panel=[{
	xtype:'rockgrid',region:'west',width:300,keywhere:'and `type`=0 and `mid`=0',split:true,bbarbool:false,defaultorder:'sort',
	tablename:'kq_set',storefields:'id,recename,name,sort',title:'考勤规则',collapsible:true,searchtools:false,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',flex:1
	},{
		text:'排序号',dataIndex:'sort',width:70
	}],
	click:function(a, v){
		mid = v.get('id');
		grid1.searchgoto("and mid='"+mid+"'");
	}
},{
	xtype:'rockgridform',bbarbool:false,defaultorder:'sort',formtitle:'考勤时间分配',title:'考勤时间分配',
	tablename:'kq_setm',searchtools:false,url:publicstore(mode, dir),storeafteraction:'ladasetmguiz',
	region:'center',
	formaddbefore:function(){
		if(mid==0){
			js.msg('msg','没有选择左边考勤规则');
			return;
		}
		return true;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'分配名称',dataIndex:'recename',flex:1
	},{
		text:'规则名称',dataIndex:'gzname',autowidth:true
	},{
		text:'开始日期',dataIndex:'startdt',width:120
	},{
		text:'截止日期',dataIndex:'enddt',width:120
	},{
		text:'状态',dataIndex:'ztname',autowidth:true
	},{
		text:'操作人',dataIndex:'optname',width:100
	}],
	formparams:{
		submitfields:'startdt,receid,recename,startdt,enddt,mid,sort',autoScroll:false,
		params:{int_filestype:'mid,sort',otherfields:'optdt={now},optname={admin}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			value:'0',name:'midPost',hidden:true
		},{
			name:'receidPost',id:'receid_'+rand+'',xtype:'textfield',hidden:true
		},{
			fieldLabel:''+bitian+'分配名称',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择对象',changetype:'deptusercheckall'
		},{
			fieldLabel:''+bitian+'开始时间',name:'startdtPost',xtype:'datefield',editable:false,format:'Y-m-d',allowBlank: false
		},{
			fieldLabel:''+bitian+'截止时间',name:'enddtPost',xtype:'datefield',editable:false,format:'Y-m-d',allowBlank: false
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		submitcheck:function(o){
			if(o.getVal('id')=='0')o.setVal('mid', mid);
			return '';
		}
	}
}]
return {
	panel:panel,
	init:function(){
		grid0 = rock[index][0];
		grid1 = rock[index][1];
	}
};