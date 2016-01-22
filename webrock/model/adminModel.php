<?php
class adminClassModel extends Model
{
	
	public function gjoin($joinid, $glx='ud', $blx='bxl')
	{
		$uid 	= $did = '0';
		if($this->rock->isempt($joinid))return '';
		if($this->rock->contain($joinid, 'all'))return 'all';
		$narr 	= explode(',', $joinid);
		$dwhe	= array();
		foreach($narr as $sid){
			$lx 	= substr($sid, 0, 1);
			$ssid 	= str_replace(array('u','d','U','D'), array('','','',''), $sid);
			if($lx == 'd' || $glx=='d'){
				$did.=','.$ssid.'';
				$dwhe[] = "instr(`deptpath`, '[$ssid]')>0";
			}else{
				$uid.=','.$ssid.'';
			}
		}
		$where = '';
		if($did != '0'){
			$where = join(' or ', $dwhe);
			if($uid!='0')$where.=" or `id` in($uid)";
		}else{
			if($uid!='0')$where ="`id` in($uid)";
		}
		if($blx == 'where')return $where;
		$guid = '';
		if($where!=''){
			$rows = $this->getall("`status`=1 and `state`<>5 and ($where)", '`id`');
			foreach($rows as $k=>$rs)$guid.=','.$rs['id'].'';
			if($guid !='')$guid = substr($guid, 1);
		}
		return $guid;
	}
	
	/**
		判断某个id是不是在里面
	*/
	public function containjoin($joinid, $myid=0, $glx='ud')
	{
		$bo 	= false;
		$wh 	= $this->gjoin($joinid, $glx, 'where');
		if($wh == 'all')$bo = true;
		if(!$bo && $wh != ''){
			if($this->rows("`id`='$myid' and ($wh)")>0)$bo = true;
		}
		return $bo;
	}
	
	public function getjoinstr($fids, $uid)
	{
		$s 		= '';
		$us 	= $this->getone($uid,'id,`name`,`deptid`,`deptpath`');
		$tj[]	= "ifnull($fids,'')=''";
		$tj[]	= $this->rock->dbinstr($fids, 'all');
		$tj[]	= $this->rock->dbinstr($fids, 'u'.$uid);
		if($us){
			$dep = explode(',', $us['deptpath']);
			foreach($dep as $deps){
				$_deps 	= str_replace(array('[',']'), array('',''), $deps);
				$tj[]	= $this->rock->dbinstr($fids, 'd'.$_deps);
			}
		}
		$s	= join(' or ', $tj);
		if($s != '')$s = ' and ('.$s.')';
		return $s;
	}
	
	/**
		根据模块可获取查看权限
	*/
	public function getextsjoinv($mode, $uid, $gty='uid')
	{
		$tj1	= $this->rock->dbinstr('mode', 'all');
		$tj2	= $this->rock->dbinstr('mode', $mode);
		$s 		= $s1 = $s0 = '';
		$rows 	= $this->db->getall("select `renyid`,`type` from `[Q]sjoinv` where `uid`='$uid' and ($tj1 or $tj2) ");
		foreach($rows as $k=>$rs){
			switch($rs['type']){
				case 1:
					$s1 .=','.$rs['renyid'];
				break;
				case 0:
					$s0 .=','.$rs['renyid'];
				break;
			}
		}
		$whe = $whe1= $whe0 = '';
		if($s1!=''){
			$whe1 = $this->gjoin(substr($s1, 1), 'ud', 'where');
			if($whe1 != '')$whe = ' and '.$whe1.'';
		}
		if($s0!=''){
			$whe0 = $this->gjoin(substr($s0, 1), 'ud', 'where');
			if($whe0 != '')$whe .= ' and not('.$whe0.')';
		}
		if($gty =='where'){
			if($whe=='')$whe='and id=0';
			return $whe;
		}
		$guid = '0';
		if($whe!=''){
			$rows = $this->getall("`status`=1 $whe", '`id`');
			foreach($rows as $k=>$rs)$guid.=','.$rs['id'].'';
		}
		return $guid;
	}

	
	
	
	//更新数据获取连接的
	public function getadminjoin($did, $sup)
	{
		$deptpath 	= $this->db->getpval('[Q]dept', 'pid', 'id', $did, '],[');
		$deptname	= $this->db->getmou('[Q]dept', 'name', "`id`='$did'");
		$supername	= '';
		
		$superpath	= '';
		if(!$this->isempt($sup)){
			$sua = explode(',', $sup);
			foreach($sua as $suas){
				$sss1 	= $this->db->getpval('[Q]admin', 'superid', 'id' ,$suas, '],[');
				if($sss1 != '')$superpath.=',['.$sss1.']';
				$sss2	= $this->db->getmou('[Q]admin', 'name', "`id`='$suas'");
				if(!$this->isempt($sss2))$supername.=','.$sss2;
			}
			if($superpath!='')$superpath=substr($superpath,1);
			if($supername!='')$supername=substr($supername,1);
		}
		$rows['deptpath'] 	= $this->rock->strformat('[?0]', $deptpath);
		$rows['superpath'] 	= $superpath;
		$rows['deptname'] 	= $deptname;
		$rows['superman'] 	= $supername;
		
		return $rows;
	}
	
	public function updatedata($where='')
	{
		$rows	= $this->db->getall("select id,name,deptid,superid,deptpath,superpath,deptname,superman,groupname from `[Q]admin` where `status`=1 $where order by `sort`");
		$total	= $this->db->count;
		$cl		= 0;
		foreach($rows as $k=>$rs){
			$nrs	= $this->getadminjoin($rs['deptid'], $rs['superid']);
			if($nrs['deptpath'] != $rs['deptpath'] || $nrs['deptname'] != $rs['deptname'] || $nrs['superpath'] != $rs['superpath'] || $nrs['superman'] != $rs['superman']){
				$this->db->record('[Q]admin', $nrs, "`id`='".$rs['id']."'");
				$cl++;
			}
		}
		return '总'.$total.'条记录,更新了'.$cl.'条';
	}
}