var huirendhi =function(v,a,r){
	if(a.column.dataIndex=='mess')a.tdAttr = 'data-qtip="'+v+'"';
	if(r.raw.status=='1')return '<font color=#888888>'+v+'</font>';
	return v;
}

homeitems.todo = {
	xtype:'rockgrid',title:'提醒信息',tablename:'todo',keywhere:'and uid='+adminid+'',pageSize:5,tools:tools,margin:margin,frame: true,padding:0,border:false,
	bbarbool:false,defaultorder:'`status`,id desc',url:publicstore('todo','person'),closable:false,abcnum:'todo',abcurl:'person,todo',
	storeafteraction:'jisanstatela',fields:['xuhao','optdt','status','table','mid'],
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'类型',dataIndex:'title',width:80,renderer:huirendhi,autowidth:true
	},{
		text:'内容',dataIndex:'mess',flex:1,align:'left',renderer:huirendhi
	},{
		text:'时间',dataIndex:'optdt',autowidth:true,renderer:huirendhi
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