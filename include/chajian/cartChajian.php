<?php 
/*购物车插件*/
class cartChajian extends Chajian
{
	/**
		获取购物车商品编号，返回(商品=>数量,商品编号)
	*/
	public function getcart(){
		$ddinfor	= $this->rock->cookie(QOM.'ddinfor');
		$ddstr		= "'0'";
		$ddstr1		= "0";
		$ddarr		= explode('|', $ddinfor);
		$_ddprs		= array();
		$shul		= 0;
		if($ddinfor != ''){
			foreach($ddarr as $dstr){
				$dstrs	= explode('_', $dstr);
				$ddstr.=",'$dstrs[0]'";
				$_ddprs[$dstrs[0]]	= $dstrs[1]; 
				$shul++;
			}
		}
		
		return array($_ddprs, $ddstr, $shul);
	}
	
	/**
		添加到购物车[商品编号_数量]
	*/
	public function addcart($nums)
	{
		if($this->rock->isempt($nums))return;
		$bases		= explode('_', $nums);
		$ddstr		= '';
		$arr		= $this->getcart();
		foreach($arr[0] as $k1=>$sl){
			if($k1 != $bases[0]){
				$ddstr.='|'.$k1.'_'.$sl.'';
			}
		}
		$ddstr.='|'.$nums.'';
		$ddstr	= substr($ddstr, 1);
		$this->rock->savecookie(QOM.'ddinfor', $ddstr);//保存cookie是
	}
	
	/**
		删除购物车,$num编号
	*/
	public function delcart($num)
	{
		if($this->rock->isempt($num))return;
		$ddstr		= '';
		$arr		= $this->getcart();
		foreach($arr[0] as $k1=>$sl){
			if($k1 != $num){
				$ddstr.='|'.$k1.'_'.$sl.'';
			}
		}
		if($ddstr != '')$ddstr	= substr($ddstr, 1);
		$this->rock->savecookie(QOM.'ddinfor', $ddstr);//保存cookie是
	}
	
	//更新
	public function updatecart($nums)
	{
		$this->addcart($nums);
	}
	
	//清空购物车
	public function clearcart()
	{
		$this->rock->clearcookie(QOM.'ddinfor');
	}
	
	//创建订单号
	public function createnum()
	{
		$num	= '456'.rand(1000000, 9999999).'';
		if(m('web_indent')->rows("`ddnum`='$num'")>0){
			$num = $this->createnum();
		}
		return $num;
	}
}                                                                                                                                                            