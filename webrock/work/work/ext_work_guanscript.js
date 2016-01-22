var grid;
var panel= {
	xtype:'rockgrid',celleditbool:true,
	tablename:'work',searchtools:true,defaultorder:'optdt desc',
	keywhere:'and mid=0 and optid='+adminid+'',
	viewConfigs:{
		getRowClass: function(v, rowIndex){
			if(v.raw.status=='0')return 'hui';
   		}
	},
	delurl:js.getajaxurl('delwork', mode, dir),
	tbar:['->',{
		text:'新增',icon:gicons('add'),handler:function(){grid._clickeadd()}
	},'-',{
		text:'修改',icon:gicons('page_edit'),disabled:true,itemId:'edit',handler:function(){grid._clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,itemId:'del',handler:function(a){grid.del(a)}
	}],
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('编辑任务','work,work,add,id='+sid+',index='+index+'','workadd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('新增任务','work,work,add,index='+index+'','workadd',{icon:gicons('add')});
	},
	_btonsl:function(bo){
		grid.down('#edit').setDisabled(bo);
		grid.down('#del').setDisabled(bo);
	},
	click:function(){
		this._btonsl(false);
	},
	beforeload:function(){
		this._btonsl(true);
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'标题',dataIndex:'title',search:true,autowidth:true,align:'left'
	},{
		text:'创建者',dataIndex:'optname',search:true,width:80
	},{
		text:'任务类型',dataIndex:'type',search:true,width:100
	},{
		text:'等级',dataIndex:'grade',search:true,width:70
	},{
		text:'分配给',dataIndex:'dist',search:true,autowidth:true
	},{
		text:'启用',dataIndex:'status',width:70,editor:{xtype:'combo',editable:false,store:js.arraystr()},renderer:renderbox,search:true,atype:'select'
	},{
		text:'提醒',dataIndex:'istx',width:70,editor:{xtype:'combo',editable:false,store:js.arraystr()},renderer:renderbox,search:true,atype:'select'
	},{
		text:'工作频率',dataIndex:'plcont',autowidth:true,align:'left',search:true,renderer:rendercont
	},{
		text:'任务报告',dataIndex:'baoname',search:true,autowidth:true,renderer:function(v, m, b){
			var s = '';
			if(!isempt(v)&&!isempt(b.raw.bgtime)){
				s = '每天'+b.raw.bgtime+'的报告给'+v+'';
			}
			return s;
		}
	},{
		text:'说明',align:'left',dataIndex:'explain',autowidth:true,search:true,renderer:rendercont
	},{
		text:'创建时间',dataIndex:'optdt',search:true,width:160
	}]
};

return {
	panel:panel,
	init:function(){
		grid = rock[index];
		rock[index].isreadload = false;
	},
	tabson:{
		show:function(){
			if(rock[index].isreadload){
				grid.storereload();
				rock[index].isreadload=false;
			}	
		}
	}	
};