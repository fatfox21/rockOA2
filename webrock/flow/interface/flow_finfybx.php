<?php
class finfybxflowClass extends flowChajian
{
	
	protected function contentother()
	{
		$headstr = 'items,所属项目@startdt,发生日期@moneys,金额@explain,说明';
		$rows    = m('fininfos')->getall("`mid`='$this->id' order by `sort`");
		$arr[] = array(
			'fields' 		=> 'bxmx',
			'fields_style' 	=> '',
			'name' 			=> '报销明细',
			'data' 			=> c('html')->createrows($rows, $headstr),
		);
		return $arr;
	}
	
	protected function flowfields($arr)
	{
		unset($arr['purpose']);
		unset($arr['purresult']);
		return $arr;
	}
}