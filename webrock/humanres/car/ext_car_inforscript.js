var grid,grids,form;
function btn(bo){
	try{
	getcmp('edit_'+rand+'').setDisabled(bo);
	getcmp('del_'+rand+'').setDisabled(bo);
	getcmp('zt_'+rand+'').setDisabled(bo);
	}catch(e){}	
}
var panelss = {
	xtype:'rockgrid',tablename:'carm',searchtools:true,exceltitle:'车辆信息',region:'center',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'车牌号',dataIndex:'carnum',width:120,search:true
	},{
		text:'车辆品牌',dataIndex:'carbrand',width:120,editor:'textfield',search:true
	},{
		text:'型号',dataIndex:'carmode',width:100,search:true
	},{
		text:'车辆类型',dataIndex:'cartype',width:100,search:true
	},{
		text:'购买日期',dataIndex:'buydt',width:100,search:true
	},{
		text:'状态',dataIndex:'state',width:100,search:true
	},{
		text:'公开',dataIndex:'ispublic',width:60,renderer:renderbox,editor:{xtype:'combo',store:js.arraystr(),editable:false},search:true,atype:'select'
	},{
		text:'强险到期',dataIndex:'qxenddt',width:100,search:true,atype:'date'
	},{
		text:'行驶证到期',dataIndex:'xszenddt',width:100,search:true,atype:'date'
	},{
		text:'商业险到期',dataIndex:'syxenddt',width:100,search:true,atype:'date'
	},{
		text:'年审截到期',dataIndex:'nsenddt',width:100,search:true,atype:'date'
	}],
	tbar:['双击行查看信息登记状态','->',{
		text:'信息登记',icon:gicons('pencil'),disabled:true,id:'zt_'+rand+'',handler:function(){
			grids.searchgoto('and mid='+grid.changedata.id+'');
			grid._changelistda();
		}
	},'-',{
		text:'新增',icon:gicons('add'),handler:function(){grid._clickeadd()}
	},'-',{
		text:'修改',icon:gicons('edit'),disabled:true,id:'edit_'+rand+'',handler:function(){grid._clickedit()}
	},'-',{
		text:'删除',icon:gicons('delete'),disabled:true,id:'del_'+rand+'',handler:function(a){grid.del(a)}
	}],
	_clickedit:function(){
		var sid = this.changedata.id;
		addtabs('编辑车辆','humanres,car,add,id='+sid+',gridid='+this.getId()+'','caradd_'+sid+'',{icon:gicons('edit')});
	},
	_clickeadd:function(){
		addtabs('新增车辆','humanres,car,add,gridid='+this.getId()+'','caradd',{icon:gicons('add')});
	},
	beforeload:function(){
		btn(true);
	},
	click:function(o,r){
		btn(false);
	},
	itemId:'listm',
	dblclick:function(o,r){
		var sid = r.get('id');
		grids.searchgoto('and mid='+sid+'');
		this._changelistda();
	},
	_changelistda:function(){
		var da = this.changedata;
		form.reset();
		form.setVal('mid', da.id);
		form.setVal('num', da.carnum);
	}
};

var panel = [panelss,{
	height:240,region:'south',split:true,border:false,layout:'border',items:[{
		region:'center',xtype:'rockgrid',tablename:'cars',storeautoLoad:false,itemId:'lists',bbaritems:[{
			text:'删除',icon:gicons('delete'),handler:function(){grids.del();}
		}],defaultorder:'optdt desc',
		columns:[{
			xtype: 'rownumberer',
			width: 40
		},{
			text:'操作人',dataIndex:'optname',width:100
		},{
			text:'操作时间',dataIndex:'optdt',width:160,sortable:true
		},{
			text:'登记字段',dataIndex:'fieldsname',width:120
		},{
			text:'对应值',dataIndex:'value',width:120
		},{
			text:'说明',dataIndex:'explain',flex:1
		}]
	},{
		xtype:'rockform',tablename:'cars',itemId:'listss',icon:gicons('pencil'),region:'east',width:300,title:'信息登记',collapsible: true,split:true,
		submitfields:'fields,fieldsname,value,mid,explain',url:publicsave(mode, dir),aftersaveaction:'chantgeupcarse',
		params:{int_filestype:'mid',otherfields:'optdt={now},optname={admin}'},
		items:[{
			value:'0',name:'idPost',hidden:true	
		},{
			value:'0',name:'midPost',hidden:true
		},{
			name:'fieldsnamePost',hidden:true
		},{
			fieldLabel:'车牌号',name:'numPost',xtype:'displayfield'
		},{
			fieldLabel:'BT登记字段',name:'fieldsPost',allowBlank: false,xtype:'optioncombo',valuefields:'value',optionmnum:'carbfields',change:function(v){
				form.setVal('fieldsname',v.getRawValue());
				form.changevalss();
			}
		},{
			fieldLabel:'BT对应值',name:'valuePost',allowBlank: false,hidden:true
		},{
			fieldLabel:'BT状态',name:'statePost',hidden:true,xtype:'optioncombo',optionmnum:'carstate',change:function(v){
				form.setVal('value', v.value);
			}
		},{
			fieldLabel:'BT日期',name:'dtPost',hidden:true,xtype:'datefield',format:'Y-m-d',editable:false,listeners:{change:function(v){
				form.setVal('value', v.getRawValue());
			}}
		},{
			fieldLabel:'BT金额',name:'moneyPost',hidden:true,xtype:'numberfield',value:0,minValue:0,listeners:{change:function(v){
				form.setVal('value', v.getValue());
			}}
		},{
			fieldLabel:'说明',name:'explainPost',xtype:'textareafield',height:60
		}],
		success:function(){
			grid._changelistda();
			grids.storereload();
		},
		changevalss:function(){
			var fiels = this.getVal('fields');
			if(fiels=='state'){
				this.setVal('value', this.getVal('state'));
				this.getField('state').show();
				this.getField('dt').hide();
				this.getField('money').hide();
			}else if(fiels.indexOf('dt')>-1){
				this.setVal('value', this.getField('dt').getRawValue());
				this.getField('state').hide();
				this.getField('money').hide();
				this.getField('dt').show();
			}else if(fiels.indexOf('money')>-1){
				this.setVal('value', this.getVal('money'));
				this.getField('state').hide();
				this.getField('money').show();
				this.getField('dt').hide();
			}
		}
	}]
}];

return {
	panel:panel,
	init:function(){
		grid = objpanel.down('#listm');
		grids = objpanel.down('#lists');
		form = objpanel.down('#listss');
	},
	tabson:{
		show:function(){
			if(grid.isreadload){
				grid.storereload();
				grid.isreadload=false;
			}	
		}
	}
};
