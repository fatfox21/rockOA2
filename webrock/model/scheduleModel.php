<?php
class scheduleClassModel extends Model
{
	public function getdtwhere($dt, $uid)
	{
		$where	= "and `uid`='$uid' and  ((`startdt` like '$dt%' and `enddt` is null) or (`startdt`<='$dt 23:59:59' and `enddt` >='$dt 00:00:00')) ";
		return $where;
	}
	
	public function getdtarr($dt, $uid)
	{
		$where	= $this->getdtwhere($dt, $uid);
		$where  = "1 $where order by `startdt`";
		$rows 	= $this->getall($where, 'title,startdt,enddt,`explain`');
		return $rows;
	}
	
	public function updatecont($sid)
	{
		$rs	= $this->getone($sid);
		if(!$rs)return;
		$inner['title'] 	= $rs['title'];
		$inner['explain'] 	= $rs['explain'];
		$this->update($inner, "`mid`='$sid'");
	}
	
	public function addday($dt, $uid='', $aid='', $btype='')
	{
		$wherea = "and `mid`=0 and `uid`='$uid'";
		if($aid != '')$wherea.=" and `id`='$aid'";
		$rate	= c('rate', true);
		$rows	= $rate->result('schedule', $dt, $wherea);
		//写入到表里面
		$msid	= '0';
		$ssid	= '0';
		$rowsa	= array();	
		foreach($rows as $k=>$rs){
			$inner				= array(
				'title'	=> $rs['title']
			);
			$inner['startdt'] 	= $rs['runtime'];
			$inner['mid'] 		= $rs['mid'];
			$inner['uid'] 		= $rs['uid'];
			$inner['optdt'] 	= $this->rock->now;
			$inner['optname'] 	= $rs['optname'];
			$inner['explain'] 	= $rs['explain'];
			$rowsa[]			= $inner;
			
			if($btype == ''){
				$where	= "`mid`='".$rs['mid']."' and `startdt`='".$inner['startdt']."'";
				$sid	= (int)$this->getmou('id', $where);
				if($sid == 0)$where = '';
				$this->record($inner, $where);
				if($sid == 0)$sid = $this->db->insert_id();
				
				$ssid.=','.$sid.'';
				$msid.=','.$rs['mid'].'';
			}
		}  
		if($btype == '')$this->delete("`mid` in($msid) and id not in($ssid) and `mid`>0 and `uid`='$uid'");
		return $rowsa;
	}
	
	public function delsch($id)
	{
		$where = "`mid` in($id)";
		$this->db->delete('[Q]todo', "`table` ='schedule' and `mid` in(select `id` from `[Q]schedule` where $where)");
		$this->delete("( $where) or (`id` in($id) ) ");
	}
}