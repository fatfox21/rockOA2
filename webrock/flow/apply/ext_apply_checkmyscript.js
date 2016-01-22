var grid,atype = params.atype;
if(!atype)atype=0;
function opentablss(a, gsid){
	if(isempt(a.modenum)){
		js.msg('msg','记录不存在了');
		return;
	}
	addtabs('[查看]'+a.modename,'flow,apply,'+a.modenum+',flownum='+a.modenum+',tablename='+a.table+',opentype=0,mid='+a.mid+',gridid='+gsid+'', ''+a.modenum+'_'+a.mid+'',{menutype:'cy'});
};

var panel = [{
	width:180,split:true,region:'west',xtype:'treepanel',hideHeaders:true,title:'模块列表',collapsible:true,
	id:'treemode_'+rand+'',useArrows:false,
	columns:[{
		text:'',dataIndex:'name',flex:1,xtype: 'treecolumn'
	}],
	rootVisible:false,rowLines:false,
	store:{
		fields:['id','name','table','num'],
		root:{expanded: true,children: []}
	},
	listeners:{
		itemclick:function(a,node){
			var sid = node.data.id;
			if(sid)grid.setparams({modeid:sid}, true);
		}
	}
},{
	xtype:'rockgrid',tablename:'flow_bill',searchtools:true,defaultorder:'optdt desc',paramsbase:{protype:atype},
	url:publicstore(mode,dir),storeafteraction:'checkmychange',storebeforeaction:'checkmybefore',
	fields:['uid','status','nstatus','optid'],
	tbar:['->',{
		text:'打印',icon:gicons('printer'),disabled:true,itemId:'print',handler:function(){
			var a = this.up('grid')._openurl('print');
		}
	},'-',{
		text:'新窗口打开',icon:gicons('application'),disabled:true,itemId:'new',handler:function(){
			var a = this.up('grid')._openurl('view');
		}
	}],
	_qiehuanzt:function(oi){
		if(this.loadbool)return;
		atype = oi;
		this.setparams({protype:oi}, true);
	},
	outsearch:function(){
		//this.setparams({modeid:});
		return '';
	},
	_openurl:function(lx){
		var a = this.changedata;
		if(isempt(a.modenum)){
			js.msg('msg','记录不存在了');
			return;
		}
		mopenview(a.modenum,a.mid,this.getId(),lx);
	},
	_btuons:function(bo, d){
		this.down('#new').setDisabled(bo);
		this.down('#print').setDisabled(bo);
		this.down('#zj').setDisabled(true);
		this.down('#cb').setDisabled(true);
		this.down('#del').setDisabled(true);
		if(!bo&& (d.uid==adminid || d.optid==adminid) && d.status!=1){
			if(d.status!=1)this.down('#zj').setDisabled(bo);
			if(d.status==0)this.down('#cb').setDisabled(bo);
			if(d.nstatus!=1)this.down('#del').setDisabled(bo);
		}
	},
	click:function(d1, d){
		this._btuons(false, d.data);
	},
	dblclick:function(){
		this._openurl('view');
	},
	beforeload:function(){
		this._btuons(true);
	},
	bbaritems:['->',{
		text:'追加说明',icon:gicons('edit'),tooltip:'单据未处理完成都可以追加说明，上传相关文件等',disabled:true,itemId:'zj',handler:function(){this.up('grid')._zhuijia()},hidden:atype!=0
	},{
		text:'催办',icon:gicons('sound'),disabled:true,itemId:'cb',handler:function(){this.up('grid')._cuiban()},hidden:true
	},{
		text:'删除',icon:gicons('delete'),disabled:true,itemId:'del',handler:function(){this.up('grid')._delback()},hidden:atype!=0
	}],
	_zhuijia:function(){
		var me = this;
		if(!me.changedata.id)return;
		var tits = '['+this.changedata.modename+','+this.changedata.sericnum+']追加说明';
		if(!me._aawin){
			var cans = winopt({title:tits,width:500,icon:gicons('edit'),items:{
				border:false,tablename:'flow_log',submittext:'确定',url:js.getajaxurl('flowzhuijia','flow',''),
				xtype:'rockform',autoScroll:false,cancelbool:true,submitfields:'explain',
				items:[{
					fieldLabel:'id号',value:'0',name:'idPost',hidden:true
				},{
					fieldLabel:'',value:'',name:'flownumPost',hidden:true
				},{
					fieldLabel:''+bitian+'追加说明',name:'explainPost',allowBlank: false,xtype:'textareafield',height:60
				},uploadwindows.fields()],
				success:function(){
					me._aawin.close();
					js.msg('success','追加成功');
				}
			}});
			me._aawin = Ext.create('Ext.Window',cans);
			me.destroypanel.push(me._aawin);
		}
		me._aawin.show();
		var form = me._aawin.child('rockform');
		form.reset();
		form.setVal('id', me.changedata.mid);
		form.setVal('flownum', me.changedata.modenum);
		form.getField('fileid').clearData();
		me._aawin.setTitle(tits);
	},
	_cuiban:function(){
	},
	_delback:function(){
		var me = this;
		Ext.MessageBox.prompt('系统提示', ''+bitian+'请输入删除的原因:',function(a,b){
			if(a=='ok' && b){
				js.msg('wait','删除中...');
				$.post(js.getajaxurl('flowdel','flow',''),{flownum:me.changedata.modenum,id:me.changedata.mid,sm:b}, function(da){
					if(da=='success'){
						js.msg('success','删除成功');
						me.storereload();
					}else{
						js.msg('msg', da);
					}
				});
			}
		});
	},
	load:function(){
		if(this.loadcount>1)return;
		var a = this.getData('modearr');
		getcmp('treemode_'+rand+'').getStore().setRootNode(a);
	},
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'模块',width:110,dataIndex:'modename',search:false,sortable:true,qz:'a.',autowidth:true
	},{
		text:'单号',width:100,dataIndex:'sericnum',search:true,sortable:true,autowidth:true,qz:'a.'
	},{
		text:'部门',width:100,dataIndex:'deptname',sortable:false,autowidth:true,search:true,qz:'b.'
	},{
		text:'姓名',width:80,dataIndex:'name',sortable:false,search:true,qz:'b.'
	},{
		text:'申请日期',width:90,dataIndex:'applydt',sortable:true,atype:'date',search:true,qz:'a.'
	},{
		text:'状态',width:150,dataIndex:'statustext',autowidth:true
	},{
		text:'提交人',width:80,dataIndex:'optname',sortable:true,search:true,qz:'a.'
	},{
		text:'摘要',flex:1,dataIndex:'summary',sortable:false,renderer:rendercont,align:'left'
	},{
		xtype:'actioncolumn',
		width:60,text:'查看',
		items: [{
			icon: gicons('page_go'),tooltip: '打开详情',
			handler: function(gridv, rowIndex, colIndex) {
				var rec = gridv.getStore().getAt(rowIndex);
				opentablss(rec.raw, grid.getId());
			}
		}]
	}]
}];
return {
	panel:panel,
	init:function(){
		grid = objpanel.down('rockgrid');
	},
	tabson:{
		show:function(){
			grid.isReload();
		}
	}
};