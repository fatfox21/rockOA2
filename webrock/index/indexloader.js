var mainjsarr = [
	'ext4.2/ext-all.js',
	'ext4.2/ext-lang-zh_CN.js',
	'js/base64-min.js',
	'webrock/index/indexscript.js',
	'webrock/index/indexpublic.js',
	'mode/My97DatePicker/WdatePicker.js',
	'webrock/extjs/rock/base.js',
	'webrock/extjs/rock/option.js',
	'webrock/extjs/rock/rate.js',
	'webrock/extjs/rock/tree.js',
	'webrock/extjs/rock/form.js?rand='+Math.random()+'',
	'webrock/extjs/rock/grid.js?rand='+Math.random()+'',
	'webrock/extjs/rock/flow.js',
	'webrock/extjs/rock/where.js',
	'webrock/extjs/rock/flowgrid.js',
	'webrock/extjs/rock/upload.js',
	'webrock/extjs/rock/flowform.js',
	'webrock/extjs/rock/gridform.js',
	'webrock/extjs/ux/TabCloseMenu.js',
	'webrock/extjs/ux/form/DateTime.js',
	'webrock/extjs/ux/CheckCombo.js',
	'webrock/extjs/ux/form/MultiSelect.js',
	'webrock/extjs/ux/form/ItemSelector.js',
	'webrock/extjs/ux/calendar.js'
];
var loadercishu = 0;
function initbody(){
	var  s = '<div id="loadtshoale_show" style="padding:20px;border:1px #cccccc solid;position:absolute;left:40%;top:40%;font-size:14px"><img height="32" width="32" src="images/mloading.gif" align="absmiddle">&nbsp; 拼命载入中[<a href="javascript:" style="color:blue;" onclick="return loadscript(loadercishu)"><u>不动了?重试</u></a>](<span id="jinduload">0%</span>)...</div>';
	$('body').append(s);
	loadscript(0);
}
function loadscript(oi){
	var len = mainjsarr.length;
	loadercishu = oi;
	if(oi>=len){
		$('#loadtshoale_show').remove();
		Ext.onReady(createindex);
		return false; 
	}
	var src = mainjsarr[oi];
	var soi = oi+1;
	$('#jinduload').html(''+js.float(soi/len*100)+'%');
	var scr = document.createElement('script');
	scr.src = src;
	if(isIE){
		scr.onreadystatechange = function(){
			if(this.readyState=='loaded' || this.readyState=='complete'){
				loadscript(oi+1);
			}
		}
	}else{
		scr.onload = function(){
			loadscript(oi+1);
		}
	}
	document.getElementsByTagName("head")[0].appendChild(scr);
	return false;
}