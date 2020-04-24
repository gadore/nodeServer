/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : simba-item-data

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2020-04-24 17:50:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tt_receive`
-- ----------------------------
DROP TABLE IF EXISTS `tt_receive`;
CREATE TABLE `tt_receive` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `综合信息` varchar(255) DEFAULT NULL,
  `识别字段` varchar(255) DEFAULT NULL,
  `序号` varchar(255) DEFAULT NULL,
  `设备名称` varchar(255) DEFAULT NULL,
  `单价` double(255,0) DEFAULT NULL,
  `不含税单价` double(255,10) DEFAULT NULL,
  `原始数量` int(200) DEFAULT NULL,
  `税率` double(200,10) DEFAULT NULL,
  `不含税金额` double(255,10) DEFAULT NULL,
  `领用情况` varchar(50) DEFAULT NULL,
  `剩余数量` int(200) DEFAULT NULL,
  `剩余金额` double(200,0) DEFAULT NULL,
  `供应商` varchar(200) DEFAULT NULL,
  `入库编号` varchar(200) DEFAULT NULL,
  `合同编号` varchar(200) DEFAULT NULL,
  `入库时间` timestamp NULL DEFAULT NULL,
  `入库年份` int(50) DEFAULT NULL,
  `是否匹配` varchar(20) DEFAULT NULL,
  `匹配凭证号` varchar(200) DEFAULT NULL,
  `匹配后总差额` varchar(100) DEFAULT NULL,
  `是否完全匹配` varchar(50) DEFAULT NULL,
  `V` varchar(50) DEFAULT NULL,
  `V2-剩余差异abs总额` double(200,0) DEFAULT NULL,
  `凭证号` varchar(100) DEFAULT NULL,
  `发票日期` varchar(100) DEFAULT NULL,
  `发票开具人` varchar(100) DEFAULT NULL,
  `发票采购货物名称1` varchar(200) DEFAULT NULL,
  `发票采购货物数量1` varchar(100) DEFAULT NULL,
  `发票不含税金额1` varchar(100) DEFAULT NULL,
  `识别码` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5115 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tt_receive
-- ----------------------------
INSERT INTO `tt_receive` VALUES ('5113', '上海仁马电子信息科技有限公司RM20170622WLS0211282.05', 'JXCTZ0381', '18665', 'SD95D-088口千兆非网管交换机', '165', '369.3376068376', '0', '0.1700000000', '11282.0500000000', '完全领用', '200', '0', '上海仁马电子信息科技有限公司', '2017RK01', 'RM20170622WLS02', '2017-07-26 00:00:00', '2017', '是', '2017-7 记账凭证   55', '0', '完全匹配', '海江接下来核对', '445971', '2017-7 记账凭证   55', '42909', '上海仁马电子信息科技有限公司', 'SF95D-08-CN 8口千兆非网管交换机', '80', '11282.05', 'XB000001');
INSERT INTO `tt_receive` VALUES ('5114', '上海仁马电子信息科技有限公司RM20180528SCL0128846.15', 'JXCTZ0388', '18672', 'SD95D-088口千兆非网管交换机', '270', '369.3376068376', '250', '0.1700000000', '28846.1500000000', '完全领用', '0', '0', '上海仁马电子信息科技有限公司', '2018RK01', 'RM20180528SCL01', '2018-05-26 00:00:00', '2018', '是', '2018-6 记账凭证   67', '-248.68', 'XX', '海江接下来核对', '445971', '2018-6 记账凭证   67', '43250', '上海仁马电子信息科技有限公司', 'SD95D-08 8口千兆非网管交换机', '125', '29094.83', 'XB000001');
