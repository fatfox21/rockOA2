<?php 
//访问方法?m=api&d=webim&a=onoffline&ajaxbool=true

class apiClassAction extends Action{
	
	
	/**
		上线下线更新
	*/
	public function onofflineAjax()
	{
		$uid	= (int)$this->request('uid');
		$online = (int)$this->request('online');
		m('admin')->update("`imonline`='$online',`imlastdt`='$this->now'", $uid);
		echo 'success';
	}

}