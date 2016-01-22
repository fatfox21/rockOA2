<?php
class userinforClassAction extends Action
{
	//合同的
	public function contractuserbeifre($tables)
	{
		$protype	= (int)$this->post('protype','0');
		$where 		= "and a.atype='ract'";
		$dts 		= '';
		if($protype==1){
			$dts = c('date', true)->adddate($this->date,'d',30);
		}
		if($protype==2){
			$dts = c('date', true)->adddate($this->date,'d',7);
		}
		if($protype==3){
			$dts = c('date', true)->adddate($this->date,'d',3);
		}
		
		if($dts!='')$where.=" and a.`enddt`>='$this->date' and a.`enddt`<='$dts'";
		
		if($protype==4){
			$where.=" and a.`enddt`<'$this->date'";
		}
		$tabs = "[Q]userjl a left join [Q]admin b on a.uid=b.id ";
		$fields = 'a.startdt,a.id,a.enddt,a.explain,b.deptname,b.name,a.optdt,a.uid,a.httype,a.tqenddt,a.state,a.company';
		return array(
			'table'  =>$tabs,
			'fields'	=>$fields,
			'order'		=>'a.startdt desc',
			'where'		=> $where
		);
	}
	
	public function loadinforAjax()
	{
		$id 	= $this->rock->request('id');
		$rows	= m('admin')->getone($id);
		$arr	= array(
			'data' => $rows,
			'work'	=> m('userjl')->getall("`atype`='work' and `uid`='$id' order by `startdt` asc"),
			'edu'	=> m('userjl')->getall("`atype`='edu' and `uid`='$id' order by `startdt` asc")
		);
		echo json_encode($arr);
	}
	
	public function loadinforjlAjax()
	{
		$id 	= $this->rock->request('id');
		$atype 	= $this->rock->request('atype');
		$arr = m('userjl')->getall("`atype`='$atype' and `uid`='$id' order by `startdt` asc");
		echo json_encode($arr);
	}
	
	public function fxAjax()
	{
		$type 	= $this->post('type');
		$dt 	= $this->post('dt');
		$db		= m('admin');
		$where	= 'and state<>5';
		if($dt !=''){
			$where = "and ((state<>5 and workdate<='$dt') or (state=5 and workdate<='$dt' and  quitdt>'$dt'))";
		}
		$rows	= $db->getall("id>0 $where",'deptname,gender,xueli,state,birthday,workdate,quitdt,ranking');
		
		$nianls	= array(
			array(0,'16-20岁',16,20),
			array(0,'21-25岁',21,25),
			array(0,'26-30岁',26,30),
			array(0,'31-40岁',31,40),
			array(0,'41岁以上',41,9999),
			array(0,'其他',-555,15),
		);
		
		$yearls	= array(
			array(0,'1年以下',0,1),
			array(0,'1-3年',1,3),
			array(0,'3-5年',3,5),
			array(0,'5-10年',5,10),
			array(0,'10年以上',10,9999)
		);
		
		$atatea = explode(',', ',正式员工,试用期,实习生,兼职,离职员工');
		foreach($rows as $k=>$rs){
			$year = '';
			if(!$this->isempt($rs['workdate'])) $year = substr($rs['workdate'],0,4);
			$rows[$k]['year'] = $year;
			
			$lian	= $this->jsnianl($rs['birthday']);
			foreach($nianls as $n=>$nsa){
				if( $lian >= $nsa[2]  && $lian <= $nsa[3]){
					$rows[$k]['nian'] = $nsa[1];
					break;
				}
			}
			
			$state = (int)$rs['state'];
			$rows[$k]['state'] = $atatea[$state];
			
			//入职连
			$nan = $this->worknx($rs['workdate']);
			foreach($yearls as $n=>$nsa){
				if( $nan >= $nsa[2]  && $nan < $nsa[3]){
					$rows[$k]['nianxian'] = $nsa[1];
					break;
				}
			}
		}
		
		$arr 	= array();
		$total 	= $this->db->count;
		foreach($rows as $k=>$rs){
			$val = $rs[$type];
			if($this->isempt($val))$val = '其他';
			if(!isset($arr[$val]))$arr[$val]=0;
			$arr[$val]++;
		}	
		
		$a		= array();
		foreach($arr as $k=>$v){
			$a[] = array(
				'name'	=> $k,
				'value'	=> $v,
				'bili'	=> ($this->rock->number($v/$total*100)).'%'
			);
		}
		echo  json_encode(array(
			'rows' => $a,
			'totalCount' => $total
		));
	}
	
	private function jsnianl($dt)
	{
		$nY	= date('Y')+1;
		$lx	= 0;
		if(!$this->isempt($dt) && !$this->contain($dt, '0000')){
			$ss		= explode('-', $dt);
			$saa	= (int)$ss[0];
			$lx		= $nY - $saa;
		}
		return $lx	;
	}
	
	//计算工作年限的
	private function worknx($dt)
	{
		$w = 0;
		if(!$this->isempt($dt) && !$this->contain($dt, '0000')){
			$startt		= strtotime($dt);
			$date 		= date('Y-m-d');
			$endtime	= strtotime($date);
			$w			= (int)(($endtime - $startt) / (24*3600) / 365);
		}
		return $w;
	}
}