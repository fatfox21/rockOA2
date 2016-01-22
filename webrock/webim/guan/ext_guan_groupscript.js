var changeid=0,ugrid;
var panel = [{
	xtype:'rockgridform',tablename:'im_group',celleditbool:true,iconqz:'group_',defaultorder:'`type`,`sort`',region:'center',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'名称',dataIndex:'name',editor:'textfield',search:true,width:150
	},{
		text:'类型',dataIndex:'type',search:true,atype:'select',store:js.arraystr('0|群,1|讨论组,2|系统分类'),renderer:function(v){
			var s = '<font color=green>群</font>';
			if(v==1)s='<font color=#ff6600>讨论组</font>';
			if(v==2)s='<font color=#336699>系统分类</font>';
			return s;
		}
	},{
		text:'图标',dataIndex:'face',renderer:function(v){
			if(!isempt(v))v='<img width=20 height=20 src='+v+'>';
			return v;
		}
	},{
		text:'创建人',dataIndex:'createname',width:100
	},{
		text:'创建时间',dataIndex:'createdt',width:160,search:true,atype:'date'
	},{
		text:'排序号',dataIndex:'sort',width:80,editor:{xtype:'numberfield',minValue:0},sortable:true
	},{
		text:'ID',dataIndex:'id',width:60
	}],
	formparams:{
		submitfields:'name,type,face,sort',labelWidth:100,
		autoScroll:false,params:{int_filestype:'sort,type',add_otherfields:'createdt={now},createname={admin},createid={adminid}'},
		beforesaveaction:'setemailpass',url:publicsave(mode, dir),
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:''+bitian+'名称',name:'namePost',allowBlank: false
		},{
			fieldLabel:'图标',name:'facePost'
		},{
			fieldLabel:'类型',name:'typePost',value:'0',xtype:'combo',store:js.arraystr('0|群,1|讨论组,2|系统分类'),allowBlank: false,editable:false
		},{
			fieldLabel:'排序号',name:'sortPost',value:'0',minValue:0,xtype:'numberfield'
		}]
	},
	clickgrid:function(a, v){
		var sid = v.data.id;
		if(v.data.type!=2){
			changeid = sid;
			ugrid.searchgoto('[A][K]gid='+sid+'');
			ugrid.setTitle('['+v.data.name+']下人员');
		}
	}
},{
	title:'对应人员',width:280,itemId:'groupuser',split:true,region:'east',xtype:'rockgrid',tablename:'im_groupuser',storeautoLoad:false,bbarbool:false,pageSize:0,checkcolumns:true,
	url:publicstore(mode,dir),storeafteraction:'groupuserafter',
	tbar:[{
		name:'superidPost',id:'superid_'+rand+'',hidden:true,xtype:'textfield'
	},{
		nameidfields:'superid_'+rand+'',xtype:'changedeptuser',changetitle:'选择人员添加',changetype:'userdeptcheck',width:150,emptyText:'添加人员',changeback:function(sid,snam){
			if(!isempt(sid))ugrid._adduser(sid);
		},changecheck:function(){return changeid>0}
	},'->',{
		text:'删除',icon:gicons('delete'),handler:function(){
			ugrid.del(false, true);
		}
	}],
	columns:[{
		xtype: 'rownumberer',
		width: 35
	},{
		text:'姓名',dataIndex:'name',flex:0.4
	},{
		text:'部门',dataIndex:'deptname',flex:0.6
	}],
	_adduser:function(sid){
		js.msg('wait','添加中...');
		$.post(js.getajaxurl('adduser',mode,dir),{gid:changeid,val:sid}, function(da){
			js.msg('success', da);
			ugrid.storereload();
		});
	}
}];

return {
	panel:panel,
	init:function(o){
		ugrid = o.down('#groupuser');
	}
};
