<?php
class pipeiClassModel extends Model
{

	public function getpipeimid($uid=0, $garrs, $esfi='mid', $momid=1, $dt='')
	{
		$mid 	= $momid;
		if($uid==0)return $mid;
		$mid 	= 0;
		$deptpath = '';
		if(is_array($uid)){
			$uid = $uid['id'];
			if(isset($uid['deptpath']))$deptpath = $uid['deptpath'];
		}else{
			if(!isset($this->userarr[$uid])){
				$_urs = $this->db->getone('[Q]admin', "`id`='$uid'", '`deptid`,`deptpath`');
				$this->userarr[$uid] = $_urs;
			}
			$deptpath = $this->userarr[$uid]['deptpath'];
		}
		$utid  	= $dtid  =  array();$allars=false;$dttime = 0;
		if($dt!='')$dttime	= strtotime($dt);
		foreach($garrs as $k=>$rs){
			$artid = explode(',', $rs['receid']);
			if($dttime>0)if($rs['starttime'] > $dttime || $rs['endtime'] < $dttime)continue;
			foreach($artid as $ssid){
				if($ssid=='')continue;
				if($ssid=='all'){
					$allars = $rs;
					continue;
				}
				$fs  = substr($ssid, 0, 1);
				$sid = str_replace('u','', $ssid);
				$sid = str_replace('d','', $sid);
				if($fs=='d'){
					$dtid[$sid]= $rs;
				}else{
					$utid[$sid]= $rs;
				}					
			}
		}
		if(isset($utid[$uid]))$mid = (int)$utid[$uid][$esfi];
		if($mid == 0 && !$this->isempt($deptpath)){
			$depa = explode(',', str_replace(array('[',']'), array('',''), $deptpath));
			foreach($depa as $depas){
				if(isset($dtid[$depas]))$mid = (int)$dtid[$depas][$esfi];
			}
		}
		if($mid == 0 && is_array($allars))$mid = (int)$allars[$esfi];
		if($mid==0)$mid=$momid;
		return $mid;
	}
}