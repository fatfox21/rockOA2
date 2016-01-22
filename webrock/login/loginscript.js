var oldpass='';
function initbody(){
	form('adminuser').focus();
	oldpass	= form('adminpass').value;
	if(form('adminuser').value!=''){
		form('adminpass').focus();
	}
}
function loginsubmit(){
	if(js.bool)return false;
	var user = form('adminuser').value;
	var pass = form('adminpass').value;
	if(user==''){
		js.setmsg('帐号不能为空','red');
		form('adminuser').focus();
		return false;
	}
	if(pass==''){
		js.setmsg('密码不能为空','red');
		form('adminpass').focus();
		return false;
	}
	js.setmsg('登录中...','blue');
	form('button').disabled=true;
	var data	= js.getformdata();
	var url		= js.getajaxurl('check','login');
	data.jmpass	= 'false';
	if(oldpass==pass)data.jmpass= 'true';
	js.bool		= true;
	$.post(url,data,function(da){
		if(da=='success'){
			js.setmsg('登录成功,跳转中..','green');
			location.href='?m=index';
		}else{
			js.setmsg(da,'red');
			form('button').disabled=false;
			js.bool	= false;
		}
	});
}