<?php 
class flowClassAction extends Action{
	
	public function daiclAjax()
	{
		$arows 	= m('flow_set')->getall('1=1 order by `sort`', "`num`,`name`,`table`,`menunum`");
		$rows	= array();
		$mwhere	= m('where');
		$uid	= '0';
		foreach($arows as $k=>$rs){
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$rsto	= m($rs['table'])->getall("`status` in(0,2) and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$this->adminid,')>0 $whre");
			foreach($rsto as $k1=>$rs1){
				$ztname = '';
				
				//if(!$this->isempt($rs1['statusman']) && !$this->isempt($rs1['nstatusname']))$ztname = '<font color=#888888>'.$rs1['statusman'].''.$rs1['nstatusname'].'</font><br>';
				$ztname .= '待'.$rs1['nowcheckname'].'处理';
				
				$rows[] = array(
					'modenum' 	=> $rs['num'],
					'modename' 	=> $rs['name'],
					'tablename' => $rs['table'],
					'uid' 			=> $rs1['uid'],
					'mid' 			=> $rs1['id'],
					'optdt' 		=> $rs1['optdt'],
					'statusman' 	=> $ztname,
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
		
		
		echo json_encode(array(
			'totalCount'=>count($rows),
			'rows'	=> $rows
		));
	}
	
	
	public function daibanAjax()
	{
		$rows 	= array();
		$mwhere	= m('where');
		$arows 	= m('flow_set')->getall('isflow=1 and `table` is not null order by `sort`', "`num`,`name`,`table`,`menunum`");
		foreach($arows as $k=>$rs){
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			$arows[$k]['where'] = $whre;
			$to		= m($rs['table'])->rows("`status`=0 and ifnull(uid, 0)>0 and `isturn`=1 and instr(concat(',', nowcheckid, ','), ',$this->adminid,')>0 $whre");
			if($to>0){
				$rows[]= array(
					'title'		=> '[待办]'.$rs['name'],
					'stotal' 	=> $to,
					'num'		=> $rs['num'],
					'table'		=> $rs['table'],
					'opentype'	=> 1,
					'url'		=> 'check',
					'menunum'	=> '1'
				);
			}
		}
		
		//申请的
		foreach($arows as $k=>$rs){
			$whre	= $rs['where'];
			$to		= m($rs['table'])->rows("`status`=2 and `isturn`=1 and (`uid`='$this->adminid' or `optid`='$this->adminid') $whre");
			if($to>0){
				$rows[]= array(
					'title'		=> '[申请]'.$rs['name'],
					'stotal' 	=> $to,
					'num'		=> $rs['num'],
					'table'		=> $rs['table'],
					'opentype'	=> 0,
					'url'		=> 'check',
					'menunum'	=> '1'
				);
			}
		}
		
		foreach($rows as $k=>$rs){
			$rows[$k]['xuhao'] = $k+1;
		}
		if(count($rows)==0){
			$rows[] = array(
				'title'		=> '<div style="font-size:16px;height:40px;line-height:35px">无待办</div>',
				'stotal' 	=> 0,
				'xuhao'		=> ''
			);
		}
		echo json_encode(array(
			'totalCount'=>10,
			'rows'	=> $rows
		));
	}
}