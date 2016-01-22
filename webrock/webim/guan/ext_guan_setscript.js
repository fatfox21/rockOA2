var panel={
	xtype:'panel',border:false,padding:50,items:{
		width:400,
		url:js.getajaxurl('setsave',mode,dir),
		labelWidth:100,autoScroll:false,
		xtype:'rockform',border:false,items:[{
			name:'ipPost',fieldLabel:'服务器IP'
		},{
			name:'portPost',fieldLabel:'端口号'
		}],
		buttonsitems:[{text:'测试发送',handler:function(){testsend()}}]
	}	
}
function ainit(){
	var url = js.getajaxurl('getset',mode,dir);
	var form= objpanel.down('rockform');
	form.setmsg('读取中...', '#ff6600');
	$.get(url, function(da){
		form.setmsg('');
		var a = js.decode(da);
		form.setVal('ip', a.ip);
		form.setVal('port', a.port);
	});
};
function testsend(){
	js.msg('wait','发送中...');
	var url = js.getajaxurl('testsend',mode,dir);
	$.get(url,function(da){
		js.msg('success','发送完成');
	});
}
return {
	panel:panel,
	init:function(){
		ainit();
	}
};