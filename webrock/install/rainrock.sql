/*
Navicat MySQL Data Transfer

Source Server         : rock本地
Source Server Version : 50530
Source Host           : localhost:3306
Source Database       : rockoa

Target Server Type    : MYSQL
Target Server Version : 50530
File Encoding         : 65001

Date: 2016-01-21 23:27:12
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `rock_admin`
-- ----------------------------
DROP TABLE IF EXISTS `rock_admin`;
CREATE TABLE `rock_admin` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) DEFAULT NULL COMMENT '用户名',
  `nicheng` varchar(50) DEFAULT NULL COMMENT '@昵称',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `pass` varchar(50) DEFAULT NULL,
  `adddt` datetime DEFAULT NULL,
  `loginci` smallint(6) DEFAULT '0',
  `lastbendt` datetime DEFAULT NULL,
  `lastdt` datetime DEFAULT NULL COMMENT '最后登录',
  `lastbenip` varbinary(30) DEFAULT NULL,
  `lastip` varchar(30) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1' COMMENT '状态@0|停用,1|启用',
  `gender` varchar(5) DEFAULT NULL COMMENT '性别@男,女',
  `tel` varchar(50) DEFAULT NULL COMMENT '电话',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `optdt` datetime DEFAULT NULL,
  `optname` varchar(30) DEFAULT NULL COMMENT '操作人',
  `optid` int(11) DEFAULT NULL,
  `face` varchar(100) DEFAULT NULL,
  `style` varchar(30) DEFAULT NULL,
  `type` tinyint(4) DEFAULT '0' COMMENT '类型@0不能登录后台,1|可登录后台',
  `mibao` varchar(50) DEFAULT NULL,
  `mibaodaan` varchar(50) DEFAULT NULL,
  `jifen` int(11) DEFAULT '0' COMMENT '@积分',
  `ranking` varchar(50) DEFAULT NULL COMMENT '职位',
  `deptid` smallint(4) DEFAULT '0',
  `deptpath` varchar(50) DEFAULT NULL,
  `deptname` varchar(50) DEFAULT NULL COMMENT '部门名称',
  `superman` varchar(50) DEFAULT NULL COMMENT '上级主管',
  `superid` varchar(50) DEFAULT NULL,
  `superpath` varchar(50) DEFAULT NULL,
  `sort` smallint(6) DEFAULT '0' COMMENT '@排序号',
  `zhiwen` varchar(10) DEFAULT NULL COMMENT '指纹号',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `idnum` varchar(35) DEFAULT NULL COMMENT '身份证号',
  `homepage` varchar(50) DEFAULT NULL COMMENT '个人主页',
  `housetel` varchar(50) DEFAULT NULL COMMENT '家庭电话',
  `biyephoto` varchar(100) DEFAULT NULL COMMENT '@毕业证书图片',
  `xueweiphoto` varchar(100) DEFAULT NULL COMMENT '@学位图片',
  `houseaddress` varchar(100) DEFAULT NULL COMMENT '家庭地址',
  `nowaddress` varchar(100) DEFAULT NULL COMMENT '现在地址',
  `housecode` varchar(6) DEFAULT NULL COMMENT '邮编',
  `nowcode` varchar(6) DEFAULT NULL,
  `jinname` varchar(10) DEFAULT NULL COMMENT '紧急联系人',
  `jintel` varchar(50) DEFAULT NULL COMMENT '紧急人电话',
  `minzu` varchar(5) DEFAULT NULL COMMENT '民族',
  `xueli` varchar(5) DEFAULT NULL COMMENT '学历',
  `hunyin` varchar(5) DEFAULT NULL COMMENT '婚姻',
  `mobile` varchar(50) DEFAULT NULL COMMENT '手机号',
  `hkaddress` varchar(100) DEFAULT NULL COMMENT '户口地址',
  `workdate` date DEFAULT NULL COMMENT '入职时间',
  `positivedt` date DEFAULT NULL COMMENT '转正日期',
  `syenddt` date DEFAULT NULL COMMENT '试用到期日',
  `zhuanye` varchar(50) DEFAULT NULL COMMENT '专业',
  `school` varchar(50) DEFAULT NULL COMMENT '毕业学校',
  `aihao` varchar(200) DEFAULT NULL COMMENT '爱好',
  `shengao` varchar(20) DEFAULT NULL COMMENT '身高',
  `tizhong` varchar(20) DEFAULT NULL COMMENT '体重',
  `qq` varchar(50) DEFAULT NULL COMMENT 'QQ',
  `finge` varchar(20) DEFAULT NULL COMMENT '指纹号',
  `state` tinyint(1) DEFAULT '2' COMMENT '人员状态@1|正式员工,2|试用期,3|实习生,4|兼职,5|离职员工',
  `bydate` date DEFAULT NULL COMMENT '毕业时间',
  `groupname` varchar(50) DEFAULT NULL COMMENT '所在组',
  `quitdt` date DEFAULT NULL COMMENT '离职日期',
  `isdaily` tinyint(1) DEFAULT '1' COMMENT '写工作日报@0|不用写,1|要写',
  `isvcard` tinyint(1) DEFAULT '1' COMMENT '通讯录显示@0|不显示,1|显示',
  `homeitems` varchar(200) DEFAULT NULL COMMENT '@首页项目',
  `jiguan` varchar(20) DEFAULT NULL COMMENT '籍贯',
  `workdt` date DEFAULT NULL COMMENT '参加工作时间',
  `xuexing` varchar(10) DEFAULT NULL COMMENT '血型',
  `zzmianmao` varchar(10) DEFAULT NULL COMMENT '政治面貌',
  `imonline` tinyint(4) DEFAULT '0' COMMENT '@是否在线',
  `imlastdt` datetime DEFAULT NULL COMMENT '@最后上线',
  `deviceid` varchar(100) DEFAULT NULL COMMENT '@APP登录设备',
  `applastdt` datetime DEFAULT NULL,
  `iswx` tinyint(1) DEFAULT '0' COMMENT '是否绑定微信',
  `companyid` smallint(6) DEFAULT '0' COMMENT '所属公司',
  `weixinid` varchar(50) DEFAULT NULL COMMENT '微信号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_admin
-- ----------------------------
INSERT INTO `rock_admin` VALUES ('1', 'admin', '雨中磐石', '管理员', 'e10adc3949ba59abbe56e057f20f883e', null, '51', '2014-09-11 09:32:20', '2016-01-21 22:59:47', 0x3132372E302E302E31, '127.0.0.1', '1', '男', '1582233', 'admin@rockoa.com', '2015-12-28 23:06:11', '管理员', '1', 'upload/2015-08/1440578146698_4091.jpg', '1', '1', '我的英文名是？', 'rainrock', '511', 'OA项目经理', '4', '[1],[4]', '开发部', '刘备', '7', '[7]', '0', null, '1988-12-02', null, null, null, null, null, '厦门', '厦门', null, null, '管理员', '10086', '汉族', '中专', null, '15800000', '厦门', '2015-01-01', '2015-08-15', '2015-08-01', '计算机', null, null, null, null, null, '1', '1', null, '系统管理员', null, '1', '1', null, null, '2015-01-01', 'B型', '党员', '0', '2016-01-02 17:19:08', '867112020521204', '2016-01-12 21:08:43', '1', '1', null);
INSERT INTO `rock_admin` VALUES ('2', 'chenxihu', '风雨中小草', '陈稀糊', 'e10adc3949ba59abbe56e057f20f883e', null, '0', '2014-09-11 09:25:21', '2015-10-28 13:40:36', 0x3132372E302E302E31, '127.0.0.1', '1', '男', null, 'admin@rockoa.com', '2015-08-20 17:16:36', '管理员', '1', null, null, '1', null, null, '51', '程序员', '4', '[1],[4]', '开发部', '管理员', '1', '[7],[1]', '21', null, '1993-12-16', null, null, null, null, null, null, null, null, null, null, null, '汉族', '大专', null, null, null, '2014-12-09', null, null, null, null, null, null, null, null, '2', '1', null, '系统管理员', null, '1', '1', null, null, null, null, null, '0', '2015-08-14 09:53:23', '867112020521204', '2015-10-23 09:32:28', '0', '0', null);
INSERT INTO `rock_admin` VALUES ('3', 'diaochan', null, '貂蝉', 'e10adc3949ba59abbe56e057f20f883e', null, '4', null, '2015-12-30 21:56:36', null, '127.0.0.1', '1', '女', '0592-222', 'diaochan@rockoa.com', '2015-10-21 17:11:35', '管理员', '1', 'upload/2015-08/02_2246506417_crop8455.jpg', null, '1', null, null, '0', '人事经理', '3', '[1],[3]', '行政人事', '大乔', '4', '[7],[4]', '11', null, '1987-11-22', '36555', null, '0595-', null, null, '三国', '三国时期', null, null, '吕布', '10085', '回民', '博士后', '未婚', '1580000', '三国户口', '2014-12-02', null, null, null, null, null, null, null, '222', null, '2', null, null, null, '1', '1', null, null, '2015-04-28', 'A型', '群众', '0', '2016-01-04 23:08:08', '867112020521204', '2016-01-05 20:03:16', '0', '0', null);
INSERT INTO `rock_admin` VALUES ('4', 'daqiao', null, '大乔', 'e10adc3949ba59abbe56e057f20f883e', null, '1', null, '2016-01-21 19:01:47', null, '127.0.0.1', '1', '女', null, 'daqiao@rockoa.com', '2015-11-22 20:52:20', '管理员', '1', null, null, '1', null, null, '0', '行政主管', '3', '[1],[3]', '行政人事', '刘备', '7', '[7]', '10', null, '1968-01-01', null, null, null, null, null, null, null, null, null, null, null, '汉族', '初中', null, null, null, '2015-01-19', null, null, null, null, null, null, null, null, null, '1', null, null, null, '1', '1', null, null, null, null, null, '0', '2015-12-12 12:51:10', '867112020521204', '2016-01-20 19:21:40', '0', '0', null);
INSERT INTO `rock_admin` VALUES ('5', 'xiaoqiao', null, '小乔', 'e10adc3949ba59abbe56e057f20f883e', null, '0', null, '2015-11-30 19:43:18', null, '127.0.0.1', '1', '女', null, 'xiaoqiao@rockoa.com', '2015-01-24 00:14:05', '管理员', '1', 'upload/2015-08/30_1448539797_crop9267.jpg', null, '1', null, null, '0', '行政前台', '3', '[1],[3]', '行政人事', '貂蝉', '3', '[7],[4],[3]', '12', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2014-12-01', null, null, null, null, null, null, null, null, null, '1', null, '组名', null, '1', '1', null, null, null, null, null, '0', '2015-10-12 10:51:29', '867112020521204', '2016-01-07 22:08:13', '0', '0', null);
INSERT INTO `rock_admin` VALUES ('6', 'liu1', null, '刘长', 'e10adc3949ba59abbe56e057f20f883e', null, '0', null, '2015-02-05 22:36:31', null, '127.0.0.1', '1', '男', null, null, '2015-02-05 13:25:16', '管理员', '1', null, null, '1', null, null, '0', '程序员', '4', '[1],[4]', '开发部', '陈稀糊', '2', '[7],[1],[2]', '22', null, '1990-02-01', null, null, null, null, null, null, null, null, null, null, null, '汉族', '本科', null, null, null, '2015-02-05', null, null, null, null, null, null, null, null, null, '5', null, null, '2015-02-28', '1', '1', null, null, null, null, null, '0', null, null, null, '0', '0', null);
INSERT INTO `rock_admin` VALUES ('7', 'liubei', null, '刘备', 'e10adc3949ba59abbe56e057f20f883e', '2015-01-06 13:40:48', '2', null, '2016-01-06 19:19:33', null, '127.0.0.1', '1', '男', '12', 'liubei@rockoa.com', '2015-12-28 23:00:02', '管理员', '1', null, '3', '1', null, null, '0', '董事长', '7', '[1],[7]', '管理部', null, null, null, '1', null, '1991-09-17', null, null, null, null, null, null, null, null, null, null, null, '回民', '初中', null, null, null, '2015-02-05', null, null, null, null, null, null, null, null, '3', '1', null, null, null, '1', '1', 'daib,gong|zxkq,work,todo', null, null, null, null, '0', '2015-08-19 14:41:20', '867112020521204', '2015-12-29 21:53:43', '0', '1', null);
INSERT INTO `rock_admin` VALUES ('8', 'zhangfei', null, '张飞', 'e10adc3949ba59abbe56e057f20f883e', '2015-02-06 09:41:01', '0', null, '2015-05-08 21:08:15', null, '127.0.0.1', '1', '男', null, 'chenxihu@rockoa.com', '2015-02-06 09:41:01', '管理员', '1', null, null, '1', null, null, '0', '程序员', '4', '[1],[4]', '开发部', '管理员', '1', '[7],[1]', '23', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2015-02-06', null, null, null, null, null, null, null, null, null, '2', null, null, null, '1', '1', null, null, null, null, null, '0', '2015-05-29 21:44:58', null, null, '0', '0', null);
INSERT INTO `rock_admin` VALUES ('9', 'zhaozl', null, '赵子龙', 'e10adc3949ba59abbe56e057f20f883e', '2015-02-06 09:44:39', '0', null, '2015-10-27 11:22:29', null, '127.0.0.1', '1', '男', null, 'zhaozl@rockoa.com', '2015-08-20 17:17:50', '管理员', '1', null, null, '1', null, null, '0', '财务经理', '6', '[1],[6]', '财务部', '管理员', '1', '[7],[1]', '24', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2015-02-06', null, null, null, null, null, null, null, null, null, '1', null, null, null, '1', '1', null, null, null, null, null, '1', '2016-01-05 22:57:13', '867112020521204', '2015-10-23 10:30:37', '0', '0', null);
INSERT INTO `rock_admin` VALUES ('10', 'lvbu', null, '吕布', 'e10adc3949ba59abbe56e057f20f883e', '2015-08-02 00:03:12', '0', null, '2015-10-10 13:43:38', null, '127.0.0.1', '1', '男', null, 'lvbu@rockoa.com', '2015-08-20 17:17:33', '管理员', '1', null, null, '1', null, null, '0', '出纳', '6', '[1],[6]', '财务部', '赵子龙', '9', '[7],[1],[9]', '25', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '158***', null, '2015-08-01', null, null, null, null, null, null, null, null, null, '2', null, null, null, '1', '1', null, null, null, null, null, '0', null, '867112020521204', '2015-10-22 17:13:20', '0', '0', null);

-- ----------------------------
-- Table structure for `rock_assetm`
-- ----------------------------
DROP TABLE IF EXISTS `rock_assetm`;
CREATE TABLE `rock_assetm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(50) DEFAULT NULL COMMENT '类别',
  `title` varchar(50) DEFAULT NULL COMMENT '名称',
  `num` varchar(20) DEFAULT NULL COMMENT '编号',
  `brand` varchar(20) DEFAULT NULL COMMENT '品牌',
  `model` varchar(100) DEFAULT NULL COMMENT '规格型号',
  `laiyuan` varchar(50) DEFAULT NULL COMMENT '来源',
  `shuname` varchar(50) DEFAULT NULL COMMENT '所属部门',
  `dt` date DEFAULT NULL COMMENT '日期',
  `address` varchar(50) DEFAULT NULL COMMENT '存放地点',
  `state` varchar(20) DEFAULT NULL COMMENT '状态',
  `remark` varchar(1000) DEFAULT NULL COMMENT '备注',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `adddt` datetime DEFAULT NULL COMMENT '添加时间',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `buydt` date DEFAULT NULL COMMENT '购进日期',
  `price` decimal(10,0) DEFAULT NULL COMMENT '价格',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_assetm
-- ----------------------------
INSERT INTO `rock_assetm` VALUES ('1', '电脑', '13', 'DN-0001', '联想', '12', '购入', null, null, '仓库一', '已报废', '报废啦？1', '管理员', '2015-04-13 16:34:49', '2015-11-21 18:20:10', '2015-10-30', '6000');
INSERT INTO `rock_assetm` VALUES ('2', '笔记本', '2112', 'BJB-0001', '联想', 'M300', '购入', null, null, '仓库二', '维修中', '2121', '管理员', '2015-04-13 16:52:33', '2015-06-30 17:32:41', null, null);
INSERT INTO `rock_assetm` VALUES ('3', '笔记本', '笔记本', 'BJB-0002', '戴尔', null, '自建', null, null, '仓库二', '借出', '哈哈', '管理员', '2015-04-13 17:03:52', '2015-06-30 17:32:49', null, null);
INSERT INTO `rock_assetm` VALUES ('4', '笔记本', '这是不笔记本', 'BJB-0003', 'dell', 'I5 60G内存', '购入', null, null, '仓库一', '闲置', '呵呵', '管理员', '2015-04-14 11:08:51', '2015-07-13 20:09:24', null, null);

-- ----------------------------
-- Table structure for `rock_assets`
-- ----------------------------
DROP TABLE IF EXISTS `rock_assets`;
CREATE TABLE `rock_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL COMMENT '主id',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `state` varchar(20) DEFAULT NULL COMMENT '状态',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_assets
-- ----------------------------
INSERT INTO `rock_assets` VALUES ('1', '1', '管理员', '2015-04-14 10:29:30', '已报废', 'hahaha');
INSERT INTO `rock_assets` VALUES ('2', '1', '管理员', '2015-04-14 10:37:45', '已报废', '233232');
INSERT INTO `rock_assets` VALUES ('3', '2', '管理员', '2015-04-14 10:47:21', '借出', '借给了刘备');
INSERT INTO `rock_assets` VALUES ('4', '2', '管理员', '2015-04-14 10:47:56', '闲置', '刘备已归还，现在闲置');
INSERT INTO `rock_assets` VALUES ('5', '2', '管理员', '2015-04-14 10:59:41', '维修中', '坏掉了，去修了');
INSERT INTO `rock_assets` VALUES ('6', '3', '管理员', '2015-10-30 09:45:07', '借出', '借给了程序员');

-- ----------------------------
-- Table structure for `rock_careserve`
-- ----------------------------
DROP TABLE IF EXISTS `rock_careserve`;
CREATE TABLE `rock_careserve` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  `useid` varchar(200) DEFAULT NULL,
  `usename` varchar(200) DEFAULT NULL COMMENT '使用者',
  `useren` smallint(6) DEFAULT '0' COMMENT '使用人数',
  `startdt` datetime DEFAULT NULL COMMENT '开始时间',
  `enddt` datetime DEFAULT NULL COMMENT '截止时间',
  `address` varchar(50) DEFAULT NULL COMMENT '目的地',
  `carid` smallint(6) DEFAULT NULL,
  `carnum` varchar(10) DEFAULT NULL COMMENT '使用车辆',
  `xianlines` varchar(200) DEFAULT NULL COMMENT '线路',
  `jiaid` varchar(200) DEFAULT NULL,
  `jianame` varchar(200) DEFAULT NULL COMMENT '驾驶员',
  `kmstart` varchar(20) DEFAULT NULL COMMENT '起始公里数',
  `kmend` varchar(20) DEFAULT NULL COMMENT '结束公里数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_careserve
-- ----------------------------
INSERT INTO `rock_careserve` VALUES ('1', '1', '2015-09-23 16:54:19', '1', '管理员', '2015-09-23', '呵呵呵呵', '1', '1', null, '7,5', '1', '小乔', null, 'u4,u3', '大乔,貂蝉', '0', '2015-09-23 15:00:00', '2015-09-23 16:00:00', '漳州', '2', '闽D·123456', 'G15-S30', '1', '管理员', null, null);
INSERT INTO `rock_careserve` VALUES ('2', '1', '2015-09-23 16:54:08', '1', '管理员', '2015-09-23', null, '1', '1', null, '7,5', '1', '小乔', null, 'u4,u3', '大乔,貂蝉', '2', '2015-09-25 15:30:00', '2015-09-25 16:13:00', '安溪', '2', '闽D·123456', '同安S206', '4,3', '大乔,貂蝉', null, null);

-- ----------------------------
-- Table structure for `rock_carm`
-- ----------------------------
DROP TABLE IF EXISTS `rock_carm`;
CREATE TABLE `rock_carm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carnum` varchar(10) DEFAULT NULL COMMENT '车牌号',
  `carbrand` varchar(20) DEFAULT NULL COMMENT '车辆品牌',
  `carmode` varchar(30) DEFAULT NULL COMMENT '型号',
  `cartype` varchar(10) DEFAULT NULL COMMENT '车辆类型',
  `buydt` date DEFAULT NULL COMMENT '购买日期',
  `buyprice` mediumint(9) DEFAULT NULL COMMENT '购买价格',
  `enginenb` varchar(50) DEFAULT NULL COMMENT '发动机号',
  `ispublic` tinyint(4) DEFAULT '1' COMMENT '是否公开使用',
  `optdt` datetime DEFAULT NULL,
  `optid` smallint(6) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL,
  `adddt` datetime DEFAULT NULL,
  `addname` varchar(20) DEFAULT NULL,
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `state` varchar(20) DEFAULT NULL COMMENT '状态',
  `framenum` varchar(50) DEFAULT NULL COMMENT '车架号',
  `qxstartdt` date DEFAULT NULL COMMENT '强险开始日期',
  `qxenddt` date DEFAULT NULL COMMENT '强险截止日期',
  `xszstartdt` date DEFAULT NULL COMMENT '行驶证开始日期',
  `xszenddt` date DEFAULT NULL COMMENT '行驶证截止日期',
  `syxstartdt` date DEFAULT NULL COMMENT '商业险开始日期',
  `syxenddt` date DEFAULT NULL COMMENT '商业险截止日期',
  `nsstartdt` date DEFAULT NULL COMMENT '年审开始日期',
  `nsenddt` date DEFAULT NULL COMMENT '年审截止日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_carm
-- ----------------------------
INSERT INTO `rock_carm` VALUES ('1', '闽D·123QB', '夏利', 'N7', '小型车', '2015-09-01', '20000', '不知道', '1', '2015-10-21 17:20:38', '1', '管理员', '2015-09-16 10:51:56', '管理员', null, '可用', null, '2015-09-01', null, null, '2016-08-31', null, null, null, null);
INSERT INTO `rock_carm` VALUES ('2', '闽D·123456', '奥迪', 'A4L', '面包车', '2015-01-01', '20000', null, '1', '2015-09-17 09:54:49', '1', '管理员', '2015-09-17 09:54:49', '管理员', null, '可用', '123', null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `rock_cars`
-- ----------------------------
DROP TABLE IF EXISTS `rock_cars`;
CREATE TABLE `rock_cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL COMMENT '主id',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `fields` varchar(20) DEFAULT NULL,
  `fieldsname` varchar(20) DEFAULT NULL COMMENT '字段名',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `value` varchar(500) DEFAULT NULL COMMENT '对应值',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_cars
-- ----------------------------
INSERT INTO `rock_cars` VALUES ('1', '1', '管理员', '2015-09-16 15:33:02', 'state', '状态', '废了', '报废');
INSERT INTO `rock_cars` VALUES ('5', '1', '管理员', '2015-09-17 09:49:22', 'jymoney', '加油费', null, '50');
INSERT INTO `rock_cars` VALUES ('3', '1', '管理员', '2015-09-16 15:40:33', 'state', '状态', '嘿嘿', '报废');
INSERT INTO `rock_cars` VALUES ('4', '1', '管理员', '2015-09-16 15:46:40', 'qxstartdt', '强险开始日期', null, '2015-09-01');
INSERT INTO `rock_cars` VALUES ('6', '1', '管理员', '2015-09-24 10:43:35', 'state', '状态', null, '可用');
INSERT INTO `rock_cars` VALUES ('7', '1', '管理员', '2015-09-24 10:43:50', 'xszenddt', '行驶证截止日期', null, '2016-08-31');

-- ----------------------------
-- Table structure for `rock_chargemode`
-- ----------------------------
DROP TABLE IF EXISTS `rock_chargemode`;
CREATE TABLE `rock_chargemode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modeid` smallint(6) DEFAULT NULL,
  `modename` varchar(20) DEFAULT NULL,
  `installdt` datetime DEFAULT NULL,
  `installkey` varchar(100) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL,
  `updatedt` datetime DEFAULT NULL,
  `ver` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `modeid` (`modeid`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_chargemode
-- ----------------------------
INSERT INTO `rock_chargemode` VALUES ('68', '4', '模块安装升级', '2016-01-20 21:24:45', 'NGJlYzk0NGJhZGZlMmM0YzU3YzVmZTI2ZWU0NTZiNWY:', '管理员', '2016-01-15 20:23:43', '0');

-- ----------------------------
-- Table structure for `rock_chargemodes`
-- ----------------------------
DROP TABLE IF EXISTS `rock_chargemodes`;
CREATE TABLE `rock_chargemodes` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `mid` smallint(6) DEFAULT NULL,
  `updatedt` datetime DEFAULT NULL,
  `fid` int(11) DEFAULT NULL,
  `adddt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_chargemodes
-- ----------------------------
INSERT INTO `rock_chargemodes` VALUES ('41', '4', '2016-01-16 18:42:35', '6', '2016-01-20 21:24:45');
INSERT INTO `rock_chargemodes` VALUES ('42', '4', '2016-01-16 18:42:35', '7', '2016-01-20 21:24:45');
INSERT INTO `rock_chargemodes` VALUES ('43', '4', '2016-01-16 18:42:35', '8', '2016-01-20 21:24:45');

-- ----------------------------
-- Table structure for `rock_company`
-- ----------------------------
DROP TABLE IF EXISTS `rock_company`;
CREATE TABLE `rock_company` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL COMMENT '公司名称',
  `sort` smallint(6) DEFAULT '0',
  `chargename` varchar(100) DEFAULT NULL COMMENT '负责人',
  `chargeid` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL COMMENT '地址',
  `optdt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_company
-- ----------------------------
INSERT INTO `rock_company` VALUES ('1', 'RockOA开发团队', '0', '管理员', '1', '厦门思明区软件园', '2015-12-28 23:22:56');

-- ----------------------------
-- Table structure for `rock_daily`
-- ----------------------------
DROP TABLE IF EXISTS `rock_daily`;
CREATE TABLE `rock_daily` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dt` date DEFAULT NULL COMMENT '日期',
  `content` varchar(4000) DEFAULT NULL COMMENT '内容',
  `adddt` datetime DEFAULT NULL COMMENT '新增时间',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `uid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '姓名',
  `type` tinyint(1) DEFAULT '0' COMMENT '类型@0|日报,1|周报,2|月报,3|年报',
  `plan` varchar(2000) DEFAULT NULL COMMENT '明日计划',
  `status` tinyint(1) DEFAULT '0',
  `enddt` date DEFAULT NULL,
  `optid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_daily
-- ----------------------------
INSERT INTO `rock_daily` VALUES ('2', '2015-03-16', '今天好无聊啊，哈哈哈！', '2015-03-16 13:43:12', '2015-03-16 13:43:12', '2', '陈稀糊', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('3', '2015-03-16', '1212', '2015-03-16 13:47:58', '2015-03-16 13:52:41', '1', '管理员', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('12', '2015-11-24', '今天的日报啦，呵呵呵呵2323', '2015-11-24 18:42:24', '2015-11-24 18:57:40', '1', '管理员', '0', null, '0', null, '1');
INSERT INTO `rock_daily` VALUES ('5', '2015-03-18', '1212', '2015-03-19 16:22:59', '2015-03-19 16:22:59', '1', '管理员', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('6', '2015-05-14', '今天的工作我来做', '2015-05-14 22:06:43', '2015-05-14 22:06:43', '1', '管理员', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('7', '2015-05-16', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', '2015-05-16 17:41:20', '2015-05-16 18:00:02', '2', '陈稀糊', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('8', '2015-07-23', '哈哈哈哈', '2015-07-23 15:02:08', '2015-07-23 15:02:08', '3', '貂蝉', '0', null, '0', null, null);
INSERT INTO `rock_daily` VALUES ('10', '2015-09-09', '本周计划啦33121', '2015-09-09 16:40:17', '2015-11-24 18:58:08', '1', '管理员', '1', null, '0', '2015-09-11', '1');
INSERT INTO `rock_daily` VALUES ('11', '2015-09-09', '呵呵，那是哥ongoing，1我本该啦，呵呵222', '2015-09-09 16:49:37', '2015-09-11 15:59:11', '1', '管理员', '0', '计划集合啦？？', '0', null, null);
INSERT INTO `rock_daily` VALUES ('13', '2015-11-23', '呵呵额和', '2015-11-24 18:48:40', '2015-11-24 18:48:40', '1', '管理员', '0', null, '0', null, '1');
INSERT INTO `rock_daily` VALUES ('14', '2015-12-27', '哈哈哈哈啊哈哈巍峨伟为', '2015-12-27 18:44:45', '2015-12-27 18:44:45', '3', '貂蝉', '0', null, '0', null, '3');
INSERT INTO `rock_daily` VALUES ('15', '2015-12-26', '哈哈哈哈哈哈哈哈哈哈哈', '2015-12-27 18:46:44', '2015-12-27 18:46:44', '3', '貂蝉', '0', '下次计划下次计划下次计划下次计划下次计划', '0', null, '3');
INSERT INTO `rock_daily` VALUES ('16', '2015-12-25', '2121211222222222222222', '2015-12-27 19:12:46', '2015-12-27 19:12:46', '3', '貂蝉', '0', '12222222222222', '0', null, '3');

-- ----------------------------
-- Table structure for `rock_dailyfx`
-- ----------------------------
DROP TABLE IF EXISTS `rock_dailyfx`;
CREATE TABLE `rock_dailyfx` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '分析时间',
  `month` varchar(10) DEFAULT NULL COMMENT '月份',
  `totaly` smallint(6) DEFAULT '0' COMMENT '应写次数',
  `totalx` smallint(6) DEFAULT '0' COMMENT '已写次数',
  `totalw` smallint(6) DEFAULT '0' COMMENT '未写次数',
  `dtjoin` varchar(500) DEFAULT NULL COMMENT '未写日期',
  `optname` varchar(10) DEFAULT NULL COMMENT '姓名',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_dailyfx
-- ----------------------------

-- ----------------------------
-- Table structure for `rock_demand`
-- ----------------------------
DROP TABLE IF EXISTS `rock_demand`;
CREATE TABLE `rock_demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `jsid` smallint(6) DEFAULT '0',
  `jsname` varchar(20) DEFAULT NULL COMMENT '技术处理人',
  `uid` int(11) DEFAULT NULL,
  `content` varchar(4000) DEFAULT NULL COMMENT '内容',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_demand
-- ----------------------------
INSERT INTO `rock_demand` VALUES ('1', '来个需求啦，呵呵呵呵', '0', null, '1', null, '2015-11-27 22:01:54', '1', '管理员', '2015-11-27', '呵呵呵呵额呵呵', '1', '1', null, '1,0,4', '1', '大乔', null);
INSERT INTO `rock_demand` VALUES ('2', '呵呵呵呵呵', '0', null, '1', null, '2015-11-28 12:38:04', '1', '管理员', '2015-11-28', null, '1', '1', null, '1,0,4', '1', '大乔', null);
INSERT INTO `rock_demand` VALUES ('3', '这是个申请啊，嘿嘿嘿嘿噩耗', '0', null, '1', '呵呵额和<img alt=\"\" src=\"upload/2015-11/28_1956194078.jpg\" />', '2015-11-28 19:56:23', '1', '管理员', '2015-11-28', null, '1', '1', null, '1,0,4', '1', '大乔', null);
INSERT INTO `rock_demand` VALUES ('4', '122112122112', '0', null, '1', null, '2015-11-28 20:12:42', '1', '管理员', '2015-11-28', '12122112', '1', '1', null, '1,0,5', '1', '小乔', null);
INSERT INTO `rock_demand` VALUES ('5', '我有一个生情呵呵呵', '0', null, '1', null, '2015-12-15 19:32:09', '1', '管理员', '2015-12-12', '1122121112', '5', '1', '1', '1,0', '0', null, '管理员');

-- ----------------------------
-- Table structure for `rock_dept`
-- ----------------------------
DROP TABLE IF EXISTS `rock_dept`;
CREATE TABLE `rock_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(30) DEFAULT NULL COMMENT '编号',
  `name` varchar(100) DEFAULT NULL,
  `pid` smallint(8) DEFAULT NULL,
  `sort` tinyint(1) DEFAULT '0',
  `optdt` datetime DEFAULT NULL,
  `headman` varchar(50) DEFAULT NULL COMMENT '负责人',
  `headid` varchar(50) DEFAULT NULL,
  `companyid` smallint(6) DEFAULT '0' COMMENT '所属单位',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_dept
-- ----------------------------
INSERT INTO `rock_dept` VALUES ('7', 'gl', '管理部', '1', '0', null, null, null, '0');
INSERT INTO `rock_dept` VALUES ('2', 'bues', '业务部', '1', '1', null, null, null, '0');
INSERT INTO `rock_dept` VALUES ('3', 'xzrs', '行政人事', '1', '0', null, '大乔', '4', '0');
INSERT INTO `rock_dept` VALUES ('4', 'dev', '开发部', '1', '0', null, '管理员', '1', '0');
INSERT INTO `rock_dept` VALUES ('5', 'shw', '商务部', '1', '0', null, null, null, '0');
INSERT INTO `rock_dept` VALUES ('6', 'fina', '财务部', '1', '0', null, null, null, '0');
INSERT INTO `rock_dept` VALUES ('1', 'rock', 'RockOA开发团队', '0', '0', null, null, null, '1');

-- ----------------------------
-- Table structure for `rock_docdeil`
-- ----------------------------
DROP TABLE IF EXISTS `rock_docdeil`;
CREATE TABLE `rock_docdeil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `receid` smallint(6) DEFAULT NULL,
  `recename` varchar(20) DEFAULT NULL COMMENT '签收人',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_docdeil
-- ----------------------------
INSERT INTO `rock_docdeil` VALUES ('8', '1', '1', '1', null, '3', '1', '貂蝉', null, '一个文档', '3', '貂蝉', '2015-07-30 20:11:27', null, null, null, null);
INSERT INTO `rock_docdeil` VALUES ('9', '1', '1', '1', null, '1', '1', '管理员', null, 'wewe', '1', '管理员', '2015-08-14 10:40:21', null, null, null, null);
INSERT INTO `rock_docdeil` VALUES ('10', '1', '1', '1', null, '1', '1', '管理员', null, 'wcwwe', '1', '管理员', '2015-08-14 11:01:45', null, null, null, null);
INSERT INTO `rock_docdeil` VALUES ('11', '1', '1', '1', null, '1', '1', '管理员', null, '哈哈哈', '1', '管理员', '2015-09-17 16:27:32', null, '1', '管理员', '2015-08-21');
INSERT INTO `rock_docdeil` VALUES ('12', '1', '1', '1', null, '3', '1', '貂蝉', null, '哈哈哈', '3', '貂蝉', '2015-10-13 15:48:50', null, '1', '管理员', '2015-08-26');
INSERT INTO `rock_docdeil` VALUES ('13', '1', '1', '1', null, '1', '1', '管理员', null, '自己来试试', '1', '管理员', '2015-10-27 11:21:01', null, '1', '管理员', '2015-10-27');

-- ----------------------------
-- Table structure for `rock_editrecord`
-- ----------------------------
DROP TABLE IF EXISTS `rock_editrecord`;
CREATE TABLE `rock_editrecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldsname` varchar(50) CHARACTER SET gbk DEFAULT NULL,
  `oldval` varchar(200) CHARACTER SET gbk DEFAULT NULL,
  `newval` varchar(200) CHARACTER SET gbk DEFAULT NULL,
  `table` varchar(30) CHARACTER SET gbk DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL,
  `optid` smallint(6) DEFAULT NULL,
  `optname` varchar(20) CHARACTER SET gbk DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_editrecord
-- ----------------------------
INSERT INTO `rock_editrecord` VALUES ('15', '操作时间', '2015-06-30 17:30:35', '2015-10-30 09:30:48', 'assetm', '1', '2015-10-30 09:30:48', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('16', '购进日期', null, '2015-10-30', 'assetm', '1', '2015-10-30 09:30:48', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('17', '价格', null, '6000', 'assetm', '1', '2015-10-30 09:30:48', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('18', '备注', '报废啦？', '报废啦？1', 'assetm', '1', '2015-11-21 18:13:52', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('19', '操作时间', '2015-10-30 09:30:48', '2015-11-21 18:13:52', 'assetm', '1', '2015-11-21 18:13:52', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('20', '品牌', '112', '11211', 'assetm', '1', '2015-11-21 18:14:55', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('21', '操作时间', '2015-11-21 18:13:52', '2015-11-21 18:14:55', 'assetm', '1', '2015-11-21 18:14:55', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('22', '品牌', '11211', '联想', 'assetm', '1', '2015-11-21 18:15:37', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('23', '操作时间', '2015-11-21 18:14:55', '2015-11-21 18:15:37', 'assetm', '1', '2015-11-21 18:15:37', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('24', '品牌', '联想', '11211', 'assetm', '1', '2015-11-21 18:16:33', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('25', '规格型号', '122121', '12', 'assetm', '1', '2015-11-21 18:16:33', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('26', '操作时间', '2015-11-21 18:15:37', '2015-11-21 18:16:33', 'assetm', '1', '2015-11-21 18:16:33', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('27', '品牌', '11211', '联想', 'assetm', '1', '2015-11-21 18:20:10', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('28', '操作时间', '2015-11-21 18:16:33', '2015-11-21 18:20:10', 'assetm', '1', '2015-11-21 18:20:10', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('29', '职位', '行政总监', '行政主管', 'admin', '4', '2015-11-22 20:52:20', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('30', '所属公司', '0', '1', 'admin', '1', '2015-12-28 22:49:17', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('31', '所属公司', '0', '1', 'admin', '7', '2015-12-28 23:00:02', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('32', '状态', '启用', '停用', 'admin', '1', '2015-12-28 23:06:05', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('33', '状态', '停用', '启用', 'admin', '1', '2015-12-28 23:06:11', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('34', '任务等级', '中', '高', 'work', '97', '2016-01-14 11:18:05', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('35', '说明', null, '哈哈哈哈', 'work', '97', '2016-01-14 11:18:05', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('36', '操作时间', '2016-01-14 10:58:33', '2016-01-14 11:18:05', 'work', '97', '2016-01-14 11:18:05', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('37', '标题', '哈哈哈哈', '哈哈哈哈122121', 'work', '97', '2016-01-14 11:21:19', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('38', '操作时间', '2016-01-14 11:18:05', '2016-01-14 11:21:19', 'work', '97', '2016-01-14 11:21:19', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('39', '操作时间', '2016-01-14 11:21:19', '2016-01-14 12:24:10', 'work', '97', '2016-01-14 12:24:10', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('40', '状态', null, '待执行', 'work', '97', '2016-01-14 12:24:10', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('41', '操作时间', '2016-01-14 19:04:27', '2016-01-14 19:54:57', 'work', '98', '2016-01-14 19:54:57', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('42', '状态', null, '待执行', 'work', '98', '2016-01-14 19:54:57', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('43', '所属项目', '2', '3', 'work', '98', '2016-01-14 19:54:57', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('44', '操作时间', '2016-01-14 10:55:38', '2016-01-15 13:01:27', 'work', '96', '2016-01-15 13:01:27', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('45', '开始时间', '2016-01-14 09:58:00', '2016-01-15 13:01:00', 'work', '96', '2016-01-15 13:01:27', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('46', '操作时间', '2016-01-15 13:01:27', '2016-01-15 13:01:40', 'work', '96', '2016-01-15 13:01:40', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('47', '结束时间', '2016-01-14 12:58:00', '2016-01-23 12:58:00', 'work', '96', '2016-01-15 13:01:40', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('48', '操作时间', '2016-01-15 13:01:40', '2016-01-15 13:01:53', 'work', '96', '2016-01-15 13:01:53', '1', '管理员');
INSERT INTO `rock_editrecord` VALUES ('49', '所属项目', '0', '1', 'work', '96', '2016-01-15 13:01:53', '1', '管理员');

-- ----------------------------
-- Table structure for `rock_email`
-- ----------------------------
DROP TABLE IF EXISTS `rock_email`;
CREATE TABLE `rock_email` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `serversmtp` varchar(50) DEFAULT NULL COMMENT 'SMTP服务器',
  `serverport` varchar(20) DEFAULT NULL COMMENT 'SMTP服务器端口',
  `emailname` varchar(100) DEFAULT NULL COMMENT '邮箱帐号',
  `emailpass` varchar(500) DEFAULT NULL COMMENT '密码',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `secure` varchar(10) DEFAULT NULL COMMENT '连接方式',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_email
-- ----------------------------
INSERT INTO `rock_email` VALUES ('1', 'smtp.exmail.qq.com', '465', 'service_send@rockoa.com', 'zd0zh0od0wew0cc0wee0zw0hd0cz0wac0od0tz09', '2016-01-21 22:27:07', '自己帐号', '1', 'ssl');

-- ----------------------------
-- Table structure for `rock_email_tpl`
-- ----------------------------
DROP TABLE IF EXISTS `rock_email_tpl`;
CREATE TABLE `rock_email_tpl` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `setid` smallint(6) DEFAULT NULL COMMENT '＠发送邮件',
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `content` varchar(500) DEFAULT NULL COMMENT '邮件内容',
  `num` varchar(100) DEFAULT NULL COMMENT '编号',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `optid` smallint(6) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of rock_email_tpl
-- ----------------------------
INSERT INTO `rock_email_tpl` VALUES ('1', '1', '{name}{dt}的工作日报', '您好，以下工作日志内容\n{content}\n时间：{optdt}', 'dayreportemail', '工作日志发送', '2015-09-02 15:22:04', '0', '1', '管理员');
INSERT INTO `rock_email_tpl` VALUES ('2', '1', 'OA系统[{base_flowname}]待处理', 'auto', 'flowchecktodo', '流程处理提醒', '2015-07-01 12:08:43', '1', '1', '管理员');

-- ----------------------------
-- Table structure for `rock_file`
-- ----------------------------
DROP TABLE IF EXISTS `rock_file`;
CREATE TABLE `rock_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valid` tinyint(4) DEFAULT '1',
  `filename` varchar(200) DEFAULT NULL,
  `filetype` varchar(50) DEFAULT NULL,
  `fileext` varchar(20) DEFAULT NULL,
  `filesize` int(11) DEFAULT NULL,
  `filesizecn` varchar(30) DEFAULT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(50) DEFAULT NULL,
  `adddt` datetime DEFAULT NULL,
  `ip` varchar(30) DEFAULT NULL,
  `web` varchar(300) DEFAULT NULL,
  `mtype` varchar(50) DEFAULT NULL COMMENT '对应类型',
  `mid` int(11) DEFAULT '0' COMMENT '管理id',
  `downci` int(11) DEFAULT '0' COMMENT '下载次数',
  PRIMARY KEY (`id`),
  KEY `mtype` (`mtype`,`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_file
-- ----------------------------
INSERT INTO `rock_file` VALUES ('65', '1', 'face.jpg', null, 'jpg', '42225', '41.24 KB', 'upload/2015-12/15_1952191160.jpg', '1', null, '2015-12-15 19:52:19', '127.0.0.1', 'MSIE 9', null, '0', '0');
INSERT INTO `rock_file` VALUES ('66', '1', 'REIM_ROCK.jpg', null, 'jpg', '8667', '8.46 KB', 'upload/2016-01/05_1936568977.jpg', '0', null, '2016-01-05 19:36:56', '127.0.0.1', 'MSIE 9', null, '0', '0');
INSERT INTO `rock_file` VALUES ('67', '1', 'bikelogo200.jpg', null, 'jpg', '15676', '15.31 KB', 'upload/2016-01/05_1943111326.jpg', '0', null, '2016-01-05 19:43:11', '127.0.0.1', 'MSIE 9', null, '0', '0');
INSERT INTO `rock_file` VALUES ('68', '1', 'bikelogo40.psd', null, 'psd', '211381', '206.43 KB', 'upload/2016-01/05_1943331114.temp', '0', null, '2016-01-05 19:43:34', '127.0.0.1', 'MSIE 9', null, '0', '0');
INSERT INTO `rock_file` VALUES ('69', '1', 'REIM_ROCK.jpg', null, 'jpg', '161054', '157.28 KB', 'upload/2016-01/05_1947556194.jpg', '0', null, '2016-01-05 19:47:55', '127.0.0.1', 'MSIE 9', null, '0', '0');
INSERT INTO `rock_file` VALUES ('70', '1', '腾讯企业邮箱OpenApi协议v1.4.pdf', null, 'pdf', '435738', '425.53 KB', 'upload/2016-01/15_1301211701.pdf', '1', null, '2016-01-15 13:01:23', '127.0.0.1', 'MSIE 9', 'work', '96', '3');
INSERT INTO `rock_file` VALUES ('71', '1', 'runweb.exe', null, 'exe', '50176', '49.00 KB', 'upload/2016-01/15_1922366398.temp', '1', null, '2016-01-15 19:22:37', '127.0.0.1', 'MSIE 9', 'workbg', '49', '1');

-- ----------------------------
-- Table structure for `rock_fininfom`
-- ----------------------------
DROP TABLE IF EXISTS `rock_fininfom`;
CREATE TABLE `rock_fininfom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(2) DEFAULT '0' COMMENT '单据类型@0|报销单,1|出差报销,2|借款单@not',
  `uid` int(11) DEFAULT NULL,
  `money` decimal(8,2) DEFAULT '0.00' COMMENT '金额',
  `moneycn` varchar(100) DEFAULT NULL COMMENT '大写金额',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  `bills` smallint(6) DEFAULT NULL COMMENT '附单据(张)',
  `paytype` varchar(20) DEFAULT NULL COMMENT '付款方式',
  `fullname` varchar(100) DEFAULT NULL COMMENT '收款人全称',
  `cardid` varchar(50) DEFAULT NULL COMMENT '收款帐号',
  `openbank` varchar(50) DEFAULT NULL COMMENT '开户行',
  `purpose` varchar(100) DEFAULT NULL COMMENT '用途',
  `purresult` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_fininfom
-- ----------------------------
INSERT INTO `rock_fininfom` VALUES ('1', '0', '1', '12.00', '壹拾贰元整', '2015-08-21 13:45:19', '1', '管理员', '2015-08-21', null, '1', '1', null, '7,9,10', '1', '吕布', null, null, null, null, null, null, null, null);
INSERT INTO `rock_fininfom` VALUES ('2', '0', '1', '15.00', '壹拾伍元整', '2015-09-09 10:35:35', '1', '管理员', '2015-09-09', '嗯', '0', '1', '9', '7,9,10', '2', '赵子龙', '赵子龙', null, null, null, null, null, null, null);
INSERT INTO `rock_fininfom` VALUES ('3', '0', '1', '20.00', '贰拾元整', '2015-09-15 09:48:54', '1', '管理员', '2015-09-15', null, '0', '1', '10', '7,9,10', '1', '赵子龙', '吕布', '1', '支付宝', '马云', 'mayun@alipay.com', '支付宝公司', null, null);
INSERT INTO `rock_fininfom` VALUES ('4', '2', '1', '5000.00', '伍仟元整', '2015-09-15 15:54:17', '1', '管理员', '2015-09-15', '买房缺钱啊', '1', '1', null, '7,9,10', '1', '吕布', null, null, '支付宝', '马云', 'mayun@alipay.com', '支付宝公司', '买房', null);
INSERT INTO `rock_fininfom` VALUES ('5', '1', '1', '20.00', '贰拾元整', '2015-09-15 17:27:32', '1', '管理员', '2015-09-15', null, '0', '1', '10', '7,9,10', '1', '赵子龙', '吕布', '1', '支付宝', '马云', 'mayun@alipay.com', '支付宝公司', '厦门', '不知道，呵呵');
INSERT INTO `rock_fininfom` VALUES ('6', '2', '1', '20000.00', '贰万元整', '2015-10-29 09:54:29', '1', '管理员', '2015-10-29', '买房啦', '0', '1', '7', '7,9,10', '0', null, '刘备', null, '支付宝', '马云', 'mayun@alipay.com', '支付宝公司', '买房', null);

-- ----------------------------
-- Table structure for `rock_fininfos`
-- ----------------------------
DROP TABLE IF EXISTS `rock_fininfos`;
CREATE TABLE `rock_fininfos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL,
  `items` varchar(30) DEFAULT NULL,
  `startdt` date DEFAULT NULL,
  `enddt` date DEFAULT NULL,
  `moneys` decimal(8,2) DEFAULT NULL,
  `explain` varchar(500) DEFAULT NULL,
  `sort` smallint(6) DEFAULT '0',
  `address` varchar(50) DEFAULT NULL COMMENT '地点',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_fininfos
-- ----------------------------
INSERT INTO `rock_fininfos` VALUES ('5', '5', '快递费', '2015-09-15', null, '20.00', null, '0', '厦门');

-- ----------------------------
-- Table structure for `rock_flow_bill`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_bill`;
CREATE TABLE `rock_flow_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sericnum` varchar(50) DEFAULT NULL COMMENT '单号',
  `table` varchar(50) DEFAULT NULL COMMENT '对应表',
  `mid` int(11) DEFAULT NULL COMMENT '主id',
  `modeid` smallint(6) DEFAULT '0' COMMENT '模块id',
  `modename` varchar(20) DEFAULT NULL COMMENT '模块名称',
  `uid` smallint(6) DEFAULT NULL COMMENT '用户id',
  `optdt` datetime DEFAULT NULL,
  `optid` smallint(6) DEFAULT '0',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所有审核人',
  `isdel` tinyint(4) DEFAULT '0' COMMENT '是否删除',
  `nstatus` tinyint(1) DEFAULT '0',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `nstatustext` varchar(100) DEFAULT NULL COMMENT '当前状态',
  PRIMARY KEY (`id`),
  KEY `table` (`table`,`mid`),
  KEY `sericnum` (`sericnum`)
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_bill
-- ----------------------------
INSERT INTO `rock_flow_bill` VALUES ('11', 'QJ-20150720-0001', 'kq_info', '33', '1', '请假条', '1', '2015-08-05 14:36:33', '1', '管理员', '7,5', '0', '0', '2015-08-05', null);
INSERT INTO `rock_flow_bill` VALUES ('12', 'WO-20150720-0001', 'kq_info', '34', '2', '加班单', '1', '2015-07-20 10:31:17', '1', '管理员', '3', '1', '0', '2015-07-20', null);
INSERT INTO `rock_flow_bill` VALUES ('13', 'OT-20150720-0001', 'kq_out', '7', '3', '外出出差', '1', '2015-07-20 10:31:47', '1', '管理员', '3', '0', '0', '2015-07-20', null);
INSERT INTO `rock_flow_bill` VALUES ('14', 'FI-20150720-0001', 'docdeil', '8', '4', '文件传送', '1', '2015-07-30 20:11:27', '1', '管理员', '3', '0', '0', '2015-07-30', null);
INSERT INTO `rock_flow_bill` VALUES ('16', 'YP-20150723-0001', 'supplea', '4', '6', '申请办公用品', '1', '2015-07-23 17:03:32', '1', '管理员', '5', '0', '0', '2015-07-23', null);
INSERT INTO `rock_flow_bill` VALUES ('17', 'YP-20150723-0002', 'supplea', '5', '6', '申请办公用品', '1', '2015-07-23 17:39:37', '1', '管理员', '5', '0', '0', '2015-07-23', null);
INSERT INTO `rock_flow_bill` VALUES ('18', 'QJ-20150729-0001', 'kq_info', '35', '1', '请假条', '1', '2015-07-29 15:01:24', '1', '管理员', '7,5', '0', '0', '2015-07-29', null);
INSERT INTO `rock_flow_bill` VALUES ('19', 'HR-20150801-0001', 'hrpositive', '1', '7', '转正申请', '1', '2015-08-01 11:52:54', '1', '管理员', '7,3', '0', '0', '2015-08-01', null);
INSERT INTO `rock_flow_bill` VALUES ('20', 'HE-20150802-0001', 'hrredund', '1', '9', '离职申请', '1', '2015-08-03 10:49:07', '1', '管理员', '7,3', '1', '2', '2015-08-03', null);
INSERT INTO `rock_flow_bill` VALUES ('21', 'HE-20150802-0002', 'hrredund', '2', '9', '离职申请', '1', '2015-08-03 10:47:55', '1', '管理员', '7,3', '1', '0', '2015-08-03', null);
INSERT INTO `rock_flow_bill` VALUES ('22', 'HT-20150803-0001', 'hrtransfer', '1', '8', '人事调动', '1', '2015-08-03 17:46:15', '1', '管理员', '3', '0', '0', '2015-08-03', null);
INSERT INTO `rock_flow_bill` VALUES ('23', 'HT-20150803-0002', 'hrtransfer', '2', '8', '人事调动', '1', '2015-08-03 17:49:34', '1', '管理员', '3', '0', '0', '2015-08-03', null);
INSERT INTO `rock_flow_bill` VALUES ('24', 'HT-20150803-0003', 'hrtransfer', '3', '8', '人事调动', '1', '2015-08-03 18:09:37', '1', '管理员', '3', '0', '0', '2015-08-03', null);
INSERT INTO `rock_flow_bill` VALUES ('25', 'HR-20150805-0001', 'hrpositive', '2', '7', '转正申请', '1', '2015-08-05 10:42:22', '1', '管理员', '7,3', '1', '0', '2015-08-05', null);
INSERT INTO `rock_flow_bill` VALUES ('26', 'KE-20150805-0001', 'kq_dkerr', '1', '10', '打卡异常', '1', '2015-08-05 12:08:41', '1', '管理员', '7', '0', '0', '2015-08-05', null);
INSERT INTO `rock_flow_bill` VALUES ('27', 'FI-20150814-0001', 'docdeil', '9', '4', '文件传送', '1', '2015-08-14 10:40:21', '1', '管理员', '1', '0', '1', '2015-08-14', null);
INSERT INTO `rock_flow_bill` VALUES ('28', 'FI-20150814-0002', 'docdeil', '10', '4', '文件传送', '1', '2015-08-14 11:01:45', '1', '管理员', '1', '0', '1', '2015-08-14', null);
INSERT INTO `rock_flow_bill` VALUES ('29', 'KL-20150817-0001', 'kq_info', '36', '1', '请假条', '1', '2015-08-17 16:54:39', '1', '管理员', '7,5', '1', '2', '2015-08-17', null);
INSERT INTO `rock_flow_bill` VALUES ('30', 'KL-20150819-0001', 'kq_info', '37', '1', '请假条', '1', '2015-08-19 10:59:43', '1', '管理员', '7,5', '1', '0', '2015-08-19', null);
INSERT INTO `rock_flow_bill` VALUES ('31', 'KW-20150819-0001', 'kq_out', '8', '3', '外出出差', '1', '2015-08-19 11:16:40', '1', '管理员', '3', '0', '1', '2015-08-19', null);
INSERT INTO `rock_flow_bill` VALUES ('32', 'YP-20150819-0001', 'supplea', '7', '6', '申请办公用品', '1', '2015-08-19 12:14:03', '1', '管理员', '5', '0', '1', '2015-08-19', null);
INSERT INTO `rock_flow_bill` VALUES ('33', 'KL-20150820-0001', 'kq_info', '39', '1', '请假条', '1', '2015-08-20 10:57:03', '1', '管理员', '7,5', '0', '1', '2015-08-20', null);
INSERT INTO `rock_flow_bill` VALUES ('34', 'KE-20150820-0001', 'kq_dkerr', '2', '10', '打卡异常', '1', '2015-08-20 16:37:34', '1', '管理员', '7', '1', '0', '2015-08-20', null);
INSERT INTO `rock_flow_bill` VALUES ('35', 'FI-20150821-0001', 'docdeil', '11', '4', '文件传送', '1', '2015-09-17 16:27:31', '1', '管理员', '1', '0', '1', '2015-08-21', null);
INSERT INTO `rock_flow_bill` VALUES ('36', 'PA-20150821-0001', 'fininfom', '1', '11', '费用报销', '1', '2015-08-21 13:45:19', '1', '管理员', '7,9,10', '0', '1', '2015-08-21', null);
INSERT INTO `rock_flow_bill` VALUES ('37', 'YP-20150821-0001', 'supplea', '8', '6', '申请办公用品', '1', '2015-08-21 21:03:10', '1', '管理员', '5', '0', '1', '2015-08-21', null);
INSERT INTO `rock_flow_bill` VALUES ('38', 'FI-20150826-0001', 'docdeil', '12', '4', '文件传送', '1', '2015-10-13 15:48:50', '1', '管理员', '3', '0', '1', '2015-08-26', null);
INSERT INTO `rock_flow_bill` VALUES ('39', 'PA-20150909-0001', 'fininfom', '2', '11', '费用报销', '1', '2015-09-09 10:35:35', '1', '管理员', '7,9,10', '0', '2', '2015-09-09', null);
INSERT INTO `rock_flow_bill` VALUES ('40', 'KF-20150914-0001', 'reward', '1', '14', '奖惩处罚', '4', '2015-09-14 14:51:59', '1', '管理员', '7,3', '0', '2', '2015-09-14', null);
INSERT INTO `rock_flow_bill` VALUES ('41', 'PA-20150915-0001', 'fininfom', '3', '11', '费用报销', '1', '2015-09-15 09:48:54', '1', '管理员', '7,9,10', '0', '1', '2015-09-15', null);
INSERT INTO `rock_flow_bill` VALUES ('42', 'PC-20150915-0001', 'fininfom', '4', '13', '借款单', '1', '2015-09-15 15:54:17', '1', '管理员', '7,9,10', '0', '1', '2015-09-15', null);
INSERT INTO `rock_flow_bill` VALUES ('43', 'PB-20150915-0001', 'fininfom', '5', '12', '出差报销', '1', '2015-09-15 17:27:32', '1', '管理员', '7,9,10', '0', '1', '2015-09-15', null);
INSERT INTO `rock_flow_bill` VALUES ('44', 'YB-20150923-0001', 'careserve', '1', '15', '车辆预定', '1', '2015-09-23 16:54:19', '1', '管理员', '7,5', '0', '1', '2015-09-23', null);
INSERT INTO `rock_flow_bill` VALUES ('45', 'YB-20150923-0002', 'careserve', '2', '15', '车辆预定', '1', '2015-09-23 16:54:08', '1', '管理员', '7,5', '0', '1', '2015-09-23', null);
INSERT INTO `rock_flow_bill` VALUES ('46', 'KL-20151020-0001', 'kq_info', '40', '1', '请假条', '1', '2015-10-20 09:45:35', '1', '管理员', '7,3', '0', '1', '2015-10-20', null);
INSERT INTO `rock_flow_bill` VALUES ('47', 'FI-20151027-0001', 'docdeil', '13', '4', '文件传送', '1', '2015-10-27 11:21:01', '1', '管理员', '1', '0', '1', '2015-10-27', null);
INSERT INTO `rock_flow_bill` VALUES ('48', 'PC-20151029-0001', 'fininfom', '6', '13', '借款单', '1', '2015-10-29 09:54:29', '1', '管理员', '7,9,10', '0', '0', '2015-10-29', null);
INSERT INTO `rock_flow_bill` VALUES ('49', 'YC-20151121-0001', 'meet', '112', '16', '会议室预定', '1', '2015-11-21 21:34:22', '1', '管理员', '4', '0', '1', '2015-11-21', null);
INSERT INTO `rock_flow_bill` VALUES ('50', 'YC-20151123-0001', 'meet', '121', '16', '会议室预定', '1', '2015-11-23 19:07:55', '1', '管理员', '4', '0', '1', '2015-11-23', null);
INSERT INTO `rock_flow_bill` VALUES ('51', 'YC-20151123-0002', 'meet', '122', '16', '会议室预定', '1', '2015-11-23 19:36:46', '1', '管理员', '4', '0', '1', '2015-11-23', null);
INSERT INTO `rock_flow_bill` VALUES ('52', 'KL-20151127-0001', 'kq_info', '41', '1', '请假条', '1', '2015-11-27 20:55:42', '1', '管理员', '7,5', '0', '1', '2015-11-27', null);
INSERT INTO `rock_flow_bill` VALUES ('53', 'KJ-20151127-0001', 'kq_info', '42', '2', '加班单', '1', '2015-11-27 20:56:03', '1', '管理员', '3', '0', '0', '2015-11-27', null);
INSERT INTO `rock_flow_bill` VALUES ('54', 'KW-20151127-0001', 'kq_out', '9', '3', '外出出差', '1', '2015-12-06 21:33:27', '1', '管理员', '3', '0', '0', '2015-11-27', null);
INSERT INTO `rock_flow_bill` VALUES ('55', 'KE-20151127-0001', 'kq_dkerr', '3', '10', '打卡异常', '1', '2015-11-27 20:56:41', '1', '管理员', '7', '0', '1', '2015-11-27', null);
INSERT INTO `rock_flow_bill` VALUES ('56', 'FX-20151127-0001', 'demand', '1', '17', '业务需求', '1', '2015-11-27 22:01:54', '1', '管理员', '1,0,4', '0', '1', '2015-11-27', null);
INSERT INTO `rock_flow_bill` VALUES ('57', 'FX-20151128-0001', 'demand', '2', '17', '业务需求', '1', '2015-11-28 12:38:04', '1', '管理员', '1,0,4', '0', '1', '2015-11-28', null);
INSERT INTO `rock_flow_bill` VALUES ('58', 'FX-20151128-0002', 'demand', '3', '17', '业务需求', '1', '2015-11-28 19:56:23', '1', '管理员', '1,0,4', '0', '1', '2015-11-28', null);
INSERT INTO `rock_flow_bill` VALUES ('59', 'FX-20151128-0003', 'demand', '4', '17', '业务需求', '1', '2015-11-28 20:12:42', '1', '管理员', '1,0,5', '0', '1', '2015-11-28', null);
INSERT INTO `rock_flow_bill` VALUES ('60', 'FX-20151212-0001', 'demand', '5', '17', '业务需求', '1', '2015-12-15 19:32:09', '1', '管理员', '1,0', '1', '0', '2015-12-12', null);
INSERT INTO `rock_flow_bill` VALUES ('67', 'KL-20151227-0003', 'kq_info', '48', '1', '请假条', '3', '2015-12-27 17:43:19', '3', '貂蝉', '4,3,4,5', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('66', 'KL-20151227-0002', 'kq_info', '47', '1', '请假条', '3', '2015-12-27 17:42:09', '3', '貂蝉', '4,3,4,5', '0', '1', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('65', 'KL-20151227-0001', 'kq_info', '46', '1', '请假条', '3', '2015-12-27 17:38:26', '3', '貂蝉', '4,3,4,5', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('68', 'KJ-20151227-0001', 'kq_info', '49', '2', '加班单', '3', '2015-12-27 18:23:40', '3', '貂蝉', '3', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('69', 'KW-20151227-0001', 'kq_out', '10', '3', '外出出差', '3', '2015-12-27 19:11:59', '3', '貂蝉', '3', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('70', 'KJ-20151227-0002', 'kq_info', '50', '2', '加班单', '3', '2015-12-27 19:12:14', '3', '貂蝉', '3', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('71', 'KL-20151227-0004', 'kq_info', '51', '1', '请假条', '3', '2015-12-27 19:12:36', '3', '貂蝉', '4,3,4,5', '0', '0', '2015-12-27', null);
INSERT INTO `rock_flow_bill` VALUES ('72', 'KF-20151230-0001', 'kq_sick', '1', '20', '销假单', '1', '2015-12-30 21:27:54', '1', '管理员', '3', '0', '1', '2015-12-30', null);
INSERT INTO `rock_flow_bill` VALUES ('73', 'KL-20160105-0001', 'kq_info', '52', '1', '请假条', '1', '2016-01-05 21:23:12', '1', '管理员', '7,3,4,', '0', '1', '2016-01-05', null);

-- ----------------------------
-- Table structure for `rock_flow_checks`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_checks`;
CREATE TABLE `rock_flow_checks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table` varchar(30) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `courseid` int(11) DEFAULT NULL,
  `checkid` varchar(100) DEFAULT NULL,
  `checkname` varchar(100) DEFAULT NULL,
  `optid` smallint(6) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `table` (`table`,`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_checks
-- ----------------------------
INSERT INTO `rock_flow_checks` VALUES ('1', 'kq_info', '52', '2', '3,4', '貂蝉,大乔', '7', '刘备', '2016-01-06 22:14:15');
INSERT INTO `rock_flow_checks` VALUES ('2', 'kq_info', '40', '2', '3', '貂蝉', '7', '刘备', '2016-01-06 22:19:17');

-- ----------------------------
-- Table structure for `rock_flow_course`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_course`;
CREATE TABLE `rock_flow_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setid` smallint(6) DEFAULT NULL COMMENT '对应配置',
  `name` varchar(50) DEFAULT NULL COMMENT '进程名称',
  `num` varchar(50) DEFAULT NULL COMMENT '编号',
  `pid` int(11) DEFAULT '0' COMMENT '上一步id',
  `nid` int(11) DEFAULT NULL,
  `atype` varchar(20) DEFAULT NULL COMMENT '适用于所以人员,指定ren,部门',
  `atypename` varchar(200) DEFAULT NULL COMMENT '指定的人',
  `atypeid` varchar(200) DEFAULT NULL,
  `checktype` varchar(20) DEFAULT NULL COMMENT '审核人员类型',
  `checktypeid` varchar(100) DEFAULT NULL COMMENT '审核人id',
  `checktypename` varchar(100) DEFAULT NULL COMMENT '审核人员姓名',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `optdt` datetime DEFAULT NULL,
  `explain` varchar(100) DEFAULT NULL COMMENT '说明',
  `inputid` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_course
-- ----------------------------
INSERT INTO `rock_flow_course` VALUES ('1', '1', '主管审核', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '1', '2015-01-29 11:19:45', null, '0');
INSERT INTO `rock_flow_course` VALUES ('2', '1', '人事确认', null, '1', '0', null, null, null, 'depta', '3', '行政人事', '0', '2016-01-06 19:10:01', '一天内', '0');
INSERT INTO `rock_flow_course` VALUES ('19', '2', '开始', null, '0', '0', 'all', '所有人员', null, 'start', null, null, '0', '2015-01-13 17:12:00', null, '0');
INSERT INTO `rock_flow_course` VALUES ('20', '2', '人事确认', null, '19', '0', null, null, null, 'rank', null, '人事经理', '0', '2015-01-13 17:13:34', '超过8小时', '0');
INSERT INTO `rock_flow_course` VALUES ('21', '1', '总经理审核', null, '2', '0', null, null, null, 'depta', '1', '管理部', '1', '2016-01-05 21:26:24', '超过3天', '0');
INSERT INTO `rock_flow_course` VALUES ('22', '1', '结束', null, '2', '0', null, null, null, 'end', null, null, '0', '2015-01-13 16:45:51', '小于3天', '0');
INSERT INTO `rock_flow_course` VALUES ('23', '2', '主管审核', null, '19', '0', null, null, null, 'super', null, null, '0', '2015-01-13 17:12:19', null, '0');
INSERT INTO `rock_flow_course` VALUES ('24', '3', '主管审核', null, '0', '0', 'all', '所有人员', null, 'user', '3', '貂蝉', '0', '2015-06-24 11:29:19', null, '0');
INSERT INTO `rock_flow_course` VALUES ('25', '4', '接收人签收', 'qianshou', '0', '0', 'all', '所有人员', null, 'auto', null, null, '0', '2015-06-18 09:28:30', null, '0');
INSERT INTO `rock_flow_course` VALUES ('26', '6', '行政发放', null, '0', '0', 'all', '所有人员', null, 'user', '5', '小乔', '0', '2015-07-23 16:18:50', null, '0');
INSERT INTO `rock_flow_course` VALUES ('27', '7', '领导审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-01 11:52:06', null, '0');
INSERT INTO `rock_flow_course` VALUES ('28', '7', '人事审批', null, '27', '0', null, null, null, 'rank', null, '人事经理', '0', '2015-08-01 11:52:23', null, '0');
INSERT INTO `rock_flow_course` VALUES ('29', '9', '领导审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-02 15:07:56', null, '0');
INSERT INTO `rock_flow_course` VALUES ('30', '9', '人事审批', null, '29', '0', null, null, null, 'rank', null, '人事经理', '0', '2015-08-02 15:08:07', null, '0');
INSERT INTO `rock_flow_course` VALUES ('31', '8', '人事经理审批', null, '0', '0', 'all', '所有人员', null, 'rank', null, '人事经理', '0', '2015-08-03 13:29:04', null, '0');
INSERT INTO `rock_flow_course` VALUES ('32', '10', '主管审核', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-05 12:08:06', null, '0');
INSERT INTO `rock_flow_course` VALUES ('33', '11', '上级审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-20 17:13:05', null, '0');
INSERT INTO `rock_flow_course` VALUES ('34', '11', '财务主管审批', null, '33', '0', null, null, null, 'rank', null, '财务经理', '0', '2015-08-20 17:15:36', null, '0');
INSERT INTO `rock_flow_course` VALUES ('35', '11', '财务付款', null, '34', '0', null, null, null, 'rank', null, '出纳', '0', '2015-08-20 17:15:00', null, '0');
INSERT INTO `rock_flow_course` VALUES ('36', '12', '上级审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-25 11:17:18', null, '0');
INSERT INTO `rock_flow_course` VALUES ('37', '12', '财务主管审批', null, '36', '0', null, null, null, 'rank', null, '财务经理', '0', '2015-08-25 11:18:00', null, '0');
INSERT INTO `rock_flow_course` VALUES ('38', '12', '出纳付款', null, '37', '0', null, null, null, 'rank', null, '出纳', '0', '2015-08-25 11:18:19', null, '0');
INSERT INTO `rock_flow_course` VALUES ('39', '13', '上级审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-08-25 11:22:06', null, '0');
INSERT INTO `rock_flow_course` VALUES ('40', '14', '上级审批', 'rewardobj', '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-09-14 14:34:46', null, '0');
INSERT INTO `rock_flow_course` VALUES ('41', '14', '人事确认', null, '40', '0', null, null, null, 'rank', null, '人事经理', '0', '2015-09-14 13:52:00', null, '0');
INSERT INTO `rock_flow_course` VALUES ('42', '13', '财务主管审批', null, '39', '0', null, null, null, 'rank', null, '财务经理', '0', '2015-09-15 15:52:00', null, '0');
INSERT INTO `rock_flow_course` VALUES ('43', '13', '财务付款', null, '42', '0', null, null, null, 'rank', null, '出纳', '0', '2015-09-15 15:52:17', null, '0');
INSERT INTO `rock_flow_course` VALUES ('44', '15', '上级审批', null, '0', '0', 'all', '所有人员', null, 'super', null, null, '0', '2015-09-23 14:09:09', null, '0');
INSERT INTO `rock_flow_course` VALUES ('45', '15', '行政审批', null, '44', '0', null, null, null, 'rank', null, '行政前台', '0', '2015-09-23 14:09:33', null, '0');
INSERT INTO `rock_flow_course` VALUES ('46', '12', '总经理审批', null, '36', '38', null, null, null, 'rank', null, '总经理', '0', '2015-10-27 10:26:55', '大于5千', '0');
INSERT INTO `rock_flow_course` VALUES ('47', '16', '行政审批', null, '0', '0', 'all', '所有人员', null, 'rank', null, '行政主管', '0', '2015-11-22 20:53:09', null, '0');
INSERT INTO `rock_flow_course` VALUES ('48', '17', '技术部受理', null, '0', '0', 'all', '所有人员', null, 'rank', null, 'OA项目经理', '0', '2015-11-28 20:12:17', null, '1');
INSERT INTO `rock_flow_course` VALUES ('49', '17', '技术人员处理', 'jishuculi', '48', '0', null, null, null, 'auto', null, null, '0', '2015-11-28 20:12:22', null, '0');
INSERT INTO `rock_flow_course` VALUES ('50', '20', '人事审批', null, '0', '0', 'all', '所有人员', null, 'rank', null, '人事经理', '0', '2015-12-30 18:39:12', null, '0');

-- ----------------------------
-- Table structure for `rock_flow_courseact`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_courseact`;
CREATE TABLE `rock_flow_courseact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` smallint(6) DEFAULT '0' COMMENT '模块id',
  `cid` int(11) DEFAULT NULL COMMENT '进程id',
  `name` varchar(20) DEFAULT NULL COMMENT '动作名称',
  `names` varchar(20) DEFAULT NULL COMMENT '副名称',
  `actv` smallint(6) DEFAULT '0' COMMENT '状态值',
  `nid` int(11) DEFAULT '0' COMMENT '下一步id@0|正常,-1|退回提交人',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `action` varchar(100) DEFAULT NULL COMMENT '动作执行方法名',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `color` varchar(20) DEFAULT NULL COMMENT '状态颜色',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_courseact
-- ----------------------------
INSERT INTO `rock_flow_courseact` VALUES ('1', '4', '25', '签收', '已签收', '1', '0', '0', null, null, 'green');
INSERT INTO `rock_flow_courseact` VALUES ('2', '4', '25', '不签收', null, '2', '-1', '1', null, null, 'red');
INSERT INTO `rock_flow_courseact` VALUES ('3', '6', '26', '发放', '已发放', '1', '0', '0', null, null, 'green');
INSERT INTO `rock_flow_courseact` VALUES ('4', '6', '26', '驳回', null, '2', '-1', '1', null, null, 'red');
INSERT INTO `rock_flow_courseact` VALUES ('5', '11', '35', '付款', '已付款', '1', '0', '0', null, null, 'green');
INSERT INTO `rock_flow_courseact` VALUES ('6', '12', '38', '付款', '已付款', '1', '0', '0', null, null, 'green');
INSERT INTO `rock_flow_courseact` VALUES ('7', '13', '43', '付款', '已付款', '1', '0', '0', null, null, 'green');

-- ----------------------------
-- Table structure for `rock_flow_courseinput`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_courseinput`;
CREATE TABLE `rock_flow_courseinput` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` smallint(6) DEFAULT '0',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `type` varchar(20) DEFAULT NULL COMMENT '表单类型',
  `sort` smallint(6) DEFAULT '0',
  `label` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_courseinput
-- ----------------------------
INSERT INTO `rock_flow_courseinput` VALUES ('1', '0', '处理人表单', null, '0', null);
INSERT INTO `rock_flow_courseinput` VALUES ('2', '1', 'changeuser', 'changeuser', '0', '下一步处理人');

-- ----------------------------
-- Table structure for `rock_flow_log`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_log`;
CREATE TABLE `rock_flow_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table` varchar(50) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '0' COMMENT '1通过',
  `statusname` varchar(20) DEFAULT NULL COMMENT '状态名称',
  `name` varchar(50) DEFAULT NULL COMMENT '进程名称',
  `courseid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `ip` varchar(30) DEFAULT NULL,
  `web` varchar(50) DEFAULT NULL COMMENT '浏览器',
  `checkname` varchar(20) DEFAULT NULL,
  `checkid` smallint(6) DEFAULT NULL,
  `modeid` smallint(6) DEFAULT NULL COMMENT '@模块Id',
  `color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `table` (`table`,`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=373 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_log
-- ----------------------------
INSERT INTO `rock_flow_log` VALUES ('187', 'kq_info', '33', '1', null, '提交', '0', '2015-07-20 10:27:15', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('188', 'kq_info', '33', '1', null, '提交', '0', '2015-07-20 10:30:40', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('189', 'kq_info', '34', '1', null, '提交', '0', '2015-07-20 10:31:17', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '2', null);
INSERT INTO `rock_flow_log` VALUES ('190', 'kq_out', '7', '1', null, '提交', '0', '2015-07-20 10:31:47', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('191', 'docdeil', '8', '1', null, '提交', '0', '2015-07-20 11:03:49', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('192', 'supplea', '3', '1', null, '提交', '0', '2015-07-23 16:58:27', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('193', 'supplea', '4', '1', null, '提交', '0', '2015-07-23 17:03:32', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('194', 'supplea', '4', '1', '通过', '行政发放', '26', '2015-07-23 17:14:28', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '6', null);
INSERT INTO `rock_flow_log` VALUES ('195', 'supplea', '5', '1', null, '提交', '0', '2015-07-23 17:39:37', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('196', 'supplea', '5', '2', '驳回', '行政发放', '26', '2015-07-23 17:40:51', '1211221', '127.0.0.1', 'MSIE 9', '小乔', '5', '6', null);
INSERT INTO `rock_flow_log` VALUES ('197', 'supplea', '5', '1', '发放', '行政发放', '26', '2015-07-23 17:42:32', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '6', null);
INSERT INTO `rock_flow_log` VALUES ('198', 'kq_info', '35', '1', null, '提交', '0', '2015-07-29 15:01:24', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('199', 'docdeil', '8', '1', null, '提交', '0', '2015-07-29 16:58:51', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('200', 'docdeil', '8', '1', null, '提交', '0', '2015-07-30 20:10:22', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('201', 'docdeil', '8', '1', null, '提交', '0', '2015-07-30 20:10:57', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('202', 'docdeil', '8', '1', null, '提交', '0', '2015-07-30 20:11:27', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('203', 'hrpositive', '1', '1', null, '提交', '0', '2015-08-01 11:52:54', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '7', null);
INSERT INTO `rock_flow_log` VALUES ('204', 'hrpositive', '1', '1', '通过', '领导审批', '27', '2015-08-01 12:09:50', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '7', null);
INSERT INTO `rock_flow_log` VALUES ('205', 'hrpositive', '1', '1', '通过', '人事审批', '28', '2015-08-01 12:15:49', null, '127.0.0.1', 'MSIE 9', '貂蝉', '3', '7', null);
INSERT INTO `rock_flow_log` VALUES ('206', 'hrredund', '1', '1', null, '提交', '0', '2015-08-02 14:58:31', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('207', 'hrredund', '1', '1', null, '提交', '0', '2015-08-02 15:04:25', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('208', 'hrredund', '2', '1', null, '提交', '0', '2015-08-02 15:05:33', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('209', 'hrredund', '2', '1', null, '提交', '0', '2015-08-03 10:43:26', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('210', 'hrredund', '2', '1', null, '提交', '0', '2015-08-03 10:46:40', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('211', 'hrredund', '2', '1', null, '提交', '0', '2015-08-03 10:47:55', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('212', 'hrredund', '1', '1', null, '提交', '0', '2015-08-03 10:49:07', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '9', null);
INSERT INTO `rock_flow_log` VALUES ('213', 'hrtransfer', '1', '1', null, '提交', '0', '2015-08-03 14:27:29', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '8', null);
INSERT INTO `rock_flow_log` VALUES ('214', 'hrtransfer', '1', '1', null, '提交', '0', '2015-08-03 17:46:15', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '8', null);
INSERT INTO `rock_flow_log` VALUES ('215', 'hrtransfer', '1', '1', '通过', '人事经理审批', '31', '2015-08-03 17:46:49', null, '127.0.0.1', 'Firefox', '貂蝉', '3', '8', null);
INSERT INTO `rock_flow_log` VALUES ('216', 'hrtransfer', '2', '1', null, '提交', '0', '2015-08-03 17:49:34', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '8', null);
INSERT INTO `rock_flow_log` VALUES ('217', 'hrtransfer', '2', '1', '通过', '人事经理审批', '31', '2015-08-03 17:49:58', null, '127.0.0.1', 'Firefox', '貂蝉', '3', '8', null);
INSERT INTO `rock_flow_log` VALUES ('218', 'hrtransfer', '3', '1', null, '提交', '0', '2015-08-03 18:09:37', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '8', null);
INSERT INTO `rock_flow_log` VALUES ('219', 'hrtransfer', '3', '1', '通过', '人事经理审批', '31', '2015-08-03 18:09:46', null, '127.0.0.1', 'Firefox', '貂蝉', '3', '8', null);
INSERT INTO `rock_flow_log` VALUES ('220', 'hrpositive', '2', '1', null, '提交', '0', '2015-08-05 10:42:22', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '7', null);
INSERT INTO `rock_flow_log` VALUES ('221', 'kq_dkerr', '1', '1', null, '提交', '0', '2015-08-05 12:08:41', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '10', null);
INSERT INTO `rock_flow_log` VALUES ('222', 'kq_dkerr', '1', '1', '通过', '主管审核', '32', '2015-08-05 12:28:44', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '10', null);
INSERT INTO `rock_flow_log` VALUES ('223', 'kq_info', '33', '1', null, '提交', '0', '2015-08-05 14:36:33', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('224', 'kq_info', '33', '1', '通过', '主管审核', '1', '2015-08-05 15:56:27', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('225', 'kq_info', '35', '1', '通过', '主管审核', '1', '2015-08-05 15:56:32', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('226', 'kq_info', '33', '1', '通过', '人事确认', '2', '2015-08-05 15:57:11', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '1', null);
INSERT INTO `rock_flow_log` VALUES ('227', 'kq_info', '35', '1', '通过', '人事确认', '2', '2015-08-05 15:57:16', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '1', null);
INSERT INTO `rock_flow_log` VALUES ('228', 'kq_info', '34', '1', null, '删除', '0', '2015-08-07 12:20:46', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '2', null);
INSERT INTO `rock_flow_log` VALUES ('229', 'docdeil', '8', '1', '签收', '接收人签收', '25', '2015-08-08 22:28:30', null, '192.168.1.103', 'IE', '貂蝉', '3', '4', null);
INSERT INTO `rock_flow_log` VALUES ('230', 'hrredund', '1', '2', '不通过', '领导审批', '29', '2015-08-09 16:14:54', '不够', '192.168.1.150', 'IE', '刘备', '7', '9', null);
INSERT INTO `rock_flow_log` VALUES ('231', 'hrredund', '1', '1', null, '删除', '0', '2015-08-09 18:05:17', null, '192.168.1.150', 'IE', null, '0', '9', null);
INSERT INTO `rock_flow_log` VALUES ('232', 'docdeil', '9', '1', null, '提交', '0', '2015-08-14 10:40:21', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('233', 'docdeil', '9', '1', '签收', '接收人签收', '25', '2015-08-14 10:44:13', '好吧', '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('234', 'docdeil', '10', '1', null, '提交', '0', '2015-08-14 10:57:14', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('235', 'docdeil', '10', '1', null, '提交', '0', '2015-08-14 11:01:45', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('236', 'docdeil', '10', '1', '签收', '接收人签收', '25', '2015-08-15 21:43:27', null, '192.168.1.103', 'IE', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('237', 'kq_info', '36', '2', '不通过', '主管审核', '1', '2015-08-18 16:19:50', '不能通过啊', '127.0.0.1', 'Firefox', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('238', 'kq_info', '36', '1', null, '删除', '0', '2015-08-19 10:51:51', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('239', 'kq_info', '37', '1', null, '提交', '0', '2015-08-19 10:59:43', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('240', 'kq_info', '37', '1', null, '删除', '0', '2015-08-19 11:05:34', '不想请假了啦', '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('241', 'kq_out', '8', '1', null, '提交', '0', '2015-08-19 11:16:40', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('242', 'kq_out', '8', '1', null, '追加说明', '0', '2015-08-19 11:33:43', '哈啊哈哈', '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('243', 'supplea', '7', '1', null, '提交', '0', '2015-08-19 12:14:03', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('244', 'supplea', '7', '1', null, '追加说明', '0', '2015-08-19 12:14:38', '哈哈', '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('245', 'kq_out', '8', '1', null, '追加说明', '0', '2015-08-19 13:20:02', '嗯', '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('246', 'kq_out', '8', '2', '不通过', '主管审核', '24', '2015-08-19 14:41:50', '没事干嘛外出啊！', '127.0.0.1', 'MSIE 9', '貂蝉', '3', '3', null);
INSERT INTO `rock_flow_log` VALUES ('247', 'kq_out', '8', '1', null, '追加说明', '0', '2015-08-19 14:44:14', '就是想出去走走啊，哇', '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('248', 'kq_out', '8', '1', '通过', '主管审核', '24', '2015-08-19 14:45:58', '好把，你去吧', '127.0.0.1', 'MSIE 9', '貂蝉', '3', '3', null);
INSERT INTO `rock_flow_log` VALUES ('249', 'kq_info', '39', '1', null, '提交', '0', '2015-08-20 10:57:03', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('250', 'kq_dkerr', '2', '1', null, '提交', '0', '2015-08-20 16:35:08', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '10', null);
INSERT INTO `rock_flow_log` VALUES ('251', 'kq_dkerr', '2', '1', null, '提交', '0', '2015-08-20 16:37:34', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '10', null);
INSERT INTO `rock_flow_log` VALUES ('252', 'docdeil', '11', '1', null, '提交', '0', '2015-08-21 11:25:09', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('253', 'fininfom', '1', '1', null, '提交', '0', '2015-08-21 13:32:05', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('254', 'fininfom', '1', '1', null, '提交', '0', '2015-08-21 13:38:26', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('255', 'fininfom', '1', '1', null, '提交', '0', '2015-08-21 13:45:19', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('256', 'fininfom', '1', '1', '通过', '上级审批', '33', '2015-08-21 13:55:28', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '11', null);
INSERT INTO `rock_flow_log` VALUES ('257', 'fininfom', '1', '2', '不通过', '财务主管审批', '34', '2015-08-21 20:39:20', 'hahaha', '127.0.0.1', 'MSIE 9', '赵子龙', '9', '11', null);
INSERT INTO `rock_flow_log` VALUES ('258', 'fininfom', '1', '1', '通过', '财务主管审批', '34', '2015-08-21 20:39:40', null, '127.0.0.1', 'MSIE 9', '赵子龙', '9', '11', null);
INSERT INTO `rock_flow_log` VALUES ('259', 'fininfom', '1', '1', '付款', '财务付款', '35', '2015-08-21 20:42:13', null, '127.0.0.1', 'MSIE 9', '吕布', '10', '11', 'green');
INSERT INTO `rock_flow_log` VALUES ('260', 'supplea', '8', '1', null, '提交', '0', '2015-08-21 21:03:10', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '6', null);
INSERT INTO `rock_flow_log` VALUES ('261', 'supplea', '8', '2', '驳回', '行政发放', '26', '2015-08-21 21:04:52', '挨饿', '127.0.0.1', 'MSIE 9', '小乔', '5', '6', 'red');
INSERT INTO `rock_flow_log` VALUES ('262', 'supplea', '8', '1', '已发放', '行政发放', '26', '2015-08-21 21:05:01', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '6', 'green');
INSERT INTO `rock_flow_log` VALUES ('263', 'docdeil', '12', '1', null, '提交', '0', '2015-08-26 16:36:11', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('264', 'docdeil', '12', '1', null, '提交', '0', '2015-08-26 16:40:23', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('265', 'docdeil', '12', '1', null, '提交', '0', '2015-08-26 16:41:49', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('266', 'docdeil', '12', '1', null, '提交', '0', '2015-08-26 16:46:49', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('267', 'docdeil', '12', '1', null, '提交', '0', '2015-08-26 16:47:36', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('268', 'fininfom', '2', '1', null, '提交', '0', '2015-09-09 10:35:35', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('269', 'fininfom', '2', '1', '通过', '上级审批', '33', '2015-09-09 10:42:03', null, '127.0.0.1', 'Firefox', '刘备', '7', '11', null);
INSERT INTO `rock_flow_log` VALUES ('270', 'docdeil', '12', '2', '不签收', '接收人签收', '25', '2015-09-11 16:27:41', '哈哈哈', '127.0.0.1', 'Firefox', '貂蝉', '3', '4', 'red');
INSERT INTO `rock_flow_log` VALUES ('271', 'docdeil', '12', '1', null, '追加说明', '0', '2015-09-11 16:37:41', '呵呵呵', '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('272', 'reward', '1', '1', null, '提交', '0', '2015-09-14 14:33:31', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '14', null);
INSERT INTO `rock_flow_log` VALUES ('273', 'reward', '1', '1', null, '提交', '0', '2015-09-14 14:49:39', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '14', null);
INSERT INTO `rock_flow_log` VALUES ('274', 'reward', '1', '1', null, '提交', '0', '2015-09-14 14:51:59', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '14', null);
INSERT INTO `rock_flow_log` VALUES ('275', 'reward', '1', '1', '通过', '上级审批', '40', '2015-09-14 15:03:17', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '14', null);
INSERT INTO `rock_flow_log` VALUES ('276', 'fininfom', '3', '1', null, '提交', '0', '2015-09-15 09:48:54', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('277', 'fininfom', '4', '1', null, '提交', '0', '2015-09-15 15:54:17', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '13', null);
INSERT INTO `rock_flow_log` VALUES ('278', 'fininfom', '4', '1', '通过', '上级审批', '39', '2015-09-15 16:05:02', null, '127.0.0.1', 'Firefox', '刘备', '7', '13', null);
INSERT INTO `rock_flow_log` VALUES ('279', 'fininfom', '4', '1', '通过', '财务主管审批', '42', '2015-09-15 16:06:03', null, '127.0.0.1', 'Firefox', '赵子龙', '9', '13', null);
INSERT INTO `rock_flow_log` VALUES ('280', 'fininfom', '4', '1', '已付款', '财务付款', '43', '2015-09-15 16:06:43', null, '127.0.0.1', 'Firefox', '吕布', '10', '13', 'green');
INSERT INTO `rock_flow_log` VALUES ('281', 'fininfom', '5', '1', null, '提交', '0', '2015-09-15 17:27:32', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '12', null);
INSERT INTO `rock_flow_log` VALUES ('282', 'kq_dkerr', '2', '1', null, '删除', '0', '2015-09-16 17:47:55', 'hahaha', '127.0.0.1', 'MSIE 9', '管理员', '1', '10', null);
INSERT INTO `rock_flow_log` VALUES ('283', 'docdeil', '11', '1', null, '提交', '0', '2015-09-17 16:14:07', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('284', 'docdeil', '11', '1', null, '提交', '0', '2015-09-17 16:16:28', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('285', 'docdeil', '11', '1', null, '提交', '0', '2015-09-17 16:17:04', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('286', 'docdeil', '11', '1', null, '提交', '0', '2015-09-17 16:27:31', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('287', 'careserve', '1', '1', null, '提交', '0', '2015-09-23 15:34:17', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('288', 'careserve', '1', '1', null, '提交', '0', '2015-09-23 15:53:46', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('289', 'careserve', '1', '1', null, '提交', '0', '2015-09-23 16:12:22', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('290', 'careserve', '2', '1', null, '提交', '0', '2015-09-23 16:13:46', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('291', 'careserve', '2', '1', null, '提交', '0', '2015-09-23 16:38:39', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('292', 'careserve', '2', '1', null, '提交', '0', '2015-09-23 16:54:08', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('293', 'careserve', '1', '1', null, '提交', '0', '2015-09-23 16:54:19', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '15', null);
INSERT INTO `rock_flow_log` VALUES ('294', 'careserve', '2', '1', '通过', '上级审批', '44', '2015-09-24 09:18:51', null, '127.0.0.1', 'Firefox', '刘备', '7', '15', null);
INSERT INTO `rock_flow_log` VALUES ('295', 'careserve', '1', '1', '通过', '上级审批', '44', '2015-09-24 09:18:55', null, '127.0.0.1', 'Firefox', '刘备', '7', '15', null);
INSERT INTO `rock_flow_log` VALUES ('296', 'careserve', '2', '1', '通过', '行政审批', '45', '2015-09-24 09:20:12', null, '127.0.0.1', 'Firefox', '小乔', '5', '15', null);
INSERT INTO `rock_flow_log` VALUES ('297', 'careserve', '1', '1', '通过', '行政审批', '45', '2015-09-24 09:20:15', null, '127.0.0.1', 'Firefox', '小乔', '5', '15', null);
INSERT INTO `rock_flow_log` VALUES ('298', 'docdeil', '11', '1', '已签收', '接收人签收', '25', '2015-09-28 09:28:25', null, '192.168.1.21', 'Android', '管理员', '1', '4', 'green');
INSERT INTO `rock_flow_log` VALUES ('299', 'docdeil', '12', '1', null, '提交', '0', '2015-10-13 15:45:59', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('300', 'docdeil', '12', '1', null, '提交', '0', '2015-10-13 15:48:50', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('301', 'reward', '1', '2', '不通过', '人事确认', '41', '2015-10-20 08:59:48', '12', '127.0.0.1', 'MSIE 9', '貂蝉', '3', '14', null);
INSERT INTO `rock_flow_log` VALUES ('302', 'docdeil', '12', '1', '已签收', '接收人签收', '25', '2015-10-20 09:03:07', null, '127.0.0.1', 'MSIE 9', '貂蝉', '3', '4', 'green');
INSERT INTO `rock_flow_log` VALUES ('303', 'kq_info', '39', '1', '通过', '主管审核', '1', '2015-10-20 09:12:23', 'en', '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('304', 'fininfom', '3', '1', '通过', '上级审批', '33', '2015-10-20 09:12:44', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '11', null);
INSERT INTO `rock_flow_log` VALUES ('305', 'fininfom', '5', '1', '通过', '上级审批', '36', '2015-10-20 09:23:29', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '12', null);
INSERT INTO `rock_flow_log` VALUES ('306', 'kq_info', '39', '1', '通过', '人事确认', '2', '2015-10-20 09:26:08', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '1', null);
INSERT INTO `rock_flow_log` VALUES ('307', 'supplea', '7', '1', '已发放', '行政发放', '26', '2015-10-20 09:26:38', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '6', 'green');
INSERT INTO `rock_flow_log` VALUES ('308', 'fininfom', '2', '2', '不通过', '财务主管审批', '34', '2015-10-20 09:35:40', '数据不完整', '127.0.0.1', 'MSIE 9', '赵子龙', '9', '11', null);
INSERT INTO `rock_flow_log` VALUES ('309', 'fininfom', '3', '1', '通过', '财务主管审批', '34', '2015-10-20 09:35:58', '好的', '127.0.0.1', 'MSIE 9', '赵子龙', '9', '11', null);
INSERT INTO `rock_flow_log` VALUES ('310', 'kq_info', '40', '1', null, '提交', '0', '2015-10-20 09:43:41', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('311', 'kq_info', '40', '1', null, '提交', '0', '2015-10-20 09:44:58', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('312', 'kq_info', '40', '1', null, '提交', '0', '2015-10-20 09:45:35', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('313', 'fininfom', '2', '1', null, '追加说明', '0', '2015-10-21 15:41:28', '追加说明吧，呵呵', '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('314', 'fininfom', '2', '2', '不通过', '财务主管审批', '34', '2015-10-22 09:42:41', 'hehe', '127.0.0.1', 'MSIE 9', '赵子龙', '9', '11', null);
INSERT INTO `rock_flow_log` VALUES ('315', 'fininfom', '2', '1', null, '追加说明', '0', '2015-10-22 10:17:54', '嘿嘿和', '127.0.0.1', 'MSIE 9', '管理员', '1', '11', null);
INSERT INTO `rock_flow_log` VALUES ('316', 'reward', '1', '1', null, '追加说明', '0', '2015-10-22 10:46:42', '黑河呵呵', '127.0.0.1', 'MSIE 9', '管理员', '1', '14', null);
INSERT INTO `rock_flow_log` VALUES ('317', 'reward', '1', '1', null, '追加说明', '0', '2015-10-22 10:58:13', '12', '127.0.0.1', 'MSIE 9', '管理员', '1', '14', null);
INSERT INTO `rock_flow_log` VALUES ('318', 'fininfom', '5', '1', '通过', '财务主管审批', '37', '2015-10-23 10:08:48', null, '192.168.1.21', 'Android', '赵子龙', '9', '12', null);
INSERT INTO `rock_flow_log` VALUES ('319', 'docdeil', '13', '1', null, '提交', '0', '2015-10-27 11:21:01', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', null);
INSERT INTO `rock_flow_log` VALUES ('320', 'fininfom', '6', '1', null, '提交', '0', '2015-10-29 09:54:29', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '13', null);
INSERT INTO `rock_flow_log` VALUES ('321', 'docdeil', '13', '1', '已签收', '接收人签收', '25', '2015-11-11 20:07:15', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '4', 'green');
INSERT INTO `rock_flow_log` VALUES ('322', 'meet', '112', '1', null, '提交', '0', '2015-11-21 21:34:22', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '16', null);
INSERT INTO `rock_flow_log` VALUES ('323', 'meet', '121', '1', null, '提交', '0', '2015-11-23 19:07:55', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '16', null);
INSERT INTO `rock_flow_log` VALUES ('324', 'meet', '122', '1', null, '提交', '0', '2015-11-23 19:36:46', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '16', null);
INSERT INTO `rock_flow_log` VALUES ('325', 'meet', '121', '1', '通过', '行政审批', '47', '2015-11-23 19:37:37', null, '127.0.0.1', 'Firefox', '大乔', '4', '16', null);
INSERT INTO `rock_flow_log` VALUES ('326', 'meet', '122', '1', '通过', '行政审批', '47', '2015-11-23 19:37:38', null, '127.0.0.1', 'Firefox', '大乔', '4', '16', null);
INSERT INTO `rock_flow_log` VALUES ('327', 'meet', '112', '1', '通过', '行政审批', '47', '2015-11-23 19:37:40', null, '127.0.0.1', 'Firefox', '大乔', '4', '16', null);
INSERT INTO `rock_flow_log` VALUES ('328', 'kq_info', '41', '1', null, '提交', '0', '2015-11-27 20:55:42', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('329', 'kq_info', '42', '1', null, '提交', '0', '2015-11-27 20:56:03', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '2', null);
INSERT INTO `rock_flow_log` VALUES ('330', 'kq_out', '9', '1', null, '提交', '0', '2015-11-27 20:56:27', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('331', 'kq_dkerr', '3', '1', null, '提交', '0', '2015-11-27 20:56:41', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '10', null);
INSERT INTO `rock_flow_log` VALUES ('332', 'demand', '1', '1', null, '提交', '0', '2015-11-27 22:01:54', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('333', 'demand', '1', '1', '通过', '技术部受理', '48', '2015-11-28 12:30:42', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('334', 'demand', '2', '1', null, '提交', '0', '2015-11-28 12:38:04', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('335', 'kq_info', '41', '1', '通过', '主管审核', '1', '2015-11-28 19:43:07', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('336', 'demand', '2', '1', '通过', '技术部受理', '48', '2015-11-28 19:44:03', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('337', 'demand', '3', '1', null, '提交', '0', '2015-11-28 19:56:23', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('338', 'demand', '3', '1', '通过', '技术部受理', '48', '2015-11-28 20:09:58', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('339', 'demand', '4', '1', null, '提交', '0', '2015-11-28 20:12:42', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('340', 'demand', '4', '1', '通过', '技术部受理', '48', '2015-11-28 20:13:01', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('341', 'demand', '3', '1', '通过', '技术人员处理', '49', '2015-11-28 21:26:58', '1212', '127.0.0.1', 'Firefox', '大乔', '4', '17', null);
INSERT INTO `rock_flow_log` VALUES ('342', 'demand', '2', '1', '通过', '技术人员处理', '49', '2015-11-28 22:04:39', null, '127.0.0.1', 'Firefox', '大乔', '4', '17', null);
INSERT INTO `rock_flow_log` VALUES ('343', 'demand', '1', '2', '不通过', '技术人员处理', '49', '2015-11-28 22:13:41', '呵呵呵额呵呵呵呵', '127.0.0.1', 'Firefox', '大乔', '4', '17', null);
INSERT INTO `rock_flow_log` VALUES ('344', 'demand', '1', '1', '通过', '技术人员处理', '49', '2015-11-28 22:23:43', '深市大多数', '127.0.0.1', 'Firefox', '大乔', '4', '17', null);
INSERT INTO `rock_flow_log` VALUES ('345', 'kq_dkerr', '3', '1', '通过', '主管审核', '32', '2015-11-28 22:47:38', null, '127.0.0.1', 'Chrome', '刘备', '7', '10', null);
INSERT INTO `rock_flow_log` VALUES ('346', 'kq_info', '41', '1', '通过', '人事确认', '2', '2015-11-30 20:20:17', null, '127.0.0.1', 'MSIE 9', '小乔', '5', '1', null);
INSERT INTO `rock_flow_log` VALUES ('347', 'demand', '4', '1', '通过', '技术人员处理', '49', '2015-11-30 20:35:43', '112', '127.0.0.1', 'MSIE 9', '小乔', '5', '17', null);
INSERT INTO `rock_flow_log` VALUES ('348', 'kq_out', '9', '1', null, '追加说明', '0', '2015-11-30 21:15:26', 'eeeeew', '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('349', 'kq_out', '9', '1', null, '提交', '0', '2015-12-06 21:33:27', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '3', null);
INSERT INTO `rock_flow_log` VALUES ('350', 'demand', '5', '1', null, '提交', '0', '2015-12-12 11:24:08', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('351', 'demand', '5', '1', null, '提交', '0', '2015-12-15 18:56:33', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('352', 'demand', '5', '1', null, '提交', '0', '2015-12-15 19:32:09', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('353', 'demand', '5', '1', null, '删除', '0', '2015-12-27 15:41:46', '哈呵呵', '127.0.0.1', 'MSIE 9', '管理员', '1', '17', null);
INSERT INTO `rock_flow_log` VALUES ('354', 'kq_info', '46', '1', null, '提交', '0', '2015-12-27 17:38:26', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('355', 'kq_info', '47', '1', null, '提交', '0', '2015-12-27 17:40:50', null, '192.168.1.100', 'Firefox', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('356', 'kq_info', '47', '1', null, '提交', '0', '2015-12-27 17:41:44', null, '127.0.0.1', 'MSIE 9', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('357', 'kq_info', '47', '1', null, '提交', '0', '2015-12-27 17:42:09', null, '127.0.0.1', 'MSIE 9', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('358', 'kq_info', '48', '1', null, '提交', '0', '2015-12-27 17:43:19', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('359', 'kq_info', '49', '1', null, '提交', '0', '2015-12-27 18:23:40', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '2', null);
INSERT INTO `rock_flow_log` VALUES ('360', 'kq_out', '10', '1', null, '提交', '0', '2015-12-27 19:11:59', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '3', null);
INSERT INTO `rock_flow_log` VALUES ('361', 'kq_info', '50', '1', null, '提交', '0', '2015-12-27 19:12:14', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '2', null);
INSERT INTO `rock_flow_log` VALUES ('362', 'kq_info', '51', '1', null, '提交', '0', '2015-12-27 19:12:36', null, '192.168.1.100', 'MSIE 9', '貂蝉', '3', '1', null);
INSERT INTO `rock_flow_log` VALUES ('363', 'kq_sick', '1', '1', null, '提交', '0', '2015-12-30 21:27:54', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '20', null);
INSERT INTO `rock_flow_log` VALUES ('364', 'kq_sick', '1', '1', '通过', '人事审批', '50', '2015-12-30 21:57:40', 'w', '127.0.0.1', 'MSIE 9', '貂蝉', '3', '20', null);
INSERT INTO `rock_flow_log` VALUES ('365', 'kq_info', '52', '1', null, '提交', '0', '2016-01-05 21:19:06', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('366', 'kq_info', '52', '1', null, '提交', '0', '2016-01-05 21:23:12', null, '127.0.0.1', 'MSIE 9', '管理员', '1', '1', null);
INSERT INTO `rock_flow_log` VALUES ('369', 'kq_info', '52', '1', '通过', '主管审核', '1', '2016-01-06 22:14:15', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('370', 'kq_info', '40', '1', '通过', '主管审核', '1', '2016-01-06 22:19:17', null, '127.0.0.1', 'MSIE 9', '刘备', '7', '1', null);
INSERT INTO `rock_flow_log` VALUES ('371', 'kq_info', '47', '1', '通过', '主管审核', '1', '2016-01-12 16:52:21', null, '192.168.1.102', 'Safari', '大乔', '4', '1', null);
INSERT INTO `rock_flow_log` VALUES ('372', 'kq_info', '47', '1', '通过', '人事确认', '2', '2016-01-12 16:52:21', '前置自动审核', '192.168.1.102', 'Safari', '大乔', '4', '1', null);

-- ----------------------------
-- Table structure for `rock_flow_rule`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_rule`;
CREATE TABLE `rock_flow_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rulename` varchar(50) DEFAULT NULL COMMENT '对应记录姓名',
  `flowname` varchar(50) DEFAULT NULL COMMENT '流程名称',
  `flowid` int(11) DEFAULT NULL,
  `allcourseid` varchar(200) DEFAULT NULL COMMENT '所有进程id',
  `alluserid` varchar(200) DEFAULT NULL COMMENT '所有审核人id',
  `alluser` varchar(200) DEFAULT NULL COMMENT '所有审核人姓名',
  `nowcourseid` int(11) DEFAULT NULL COMMENT '当前进程id',
  `nextcourseid` int(11) DEFAULT NULL COMMENT '下一进程id',
  `nowuser` varchar(200) DEFAULT NULL COMMENT '当前审核人',
  `nowuserid` varchar(200) DEFAULT NULL COMMENT '当前审核人id',
  `allstep` tinyint(4) DEFAULT '0' COMMENT '总步骤',
  `step` tinyint(4) DEFAULT '0' COMMENT '当前步骤',
  `adddt` datetime DEFAULT NULL COMMENT '添加时间',
  `table` varchar(50) DEFAULT NULL COMMENT '对应表',
  `mid` int(11) DEFAULT NULL COMMENT '表上id',
  `nstatus` tinyint(4) DEFAULT '0' COMMENT '当前状态',
  `allcheckid` varchar(300) DEFAULT NULL COMMENT '所有审核人id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13214 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_rule
-- ----------------------------
INSERT INTO `rock_flow_rule` VALUES ('13157', '管理员', '外出出差', '3', '24', '3', '貂蝉', '24', '0', '貂蝉', '3', '1', '1', '2015-07-20 10:31:47', 'kq_out', '7', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13159', '管理员', '申请办公用品', '6', '26', '5', '小乔', '26', '0', '小乔', '5', '1', '1', '2015-07-23 16:58:27', 'supplea', '3', '0', '5');
INSERT INTO `rock_flow_rule` VALUES ('13165', '管理员', '离职申请', '9', '29|30', '7|3', '刘备|貂蝉', '29', '30', '刘备', '7', '2', '1', '2015-08-03 10:47:55', 'hrredund', '2', '0', '7,3');
INSERT INTO `rock_flow_rule` VALUES ('13169', '管理员', '转正申请', '7', '27|28', '7|3', '刘备|貂蝉', '27', '28', '刘备', '7', '2', '1', '2015-08-05 10:42:22', 'hrpositive', '2', '0', '7,3');
INSERT INTO `rock_flow_rule` VALUES ('13192', '管理员', '借款单', '13', '39|42|43', '7|9|10', '刘备|赵子龙|吕布', '39', '42', '刘备', '7', '3', '1', '2015-10-29 09:54:29', 'fininfom', '6', '0', '7,9,10');
INSERT INTO `rock_flow_rule` VALUES ('13190', '管理员', '请假条', '1', '1|2', '7|3', '刘备|貂蝉', '2', '0', '貂蝉', '3', '2', '2', '2016-01-06 22:19:17', 'kq_info', '40', '1', '7,3');
INSERT INTO `rock_flow_rule` VALUES ('13183', '管理员', '费用报销', '11', '33|34|35', '7|9|10', '刘备|赵子龙|吕布', '34', '35', '赵子龙', '9', '3', '2', '2015-10-22 09:42:41', 'fininfom', '2', '2', '7,9,10');
INSERT INTO `rock_flow_rule` VALUES ('13184', '大乔', '奖惩处罚', '14', '40|41', '7|3', '刘备|貂蝉', '41', '0', '貂蝉', '3', '2', '2', '2015-10-20 08:59:48', 'reward', '1', '2', '7,3');
INSERT INTO `rock_flow_rule` VALUES ('13185', '管理员', '费用报销', '11', '33|34|35', '7|9|10', '刘备|赵子龙|吕布', '35', '0', '吕布', '10', '3', '3', '2015-10-20 09:35:58', 'fininfom', '3', '1', '7,9,10');
INSERT INTO `rock_flow_rule` VALUES ('13187', '管理员', '出差报销', '12', '36|37|38', '7|9|10', '刘备|赵子龙|吕布', '38', '0', '吕布', '10', '3', '3', '2015-10-23 10:08:48', 'fininfom', '5', '1', '7,9,10');
INSERT INTO `rock_flow_rule` VALUES ('13198', '管理员', '外出出差', '3', '24', '3', '貂蝉', '24', '0', '貂蝉', '3', '1', '1', '2015-12-06 21:33:27', 'kq_out', '9', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13197', '管理员', '加班单', '2', '20', '3', '貂蝉', '20', '0', '貂蝉', '3', '1', '1', '2015-11-27 20:56:03', 'kq_info', '42', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13205', '貂蝉', '请假条', '1', '1|2', '4|3,4,5', '大乔|貂蝉,大乔,小乔', '1', '2', '大乔', '4', '2', '1', '2016-01-06 19:10:06', 'kq_info', '46', '0', '4,3,4,5');
INSERT INTO `rock_flow_rule` VALUES ('13207', '貂蝉', '请假条', '1', '1|2', '4|3,4,5', '大乔|貂蝉,大乔,小乔', '1', '2', '大乔', '4', '2', '1', '2016-01-06 19:10:06', 'kq_info', '48', '0', '4,3,4,5');
INSERT INTO `rock_flow_rule` VALUES ('13208', '貂蝉', '加班单', '2', '20', '3', '貂蝉', '20', '0', '貂蝉', '3', '1', '1', '2015-12-27 18:23:40', 'kq_info', '49', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13209', '貂蝉', '外出出差', '3', '24', '3', '貂蝉', '24', '0', '貂蝉', '3', '1', '1', '2015-12-27 19:11:59', 'kq_out', '10', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13210', '貂蝉', '加班单', '2', '20', '3', '貂蝉', '20', '0', '貂蝉', '3', '1', '1', '2015-12-27 19:12:14', 'kq_info', '50', '0', '3');
INSERT INTO `rock_flow_rule` VALUES ('13211', '貂蝉', '请假条', '1', '1|2', '4|3,4,5', '大乔|貂蝉,大乔,小乔', '1', '2', '大乔', '4', '2', '1', '2016-01-06 19:10:06', 'kq_info', '51', '0', '4,3,4,5');
INSERT INTO `rock_flow_rule` VALUES ('13213', '管理员', '请假条', '1', '1|2|21', '7|3,4|', '刘备|貂蝉,大乔|', '2', '21', '貂蝉,大乔', '3,4', '3', '2', '2016-01-06 22:14:15', 'kq_info', '52', '1', '7,3,4,');

-- ----------------------------
-- Table structure for `rock_flow_set`
-- ----------------------------
DROP TABLE IF EXISTS `rock_flow_set`;
CREATE TABLE `rock_flow_set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '配置名称',
  `num` varchar(50) DEFAULT NULL COMMENT '编号',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `table` varchar(50) DEFAULT NULL COMMENT '对应的表',
  `uidfields` varchar(50) DEFAULT NULL COMMENT '对应人员字段',
  `statusfields` varchar(50) DEFAULT NULL COMMENT '状态字段',
  `menunum` varchar(50) DEFAULT NULL COMMENT '对应菜单编号',
  `fields` varchar(500) DEFAULT NULL COMMENT '字段聚合',
  `summary` varchar(500) DEFAULT NULL COMMENT '摘要',
  `type` varchar(20) DEFAULT NULL COMMENT '分类',
  `zntx` tinyint(1) DEFAULT '0' COMMENT '@站内提醒',
  `imtx` tinyint(1) DEFAULT '0' COMMENT '@REIM提醒',
  `emtx` tinyint(1) DEFAULT '0' COMMENT '@邮件提醒',
  `sericnum` varchar(50) DEFAULT NULL COMMENT '编号规则',
  `isflow` tinyint(1) DEFAULT '1' COMMENT '是否有流程',
  `isapp` tinyint(1) DEFAULT '1' COMMENT '@是否app模块',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_flow_set
-- ----------------------------
INSERT INTO `rock_flow_set` VALUES ('1', '请假条', 'leave', '0', '2015-11-30 21:21:41', 'kq_info', null, null, null, 'totals', '{qjkind}:{stime}至{etime}共{totals}小时,{explain}', '人事考勤', '0', '1', '0', 'KL-Ymd-', '1', '1');
INSERT INTO `rock_flow_set` VALUES ('2', '加班单', 'jiaban', '1', '2015-08-05 11:28:26', 'kq_info', null, null, null, 'totals,stime', '从{stime}至{etime}共{totals}小时,{explain}', '人事考勤', '0', '1', '0', 'KJ-Ymd-', '1', '1');
INSERT INTO `rock_flow_set` VALUES ('3', '外出出差', 'waichu', '2', '2015-08-05 11:28:40', 'kq_out', null, null, null, null, '[{atype}]前往{address},{outtime},{reason}', '人事考勤', '1', '1', '0', 'KW-Ymd-', '1', '1');
INSERT INTO `rock_flow_set` VALUES ('4', '文件传送', 'docdeil', '20', '2015-06-24 11:27:33', 'docdeil', null, null, null, null, '{title},接收人:{recename}', '协同办公', '1', '1', '0', 'FI-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('5', '工作日报', 'daily', '21', '2015-12-22 18:21:16', 'daily', null, null, null, null, null, '协同办公', '0', '0', '0', '无', '0', '1');
INSERT INTO `rock_flow_set` VALUES ('6', '物品领用', 'supplea', '5', '2015-11-03 09:59:20', 'supplea', null, null, null, null, '物品:{aname},申请数量:{total}', '行政', '1', '0', '0', 'YP-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('7', '转正申请', 'hrpositive', '30', '2015-08-01 11:54:45', 'hrpositive', null, null, null, null, '入职:{entrydt},职位:{ranking},转正{positivedt},{explain}', '人力资源', '1', '1', '0', 'HR-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('8', '人事调动', 'hrtransfer', '32', '2015-08-04 16:08:53', 'hrtransfer', null, null, null, null, '[{tranname}]【{trantype}】:{olddeptname}→{newdeptname},{oldranking}→{newranking}', '人力资源', '1', '1', '0', 'HT-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('9', '离职申请', 'hrredund', '31', '2015-08-03 10:36:35', 'hrredund', null, null, null, null, '原因【{redundreson}】辞职日期[{quitdt}],类型[{redundtype}]', '人力资源', '1', '1', '0', 'HE-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('10', '打卡异常', 'dkerr', '3', '2015-08-05 12:09:30', 'kq_dkerr', null, null, null, null, '{dt}{errtype},应打卡{ytime}', '人事考勤', '1', '1', '0', 'KE-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('11', '费用报销', 'finfybx', '40', '2015-08-20 17:33:46', 'fininfom', null, null, null, 'money', '报销金额:{money}', '财务', '1', '1', '0', 'PA-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('12', '出差报销', 'finccbx', '41', '2015-09-15 17:09:52', 'fininfom', null, null, null, 'money', '报销金额:{money},目的:{purpose},成果:{purresult}', '财务', '1', '1', '0', 'PB-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('13', '借款单', 'finjkd', '42', '2015-09-15 15:56:21', 'fininfom', null, null, null, 'money', '借款金额:{money},用途:{purpose}', '财务', '1', '1', '0', 'PC-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('14', '奖惩处罚', 'reward', '6', '2015-09-15 10:20:09', 'reward', null, null, null, null, '对【{object}】的{atype},奖惩结果:{result},金额:{money}', '行政', '1', '1', '0', 'YA-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('15', '车辆预定', 'careserve', '7', '2015-09-23 15:38:00', 'careserve', null, null, null, null, '{usename}预定车辆【{carnum}】在{startdt}前往{address}', '行政', '1', '0', '0', 'YB-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('16', '会议室预定', 'meet', '8', '2015-11-21 21:43:22', 'meet', null, null, null, null, '预定[{hyname}]从{startdt}→{enddt}', '行政', '1', '0', '0', 'YC-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('17', '业务需求', 'demand', '22', '2015-11-27 22:03:26', 'demand', null, null, null, null, '需求[{title}]', '协同办公', '1', '1', '0', 'FX-Ymd-', '1', '0');
INSERT INTO `rock_flow_set` VALUES ('18', '工作任务', 'work', '23', '2015-12-12 21:55:53', 'work', null, null, null, null, null, '协同办公', '1', '0', '0', '无', '0', '0');
INSERT INTO `rock_flow_set` VALUES ('19', '项目任务', 'projectm', '24', '2015-12-15 20:31:40', 'projectm', null, null, null, null, null, '协同办公', '1', '0', '0', '无', '0', '0');
INSERT INTO `rock_flow_set` VALUES ('20', '销假单', 'sickx', '4', '2015-12-30 21:33:43', 'kq_sick', null, null, null, null, '对【{mseric}】进行销假,{explain}', '人事考勤', '1', '0', '0', 'KF-Ymd-', '1', '0');

-- ----------------------------
-- Table structure for `rock_group`
-- ----------------------------
DROP TABLE IF EXISTS `rock_group`;
CREATE TABLE `rock_group` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '组名',
  `sort` tinyint(4) DEFAULT '0',
  `ispir` tinyint(4) DEFAULT '1' COMMENT '是否权限验证',
  `indate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_group
-- ----------------------------
INSERT INTO `rock_group` VALUES ('1', '系统管理员', '1', '0', '2014-09-04 17:33:47');
INSERT INTO `rock_group` VALUES ('5', '组名', '2', '1', '2014-09-04 17:33:56');

-- ----------------------------
-- Table structure for `rock_homeitems`
-- ----------------------------
DROP TABLE IF EXISTS `rock_homeitems`;
CREATE TABLE `rock_homeitems` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `mid` smallint(6) DEFAULT '0',
  `uid` smallint(6) DEFAULT '0',
  `name` varchar(50) DEFAULT NULL,
  `num` varchar(20) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `type` smallint(6) DEFAULT '0',
  `sort` smallint(6) DEFAULT '0',
  `receid` varchar(200) DEFAULT NULL,
  `recename` varchar(200) DEFAULT NULL,
  `valid` tinyint(1) DEFAULT '1',
  `ismr` tinyint(1) DEFAULT '1',
  `x` smallint(6) DEFAULT '0',
  `y` smallint(6) DEFAULT '0',
  `w` smallint(6) DEFAULT '0',
  `h` smallint(6) DEFAULT '0',
  `icons` varchar(30) DEFAULT NULL,
  `path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_homeitems
-- ----------------------------
INSERT INTO `rock_homeitems` VALUES ('1', '0', '0', null, 'daib', '待办/处理', '0', '1', 'all', '全体人员', '1', '1', '10', '5', '400', '250', 'time', null);
INSERT INTO `rock_homeitems` VALUES ('2', '0', '0', null, 'work', '工作任务', '0', '2', 'all', '全体人员', '1', '1', '418', '5', '699', '250', 'pencil', null);
INSERT INTO `rock_homeitems` VALUES ('3', '0', '0', null, 'wannl', '万年历', '0', '3', 'all', '全体人员', '1', '1', '10', '520', '550', '350', 'calendar', null);
INSERT INTO `rock_homeitems` VALUES ('4', '0', '0', null, 'todo', '提醒信息', '0', '1', 'all', '全体人员', '1', '1', '10', '262', '550', '250', 'lightbulb', null);
INSERT INTO `rock_homeitems` VALUES ('5', '0', '0', null, 'gong', '信息公告', '0', '2', 'all', '全体人员', '1', '1', '568', '261', '550', '250', 'sound_none', null);
INSERT INTO `rock_homeitems` VALUES ('6', '0', '0', null, 'zxkq', '在线考勤', '0', '3', 'all', '全体人员', '1', '1', '571', '776', '550', '250', 'clock', null);
INSERT INTO `rock_homeitems` VALUES ('7', '0', '0', '所有人员默认首页', null, null, '1', '0', 'all', '全体人员', '1', '1', '0', '0', '0', '0', null, null);
INSERT INTO `rock_homeitems` VALUES ('8', '7', '0', null, null, null, '1', '0', null, null, '1', '1', '10', '5', '451', '250', null, null);
INSERT INTO `rock_homeitems` VALUES ('9', '7', '0', null, null, null, '4', '0', null, null, '1', '1', '470', '5', '645', '250', null, null);
INSERT INTO `rock_homeitems` VALUES ('30', '14', '0', null, null, null, '2', '0', null, null, '1', '1', '528', '529', '591', '250', null, null);
INSERT INTO `rock_homeitems` VALUES ('11', '7', '0', null, null, null, '5', '0', null, null, '1', '1', '10', '266', '533', '274', null, null);
INSERT INTO `rock_homeitems` VALUES ('13', '7', '0', null, null, null, '3', '0', null, null, '1', '1', '552', '265', '564', '350', null, null);
INSERT INTO `rock_homeitems` VALUES ('14', '0', '0', '管理首页', null, null, '1', '1', 'u1', '管理员', '1', '1', '0', '0', '0', '0', null, null);
INSERT INTO `rock_homeitems` VALUES ('28', '14', '0', null, null, null, '1', '0', null, null, '1', '1', '10', '7', '400', '250', null, null);
INSERT INTO `rock_homeitems` VALUES ('25', '0', '0', null, 'emailin', '内部邮件', '0', '7', 'all', '全体人员', '1', '1', '569', '518', '550', '250', 'email', null);
INSERT INTO `rock_homeitems` VALUES ('29', '14', '0', null, null, null, '4', '0', null, null, '1', '1', '528', '266', '590', '248', null, null);
INSERT INTO `rock_homeitems` VALUES ('27', '0', '0', null, 'minstall', '模块安装升级', '0', '8', 'u1', '管理员', '1', '1', '0', '0', '400', '250', 'arrow_up', null);
INSERT INTO `rock_homeitems` VALUES ('31', '14', '0', null, null, null, '5', '0', null, null, '1', '1', '10', '266', '508', '250', null, null);
INSERT INTO `rock_homeitems` VALUES ('32', '14', '0', null, null, null, '3', '0', null, null, '1', '1', '10', '526', '509', '322', null, null);
INSERT INTO `rock_homeitems` VALUES ('33', '14', '0', null, null, null, '27', '0', null, null, '1', '1', '421', '7', '696', '250', null, null);

-- ----------------------------
-- Table structure for `rock_hrpositive`
-- ----------------------------
DROP TABLE IF EXISTS `rock_hrpositive`;
CREATE TABLE `rock_hrpositive` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `ranking` varchar(30) DEFAULT NULL COMMENT '职位',
  `entrydt` date DEFAULT NULL COMMENT '入职日期',
  `syenddt` date DEFAULT NULL COMMENT '试用到期日',
  `positivedt` date DEFAULT NULL COMMENT '转正日期',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `isover` tinyint(1) DEFAULT '0',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_hrpositive
-- ----------------------------
INSERT INTO `rock_hrpositive` VALUES ('1', '1', 'OA项目经理', '2015-01-01', '2015-08-01', '2015-08-15', '2015-08-01 11:52:54', '哈哈哈哈', '1', '1', null, '7,3', '1', '貂蝉', null, '1', null, null, null);

-- ----------------------------
-- Table structure for `rock_hrredund`
-- ----------------------------
DROP TABLE IF EXISTS `rock_hrredund`;
CREATE TABLE `rock_hrredund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `ranking` varchar(30) DEFAULT NULL COMMENT '职位',
  `entrydt` date DEFAULT NULL COMMENT '入职日期',
  `quitdt` date DEFAULT NULL COMMENT '离职日期',
  `redundtype` varchar(20) DEFAULT NULL COMMENT '离职类型',
  `redundreson` varchar(100) DEFAULT NULL COMMENT '离职原因',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `isover` tinyint(1) DEFAULT '0',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_hrredund
-- ----------------------------
INSERT INTO `rock_hrredund` VALUES ('1', '1', 'OA项目经理', '2015-01-01', '2015-08-04', '自动离职', '无法胜任工作,另找到工作,年龄到期', '2015-08-03 10:49:07', 'hahaha', '5', '1', '7', '7,3', '2', '刘备', '刘备', '0', null, null, null);

-- ----------------------------
-- Table structure for `rock_hrtransfer`
-- ----------------------------
DROP TABLE IF EXISTS `rock_hrtransfer`;
CREATE TABLE `rock_hrtransfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `tranuid` int(11) DEFAULT NULL,
  `tranname` varchar(20) DEFAULT NULL COMMENT '要调动人',
  `trantype` varchar(20) DEFAULT NULL COMMENT '调动类型',
  `olddeptname` varchar(50) DEFAULT NULL COMMENT '原来部门',
  `oldranking` varchar(20) DEFAULT NULL COMMENT '原来职位',
  `effectivedt` date DEFAULT NULL COMMENT '生效日期',
  `newdeptname` varchar(50) DEFAULT NULL COMMENT '调动后部门',
  `newdeptid` smallint(6) DEFAULT NULL,
  `newranking` varchar(20) DEFAULT NULL COMMENT '调动后职位',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `isover` tinyint(1) DEFAULT '0',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_hrtransfer
-- ----------------------------
INSERT INTO `rock_hrtransfer` VALUES ('1', '1', '7', '刘备', '平调', '管理部', '董事长', '2015-08-03', '业务部', '2', 'CEO', '2015-08-03 17:46:15', 'hahahah', '1', '1', null, '3', '1', '貂蝉', null, '1', null, null, null);
INSERT INTO `rock_hrtransfer` VALUES ('2', '1', '1', '管理员', '平调', '业务部', 'CEO', '2015-08-03', '开发部', '4', 'OA项目经理', '2015-08-03 17:49:34', 'hah', '1', '1', null, '3', '1', '貂蝉', null, '1', null, null, null);
INSERT INTO `rock_hrtransfer` VALUES ('3', '1', '7', '刘备', '晋升', '业务部', 'CEO', '2015-08-03', '管理部', '1', '董事长', '2015-08-03 18:09:37', '董事长aa', '1', '1', null, '3', '1', '貂蝉', null, '1', null, null, null);

-- ----------------------------
-- Table structure for `rock_im_group`
-- ----------------------------
DROP TABLE IF EXISTS `rock_im_group`;
CREATE TABLE `rock_im_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '名称',
  `type` tinyint(1) DEFAULT '0' COMMENT '类型@0|群,1|讨论组,2|系统',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `createid` int(11) DEFAULT NULL,
  `createname` varchar(20) DEFAULT NULL COMMENT '创建人',
  `createdt` datetime DEFAULT NULL COMMENT '创建时间',
  `face` varchar(50) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_im_group
-- ----------------------------
INSERT INTO `rock_im_group` VALUES ('1', '技术群', '0', '0', null, null, null, null);
INSERT INTO `rock_im_group` VALUES ('2', '讨论区1', '1', '0', null, null, null, null);
INSERT INTO `rock_im_group` VALUES ('3', 'OA通告', '2', '0', null, null, null, 'images/im/laba.png');
INSERT INTO `rock_im_group` VALUES ('4', '会议通知', '2', '0', null, null, null, 'images/im/meet.png');
INSERT INTO `rock_im_group` VALUES ('5', '商务群', '0', '0', null, null, null, null);
INSERT INTO `rock_im_group` VALUES ('7', '流程单据', '2', '0', null, null, '2015-06-25 16:03:34', 'images/im/flow.png');
INSERT INTO `rock_im_group` VALUES ('8', '哈哈哈', '1', '0', '1', '管理员', '2015-07-17 17:43:38', null);
INSERT INTO `rock_im_group` VALUES ('9', 'OA项目讨论', '1', '0', '1', null, '2015-08-14 17:11:18', null);
INSERT INTO `rock_im_group` VALUES ('10', '高管的', '1', '0', '1', null, '2015-08-14 17:13:24', null);
INSERT INTO `rock_im_group` VALUES ('11', '人事招聘', '1', '0', '3', null, '2015-08-18 09:34:04', null);
INSERT INTO `rock_im_group` VALUES ('12', '项目任务', '2', '8', '1', '管理员', '2015-09-10 13:38:07', 'images/im/tasks.png');

-- ----------------------------
-- Table structure for `rock_im_groupuser`
-- ----------------------------
DROP TABLE IF EXISTS `rock_im_groupuser`;
CREATE TABLE `rock_im_groupuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gid` int(11) DEFAULT '0',
  `uid` int(11) DEFAULT '0',
  `adddt` datetime DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_im_groupuser
-- ----------------------------
INSERT INTO `rock_im_groupuser` VALUES ('1', '1', '1', null);
INSERT INTO `rock_im_groupuser` VALUES ('2', '1', '2', null);
INSERT INTO `rock_im_groupuser` VALUES ('3', '1', '3', null);
INSERT INTO `rock_im_groupuser` VALUES ('4', '1', '4', null);
INSERT INTO `rock_im_groupuser` VALUES ('10', '2', '2', null);
INSERT INTO `rock_im_groupuser` VALUES ('17', '1', '5', '2015-07-21 10:54:01');
INSERT INTO `rock_im_groupuser` VALUES ('11', '2', '5', '2015-06-16 12:04:08');
INSERT INTO `rock_im_groupuser` VALUES ('14', '8', '1', '2015-07-17 17:43:38');
INSERT INTO `rock_im_groupuser` VALUES ('15', '8', '4', '2015-07-17 17:44:53');
INSERT INTO `rock_im_groupuser` VALUES ('20', '9', '1', '2015-08-14 17:11:18');
INSERT INTO `rock_im_groupuser` VALUES ('27', '11', '3', '2015-08-18 09:34:04');
INSERT INTO `rock_im_groupuser` VALUES ('22', '10', '7', '2015-08-14 17:13:50');
INSERT INTO `rock_im_groupuser` VALUES ('23', '8', '7', '2015-08-17 11:31:44');
INSERT INTO `rock_im_groupuser` VALUES ('24', '8', '9', '2015-08-17 11:32:40');
INSERT INTO `rock_im_groupuser` VALUES ('25', '8', '10', '2015-08-17 11:32:40');
INSERT INTO `rock_im_groupuser` VALUES ('26', '8', '8', '2015-08-17 11:32:40');
INSERT INTO `rock_im_groupuser` VALUES ('28', '11', '4', '2015-08-18 09:36:42');
INSERT INTO `rock_im_groupuser` VALUES ('29', '8', '3', '2016-01-05 18:22:42');
INSERT INTO `rock_im_groupuser` VALUES ('30', '8', '5', '2016-01-05 18:22:42');

-- ----------------------------
-- Table structure for `rock_im_mess`
-- ----------------------------
DROP TABLE IF EXISTS `rock_im_mess`;
CREATE TABLE `rock_im_mess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `optdt` datetime DEFAULT NULL,
  `zt` tinyint(1) DEFAULT '0' COMMENT '状态',
  `cont` varchar(4000) DEFAULT NULL COMMENT '内容',
  `sendid` smallint(6) DEFAULT NULL,
  `receid` smallint(6) DEFAULT '0' COMMENT '接收',
  `receuid` varchar(1000) DEFAULT NULL COMMENT '接收用户id',
  `type` varchar(20) DEFAULT NULL COMMENT '信息类型',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL,
  `table` varchar(50) DEFAULT NULL COMMENT '对应表',
  `mid` int(11) DEFAULT NULL COMMENT '主id',
  `url` varchar(1000) DEFAULT NULL COMMENT '相关地址',
  `ftype` tinyint(1) DEFAULT '0' COMMENT '来源@0|pc端,1|APP',
  `ists` tinyint(1) DEFAULT '0' COMMENT '推送',
  `tstime` datetime DEFAULT NULL COMMENT '推送时间',
  PRIMARY KEY (`id`),
  KEY `optdt` (`optdt`,`receid`)
) ENGINE=MyISAM AUTO_INCREMENT=693 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_im_mess
-- ----------------------------
INSERT INTO `rock_im_mess` VALUES ('692', '2016-01-12 16:52:21', '0', '5oKo5o!Q5LqkW!ivt!WBh!adoSzljZXlj7c6S0wtMjAxNTEyMjctMDAwMl3lt7LlpITnkIblrozmiJA:', '4', '7', '3', 'system', '4', null, 'kq_info', '47', null, '0', '0', null);

-- ----------------------------
-- Table structure for `rock_im_messzt`
-- ----------------------------
DROP TABLE IF EXISTS `rock_im_messzt`;
CREATE TABLE `rock_im_messzt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL COMMENT '信息id',
  `uid` int(11) DEFAULT NULL COMMENT '人员id',
  `gid` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2086 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_im_messzt
-- ----------------------------
INSERT INTO `rock_im_messzt` VALUES ('2085', '692', '3', '7');

-- ----------------------------
-- Table structure for `rock_infor`
-- ----------------------------
DROP TABLE IF EXISTS `rock_infor`;
CREATE TABLE `rock_infor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(50) DEFAULT NULL COMMENT '编号',
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `typenum` varchar(50) DEFAULT NULL COMMENT '类型编号',
  `typename` varchar(50) DEFAULT NULL COMMENT '类型名称',
  `content` varchar(4000) DEFAULT NULL,
  `hits` tinyint(5) DEFAULT '0',
  `enddt` datetime DEFAULT NULL,
  `startdt` datetime DEFAULT NULL,
  `optid` smallint(6) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '作者',
  `istt` tinyint(1) DEFAULT '0' COMMENT '是否头条',
  `xu` tinyint(3) DEFAULT NULL COMMENT '序号',
  `color` varchar(7) DEFAULT NULL,
  `isshow` tinyint(1) DEFAULT '0' COMMENT '显示在首页',
  `optdt` datetime DEFAULT NULL,
  `zuozhe` varchar(50) DEFAULT NULL COMMENT '作者',
  `indate` datetime DEFAULT NULL COMMENT '时间',
  `faobjid` varchar(200) DEFAULT NULL,
  `faobjname` varchar(200) DEFAULT NULL COMMENT '发布给',
  `atype` tinyint(1) DEFAULT '0' COMMENT '@分类id@0内部,1部门',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_infor
-- ----------------------------
INSERT INTO `rock_infor` VALUES ('1', null, '关于OA上线通知公告', 'notice', '通知公告', '<p>\n	关于OA上线通知公告关于OA上线通知公告关于OA上线通知公告关于OA上线通知公告关于OA上线通知公告关于OA上线通知公告关于OA上线通知公告\n</p>', '58', null, null, '1', '管理员', '1', '1', null, '1', '2015-11-21 17:58:22', '行政部门', '2015-03-03 09:53:00', null, null, '0');
INSERT INTO `rock_infor` VALUES ('2', null, '工作日报制度', 'rules', '规章制度', null, '5', null, null, '1', '管理员', '0', '2', null, '1', '2014-12-16 16:04:46', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('3', null, '考勤制度', 'rules', '规章制度', null, '6', null, null, '1', '管理员', '0', '2', null, '1', '2014-12-16 16:04:55', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('4', null, '请假销假制度', 'rules', '规章制度', null, '13', null, null, '1', '管理员', '0', '2', null, '1', '2015-02-12 15:27:16', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('5', null, '加班制度', 'rules', '规章制度', null, '6', null, null, '1', '管理员', '0', '2', null, '1', '2014-12-16 16:05:15', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('6', null, '规章制度是一个神马东东呢？', 'rules', '规章制度', null, '16', null, null, '1', '管理员', '0', '1', null, '1', '2015-02-12 15:28:53', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('7', null, '快去开发啊！', 'notice', '通知公告', '快去开发啊！快去开发啊！', '28', null, null, '1', '管理员', '0', '0', null, '1', '2015-07-17 10:53:42', null, null, 'd4', '开发部', '0');
INSERT INTO `rock_infor` VALUES ('8', null, '技术考核', 'jishukao', '技术考核', '技术考核哈哈', '8', null, null, '1', '管理员', '0', '0', null, '1', '2016-01-07 18:42:12', null, null, 'd4', '开发部', '4');
INSERT INTO `rock_infor` VALUES ('9', null, '欢迎使用ROCKOA，这里有说明文档', 'notice', '通知公告', null, '11', null, null, '1', '管理员', '0', '0', null, '1', '2015-08-11 10:16:32', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('10', null, '关于REIM使用通知', 'notice', '通知公告', null, '2', null, null, '1', '管理员', '0', '0', null, '1', '2015-11-12 18:59:09', null, null, 'd3', '行政人事', '0');
INSERT INTO `rock_infor` VALUES ('11', null, '关于对【管理员】奖励通告', 'jiang', '奖惩通告', '<p>\n	关于对【管理员】奖励通告，工作认真，奖励1W人民币！如下头像\n</p>\n<p>\n	<img alt=\"\" src=\"upload/2015-10/21_1410222684.jpg\" />\n</p>\n<p>\n	&nbsp;\n</p>', '14', null, null, '1', '管理员', '0', '0', null, '1', '2015-10-21 14:10:24', null, null, null, null, '0');
INSERT INTO `rock_infor` VALUES ('12', null, '更多的模块的安装使用', 'notice', '通知公告', '<p>\n	<span style=\"font-size:18px;\">更多的模块请查看官网站点</span><a href=\"http://www.rockoa.com\"><span style=\"font-size:18px;\">www.rockoa.com</span></a> \n</p>', '7', null, null, '1', '管理员', '0', '0', null, '1', '2016-01-21 22:57:43', 'RockOA开发团队', '2016-01-21 22:56:00', null, null, '0');
INSERT INTO `rock_infor` VALUES ('13', null, '移动办公来了,微信企业号办公', 'notice', '通知公告', '<p>\n	1、移动办公来了真的来了，微信企业号办公，内置各个基础模块使用。\n</p>\n<p>\n	2、您有单据要审批？你是不是在外面呢？哈哈，用微信企业号，拿在手上随时都可以审批。\n</p>\n<p>\n	3、外出出差轨迹报告，防止你乱跑。\n</p>\n<p>\n	<a href=\"http://www.rockoa.com/mobile.shtml\"> 详见查看</a> \n</p>\n<p>\n	以下是效果图：\n</p>\n<p>\n	<img width=\"400\" alt=\"\" src=\"http://i8.tietuku.com/5090cabccbb21187.png\" /> \n</p>\n<p>\n	&nbsp;\n</p>\n<p>\n	<img width=\"400\" alt=\"\" src=\"http://i8.tietuku.com/3f4996121e07259e.png\" /> \n</p>', '16', null, null, '1', '管理员', '0', '0', null, '1', '2016-01-21 22:56:58', 'RockOA开发团队', '2016-01-21 22:54:00', null, null, '0');
INSERT INTO `rock_infor` VALUES ('14', null, '欢迎RockOA最新版本V2.2.4版本上线', 'notice', '通知公告', '<p>\n	版本更新了很多内容\n</p>\n<p>\n	1、添加个性模块的管理，方便维护使用。\n</p>\n<p>\n	有任何问题可点击页面右上角【帮助】\n</p>\n<p>\n	2、系统全面推出微信企业号版本，基础功能单据审批等。\n</p>\n<p>\n	&nbsp;\n</p>', '16', null, null, '1', '管理员', '0', '0', null, '1', '2016-01-21 22:54:34', 'RockOA开发团队', '2016-01-21 22:54:00', null, null, '0');

-- ----------------------------
-- Table structure for `rock_kq_anay`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_anay`;
CREATE TABLE `rock_kq_anay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dt` date DEFAULT NULL COMMENT '日期',
  `uid` smallint(6) DEFAULT NULL COMMENT '人员id',
  `ztname` varchar(20) DEFAULT NULL COMMENT '状态名称',
  `time` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL COMMENT '状态名称',
  `states` varchar(20) DEFAULT NULL COMMENT '状态1',
  `sort` smallint(6) DEFAULT '0',
  `optname` varchar(50) DEFAULT NULL COMMENT '操作人',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `iswork` tinyint(4) DEFAULT '1' COMMENT '是否工作日',
  `emiao` varchar(20) DEFAULT NULL COMMENT '秒数',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_anay
-- ----------------------------
INSERT INTO `rock_kq_anay` VALUES ('125', '2016-01-01', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('126', '2016-01-01', '1', '下班', null, '未打卡', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('127', '2016-01-02', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('128', '2016-01-02', '1', '下班', null, '未打卡', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('129', '2016-01-03', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('130', '2016-01-03', '1', '下班', null, '未打卡', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('131', '2016-01-04', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('132', '2016-01-04', '1', '下班', null, '未打卡', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('133', '2016-01-05', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('134', '2016-01-05', '1', '下班', null, '未打卡', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('135', '2016-01-06', '1', '上班', '08:20:31', '正常', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('136', '2016-01-06', '1', '下班', '18:20:31', '正常', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('137', '2016-01-07', '1', '上班', null, '未打卡', null, '0', '管理员', '2016-01-07 21:52:37', null, '1', null);
INSERT INTO `rock_kq_anay` VALUES ('138', '2016-01-07', '1', '下班', '21:20:31', '正常', null, '1', '管理员', '2016-01-07 21:52:37', null, '1', null);

-- ----------------------------
-- Table structure for `rock_kq_dkerr`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_dkerr`;
CREATE TABLE `rock_kq_dkerr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `errtype` varchar(20) DEFAULT NULL COMMENT '异常类型',
  `dt` date DEFAULT NULL COMMENT '日期',
  `ytime` varchar(20) DEFAULT NULL COMMENT '应打卡时间',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_dkerr
-- ----------------------------
INSERT INTO `rock_kq_dkerr` VALUES ('1', '1', '忘记打卡', '2015-07-29', '09:00:00', '2015-08-05 12:08:41', '哈哈哈', '1', '1', null, '7', '1', '刘备', null, null, null, null);
INSERT INTO `rock_kq_dkerr` VALUES ('2', '1', '忘记打卡', '2015-08-20', '16:34:00', '2015-08-20 16:37:34', 'hahha', '5', '1', '7', '7', '0', null, '刘备', '1', '管理员', '2015-08-20');
INSERT INTO `rock_kq_dkerr` VALUES ('3', '1', '忘记打卡', '2015-11-27', '20:57:00', '2015-11-27 20:56:41', '呵呵呵', '1', '1', null, '7', '1', '刘备', null, '1', '管理员', '2015-11-27');

-- ----------------------------
-- Table structure for `rock_kq_dkip`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_dkip`;
CREATE TABLE `rock_kq_dkip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receid` varchar(200) DEFAULT NULL,
  `recename` varchar(200) DEFAULT NULL,
  `ipvalue` varchar(300) DEFAULT NULL,
  `sort` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_dkip
-- ----------------------------
INSERT INTO `rock_kq_dkip` VALUES ('1', 'all', '全体人员', '127.0.0.1,*.*', '0');

-- ----------------------------
-- Table structure for `rock_kq_dkjl`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_dkjl`;
CREATE TABLE `rock_kq_dkjl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finge` varchar(20) DEFAULT NULL COMMENT '指纹',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `checktime` datetime DEFAULT NULL COMMENT '时间',
  `web` varchar(50) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '0' COMMENT '来源@0|打卡机,1|异常登记,2|手动添加',
  PRIMARY KEY (`id`),
  KEY `finge` (`finge`,`checktime`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_dkjl
-- ----------------------------
INSERT INTO `rock_kq_dkjl` VALUES ('3', '1', '管理员', '2015-11-04 14:41:37', 'MSIE 9', '2');
INSERT INTO `rock_kq_dkjl` VALUES ('4', '1', '管理员', '2015-11-21 23:02:27', 'MSIE 9', '2');
INSERT INTO `rock_kq_dkjl` VALUES ('5', '1', '管理员', '2015-11-22 21:31:50', 'MSIE 9', '2');
INSERT INTO `rock_kq_dkjl` VALUES ('6', '1', '管理员', '2015-11-27 20:57:00', null, '1');
INSERT INTO `rock_kq_dkjl` VALUES ('7', '1', '管理员', '2016-01-07 21:20:31', 'MSIE 9', '2');
INSERT INTO `rock_kq_dkjl` VALUES ('8', '1', '管理员', '2016-01-06 08:20:31', null, '0');
INSERT INTO `rock_kq_dkjl` VALUES ('9', '1', '管理员', '2016-01-06 18:20:31', null, '0');

-- ----------------------------
-- Table structure for `rock_kq_info`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_info`;
CREATE TABLE `rock_kq_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `kind` varchar(10) DEFAULT NULL COMMENT '类型@请假,加班',
  `qjkind` varchar(20) DEFAULT NULL COMMENT '请假类型@年假',
  `stime` datetime DEFAULT NULL COMMENT '开始时间',
  `etime` datetime DEFAULT NULL COMMENT '截止时间',
  `totals` smallint(6) DEFAULT '0' COMMENT '时间(小时)',
  `optid` smallint(6) DEFAULT '0',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `isxj` tinyint(1) DEFAULT '0',
  `sicksm` varchar(500) DEFAULT NULL COMMENT '销假说明',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_info
-- ----------------------------
INSERT INTO `rock_kq_info` VALUES ('33', '1', '请假', '年假', '2015-08-04 09:00:00', '2015-08-04 18:00:00', '8', '0', '2015-08-05 14:36:33', '12', '1', '1', null, '7,5', '1', '小乔', null, null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('34', '1', '加班', null, '2015-07-20 10:31:00', '2015-07-20 20:31:00', '10', '0', '2015-07-20 10:31:17', '12', '5', '1', '3', '3', '0', null, '貂蝉', null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('35', '1', '请假', '事假', '2015-08-03 10:00:00', '2015-08-03 18:01:00', '8', '0', '2015-08-03 15:01:24', '12', '1', '1', null, '7,5', '1', '小乔', null, null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('36', '1', '请假', '事假', '2015-08-17 16:52:00', '2015-08-17 16:52:00', '1', '0', '2015-08-17 16:54:39', 'afwew', '5', '1', '7', '7,5', '2', '刘备', '刘备', null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('37', '1', '请假', '事假', '2015-08-19 10:59:00', '2015-08-20 10:59:00', '8', '0', '2015-08-19 10:59:43', '12', '5', '1', '7', '7,5', '0', null, '刘备', null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('38', '1', '增加年假', null, '2015-08-01 14:58:00', '2015-08-19 14:58:00', '40', '1', '2015-08-19 14:58:53', null, '1', '1', null, null, '0', '管理员', null, null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('39', '1', '请假', '年假', '2015-08-20 10:47:00', '2015-08-21 10:47:00', '8', '0', '2015-08-20 10:57:03', '12', '1', '1', null, '7,5', '1', '小乔', null, null, null, '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('40', '1', '请假', '事假', '2015-10-20 09:43:00', '2015-10-21 09:43:00', '8', '1', '2015-10-20 09:45:35', '呵呵呵呵12', '0', '1', '3', '7,3', '1', '刘备', '貂蝉', '管理员', '2015-10-20', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('41', '1', '请假', '事假', '2015-12-29 20:55:00', '2015-12-30 20:55:00', '8', '1', '2015-11-27 20:55:42', '嗯嗯', '1', '1', null, '7,5', '1', '小乔', null, '管理员', '2015-11-27', '1', '1212', '原申请从2015-12-29 20:55:00→2015-12-30 20:55:00,8(小时)');
INSERT INTO `rock_kq_info` VALUES ('42', '1', '加班', null, '2015-11-27 20:55:00', '2015-11-27 23:55:00', '3', '1', '2015-11-27 20:56:03', '加班了', '0', '1', '3', '3', '0', null, '貂蝉', '管理员', '2015-11-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('47', '3', '请假', '事假', '2015-12-27 09:00:00', '2015-12-27 18:00:00', '8', '3', '2015-12-27 17:42:09', '嗯122112', '1', '1', null, '4,3,4,5', '1', '大乔', null, '貂蝉', '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('48', '3', '请假', '事假', '2015-11-27 17:43:00', '2015-11-28 17:43:00', '8', '3', '2015-12-27 17:43:19', '哈哈哈', '0', '1', '4', '4,3,4,5', '0', null, '大乔', null, '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('46', '3', '请假', '事假', '2015-12-25 17:38:00', '2015-12-26 17:38:00', '8', '3', '2015-12-27 17:38:26', 'hehehe', '0', '1', '4', '4,3,4,5', '0', null, '大乔', null, '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('49', '3', '加班', null, '2015-12-26 18:23:00', '2015-12-26 23:23:00', '5', '3', '2015-12-27 18:23:40', '哈哈哈', '0', '1', '3', '3', '0', null, '貂蝉', null, '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('50', '3', '加班', null, '2015-12-27 19:12:00', '2015-12-27 20:12:00', '1', '3', '2015-12-27 19:12:14', '12', '0', '1', '3', '3', '0', null, '貂蝉', null, '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('51', '3', '请假', '事假', '2015-10-27 19:12:00', '2015-10-28 19:12:00', '8', '3', '2015-12-27 19:12:36', '121212', '0', '1', '4', '4,3,4,5', '0', null, '大乔', null, '2015-12-27', '0', null, null);
INSERT INTO `rock_kq_info` VALUES ('52', '1', '请假', '事假', '2016-01-04 21:18:00', '2016-01-08 21:18:00', '32', '1', '2016-01-05 21:23:12', '哈哈哈啊，请假啦', '0', '1', '3,4', '7,3,4,', '1', '刘备', '貂蝉,大乔', '管理员', '2016-01-05', '0', null, null);

-- ----------------------------
-- Table structure for `rock_kq_out`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_out`;
CREATE TABLE `rock_kq_out` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) DEFAULT NULL,
  `outtime` datetime DEFAULT NULL COMMENT '外出时间',
  `intime` datetime DEFAULT NULL COMMENT '回岗时间',
  `address` varchar(50) DEFAULT NULL COMMENT '外出地址',
  `reason` varchar(500) DEFAULT NULL COMMENT '外出事由',
  `atype` varchar(20) DEFAULT NULL COMMENT '外出类型@外出,出差',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `isxj` tinyint(1) DEFAULT '0' COMMENT '是否销假@0|否,1|是',
  `sicksm` varchar(500) DEFAULT NULL COMMENT '销假说明',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_out
-- ----------------------------
INSERT INTO `rock_kq_out` VALUES ('7', '1', '2015-08-05 10:31:00', '2015-08-06 10:31:00', '美国', '调查', '出差', null, '2015-07-20 10:31:47', '1', '3', '3', '0', null, '貂蝉', '1', null, null, null, '0', null, null);
INSERT INTO `rock_kq_out` VALUES ('8', '1', '2015-08-19 11:16:00', '2015-08-20 11:16:00', '新加坡', '玩啦', '外出', null, '2015-08-19 11:16:40', '1', null, '3', '1', '貂蝉', null, '1', null, null, null, '0', null, null);
INSERT INTO `rock_kq_out` VALUES ('9', '1', '2015-12-01 20:56:00', '2015-12-03 20:56:00', '北京', '玩玩12', '出差', null, '2015-12-06 21:33:27', '0', '3', '3', '0', null, '貂蝉', '1', '1', '管理员', '2015-11-27', '0', null, null);
INSERT INTO `rock_kq_out` VALUES ('10', '3', '2015-12-27 19:11:00', '2015-12-27 20:11:00', '不知道', '出去走走', '外出', '呵呵呵', '2015-12-27 19:12:00', '0', '3', '3', '0', null, '貂蝉', '1', '3', null, '2015-12-27', '0', null, null);

-- ----------------------------
-- Table structure for `rock_kq_set`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_set`;
CREATE TABLE `rock_kq_set` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `receid` varchar(255) DEFAULT NULL,
  `recename` varchar(255) DEFAULT NULL COMMENT '针对对象',
  `type` smallint(6) DEFAULT '0' COMMENT '类型@0主',
  `mid` smallint(6) DEFAULT '0' COMMENT '主',
  `stime` varchar(20) DEFAULT NULL COMMENT '开始时间',
  `etime` varchar(20) DEFAULT NULL COMMENT '结束时间',
  `qtype` tinyint(4) DEFAULT '0' COMMENT '取值类型@0|最小值,1|最大值',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `dt` date DEFAULT NULL COMMENT '针对日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_set
-- ----------------------------
INSERT INTO `rock_kq_set` VALUES ('1', '全体人员(不许删)', '1', null, null, '0', '0', null, null, '0', '2015-09-21 11:58:07', null);
INSERT INTO `rock_kq_set` VALUES ('2', '下班', '3', null, null, '1', '0', '13:00:00', '18:00:00', '0', '2015-08-05 16:33:36', null);
INSERT INTO `rock_kq_set` VALUES ('5', '正常', '0', null, null, '0', '12', '06:00:00', '09:00:00', '0', '2015-08-05 16:19:01', null);
INSERT INTO `rock_kq_set` VALUES ('6', '迟到', '1', null, null, '0', '12', '09:00:01', '12:00:00', '0', '2015-08-05 16:19:09', null);
INSERT INTO `rock_kq_set` VALUES ('7', '正常', '0', null, null, '0', '2', '18:00:00', '23:59:00', '1', '2015-08-05 16:18:34', null);
INSERT INTO `rock_kq_set` VALUES ('8', '早退', '1', null, null, '0', '2', '13:00:00', '17:59:59', '1', '2015-08-05 16:18:25', null);
INSERT INTO `rock_kq_set` VALUES ('12', '上班', '0', null, null, '1', '0', '09:00:00', '12:00:00', '0', '2015-07-21 16:24:26', null);
INSERT INTO `rock_kq_set` VALUES ('21', '8点上班', '2', null, null, '0', '0', null, null, '0', '2015-09-21 11:16:11', null);
INSERT INTO `rock_kq_set` VALUES ('22', '上班', '0', null, null, '21', '0', '08:00:00', '12:00:00', '0', '2015-09-21 11:16:42', null);
INSERT INTO `rock_kq_set` VALUES ('23', '下班', '1', null, null, '21', '0', '14:00:00', '18:00:00', '0', '2015-09-21 11:17:20', null);
INSERT INTO `rock_kq_set` VALUES ('24', '正常', '0', null, null, '0', '22', '06:00:00', '08:00:00', '0', '2015-09-21 11:18:22', null);
INSERT INTO `rock_kq_set` VALUES ('25', '迟到', '1', null, null, '0', '22', '08:00:01', '12:00:00', '0', '2015-09-21 11:19:00', null);
INSERT INTO `rock_kq_set` VALUES ('26', '早退', '1', null, null, '0', '23', '14:00:01', '17:59:59', '1', '2015-09-21 11:20:08', null);
INSERT INTO `rock_kq_set` VALUES ('27', '正常', '0', null, null, '0', '23', '18:00:00', '23:59:59', '1', '2015-09-21 11:20:03', null);

-- ----------------------------
-- Table structure for `rock_kq_setm`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_setm`;
CREATE TABLE `rock_kq_setm` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `receid` varchar(255) DEFAULT NULL,
  `recename` varchar(255) DEFAULT NULL COMMENT '针对对象',
  `mid` smallint(6) DEFAULT '0' COMMENT '对应规则',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `startdt` date DEFAULT NULL COMMENT '针对开始日期',
  `enddt` date DEFAULT NULL COMMENT '针对截止日期',
  `sort` smallint(6) DEFAULT '0',
  `optname` varchar(20) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '0' COMMENT '1排版',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_setm
-- ----------------------------
INSERT INTO `rock_kq_setm` VALUES ('1', 'all', '全体人员', '1', '2015-09-21 11:23:29', '2011-01-01', '2026-12-31', '0', '管理员', '0');
INSERT INTO `rock_kq_setm` VALUES ('2', 'd4', '开发部', '21', '2015-09-21 13:25:32', '2015-09-01', '2015-09-15', '1', '管理员', '0');

-- ----------------------------
-- Table structure for `rock_kq_sick`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_sick`;
CREATE TABLE `rock_kq_sick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) DEFAULT '0' COMMENT '类型@0|请假销假,1|外出销假',
  `mseric` varchar(30) DEFAULT NULL COMMENT '销假单号',
  `mid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `stime` datetime DEFAULT NULL COMMENT '开始时间',
  `etime` datetime DEFAULT NULL,
  `totals` smallint(6) DEFAULT '0' COMMENT '实际小时',
  `xjall` tinyint(1) DEFAULT '0' COMMENT '是否销假全部@0|否,1|是',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_sick
-- ----------------------------
INSERT INTO `rock_kq_sick` VALUES ('1', '0', 'KL-20151127-0001', '41', '1', '2015-12-29 20:55:00', '2015-12-30 20:55:00', '8', '0', '2015-12-30 21:27:54', '1', '管理员', '2015-12-30', '1212', '1', '1', null, '3', '1', '貂蝉', null);

-- ----------------------------
-- Table structure for `rock_kq_xiu`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_xiu`;
CREATE TABLE `rock_kq_xiu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL COMMENT '日期',
  `mid` smallint(6) DEFAULT '0' COMMENT '对应主id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_xiu
-- ----------------------------
INSERT INTO `rock_kq_xiu` VALUES ('1', '2015-08-01', '1');
INSERT INTO `rock_kq_xiu` VALUES ('2', '2015-08-02', '1');
INSERT INTO `rock_kq_xiu` VALUES ('3', '2015-08-08', '1');
INSERT INTO `rock_kq_xiu` VALUES ('4', '2015-08-09', '1');
INSERT INTO `rock_kq_xiu` VALUES ('5', '2015-08-15', '1');
INSERT INTO `rock_kq_xiu` VALUES ('6', '2015-08-16', '1');
INSERT INTO `rock_kq_xiu` VALUES ('7', '2015-08-22', '1');
INSERT INTO `rock_kq_xiu` VALUES ('8', '2015-08-23', '1');
INSERT INTO `rock_kq_xiu` VALUES ('9', '2015-08-29', '1');
INSERT INTO `rock_kq_xiu` VALUES ('10', '2015-08-30', '1');
INSERT INTO `rock_kq_xiu` VALUES ('12', '2015-08-02', '2');
INSERT INTO `rock_kq_xiu` VALUES ('14', '2015-08-09', '2');
INSERT INTO `rock_kq_xiu` VALUES ('16', '2015-08-16', '2');
INSERT INTO `rock_kq_xiu` VALUES ('18', '2015-08-23', '2');
INSERT INTO `rock_kq_xiu` VALUES ('20', '2015-08-30', '2');
INSERT INTO `rock_kq_xiu` VALUES ('22', '2015-10-03', '1');
INSERT INTO `rock_kq_xiu` VALUES ('23', '2015-10-04', '1');
INSERT INTO `rock_kq_xiu` VALUES ('24', '2015-10-10', '1');
INSERT INTO `rock_kq_xiu` VALUES ('25', '2015-10-11', '1');
INSERT INTO `rock_kq_xiu` VALUES ('26', '2015-10-17', '1');
INSERT INTO `rock_kq_xiu` VALUES ('27', '2015-10-18', '1');
INSERT INTO `rock_kq_xiu` VALUES ('28', '2015-10-24', '1');
INSERT INTO `rock_kq_xiu` VALUES ('29', '2015-10-25', '1');
INSERT INTO `rock_kq_xiu` VALUES ('30', '2015-10-31', '1');
INSERT INTO `rock_kq_xiu` VALUES ('31', '2015-11-01', '1');
INSERT INTO `rock_kq_xiu` VALUES ('32', '2015-11-07', '1');
INSERT INTO `rock_kq_xiu` VALUES ('33', '2015-11-08', '1');
INSERT INTO `rock_kq_xiu` VALUES ('34', '2015-11-14', '1');
INSERT INTO `rock_kq_xiu` VALUES ('35', '2015-11-15', '1');
INSERT INTO `rock_kq_xiu` VALUES ('36', '2015-11-21', '1');
INSERT INTO `rock_kq_xiu` VALUES ('37', '2015-11-22', '1');
INSERT INTO `rock_kq_xiu` VALUES ('38', '2015-11-28', '1');
INSERT INTO `rock_kq_xiu` VALUES ('39', '2015-11-29', '1');
INSERT INTO `rock_kq_xiu` VALUES ('40', '2015-11-01', '2');
INSERT INTO `rock_kq_xiu` VALUES ('41', '2015-11-07', '2');
INSERT INTO `rock_kq_xiu` VALUES ('42', '2015-11-08', '2');
INSERT INTO `rock_kq_xiu` VALUES ('43', '2015-11-14', '2');
INSERT INTO `rock_kq_xiu` VALUES ('44', '2015-11-15', '2');
INSERT INTO `rock_kq_xiu` VALUES ('45', '2015-11-21', '2');
INSERT INTO `rock_kq_xiu` VALUES ('46', '2015-11-22', '2');
INSERT INTO `rock_kq_xiu` VALUES ('47', '2015-11-28', '2');
INSERT INTO `rock_kq_xiu` VALUES ('48', '2015-11-29', '2');

-- ----------------------------
-- Table structure for `rock_kq_xium`
-- ----------------------------
DROP TABLE IF EXISTS `rock_kq_xium`;
CREATE TABLE `rock_kq_xium` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `receid` varchar(255) DEFAULT NULL,
  `recename` varchar(255) DEFAULT NULL COMMENT '针对对象',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `startdt` date DEFAULT NULL COMMENT '开始日期',
  `enddt` date DEFAULT NULL COMMENT '截止日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_kq_xium
-- ----------------------------
INSERT INTO `rock_kq_xium` VALUES ('1', '全体人员', null, null, '0', null, null);
INSERT INTO `rock_kq_xium` VALUES ('2', '开发部门', 'd4', '开发部', '1', null, null);

-- ----------------------------
-- Table structure for `rock_log`
-- ----------------------------
DROP TABLE IF EXISTS `rock_log`;
CREATE TABLE `rock_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL COMMENT '类型',
  `optid` int(11) DEFAULT NULL COMMENT '操作人id',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `optdt` datetime DEFAULT NULL COMMENT '添加时间',
  `ip` varchar(30) DEFAULT NULL COMMENT 'IP地址',
  `web` varchar(100) DEFAULT NULL COMMENT '浏览器',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_log
-- ----------------------------
INSERT INTO `rock_log` VALUES ('180', '登录', '1', '管理员', '[admin]登录成功', '2016-01-21 22:59:47', '127.0.0.1', 'Firefox');

-- ----------------------------
-- Table structure for `rock_meet`
-- ----------------------------
DROP TABLE IF EXISTS `rock_meet`;
CREATE TABLE `rock_meet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `optname` varchar(20) DEFAULT NULL COMMENT '发起人',
  `hyname` varchar(20) DEFAULT NULL COMMENT '会议室名称',
  `title` varchar(50) DEFAULT NULL COMMENT '主题',
  `startdt` varchar(50) DEFAULT NULL COMMENT '开始时间',
  `enddt` varchar(50) DEFAULT NULL COMMENT '结束时间',
  `status` tinyint(1) DEFAULT '0',
  `type` tinyint(1) DEFAULT '0' COMMENT '类型@0|普通,1|固定@not',
  `joinid` varchar(200) DEFAULT NULL,
  `joinname` varchar(500) DEFAULT NULL COMMENT '参加人员',
  `mid` int(11) DEFAULT '0',
  `rate` varchar(100) DEFAULT NULL,
  `istz` tinyint(1) DEFAULT '0' COMMENT '@是否通知',
  `uid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `state` tinyint(1) DEFAULT '0' COMMENT '会议状态@0|正常,1|会议中,2|结束,3|取消',
  `isturn` tinyint(1) DEFAULT '1',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  `cancelreason` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=139 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_meet
-- ----------------------------
INSERT INTO `rock_meet` VALUES ('1', '管理员', '会议室1', '测试', '09:30:00', '10:30:00', '1', '1', 'd4', '开发部', '0', '工作日', '0', null, '2015-11-21 19:34:54', null, null, null, '1', '0', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('109', '管理员', '会议室1', '全体会议', '08:00:00', '09:00:00', '1', '1', null, null, '0', '周六', '0', null, '2015-11-21 19:52:37', '1', null, null, '1', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('117', '管理员', '会议室1', '测试', '2015-11-21 09:30:00', '2015-11-21 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('118', '管理员', '会议室1', '全体会议', '2015-11-21 08:00:00', '2015-11-21 09:00:00', '1', '0', null, null, '109', null, '0', null, '2015-11-21 19:52:37', '1', null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('112', '管理员', '会议室1', '12', '2015-11-21 21:23:00', '2015-11-21 21:52:00', '1', '0', null, null, '0', null, '0', '1', '2015-11-21 21:34:22', '1', '2015-11-21', '12', '2', '1', null, '4', '1', '大乔', null, null);
INSERT INTO `rock_meet` VALUES ('119', '管理员', '会议室1', '测试', '2015-11-22 09:30:00', '2015-11-22 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('120', '管理员', '会议室1', '测试', '2015-11-23 09:30:00', '2015-11-23 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('121', '管理员', '会议室1', '会议测试', '2015-11-24 10:00:00', '2015-11-24 11:00:00', '1', '0', null, null, '0', null, '0', '1', '2015-11-23 19:07:55', '1', '2015-11-23', null, '2', '1', null, '4', '1', '大乔', null, null);
INSERT INTO `rock_meet` VALUES ('122', '管理员', '会议室1', '侧see呃呃呃', '2015-11-23 21:00:00', '2015-11-23 22:00:00', '1', '0', null, null, '0', null, '0', '1', '2015-11-23 19:36:46', '1', '2015-11-23', '呵呵呵呵呵', '3', '1', null, '4', '1', '大乔', null, '呵呵呵，客人来了');
INSERT INTO `rock_meet` VALUES ('123', '管理员', '会议室1', '全体会议', '2015-11-28 08:00:00', '2015-11-28 09:00:00', '1', '0', null, null, '109', null, '0', null, '2015-11-21 19:52:37', '1', null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('124', '管理员', '会议室1', '测试', '2015-11-30 09:30:00', '2015-11-30 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('125', '管理员', '会议室1', '测试', '2015-12-06 09:30:00', '2015-12-06 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('126', '管理员', '会议室1', '测试', '2015-12-07 09:30:00', '2015-12-07 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('127', '管理员', '会议室1', '测试', '2015-12-08 09:30:00', '2015-12-08 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('128', '管理员', '会议室1', '测试', '2015-12-12 09:30:00', '2015-12-12 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('129', '管理员', '会议室1', '全体会议', '2015-12-12 08:00:00', '2015-12-12 09:00:00', '1', '0', null, null, '109', null, '0', null, '2015-11-21 19:52:37', '1', null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('130', '管理员', '会议室1', '测试', '2015-12-13 09:30:00', '2015-12-13 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('131', '管理员', '会议室1', '测试', '2015-12-14 09:30:00', '2015-12-14 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('132', '管理员', '会议室1', '测试', '2015-12-29 09:30:00', '2015-12-29 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('133', '管理员', '会议室1', '测试', '2015-12-30 09:30:00', '2015-12-30 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('134', '管理员', '会议室1', '测试', '2015-12-31 09:30:00', '2015-12-31 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('135', '管理员', '会议室1', '测试', '2016-01-02 09:30:00', '2016-01-02 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('136', '管理员', '会议室1', '全体会议', '2016-01-02 08:00:00', '2016-01-02 09:00:00', '1', '0', null, null, '109', null, '0', null, '2015-11-21 19:52:37', '1', null, null, '2', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('137', '管理员', '会议室1', '测试', '2016-01-03 09:30:00', '2016-01-03 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '0', '1', null, null, '0', null, null, null);
INSERT INTO `rock_meet` VALUES ('138', '管理员', '会议室1', '测试', '2016-01-04 09:30:00', '2016-01-04 10:30:00', '1', '0', 'd4', '开发部', '1', null, '0', null, '2015-11-21 19:34:54', null, null, null, '0', '1', null, null, '0', null, null, null);

-- ----------------------------
-- Table structure for `rock_menu`
-- ----------------------------
DROP TABLE IF EXISTS `rock_menu`;
CREATE TABLE `rock_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(30) DEFAULT NULL COMMENT '编号',
  `name` varchar(100) DEFAULT NULL,
  `pid` smallint(8) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `sort` tinyint(1) DEFAULT '0',
  `indate` datetime DEFAULT NULL,
  `icons` varchar(50) DEFAULT NULL COMMENT '图标',
  `level` tinyint(4) DEFAULT '1' COMMENT '级别',
  `color` varchar(20) DEFAULT NULL COMMENT '颜色',
  `ispir` tinyint(1) DEFAULT '1' COMMENT '是否权限验证',
  `isopen` tinyint(1) DEFAULT '0' COMMENT '是否展开',
  `ischeck` tinyint(1) DEFAULT '0' COMMENT '是否审核菜单',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=232 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_menu
-- ----------------------------
INSERT INTO `rock_menu` VALUES ('1', null, '系统管理', '0', null, '1', '3', '2014-03-21 23:55:50', 'cog', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('2', null, '菜单管理', '72', 'system,menu', '1', '3', '2014-01-02 20:16:50', 'table', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('3', 'admin', '用户管理', '72', 'system,admin', '1', '4', '2014-01-02 19:33:39', 'user', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('6', null, '人事考勤', '0', null, '1', '4', '2014-06-01 20:12:14', 'group_gear', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('40', null, '权限管理', '1', null, '1', '6', '2013-12-21 20:57:08', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('41', null, '组→菜单', '40', 'system,extent,type=gm', '1', '1', '2013-12-22 13:33:40', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('56', null, '人员→菜单', '40', 'system,extent,type=um', '1', '0', '2013-12-22 13:33:34', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('57', 'group', '组管理', '72', 'system,group', '1', '5', '2013-12-20 09:40:48', 'group', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('58', null, '菜单→人员', '40', 'system,extent,type=mu', '1', '2', '2013-12-22 13:33:47', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('59', null, '菜单→组', '40', 'system,extent,type=mg', '1', '3', '2013-12-22 13:33:53', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('60', null, '用户权限查看', '40', 'system,extent,type=view', '1', '4', '2013-12-20 16:19:33', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('63', null, '个人办公', '0', null, '1', '0', '2014-01-02 20:16:45', 'folder', '2', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('64', null, '修改密码', '7', 'system,pass', '1', '1', '2014-01-02 20:16:22', 'lock', '3', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('65', null, '我的资料', '7', 'humanres,userinfor,edit,type=0,uid=0', '1', '2', '2014-01-02 20:16:25', null, '3', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('67', null, '定时任务', '1', null, '1', '10', '2014-04-03 20:57:13', 'time', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('70', null, '休息日设置', '10', 'humanres,kaoqin,xiu', '1', '5', '2014-02-11 21:53:03', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('71', null, '会议管理', '109', null, '1', '3', '2014-02-11 21:52:51', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('72', null, '基础设置', '1', null, '1', '1', '2014-02-09 20:10:09', 'computer', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('76', null, '上传文件', '192', 'system,file', '1', '1', '2014-02-10 20:23:16', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('79', null, '系统目录', '192', 'system,dir', '1', '4', '2014-03-17 21:58:35', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('81', null, '共享文件', '95', 'system,infor,fileshate', '1', '1', '2014-03-22 21:02:29', null, '2', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('82', 'inforlist', '信息列表', '133', 'system,infor,list,atype=0', '1', '3', '2014-08-23 22:07:09', null, '2', null, '1', '1', '0');
INSERT INTO `rock_menu` VALUES ('83', null, '系统选项', '72', 'system,option', '1', '20', '2014-08-23 22:10:13', 'wrench', '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('84', null, '人员档案', '153', 'humanres,userinfor', '1', '1', '2014-06-02 20:08:42', null, '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('87', null, '内部通讯录', '193', 'person,vcard,in', '1', '0', '2014-06-24 21:08:13', null, '2', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('91', null, '考勤分析', '146', 'humanres,kaoqin,kqfx', '1', '7', '2014-07-06 19:03:05', null, '2', null, '1', '1', '0');
INSERT INTO `rock_menu` VALUES ('92', null, '考勤时间规则', '10', 'humanres,kaoqin,set', '1', '2', '2014-07-06 19:06:32', null, '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('93', null, '打卡记录', '146', 'humanres,kaoqin,dkjl', '1', '4', '2014-07-06 19:06:59', 'clock_edit', '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('94', null, '组织结构', '72', 'system,dept', '1', '2', '2014-08-23 22:06:58', 'chart_organisation', '3', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('95', null, '公共信息', '0', null, '1', '1', '2014-08-23 22:11:30', 'page_word', '2', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('102', null, '定时任务管理', '67', 'system,task', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('103', null, '定时队列', '67', 'system,task,taskqe', '1', '3', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('104', null, '人员分析', '153', 'humanres,userinfor,fx', '1', '10', null, 'chart_pie', '1', null, '1', '1', '0');
INSERT INTO `rock_menu` VALUES ('105', null, '流程配置', '183', 'flow,set', '1', '1', null, 'sitemap', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('106', null, '物品管理', '109', null, '1', '2', null, 'lorry', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('107', null, '固定会议', '71', 'humanres,meet,fixed', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('108', null, '会议列表', '71', 'humanres,meet,list', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('109', null, '行政管理', '0', null, '1', '4', null, 'page_gear', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('113', null, '数据查看权限', '40', 'system,extent,view', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('114', null, '我的考勤', '142', 'person,kaoqin,my', '1', '1', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('115', null, '物品统计', '106', 'humanres,supple,total', '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('116', null, '物品列表', '106', 'humanres,supple,list', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('117', null, '物品选项', '106', 'system,option,guan,num=rocksupple,atype=1', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('122', null, '加密解密', '192', 'system,encode', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('125', 'meetapply', '会议室预定', '142', 'humanres,meet,apply', '1', '21', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('126', 'todo', '提醒信息', '7', 'person,todo', '1', '4', null, 'bell', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('127', null, '请假和加班', '146', 'humanres,kaoqin,leajia', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('128', null, '打卡记录', '142', 'person,kaoqin,dkjl', '1', '5', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('129', null, '考勤统计', '146', 'humanres,kaoqin,total', '1', '8', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('130', null, '外出出差', '146', 'humanres,kaoqin,waichu', '1', '6', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('133', null, '信息资料', '95', null, '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('134', null, '信息类别', '133', 'system,option,guan,num=infortype', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('135', null, '内部文件', '95', null, '1', '11', null, 'folder', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('136', null, '文件类别', '135', 'system,option,guan,num=filetype', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('137', null, '文件列表', '135', 'system,infor,filelist,atype=0', '1', '1', null, 'folder_table', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('138', null, '信息新增', '133', 'system,infor,add,atype=0', '1', '2', null, 'add', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('142', null, '考勤行政', '63', null, '1', '11', null, 'clock_red', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('143', null, '工作日报', '63', null, '1', '12', null, 'page_white_text_width', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('144', null, '我日报列表', '143', 'person,daily,list,atype=5', '1', '1', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('145', null, '我日报统计', '143', 'person,daily,total', '1', '5', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('146', null, '考勤信息', '6', null, '1', '3', null, 'clock_red', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('147', null, '工作日报', '6', null, '1', '5', null, 'page_white_text_width', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('148', null, '日报设置', '147', 'humanres,daily,set', '0', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('149', null, '日报分析', '147', 'humanres,daily,fx', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('150', 'gong', '信息中心', '95', 'system,infor,gong', '1', '0', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('151', 'daicheck', '待办/处理', '202', 'flow,apply,check', '1', '0', null, 'time', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('152', null, '系统设置', '72', 'system,set', '1', '0', null, 'edit', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('153', null, '人员管理', '6', null, '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('208', null, '人员劳动合同', '153', 'humanres,userinfor,contract', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('207', null, '日报查看', '147', 'humanres,daily,view', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('167', null, '日志查看', '192', 'system,log', '1', '3', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('168', null, '资产管理', '109', null, '1', '5', null, 'monitor', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('169', null, '资产选项', '168', 'system,option,guan,num=assets,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('170', 'assetslist', '资产列表', '168', 'humanres,assets,list', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('171', 'assetsadd', '新增资产', '168', 'humanres,assets,add', '1', '1', null, 'add', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('174', null, '考勤选项', '10', 'system,option,guan,num=humanres,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('175', null, '人员选项', '153', 'system,option,guan,num=userinfor,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('176', null, '上下班时间', '10', 'humanres,kaoqin,sxb', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('183', null, '流程管理', '1', null, '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('184', null, '流程审核日志', '183', 'flow,log', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('185', 'schedule', '日程事务', '7', 'person,schedule', '1', '3', null, 'date', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('186', null, '文件网盘', '95', 'system,infor,filelist,atype=1', '1', '2', null, 'drive', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('187', null, '邮件管理', '1', null, '1', '5', null, 'email', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('188', null, '人事调动', '195', 'flow,applylist,hrtransfer,opentype=3', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('190', null, '发邮件帐号设置', '187', 'system,email,set', '1', '0', null, 'email_go', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('191', null, '系统邮件模版', '187', 'system,email,tpl', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('192', null, '辅助功能', '1', null, '1', '20', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('193', null, '通讯录', '63', null, '1', '10', null, 'vcard', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('194', null, '我的通讯录', '193', 'person,vcard,out', '1', '1', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('195', null, '人力资源', '6', null, '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('196', null, '员工转正', '195', 'flow,applylist,hrpositive,opentype=3', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('197', null, '离职管理', '195', 'flow,applylist,hrredund,opentype=3', '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('198', null, 'REIM通信管理', '1', null, '1', '12', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('199', null, '聊天记录', '198', 'webim,guan,record', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('200', null, '群/讨论组管理', '198', 'webim,guan,group', '1', '2', null, 'group', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('201', null, '流程选项', '183', 'system,option,guan,num=flow,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('202', null, '工作流程', '63', null, '1', '12', null, 'report', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('203', null, '流程申请', '202', 'flow,apply', '1', '1', null, 'page_add', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('204', null, '我的申请', '202', 'flow,apply,checkmy,atype=0', '1', '2', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('205', null, '会议选项', '71', 'system,option,guan,num=meet,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('206', null, '部门信息资料', '95', 'system,infor,list,atype=1', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('209', null, '推送服务器设置', '198', 'webim,guan,set', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('210', null, '常用菜单管理', '7', 'system,menu,chang', '1', '5', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('7', null, '个人中心', '63', null, '1', '2', null, 'user', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('212', null, '车辆管理', '109', null, '1', '6', null, 'car', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('213', null, '行政选项', '109', 'system,option,guan,num=rockadmins,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('214', null, '车辆信息', '212', 'humanres,car,infor', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('215', null, '车辆选项', '212', 'system,option,guan,num=rockcar,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('10', null, '考勤设置', '6', null, '1', '2', null, 'cog', '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('11', null, '公司管理', '72', 'system,dept,company', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('42', null, '考勤时间分配', '10', 'humanres,kaoqin,setfp', '1', '3', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('12', null, '首页项管理', '72', 'index,home,guan', '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('216', null, '车辆预定查询', '212', 'flow,applylist,careserve,opentype=3', '1', '3', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('217', null, '车辆预定情况', '212', 'humanres,car,reserve', '1', '4', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('218', null, '车辆提醒', '212', 'humanres,car,todo', '1', '2', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('101', null, '定时提醒人员', '67', 'system,task,todouser', '1', '1', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('100', null, '定时任务选项', '67', 'system,option,guan,num=rocktask,atype=1', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('14', null, '在线升级', '192', 'system,upgrade', '1', '5', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('15', 'homeperson', '个人首页项', '7', '@index,home,indextd,mid=-1,padding=0', '1', '6', null, 'application_view_tile', '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('219', null, '经我处理', '202', 'flow,apply,checkmy,atype=1', '1', '3', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('220', null, '我下属申请', '202', 'flow,apply,checkmy,atype=2', '1', '4', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('221', null, '授权查看', '202', 'flow,apply,checkmy,atype=3', '1', '5', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('222', null, '我下属日报', '143', 'person,daily,list,atype=4', '1', '2', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('223', null, '日报授权我查看', '143', 'person,daily,list,atype=6', '1', '3', null, null, '1', null, '0', '0', '0');
INSERT INTO `rock_menu` VALUES ('43', null, '设置在线打卡IP', '10', 'humanres,kaoqin,kqip', '1', '0', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('96', null, '流程处理表单', '183', 'flow,course,input', '1', '10', null, null, '1', null, '1', '0', '0');
INSERT INTO `rock_menu` VALUES ('85', 'minstall', '模块安装升级', '192', 'system,upgrade,install', '1', '6', '2015-12-08 23:15:59', 'arrow_up', '1', null, '1', '0', '0');

-- ----------------------------
-- Table structure for `rock_menucom`
-- ----------------------------
DROP TABLE IF EXISTS `rock_menucom`;
CREATE TABLE `rock_menucom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `num` varchar(50) DEFAULT NULL COMMENT '编号',
  `url` varchar(200) DEFAULT NULL COMMENT '地址',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  `optdt` datetime DEFAULT NULL,
  `menuid` varchar(5) DEFAULT NULL COMMENT '菜单id',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_menucom
-- ----------------------------
INSERT INTO `rock_menucom` VALUES ('7', '1', '[新增]请假条', 'leave_0', 'flow,apply,leave,flownum=leave,tablename=kq_info,opentype=0,mid=0,gridid=', null, '0', '2015-08-07 17:59:34', null);
INSERT INTO `rock_menucom` VALUES ('8', '1', '日报列表', 'menunum_144', 'person,daily,list', null, '0', '2015-08-07 17:59:42', '144');
INSERT INTO `rock_menucom` VALUES ('9', '1', '日程管理', 'scheduleguan', 'person,schedule,guan', 'mode/icons/calendar_edit.png', '0', '2015-08-07 19:26:36', null);
INSERT INTO `rock_menucom` VALUES ('10', '1', '我所有的任务', 'workmwc', 'work,work,mwc,atype=0', null, '0', '2015-08-08 09:43:40', '139');
INSERT INTO `rock_menucom` VALUES ('14', '1', '菜单管理', 'menunum_2', 'system,menu', 'mode/icons/table.png', '0', '2016-01-02 12:05:09', '2');
INSERT INTO `rock_menucom` VALUES ('15', '1', '模块安装升级', 'menunum_85', 'system,upgrade,install', null, '0', '2016-01-20 20:59:31', '85');

-- ----------------------------
-- Table structure for `rock_option`
-- ----------------------------
DROP TABLE IF EXISTS `rock_option`;
CREATE TABLE `rock_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` varchar(50) DEFAULT NULL COMMENT '编号',
  `mnum` varchar(50) DEFAULT NULL COMMENT '上级编号',
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `value` varchar(500) DEFAULT NULL COMMENT '对应值',
  `xu` smallint(6) DEFAULT NULL COMMENT '排序',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT '0',
  `content` varchar(4000) DEFAULT NULL COMMENT '相关介绍',
  `ism` tinyint(1) DEFAULT '0' COMMENT '是否主选项',
  `pid` int(11) DEFAULT '0' COMMENT '@上级ID',
  PRIMARY KEY (`id`),
  KEY `num` (`num`)
) ENGINE=MyISAM AUTO_INCREMENT=311 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_option
-- ----------------------------
INSERT INTO `rock_option` VALUES ('1', 'rock', null, '系统选项', null, null, null, '0', null, '1', '0');
INSERT INTO `rock_option` VALUES ('2', 'ranking', 'userinfor', '职位', null, '3', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('3', null, 'ranking', '工程师', null, '4', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('4', null, 'ranking', 'OA项目经理', null, '5', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('5', 'infortype', 'rock', '信息类别', null, '0', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('6', 'humanres', 'rock', '人事考勤', null, '2', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('7', 'notice', 'infortype', '通知公告', null, '0', '2015-05-15 16:30:53', '1', null, '0', '5');
INSERT INTO `rock_option` VALUES ('8', 'rules', 'infortype', '规章制度', null, '1', '2015-11-12 19:17:28', '1', null, '0', '5');
INSERT INTO `rock_option` VALUES ('9', 'culture', 'infortype', '企业文化', null, '2', '2015-11-12 19:17:24', '1', null, '0', '5');
INSERT INTO `rock_option` VALUES ('10', 'tasktype', 'rocktask', '任务类型', null, '6', '2015-09-28 11:23:42', '1', null, '0', '273');
INSERT INTO `rock_option` VALUES ('11', 'userinfor', 'rock', '人员选项', null, '4', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('12', 'workstatus', 'userinfor', '人员状态', null, '0', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('13', 'xueli', 'userinfor', '学历', null, '1', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('18', null, 'xueli', '小学', null, '0', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('19', null, 'xueli', '初中', null, '1', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('20', null, 'xueli', '高中', null, '2', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('21', null, 'xueli', '中专', null, '3', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('22', null, 'xueli', '大专', null, '4', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('23', null, 'xueli', '本科', null, '5', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('24', null, 'xueli', '研究生', null, '6', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('25', null, 'xueli', '博士', null, '7', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('26', null, 'xueli', '博士后', null, '8', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('28', 'minzu', 'userinfor', '民族', null, '2', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('29', null, 'minzu', '汉族', null, '0', null, '0', null, '0', '28');
INSERT INTO `rock_option` VALUES ('30', null, 'minzu', '回民', null, '0', null, '0', null, '0', '28');
INSERT INTO `rock_option` VALUES ('31', null, 'minzu', '壮族', null, '0', null, '0', null, '0', '28');
INSERT INTO `rock_option` VALUES ('32', null, 'minzu', '维吾尔族', null, '0', null, '0', null, '0', '28');
INSERT INTO `rock_option` VALUES ('34', null, 'ranking', '行政前台', null, '6', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('35', null, 'xueli', '其他', null, '9', '2014-12-17 15:12:49', '1', null, '0', '13');
INSERT INTO `rock_option` VALUES ('38', null, 'ranking', '董事长', null, '0', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('39', null, 'ranking', '程序员', null, '7', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('40', null, 'ranking', '出纳', null, '8', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('41', null, 'tasktype', '基础任务', null, '0', '2014-12-17 16:39:10', '1', null, '0', '10');
INSERT INTO `rock_option` VALUES ('44', null, 'meeting', '会议室1', null, '0', '2014-12-22 12:34:54', '1', null, '0', '169');
INSERT INTO `rock_option` VALUES ('45', 'flow', 'rock', '流程选项', null, '7', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('46', 'flowatype', 'flow', '针对类型', null, '1', '2015-11-28 16:22:21', '1', null, '0', '45');
INSERT INTO `rock_option` VALUES ('47', null, 'flowatype', '所有人员', 'all', '0', '2014-12-30 19:23:47', '1', null, '0', '46');
INSERT INTO `rock_option` VALUES ('48', null, 'flowatype', '指定部门', 'dept', '2', '2014-12-30 19:23:47', '1', null, '0', '46');
INSERT INTO `rock_option` VALUES ('49', null, 'flowatype', '指定人员', 'user', '1', '2014-12-30 19:23:47', '1', null, '0', '46');
INSERT INTO `rock_option` VALUES ('50', 'flowchecktype', 'flow', '审核人类型', null, '2', '2015-11-28 16:22:21', '1', null, '0', '45');
INSERT INTO `rock_option` VALUES ('51', null, 'flowchecktype', '直属上级', 'super', '2', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('52', null, 'flowchecktype', '部门负责人', 'dept', '3', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('53', null, 'flowchecktype', '指定人员', 'user', '5', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('54', null, 'flowchecktype', '职位', 'rank', '4', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('55', 'leavetypem', 'humanres', '请假类型', null, '0', '2015-09-01 09:36:19', '1', null, '0', '6');
INSERT INTO `rock_option` VALUES ('56', 'leavetypes', 'humanres', '人事请假类型', null, '1', '2015-09-01 09:36:19', '1', null, '0', '6');
INSERT INTO `rock_option` VALUES ('57', null, 'leavetypem', '事假', null, '0', '2015-01-04 21:07:10', '1', null, '0', '55');
INSERT INTO `rock_option` VALUES ('58', null, 'leavetypem', '年假', null, '1', '2015-01-04 21:07:10', '1', null, '0', '55');
INSERT INTO `rock_option` VALUES ('59', null, 'leavetypem', '婚假', null, '2', '2015-01-04 21:07:10', '1', null, '0', '55');
INSERT INTO `rock_option` VALUES ('60', null, 'leavetypem', '病假', null, '3', '2015-01-04 21:07:10', '1', null, '0', '55');
INSERT INTO `rock_option` VALUES ('61', null, 'leavetypes', '增加年假', null, '0', '2015-01-04 21:07:45', '1', null, '0', '56');
INSERT INTO `rock_option` VALUES ('62', null, 'leavetypes', '增加婚假', null, '1', '2015-01-04 21:07:45', '1', null, '0', '56');
INSERT INTO `rock_option` VALUES ('63', null, 'ranking', 'CEO', null, '1', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('64', null, 'ranking', '总经理', null, '2', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('65', null, 'ranking', '人事经理', null, '3', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('66', null, 'flowchecktype', '开始', 'start', '0', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('67', null, 'flowchecktype', '结束', 'end', '1', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('68', 'rockmode', 'rock', '功能模块', null, '8', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('69', 'leave', 'rockmode', '请假条', null, '0', '2015-03-19 15:44:07', '1', null, '0', '68');
INSERT INTO `rock_option` VALUES ('70', 'jiaban', 'rockmode', '加班单', null, '1', '2015-03-19 15:44:07', '1', null, '0', '68');
INSERT INTO `rock_option` VALUES ('71', null, 'flowcoursename_1', '主管审核', null, '0', '2015-01-29 11:17:54', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('72', null, 'flowcoursename_2', '上级主管审核', null, '0', '2015-01-29 11:10:41', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('73', null, 'flowcoursename_1', '人事确认', null, '1', '2015-01-29 11:17:54', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('74', null, 'flowcoursename_3', '主管审核', null, '0', '2015-01-30 15:35:42', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('75', 'kaoqintype', 'humanres', '考勤类型', null, '2', '2015-09-01 09:36:19', '1', null, '0', '6');
INSERT INTO `rock_option` VALUES ('76', null, 'kaoqintype', '正常', null, '0', '2015-02-06 13:35:00', '1', null, '0', '75');
INSERT INTO `rock_option` VALUES ('77', null, 'kaoqintype', '迟到', null, '1', '2015-02-06 13:35:00', '1', null, '0', '75');
INSERT INTO `rock_option` VALUES ('78', null, 'kaoqintype', '早退', null, '2', '2015-02-06 13:35:00', '1', null, '0', '75');
INSERT INTO `rock_option` VALUES ('79', null, 'kaoqintype', '未打卡', null, '3', '2015-02-06 13:35:00', '1', null, '0', '75');
INSERT INTO `rock_option` VALUES ('80', 'rockwork', 'rock', '工作任务', null, '9', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('81', 'worktype', 'rockwork', '任务类型', null, '0', '2015-09-10 14:52:57', '1', null, '0', '80');
INSERT INTO `rock_option` VALUES ('82', null, 'worktype', '设计', null, '0', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('83', null, 'worktype', '开发', null, '1', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('84', 'workgrade', 'rockwork', '任务等级', null, '1', '2015-09-10 14:52:57', '1', null, '0', '80');
INSERT INTO `rock_option` VALUES ('85', 'workstate', 'rockwork', '任务状态', null, '2', '2015-09-10 14:52:57', '1', null, '0', '80');
INSERT INTO `rock_option` VALUES ('86', null, 'workgrade', '低', null, '0', '2015-02-07 22:19:15', '1', null, '0', '84');
INSERT INTO `rock_option` VALUES ('87', null, 'workgrade', '中', null, '1', '2015-02-07 22:19:15', '1', null, '0', '84');
INSERT INTO `rock_option` VALUES ('88', null, 'workgrade', '高', null, '2', '2015-02-07 22:19:15', '1', null, '0', '84');
INSERT INTO `rock_option` VALUES ('89', null, 'workgrade', '紧急', null, '3', '2015-02-07 22:19:15', '1', null, '0', '84');
INSERT INTO `rock_option` VALUES ('90', null, 'workstate', '待执行', null, '0', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('91', null, 'workstate', '执行中', null, '1', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('92', null, 'workstate', '已完成', null, '8', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('93', null, 'workstate', '执行中5%', null, '2', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('94', null, 'workstate', '执行中10%', null, '3', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('95', null, 'workstate', '执行中50%', null, '5', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('96', null, 'workstate', '执行中90%', null, '7', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('97', null, 'workstate', '执行中30%', null, '4', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('98', null, 'worktype', '测试', null, '2', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('99', 'filetype', 'rock', '文档类别', null, '5', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('100', null, 'filetype', '基础文件', null, '0', '2015-05-15 15:20:22', '1', null, '0', '99');
INSERT INTO `rock_option` VALUES ('101', null, 'filetype', '基础文档', null, '1', '2015-05-15 15:20:22', '1', null, '0', '99');
INSERT INTO `rock_option` VALUES ('102', 'systemtitle', null, '系统名称', 'ROCKOA', '7', '2016-01-07 18:29:39', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('103', 'dailyset', null, null, '3,w', null, '2015-03-19 16:22:41', '0', null, '0', null);
INSERT INTO `rock_option` VALUES ('104', 'systemlogo', null, '系统logo', 'images/icons40.png', '0', '2016-01-07 18:29:39', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('106', 'assetstype', 'assets', '资产类别', null, '0', '2015-04-13 16:01:22', '1', null, '0', '107');
INSERT INTO `rock_option` VALUES ('107', 'assets', 'rock', '资产选项', null, '6', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('108', 'assetsbrand', 'assets', '品牌', null, '1', '2015-04-13 16:01:22', '1', null, '0', '107');
INSERT INTO `rock_option` VALUES ('109', null, 'assetstype', '笔记本', 'BJB', '0', '2015-06-30 17:13:06', '1', null, '0', '106');
INSERT INTO `rock_option` VALUES ('110', null, 'assetstype', '电脑', 'DN', '0', '2015-06-30 17:13:16', '1', null, '0', '106');
INSERT INTO `rock_option` VALUES ('111', 'assetslaiyuan', 'assets', '资产来源', null, '2', '2015-04-13 16:01:22', '1', null, '0', '107');
INSERT INTO `rock_option` VALUES ('112', null, 'assetslaiyuan', '购入', null, '0', '2015-04-13 13:32:48', '1', null, '0', '111');
INSERT INTO `rock_option` VALUES ('113', null, 'assetslaiyuan', '自建', null, '0', '2015-04-13 13:33:03', '1', null, '0', '111');
INSERT INTO `rock_option` VALUES ('114', 'assetsstate', 'assets', '资产状态', null, '3', '2015-04-13 16:01:22', '1', null, '0', '107');
INSERT INTO `rock_option` VALUES ('115', null, 'assetsstate', '在用', null, '0', '2015-04-13 13:35:16', '1', null, '0', '114');
INSERT INTO `rock_option` VALUES ('116', null, 'assetsstate', '闲置', null, '0', '2015-04-13 13:35:22', '1', null, '0', '114');
INSERT INTO `rock_option` VALUES ('117', null, 'assetsstate', '已报废', null, '0', '2015-04-13 13:35:31', '1', null, '0', '114');
INSERT INTO `rock_option` VALUES ('118', null, 'assetsstate', '维修中', null, '0', '2015-04-13 13:35:41', '1', null, '0', '114');
INSERT INTO `rock_option` VALUES ('119', 'assetsaddress', 'assets', '放置地点', null, '4', '2015-04-13 16:01:22', '1', null, '0', '107');
INSERT INTO `rock_option` VALUES ('120', null, 'assetsaddress', '仓库一', null, '0', '2015-04-13 16:02:03', '1', null, '0', '119');
INSERT INTO `rock_option` VALUES ('121', null, 'assetsaddress', '仓库二', null, '0', '2015-04-13 16:02:08', '1', null, '0', '119');
INSERT INTO `rock_option` VALUES ('122', null, 'assetsstate', '借出', null, '0', '2015-04-14 10:28:37', '1', null, '0', '114');
INSERT INTO `rock_option` VALUES ('123', 'rockproject', 'rock', '项目管理', null, '10', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('124', null, 'assetsbrand', '联想', null, '0', '2015-04-29 14:04:24', '1', null, '0', '108');
INSERT INTO `rock_option` VALUES ('125', null, 'assetsbrand', '戴尔', null, '0', '2015-04-29 14:04:30', '1', null, '0', '108');
INSERT INTO `rock_option` VALUES ('126', 'projecttype', 'rockproject', '项目类别', null, '0', '2015-05-08 17:40:51', '1', null, '0', '123');
INSERT INTO `rock_option` VALUES ('127', 'projectstate', 'rockproject', '项目状态', null, '1', '2015-05-08 17:40:51', '1', null, '0', '123');
INSERT INTO `rock_option` VALUES ('128', 'projectguimo', 'rockproject', '项目规模', null, '2', '2015-05-08 17:40:51', '1', null, '0', '123');
INSERT INTO `rock_option` VALUES ('129', null, 'projectstate', '待执行', null, '0', '2015-05-08 23:20:48', '1', null, '0', '127');
INSERT INTO `rock_option` VALUES ('130', null, 'projectstate', '执行中', null, '1', '2015-05-08 23:20:54', '1', null, '0', '127');
INSERT INTO `rock_option` VALUES ('131', null, 'projectstate', '已完成', null, '2', '2015-05-08 23:21:00', '1', null, '0', '127');
INSERT INTO `rock_option` VALUES ('132', null, 'projectstate', '已取消', null, '3', '2015-05-08 23:21:11', '1', null, '0', '127');
INSERT INTO `rock_option` VALUES ('133', null, 'projecttype', '一般项目', null, '0', '2015-05-08 23:24:26', '1', null, '0', '126');
INSERT INTO `rock_option` VALUES ('134', null, 'projecttype', '重大项目', null, '0', '2015-05-08 23:24:37', '1', null, '0', '126');
INSERT INTO `rock_option` VALUES ('135', null, 'projecttype', '重要项目', null, '0', '2015-05-08 23:24:46', '1', null, '0', '126');
INSERT INTO `rock_option` VALUES ('136', null, 'projecttype', '关键项目', null, '0', '2015-05-08 23:24:52', '1', null, '0', '126');
INSERT INTO `rock_option` VALUES ('137', null, 'projectguimo', '小', null, '0', '2015-05-08 23:25:27', '1', null, '0', '128');
INSERT INTO `rock_option` VALUES ('138', null, 'projectguimo', '中', null, '1', '2015-05-08 23:25:32', '1', null, '0', '128');
INSERT INTO `rock_option` VALUES ('139', null, 'projectguimo', '大', null, '2', '2015-05-08 23:25:41', '1', null, '0', '128');
INSERT INTO `rock_option` VALUES ('140', null, 'filetype_1', '技术文档', null, '0', '2015-05-15 16:27:03', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('141', 'filetype_1_4225', 'filetype_1', '培训文档', null, '1', '2015-05-15 16:27:03', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('143', null, 'vcardgroup1', '同事', null, '0', '2015-05-16 22:34:59', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('144', null, 'vcardgroup1', '盟友', null, '1', '2015-05-16 22:34:59', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('145', 'hunyin', 'userinfor', '婚姻状况', null, '4', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('146', 'xuexing', 'userinfor', '血型', null, '5', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('147', null, 'hunyin', '未婚', null, '0', '2015-05-16 23:06:08', '1', null, '0', '145');
INSERT INTO `rock_option` VALUES ('148', null, 'hunyin', '已婚', null, '1', '2015-05-16 23:06:13', '1', null, '0', '145');
INSERT INTO `rock_option` VALUES ('149', null, 'hunyin', '丧偶', null, '2', '2015-05-16 23:06:36', '1', null, '0', '145');
INSERT INTO `rock_option` VALUES ('150', null, 'hunyin', '离异', null, '3', '2015-05-16 23:06:43', '1', null, '0', '145');
INSERT INTO `rock_option` VALUES ('151', null, 'hunyin', '其他', null, '4', '2015-05-16 23:06:51', '1', null, '0', '145');
INSERT INTO `rock_option` VALUES ('152', null, 'xuexing', 'A型', null, '0', '2015-05-16 23:07:07', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('153', null, 'xuexing', 'B型', null, '1', '2015-05-16 23:07:12', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('154', null, 'xuexing', 'O型', null, '2', '2015-05-16 23:07:17', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('155', null, 'xuexing', 'AB型', null, '3', '2015-05-16 23:07:25', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('156', null, 'xuexing', '其他', null, '4', '2015-05-16 23:07:30', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('157', null, 'xuexing', '未知', null, '5', '2015-05-16 23:07:36', '1', null, '0', '146');
INSERT INTO `rock_option` VALUES ('158', 'zzmianmao', 'userinfor', '政治面貌', null, '6', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('159', null, 'zzmianmao', '群众', null, '0', '2015-05-17 10:37:49', '1', null, '0', '158');
INSERT INTO `rock_option` VALUES ('160', null, 'zzmianmao', '党员', null, '0', '2015-05-17 10:37:54', '1', null, '0', '158');
INSERT INTO `rock_option` VALUES ('161', null, 'zzmianmao', '团员', null, '0', '2015-05-17 10:38:00', '1', null, '0', '158');
INSERT INTO `rock_option` VALUES ('162', 'flowfenlei', 'flow', '流程分类', null, '0', '2015-11-28 16:22:21', '1', null, '0', '45');
INSERT INTO `rock_option` VALUES ('163', null, 'flowfenlei', '人事考勤', null, '0', '2015-09-14 16:02:50', '1', null, '0', '162');
INSERT INTO `rock_option` VALUES ('164', null, 'flowfenlei', '财务', null, '0', '2015-07-31 15:58:47', '1', null, '0', '162');
INSERT INTO `rock_option` VALUES ('165', null, 'flowfenlei', '协同办公', null, '1', '2015-06-17 16:38:06', '1', null, '0', '162');
INSERT INTO `rock_option` VALUES ('166', null, 'flowcoursename_4', '接收人签收', null, '0', '2015-06-17 16:41:09', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('167', null, 'flowchecktype', '自定义', 'auto', '7', '2016-01-05 20:54:54', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('168', 'meet', 'rock', '会议选项', null, '3', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('169', 'meeting', 'meet', '会议室列表', null, '0', '2015-07-13 13:50:43', '1', null, '0', '168');
INSERT INTO `rock_option` VALUES ('170', 'meettongzhi', 'meet', '会议通知类型', null, '1', '2015-07-13 13:51:54', '1', null, '0', '168');
INSERT INTO `rock_option` VALUES ('171', 'meettodo_zann', 'meettongzhi', '站内通知', '是', '0', '2015-07-13 13:54:12', '1', null, '0', '170');
INSERT INTO `rock_option` VALUES ('172', 'meettodo_reim', 'meettongzhi', 'REIM通知', '是', '1', '2015-07-13 13:53:01', '1', null, '0', '170');
INSERT INTO `rock_option` VALUES ('175', null, 'flowcoursename_6', '行政发放', null, '0', '2015-07-23 16:18:20', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('174', 'jishukao', 'infortype_dept_dev', '技术考核', null, '0', '2016-01-06 19:17:14', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('176', 'reimipsystem', null, null, '127.0.0.1', null, '2015-07-29 22:29:05', '0', null, '0', null);
INSERT INTO `rock_option` VALUES ('177', 'reimportsystem', null, null, '4552', null, '2015-07-29 22:29:05', '0', null, '0', null);
INSERT INTO `rock_option` VALUES ('178', 'hetongtype', 'userinfor', '合同类型', null, '7', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('179', null, 'hetongtype', '固定期限劳动合同', null, '0', '2015-07-31 15:23:40', '1', null, '0', '178');
INSERT INTO `rock_option` VALUES ('180', null, 'hetongtype', '无固定期限劳动合同', null, '0', '2015-07-31 15:23:59', '1', null, '0', '178');
INSERT INTO `rock_option` VALUES ('181', null, 'hetongtype', '劳务派遣合同', null, '0', '2015-07-31 15:24:15', '1', null, '0', '178');
INSERT INTO `rock_option` VALUES ('182', null, 'hetongtype', '非全日制用工合同', null, '0', '2015-07-31 15:24:38', '1', null, '0', '178');
INSERT INTO `rock_option` VALUES ('183', null, 'flowfenlei', '人力资源', null, '0', '2015-07-31 15:58:34', '1', null, '0', '162');
INSERT INTO `rock_option` VALUES ('184', null, 'flowcoursename_7', '领导审批', null, '0', '2015-08-01 11:51:49', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('185', null, 'flowcoursename_7', '人事审批', null, '1', '2015-08-01 11:51:49', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('186', null, 'flowcoursename_8', '人事经理审批', null, '0', '2015-08-01 12:00:33', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('187', null, 'flowcoursename_9', '领导审批', null, '0', '2015-08-01 12:00:58', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('188', null, 'flowcoursename_9', '人事审批', null, '1', '2015-08-01 12:00:58', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('189', 'redundtype', 'userinfor', '离职类型', null, '8', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('190', 'redundreson', 'userinfor', '离职原因', null, '9', '2015-08-01 12:28:43', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('191', null, 'redundtype', '自动离职', null, '0', '2015-08-01 12:25:35', '1', null, '0', '189');
INSERT INTO `rock_option` VALUES ('192', null, 'redundtype', '退休', null, '0', '2015-08-01 12:25:44', '1', null, '0', '189');
INSERT INTO `rock_option` VALUES ('193', null, 'redundtype', '病辞', null, '0', '2015-08-01 12:25:52', '1', null, '0', '189');
INSERT INTO `rock_option` VALUES ('194', null, 'redundtype', '辞退', null, '0', '2015-08-01 12:26:00', '1', null, '0', '189');
INSERT INTO `rock_option` VALUES ('195', null, 'redundtype', '辞职', null, '0', '2015-08-01 12:26:06', '1', null, '0', '189');
INSERT INTO `rock_option` VALUES ('196', null, 'redundreson', '无法胜任工作', null, '0', '2015-08-01 12:27:29', '1', null, '0', '190');
INSERT INTO `rock_option` VALUES ('197', null, 'redundreson', '另找到工作', null, '0', '2015-08-01 12:26:44', '1', null, '0', '190');
INSERT INTO `rock_option` VALUES ('198', null, 'redundreson', '身体原因', null, '0', '2015-08-01 12:26:53', '1', null, '0', '190');
INSERT INTO `rock_option` VALUES ('199', null, 'redundreson', '年龄到期', null, '0', '2015-08-01 12:27:06', '1', null, '0', '190');
INSERT INTO `rock_option` VALUES ('200', 'transfertype', 'userinfor', '调动类型', null, '10', '2015-08-18 11:59:29', '1', null, '0', '11');
INSERT INTO `rock_option` VALUES ('201', null, 'transfertype', '平调', null, '0', '2015-08-01 12:29:04', '1', null, '0', '200');
INSERT INTO `rock_option` VALUES ('202', null, 'transfertype', '晋升', null, '0', '2015-08-01 12:29:14', '1', null, '0', '200');
INSERT INTO `rock_option` VALUES ('203', null, 'transfertype', '降职', null, '0', '2015-08-01 12:29:21', '1', null, '0', '200');
INSERT INTO `rock_option` VALUES ('204', 'dakaerrtype', 'humanres', '打卡异常类型', null, '3', '2015-09-01 09:36:19', '1', null, '0', '6');
INSERT INTO `rock_option` VALUES ('205', null, 'dakaerrtype', '忘记打卡', null, '0', '2015-08-05 12:05:51', '1', null, '0', '204');
INSERT INTO `rock_option` VALUES ('206', null, 'dakaerrtype', '打卡不成功', null, '1', '2015-08-05 12:06:23', '1', null, '0', '204');
INSERT INTO `rock_option` VALUES ('207', null, 'flowcoursename_10', '主管审核', null, '0', '2015-08-05 12:07:49', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('208', null, 'leavetypem', '产假', null, '4', '2015-08-20 10:26:28', '1', null, '0', '55');
INSERT INTO `rock_option` VALUES ('209', null, 'leavetypes', '增加产假', null, '2', '2015-08-20 10:27:54', '1', null, '0', '56');
INSERT INTO `rock_option` VALUES ('210', null, 'flowcoursename_11', '上级审批', null, '0', '2015-08-20 17:12:47', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('211', null, 'flowcoursename_11', '财务主管审批', null, '1', '2015-08-20 17:12:47', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('212', null, 'flowcoursename_11', '财务付款', null, '2', '2015-08-20 17:12:47', '1', null, '0', null);
INSERT INTO `rock_option` VALUES ('213', null, 'ranking', '财务经理', null, '9', '2015-10-30 13:15:33', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('214', 'rockfina', 'rock', '财务选项', null, '11', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('215', 'finaitems', 'rockfina', '所属项目', null, '0', '2015-09-15 09:39:07', '1', null, '0', '214');
INSERT INTO `rock_option` VALUES ('216', null, 'finaitems', '市内交通费', null, '0', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('217', null, 'finaitems', '办公用品', null, '1', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('218', null, 'finaitems', '快递费', null, '2', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('219', null, 'finaitems', '停车费', null, '3', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('220', null, 'finaitems', '电话费', null, '4', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('221', null, 'finaitems', '其它', null, '5', '2015-08-21 10:29:01', '1', null, '0', '215');
INSERT INTO `rock_option` VALUES ('222', 'systeminit', null, null, '0', null, '2015-08-31 16:43:42', '0', null, '0', null);
INSERT INTO `rock_option` VALUES ('226', 'worktongzhi', 'rockwork', '任务通知类型', null, '3', '2015-09-10 14:52:57', '1', null, '0', '80');
INSERT INTO `rock_option` VALUES ('227', 'worktongzhi_zann', 'worktongzhi', '站内提醒', '是', '0', '2015-09-10 14:53:55', '1', null, '0', '226');
INSERT INTO `rock_option` VALUES ('228', 'worktongzhi_reim', 'worktongzhi', 'REIM提醒', '是', '1', '2015-09-10 14:53:45', '1', null, '0', '226');
INSERT INTO `rock_option` VALUES ('229', 'jiang', 'infortype', '奖惩通告', null, '3', '2016-01-06 19:13:33', '1', null, '0', '5');
INSERT INTO `rock_option` VALUES ('230', 'rockadmins', 'rock', '行政选项', null, '12', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('231', 'rewardtype', 'rockadmins', '奖惩类型', null, '0', '2015-09-14 14:23:27', '1', null, '0', '230');
INSERT INTO `rock_option` VALUES ('232', 'rewardresult', 'rockadmins', '奖惩结果', null, '1', '2015-09-14 14:23:27', '1', null, '0', '230');
INSERT INTO `rock_option` VALUES ('233', null, 'rewardtype', '奖励', null, '0', '2015-09-14 14:01:28', '1', null, '0', '231');
INSERT INTO `rock_option` VALUES ('234', null, 'rewardtype', '处罚', null, '0', '2015-09-14 14:01:39', '1', null, '0', '231');
INSERT INTO `rock_option` VALUES ('235', null, 'rewardresult', '奖励', null, '0', '2015-09-14 14:02:21', '1', null, '0', '232');
INSERT INTO `rock_option` VALUES ('236', null, 'rewardresult', '警告', null, '0', '2015-09-14 14:02:26', '1', null, '0', '232');
INSERT INTO `rock_option` VALUES ('237', null, 'rewardresult', '辞退', null, '0', '2015-09-14 14:02:33', '1', null, '0', '232');
INSERT INTO `rock_option` VALUES ('238', null, 'rewardresult', '降职', null, '0', '2015-09-14 14:02:45', '1', null, '0', '232');
INSERT INTO `rock_option` VALUES ('239', 'rewardmoney', 'rockadmins', '奖惩金额', null, '2', '2015-09-14 14:23:27', '1', null, '0', '230');
INSERT INTO `rock_option` VALUES ('240', null, 'rewardmoney', '奖励100元', '100', '1', '2015-09-14 14:26:46', '1', null, '0', '239');
INSERT INTO `rock_option` VALUES ('241', null, 'rewardmoney', '处罚100元', '-100', '2', '2015-09-14 14:26:51', '1', null, '0', '239');
INSERT INTO `rock_option` VALUES ('242', null, 'rewardmoney', '无金额', '0', '0', '2015-09-14 14:27:06', '1', null, '0', '239');
INSERT INTO `rock_option` VALUES ('243', null, 'flowfenlei', '行政', null, '2', '2015-09-14 16:03:03', '1', null, '0', '162');
INSERT INTO `rock_option` VALUES ('244', 'finpaytype', 'rockfina', '付款方式', null, '1', '2015-09-15 09:39:07', '1', null, '0', '214');
INSERT INTO `rock_option` VALUES ('245', null, 'finpaytype', '汇款', null, '0', '2015-09-15 09:40:00', '1', null, '0', '244');
INSERT INTO `rock_option` VALUES ('246', null, 'finpaytype', '支付宝', null, '1', '2015-09-15 09:40:00', '1', null, '0', '244');
INSERT INTO `rock_option` VALUES ('247', null, 'finpaytype', '财付通', null, '2', '2015-09-15 09:40:00', '1', null, '0', '244');
INSERT INTO `rock_option` VALUES ('248', null, 'finpaytype', '其它', null, '3', '2015-09-15 09:40:00', '1', null, '0', '244');
INSERT INTO `rock_option` VALUES ('249', 'rockcar', 'rock', '车辆选项', null, '13', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('250', 'cartype', 'rockcar', '车辆类型', null, '0', '2015-09-16 11:17:16', '1', null, '0', '249');
INSERT INTO `rock_option` VALUES ('251', 'carbrand', 'rockcar', '车辆品牌', null, '1', '2015-09-16 11:17:16', '1', null, '0', '249');
INSERT INTO `rock_option` VALUES ('252', 'carstate', 'rockcar', '车辆状态', null, '2', '2015-09-16 11:17:16', '1', null, '0', '249');
INSERT INTO `rock_option` VALUES ('253', null, 'cartype', '小型车', null, '0', '2015-09-16 10:36:53', '1', null, '0', '250');
INSERT INTO `rock_option` VALUES ('254', null, 'carbrand', '奥迪', null, '0', '2015-09-16 10:37:04', '1', null, '0', '251');
INSERT INTO `rock_option` VALUES ('255', null, 'carbrand', '奔驰', null, '0', '2015-09-16 10:37:12', '1', null, '0', '251');
INSERT INTO `rock_option` VALUES ('256', null, 'carstate', '可用', null, '0', '2015-09-16 10:48:57', '1', null, '0', '252');
INSERT INTO `rock_option` VALUES ('257', null, 'carstate', '报废', null, '0', '2015-09-16 10:50:14', '1', null, '0', '252');
INSERT INTO `rock_option` VALUES ('258', null, 'carstate', '维修中', null, '0', '2015-09-16 10:50:22', '1', null, '0', '252');
INSERT INTO `rock_option` VALUES ('259', 'carbfields', 'rockcar', '车辆变更字段', null, '3', '2015-09-16 11:17:16', '1', null, '0', '249');
INSERT INTO `rock_option` VALUES ('260', null, 'carbfields', '状态', 'state', '0', '2015-09-16 15:05:26', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('261', null, 'carbfields', '强险开始日期', 'qxstartdt', '1', '2015-09-16 15:05:26', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('262', null, 'carbfields', '强险截止日期', 'qxenddt', '2', '2015-09-16 15:05:26', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('263', null, 'carbfields', '强险金额', 'qxmoney', '3', '2015-09-16 15:05:26', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('264', null, 'carbfields', '加油费', 'jymoney', '4', '2015-09-16 15:44:01', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('265', null, 'carbfields', '维修费', 'wxmoney', '5', '2015-09-16 15:44:16', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('266', null, 'carbfields', '停车费', 'tcmoney', '6', '2015-09-16 15:44:29', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('267', null, 'carbfields', '行驶证开始日期', 'xszstartdt', '7', '2015-09-23 17:48:18', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('268', null, 'carbfields', '行驶证截止日期', 'xszenddt', '8', '2015-09-23 17:48:34', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('269', null, 'carbfields', '商业险开始日期', 'syxstartdt', '9', '2015-09-23 17:49:09', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('270', null, 'carbfields', '商业险截止日期', 'syxenddt', '10', '2015-09-23 17:49:20', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('271', null, 'carbfields', '年审开始日期', 'nsstartdt', '11', '2015-09-23 17:52:38', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('272', null, 'carbfields', '年审截止日期', 'nsenddt', '12', '2015-09-23 17:52:55', '1', null, '0', '259');
INSERT INTO `rock_option` VALUES ('273', 'rocktask', 'rock', '定时任务选项', null, '1', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('274', null, 'tasktype', '系统任务', null, '1', '2015-10-21 17:52:08', '1', null, '0', '10');
INSERT INTO `rock_option` VALUES ('275', 'rocksupple', 'rock', '物品选项', null, '14', '2015-10-30 13:46:25', '1', null, '1', '1');
INSERT INTO `rock_option` VALUES ('276', 'suppletype', 'rocksupple', '物品分类', null, '0', '2015-10-30 13:48:22', '1', null, '0', '275');
INSERT INTO `rock_option` VALUES ('277', 'suppleunit', 'rocksupple', '物品单位', null, '1', '2015-10-30 13:48:22', '1', null, '0', '275');
INSERT INTO `rock_option` VALUES ('278', null, 'suppletype', '办公用品', null, '0', '2015-10-30 13:48:59', '1', null, '0', '276');
INSERT INTO `rock_option` VALUES ('279', null, 'suppleunit', '个', null, '0', '2015-10-30 13:51:55', '1', null, '0', '277');
INSERT INTO `rock_option` VALUES ('280', null, 'suppleunit', '件', null, '1', '2015-10-30 13:51:55', '1', null, '0', '277');
INSERT INTO `rock_option` VALUES ('281', null, 'suppleunit', '箱', null, '2', '2015-10-30 13:51:55', '1', null, '0', '277');
INSERT INTO `rock_option` VALUES ('282', null, 'suppletype', '耗材', null, '1', '2015-10-30 15:54:03', '1', null, '0', '276');
INSERT INTO `rock_option` VALUES ('283', null, 'ranking', '行政主管', null, '10', '2015-11-22 20:51:38', '1', null, '0', '2');
INSERT INTO `rock_option` VALUES ('284', null, 'workstate', '执行中70%', null, '6', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('285', 'flowinputtype', 'flow', '表单类型', null, '3', '2015-11-28 16:22:21', '1', null, '0', '45');
INSERT INTO `rock_option` VALUES ('286', null, 'flowinputtype', '文本框', 'text', '0', '2015-11-28 16:24:00', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('287', null, 'flowinputtype', '日期', 'date', '1', '2015-11-28 16:24:00', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('288', null, 'flowinputtype', '日期时间', 'datetime', '2', '2015-11-28 16:24:00', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('289', null, 'flowinputtype', '时间', 'time', '3', '2015-11-28 16:24:00', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('290', null, 'flowinputtype', '隐藏文本框', 'hidden', '4', '2015-11-28 16:24:00', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('291', null, 'flowinputtype', '选择人员(单选)', 'changeuser', '5', '2015-11-28 17:21:30', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('292', null, 'flowinputtype', '选择人员(多选)', 'changeusercheck', '6', '2015-11-28 17:21:56', '1', null, '0', '285');
INSERT INTO `rock_option` VALUES ('293', 'meettodo_weixin', 'meettongzhi', '微信企业号通知', '否', '2', '2015-12-30 22:17:00', '1', null, '0', '170');
INSERT INTO `rock_option` VALUES ('310', 'modekeysval', null, null, '2f071928c30968df5cbc717486deb660', null, '2016-01-21 22:59:51', '0', null, '0', '0');
INSERT INTO `rock_option` VALUES ('297', null, 'tasktype', '微信任务', null, '2', '2016-01-03 18:58:48', '1', null, '0', '10');
INSERT INTO `rock_option` VALUES ('298', null, 'tasktype', '钉钉任务', null, '3', '2016-01-03 19:11:34', '1', null, '0', '10');
INSERT INTO `rock_option` VALUES ('299', null, 'flowchecktype', '指定部门', 'depta', '6', '2016-01-05 20:55:39', '1', null, '0', '50');
INSERT INTO `rock_option` VALUES ('300', null, 'worktype', '研究', null, '3', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('301', null, 'worktype', '讨论', null, '4', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('302', null, 'worktype', '改进', null, '5', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('303', null, 'worktype', 'bug', null, '6', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('304', null, 'worktype', '其它', null, '7', '2016-01-13 13:03:00', '1', null, '0', '81');
INSERT INTO `rock_option` VALUES ('305', null, 'workstate', '推迟', null, '9', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('306', null, 'workstate', '取消', null, '10', '2016-01-14 18:42:59', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('307', null, 'workstate', '驳回', null, '12', '2016-01-14 18:42:33', '1', null, '0', '85');
INSERT INTO `rock_option` VALUES ('308', null, 'workstate', '暂停', null, '11', '2016-01-14 18:42:33', '1', null, '0', '85');

-- ----------------------------
-- Table structure for `rock_reads`
-- ----------------------------
DROP TABLE IF EXISTS `rock_reads`;
CREATE TABLE `rock_reads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `table` varchar(30) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `optid` smallint(6) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL,
  `ip` varchar(30) DEFAULT NULL,
  `web` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `table` (`table`,`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_reads
-- ----------------------------

-- ----------------------------
-- Table structure for `rock_reward`
-- ----------------------------
DROP TABLE IF EXISTS `rock_reward`;
CREATE TABLE `rock_reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  `object` varchar(20) DEFAULT NULL COMMENT '奖惩对象',
  `atype` varchar(20) DEFAULT NULL COMMENT '奖惩类型',
  `result` varchar(50) DEFAULT NULL COMMENT '奖惩结果',
  `money` mediumint(6) DEFAULT NULL COMMENT '奖惩金额',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_reward
-- ----------------------------
INSERT INTO `rock_reward` VALUES ('1', '4', '2015-09-14 14:51:59', '1', '管理员', '2015-09-14', '工作认真嘿嘿1', '0', '1', '3', '7,3', '2', '貂蝉', '貂蝉', '大乔', '处罚', '警告', '-100');

-- ----------------------------
-- Table structure for `rock_schedule`
-- ----------------------------
DROP TABLE IF EXISTS `rock_schedule`;
CREATE TABLE `rock_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL COMMENT '标题',
  `startdt` datetime DEFAULT NULL,
  `enddt` datetime DEFAULT NULL,
  `uid` smallint(6) DEFAULT NULL COMMENT '用户Id',
  `optdt` datetime DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `mid` int(11) DEFAULT '0' COMMENT '主Id',
  `ratecont` varchar(500) DEFAULT NULL COMMENT '频率',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_schedule
-- ----------------------------
INSERT INTO `rock_schedule` VALUES ('17', 'ROCKOA开发', '2015-07-15 00:00:00', '2015-07-20 15:42:00', '1', '2015-07-20 15:42:18', '管理员', '0', null, '日程事务→通知公告→流程完善');
INSERT INTO `rock_schedule` VALUES ('18', '招聘', '2015-07-16 09:56:00', '2015-07-18 09:56:00', '3', '2015-07-16 09:56:25', '貂蝉', '0', null, '呵呵');
INSERT INTO `rock_schedule` VALUES ('19', 'REIM群讨论组管理', '2015-07-20 16:00:00', '2015-07-20 18:00:00', '1', '2015-07-20 15:43:12', '管理员', '0', null, null);
INSERT INTO `rock_schedule` VALUES ('21', 'REIM的socket推送改进', '2015-09-10 17:27:00', '2015-09-17 16:43:00', '1', '2015-09-17 16:43:32', '管理员', '0', null, 'REIM需要改进，如果连续发送很多，服务端卡死，哎');
INSERT INTO `rock_schedule` VALUES ('22', '开发OA', '2015-10-27 11:24:00', '2015-10-27 23:24:00', '1', '2015-10-27 11:24:48', '管理员', '0', null, null);

-- ----------------------------
-- Table structure for `rock_sjoin`
-- ----------------------------
DROP TABLE IF EXISTS `rock_sjoin`;
CREATE TABLE `rock_sjoin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL COMMENT '类型',
  `mid` int(11) DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `indate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=169 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_sjoin
-- ----------------------------
INSERT INTO `rock_sjoin` VALUES ('35', 'mu', '65', '1', '2013-12-25 20:26:03');
INSERT INTO `rock_sjoin` VALUES ('36', 'mu', '65', '2', '2013-12-25 20:26:03');
INSERT INTO `rock_sjoin` VALUES ('106', 'um', '2', '3', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('107', 'um', '2', '57', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('108', 'um', '2', '58', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('109', 'um', '2', '60', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('110', 'um', '2', '61', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('111', 'um', '2', '73', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('112', 'um', '2', '85', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('113', 'um', '2', '94', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('114', 'um', '2', '96', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('115', 'um', '2', '97', '2014-08-24 00:13:13');
INSERT INTO `rock_sjoin` VALUES ('147', 'um', '3', '3', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('148', 'um', '3', '56', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('149', 'um', '3', '63', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('150', 'um', '3', '64', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('151', 'um', '3', '65', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('152', 'um', '3', '66', '2014-12-12 11:29:30');
INSERT INTO `rock_sjoin` VALUES ('153', 'ug', '0', '1', '2014-12-12 15:23:04');
INSERT INTO `rock_sjoin` VALUES ('168', 'ug', '1', '1', '2015-12-28 23:06:11');
INSERT INTO `rock_sjoin` VALUES ('160', 'ug', '5', '5', '2015-01-24 00:14:05');
INSERT INTO `rock_sjoin` VALUES ('164', 'ug', '2', '1', '2015-08-20 17:16:36');

-- ----------------------------
-- Table structure for `rock_sjoinv`
-- ----------------------------
DROP TABLE IF EXISTS `rock_sjoinv`;
CREATE TABLE `rock_sjoinv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) DEFAULT NULL COMMENT '@用户id',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `mode` varchar(200) DEFAULT NULL COMMENT '模块编号',
  `modename` varchar(200) DEFAULT NULL COMMENT '模块名称',
  `type` tinyint(1) DEFAULT '0' COMMENT '类型@0|不允许查看,1|可查看',
  `renyid` varchar(200) DEFAULT NULL,
  `renyname` varchar(200) DEFAULT NULL COMMENT '对应值',
  `optdt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_sjoinv
-- ----------------------------
INSERT INTO `rock_sjoinv` VALUES ('2', '1', '管理员', 'jiaban,leave', '加班单,请假条', '1', 'd4', '开发部', '2015-07-23 13:58:51');
INSERT INTO `rock_sjoinv` VALUES ('3', '1', '管理员', 'daily', '工作日报', '1', 'd3', '行政人事', '2015-07-23 15:04:02');

-- ----------------------------
-- Table structure for `rock_supple`
-- ----------------------------
DROP TABLE IF EXISTS `rock_supple`;
CREATE TABLE `rock_supple` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeid` smallint(6) DEFAULT '0' COMMENT '分类id',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `price` float(6,2) DEFAULT NULL COMMENT '单价',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `sort` smallint(6) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL COMMENT '单位',
  `num` varchar(20) DEFAULT NULL COMMENT '物品编号',
  `model` varchar(50) DEFAULT NULL COMMENT '规格型号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_supple
-- ----------------------------
INSERT INTO `rock_supple` VALUES ('1', '278', '笔记本', '1.00', '2015-11-30 21:22:13', '0', null, 'bjb', null);
INSERT INTO `rock_supple` VALUES ('2', '278', '铅笔', '0.00', '2015-10-30 16:50:23', '0', null, 'qianbi', null);
INSERT INTO `rock_supple` VALUES ('3', '278', '圆珠笔', '0.00', '2015-10-30 16:55:08', '4', null, 'yzb', null);
INSERT INTO `rock_supple` VALUES ('4', '278', '厕纸', '0.00', '2015-10-30 16:55:00', '5', null, 'cezhi', null);
INSERT INTO `rock_supple` VALUES ('5', '278', '鼠标', '1.00', '2015-10-30 17:07:26', '6', '个', 'shub1', null);
INSERT INTO `rock_supple` VALUES ('6', '278', '键盘', '2.00', '2015-10-30 17:07:26', '7', '个', 'jianp', null);

-- ----------------------------
-- Table structure for `rock_supplea`
-- ----------------------------
DROP TABLE IF EXISTS `rock_supplea`;
CREATE TABLE `rock_supplea` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL COMMENT '@办公用品ID',
  `aname` varchar(30) DEFAULT NULL COMMENT '用品名称',
  `total` smallint(6) DEFAULT '0' COMMENT '申请数量',
  `uid` int(11) DEFAULT '0',
  `optid` smallint(6) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待确认,1|已发放,2|不通过驳回,3|入库,4|异常入库',
  `explain` varchar(200) DEFAULT NULL COMMENT '说明',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `statusman` varchar(50) DEFAULT NULL,
  `checkdt` datetime DEFAULT NULL,
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_supplea
-- ----------------------------
INSERT INTO `rock_supplea` VALUES ('1', '1', null, '1', '0', '1', '3', null, '2015-07-23 16:26:03', '管理员', null, '0', null, null, '0', null, null, null);
INSERT INTO `rock_supplea` VALUES ('2', '2', null, '3', '0', '1', '3', null, '2015-07-23 16:26:03', '管理员', null, '0', null, null, '0', null, null, null);
INSERT INTO `rock_supplea` VALUES ('4', '1', '笔记本', '4', '1', null, '1', 'heheheh', '2015-07-23 17:03:32', '小乔', null, '1', null, '5', '1', null, null, null);
INSERT INTO `rock_supplea` VALUES ('5', '2', '铅笔', '1', '1', null, '1', '12', '2015-07-23 17:39:37', '小乔', null, '1', null, '5', '1', null, null, null);
INSERT INTO `rock_supplea` VALUES ('6', '1', null, '3', '0', '1', '4', null, '2015-07-24 17:50:07', '管理员', null, '0', null, null, '0', null, null, null);
INSERT INTO `rock_supplea` VALUES ('7', '1', '笔记本', '1', '1', null, '1', '23', '2015-08-19 12:14:03', '小乔', null, '1', null, '5', '1', null, null, null);
INSERT INTO `rock_supplea` VALUES ('8', '2', '铅笔', '1', '1', '1', '1', '23', '2015-08-21 21:03:10', '小乔', null, '1', null, '5', '1', null, '管理员', '2015-08-21');

-- ----------------------------
-- Table structure for `rock_task`
-- ----------------------------
DROP TABLE IF EXISTS `rock_task`;
CREATE TABLE `rock_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `typename` varchar(20) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL COMMENT '地址',
  `status` tinyint(1) DEFAULT '0' COMMENT '是否启用',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `optid` int(11) DEFAULT NULL,
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `xu` smallint(6) DEFAULT '0' COMMENT '序号',
  `ratecont` varchar(500) DEFAULT NULL COMMENT '频率',
  `lastrundt` datetime DEFAULT NULL COMMENT '最后运行时间',
  `lastrunzt` tinyint(1) DEFAULT '0' COMMENT '最后运行状态@0|无,1|成功,2|失败',
  `zntx` tinyint(1) DEFAULT '0',
  `emtx` tinyint(1) DEFAULT '0' COMMENT '邮件提醒',
  `confuid` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_task
-- ----------------------------
INSERT INTO `rock_task` VALUES ('8', '工作流匹配', '基础任务', 'flow,repipei', '1', '2015-10-21 10:20:46', '管理员', '1', null, '0', '每天的01时05分00秒\n每天的12时50分00秒\n', '2015-12-12 12:50:00', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('9', '读取固定会议', '基础任务', 'meet,fixed', '1', '2015-01-30 10:17:41', '管理员', '1', null, '0', '每小时的01分00秒 每天从08:00开始至19:00结束\r\n', '2016-01-02 17:01:00', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('10', '5分钟运行', '基础任务', 'minute5,runtask', '1', '2015-10-21 17:57:16', '管理员', '1', '会议和任务的通知', '0', '每5分钟的00秒 每天从09:00开始至18:00结束\n', '2016-01-02 17:20:00', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('18', '检测模块安装升级', '系统任务', 'upgrade,modeinst', '1', '2016-01-16 13:42:06', '管理员', '1', null, '0', '每3天的02时00分00秒\n', null, '0', '1', '0', '1');
INSERT INTO `rock_task` VALUES ('12', '日报分析', '基础任务', 'kaoqin,dailyfx', '1', '2015-08-11 10:00:01', '管理员', '1', null, '0', '每天的01时05分20秒\n', '2015-12-22 18:35:40', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('13', '每日考勤分析', '基础任务', 'kaoqin,fenxi', '1', '2015-08-11 09:58:46', '管理员', '1', '考勤分析前3天的', '0', '每天的10时05分00秒\n每天的01时05分00秒\n', '2015-11-25 18:25:51', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('14', '人力资源更新', '基础任务', 'hr,update', '1', '2015-08-03 17:50:51', '管理员', '1', '转正,离职,变动', '0', '每天的00时20分00秒\n', '2015-08-16 00:20:00', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('15', '检测系统升级', '系统任务', 'base,upgrade', '1', '2015-10-21 17:55:07', '管理员', '1', null, '0', '每天的02时06分00秒\n', '2015-10-22 11:09:54', '1', '1', '0', '1');
INSERT INTO `rock_task` VALUES ('16', '企业号待办审批推送', '微信任务', 'weixin,daiban', '0', '2016-01-07 22:34:11', '管理员', '1', null, '0', '每工作日的08时00分00秒\n每工作日的17时01分00秒\n', '2016-01-03 19:07:00', '1', '0', '0', '0');
INSERT INTO `rock_task` VALUES ('17', '企业号REIM未读信息', '微信任务', 'weixin,reimtodo', '0', '2016-01-07 23:12:14', '管理员', '1', null, '0', '每工作日的07时50分00秒\n每工作日的17时03分00秒\n', '2016-01-07 23:13:14', '1', '0', '0', '0');

-- ----------------------------
-- Table structure for `rock_tasktime`
-- ----------------------------
DROP TABLE IF EXISTS `rock_tasktime`;
CREATE TABLE `rock_tasktime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mid` int(11) DEFAULT NULL,
  `table` varchar(50) DEFAULT NULL,
  `atype` varchar(20) DEFAULT NULL COMMENT '类型',
  `shijian` varchar(50) DEFAULT NULL,
  `startdt` datetime DEFAULT NULL COMMENT '开始时间',
  `enddt` datetime DEFAULT NULL COMMENT '截止时间',
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `rateval` smallint(6) DEFAULT '0' COMMENT '对应的值',
  `stime` varchar(20) DEFAULT NULL COMMENT '每天从几点开始',
  `etime` varchar(20) DEFAULT NULL COMMENT '截止',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=110 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_tasktime
-- ----------------------------
INSERT INTO `rock_tasktime` VALUES ('41', '1', 'task', '仅一次', '2014-12-22 15:32:42', null, null, null, '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('42', '2', 'task', '休息日', '15时34分00秒', null, null, null, '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('43', '2', 'task', '休息日', '20时33分30秒', null, null, null, '3', null, null);
INSERT INTO `rock_tasktime` VALUES ('44', '3', 'task', '月', '15日 15时33分49秒', null, null, null, '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('45', '1', 'task', '周一', '14时00分00秒', '2014-12-01 00:00:00', null, '2014-12-21 18:01:32', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('46', '3', 'task', '小时', '47分00秒', '2014-12-21 19:00:00', null, '2014-12-21 19:53:20', '2', null, null);
INSERT INTO `rock_tasktime` VALUES ('47', '1', 'task', '天', '20时14分30秒', null, null, '2014-12-21 20:15:37', '2', null, null);
INSERT INTO `rock_tasktime` VALUES ('51', '4', 'task', '分钟', '20秒', null, null, '2015-01-22 19:54:44', '1', '17:00', '23:55');
INSERT INTO `rock_tasktime` VALUES ('52', '5', 'task', '分钟', '30秒', null, null, '2015-01-22 22:53:57', '1', '21:00', '23:00');
INSERT INTO `rock_tasktime` VALUES ('53', '5', 'task', '分钟', '20秒', null, null, '2015-01-22 22:40:33', '2', '22:00', '23:00');
INSERT INTO `rock_tasktime` VALUES ('54', '6', 'task', '分钟', '30秒', null, null, '2015-01-23 19:09:13', '1', '09:00', '23:30');
INSERT INTO `rock_tasktime` VALUES ('55', '7', 'task', '分钟', '00秒', null, null, '2015-01-23 10:34:00', '1', null, '02:00');
INSERT INTO `rock_tasktime` VALUES ('58', '8', 'task', '天', '01时05分00秒', null, null, '2015-02-09 11:11:49', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('60', '9', 'task', '小时', '01分00秒', null, null, '2015-01-30 09:33:07', '1', '08:00', '19:00');
INSERT INTO `rock_tasktime` VALUES ('61', '10', 'task', '分钟', '00秒', null, null, '2015-01-30 10:02:20', '5', '09:00', '18:00');
INSERT INTO `rock_tasktime` VALUES ('65', '2', 'work', '工作日', '10时00分00秒', null, null, '2015-02-09 10:48:50', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('72', '4', 'work', '天', '17时02分12秒', null, null, '2015-02-08 17:02:15', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('75', '5', 'work', '天', '21时00分00秒', null, null, '2015-02-08 20:22:08', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('76', '3', 'work', '仅一次', '2015-02-08 18:05:29', null, null, '2015-02-08 18:05:33', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('77', '11', 'task', '天', '00时00分10秒', null, null, '2015-03-04 17:31:25', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('79', '8', 'task', '天', '12时50分00秒', null, null, '2015-02-09 11:12:16', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('80', '11', 'task', '天', '09时05分00秒', null, null, '2015-03-05 10:03:37', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('81', '55', 'work', '工作日', '10时30分00秒', null, null, '2015-03-13 10:07:56', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('82', '57', 'work', '工作日', '10时45分00秒', null, null, '2015-03-13 10:33:05', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('83', '59', 'work', '工作日', '11时00分00秒', null, null, '2015-03-13 10:44:38', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('84', '12', 'task', '天', '01时05分20秒', null, null, '2015-08-11 09:59:58', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('86', '71', 'work', '仅一次', '2015-05-17 18:26:32', null, null, '2015-05-17 18:26:35', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('87', '13', 'task', '天', '10时05分00秒', null, null, '2015-06-17 09:29:38', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('95', '73', 'work', '工作日', '10时18分20秒', null, null, '2015-07-15 13:18:29', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('96', '75', 'work', '仅一次', '2015-07-15 18:00:18', null, null, '2015-07-15 14:51:26', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('97', '14', 'task', '天', '00时20分00秒', null, null, '2015-08-03 17:50:49', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('98', '79', 'work', '天', '18时00分00秒', null, null, '2015-08-05 09:35:24', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('99', '13', 'task', '天', '01时05分00秒', null, null, '2015-08-11 09:58:41', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('100', '82', 'work', '天', '10时00分00秒', null, null, '2015-09-11 09:36:35', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('101', '11', 'task', '天', '12时00分10秒', null, null, '2015-09-11 09:34:27', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('102', '86', 'work', '仅一次', '2015-09-17 00:00:00', null, null, '2015-09-17 16:59:48', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('103', '88', 'work', '仅一次', '2015-09-14 00:00:00', null, null, '2015-09-17 17:11:49', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('104', '15', 'task', '天', '02时06分00秒', null, null, '2015-10-21 17:55:05', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('105', '16', 'task', '工作日', '08时00分00秒', null, null, '2016-01-07 22:33:48', '2', null, null);
INSERT INTO `rock_tasktime` VALUES ('106', '16', 'task', '工作日', '17时01分00秒', null, null, '2016-01-07 22:34:09', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('107', '17', 'task', '工作日', '07时50分00秒', null, null, '2016-01-07 23:11:56', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('108', '17', 'task', '工作日', '17时03分00秒', null, null, '2016-01-07 23:12:10', '1', null, null);
INSERT INTO `rock_tasktime` VALUES ('109', '18', 'task', '天', '02时00分00秒', null, null, '2016-01-16 13:41:44', '3', null, null);

-- ----------------------------
-- Table structure for `rock_taskuser`
-- ----------------------------
DROP TABLE IF EXISTS `rock_taskuser`;
CREATE TABLE `rock_taskuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `receid` varchar(200) DEFAULT NULL,
  `recename` varchar(200) DEFAULT NULL,
  `chaoid` varchar(200) DEFAULT NULL,
  `chaoname` varchar(200) DEFAULT NULL COMMENT '抄送给',
  `sort` smallint(6) DEFAULT '0',
  `optdt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_taskuser
-- ----------------------------
INSERT INTO `rock_taskuser` VALUES ('1', '管理员通知组', '1', '管理员', null, null, '0', '2015-10-21 10:20:23');

-- ----------------------------
-- Table structure for `rock_todo`
-- ----------------------------
DROP TABLE IF EXISTS `rock_todo`;
CREATE TABLE `rock_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` smallint(6) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL COMMENT '类型',
  `mess` varchar(500) DEFAULT NULL COMMENT '信息内容',
  `status` tinyint(1) DEFAULT '0' COMMENT '状态@0|未读,1|已读',
  `optdt` datetime DEFAULT NULL COMMENT '时间',
  `table` varchar(50) DEFAULT NULL,
  `mid` smallint(6) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL COMMENT '相关地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=730 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_todo
-- ----------------------------
INSERT INTO `rock_todo` VALUES ('270', '2', '文件传送', '您有[管理员]的[文件传送,单号:FI-20150625-0002]需要处理', '1', '2015-07-13 15:04:02', 'docdeil', '7', '?rocktoken=xw0ws0sx0pox0xw0vp0tv0tp0vs0pox0wp0tv0poo0vp0vo0pqq0xv0tp0vs0sx0xw0pot0xo0pos0wo0ww0xo0ppq0xo0ww0xx0pox0wx0wv0ppq0pos0pop0vp0vs0ppw0xw0to0ppx0tv0xv0vq0wq0ppu0xw0uv0xo0sx0xv0wv0wp0tv0vv0pot0xo0ppu0xw0to0wq0pow0xw0ppo0wu0ppu0wo0wv0wq0ppw0wx0to0wq0pow0xv0wv0ppx0pox0poo0vp0vo0pot0xw0vp0wt0tv0xo0vp0tv0pou0xo0vp0wu0ppq0xw0uv0xo0ppu0xv0wv0wp0tv0vw0ppx0tw0tw014');
INSERT INTO `rock_todo` VALUES ('277', '8', '会议通知', '[会议测试啦]会议将在5分钟后15:40:00开始，请做好准备,会议室[会议室1]', '0', '2015-07-13 15:35:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('260', '2', '会议通知', '[潍坊我问问问问]会议将在5分钟后开始，请做好准备', '1', '2015-07-13 13:55:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('261', '8', '会议通知', '[潍坊我问问问问]会议将在5分钟后开始，请做好准备', '0', '2015-07-13 13:55:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('262', '9', '会议通知', '[潍坊我问问问问]会议将在5分钟后开始，请做好准备', '1', '2015-07-13 13:55:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('276', '2', '会议通知', '[会议测试啦]会议将在5分钟后15:40:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 15:35:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('264', '2', '会议通知', '[潍坊我问问问问]会议将在5分钟后14:20:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 14:15:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('265', '8', '会议通知', '[潍坊我问问问问]会议将在5分钟后14:20:00开始，请做好准备,会议室[会议室1]', '0', '2015-07-13 14:15:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('266', '9', '会议通知', '[潍坊我问问问问]会议将在5分钟后14:20:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 14:15:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('272', '2', '会议通知', '[潍坊我问问问问]会议将在5分钟后15:10:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 15:06:33', null, null, null);
INSERT INTO `rock_todo` VALUES ('273', '8', '会议通知', '[潍坊我问问问问]会议将在5分钟后15:10:00开始，请做好准备,会议室[会议室1]', '0', '2015-07-13 15:06:33', null, null, null);
INSERT INTO `rock_todo` VALUES ('274', '9', '会议通知', '[潍坊我问问问问]会议将在5分钟后15:10:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 15:06:33', null, null, null);
INSERT INTO `rock_todo` VALUES ('278', '9', '会议通知', '[会议测试啦]会议将在5分钟后15:40:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-13 15:35:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('295', '5', '申请办公用品', '您有[管理员]的[申请办公用品,单号:YP-20150723-序号0001]需要处理', '1', '2015-07-23 16:58:27', 'supplea', '3', '?rocktoken=xw0ws0sx0pox0xw0vp0tv0tp0vs0pox0wp0tv0poo0vp0vo0pqq0xv0tp0vs0sx0xw0pot0xo0pos0wo0ww0xo0ppq0xo0ww0xx0pox0wx0wv0ppq0pos0pop0vp0vs0ppw0xw0to0ppx0tv0xv0vq0wq0ppu0xw0uv0xo0sx0xv0wv0wp0tv0vw0wr0xo0ppu0xw0to0wq0pow0xw0ppo0wu0ppu0wo0ww0vw0sx0xx0vq0uu0ppt0xo0wv0ux0pox0poo0vp0vo0pot0xw0vp0wt0tv0xx0tp0wu0ppx0xx0vp0pqo0pow0wx0wr0xo0ppu0xv0wv0wp0tv0vv0ppx0tw0tw014');
INSERT INTO `rock_todo` VALUES ('289', '2', '会议通知', '[测试]会议将在5分钟后09:30:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-16 09:25:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('290', '8', '会议通知', '[测试]会议将在5分钟后09:30:00开始，请做好准备,会议室[会议室1]', '0', '2015-07-16 09:25:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('291', '9', '会议通知', '[测试]会议将在5分钟后09:30:00开始，请做好准备,会议室[会议室1]', '1', '2015-07-16 09:25:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('293', '3', '外出出差', '您有[管理员]的[外出出差,单号:OT-20150720-0001]需要处理', '1', '2015-07-20 10:31:47', 'kq_out', '7', '?rocktoken=vu0uq0qv0nmv0vu0tn0rt0rn0tq0nmv0un0rt0nmm0tn0tm0noo0vt0rn0tq0qv0vu0nmr0vm0nmq0um0uu0vm0nno0vm0uu0vv0nmv0uv0ut0nno0nmq0nmn0tn0tq0nnu0vu0rm0nnv0rt0vt0to0uo0nns0vu0st0vm0qv0vt0ut0un0rt0tt0non0vm0nns0vu0rm0uo0nmu0vu0nnm0us0nns0um0uu0nmm0nmq0vt0ut0tu0nnn0nmm0up0vm0qu0uv0ut0tq0nnr0vm0uq0qv0nnq0vv0us0rt0nnu0nmm0uu0un0nmv0vu0ut0nmu0nmt0um0uq0vv0ru012');
INSERT INTO `rock_todo` VALUES ('725', '1', '项目报告', '管理员提交了[APP开发]的项目报告，状态[执行中],进度[35%]', '1', '2015-12-15 20:33:41', 'projectm', '3', null);
INSERT INTO `rock_todo` VALUES ('728', '1', '销假单', '您提交的[销假单,单号:KF-20151230-0001]已处理完成', '1', '2015-12-30 21:57:40', 'kq_sick', '1', null);
INSERT INTO `rock_todo` VALUES ('660', '2', '任务报告', '[车辆预定,查看开发]请在2015-09-24 17:00:00前填写任务报告给管理员', '1', '2015-09-24 16:55:00', 'workbao', '88', '?rocktoken=rq0qm0mr0ni0rp0qp0qo0nj0pm0jir0qj0np0jii0pj0pi0jkk0rp0nj0pm0mr0rq0jin0ri0jim0qi0qq0jii0jjq0rr0jir0jjn0jir0jii0qp0jiq0jip0qi0qm0on0jir0rp0qp0qj0np0pr0qm0on0nq08');
INSERT INTO `rock_todo` VALUES ('613', '5', '工作任务', '您有[周任务.错错错]工作任务待执行，任务将在[2015-05-17 18:26:32]开始，请及时处理!', '1', '2015-09-10 17:08:42', 'work', '71', '?rocktoken=kj0jf0fk0gb0ki0ji0jh0gc0if0cbk0jc0gi0cbb0ic0ib0cdd0ki0gc0if0fk0kj0cbg0kb0cbf0jb0jj0cbb0ccj0kk0cbk0ccg0cbk0cbb0ji0cbj0cbi0jb0jf0hk0cbk0ki0ji0jc0gi0ij0cdd0ie0gj01');
INSERT INTO `rock_todo` VALUES ('620', '8', '工作任务', '您有[基本任务.每天汇报情况]工作任务待执行，任务将在[2015-09-10 18:00:00]开始，请及时处理!', '0', '2015-09-10 17:08:42', 'work', '79', '?rocktoken=on0nj0jo0kf0om0nm0nl0kg0mj0gfo0ng0km0gff0mg0mf0ghh0om0kg0mj0jo0on0gfk0of0gfj0nf0nn0gff0ggn0oo0gfo0ggk0gfo0gff0nm0gfn0gfm0nf0nj0lo0gfo0om0nm0ng0km0mo0ln0ng0kn05');
INSERT INTO `rock_todo` VALUES ('644', '3', '工作任务', '您有[基本任务.测试任务确认考勤]工作任务待执行，任务将在[2015-09-11 10:00:00]开始，请及时处理!', '1', '2015-09-17 16:35:55', 'work', '82', '?rocktoken=nm0mi0in0je0nl0ml0mk0jf0li0fen0mf0jl0fee0lf0le0fgg0nl0jf0li0in0nm0fej0ne0fei0me0mm0fee0ffm0nn0fen0ffj0fen0fee0ml0fem0fel0me0mi0kn0fen0nl0ml0mf0jl0ln0km0mj0jm04');
INSERT INTO `rock_todo` VALUES ('693', '7', '借款单', '您有[管理员]的[借款单,单号:PC-20151029-0001]需要处理', '1', '2015-10-29 09:54:29', 'fininfom', '6', '?rocktoken=ml0lh0hm0edm0ml0ke0ik0ie0kh0edm0le0ik0edd0ke0kd0eff0mk0ie0kh0hm0ml0edi0md0edh0ld0ll0md0eef0md0ll0mm0edm0edd0lk0edl0edk0ld0lh0mm0edm0ml0lk0ik0edk0md0lk0ig0hm0ml0lh0hm0edm0mk0lk0ig0eeg0mk0id0le0edm0edd0ke0kd0edi0ml0ke0li0ik0md0edm0edl0eek0mk0lk0ig0edm0ml0id0hl0edm0ml0lk0edl0edk0ld0lh0lm0il03');
INSERT INTO `rock_todo` VALUES ('679', '4', '奖惩处罚', '您提交[奖惩处罚,单号:KF-20150914-0001]貂蝉处理[不通过]，原因:[12]', '1', '2015-10-20 08:59:48', 'reward', '1', '?rocktoken=ut0tp0pu0mlu0ut0sm0qs0qm0sp0mlu0tm0qs0mll0sm0sl0mnn0us0qm0sp0pu0ut0mlq0ul0mlp0tl0tt0ul0mmn0ul0tt0uu0mlu0tu0ts0mmn0mlp0mlm0sm0sp0mmt0ut0ql0mmu0qs0us0sn0tn0mmr0ut0rs0ul0pu0us0ts0tm0qs0st0rs0ul0mmr0ut0ql0tn0mlt0ut0mml0tr0mmr0tl0tt0sp0mlt0mll0ql0sl0mnm0ul0rs0ul0pt0tu0ts0sp0mmq0ul0tp0pu0mnm0ul0tt0mll0mlp0uu0mlu0tm0mlu0ut0ts0mlt0mls0tl0tp0ru0qt011');
INSERT INTO `rock_todo` VALUES ('686', '10', '费用报销', '您有[管理员]的[费用报销,单号:PA-20150915-0001]需要处理', '1', '2015-10-20 09:35:58', 'fininfom', '3', '?rocktoken=on0nj0jo0gfo0on0mg0km0kg0mj0gfo0ng0km0gff0mg0mf0ghh0om0kg0mj0jo0on0gfk0of0gfj0nf0nn0of0ggh0of0nn0oo0gfo0no0nm0ggh0gfj0gfg0mg0mj0ggn0on0kf0ggo0km0om0mh0nh0ggl0on0lm0of0jo0om0nm0ng0km0mm0nj0lk0gfo0on0nm0km0gfm0of0nm0ki0jo0on0nj0jo0gfo0om0nm0ki0gfo0gfg0nm0mj0kh0mj0ggf0nh0gfj0no0gfo0ghf0gfn0nf0nm0of0ggh0on0gfo0gfn0ggm0of0gfo0km0ggl0mj0gfo0jo0ggh0of0ln0jn0ghh05');
INSERT INTO `rock_todo` VALUES ('694', '1', '文件传送', '您提交的[文件传送,单号:FI-20151027-0001]已处理完成', '1', '2015-11-11 20:07:15', 'docdeil', '13', '?rocktoken=sr0rn0ns0kjs0sr0qk0oq0ok0qn0kjs0rk0oq0kjj0qk0qj0kll0sq0ok0qn0ns0sr0kjo0sj0kjn0rj0rr0sj0kkl0sj0rr0ss0kjs0kjj0rq0kjr0kjq0rj0rn0ps0kjs0sr0rq0oq0kjq0sj0rq0om0ns0sr0rn0ns0kjq0sr0oj0qr0kjq0sj0rq0kjr0kko0qn0kkj0rl0kjn0rs0kjs0klj0kjr0rj0rq0rl0kkr0rs0oj0rl0kjr0sq0rq0kks0kjs0sr0rq0kjr0kjq0rj0rn0ps0kll09');
INSERT INTO `rock_todo` VALUES ('691', '10', '出差报销', '您有[管理员]的[出差报销,单号:PB-20150915-0001]需要处理', '0', '2015-10-23 10:08:48', 'fininfom', '5', '?rocktoken=vu0uq0qv0nmv0vu0tn0rt0rn0tq0nmv0un0rt0nmm0tn0tm0noo0vt0rn0tq0qv0vu0nmr0vm0nmq0um0uu0vm0nno0vm0uu0vv0nmv0nmm0ut0nmu0nmt0um0uq0sv0nnv0tq0nmv0qv0nnu0vm0tn0us0nnt0nmm0ut0qu0rt0vm0nmv0nmu0nnt0uv0rm0tu0nmr0nmn0st0vm0qu0uv0ut0tq0nnr0vm0uq0qv0nmv0vt0ut0rp0nno0vu0nmv0vm0nnu0vu0up0vm0nns0vt0ut0un0rt0tu0un0ru0ru012');
INSERT INTO `rock_todo` VALUES ('690', '3', '奖惩处罚', '您有[大乔]的[奖惩处罚,单号:KF-20150914-0001]需要处理,说明:黑河呵呵', '1', '2015-10-22 10:46:42', 'reward', '1', '?rocktoken=vu0uq0qv0nmv0vu0tn0rt0rn0tq0nmv0un0rt0nmm0tn0tm0noo0vt0rn0tq0qv0vu0nmr0vm0nmq0um0uu0vm0nno0vm0uu0vv0nmv0uv0ut0nno0nmq0nmn0tn0tq0nnu0vu0rm0nnv0rt0vt0to0uo0nns0vu0st0vm0qv0vt0ut0un0rt0tt0non0vm0nns0vu0rm0uo0nmu0vu0nnm0us0nns0um0uu0tq0nmu0nmm0rm0tm0non0vm0st0vm0qu0uv0ut0tq0nnr0vm0uq0qv0non0vm0uu0nmm0nmq0vv0nmv0un0nmv0vu0ut0nmu0nmt0um0uq0sv0ru012');
INSERT INTO `rock_todo` VALUES ('677', '2', '会议通知', '[测试]会议将在5分钟后09:30:00开始，请做好准备,会议室[会议室1]', '1', '2015-10-16 09:25:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('678', '8', '会议通知', '[测试]会议将在5分钟后09:30:00开始，请做好准备,会议室[会议室1]', '0', '2015-10-16 09:25:00', null, null, null);
INSERT INTO `rock_todo` VALUES ('689', '9', '费用报销', '您有[管理员]的[费用报销,单号:PA-20150909-0001]需要处理,说明:嘿嘿和', '1', '2015-10-22 10:17:54', 'fininfom', '2', '?rocktoken=kj0jf0fk0cbk0kj0ic0gi0gc0if0cbk0jc0gi0cbb0ic0ib0cdd0ki0gc0if0fk0kj0cbg0kb0cbf0jb0jj0kb0ccd0kb0jj0kk0cbk0jk0ji0ccd0cbf0cbc0ic0if0ccj0kj0gb0cck0gi0ki0id0jd0cch0kj0hi0kb0fk0ki0ji0jc0gi0ik0je0kb0cch0kj0gb0jd0cbj0kj0ccb0jh0cch0jb0ji0kb0ccd0kj0cbk0kb0ge0jk0ccb0cbe0cbk0cbb0ic0ib0cbg0kj0ic0jg0gi0kb0cbk0cbj0cci0ki0ji0ge0cbk0kj0gb0fj0cbk0kj0ji0cbj0cbi0jb0jf0ie0gj01');
INSERT INTO `rock_todo` VALUES ('688', '1', '费用报销', '您提交[费用报销,单号:PA-20150909-0001]赵子龙处理[不通过]，原因:[hehe]', '1', '2015-10-22 09:42:41', 'fininfom', '2', '?rocktoken=ut0tp0pu0mlu0ut0sm0qs0qm0sp0mlu0tm0qs0mll0sm0sl0mnn0us0qm0sp0pu0ut0mlq0ul0mlp0tl0tt0ul0mmn0ul0tt0uu0mlu0tu0ts0mmn0mlp0mlm0sm0sp0mmt0ut0ql0mmu0qs0us0sn0tn0mmr0ut0rs0ul0pu0us0ts0tm0qs0ss0to0ul0mmr0ut0ql0tn0mlt0ut0mml0tr0mmr0tl0ts0ul0mmn0ut0mlu0ul0qo0tu0mml0mlo0mlu0mll0sm0sl0mlq0ut0sm0tq0qs0ul0mlu0mlt0mms0us0ts0qo0mlu0ut0ql0pt0mlu0ut0ts0mlt0mls0tl0tp0so0qt011');
INSERT INTO `rock_todo` VALUES ('697', '1', '会议室预定', '您提交的[会议室预定,单号:YC-20151123-0001]已处理完成', '1', '2015-11-23 19:37:37', 'meet', '121', '?rocktoken=po0ok0kp0hgp0po0nh0ln0lh0nk0hgp0oh0ln0hgg0nh0ng0hii0pn0lh0nk0kp0po0hgl0pg0hgk0og0oo0pg0hhi0pg0oo0pp0hgp0hgg0on0hgo0hgn0og0ok0mp0hgp0po0on0ln0hgn0pg0on0lj0kp0po0ok0kp0hhm0pg0on0om0ko0nk0hhg0oi0hgk0op0hgp0hig0hgo0og0on0kp0hgo0pg0oo0oh0hgp0po0on0hgo0hgn0og0ok0mp0hih0nn0oh0lo0lo06');
INSERT INTO `rock_todo` VALUES ('698', '1', '会议室预定', '您提交的[会议室预定,单号:YC-20151123-0002]已处理完成', '1', '2015-11-23 19:37:38', 'meet', '122', '?rocktoken=rq0qm0mr0jir0rq0pj0np0nj0pm0jir0qj0np0jii0pj0pi0jkk0rp0nj0pm0mr0rq0jin0ri0jim0qi0qq0ri0jjk0ri0qq0rr0jir0jii0qp0jiq0jip0qi0qm0or0jir0rq0qp0np0jip0ri0qp0nl0mr0rq0qm0mr0jjo0ri0qp0qo0mq0pm0jji0qk0jim0qr0jir0jki0jiq0qi0qp0mr0jiq0ri0qq0qj0jir0rq0qp0jiq0jip0qi0qm0or0jkj0pp0jil0nq0nq08');
INSERT INTO `rock_todo` VALUES ('699', '1', '会议室预定', '您提交的[会议室预定,单号:YC-20151121-0001]已处理完成', '1', '2015-11-23 19:37:40', 'meet', '112', '?rocktoken=po0ok0kp0hgp0po0nh0ln0lh0nk0hgp0oh0ln0hgg0nh0ng0hii0pn0lh0nk0kp0po0hgl0pg0hgk0og0oo0pg0hhi0pg0oo0pp0hgp0hgg0on0hgo0hgn0og0ok0mp0hgp0po0on0ln0hgn0pg0on0lj0kp0po0ok0kp0hhm0pg0on0om0ko0nk0hhg0oi0hgk0op0hgp0hig0hgo0og0on0kp0hgo0pg0oo0oh0hgp0po0on0hgo0hgn0og0ok0mp0hig0nn0hgj0lo0lo06');
INSERT INTO `rock_todo` VALUES ('701', '1', '任务报告', '管理员提交了[考勤设置添加规则对应人员(排版系统)]的任务报告，任务状态[执行中]', '1', '2015-11-27 20:41:30', 'work', '87', '?rocktoken=kj0jf0fk0gb0ki0ji0jh0gc0if0cbk0jc0gi0cbb0ic0ib0cdd0ki0gc0if0fk0kj0cbg0kb0cbf0jb0jj0cbb0ccj0kk0cbk0ccg0cbk0cbb0ji0cbj0cbi0jb0jf0hk0cbk0ki0ji0jc0gi0ik0hj0kk0gj01');
INSERT INTO `rock_todo` VALUES ('716', '1', '打卡异常', '您提交的[打卡异常,单号:KE-20151127-0001]已处理完成', '1', '2015-11-28 22:47:38', 'kq_dkerr', '3', '?rocktoken=nm0mi0in0fen0nm0lf0jl0jf0li0fen0mf0jl0fee0lf0le0fgg0nl0jf0li0in0nm0fej0ne0fei0me0mm0ne0ffg0ne0mm0nn0fen0fee0ml0fem0fel0me0mi0kn0fen0nm0ml0jl0fel0ne0ml0jh0in0nm0mi0in0fel0nl0je0mk0fgf0nn0fej0ne0im0mn0ml0li0ffj0ne0mi0in0ffi0nn0mk0jl0fel0nl0je0mk0fgf0nn0fej0ne0ffk0nl0ml0mf0jl0ll0ffn0jm0jm04');
INSERT INTO `rock_todo` VALUES ('721', '3', '外出出差', '您有[管理员]的[外出出差,单号:KW-20151127-0001]需要处理', '1', '2015-12-06 21:33:27', 'kq_out', '9', '?rocktoken=wv0vr0rw0onw0wv0uo0su0so0ur0onw0vo0su0onn0uo0un0opp0wu0so0ur0rw0wv0ons0wn0onr0vn0vv0wn0oop0wn0vv0ww0onw0onn0vu0onv0onu0vn0vr0uu0onw0wv0vu0su0onu0wn0vu0sq0rw0wv0vr0rw0so0vw0vu0onv0ont0wu0up0vs0onw0onn0uo0un0ons0wv0uo0vs0su0wu0so0un0onp0wv0so0vt0rv0ur0onw0rw0oop0wn0tv0rv0sq013');
INSERT INTO `rock_todo` VALUES ('705', '0', '业务需求', '您有[管理员]的[业务需求,单号:FX-20151127-0001]需要处理', '0', '2015-11-28 12:30:42', 'demand', '1', '?rocktoken=kj0jf0fk0cbk0kj0ic0gi0gc0if0cbk0jc0gi0cbb0ic0ib0cdd0ki0gc0if0fk0kj0cbg0kb0cbf0jb0jj0kb0ccd0kb0jj0kk0cbk0cbb0ji0cbj0cbi0jb0jf0hg0cbk0kj0ji0gi0cbi0kb0ji0ge0fk0kj0jf0fk0cbi0kb0ji0fk0cbf0kj0cbk0jc0cbk0cbb0ic0ib0cbg0kj0ic0jg0gi0kb0ic0jh0cch0jk0ji0ge0cbi0if0cbk0fk0ccd0kb0hj0fj0cdb01');
INSERT INTO `rock_todo` VALUES ('718', '1', '业务需求', '您提交的[业务需求,单号:FX-20151128-0003]已处理完成', '1', '2015-11-30 20:35:43', 'demand', '4', '?rocktoken=wv0vr0rw0onw0wv0uo0su0so0ur0onw0vo0su0onn0uo0un0opp0wu0so0ur0rw0wv0ons0wn0onr0vn0vv0wn0oop0wn0vv0ww0onw0onn0vu0onv0onu0vn0vr0tw0onw0wv0vu0su0onu0wn0vu0sq0rw0wv0vr0rw0onu0wn0vu0rw0onr0wv0onw0vo0onw0onn0uo0un0ons0wv0uo0vs0su0wn0uo0vt0oot0vw0vu0sq0onu0ur0onw0rw0oop0wn0tv0rv0rv013');
INSERT INTO `rock_todo` VALUES ('720', '1', '任务报告', '[考勤设置添加规则对应人员(排版系统)]请在2015-12-06 17:30:00前填写任务报告给管理员', '1', '2015-12-06 17:30:00', 'workbao', '86', '?rocktoken=ml0lh0hm0id0mk0lk0lj0ie0kh0edm0le0ik0edd0ke0kd0eff0mk0ie0kh0hm0ml0edi0md0edh0ld0ll0edd0eel0mm0edm0eei0edm0edd0lk0edl0edk0ld0lh0ji0edm0mk0lk0le0ik0km0jl0mm0il03');
INSERT INTO `rock_todo` VALUES ('712', '1', '业务需求', '您提交的[业务需求,单号:FX-20151128-0002]已处理完成', '1', '2015-11-28 21:26:58', 'demand', '3', '?rocktoken=ut0tp0pu0mlu0ut0sm0qs0qm0sp0mlu0tm0qs0mll0sm0sl0mnn0us0qm0sp0pu0ut0mlq0ul0mlp0tl0tt0ul0mmn0ul0tt0uu0mlu0mll0ts0mlt0mls0tl0tp0ru0mlu0ut0ts0qs0mls0ul0ts0qo0pu0ut0tp0pu0mls0ul0ts0pu0mlp0ut0mlu0tm0mlu0mll0sm0sl0mlq0ut0sm0tq0qs0ul0sm0tr0mmr0tu0ts0qo0mls0sp0mlu0pu0mmn0ul0rt0pt0mnn011');
INSERT INTO `rock_todo` VALUES ('713', '1', '业务需求', '您提交的[业务需求,单号:FX-20151128-0001]已处理完成', '1', '2015-11-28 22:04:39', 'demand', '2', '?rocktoken=po0ok0kp0hgp0po0nh0ln0lh0nk0hgp0oh0ln0hgg0nh0ng0hii0pn0lh0nk0kp0po0hgl0pg0hgk0og0oo0pg0hhi0pg0oo0pp0hgp0hgg0on0hgo0hgn0og0ok0mp0hgp0po0on0ln0hgn0pg0on0lj0kp0po0ok0kp0hgn0pg0on0kp0hgk0po0hgp0oh0hgp0hgg0nh0ng0hgl0po0nh0ol0ln0pg0nh0om0hhm0op0on0lj0hgn0nk0hgp0kp0hhi0pg0mo0ko0hih06');
INSERT INTO `rock_todo` VALUES ('715', '1', '业务需求', '您提交的[业务需求,单号:FX-20151127-0001]已处理完成', '1', '2015-11-28 22:23:43', 'demand', '1', '?rocktoken=vu0uq0qv0nmv0vu0tn0rt0rn0tq0nmv0un0rt0nmm0tn0tm0noo0vt0rn0tq0qv0vu0nmr0vm0nmq0um0uu0vm0nno0vm0uu0vv0nmv0nmm0ut0nmu0nmt0um0uq0sv0nmv0vu0ut0rt0nmt0vm0ut0rp0qv0vu0uq0qv0nmt0vm0ut0qv0nmq0vu0nmv0un0nmv0nmm0tn0tm0nmr0vu0tn0ur0rt0vm0tn0us0nns0uv0ut0rp0nmt0tq0nmv0qv0nno0vm0su0qu0nom012');
INSERT INTO `rock_todo` VALUES ('717', '1', '请假条', '您提交的[请假条,单号:KL-20151127-0001]已处理完成', '1', '2015-11-30 20:20:17', 'kq_info', '41', '?rocktoken=rq0qm0mr0jir0rq0pj0np0nj0pm0jir0qj0np0jii0pj0pi0jkk0rp0nj0pm0mr0rq0jin0ri0jim0qi0qq0ri0jjk0ri0qq0rr0jir0jii0qp0jiq0jip0qi0qm0or0jir0rq0qp0np0jip0ri0qp0nl0mr0rq0qm0mr0jjn0ri0qp0pi0ni0ri0ql0ri0mq0qr0qp0pm0jjn0ri0qm0mr0jjm0rr0qo0np0jjk0rq0jir0ri0jjq0pm0jir0mr0jjk0ri0oq0mq0mq0pp0qj0nq0nq08');
INSERT INTO `rock_todo` VALUES ('726', '3', '外出出差', '您有[貂蝉]的[外出出差,单号:KW-20151227-0001]需要处理', '1', '2015-12-27 19:11:59', 'kq_out', '10', null);
INSERT INTO `rock_todo` VALUES ('729', '3', '请假条', '您提交的[请假条,单号:KL-20151227-0002]已处理完成', '0', '2016-01-12 16:52:21', 'kq_info', '47', null);

-- ----------------------------
-- Table structure for `rock_userjl`
-- ----------------------------
DROP TABLE IF EXISTS `rock_userjl`;
CREATE TABLE `rock_userjl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `ranking` varchar(50) DEFAULT NULL,
  `startdt` date DEFAULT NULL COMMENT '开始日期',
  `enddt` date DEFAULT NULL COMMENT '截止日期',
  `uid` int(11) DEFAULT NULL,
  `sort` smallint(6) DEFAULT '0',
  `atype` varchar(20) DEFAULT NULL COMMENT '类型',
  `optdt` datetime DEFAULT NULL,
  `explain` varchar(500) DEFAULT NULL,
  `httype` varchar(30) DEFAULT NULL COMMENT '合同类型',
  `state` varchar(20) DEFAULT NULL COMMENT '状态',
  `tqenddt` date DEFAULT NULL COMMENT '提前终止',
  `company` varchar(50) DEFAULT NULL COMMENT '签署公司',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_userjl
-- ----------------------------
INSERT INTO `rock_userjl` VALUES ('2', '谷歌', '程序员', '2015-02-02', '2015-05-17', '1', '0', 'work', null, null, null, null, null, null);
INSERT INTO `rock_userjl` VALUES ('3', 'ROCKOA技术', '项目经理', '2015-05-17', '2015-08-08', '1', '0', 'work', null, null, null, null, null, null);
INSERT INTO `rock_userjl` VALUES ('5', '清华大学', '哈哈', '2015-05-17', '2015-05-28', '1', '0', 'edu', null, null, null, null, null, null);
INSERT INTO `rock_userjl` VALUES ('6', '微软', '开发工程师', '2012-01-24', '2015-05-17', '1', '0', 'work', null, null, null, null, null, null);
INSERT INTO `rock_userjl` VALUES ('7', '三国培训', '贵妃', '2015-05-17', '2015-05-20', '3', '0', 'work', null, null, null, null, null, null);
INSERT INTO `rock_userjl` VALUES ('8', null, null, '2015-01-01', null, '7', '0', 'ract', '2015-09-17 10:53:24', null, '固定期限劳动合同', '有效', null, '厦门新浩技术有限公司');
INSERT INTO `rock_userjl` VALUES ('10', null, null, '2015-01-01', '2015-12-31', '1', '0', 'ract', '2015-09-17 10:56:19', null, '固定期限劳动合同', '有效', null, '厦门新浩技术有限公司');

-- ----------------------------
-- Table structure for `rock_vcard`
-- ----------------------------
DROP TABLE IF EXISTS `rock_vcard`;
CREATE TABLE `rock_vcard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '名字',
  `mobile` varchar(100) DEFAULT NULL COMMENT '手机号',
  `optdt` datetime DEFAULT NULL,
  `optid` int(11) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL COMMENT '电话',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `gname` varchar(20) DEFAULT NULL COMMENT '所在组名',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_vcard
-- ----------------------------
INSERT INTO `rock_vcard` VALUES ('1', '吕布', '10086', '2015-05-17 10:41:41', '1', null, null, '盟友', '管理员', null, '0');

-- ----------------------------
-- Table structure for `rock_where`
-- ----------------------------
DROP TABLE IF EXISTS `rock_where`;
CREATE TABLE `rock_where` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mnum` varchar(100) DEFAULT NULL COMMENT '对应编号',
  `luoji` varchar(10) DEFAULT NULL COMMENT '逻辑',
  `field` varchar(30) DEFAULT NULL COMMENT '字段',
  `name` varchar(30) DEFAULT NULL COMMENT '字段名',
  `optlx` varchar(20) DEFAULT NULL COMMENT '逻辑',
  `value` varchar(100) DEFAULT NULL COMMENT '对应值',
  `values` varchar(50) DEFAULT NULL,
  `optid` int(11) DEFAULT NULL COMMENT '人员ID',
  `optdt` datetime DEFAULT NULL,
  `sort` smallint(6) DEFAULT '0',
  `explain` varchar(50) DEFAULT NULL COMMENT '说明',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_where
-- ----------------------------
INSERT INTO `rock_where` VALUES ('1', 'flowcourse_1', null, 'qjkind', '请假类型', '=', '年假', '年假', '1', '2015-01-09 17:46:42', '1', null);
INSERT INTO `rock_where` VALUES ('2', 'flowcourse_1', 'AND', 'stime', '开始时间', '>=', '2015-01-07', null, '1', '2015-01-09 17:46:42', '2', null);
INSERT INTO `rock_where` VALUES ('4', 'flowcourse_1', '(', null, null, null, null, null, '1', '2015-01-09 17:46:42', '0', null);
INSERT INTO `rock_where` VALUES ('5', 'flowcourse_1', ')', null, null, null, null, null, '1', '2015-01-09 17:46:42', '7', null);
INSERT INTO `rock_where` VALUES ('6', 'flowcourse_1', 'AND', 'explain', '说明', 'LEFT', ' 12', null, '1', '2015-01-09 17:46:42', '3', null);
INSERT INTO `rock_where` VALUES ('7', 'flowcourse_1', 'AND', 'optdt', '操作时间', 'NO NULL', null, null, '1', '2015-01-09 17:46:42', '4', null);
INSERT INTO `rock_where` VALUES ('8', 'flowcourse_1', 'AND', 'totals', '时间(小时)', '>=', '1', null, '1', '2015-01-09 17:46:42', '5', null);
INSERT INTO `rock_where` VALUES ('9', 'flowcourse_1', 'AND', 'isturn', '是否提交', '=', '提交', '1', '1', '2015-01-09 17:46:42', '6', null);
INSERT INTO `rock_where` VALUES ('11', 'flowcourse_2', null, 'totals', '时间(小时)', '<=', '8', null, '1', '2015-01-10 17:28:57', '0', null);
INSERT INTO `rock_where` VALUES ('12', 'flowcourse_3', null, 'totals', '时间(小时)', '>', '8', null, '1', '2015-01-10 17:37:18', '0', null);
INSERT INTO `rock_where` VALUES ('13', 'flowcourse_3', 'AND', 'totals', '时间(小时)', '<=', '24', null, '1', '2015-01-10 17:37:18', '1', null);
INSERT INTO `rock_where` VALUES ('14', 'flowcourse_4', null, 'totals', '时间(小时)', '>', '24', null, '1', '2015-01-10 17:37:46', '0', null);
INSERT INTO `rock_where` VALUES ('15', 'flowset_leave', null, 'kind', '类型', '=', '请假', '请假', '1', '2015-01-10 18:55:11', '0', null);
INSERT INTO `rock_where` VALUES ('16', 'flowset_jiaban', null, 'kind', '类型', '=', '加班', '加班', '1', '2015-01-10 19:54:30', '0', null);
INSERT INTO `rock_where` VALUES ('17', 'flowcourse_21', null, 'totals', '时间(小时)', '>', '24', null, '1', '2015-01-13 16:45:26', '0', null);
INSERT INTO `rock_where` VALUES ('20', 'flowcourse_20', null, 'totals', '时间(小时)', '>', '8', null, '1', '2015-01-13 17:20:43', '0', null);
INSERT INTO `rock_where` VALUES ('21', 'flowset_finfybx', null, 'type', '单据类型', '=', '报销单', '0', '1', '2015-08-20 17:35:33', '0', null);
INSERT INTO `rock_where` VALUES ('22', 'flowset_finccbx', null, 'type', '单据类型', '=', '出差报销', '1', '1', '2015-08-25 11:02:51', '0', null);
INSERT INTO `rock_where` VALUES ('23', 'flowset_finjkd', null, 'type', '单据类型', '=', '借款单', '2', '1', '2015-08-25 11:04:24', '0', null);
INSERT INTO `rock_where` VALUES ('24', 'flowcourse_46', null, 'money', '金额', '>', '5000', null, '1', '2015-10-27 10:25:52', '0', null);
INSERT INTO `rock_where` VALUES ('25', 'flowcourse_37', null, 'money', '金额', '<=', '5000', null, '1', '2015-10-27 10:26:23', '0', null);
INSERT INTO `rock_where` VALUES ('26', 'flowset_meet', null, 'type', '类型', '=', '普通', '0', '1', '2015-11-21 19:41:01', '0', null);

-- ----------------------------
-- Table structure for `rock_word`
-- ----------------------------
DROP TABLE IF EXISTS `rock_word`;
CREATE TABLE `rock_word` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(20) DEFAULT NULL COMMENT '类别',
  `typeid` smallint(6) DEFAULT '0',
  `adddt` datetime DEFAULT NULL,
  `fileid` int(11) DEFAULT NULL,
  `sort` int(11) DEFAULT '0' COMMENT '排序号',
  `filename` varchar(100) DEFAULT NULL COMMENT '文件名',
  `filesizecn` varchar(20) DEFAULT NULL COMMENT '文件大小',
  `fileext` varchar(20) DEFAULT NULL COMMENT '文档类型',
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `shatename` varchar(200) DEFAULT NULL COMMENT '共享给',
  `shateuid` varchar(200) DEFAULT NULL,
  `atype` tinyint(4) DEFAULT '0' COMMENT '@0|内部,1|个人',
  `optid` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rock_word
-- ----------------------------
INSERT INTO `rock_word` VALUES ('5', '基础文件', '0', '2015-05-15 15:29:40', '52', '0', '20060905025434921[1].gif', '355.00 Byte', 'gif', '管理员', null, null, '0', '1');
INSERT INTO `rock_word` VALUES ('6', '基础文件', '0', '2015-05-15 15:29:42', '53', '0', '20060905025435380[1].gif', '111.00 Byte', 'gif', '管理员', null, null, '0', '1');
INSERT INTO `rock_word` VALUES ('7', '基础文件', '0', '2015-05-15 15:29:43', '54', '0', '20060905025512830[1].gif', '914.00 Byte', 'gif', '管理员', null, null, '0', '1');
INSERT INTO `rock_word` VALUES ('8', '基础文件', '0', '2015-05-15 15:29:45', '55', '0', '20060905025513169[1].gif', '341.00 Byte', 'gif', '管理员', null, null, '0', '1');
INSERT INTO `rock_word` VALUES ('9', '技术文档', '0', '2015-05-15 15:31:25', '56', '0', '20060905025435519[1].gif', '125.00 Byte', 'gif', '管理员', '本部门', 'dept', '1', '1');
INSERT INTO `rock_word` VALUES ('10', '技术文档', '0', '2015-05-15 16:35:20', '57', '0', '20060905025432709[1].gif', '170.00 Byte', 'gif', '管理员', null, null, '1', '1');
INSERT INTO `rock_word` VALUES ('11', '基础文档', '0', '2015-11-09 09:38:10', '45', '0', 'face.jpg', '41.24 KB', 'jpg', '管理员', null, null, '0', '1');
INSERT INTO `rock_word` VALUES ('12', '技术文档', '140', '2015-11-09 09:49:51', '46', '0', 'face.jpg', '41.24 KB', 'jpg', '管理员', null, null, '1', '1');
