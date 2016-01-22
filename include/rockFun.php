<?php
/**
	*****************************************************************
	* 联系QQ：290802026/1073744729									*
	* QQ  群：429403774，提供技术交流等								*
	* 版  本：V2.2.4												*
	* 开发者：RockOA研发中心/雨中磐石工作室							*
	* 邮  箱：admin@rockoa.com										*
	* 网  址：http://www.rockoa.com/								*
	* 说  明: 核心代码不要修改哦									*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正				*
	* 修改时: 2016-01-21 23:42:37									*	
	*****************************************************************
*/
 $GLOBALS['rockModelImport']= array();function m($name){$cls= NULL;$pats= '';if(isset($GLOBALS['rockModelImport'][$name])){$cls= $GLOBALS['rockModelImport'][$name];}else{$nas= $name;$asq= explode(':', $nas);if(count($asq)>1){$nas= $asq[1];$pats= $asq[0].'/';$_pats= ''.ROOT_PATH.'/'.PROJECT.'/model/'.$asq[0].'/'.$asq[0].'.php';if(file_exists($_pats))include_once($_pats);}$class= ''.$nas.'ClassModel';$path= ''.ROOT_PATH.'/'.PROJECT.'/model/'.$pats.''.$nas.'Model.php';if(file_exists($path)){include_once($path);$cls= new $class($nas);}else{$cls= new sModel($nas);}$GLOBALS['rockModelImport'][$name]= $cls;}return $cls;}function c($name, $inbo=true, $param1='', $param2=''){$class= ''.$name.'Chajian';$path= ''.ROOT_PATH.'/include/chajian/'.$class.'.php';$cls= NULL;if(file_exists($path)){include_once($path);if($inbo)$cls= new $class($param1, $param2);}return $cls;}function import($name, $inbo=true){$class= ''.$name.'Class';$path= ''.ROOT_PATH.'/include/class/'.$class.'.php';$cls= NULL;if(file_exists($path)){include_once($path);if($inbo){$cls= new $class();}}return $cls;}function getconfig($key){$a = array();if(isset($GLOBALS['config']))$a = $GLOBALS['config'];$s = '';if(isset($a[$key]))$s = $a[$key];return $s;}