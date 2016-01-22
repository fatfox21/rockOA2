<?php
class flowlogClassModel extends Model
{
	public function initModel()
	{
		$this->settable('flow_set');
	}	

	public function getdatalog($flownum, $table, $mid, $uids='')
	{
		$where		= "`table`='$table' and `mid`='$mid'";
		$rs			= m($table)->getone($mid);
		$urs	= $aurs	= $log	= $setrs = $logarr	= array();
		$status 	= 0;
		if($rs){
			$optid 	= (int)$rs['optid'];
			if($optid==0)$optid=$rs['uid'];
			$urs 	= m('admin')->getone($rs['uid'], 'name,deptname');
			$aurs 	= m('admin')->getone($optid, 'name,deptname');
			$logarr	= m('flow_log')->getall("$where order by `id`");
			$setrs 	= $this->getone("`num`='$flownum'", "`id`,`name`");
			$status = $rs['status'];
		}
		$actarr		= array(
			array('1','通过', 0),
			array('2','不通过', -1)
		);
		$flars 		= m('flow_rule')->getone($where);
		if($flars && $status !=1){
			$fowsetr	= $this->db->getkeyall('[Q]flow_course','`id`,`name`',"`setid`='".$setrs['id']."'");
			$nowuserid	= $flars['nowuserid'];
			$userarr	= explode('|', $flars['alluser']);
			$useridarr	= explode('|', $flars['alluserid']);
			$coursearr	= explode('|', $flars['allcourseid']);
			$step		= $flars['step'];
			for($i=0; $i<$flars['allstep']; $i++){
				$zt = 2;$fefoid = $coursearr[$i];$tecuna='';
				$oi	= $i+1;
				if($oi<$step)$zt=0;
				if($oi==$step)$zt=1;
				if(isset($fowsetr[$fefoid]))$tecuna=$fowsetr[$fefoid];
				$log[] = array(
					'name'	=> $userarr[$i],
					'cname'	=> $tecuna,
					'zt'	=> $zt
				);
			}
			$_shcnarr	= m('flow_courseact')->getall("`cid`='".$flars['nowcourseid']."' order by `sort`");
			if(is_array($_shcnarr)){
				if(count($_shcnarr)>0)$actarr = array();
				foreach($_shcnarr as $k=>$nrs){
					$actarr[] = array($nrs['actv'], $nrs['name'], $nrs['nid']);
				}
			}
		}
		if($uids == '')$uids = ''.$this->adminid;
		$ischeck = $isdel = $isedit = 0;
		if($rs){
			$rs['checkstatustext']	= m('flow_course')->getstatuss($table, $rs);
			$bos1	= $this->contain(','.$uids.',', ','.$rs['uid'].',');
			if(!$bos1)$bos1	= $this->contain(','.$uids.',', ','.$rs['optid'].',');
			$nstatus= $rs['nstatus'];
			if($status != 1 && $bos1){
				if($nstatus == 0)$isedit = 1;
				if($nstatus == 0 || $nstatus==2)$isdel	= 1;
				if($nstatus==2){
					if(m('flow_log')->rows("$where and `courseid`>0 and `status`=1")==0)$isedit = 1;//第一步未通过可以编辑
				}
			}
		}
		$nowcheckid = $rs['nowcheckid'];
		if(!$this->isempt($nowcheckid)){
			$_usra 		= explode(',', $uids);
			$_nochid 	= ','.$nowcheckid.',';
			foreach($_usra as $_usras){
				if($this->contain($_nochid, ','.$_usras.',')){
					$ischeck = 1;
					break;
				}
			}
		}
		foreach($logarr as $k=>$logs){
			$s = '';$col=$logs['color'];
			if($logs['status']==1){
				$s='通过';
				$col = 'green';
			}
			if($logs['status']==2){
				$s='不通过';
				$col='red';
			}
			if(!$this->isempt($logs['statusname']))$s = $logs['statusname'];
			$logarr[$k]['statusname'] = $s;
			$logarr[$k]['statuscolor'] = $col;
		}
		$arr		= array(
			'data'	=> $rs,
			'user'	=> $urs,
			'aurs'	=> $aurs,
			'log'	=> $log,
			'logstr'=> $this->getlogstr($log),
			'logarr' => $logarr,
			'ischeck' => $ischeck,
			'isdel' => $isdel,
			'isedit' => $isedit,
			'actarr' => $actarr,
			'flownum'=> $flownum,
			'flowname'=> $setrs['name'],
			'mid'	 => $mid
		);
		return $arr;
	}
	
	private function getlogstr($log)
	{
		$s	= '';$s1='';
		foreach($log as $i=>$logs){
			$col = '#888888';
			$sty = '#';
			if($logs['zt']==2){
				$sty = 'color:#888888;';
				$col	= '#cccccc';
			}	
			if($logs['zt']==1){
				$sty = 'font-weight:bold;color:#800000';
				$col	= '#800000';
			}	
			$s1='&nbsp;→&nbsp;';
			if($i==0)$s1='';
			$s .='<span style="'.$sty.'">'.$s1.''.($i+1).'. '.$logs['cname'].'('.$logs['name'].')</span>';
		}
		return $s;
	}
	
	/**
		获取授权查看记录添加
	*/
	public function getextview($uid, $mode='', $qz='')
	{
		$whe	= '';
		if($mode != '')$whe="and `num`='$mode'";
		$rows 	= $this->getall("isflow=1 $whe", '`num`,`id`');
		$tjs	= array();
		$dbs 	= m('admin');
		foreach($rows as $k=>$rs){
			$s1 = $dbs->getextsjoinv($rs['num'], $uid);
			if($s1!='0'){
				$tjs[] = "($qz`uid` in($s1) and $qz`modeid`=".$rs['id'].")";
			}
		}
		$ss = join(' or ', $tjs);
		if($ss==''){
			$ss="and $qz`id`=0";
		}else{
			$ss = 'and ('.$ss.')';
		}
		return $ss;
	}
	
}