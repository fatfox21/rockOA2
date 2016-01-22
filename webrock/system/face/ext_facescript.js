cropwidth = 100;
cropheight= 100;
showface = function(img)
{
	var face	= img.replace(/\.\.\//gi, '');
	getcmp('face_'+rand+'').setValue(face);
	get('faceimg').src=face;
}

var noface = 'images/noface.jpg';

function changesave()
{
	var face = getcmp('face_'+rand+'').getValue();
	js.msg('wait','保存中...');
	$.post(js.getajaxurl('save', mode, dir),{facePost:face}, function(){
		js.msg('success','保存成功');
	});
	if(isempt(face))face = noface;
	get('myface').src=face;
	adminface=face;
}

var temp_adminface = ''+adminface;
if(temp_adminface==noface)temp_adminface = '';
var oldimg='',sou=temp_adminface;
if(sou.indexOf('crop')>0){
	oldimg='../../'+sou.substr(0,sou.lastIndexOf('_'))+'.'+sou.substr(sou.lastIndexOf('.')+1);
}else{
	if(sou!='')oldimg= '../../'+temp_adminface;
}
function clearface(){
	getcmp('face_'+rand+'').setValue('');
	get('faceimg').src=noface;
}

function yngyuantul(){
	showface(iframecrop.scr.path);
}

var panel={
	xtype:'panel',border:false,layout:'hbox',border:false,padding:40,items:[{
		padding:10,border:false,
		html:'<iframe width="500" height="350" frameborder="0" id="ifrautoface" name="iframecrop" scrolling="no" marginheight="0" marginwidth="0" src="mode/cropimg/crop.php?imgurl='+oldimg+'" ></iframe>'
	},{
		layout:'vbox',padding:10,border:false,
		items:[{
			html:'<img src="'+adminface+'" id="faceimg" width="100" height="100" style="border:1px #cccccc solid">',border:false
		},{
			xtype:'button',text:'保存',icon:gicons('disk'),margin:'10 0 0 0',padding:8,handler:changesave
		},{
			xtype:'button',text:'清除头像',icon:gicons('cross'),margin:'10 0 0 0',handler:clearface
		},{
			xtype:'button',text:'用原图',icon:gicons('photo'),margin:'10 0 0 0',handler:yngyuantul
		},{
			xtype:'textfield',id:'face_'+rand+'',value:temp_adminface,hidden:true
		}]
	}]
	
}
return {
	panel:panel
};