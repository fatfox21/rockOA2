var opt = Ext.create('Ext.rock.option');

var panel = opt.setlist('信息类型','infortype',{},'back');
panel	  = js.apply(panel, {border:true})

return {
	panel:panel,
	init:function(){
		opt.initshow();
	}
};