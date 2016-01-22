<?php
class kaoqinClassAction extends Action
{
	public function getsetAjax()
	{
		$rows	= m('kq_set')->getone('1=1 order by id desc');
		echo json_encode($rows);
	}
	
	public function getxiuAjax()
	{
		$mid	= $this->get('xiuid');
		$month	= $this->get('y1').'-'.$this->get('m1');
		$rows	= m('kq_xiu')->getall("`date` like '{$month}%' and `mid`='$mid' order by id desc");
		echo json_encode($rows);
	}
	public function setallxiuAjax()
	{
		$s	= $this->post('s');
		$mid= $this->get('xiuid');
		$a	= explode(',', $s);
		$db = m('kq_xiu');
		foreach($a as $day){
			if($db->rows("`date`='$day' and `mid`='$mid'")==0){
				$db->record("`date`='$day',`mid`='$mid'");
			}
		}
		$this->getxiuAjax();
	}
	public function changexiuAjax()
	{
		$day = $this->get('day');
		$lx  = $this->get('lx');
		$mid = $this->get('xiuid');
		$db  = m('kq_xiu');
		if($lx == '0')$db->record("`date`='$day',`mid`='$mid'");
		if($lx == '1')$db->delete("`date`='$day' and `mid`='$mid'");
	}
	
	//导入
	public function importAjax()
	{
		$import	= c('PHPExcelReader', true);
		$cdt	= c('date', true);
		
		$rows	= $import->reader($_FILES['file']['tmp_name']);
		$db		= m('kq_dkjl');
		$oi		= 0;
		$dbs	= m('admin');
		$finarr	= array();
		foreach($rows as $k=>$rs){
			$name	= $rs['A'];
			if(!isset($finarr[$name])){
				$finge	= $dbs->getmou('finge', "`name`='$name'");
				$finarr[$name] = $finge;
			}else{
				$finge = $finarr[$name];
			}
			$arr	= array(
				'name'		=> $name,
				'finge'		=> $finge,
				'type'		=> '0',
				'checktime'	=> substr($rs['B'],1,-1)
			);
			if($cdt->isdate($arr['checktime'])){
				$db->insert($arr);
				$oi++;
			}
		}
		$this->backmsg('', '成功导入'.$oi.'条');
	}
	
	public function kaoqinfxafter($table, $rows)
	{
		foreach($rows as $k=>$rs){
			$rows[$k]['week'] = $this->rock->cnweek($rs['dt']);
		}
		return array('rows' => $rows);
	}
	

	
	//考勤统计
	public function totalafter($table, $rows)
	{
		$uid = '0';
		foreach($rows as $k=>$rs){
			$uid.=','.$rs['id'];
		}
		$month	= $this->post('month', date('Y-m'));
		$pdxx	= (int)$this->post('pdxx','0');
		
		$db 	= m('kq_info');
		$qirow	= $db->getarr("`uid` in($uid) and `status`=1 and `kind`='请假' and `stime` like '$month%' group by `uid`", "sum(`totals`)as stotal", 'uid');
		$jbrow	= $db->getarr("`uid` in($uid) and `status`=1 and `kind`='加班' and `stime` like '$month%' group by `uid`", "sum(`totals`)as stotal", 'uid');
		
		
		$ssras	= array();
		$wheres	= ' and `iswork`=1';
		if($pdxx==0)$wheres='';//统计休息日
		$ssra	= $this->db->getall("SELECT `state`,`uid`,count(1) as totols FROM `[Q]kq_anay` where `dt` like '$month%' and `states` is null $wheres and `uid` in($uid) group by `state`, `uid`");
		foreach($ssra as $k=>$rs){
			$ssras[$rs['uid']][] = $rs;
		}

		foreach($rows as $k=>$rs){
			$qj = '';
			$jb = '';
			$s1 = '';
			$uid= $rs['id'];
			if( isset($qirow[$uid]) )$qj = $qirow[$uid]['stotal'];
			if( isset($jbrow[$uid]) )$jb = $jbrow[$uid]['stotal'];
			
			$rows[$k]['leavesj'] = $qj;
			$rows[$k]['jiabansj'] = $jb;
			
			if(isset($ssras[$uid])){
				foreach($ssras[$uid] as $k1=>$rs1){
					$state = $rs1['state'];
					$s1.=''.$rs1['state'].':'.$rs1['totols'].'次; ';
					if($state=='正常')$rows[$k]['zc'] = $rs1['totols'];
					if($state=='迟到')$rows[$k]['chidao'] = $rs1['totols'];
					if($state=='早退')$rows[$k]['zaotui'] = $rs1['totols'];
					if($state=='未打卡')$rows[$k]['wdk'] = $rs1['totols'];
				}
			}
			$rows[$k]['kaoqinzt'] = $s1;
		}
		return array('rows' => $rows);
	}
	
	
	//获取上下班时间
	public function getsxbAjax()
	{
		$rows	= array();
		$db		= m('kq_set');
		$arrs 	= $db->getall("`type`=0 and `mid`=0 order by `sort`", "`id`,`name`");
		foreach($arrs as $k=>$rs){
			$rows[] = array('name'=>$rs['name'],'time'=>'');
			
			//对应值
			$arrss 	= $db->getall("`type`=".$rs['id']." and `stime` is not null and `etime` is not null order by `sort`", "`id`,`name`,`stime`,`etime`");
			foreach($arrss as $k1=>$rs1){
				$rows[] = array('name'=>'&nbsp; &nbsp; '.$rs1['name'],'time'=>$rs1['stime'].'至'.$rs1['etime']);
			}	
		}
		echo json_encode(array(
			'rows' => $rows
		));
	}
}