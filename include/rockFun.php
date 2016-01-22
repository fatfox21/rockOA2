<?php
/**
	*****************************************************************
	* 联系QQ：290802026/1073744729									*
	* QQ  群：429403774，提供技术交流等								*
	* 版  本：V2.2.0												*
	* 开发者：RockOA研发中心/雨中磐石工作室							*
	* 邮  箱：qqqq2900@126.com										*
	* 网  址：http://www.rockoa.com/								*
	* 说  明: 核心代码不要修改哦									*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正				*
	* 修改时: 2015-12-15 21:16:20									*	
	*****************************************************************
*/
 $GLOBALS['rockModelImport']= array();function m($name){$cls= NULL;if(isset($GLOBALS['rockModelImport'][$name])){$cls= $GLOBALS['rockModelImport'][$name];}else{$class= ''.$name.'ClassModel';$path= ''.ROOT_PATH.'/'.PROJECT.'/model/'.$name.'Model.php';if(file_exists($path)){include_once($path);$cls= new $class($name);}else{$cls= new sModel($name);}$GLOBALS['rockModelImport'][$name]= $cls;}return $cls;}function c($name, $inbo=true, $param1='', $param2=''){$class= ''.$name.'Chajian';$path= ''.ROOT_PATH.'/include/chajian/'.$class.'.php';$cls= NULL;if(file_exists($path)){include_once($path);if($inbo)$cls= new $class($param1, $param2);}return $cls;}function import($name, $inbo=true){$class= ''.$name.'Class';$path= ''.ROOT_PATH.'/include/class/'.$class.'.php';$cls= NULL;if(file_exists($path)){include_once($path);if($inbo){$cls= new $class();}}return $cls;}function getconfig($key){$a = array();if(isset($GLOBALS['config']))$a = $GLOBALS['config'];$s = '';if(isset($a[$key]))$s = $a[$key];return $s;}