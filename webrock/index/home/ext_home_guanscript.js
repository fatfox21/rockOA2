var panel = {
	xtype:'rockgridform',tablename:'homeitems',formtitle:'首页项',celleditbool:true,defaultorder:'sort',keywhere:'and mid=0[K][A][K]type=0',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'图标',dataIndex:'icons',width:80,editor:'textfield',renderer:function(v){return '<img src="'+gicons(v)+'" height=16 width=16>'}
	},{
		text:'标题',dataIndex:'title',width:150,editor:'textfield',search:true
	},{
		text:'编号',dataIndex:'num',width:120,search:true
	},{
		text:'可用对象',dataIndex:'recename',width:200,search:true
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'是否可用',dataIndex:'valid',width:80,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'是否默认',dataIndex:'ismr',width:80,editor:{xtype:'combo',store:js.arraystr(),editable:false},renderer:renderbox
	},{
		text:'宽',dataIndex:'w',width:80,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'高',dataIndex:'h',width:80,editor:{xtype:'numberfield',minValue:0}
	},{
		text:'ID',dataIndex:'id',width:70
	}],
	tbar:['需在index/home/aitems/目录下创建js文件','->',{
		text:'默认排序',icon:gicons('cog'),handler:function(o){
			addtabs('首页项默认排序','@index,home,indextd,mid=0','hometdcogwwe0',{padding:0,icon:gicons('application_view_tile')});
		}
	},'-'],
	bbaritems:['->',{
		text:'默认首页项管理',icon:gicons('application_view_tile'),handler:function(o){
			addtabs(o.text,'index,home,guanmr','hometdcog');
		}
	}],
	formparams:{
		submitfields:'title,num,sort,receid,recename,valid,ismr,w,h,icons',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'BT标题',name:'titlePost',allowBlank: false
		},{
			fieldLabel:'BT编号',name:'numPost',allowBlank: false
		},{
			fieldLabel:'BT图标',name:'iconsPost',allowBlank: false
		},{
			name:'receidPost',id:'receid_'+rand+'',xtype:'textfield',hidden:true
		},{
			fieldLabel:'可用对象',nameidfields:'receid_'+rand+'',name:'recenamePost',xtype:'changedeptuser',changetitle:'选择对象',changetype:'deptusercheckall'
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'&nbsp;',name:'validPost',xtype:'checkboxfield',boxLabel:'可用',inputValue:'1',value:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'&nbsp;',name:'ismrPost',xtype:'checkboxfield',boxLabel:'默认项',inputValue:'1',value:'1',checked:true,labelSeparator:''
		},{
			fieldLabel:'宽',name:'wPost',value:'0',minValue:0,xtype:'numberfield'
		},{
			fieldLabel:'高',name:'hPost',value:'0',minValue:0,xtype:'numberfield'
		}],
		params:{int_filestype:'sort,valid,ismr,w,h'}
	}
};

return {
	panel:panel
};
