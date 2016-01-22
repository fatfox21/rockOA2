<?php 
class dailyClassAction extends Action{
	
	public function publicstoreAfter($table, $rows)
	{
		$dt 	= c('date', true);
		$xiuv 	= explode(',', $this->option->getval('dailyset', '3,d'));
		$minv	= '';
		$date	= $this->date;
		$va		= (int)$xiuv[0]-1;
		if($xiuv[1]=='d'){
			$minv = $dt->adddate($date, 'd', 0-$va);
		}else{
			$minv = $this->getgognw($date, $va, $dt, m('kq_xiu'));
		}
		if($this->isempt($minv))$minv='';
		foreach($rows as $k=>$rs){
			$jg = $dt->datediff('d', $rs['dt'], $date);
			$s  = ''.$jg.'天前';
			if($jg == 1)$s = '昨天';
			if($jg == 2)$s = '前天';
			if($jg == 0)$s = '今天';
			$rows[$k]['week'] = '星期'.$this->rock->cnweek($rs['dt']).','.$s.'';
			$xiu	= 1;
			if($rs['dt']<$minv)$xiu=0;
			$rows[$k]['xiu'] = $xiu;
		}
		return array('rows'=>$rows,'minDate'=>$minv);
	}
	
	private function getgognw($dt, $v, $dobj, $xobj)
	{
		$dts = $this->getgognwa($dt, $dobj, $xobj);
		for($i=1; $i<=$v; $i++){
			$dts = $this->getgognwa($dobj->adddate($dts, 'd', -1), $dobj, $xobj);
		}
		return $dts;
	}
	private function getgognwa($dt, $dobj, $xobj)
	{
		if($xobj->rows("`date`='$dt'")>0){
			$dt = $this->getgognwa($dobj->adddate($dt, 'd', -1), $dobj, $xobj);
		}
		return $dt;
	}
	
	
	public function getdailyAjax()
	{
		$uid	= (int)$this->request('uid', '0');
		$mon	= $this->request('month');
		$arr	= m('daily')->dailyfenxi($uid, $mon);
		
		$rows	= $arr[$uid];
		$dtarr	= $arr[$uid]['dtarr'];
		$rsa	= $arr[$uid]['arr'];
		
		$rows	= array();
		foreach($dtarr as $dt=>$str){
			$tscs 	= explode('-', $dt);
			$i		= (int)$tscs[2];
			$rows[$i] = array(
				'str' 		=> '<font color='.$str[1].'>'.$str[0].'</font>'
			);
		}
		
		$rows[99] = '应写'.$rsa['totaly'].'次,已写'.$rsa['totalx'].'次,未写'.$rsa['totalw'].'次';
		echo json_encode($rows);
	}
	
	
	
	public function dailyafter($table, $cans, $id)
	{
		if($this->post('huitypePost')=='super'){
			$rows 	 		= m('daily')->getone($id);
			$rows['name'] 	= $rows['optname'];
			$superid = m('admin')->getmou('superid', $rows['uid']);
			m('email')->sendmail('dayreportemail', $superid, $rows);
		}
	}
}