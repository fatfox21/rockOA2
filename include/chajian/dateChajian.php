<?php 
class dateChajian extends Chajian
{

	public function formatdt($dt='',$format='Y-m-d H:i:s')
	{
		return date($format,strtotime($dt));
	}

	/**
		计算时间间隔
	*/	
	public function datediff($type,$start,$end)
	{
		$time1 = strtotime($start);
		$time2 = strtotime($end);
		$val=0;
		switch($type){
			case 'Y'://年
				$Y1 = date('Y',$time1);
				$Y2 = date('Y',$time2);
				$val = $Y2 - $Y1;
			break;
			case 'm'://月份
				$y1 = date('Y',$time1);
				$y2 = date('Y',$time2);
				$m1 = date('m',$time1);
				$m2 = date('m',$time2);
				$y = $y1 - $y2;
				$mz = 0;
				if($y1 == $y2){
					$mz=$m2-$m1;
				}elseif($y1<$y2){
					$mz = 12-$m1+$m2+12*($y2-$y1-1);
				}else{
					$mz = -(12-$m2+$m1+12*($y1-$y2-1));
				}
				$val = $mz;
			break;
			case 'd'://日
				$dt1 = strtotime(date('Y-m-d',$time1));
				$dt2 = strtotime(date('Y-m-d',$time2));
				$time=$dt2-$dt1;
				$val = $time/3600/24;
			break;
			case 'H'://小时
				$time = $time2 - $time1;
				$val = floor($time/3600);
			break;
			case 'i'://分钟
				$time = $time2 - $time1;
				$val = floor($time/60);
			break;
			case 's'://秒
				$val = $time2 - $time1;
			break;
		}
		return $val;
	}
	
	/**
		时间计算添加
	*/
	public function adddate($dt,$lx,$v=0,$type='')
	{
		$time	= strtotime($dt);
		$arrn1	= explode(' ',$dt);
		$arrn	= explode('-',$arrn1[0]);
		$Y		= (int)$arrn[0];
		$m		= (int)$arrn[1];
		$d		= (int)$arrn[2];
		$H=$i=$s=0;
		if($this->contain($dt,':')){
			$arrn2	= explode(':',$arrn1[1]);
			$H		= (int)$arrn2[0];
			$i		= (int)$arrn2[1];
			$s		= (int)$arrn2[2];
		}
		$rval	= $dt;
		if($type=='')$type=($H==0)?'Y-m-d':'Y-m-d H:i:s';
		if($type=='datetime')$type='Y-m-d H:i:s';
		if($v ==0)return date($type, $time);
		switch($lx){
			case 'm'://月份
				$time	= mktime($H, $i, $s, $m+$v, $d, $Y);
			break;
			case 'Y'://年
				$time	= mktime($H, $i, $s, $m, $d, $Y+$v);
			break;
			case 'd'://日期
				$time	= mktime($H, $i, $s, $m, $d+$v, $Y);
			break;
			case 'H'://时
				$time	= mktime($H+$v, $i, $s, $m, $d, $Y);
			break;
			case 'i'://分
				$time	= mktime($H, $i+$v, $s, $m, $d, $Y);
			break;
			case 's'://秒
				$time	= mktime($H, $i, $s+$v, $m, $d, $Y);
			break;
		}
		$rval	= date($type,$time);
		return $rval;
	}
	
	//是否包含返回bool
	public function contain($str,$a)
	{
		return $this->rock->contain($str,$a);
	}
	
	//判断是否为空
	public function isempt($str)
	{
		return $this->rock->isempt($str);
	}	
	
	public function diffstr($start, $end, $str, $lx=0)
	{
		$time1 	= strtotime($start);
		$time2 	= strtotime($end);
		$sj		= $time1-$time2;
		if($lx==1 && $sj<=0)return '';
		return $this->sjdate($sj, $str);
	}
	
	public function sjdate($sj, $str='')
	{
		$h 	= $i = $s = $d = 0;
		$d 	= floor($sj/3600/24);
		$sj = $sj - $d * 3600 * 24;
		$h 	= floor($sj/3600);
		$sj = $sj - $h*3600;
		$i 	= floor($sj/60);
		$s  = $sj - $i * 60;
		$str = str_replace(array('d','H','i','s'),array($d,$h,$i,$s), $str);
		return $str;
	}
	
	public function isdate($dt)
	{
		$bo	= false;
		if($this->isempt($dt))return $bo;
		$arr	= explode('-', $dt);
		if(count($arr)>2)$bo = true;
		//preg_match("/^[0-9]{4}(-|/)[0-9]{1,2}(1)[0-9]{1,2}(|s+[0-9]{1,2}(:[0-9]{1,2}){0,2})$/", $dt);
		return $bo;
	}
	
	/**
		返回月份最大日期
	*/
	public function getenddt($month)
	{
		$max 	= $this->getmaxdt($month);
		return  ''.$month.'-'.$max.'';
	}
	
	public function getmaxdt($dt)
	{
		$d 	= explode('-', $dt);
		$m	= (int)$d[1];
		$y	= (int)$d[0];
		$a	= array(31,28,31,30,31,30,31,31,30,31,30,31);
		$d	= $a[$m-1];
		if($y%4 == 0 && $m==2 && $y%100 != 0)$d++;
		return $d;
	}
}                                                                                                                                                            