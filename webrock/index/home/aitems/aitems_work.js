homeitems.work = {
	xtype:'rockgrid',title:'今日['+js.now('Y-m-d 周W')+']事项/任务',margin:margin,tools:tools,bbarbool:false,closable:false,tablename:'work',frame: true,padding:0,border:false,url:js.getajaxurl('gettoday','workh|work','work'),abcnum:'worklist',abcurl:'work,work,list,atype=0',pageSize:30,icon:gicons('pencil'),fields:['state','startdt'],
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'类型',dataIndex:'type',width:80
	},{
		text:'标题',flex:1,dataIndex:'title',align:'left'
	},{
		text:'状态',dataIndex:'state',width:60,autowidth:true
	},{
		text:'时间',dataIndex:'startdt',width:150,autowidth:true
	}],
	dblclick:function(a, v){
		var d = v.raw;
		if(d.tabsurl && d.tabstitle && d.tabsnum){
			addtabs(d.tabstitle, d.tabsurl, d.tabsnum);
		}else{
			if(!isempt(d.url))js.open(d.url, 800);
		}
	}
};