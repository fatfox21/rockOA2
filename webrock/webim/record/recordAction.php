<?php 
class recordClassAction extends Action{
	
	
	public function defaultAction()
	{
		$db		= m('admin');
		$aid	= (int)$this->get('aid');
		$ars	= $db->getone($aid, '`name`,`id`,`face`');
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
		
	}
	
	
	public function dataAjax()
	{
		$atype = $this->request('atype');
		$sid   = $this->request('sid');
		$aid   = $this->request('aid');
		$page  = (int)$this->request('page', '1');
		$fen	= 20;
		$whes	= $this->rock->dbinstr('receuid', $aid);
		$where 	= "";
		if($atype == 'user'){
			$where = "and ((`sendid`=$aid and `receid`=$sid) or (`sendid`=$sid and `receid`=$aid))";
		}
		if($atype == 'group' || $atype == 'system' || $atype == 'dept'){
			$where = "and `receid`=$sid and $whes ";
		}

		
		$count  = m('im_mess')->rows("`type`='$atype' $where");
		$maxpage= ceil($count / $fen);
		
		$sql	= "select * from [Q]im_mess where `type`='$atype' $where order by `id` desc limit ".(($page-1)*$fen).",$fen";
		$rows   = $this->db->getall($sql);
		
		if($atype != 'system'){
			$snid 	= '0'; 
			foreach($rows as $k=>$rs){
				$snid .=','.$rs['sendid'];
			}
			if($snid != '0'){
				$uarr = m('admin')->getall("`id` in($snid)", '`id`,`name`,`face`');
				$_ursa= array();
				foreach($uarr as $k=>$rs){
					$rs['face'] = $this->rock->repempt($rs['face'], 'images/im/user100.png');
					$_ursa[$rs['id']] = $rs;
				}
				foreach($rows as $k=>$rs){
					$rows[$k]['sendname'] = $_ursa[$rs['sendid']]['name'];
					$rows[$k]['sendface'] = $_ursa[$rs['sendid']]['face'];
				}
			}
		}else{
			foreach($rows as $k=>$rs){
				$rows[$k]['sendname'] = '';
				$rows[$k]['sendface'] = 'images/im/shezhi_blue.png';
			}
		}
		
		echo json_encode(array(
			'data'	=> $rows,
			'count'	=> $count,
			'page'	=> $page,
			'maxpage' => $maxpage
		));
	}
	
}