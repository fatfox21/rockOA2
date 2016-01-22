<?php 
class flowClassAction extends appapiAction{
	
	public function daibanAjax()
	{
		$rows = m('daiban')->dai($this->adminid, ',');
		
		$this->showreturn(array(
			'totalCount'=>count($rows),
			'rows'	=> $rows
		));
	}
	
	/**
		获取数据
	*/
	public function flowmodelistAjax()
	{
		$rows = m('flow_set')->getall("`isapp`=1 order by `sort`", '`num`,`name`,`type`,`sort`');
		$this->showreturn($rows);
	}
	
	/**
		提交审核
	*/
	public function checkAjax()
	{
		
		$flownum	= $this->post('flownum');
		$id			= (int)$this->post('id');
		$zt			= (int)$this->post('zt');
		$sm			= $this->post('sm');
		$flow = f($flownum);
		$flow->adminid 		= $this->adminid;
		$flow->adminname 	= $this->adminname;
		$flow->initrecord($id);
		$msg =  $flow->check($zt, $sm, $this->adminid);
		$this->showreturn($msg);
	}
	
	/**
		流程单据
	*/
	public function listcheckAjax()
	{
		$page		= (int)$this->request('page','1');
		$protype	= (int)$this->request('atype','0');
		$uid 		= $this->adminid;
		$s 		= "and a.`uid`='$uid'";
		//经我处理的
		if($protype ==1){
			$s ="and ".$this->rock->dbinstr('a.allcheckid', $uid);
		}
		//我下属申请
		if($protype ==2){
			$s ="and instr(b.superpath, '[$uid]')>0";
		}
		//未通过
		if($protype ==3){
			$s .= " and a.`nstatus`=2";
		}
		if($protype ==4){
			$s .= " and a.`nstatus`=0";
		}
		$fen 		= 10;
		$table		= '[Q]flow_bill a left join [Q]admin b on a.uid=b.id ';
		$count 		= $this->db->rows($table, "a.`id`>0 and a.`isdel`=0 $s");
		$sql		= "select a.*,b.`name`,b.`deptname` from $table where a.`id`>0 and a.`isdel`=0 $s order by a.optdt desc limit ".(($page-1)*$fen).",".$fen."";
		$rudlog		= m('flowlog');
		$rows 		= $this->db->getall($sql);
		$mid	= '0';
		$rudb 		= m('flow_course');
		foreach($rows as $k=>$rs){
			$mid.=','.$rs['modeid'];
		}
		$marr 	= m('flow_set')->getall("id in($mid)", '`num`,`summary`,`table`,`id`');
		$_marr	= array();
		foreach($marr as $k=>$rs){
			$_marr[$rs['id']] 		= $rs;
		}	

		foreach($rows as $k=>$rs){
			$rs1  	= m($rs['table'])->getone($rs['mid']);
			$zt		= '<font color=#888888>记录不存在</font>';
			$summary= '';
			$modenum= '';
			if($rs1){
				$zt 	= $rudb->getstatuss($rs['table'], $rs1);
				$moders = $_marr[$rs['modeid']];
				$summary= $moders['summary'];
				$summary= $this->rock->reparr($summary, $rs1);
				$modenum= $moders['num'];
			}
			$rows[$k]['statustext'] = $zt;	
			$rows[$k]['modenum'] 	= $modenum;	
			$rows[$k]['summary'] 	= $summary;	
		}	
		$maxpage	= ceil($count/$fen);
		$this->showreturn(array(
			'rows'	=> $rows,
			'count' => $count,
			'maxpage' => $maxpage,
			'page' => $page,
		));
	}
	

	public function xiangAjax()
	{
		$table		= $this->get('tablename');
		$mid		= $this->get('mid');
		$uid 		= $this->adminid;
		$msg 		= '';
		
		$rs 		= m('flow_bill')->getone("`table`='$table' and `mid`='$mid'",'modeid,modename');
		if(!$rs)$msg='无记录';
		if($msg == ''){
			$modenum	= m('flow_set')->getmou('num', $rs['modeid']);
			$flow 	= f($modenum);
			$flow->initrecord($mid);
			
			$table 		= $flow->table;
			$arr		= m('flowlog')->getdatalog($modenum, $table, $mid, $uid);
			$arr['data']['base_flowname']= $flow->rs['base_flowname'];
			$arr['data']['base_sericnum']= $flow->rs['base_sericnum'];
			$arr['fields'] = $flow->getfields();
			$this->showreturn($arr);
		}else{
			$this->showreturn('');
		}
	}
	
	public function flowdelAjax()
	{
		$id		= (int)$this->get('mid', '0');
		$flownum= $this->get('modenum');
		$msg	= '';
		if($id==0 || $flownum=='')$msg='sorry;';
		if($msg==''){
			$flow = f($flownum);
			$flow->adminid 		= $this->adminid;
			$flow->adminname 	= $this->adminname;
			$flow->initrecord($id);
			$msg = $flow->flowdelete();
		}
		if($msg=='')$msg='success';
		$this->showreturn($msg);
	}
}