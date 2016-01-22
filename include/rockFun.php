<?php 
/**
	*****************************************************************
	* 联系QQ： 290802026/1073744729									*
	* 版  本： V2.0													*
	* 开发者：雨中磐石工作室										*
	* 邮  箱： qqqq2900@126.com										*
	* 网  址： http://www.xh829.com/								*
	* 说  明: 定义常用的方法										*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正			*
	*****************************************************************
*/



/**
	m 读取数据模型，操作数据库的
	$name 表名
*/
$GLOBALS['rockModelImport']	= array();
function m($name)
{
	$cls			= NULL;
	if(isset($GLOBALS['rockModelImport'][$name])){
		$cls		= $GLOBALS['rockModelImport'][$name];
	}else{
		$class		= ''.$name.'ClassModel';
		$path		= ''.ROOT_PATH.'/'.PROJECT.'/model/'.$name.'Model.php';
		if(file_exists($path)){
			include_once($path);
			$cls	= new $class($name);
		}else{
			$cls	= new sModel($name);
		}
		$GLOBALS['rockModelImport'][$name]	= $cls;
	}
	return $cls;
}

/**
	引入插件
	$name 插件名称
	$inbo 是否初始化
	$param1,2,参数 
*/
function c($name, $inbo=true, $param1='', $param2='')
{
	$class	= ''.$name.'Chajian';
	$path	= ''.ROOT_PATH.'/include/chajian/'.$class.'.php';
	$cls	= NULL;
	if(file_exists($path)){
		include_once($path);
		if($inbo)$cls	= new $class($param1, $param2);
	}
	return $cls;	
}

/**
	引入class文件
*/
function import($name, $inbo=true)
{
	$class	= ''.$name.'Class';
	$path	= ''.ROOT_PATH.'/include/class/'.$class.'.php';
	$cls	= NULL;
	if(file_exists($path)){
		include_once($path);
		if($inbo){
			$cls	= new $class();
		}
	}
	return $cls;
}