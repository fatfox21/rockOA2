<?php 
class kaoqinClassAction extends Action{

	public function getkaoqinAjax()
	{
		$uid 	= $this->get('uid');
		$y 		= $this->get('year');
		$m 		= $this->get('month');
		$rows 	= m('kaoqin')->getanay($uid, ''.$y.'-'.$m.'');
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
	
	/**
		在线打卡IP设置的
	*/
	public function adddkjlAjax()
	{
		$dbs 	= m('kq_dkip');
		$rows 	= $dbs->getall('1 order by `sort`');
		$id 	= m('pipei')->getpipeimid($this->adminid, $rows, 'id');
		$ipvalue= $dbs->getmou('ipvalue', "`id`='$id'");
		if($this->isempt($ipvalue))$ipvalue='*.*';
		$iparr	= explode(',', $ipvalue);
		$ip = $this->ip;
		$bo	= false;
		foreach($iparr as $ips){
			if($this->contain($ips,'*')){
				$ips = str_replace('*', '', $ips);
				if($this->contain($ip, $ips)){
					$bo = true;
					break;
				}
			}else{
				if($ips==$ip){
					$bo = true;
					break;
				}
			}
		}
		if($bo){
			$finge	= m('admin')->getmou('finge', "`id`='$this->adminid'");
			m('kq_dkjl')->insert(array(
				'finge'	=> $finge,
				'name'	=> $this->adminname,
				'checktime'	=> $this->now,
				'web'	=> $this->rock->web,
				'type'  => '2'
			));
			echo 'success';
		}else{
			echo '不能添加，请先设置打卡IP';
		}
	}
}