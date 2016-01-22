var grid0,grid1,grid2,mid=0,sid=0;
var panel=[{
	xtype:'rockgridform',region:'west',width:260,keywhere:'and `type`=0 and `mid`=0',split:true,bbarbool:false,defaultorder:'sort',
	tablename:'kq_set',storefields:'id,recename,name,sort',formtitle:'考勤规则',title:'考勤规则',collapsible:true,searchtools:false,
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',flex:1
	},{
		text:'排序号',dataIndex:'sort',width:70
	}],
	clickgrid:function(a, v){
		mid = v.get('id');
		grid1.formwinhide();
		grid1.searchgoto("and `type`='"+mid+"'");
	},
	formparams:{
		submitfields:'name,sort',autoScroll:false,
		params:{int_filestype:'sort,type',otherfields:'optdt={now},type=0,mid=0'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	}
},{
	xtype:'rockgridform',bbarbool:false,defaultorder:'sort',formtitle:'考勤次数',title:'考勤次数',
	tablename:'kq_set',storeautoLoad:false,searchtools:false,fields:['etime'],
	region:'center',storefields:'id,name,type,sort,stime,etime',
	formaddbefore:function(){
		if(mid==0){
			js.msg('msg','没有选择左边记录');
			return;
		}
		return true;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 34
	},{
		text:'名称',dataIndex:'name',flex:1
	},{
		text:'时间',dataIndex:'stime',autowidth:true,renderer:function(v,m,v1){
			var s = '';
			if(!isempt(v))s=''+v+'至'+v1.get('etime');
			return s;
		}
	},{
		text:'排序号',dataIndex:'sort',width:70
	}],
	clickgrid:function(a, v){
		sid = v.get('id');
		grid2.formwinhide();
		grid2.searchgoto("and mid='"+sid+"'");
	},
	formparams:{
		submitfields:'name,sort,type,stime,dt,etime',autoScroll:false,
		params:{int_filestype:'sort,type',otherfields:'optdt={now}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			value:'0',name:'typePost',hidden:true
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'开始时间',name:'stimePost',xtype:'rockdate',format:'H:i:s',clearbool:true
		},{
			fieldLabel:'截止时间',name:'etimePost',xtype:'rockdate',format:'H:i:s',clearbool:true
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		submitcheck:function(o){
			if(o.getVal('id')=='0')o.setVal('type', mid);
			var s='';
			var st1 = o.getVal('stime'),st2 = o.getVal('etime');
			if((st1=='' && st2 !='')||(st2=='' && st1 !=''))s='开始和截止2个都必须选';
			return s;
		}
	}
},{
	xtype:'rockgridform',title:'考勤状态值',formtitle:'考勤状态值',
	tablename:'kq_set',storeautoLoad:false,defaultorder:'sort',
	region:'east',width:'47%',split:true,bbarbool:false,searchtools:false,
	formaddbefore:function(){
		if(sid==0){
			js.msg('msg','没有选择中间的考勤记录');
			return;
		}
		return true;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',width:100
	},{
		text:'开始时间',dataIndex:'stime',flex:1
	},{
		text:'截止时间',dataIndex:'etime',flex:1
	},{
		text:'取值方式',dataIndex:'qtype',renderer:renderbox,boxdata:[['blue','最小值'],['green','最大值']]
	},{
		text:'排序号',dataIndex:'sort',width:60
	}],
	tbar:['其他时间段视为未打卡'],
	formparams:{
		submitfields:'name,sort,mid,stime,etime,qtype',autoScroll:false,
		params:{int_filestype:'sort,mid,qtype',otherfields:'optdt={now}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			value:'0',name:'midPost',hidden:true
		},{
			fieldLabel:''+bitian+'名称',xtype:'optioncombo',optionmnum:'kaoqintype',name:'namePost',allowBlank: false
		},{
			fieldLabel:''+bitian+'时间从',name:'stimePost',xtype:'rockdate',allowBlank: false,format:'H:i:s'
		},{
			fieldLabel:''+bitian+'到',name:'etimePost',xtype:'rockdate',allowBlank: false,format:'H:i:s'
		},{
			fieldLabel:''+bitian+'取值方式',name:'qtypePost',allowBlank: false,xtype:'combo',editable:false,store:[['0','最小值'],['1','最大值']]
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		submitcheck:function(o){
			o.setVal('mid', sid);
			return '';
		}
	}
}]
return {
	panel:panel,
	init:function(){
		grid0 = rock[index][0];
		grid1 = rock[index][1];
		grid2 = rock[index][2];
	}
};