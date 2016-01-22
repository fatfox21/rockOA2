<?php
class daibanClassModel extends Model
{
	//待办
	public function dai($uids, $sp='<br>', $fen=0)
	{
		$arows 	= m('flow_set')->getall('isflow = 1 and `table` is not null order by `sort`', "`num`,`name`,`table`,`menunum`,`summary`");
		$rows	= array();
		$mwhere	= m('where');
		$uid	= '0';
		$rudb 	= m('flow_course');
		$oi		= 0;
		foreach($arows as $k=>$rs){
			if($fen>0 && $oi>=$fen)continue;
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$rsto	= m($rs['table'])->getall("`status` in(0,2) and ifnull(uid, 0)>0 and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$uids,')>0 $whre");
			foreach($rsto as $k1=>$rs1){
				if($fen>0 && $oi>=$fen)continue;
				$ztname 	= $rudb->getstatuss($rs['table'], $rs1, $sp);
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
					'applydt' 		=> $rs1['applydt'],
					'statusman' 	=> $ztname,
					'notbtnarr'		=> $rudb->getcheckact($rs['table'], $rs1['id'])
				);
				$uid.=','.$rs1['uid'];
				$oi++;
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
	
	//统计流程待办的
	public function totaldaiban($uid, $ids='0')
	{
		$mwhere	= m('where');
		$arows 	= m('flow_set')->getall('isflow=1 and `table` is not null order by `sort`', "`num`,`name`,`table`,`menunum`");
		$total	= 0;
		foreach($arows as $k=>$rs){
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$arows[$k]['where'] = $whre;
			$to		= m($rs['table'])->rows("`status`in($ids) and ifnull(uid, 0)>0 and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$uid,')>0 $whre");
			$total += $to;
		}
		return $total;
	}
}