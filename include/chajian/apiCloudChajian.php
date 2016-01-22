<?php 
/**
	apiCloud推送
*/
class apiCloudChajian extends Chajian{
	
	private $AppID 		= 'AppID';
    private $AppKey 	= 'AppKey';
    private $AppPath 	= 'https://p.apicloud.com/api/push/message';
    private	$timeOut 	= 30;
        
	public function initChajian()
	{
		$this->headerInfo = array(
			'X-APICloud-AppId:'.$this->AppID,
			'X-APICloud-AppKey:'.$this->getSHAKey()
		);
	}
	
	//毫秒
	private function getMilliSecond()
	{
		list($s1, $s2) = explode(' ', microtime());
		return (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
	}
	
	private function getSHAKey()
	{
		$time = $this->getMilliSecond();
		return sha1($this->AppID.'UZ'.$this->AppKey.'UZ'.$time).'.'.$time;
	}

	private function pushtesmp($data)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_URL, $this->AppPath);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $this->headerInfo);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;        
	}
	
	/**
		type – 消息类型，1:消息 2:通知
	*/
	public function send($touid, $mess, $type=1)
	{
		$da = array(
			'userIds' 	=> $touid,
			'title'		=> TITLE,
			'content'	=> $mess,
			'type'		=> $type,
			'platform'	=> 2, //0:全部平台，1：ios, 2：android
		);
		return $this->pushtesmp($da);
	}
}  
/*
/测试
$test = new APICloud();

$data = array (
        'title' => '测试标题',
                'content' => '测试内容',
                'type' => 2,
                'timer' => '',
                'platform' => 2,
                'groupName' => '全部组',
);
print_r(json_decode($test->push($data)));

title–消息标题，
content – 消息内容
type – 消息类型，1:消息 2:通知
platform - 0:全部平台，1：ios, 2：android
groupName - 推送组名，多个组用英文逗号隔开.默认:全部组。eg.group1,group2 .
userIds - 推送用户id, 多个用户用英文逗号分隔，eg. user1,user2。

*/                                                                                                                                                          