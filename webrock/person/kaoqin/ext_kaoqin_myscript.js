var uid = params.uid,enddt,month,year,
	demonth = params.month;
if(isempt(uid))uid = adminid;
if(isempt(demonth))demonth = js.now('Y-m');

function getnr(y,m){
	var url = js.getajaxurl('getkaoqin', 'kaoqin', 'person', {uid:uid,year:y,month:m});
	$.get(url, function(da){
		getnrshow(js.decode(da));
	});
}
function getnrshow(a){
	var i,o1,s,s1='',b,b1;
	for(i in a){
		o1 = $('#day_'+rand+'_'+i+'');
		s  = '';
		o1.html(a[i].str);
	}
	b = a[99];
	for(b1 in b)s1+='、'+b1+':'+b[b1]+'次';
	if(s1!='')s1= '不统计休息日：'+s1.substr(1);
	if(s1.indexOf('function')>0)s1='';
	getcmp('jbmsg_'+rand+'').setText(s1);
	js.msg();
}

function fenxila(){
	js.msg('wait','分析中...');
	$.post(js.getajaxurl('fenxi','kaoqin','taskrun'),{uid:uid,startdt:''+year+'-'+month+'-01',enddt:enddt}, function(da){
		if(da=='success'){
			getnr(year, month );
		}else{
			js.msg('msg','分析失败');
		}
	});
}

var panel={
	xtype:'calendarpanel',textvalign:'top',defaultMonth:demonth,
	renderer:function(tad, ars, y, m){
		var s= '<div style="line-height:20px;text-align:left">&nbsp;'+ars.d+' <span style="font-size:11px;color:#888888">'+ars.jieri+'</span> </div>';
		s+='<div style="font-size:12px;padding-left:3px" align="left" id="day_'+rand+'_'+ars.d+'"></div>';
		enddt = ''+y+'-'+m+'-'+xy10(ars.d)+'';
		return s;
	},
	changemonth:function(o,y,m){
		month = m;
		year  = y;
		getcmp('month_'+rand+'').setValue(''+y+'-'+m+'');
		getnr(y,m);
	},
	bbar:[{
		xtype:'rockdate',format:'month',emptyText:'月份',width:80,id:'month_'+rand+'',change:function(a){
			rock[index].setMonth(a);
		}
	},'-',{
		text:'重新分析',handler:function(){
			fenxila();
		}
	},'-',{
		xtype:'tbtext',id:'jbmsg_'+rand+''
	}]
};
return {
	panel:panel
};