<?php 
class kaoqinClassAction extends Action{

	public function getkaoqinAjax()
	{
		$uid 	= $this->rock->get('uid');
		$y 		= $this->rock->get('year');
		$m 		= $this->rock->get('month');
		$marr   = array(31,28,31,30,31,30,31,31,30,31,30,31);
		$max	= $marr[(int)$m-1];
		if($y%4==0 && $max==28)$max++;
		
		$month	= ''.$y.'-'.$m.'';
		$start	= ''.$y.'-'.$m.'-01';
		$end	= ''.$y.'-'.$m.'-'.$max.'';
		$rows	= array();
		
		$ssras	= array();
		$ssra	= $this->db->getall("SELECT ztname,time,state,states,dt,iswork FROM `[Q]kq_anay` where `dt`>='$start' and `dt`<='$end' and `uid`='$uid' order by dt,sort");
		foreach($ssra as $k=>$rs)$ssras[$rs['dt']][] = $rs;
		$tojarr = array();
		for($i=1; $i<=$max; $i++){
			$str	= '';
			$iswork	= 0;
			$oi		= $i;
			if($i<10)$oi = '0'.$oi.'';
			$dt		= ''.$month.'-'.$oi.'';
			if(isset($ssras[$dt])){
				foreach($ssras[$dt] as $k1=>$rs){
					$iswork	= $rs['iswork'];
					$state 	= $rs['state'];
					$states = $rs['states'];
					if(!isset($tojarr[$state]))$tojarr[$state] = 0;
					
					$str.=''.$rs['ztname'].'：';
					$s11 = '';
					$s11.=''.$state.'';
					if(!$this->isempt($rs['time']))$s11.='('.$rs['time'].')';
					
					$col1 = '';
					if($state!='正常'){
						if($this->isempt($states))$col1='red';
					}	
					if($iswork==0){
						$col1='#888888';
						$s11.=',休息日';
					}
					if(!$this->isempt($states))$s11.=','.$states.'';
					$s11='<font color='.$col1.'>'.$s11.'</font>';
					$str.=''.$s11.'<br>';
					
					if($iswork==1 && $this->isempt($states))$tojarr[$state]++;//异常
				}
			}
			$rows[$i] = array(
				'str' 		=> $str,
				'iswork'	=> $iswork
			);
		}
		$rows[99] = $tojarr;
		echo json_encode($rows);
	}
	
	public function publicstoreAfter($table, $rows)
	{
		//打开记录
		if($table == 'kq_dkjl'){
			
		}
	}
	
	public function dkjlAjax()
	{
		$opentype	= (int)$this->rock->request('opentype');
		$execldown	= $this->rock->request('execldown');
		$fields	= 'a.*,b.deptid,b.deptname,b.name';
		$order	= 'a.checktime desc';
		$where	= 'a.id > 0';
		$tables	= $this->rock->strformat('?0 a left join ?1 b on a.finge=b.finge', $this->T('kq_dkjl'), $this->T('admin'));
		
		$arr	= $this->limitRows($tables, $fields, $where, $order);
		$total	= $arr['total'];
		$rows	= $arr['rows'];
		$cdto	= c('date', true);
		foreach($rows as $k=>$rs){
			$rows[$k]['cnweek'] = $this->rock->cnweek($rs['checktime']);
			$jg = $cdto->datediff('d', $rs['checktime'], $this->date);
			$str = ''.$jg.'天前';
			if($jg==0)$str = '今天';
			if($jg==1)$str = '昨天';
			if($jg==2)$str = '前天';
			$rows[$k]['checktime'].=' ('.$str.')';
			$rows[$k]['xuhao'] = $k+1;
		}

		$bacarr	= array(
			'totalCount'=> $total,
			'rows'		=> $rows
		);
		if($execldown == 'true'){
			$this->exceldown($bacarr);
			return;
		}
		echo json_encode($bacarr);
	}
	
	public function adddkjlAjax()
	{
		$ip = $this->ip;
		if($this->contain($ip,'127.0.0') || $this->contain($ip,'196.168.')){
			$finge	= m('admin')->getmou('finge', "`id`='$this->adminid'");
			m('kq_dkjl')->insert(array(
				'finge'	=> $finge,
				'name'	=> $this->adminname,
				'checktime'	=> $this->now,
				'web'	=> $this->rock->web
			));
			echo 'success';
		}else{
			echo '仅限内网使用';
		}
	}
}