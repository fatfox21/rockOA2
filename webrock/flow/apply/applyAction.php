<?php
class applyClassAction extends Action
{
	public function applybeforedata($table)
	{
		$s = 'and isflow=1';
		return $s;
	}
	
	//读取审核统计
	public function applydata($table, $rows)
	{
		$mwhere	= m('where');
		$whers	= ' (`uid`='.$this->adminid.' or optid='.$this->adminid.')';
		foreach($rows as $k=>$rs){
			$db 	= m($rs['table']);
			$whre	= $mwhere->getstring('flowset_'.$rs['num']);
			
			$rows[$k]['totals0'] = $db->rows('`status`=0 and `isturn`=1 and '.$whers.' '.$whre.'');//待审核
			$rows[$k]['totals2'] = $db->rows('`status`=2 and `isturn`=1 and '.$whers.' '.$whre.'');
			$rows[$k]['totals3'] = $db->rows('`status`=1 and '.$whers.' '.$whre.'');
			
			$rows[$k]['temp_type'] = $rs['type'];
		}
		return array('rows'=>$rows);
	}
	
	
	
	//待办
	public function daiclAjax()
	{
		$rows = m('daiban')->dai($this->adminid,'<br>');
		echo json_encode(array(
			'totalCount'=>count($rows),
			'rows'	=> $rows
		));
	}

	
	public function checkmybefore($table)
	{
		$s 			= '';
		$uid 		= $this->adminid;
		$table		= '[Q]flow_bill a left join [Q]admin b on a.uid=b.id ';
		$protype	= (int)$this->post('protype');
		$modeid		= (int)$this->post('modeid','0');
		$modenum	= '';
		$s 			= "and (a.`uid`='$uid' or a.`optid`='$uid')";
		$fields 	= "a.*";
		if($modeid >0)$modenum=m('flow_set')->getmou('num', $modeid);
		//经我处理的
		if($protype ==1){
			$s ="and ".$this->rock->dbinstr('a.allcheckid', $uid);
		}
		//我下属申请
		if($protype ==2){
			$s ="and instr(b.superpath, '[$uid]')>0";
		}
		//授权查看
		if($protype ==3){
			$s = m('flowlog')->getextview($this->adminid,$modenum, 'a.');
		}
		if($modeid >0)$s.=' and a.`modeid`='.$modeid.'';
		$s.=' and a.`isdel`=0';
		return array(
			'where' => $s,
			'table'	=> $table,
			'fields'	=> $fields
		);
	}
	
	//我申请的列表
	public function checkmychange($table, $rows)
	{
		$protype	= (int)$this->post('protype');
		$uid	= '0';
		$mid	= '0';
		$rudb 	= m('flow_course');
		foreach($rows as $k=>$rs){
			$uid.=','.$rs['uid'];
			$mid.=','.$rs['modeid'];
		}
		
		$uarr = m('admin')->getall("id in($uid)", '`name`,`deptname`,`id`');
		$_uarr= array();
		foreach($uarr as $k=>$rs)$_uarr[$rs['id']] = $rs;

		$marr 	= m('flow_set')->getall("id in($mid)", '`num`,`summary`,`table`,`id`');
		$_marr	= array();
		foreach($marr as $k=>$rs){
			$_marr[$rs['id']] 		= $rs;
		}

		foreach($rows as $k=>$rs){
			if(isset($_uarr[$rs['uid']])){
				$rows[$k]['name'] 		= $_uarr[$rs['uid']]['name'];
				$rows[$k]['deptname'] 	= $_uarr[$rs['uid']]['deptname'];
			}
			
			$rs1  	= m($rs['table'])->getone($rs['mid']);
			$zt		= '<font color=#888888>记录不存在</font>';
			$summary= '';
			$modenum= '';
			if($rs1){
				$zt 	= $rudb->getstatuss($rs['table'], $rs1,'<br>');
				$moders = $_marr[$rs['modeid']];
				$summary= $moders['summary'];
				$summary= $this->rock->reparr($summary, $rs1);
				$modenum= $moders['num'];
				$rows[$k]['status'] 	= $rs1['status'];	
				$rows[$k]['nstatus'] 	= $rs1['nstatus'];	
			}
			$rows[$k]['statustext'] = $zt;	
			$rows[$k]['modenum'] 	= $modenum;	
			$rows[$k]['summary'] 	= $summary;	
		}
		$carr = array();
		if($this->loadcount==1){
			$where= '';$snum='';
			if($protype == 3){
				$where = 'and 1=2';
				$nrsts= m('sjoinv')->getall("`uid`='$this->adminid'",'mode');
				foreach($nrsts as $k=>$rs)$snum.=','.$rs['mode'].'';
				if($snum!=''){
					$snum .= ',';
					$where = " and instr('$snum', concat(',',`num`,','))>0";
				}
			}
			$mrss = m('flow_set')->getall("isflow=1 $where order by `sort`", '`id`,`num`,`name`,`table`,`type`');
			foreach($mrss as $k=>$rs){
				$rs['leaf'] = true;
				$carr[$rs['type']][] = $rs;
			}
			$mrss = array();
			$mrss[] = array(
				'name' => '所有模块',
				'expanded' 	=> true,
				'leaf'  => true,
				'id'  => '0'
			);
			foreach($carr as $typ=>$msr){
				$to = count($msr);
				$mrss[] = array(
					'name' 		=> $typ,
					'expanded' 	=> true,
					'children' 	=> $msr
				);
			}
			$carr = array('root'=>'.', 'children'=>$mrss);
		}
		return array('rows'=>$rows, 'modearr'=>$carr);
	}
	
	
}