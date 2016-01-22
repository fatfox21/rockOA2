/**
	主页：http://www.xh829.com
	交流QQ群：429403774
	说明：免费开源软件，欢迎学习研究使用
	作者：雨中磐石(rainrock)
*/

Ext.define('Ext.rock.tree',{
	extend: 'Ext.tree.Panel',
    alias: 'widget.rocktree',
	region:'center',
	viewConfig: {
		stripeRows: true,
		enableTextSelection: true,
		loadMask:true
	},
	fields:[],
	changedata:false,
	changerecord:null,
	rootVisible: false,
	rowLines:true,
	tablename:'',
	where:'',
	fistwhere:'',
	path:'',
	onDestroy:function(){
		if(this.cellediting)Ext.destroy(this.cellediting);
		for(var i=0;i<this.destroypanel.length;i++)Ext.destroy(this.destroypanel[i]);
		this.callParent();
	},
	click:function(o,record,item,index ,e){
		
	},
	dblclick:function(o,record,item,index ,e){
		
	},
	storebeforeload:function(){
	},
	beforeload:function(){
	},
	load:function(da,records,successful,eOpts){
		
	},
	getpath:function(node){
		this.path = node.getPath();
		this._getpaths(node);
	},
	_getpaths:function(node)
	{
		this.path='/'+node.data.id+''+this.path;
		if(node.parentNode)this._getpaths(node.parentNode);
	},
	storereload:function(){
		this.store.reload()
	},
	initComponent: function(){
		var me		= this;
		Ext.applyIf(this,{
			listeners:{},
			storeconfig:{},
			url:publictreestore(),
			params:{},
			destroypanel:[],
			celleditbool:false,
			savebool:false
		});
		if(!this.store)this.store	= this.createstore();
		me.plugins = [];
		if(me.celleditbool){
			me.cellediting = Ext.create('Ext.grid.plugin.CellEditing');
			me.plugins.push(me.cellediting);
		};
		var deon = {
			itemclick:function(o,record,item,index ,e){
				me.changerecord = record;
				me.changedata = record.raw;
				me.click(o,record,item,index ,e);
				me.getpath(record);
			},
			itemdblclick:function(o,record,item,index ,e){
				me.dblclick(o,record,item,index ,e);
			},
			beforeload:function(da, das){
				me.changedata=false;
				me.beforeload(da, das);
			},
			beforeedit:function(editor, e){
				me.editold = e.record.data[e.field];
				if(me.editold==null)me.editold='';
			},
			edit:function(editor, e){
				me.savecelledit(e);
			}
		};
		for(var as in this.listeners)deon[as]=this.listeners[as];
		this.on(deon);
		this.callParent();
	},
	savecelledit:function(e){
		var me = this;
		if(me.savebool || !me.celleditbool)return;
		var field = e.field,
			neval = e.record.data[field],
			data  = {fieldname:field,value:neval,id:e.record.data.id,oldvalue:me.editold};
		if(data.value == data.oldvalue)return;
		me.changfiledval(data, '保存');
	},
	changfiledval:function(cans, msg, backa, check){
		var me = this;
		if(me.savebool)return;
		var data = js.apply({tablename:me.tablename, id:''}, cans);
		if(data.id==''){
			return;
			//data.id = me.getSelectValue('id', check);
		}
		if(data.id==''){
			js.msg('msg','没有选择记录');
			return false;
		}
		js.msg('wait',''+msg+'中...');
		me.savebool = true;
		$.post(js.getajaxurl('publicsavecelledit','index',''),data,function(da){
			me.savebool = false;
			js.msg('success',''+msg+'成功');
			if(typeof(backa)=='function')backa(me, data);
		});
	},
	createstore:function(){
		var me		= this;
		var com,i,fields=[],
			a=this.columns;
		if(a){
			for(i=0;i<a.length;i++){
				if(a[i].dataIndex)fields.push(a[i].dataIndex);
				if(typeof(a[i].menuDisabled)=='undefined')me.columns[i].menuDisabled=true;
				me.columns[i].sortable = false;
			}
		}
		for(i=0;i<this.fields.length;i++)fields.push(this.fields[i]);
		var url = this.url;
		var params = {where:this.where,tablename_abc:this.tablename,fistwhere:me.fistwhere};
		Ext.apply(params, me.params);
		var storeopt= {
			fields:fields,
			root:{name: '根',expanded: true,id:'root'},
			proxy: {
				type: 'ajax',
				url:url,
				actionMethods:{read : 'POST'},
				extraParams:params
			}
		};
		for(var a in this.storeconfig)storeopt[a]=this.storeconfig[a];
		var store	= Ext.create('Ext.data.TreeStore', storeopt);
		store.on({
			beforeload:this.storebeforeload,
			load:function(da,record){
				if(me.path!='')me.selectPath(me.path);
				me.load(da,record);
			}
		});
		return store;
	},
	setparams:function(can, bo){
		Ext.apply(this.store.proxy.extraParams, can);
		if(bo)this.storereload();
	},
	del:function(odel){
		var s='0',me=this;
		var sm = me.changerecord;
		s = sm.data.id;
		if(s=='0'){
			js.msg('msg','没有选择记录');
			return false;
		}
		if(!sm.isLeaf()){
			js.msg('msg','有下级选项不允许删除');
			return false;
		}
		Ext.MessageBox.confirm('系统提示', '确定要删除选中的记录吗？', function(a){
			if(a=='yes'){
				js.msg('wait','删除中...');
				odel.setDisabled(true);
				$.post(js.getajaxurl('publicdel','index',''),{table:me.tablename,id:s}, function(da){
					if(da=='success'){
						js.msg('success','删除成功');
						me.storereload();
					}else{
						js.msg('msg',da);
					}
				});
			}
		});
	}
});