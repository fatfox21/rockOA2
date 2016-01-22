<?php
class deptClassModel extends Model
{
	
	public function getdept($pid, $type)
	{
		$sql	= $this->rock->strformat('select `id`,`name` from `?0` where `pid`=?1 order by `sort`', '[Q]dept', $pid);
		$arr	= $this->db->getall($sql);
		$rows	= array();
		foreach($arr as $k=>$rs){
			$children		= $this->getdept($rs['id'], $type);
			$uchek			= $this->rock->contain($type, 'check');
			if($this->contain($type, 'user')){
				$sql	= $this->rock->strformat('select `id`,`name`,`gender`,`ranking`,`deptname`,`face`,`imonline` from `?0` where `deptid`=?1 and `status`=1 and `state`<>5 order by `sort`', '[Q]admin', $rs['id']);			
				$usarr	= $this->db->getall($sql);
				foreach($usarr as $k1=>$urs){
					$usarr[$k1]['leaf'] = true;
					$usarr[$k1]['uid']  = $urs['id'];
					$usarr[$k1]['id']   = 'u'.$urs['id'];
					$usarr[$k1]['type'] = 'u';
					$usarr[$k1]['icon'] = 'mode/icons/user.png';
					if($urs['gender']=='女')$usarr[$k1]['icon'] = 'mode/icons/user_female.png';
					$usarr[$k1]['face'] = $this->rock->repempt($urs['face'], 'images/im/user1.jpg');
					if($uchek)$usarr[$k1]['checked']=false;
				}
				$children= array_merge($children, $usarr);
			}
			if($this->rock->contain($type, 'dept')){
				if($uchek)$ars['checked']=false;
			}
			$ars['children']=$children;
			$ars['name'] 	= $rs['name'];
			$ars['id'] 		= 'd'.$rs['id'];
			$ars['did'] 	= $rs['id'];
			$ars['type'] 	= 'd';
			$rows[]			= $ars;
		}
		return $rows;
	}
}