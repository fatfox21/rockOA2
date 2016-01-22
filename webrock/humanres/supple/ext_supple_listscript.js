var win;
var panel = {
	xtype:'rockgridform',tablename:'supple',formtitle:'办公用品列表',exceltitle:'办公用品',defaultorder:'sort',
	url:publicstore(mode, dir),
	columns:[{
		xtype: 'rownumberer',
		width: 30
	},{
		text:'名称',dataIndex:'name',width:250,search:true
	},{
		text:'价格',dataIndex:'price',width:100
	},{
		text:'库存',dataIndex:'total',width:100,renderer:function(v){
			if(v<0)v='<font color=red>'+v+'</font>';
			return v;
		}
	},{
		text:'序号',dataIndex:'sort',width:100
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	tbar:['->',{
		text:'正常入库',icon:gicons('basket_put'),handler:function(a){panel._inku(3,a)}
	},'-',{
		text:'异常入库',icon:gicons('basket_error'),handler:function(a){panel._inku(4,a)}
	},'-'],
	formparams:{
		submitfields:'name,price,sort',
		params:{int_filestype:'sort',otherfields:'optdt={now}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'<font color=red>*</font>名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'单价',name:'pricePost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	},
	_inku:function(lxa, a){
		var lx = 0;
		if(!win){
			var me = rock[index];
			var cans = winopt({title:'入库',width:650,border:false,icon:gicons('add'),items:{
				xtype:'rockgrid',tablename:'supple',
				height:400,celleditbool:true,savebool:true,searchtools:true,highsearchbool:false,
				url:publicstore(mode, dir),
				tbar:['双击行上入库数量填写','->',{
					text:'确定',handler:function(){me._quedingshen()},icon:gicons('ok')
				}],
				columns:[{
					xtype: 'rownumberer',
					width: 40
				},{
					text:'名称',dataIndex:'name',flex:1,search:true
				},{
					text:'库存',dataIndex:'total',width:100
				},{
					text:'入库数量',dataIndex:'applytotal',width:120,editor:{xtype:'numberfield',minValue:0,allowBlank: false}
				}]
			}});
			win = Ext.create('Ext.Window',cans);
			me.destroypanel.push(win);
			lx = 1;
		}
		win.show();
		win.setTitle(a.text);
		win.setIcon(a.icon);
		panel.urlx = lxa;
		if(lx==0)win.down('rockgrid').storereload();
	},
	_quedingshen:function(){
		var data = win.down('rockgrid').getStore().getModifiedRecords(),i,das={},oi=0,a;
		for(i=0;i<data.length;i++){
			a = data[i].data;
			if(!isempt(a.applytotal)){
				if(a.applytotal > 0){
				das['aid_'+i] = a.id;
				das['total_'+i] = a.applytotal;
				oi++;
				}
			}
		}
		das['total'] = oi;
		das['status'] = panel.urlx;
		win.hide();
		if(oi==0)return;
		js.msg('wait','保存中...');
		$.post(js.getajaxurl('inruku',mode,dir),das, function(){
			js.msg('success','保存成功');
			rock[index].storereload();
		});
	}
};

return {
	panel:panel
};