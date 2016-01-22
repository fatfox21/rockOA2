var c = {
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	border:false,
	items:[{
		flex:1,layout:'fit',title:'输入加密字符串',xtype:'panel',
		tbar:[{
			text:'加密',icon:gicons('lock'),handler:function(){c._jm()}
		},'-',{
			text:'复制',icon:gicons('page_white_paste')
		}],
		items:{
			xtype:'textareafield',id:'text_'+rand+''
		},
		margins: '0 5 0 0'
	},{
		flex:1,title:'输入解密字符串',layout:'fit',xtype:'panel',
		tbar:[{
			text:'解密',icon:gicons('lock_open'),handler:function(){c._am()}
		},'-',{
			text:'复制',icon:gicons('page_white_paste')
		}],
		items:{
			xtype:'textareafield',id:'text1_'+rand+''
		}
	}],
	
	_jm:function(){
		var s = getcmp('text_'+rand+'').getValue();
		getcmp('text1_'+rand+'').setValue(jm.encrypt(s));
	},
	_am:function(){
		var s = getcmp('text1_'+rand+'').getValue();
		getcmp('text_'+rand+'').setValue(jm.uncrypt(s));
	}
};

return {
	panel:c
};