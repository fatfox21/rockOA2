<?php 
/**
	smarty 自定义是函数库
*/



//smarty自定义插件，显示图片
function smarty_function_showimg($img){
	$path	= $img['path'];
	$w		= isset($img['w']) 		? $img['w'] : 0;
	$h		= isset($img['h']) 		? $img['h'] : 0;
	$attr	= isset($img['attr']) 	? $img['attr'] : '';
	$arr 	= $GLOBALS['rock']->imgwh($path,$w,$h);
	$s		= '<img '.$attr.' src="'.$path.'"';
	if(!$GLOBALS['rock']->contain($path,'http:'))$s.=' width="'.$arr[0].'" height="'.$arr[1].'"';
	$s.='>';
	echo $s;
}

//伪静态袋子
function smarty_function_url($url){
	$m	= isset($url['m']) ? $url['m'] : 'index';
	$a	= isset($url['a']) ? $url['a'] : '';
	$s	= isset($url['s']) ? $url['s'] : '';
	echo $GLOBALS['rock']->rewrite($m,$a,$s);
}