<?php
class finccbxflowClass extends flowChajian
{
	
	protected function contentother()
	{
		$headstr = 'address,发送地点@items,所属项目@startdt,发生日期@moneys,金额@explain,说明';
		$rows    = m('fininfos')->getall("`mid`='$this->id' order by `sort`");
		$arr[] = array(
			'fields' 		=> 'hdhhd',
			'fields_style' 	=> '',
			'name' => '报销明细',
			'data' => c('html')->createrows($rows, $headstr),
		);
		return $arr;
	}
	
	protected function flowfields($arr)
	{
		$arr['purpose'] = '出差目的';
		$arr['purresult'] = '出差成果';
		return $arr;
	}
}