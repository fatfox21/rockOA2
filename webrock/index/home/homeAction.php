<?php
class homeClassAction extends Action
{
	public function indextdAction()
	{
		$this->tpltype 	= 'html';
		$this->tpldom  	= 'js';
		$db 			= m('homeitems');
		$mid 			= (int)$this->get('mid', '0');
		$where 			= '';
		if($mid==-1)$where 	= m('admin')->getbhmy('receid', $this->adminid);
		$rows 			= $db->getall('`mid`=0 and `valid`=1 and `type`=0 '.$where.' order by `sort`','`id`,`num`,`title`,`ismr`,`x`,`y`,`w`,`h`,`icons`');
		$this->smartydata['homearr'] 	= json_encode($rows);
		$this->smartydata['mid'] 		= $mid;
		
		$showarr 		= array();
		if($mid > 0){
			$arr 	= $db->getall("`mid`='$mid'", '`type`,`x`,`y`,`w`,`h`');
			foreach($arr as $k=>$rs){
				$rs['id'] = $rs['type'];
				$showarr[$rs['type']] = $rs;
			}
		}else if($mid == 0){
			foreach($rows as $k=>$rs){
				$showarr[$rs['id']] = $rs;
			}
		}else if($mid == -1){
			$rows 		= $this->getpihome();
			foreach($rows as $k=>$rs){
				$showarr[$rs['mid']] = $rs;
			}
		}
		$this->smartydata['showarr'] 	= json_encode($showarr);
	}
	
	public function saveindexglAjax()
	{
		$s1		= $this->post('s1');
		$s2		= $this->post('s2');
		$mid 	= (int)$this->post('mid', '0');
		$db 	= m('homeitems');
		if($mid >0){
			$sid = '0';
			if($s1!=''){
				$asr = explode(',', $s1);
				foreach($asr as $asr1){
					$a 		= explode('|', $asr1);
					$whe 	= "`mid`='$mid' and `type`='$a[0]'";
					$id 	= (int)$db->getmou('id', $whe);
					if($id==0)$whe='';
					$db->record("`x`='$a[1]',`y`='$a[2]',`w`='$a[3]',`h`='$a[4]',`mid`='$mid',`type`='$a[0]'", $whe);
					if($id==0)$id= $this->db->insert_id();
					$sid .= ','.$id.'';
				}
			}
			$db->delete("`mid`='$mid' and `id` not in($sid)");
		}else if($mid == 0){
			if($s2!='')$db->update('`ismr`=0', "`id` in($s2)");
			if($s1!=''){
				$asr = explode(',', $s1);
				foreach($asr as $asr1){
					$a = explode('|', $asr1);
					$db->update("`x`='$a[1]',`y`='$a[2]',`w`='$a[3]',`h`='$a[4]',ismr=1", "`id`='$a[0]'");
				}
			}
		}else if($mid == -1){
			$sid = '0';
			if($s1!=''){
				$asr = explode(',', $s1);
				foreach($asr as $asr1){
					$a 		= explode('|', $asr1);
					$whe 	= "`uid`='$this->adminid' and `mid`='$a[0]'";
					$id 	= (int)$db->getmou('id', $whe);
					if($id==0)$whe='';
					$db->record("`x`='$a[1]',`y`='$a[2]',`w`='$a[3]',`h`='$a[4]',`mid`='$a[0]',`uid`='$this->adminid'", $whe);
					if($id==0)$id= $this->db->insert_id();
					$sid .= ','.$id.'';
				}
			}
			$db->delete("`uid`='$this->adminid' and `id` not in($sid)");
		}
	}
	
	private function getpihome()
	{
		$db 			= m('homeitems');
		$rows 			= $db->getall("`uid`='$this->adminid and `mid`>0' ",'`mid`,`x`,`y`,`w`,`h`');	
		if($this->db->count==0){
			$rows 			= $db->getall('`mid`=0 and `type`=1', 'id,receid');
			$mid 			= m('pipei')->getpipeimid($this->adminid, $rows, 'id', 7);
			$rows 			= $db->getall("`mid`='$mid'",'`type` as mid,`x`,`y`,`w`,`h`');	
		}
		return $rows;
	}
	
	/**
		首页项目管理读取的
	*/
	public function indexAction()
	{
		$this->tpltype 	= 'html';
		$this->tpldom  	= 'js';
		$db 			= m('homeitems');
		$str 			= '';
		$homearr		= array();
		
		$rows 			= $this->getpihome();
		$path 			= ROOT_PATH.'/'.P.'/index/home/aitems/aitems_';
		foreach($rows as $k=>$rs){
			$id 	= (int)$rs['mid'];
			$rs1 	= $db->getone($id);
			if(!$rs1)continue;	
			$num 	= $rs1['num'];
			$paths  = $path.''.$num.'.js';
			if(!file_exists($paths))continue;	
			$cont = file_get_contents($paths);
			$str .= "\n\n".$cont;
			$homearr[] = array(
				'id' 	=> $id,
				'num' 	=> $num,
				'title' => $rs1['title'],
				'icons' => $rs1['icons'],
				'x' => $rs['x'],
				'y' => $rs['y'],
				'w' => $rs['w'],
				'h' => $rs['h'],
			);
		}
		$this->smartydata['homeitems'] 	= $str;
		$this->smartydata['homearr'] 	= json_encode($homearr);
		$this->smartydata['randkey'] 	= $this->rock->jm->getkeyshow();
	}
	

	public function gettixingAjax()
	{
		$loadici	= (int)$this->get('loadici');
		$loadtime	= (int)$this->get('loadtime');
		$str		= '';
		$str1		= '';
		$db			= m('todo');
		$count		= $db->rows("uid='$this->adminid' and `status`=0");
		if($loadici == 0 && $count>0){
			$str = '您有<font color=red>('.$count.')</font>条未读信息<a onclick="return gototixingla()" href="javascript:">[查看]</a>;';
			$str1= '您有'.$count.'条未读信息;';
		}else{
			$lnow   = date('Y-m-d H:i:s', $loadtime);
			$storw	= $db->getall("uid='$this->adminid' and `status`=0 and `optdt`>='$lnow' order by `id`",'title,mess');
			if($this->db->count > 0){
				$str1= '您有'.$count.'条未读信息;';
				$str = '<div>您有<font color=red>('.$count.')</font>条未读信息<a onclick="return gototixingla()" href="javascript:">[查看]</a>;</div>';
				foreach($storw as $k=>$rs){
					$ss  	 = ''.($k+1).'、【'.$rs['title'].'】'.$rs['mess'].';';
					$str	.= '<div style="padding:3px 0px">'.$ss.'</div>';
					$str1	.= "\n".$ss."";
				}
			}
		}
		echo json_encode(array(
			'str' 	=> $str,
			'msg' 	=> $str1,
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