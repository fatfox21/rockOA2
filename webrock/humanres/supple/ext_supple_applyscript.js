var win;
var panel = {
	xtype:'rockgridform',tablename:'supplea',formtitle:'申请办公用品',exceltitle:'申请办公用品',
	url:publicstore(mode, dir),highsearchbool:false,
	keywhere:'[A][K]uid='+adminid+'[K][A][K]`status`[K]in(0,1,2)',
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'部门',dataIndex:'deptname',width:200
	},{
		text:'姓名',dataIndex:'name',width:100
	},{
		text:'物品名称',dataIndex:'aname',width:200,search:true,searchtpl:"aid in(select id from [Q]supple where name ?0 ?1)"
	},{
		text:'申请数',dataIndex:'total',width:100,search:true
	},{
		text:'说明',dataIndex:'explain',search:true,autowidth:true
	},{
		text:'状态',dataIndex:'status',width:150,boxdata:[['red','待发放'],['green','已发放'],['blue','驳回'],['#ff6600','入库'],['#ff6600','异常入库']],search:true,atype:'select',store:js.arraystr('0|待确认,1|已发放,2|不通过驳回,3|入库,4|异常入库'),renderer:function(a,v,r){
			var s = renderbox(a,v);
			var d = r.raw;
			if(d.status=='1' || d.status=='2')s+='('+d.statusman+')';
			return s;
		}
	},{
		text:'操作时间',dataIndex:'optdt',width:160
	}],
	grideditwhere:function(a){
		if(a.status=='0')return true;
	},
	griddelwhere:function(a){
		if(a.status=='0' || a.status=='2')return true;
	},
	_quedingshen:function(){
		var data = win.down('rockgrid').getStore().getModifiedRecords(),i,das={},oi=0,a,me=this;
		for(i=0;i<data.length;i++){
			a = data[i].data;
			if(!isempt(a.applytotal)){
				if(a.applytotal > 0){
				das['aid_'+i] = a.id;
				das['total_'+i] = a.applytotal;
				das['explain_'+i] = a.explain;
				oi++;
				}
			}
		}
		das['total'] = oi;
		win.hide();
		if(oi==0)return;
		js.msg('wait','保存中...');
		$.post(js.getajaxurl('apply',mode,dir),das, function(){
			js.msg('success','保存成功');
			me.storereload();
		});
	},
	formaddbefore:function(o){
		if(!win){
			var cans = winopt({title:'申请办公用品',border:false,width:650,icon:gicons('add'),items:{
				xtype:'rockgrid',tablename:'supple',
				height:400,celleditbool:true,savebool:true,searchtools:true,highsearchbool:false,
				url:publicstore(mode, dir),
				tbar:['双击行上申请数量原因填写','->',{
					text:'确定',handler:function(){o._quedingshen()},icon:gicons('ok')
				}],
				columns:[{
					xtype: 'rownumberer',
					width: 40
				},{
					text:'名称',dataIndex:'name',flex:1,search:true
				},{
					text:'库存',dataIndex:'total',width:80
				},{
					text:'申请数量',dataIndex:'applytotal',width:100,editor:{xtype:'numberfield',minValue:0,allowBlank: false}
				},{
					text:'申请原因',dataIndex:'explain',width:180,editor:'textfield'
				}]
			}});
			win = Ext.create('Ext.Window',cans);
			o.destroypanel.push(win);
		}
		win.show();
		return false;
	},
	deljudgewhere:'rockjm_ss0ok0rl0kjn0kjj0ql0rp0kll0qm0qk0kjr0kkq0qo0pr0po0kko0qq0kjo0kjq0kjm0rs0rq0om0kjq0qm0qk0kjr0kjq0rj0rr0kkp0kkl0sj0ql0nr0or09',
	formparams:{
		submitfields:'explain,total',
		params:{int_filestype:'aid,uid,status,total',otherfields:'rockjm_wv0so0tt0rv0wn0up0vo0su0ono0sn0sq0oov0onn0so0rv0oos0ww0so0vp0onr0onn0up0vt0opp0vn0vr0ts0oos0onn0vu0onv0onu0vn0vv0oot0onr0wn0uo0rw0oop0wv0onw0onv0onu0onp0vo0sv0sv013'},
		editjudgewhere:'rockjm_ss0ok0rl0kjn0kjj0ql0rp0kll0qm0qk0kjr0kkq0qo0pr0po0kko0qq0kjo0kjq0kjm0rs0rq0om0kjq0qm0qk0kjr0kjq0rj0rr0kkp0kkl0sj0ql0nr0or09',
		items:[{
			fieldLabel:'id号',value:'0',name:'idPost',hidden:true
		},{
			fieldLabel:'申请物品',name:'anamePost',xtype:'displayfield'
		},{
			fieldLabel:'<font color=red>*</font>申请数量',name:'totalPost',value:'0',minValue:1,xtype:'numberfield',allowBlank: false
		},{
			fieldLabel:'备注',name:'explainPost'
		}]
	},
	formotherfield:'id,aname'
};

return {
	panel:panel
};