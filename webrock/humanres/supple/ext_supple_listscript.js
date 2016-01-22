var win,typeid=0,typename='';

function opendown(){
	var url ='upload/base/物品导入格式.xls';
	js.open(url);
}
function importdown(){
	uploadwindows.imports({
		title:'['+typename+']导入',
		url:js.getajaxurl('import',mode,dir,{typeid:typeid}),
		callback:function(){
			rock[index][0].storereload();
		}
	});
}
var panel = {
	xtype:'rockgridform',tablename:'supple',formtitle:'物品列表',exceltitle:'物品列表',defaultorder:'sort',region:'center',
	url:publicstore(mode, dir),fields:['typeid'],
	columns:[{
		xtype: 'rownumberer',
		width: '5%'
	},{
		text:'分类',dataIndex:'typename',width:'10%'
	},{
		text:'物品名称',dataIndex:'name',width:'20%',search:true
	},{
		text:'编号',dataIndex:'num',width:'10%',search:true
	},{
		text:'规格型号',dataIndex:'model',width:'15%',search:true
	},{
		text:'价格',dataIndex:'price',width:'8%'
	},{
		text:'库存',dataIndex:'total',width:'8%',renderer:function(v){
			if(v<0)v='<font color=red>'+v+'</font>';
			return v;
		}
	},{
		text:'计量单位',dataIndex:'unit',width:'8%'
	},{
		text:'排序号',dataIndex:'sort',width:'8%'
	},{
		text:'ID',dataIndex:'id',width:'7%'
	}],
	tbar:['->',{
		text:'正常入库',icon:gicons('basket_put'),handler:function(a){panel._inku(3,a)}
	},'-',{
		text:'异常入库',icon:gicons('basket_error'),handler:function(a){panel._inku(4,a)}
	},'-'],
	formparams:{
		submitfields:'name,price,sort,num,model,unit,typeid',url:publicsave(mode, dir),aftersaveaction:'savesupplebefore',
		params:{int_filestype:'sort,typeid',otherfields:'optdt={now}'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT分类',name:'typeidPost',xtype:'optioncombo',optionmnum:'suppletype',allowBlank: false,valuefields:'id',autoloadlist:true
		},{
			fieldLabel:'BT物品名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'编号',name:'numPost'
		},{
			fieldLabel:'规格型号',name:'modelPost'
		},{
			fieldLabel:'计量单位',name:'unitPost',xtype:'optioncombo',optionmnum:'suppleunit',editable:true
		},{
			fieldLabel:'单价',name:'pricePost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		submitcheck:function(){
			return '';
		}
	},
	_inku:function(lxa, a){
		var lx = 0;
		if(!win){
			var me = rock[index][0];
			var cans = winopt({title:'入库',width:800,border:false,icon:gicons('add'),modal:true,items:{
				xtype:'rockgrid',tablename:'supple',
				height:370,celleditbool:true,savebool:true,searchtools:true,highsearchbool:false,
				url:publicstore(mode, dir),
				tbar:['->','对应日期',{
					xtype:'datefield',width:100,editable:false,format:'Y-m-d',value:new Date()
				},{
					text:'确定',handler:function(){me._quedingshen()},icon:gicons('ok')
				}],
				columns:[{
					xtype: 'rownumberer',
					width: 40
				},{
					text:'物品名称',dataIndex:'name',flex:1,search:true
				},{
					text:'编号',dataIndex:'num',width:100,search:true
				},{
					text:'规格型号',dataIndex:'model',width:120,search:true
				},{
					text:'库存',dataIndex:'total',width:100
				},{
					text:'<font color=red>入库数量(这里填)</font>',dataIndex:'applytotal',width:150,editor:{xtype:'numberfield',minValue:0,allowBlank: false}
				}]
			}});
			win = Ext.create('Ext.Window',cans);
			me.destroypanel.push(win);
			lx = 1;
		}
		win.show();
		win.setTitle('物品'+a.text);
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
			rock[index][0].storereload();
		});
	},
	loadgrid:function(a){
		var a = this.getData('typearr'),d=[];
		for(var i=0;i<a.length;i++){
			d.push({name:a[i].name,id:a[i].id});
		}
		rock[index][1].store.loadData(d);
	},
	bbaritems:['->',{
		text:'物品导入',disabled:true,id:'import_'+rand+'',icon:gicons('page_excel'),menu:[{
			text:'下载导入文件格式',icon:gicons('arrow_down'),handler:opendown
		},'-',{
			text:'导入Excel文件',handler:importdown
		}]
	}]
};

var panels = [panel,{
	region:'west',width:180,maxWidth:180,split:true,collapsible:true,title:'物品分类',xtype:'grid',hideHeaders:true,
	store:{fields:['id','name']},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'分类名称',dataIndex:'name',flex:1
	}],
	listeners:{
		itemdblclick:function(a,v){
			typeid=v.data.id;
			typename=v.data.name;
			var o1 = getcmp('import_'+rand+'');
			o1.setDisabled(false);
			o1.setText('['+typename+']导入');
			rock[index][0].searchgoto('and typeid='+typeid+'');
		}
	}
}];

return {
	panel:panels
};