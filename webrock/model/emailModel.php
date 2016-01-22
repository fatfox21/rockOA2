<?php
class emailClassModel extends Model
{
	/**
		发送邮件
		$num 模版编号
		$to_uid 发送给。。。
		$rows内容
	*/
	public function sendmail($num, $to_uid, $rows, $test=0)
	{
		$bo 	= false;
		$teprs	= $this->db->getone('[Q]email_tpl', "`num`='$num'");
		if(!$teprs)return $bo;
		
		$setrs	= $this->getone($teprs['setid']);
		if(!$setrs)return $bo;
		
		$body	= $teprs['content'];
		$title	= $teprs['title'];
		$secure	= $this->rock->repempt($setrs['secure']);
		
		$to_em	= '';
		$to_mn	= '';
		
		$urs	= $this->db->getall("select `email`,`name` from `[Q]admin` where `id` in($to_uid) and `email` is not null order by `sort`");
		foreach($urs as $k=>$rs){
			$to_em.=','.$rs['email'];
			$to_mn.=','.$rs['name'];
		}	
		
		if($this->isempt($to_em))return $bo;
		
		$to_em	= substr($to_em, 1);
		$to_mn	= substr($to_mn, 1);
		if($test == 0){
			$body	= $this->rock->reparr($body, $rows);
			$title	= $this->rock->reparr($title, $rows);
			if(isset($rows['send_content']))$body = $rows['send_content'];
			if(isset($rows['send_title']))$title = $rows['send_title'];
		}	
		$body	= str_replace("\n", '<br>', $body);
		$pass	= $this->rock->jm->uncrypt($setrs['emailpass']);
		
		$mail	= c('mailer', true);
		$mail->setHost($setrs['serversmtp'], $setrs['serverport'], $secure);
		$mail->setUser($setrs['emailname'], $pass);
		$mail->setFrom($setrs['emailname'], $setrs['name']);
		$mail->addAddress($to_em, $to_mn);
		$mail->sendMail($title, $body);
		$bo		= $mail->isSuccess();
		return $bo;
	}
	
	public function sendmail_test($num)
	{
		return $this->sendmail($num, $this->adminid, array(), 1);
	}
	
	
	/**
		统计未读邮件
	*/
	
}