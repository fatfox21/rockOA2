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
	storeconfig:{groupField: 'temp_atype'},fields:['temp_atype','url'],
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
	tbar:['->',{
		text:'选中标识已读',itemId:'biao',handler:function(){
			this.up('rockgrid').changfiledval({fieldname:'status',value:1}, '标识', function(a){a.storereload()}, true);
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
		var url = v.data.url;
		if(!isempt(url))js.open(url, 800);
	}
};

return {
	panel:panel
};
