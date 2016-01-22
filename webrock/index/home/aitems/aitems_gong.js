homeitems.gong = {
	xtype:'rockgrid',title:'信息公告<span id="inforweidutotal" class=red></span>',bbarbool:false,tablename:'infor',defaultorder:'xu,optdt desc',frame:true,padding:0,border:false,url:publicstore('infor','system'),storeafteraction:'inforgong',storebeforeaction:'beforeinforgong',
	storefields:'title,id,typename,istt,optdt',pageSize:6,tools:tools,closable:false,abcurl:'system,infor,gong',abcnum:'gong',
	margin:margin,fields:['xuhao','optdt','days','wd'],tabstitle:'信息公告',
	columns:[{
		text:'',dataIndex:'xuhao',width: 35
	},{
		text:'类型',dataIndex:'typename',width:80,renderer:function(v, m, r){
			var jg = r.get('days');
			if(jg<5)v='<b>'+v+'</b>';
			if(r.get('wd')==0)v='<span class="hui">'+v+'</span>';
			return v;
		}
	},{
		text:'标题',flex:1,dataIndex:'title',align:'left',renderer:function(v, m, r){
			var jg = r.get('days');
			if(jg<5){
				v='<b>'+v+'</b> <img src="images/new.gif">';
			}	
			v+=' <font color=#555555>['+r.get('optdt').substr(0,10)+']</font>';
			if(r.get('wd')==0)v='<span class="hui">'+v+'</span>';
			return v;
		}
	}],
	dblclick:function(o, r){
		var url = js.getajaxurl('$gong','view','taskrun',{uid:adminid,id:r.data.id,jmbool:true});
		js.open(url, 800);
	},
	load:function(){
		var to = this.getData('wdtotal');
		var s1='';
		if(to>0){
			s1 = '('+to+')';
		}	
		$('#inforweidutotal').html(s1);
	}
}