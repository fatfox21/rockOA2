var panel={
	xtype:'calendarpanel',textvalign:'top',
	showType:'data',
	changemonth:function(o,y,m){
		getcmp('month_'+rand+'').setValue(''+y+'-'+m+'');
		this._getnr(y,m);
	},
	_getnr:function(y,m){
		var me  = this;
		var url = js.getajaxurl('getmeet', mode, dir, {year:y,month:m});
		$.get(url, function(da){
			var ad = js.decode(da);
			for(var oi in ad){
				me.getdayObj(oi).html(ad[oi]);
			}
		});
	},
	bbar:[{
		xtype:'rockdate',format:'month',emptyText:'月份',width:80,id:'month_'+rand+'',change:function(a){
			
		}
	}]
};
return {
	panel:panel
};