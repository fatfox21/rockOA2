var uid = params.uid,enddt,month,year,
	demonth = params.month;
if(isempt(uid))uid = adminid;
if(isempt(demonth))demonth = js.now('Y-m');

function getnr(y,m){
	var url = js.getajaxurl('getdaily', 'daily', 'person', {uid:uid,month:''+year+'-'+month+''});
	$.get(url, function(da){
		//alert(da);return;
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
	getcmp('jbmsg_'+rand+'').setText(a[99]);
	js.msg();
}

function fenxila(){
	js.msg('wait','统计中...');
	getnr(year, month );
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
		xtype:'rockdate',format:'month',emptyText:'月份',maxDate:demonth,width:80,id:'month_'+rand+'',change:function(a){
			rock[index].setMonth(a);
		}
	},'-',{
		text:'重新统计',icon:gicons('reload'),handler:function(){
			fenxila();
		}
	},'-',{
		xtype:'tbtext',id:'jbmsg_'+rand+''
	}]
};
return {
	panel:panel
};