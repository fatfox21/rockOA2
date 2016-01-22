<?php
class gongClassModel extends Model
{
	public function getwdto($uid)
	{
		$s1 	= m('admin')->getjoinstr('faobjid', $uid);
		$s 		= 'and isshow=1 '.$s1.'';
		$sid 	= m('log')->getread('infor', $uid);
		$wyd 	= m('infor')->rows("`id` not in($sid) $s");
		return $wyd;
	}
}