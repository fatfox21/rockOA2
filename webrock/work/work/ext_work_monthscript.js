var month,year,enddt;

function readlist(){
	getcmp('msg_'+rand+'').setText(js.getmsg('读取中...','blue'));
	var url = js.getajaxurl('getmontlist', mode, dir, {enddt:enddt,uid:adminid,startdt:''+year+'-'+month+'-01'});
	$.get(url, function(da){
		getcmp('msg_'+rand+'').setText('');
		getnrshow(js.decode(da));
	});
}
function getnrshow(a){
	var i,o1,s,s1='';
	for(i in a){
		o1 = $('#day_'+rand+'_'+i+'');
		s  = '';
		o1.html(a[i].str);
	}
}

var panel={
	xtype:'calendarpanel',textvalign:'top',
	renderer:function(tad, ars, y, m){
		var s= '<div style="line-height:20px;text-align:left">&nbsp;'+ars.d+' <span style="font-size:11px;color:'+ars.color+'">'+ars.jieri+'</span> </div>';
		s+='<div style="font-size:12px;padding-left:3px" align="left" id="day_'+rand+'_'+ars.d+'"></div>';
		enddt = ''+y+'-'+m+'-'+xy10(ars.d)+'';
		return s;
	},
	changemonth:function(o,y,m){
		month = m;
		year  = y;
		getcmp('month_'+rand+'').setValue(''+y+'-'+m+'');
		readlist();
	},
	bbar:[{
		xtype:'rockdate',format:'month',emptyText:'月份',width:80,id:'month_'+rand+'',change:function(a){
			rock[index].setMonth(a);
		}
	},{
		xtype:'tbtext',id:'msg_'+rand+''
	}]
};
return {
	panel:panel
};