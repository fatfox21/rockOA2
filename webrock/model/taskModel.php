<?php
class taskClassModel extends Model
{
	public function sendtodo($str='', $str1='')
	{
		if($str1=='')$str1 = $str;
		if($str1=='')return;
		$id 	= (int)$this->rock->get('mid');
		$sql 	= "select a.`zntx`,a.`emtx`,b.`receid`,b.`chaoid`,a.`name` from `[Q]task` a left join `[Q]taskuser` b on a.`confuid`=b.`id` where a.`id`='$id' and b.`id` is not null ";
		$rows 	= $this->db->getall($sql);
		foreach($rows as $k=>$rs){
			if($rs['zntx']==1){
				m('todo')->add($rs['receid'], $rs['name'], $str);
			}
		}
	}
}