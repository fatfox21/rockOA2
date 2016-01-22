<?php
class daibanClassModel extends Model
{
	//待办
	public function dai($uids, $sp='<br>')
	{
		$arows 	= m('flow_set')->getall('isflow = 1 and `table` is not null order by `sort`', "`num`,`name`,`table`,`menunum`,`summary`");
		$rows	= array();
		$mwhere	= m('where');
		$uid	= '0';
		$rudb 	= m('flow_course');
		foreach($arows as $k=>$rs){
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$rsto	= m($rs['table'])->getall("`status` in(0,2) and ifnull(uid, 0)>0 and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$uids,')>0 $whre");
			$ztarr	= $rudb->getcourseact($rs['num']);
			foreach($rsto as $k1=>$rs1){
				$ztname 	= $this->getstatus($ztarr, $rs1, $sp);
				$summary	= $rs['summary'];
				$summary	= $this->rock->reparr($summary, $rs1);
				$rows[] = array(
					'modenum' 	=> $rs['num'],
					'modename' 	=> $rs['name'],
					'tablename' => $rs['table'],
					'summary'   => $summary,
					'uid' 			=> $rs1['uid'],
					'mid' 			=> $rs1['id'],
					'optdt' 		=> $rs1['optdt'],
					'statusman' 	=> $ztname,
					'notbtnarr'		=> $rudb->getcheckact($rs['table'], $rs1['id'])
				);
				$uid.=','.$rs1['uid'];
			}
		}
		
		$uarr = m('admin')->getall("id in($uid)", '`name`,`deptname`,`id`');
		$_uarr= array();
		foreach($uarr as $k=>$rs)$_uarr[$rs['id']] = $rs;
		
		foreach($rows as $k=>$rs){
			if(isset($_uarr[$rs['uid']])){
				$rows[$k]['name'] 		= $_uarr[$rs['uid']]['name'];
				$rows[$k]['deptname'] 	= $_uarr[$rs['uid']]['deptname'];
			}
		}
		
		return $rows;
	}
	
	public function getstatus($ztarr, $rs1, $sp)
	{
		$nzt	= $rs1['status'];
		$ztname = '';
		if($nzt==5){
			$ztname = '<font color=#888888>已删除</font>';
			return $ztname;
		}	
		if(isset($ztarr[$rs1['nstatus']]) && !$this->isempt($rs1['statusman'])){
			$ztname = ''.$rs1['statusman'].'<font color="'.$ztarr[$rs1['nstatus']][1].'">'.$ztarr[$rs1['nstatus']][0].'</font>'.$sp.'';
		}
		if(!$this->isempt($rs1['nowcheckname'])){
			$ztname    .= '<font color=blue>待'.$rs1['nowcheckname'].'处理</font>';
		}
		return $ztname;
	}
	
	public function totaldaiban($uid)
	{
		$mwhere	= m('where');
		$arows 	= m('flow_set')->getall('isflow=1 and `table` is not null order by `sort`', "`num`,`name`,`table`,`menunum`");
		$total	= 0;
		foreach($arows as $k=>$rs){
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$arows[$k]['where'] = $whre;
			$to		= m($rs['table'])->rows("`status`=0 and ifnull(uid, 0)>0 and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$uid,')>0 $whre");
			$total += $to;
		}
		return $total;
	}
}