<?php
class meetClassModel extends Model
{
	
	public function getmeet($dts, $uid)
	{
		if($uid==0)$uid = $this->adminid;
		$arr 	= array();
		$hyarr 	= array('<font color=green>正常</font>','<font color=blue>会议中</font>','<font color=#ff6600>结束</font>','<font color=#888888>取消</font>');
		
		$narr 	= $this->getall("`type`=0 and `startdt` like '$dts%' order by `startdt` asc");
		$adb  	= m('admin');
		foreach($narr as $k=>$rs){
			if($adb->containjoin($rs['joinid'], $uid)){
				$zt 	= $rs['state'];
				$state 	= $hyarr[$zt];
				$dt 	= ''.str_replace($dts.' ', '', $rs['startdt']).'至'.str_replace($dts.' ', '', $rs['enddt']).'';
				$arr[]= array(
					'type' 		=> '会议',
					'title' 	=> '['.$rs['hyname'].']'.$rs['title'].'',
					'state' 	=> $state,
					'status' 	=> $zt,
					'startdt' 	=> $dt,
					'starttime' => strtotime($rs['startdt']),
					'endtime' 	=> strtotime($rs['enddt']),
				);	
			}
		}
		return $arr;
	}
}