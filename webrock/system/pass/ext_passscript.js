function changesave(o)
{
	var opass	= o.field('passoldPost').getValue();
	var pass	= o.field('passwordPost').getValue();
	var pass1	= o.field('password1Post').getValue();

	if(opass==''){
		return '旧密码不能为空';
	}
	if(pass.length <4){
		return '新密码不能少于4个字符';
	}
	if(!/[a-zA-Z]{1,}/.test(pass) || !/[0-9]{1,}/.test(pass)){
		return '新密码必须使用字母+数字';
	}

	if(opass==pass){
		return '新密码不能和旧密码相同';
	}
	
	if(pass!=pass1){
		return '确认密码不一致';
	}
	return '';
}
var panel={
	xtype:'panel',border:false,padding:50,items:{
		width:400,defaultPadding:10,submittext:'修改',
		url:js.getajaxurl('save','pass','system'),
		xtype:'rockform',border:false,items:[{
			fieldLabel:''+bitian+'旧密码',xtype:'textfield',labelAlign:'right',name:'passoldPost',allowBlank: false,inputType:'password'
		},{
			fieldLabel:''+bitian+'新密码',xtype:'textfield',labelAlign:'right',allowBlank: false,name:'passwordPost',inputType:'password'
		},{
			fieldLabel:''+bitian+'确认密码',xtype:'textfield',labelAlign:'right',allowBlank: false,name:'password1Post',inputType:'password'
		}],
		submitcheck:function(o, f){
			return changesave(o);
		}
	}
}
return {
	panel:panel
};