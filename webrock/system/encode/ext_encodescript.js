var c = {
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	border:false,
	items:[{
		flex:1,layout:'fit',title:'输入加密字符串',xtype:'panel',
		tbar:[{
			xtype:'textfield',width:230,emptyText:'您的randkey,26个字母',id:'keys_'+rand+''
		},'-',{
			text:'加密',icon:gicons('lock'),handler:function(){c._jm()}
		},'-',{
			text:'BASE加密',icon:gicons('lock'),handler:function(){c._bjm()}
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
			text:'BASE解密',icon:gicons('lock_open'),handler:function(){c._bam()}
		},{
			text:'复制',icon:gicons('page_white_paste'),hidden:true
		}],
		items:{
			xtype:'textareafield',id:'text1_'+rand+''
		}
	}],
	_bjm:function(){
		var s = getcmp('text_'+rand+'').getValue();
		getcmp('text1_'+rand+'').setValue(jm.base64encode(s));
	},
	_bam:function(){
		var s = getcmp('text1_'+rand+'').getValue();
		getcmp('text_'+rand+'').setValue(jm.base64decode(s));
	},
	_jm:function(){
		var s = getcmp('text_'+rand+'').getValue();
		var rk = getcmp('keys_'+rand+'').getValue();
		getcmp('text1_'+rand+'').setValue(jm.encrypt(s,rk));
	},
	_am:function(){
		var s = getcmp('text1_'+rand+'').getValue();
		var rk = getcmp('keys_'+rand+'').getValue();
		getcmp('text_'+rand+'').setValue(jm.uncrypt(s,rk));
	}
};

return {
	panel:c
};