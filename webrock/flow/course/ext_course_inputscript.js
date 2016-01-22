var grid0,grid1,mid=0,inputarr={};
var panel=[{
	xtype:'rockgridform',region:'west',width:260,keywhere:'and `mid`=0',split:true,bbarbool:false,defaultorder:'sort',
	tablename:'flow_courseinput',storefields:'id,name,sort',formtitle:'流程处理表单',title:'流程处理表单',collapsible:true,searchtools:false,
	url:publicstore(mode, dir),storeafteraction:'inputshoaafter',
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
		grid1.searchgoto("and `mid`='"+mid+"'");
	},
	formparams:{
		submitfields:'name,sort',autoScroll:false,
		params:{int_filestype:'sort',otherfields:'mid=0'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	},
	loadgrid:function(){
		inputarr = this.getData('inputtype');
	}
},{
	xtype:'rockgridform',bbarbool:false,defaultorder:'sort',formtitle:'处理表单',
	tablename:'flow_courseinput',storeautoLoad:false,searchtools:false,
	region:'center',
	tbar:['请限制选择左边对应列'],
	formaddbefore:function(){
		if(mid==0){
			js.msg('msg','没有选择左边记录');
			return;
		}
		return true;
	},
	columns:[{
		xtype: 'rownumberer',
		width: 50
	},{
		text:'表单名称',dataIndex:'label',sortable:true,flex:1,search:true
	},{
		text:'表单类型',dataIndex:'type',sortable:true,width:'27%',search:true,renderer:function(v){return inputarr[v]}
	},{
		text:'表单名',dataIndex:'name',sortable:true,width:'24%',search:true
	},{
		text:'排序号',dataIndex:'sort',width:'13%'
	}],
	formparams:{
		submitfields:'name,sort,type,label,mid',autoScroll:false,
		params:{int_filestype:'sort,mid'},
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			value:'0',name:'midPost',hidden:true
		},{
			fieldLabel:'BT表单名称',name:'labelPost',allowBlank: false
		},{
			fieldLabel:'BT表单名',name:'namePost',allowBlank: false
		},{
			fieldLabel:'BT表单类型',name:'typePost',allowBlank: false,xtype:'optioncombo',optionmnum:'flowinputtype',autoloadlist:true,valuefields:'value',value:'text'
		},{
			fieldLabel:'序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		submitcheck:function(o){
			if(o.getVal('id')=='0')o.setVal('mid', mid);
			var s='';
			return s;
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