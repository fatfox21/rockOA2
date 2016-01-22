<?php
class homeClassAction extends Action
{
	/**
		首页项目管理读取的
	*/
	public function indexAction()
	{
		$this->tpltype 	= 'html';
		$this->tpldom  	= 'js';
		
		$str 			= '';
		$defitem 		= 'daib,work,wannl|todo,gong';
		$lie1 = $lie2 = $lie3 = '';
		$where 			= m('admin')->getbhmy('receid', $this->adminid);
		$rows 			= m('homeitems')->getall('valid=1 '.$where.' order by `sort`');
		$path 			= ROOT_PATH.'/'.P.'/index/home/aitems/aitems_';
		foreach($rows as $k=>$rs){
			$num 	= $rs['num'];
			$paths  = $path.''.$num.'.js';
			if(!file_exists($paths))continue;
			
			$cont = file_get_contents($paths);
			$str .= "\n\n".$cont;
			if($rs['ismr']==1){
				$lie = $rs['lie'];
				if($lie>3)$lie=3;
				if($lie<1)$lie=1;
				if($lie==1)$lie1.=','.$num.'';
				if($lie==2)$lie2.=','.$num.'';
				if($lie==3)$lie3.=','.$num.'';
			}
		}
		$lies = array();
		if($lie1!='')$lies[] = substr($lie1, 1);
		if($lie2!='')$lies[] = substr($lie2, 1);
		if($lie3!='')$lies[] = substr($lie3, 1);
		if(count($lies)>0)$defitem = join('|', $lies);
		$this->smartydata['homeitems'] 	= $str;
		$this->smartydata['defitem'] 	= $defitem;
	}
	

	public function daiclAjax()
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
			$to		= m($rs['table'])->rows("`status`=2 and `isturn`=1 and `uid`='$this->adminid' $whre");
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
		
		//未完成工作任务
		$to		= m('work')->getwwctotal($this->adminid);
		if($to>0){
			$rows[]= array(
				'title'		=> '未完成任务',
				'stotal' 	=> $to,
				'url'		=> 'work,work,mwc,atype=1',
				'menunum'	=> 'workmwc'
			);
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

	public function gettixingAjax()
	{
		$loadici	= (int)$this->get('loadici');
		$loadtime	= (int)$this->get('loadtime');
		$str		= '';
		$db			= m('todo');
		$count		= $db->rows("uid='$this->adminid' and `status`=0");
		if($loadici == 0 && $count>0){
			$str = '您有<font color=red>('.$count.')</font>条未读信息;';
		}else{
			$lnow   = date('Y-m-d H:i:s', $loadtime);
			$storw	= $db->getall("uid='$this->adminid' and `status`=0 and `optdt`>='$lnow' order by `id`",'title,mess');
			if($this->db->count > 0){
				$str = '<div>您有<font color=red>('.$count.')</font>条未读信息;</div>';
				foreach($storw as $k=>$rs){
					$str.='<div style="padding:3px 0px">'.($k+1).'、【'.$rs['title'].'】'.$rs['mess'].'</div>';
				}
			}
		}
		echo json_encode(array(
			'str' 	=> $str,
			'count' => $count,
			'time'   => time()
		));
	}
	
	
	public function homereadwork($table, $rows)
	{
		$arr = array();
		$hyarr = array('<font color=green>正常</font>','<font color=blue>会议中</font>','<font color=#ff6600>结束</font>','<font color=#888888>取消</font>');
		
		$narr = m('meet')->getall("`type`=0 and `startdt` like '".$this->date."%' order by `startdt` asc");
		$adb  = m('admin');
		foreach($narr as $k=>$rs){
			if($adb->containjoin($rs['joinid'], $this->adminid)){
				$zt 	= $rs['status'];
				$state 	= $hyarr[$zt];
				$dt 	= ''.str_replace($this->date.' ', '', $rs['startdt']).'至'.str_replace($this->date.' ', '', $rs['enddt']).'';
				
				$arr[]= array(
					'type' => '会议',
					'title' => '['.$rs['hyname'].']'.$rs['title'].'',
					'state' => $state,
					'startdt' => $dt
				);
				
			}
		}
		$rows = array_merge($arr, $rows);
		return array('rows'=>$rows);
	}

	public function savehomeAjax()
	{
		$homeitems	= $this->post('homeitems');
		m('admin')->update("`homeitems`='$homeitems'", "`id`='$this->adminid'");
		echo 'success';
	}
}