var grid;
function opentablss(a){
	if(isempt(a.modenum)){
		js.msg('msg','记录不存在了');
		return;
	}
	addtabs('[查看]'+a.modename,'flow,apply,'+a.modenum+',flownum='+a.modenum+',tablename='+a.table+',opentype=0,mid='+a.mid+',gridid=', ''+a.modenum+'_'+a.mid+'');
}


var panel = {
	xtype:'rockgrid',tablename:'flow_bill',searchtools:true,defaultorder:'optdt desc',
	url:publicstore(mode,dir),storeafteraction:'checkmychange',storebeforeaction:'checkmybefore',
	
	tbarleft:[{
		xtype:'combo',store:[['0','所有模块']],width:130,editable:false,id:'mode_'+rand+'',value:'0'
	}],
	tbar:['->',{
		text:'我申请的',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(0);}
	},'-',{
		text:'经我处理的',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(1);}
	},'-',{
		text:'我下属申请',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(2);}
	},'-',{
		text:'授权查看的',enableToggle:true,toggleGroup:'tools_'+rand+'',handler:function(){grid._qiehuanzt(3);}
	},'->',{
		text:'新窗口打开详情',icon:gicons('application'),disabled:true,itemId:'new',handler:function(){
			var a = this.up('grid')._openurl();
		}
	}],
	_qiehuanzt:function(oi){
		if(this.loadbool)return;
		this.setparams({protype:oi}, true);
	},
	outsearch:function(){
		this.setparams({modeid:getcmp('mode_'+rand+'').getValue()});
		return '';
	},
	_openurl:function(){
		var a = this.changedata;
		if(isempt(a.modenum)){
			js.msg('msg','记录不存在了');
			return;
		}
		var url = js.getajaxurl('$view','flow','taskrun',{uid:adminid,mid:a.mid,modenum:a.modenum,table:a.table,jmbool:true});
		js.open(url, 800);
	},
	click:function(){
		this.down('#new').setDisabled(false);
	},
	dblclick:function(){
		this._openurl();
	},
	beforeload:function(){
		this.down('#new').setDisabled(true);
	},
	load:function(){
		if(this.loadcount>1)return;
		var a = this.getData('modearr');
		var d = [['0','所有模块']];
		for(var i=0; i<a.length; i++){
			d.push([a[i].id, a[i].name]);
		}
		getcmp('mode_'+rand+'').getStore().loadData(d);
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'模块',width:110,dataIndex:'modename',search:false,sortable:true,qz:'a.'
	},{
		text:'单号',width:100,dataIndex:'sericnum',search:true,sortable:true,autowidth:true,qz:'a.'
	},{
		text:'部门',width:100,dataIndex:'deptname',sortable:false,autowidth:true,search:true,qz:'b.'
	},{
		text:'姓名',width:80,dataIndex:'name',sortable:false,search:true,qz:'b.'
	},{
		text:'时间',width:150,dataIndex:'optdt',sortable:true,atype:'date',search:true,autowidth:true,qz:'a.'
	},{
		text:'状态',width:150,dataIndex:'statustext'
	},{
		text:'摘要',flex:1,dataIndex:'summary',sortable:false,renderer:rendercont,align:'left'
	},{
		xtype:'actioncolumn',
		width:70,text:'操作',
		items: [{
			icon: gicons('page_go'),tooltip: '打开详情',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				opentablss(rec.raw);
			}
		}]
	}]
};
return {
	panel:panel,
	init:function(){
		grid = objpanel.down('rockgrid');
	}
};