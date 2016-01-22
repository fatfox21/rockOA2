var panel={
	xtype:'panel',border:false,padding:50,items:{
		width:400,
		url:js.getajaxurl('setsave',mode,dir),
		xtype:'rockform',border:false,items:[{
			xtype: 'fieldcontainer',defaultType: 'textfield',layout:'hbox',items:[{
				xtype:'displayfield',value:'&nbsp;可写/修改&nbsp;',hideLabel:true
			},{
				hideLabel:true,name:'valuePost',allowBlank: false,width:60,xtype:'numberfield',value:3,minValue:1
			},{
				hideLabel:true,name:'typePost',allowBlank: false,width:80,xtype:'combo',value:'d',editable:false,store:js.arraystr('d|天,w|工作日')
			},{
				xtype:'displayfield',value:'&nbsp;内的日报(含当天)&nbsp;',hideLabel:true
			}]
		}]
	}
}
function ainit(){
	var url = js.getajaxurl('getset',mode,dir);
	var form= objpanel.down('rockform');
	form.setmsg('读取中...', '#ff6600');
	$.get(url, function(da){
		form.setmsg('');
		var a = js.decode(da);
		if(a.set){
			var a1 = a.set.split(',');
			form.setVal('value', a1[0]);
			form.setVal('type', a1[1]);
		}
	});
}
return {
	panel:panel,
	init:function(){
		ainit();
	}
};