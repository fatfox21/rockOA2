var huirendhi =function(v,a,r){
	if(a.column.dataIndex=='mess')a.tdAttr = 'data-qtip="'+v+'"';
	if(a.column.dataIndex=='status'){
		var ss = ''+v+'';
		v = '<font color="red">未读</font>';
		if(ss=='1')v='<font color="#888888">已读</font>';
	}
	if(r.raw.status=='1')return '<font color=#888888>'+v+'</font>';
	return v;
}

var panel = {
	xtype:'rockgrid',tablename:'todo',keywhere:'and uid='+adminid+'',checkcolumns:true,
	defaultorder:'`status`,id desc',searchtools:true,celleditbool:true,url:publicstore(mode,dir),
	storeafteraction:'jisanstatela',
	storeconfig:{groupField: 'temp_atype'},fields:['temp_atype','table','mid'],
	features: [{ftype:'grouping',groupHeaderTpl: '日期: {name} ({rows.length}条)'}],
	columns:[{
		xtype: 'rownumberer',
		width: 40
	},{
		text:'类型',dataIndex:'title',autowidth:true,renderer:huirendhi,search:true
	},{
		text:'内容',dataIndex:'mess',flex:1,align:'left',renderer:huirendhi,search:true
	},{
		text:'时间',dataIndex:'optdt',autowidth:true,renderer:huirendhi,search:true,atype:'date'
	},{
		text:'状态',dataIndex:'status',width:80,renderer:huirendhi,search:true,atype:'select',editor:{xtype:'combo',store:[['0','未读'],['1','已读']],editable:false}
	}],
	_byidula:function(){
		var sid = this.getSelectValue('id', true);
		if(sid==''){
			js('msg','没有选中行');
			return;
		}
		var me = this;
		$.post(js.getajaxurl('byidu','todo','person'),{sid:sid}, function(){
			me.storereload();
		});
	},
	tbar:['->',{
		text:'选中标识已读',itemId:'biao',handler:function(){
			this.up('rockgrid')._byidula();
		}
	},'-',{
		text:'删除',icon:gicons('delete'),itemId:'del',handler:function(){
			this.up('rockgrid').del(false, true);
		}
	}],
	load:function(){
		$('#tixing_count').html('('+this.getData('wdcount')+')');
	},
	dblclick:function(a, v){
		var a = v.data;
		if(a.status==0)$.post(js.getajaxurl('byidu','todo','person'),{sid:a.id});
		if(a.table)mopenview('@'+a.table,a.mid);
	}
};

return {
	panel:panel
};
