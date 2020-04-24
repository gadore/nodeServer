/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : simba-item-data

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2020-04-24 17:50:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tt_send`
-- ----------------------------
DROP TABLE IF EXISTS `tt_send`;
CREATE TABLE `tt_send` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `数据来源` varchar(200) DEFAULT NULL,
  `发出仓库` varchar(200) DEFAULT NULL,
  `分类-审计用` varchar(100) DEFAULT NULL,
  `分类` varchar(100) DEFAULT NULL,
  `唯一编码` varchar(100) DEFAULT NULL,
  `项目编号` varchar(100) DEFAULT NULL,
  `项目名称` varchar(100) DEFAULT NULL,
  `场地` varchar(50) DEFAULT NULL,
  `物料编码` varchar(50) DEFAULT NULL,
  `物料名称` varchar(50) DEFAULT NULL,
  `规格型号` varchar(50) DEFAULT NULL,
  `统一物料名称` varchar(50) DEFAULT NULL,
  `领用数量` int(200) DEFAULT NULL,
  `含税单价` double(200,10) DEFAULT NULL,
  `税率` float(50,6) DEFAULT NULL,
  `领用总额(含税)` double(200,10) DEFAULT NULL,
  `领用单价-不含税` double(200,10) DEFAULT NULL,
  `库存编号` varchar(100) DEFAULT NULL,
  `合同编号` varchar(100) DEFAULT NULL,
  `供应商` varchar(50) DEFAULT NULL,
  `修改出库时间0421` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `识别码` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tt_send
-- ----------------------------
INSERT INTO `tt_send` VALUES ('1', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', 'SD95D-088口千兆非网管交换机', 'xx', 'SD95D-088口千兆非网管交换机', '100', '165.0000000000', '0.170000', '330.0000000000', '369.3376068376', '2017RK01', 'RM20170622WLS02', '上海仁马电子信息科技有限公司', '2020-04-24 17:47:23', 'XB000001');
INSERT INTO `tt_send` VALUES ('2', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', 'SG95-16-CN16口千兆非网管企业级交换机', 'xx', 'SG95-16-CN16口千兆非网管企业级交换机', '50', '790.0000000000', '0.170000', '790.0000000000', '675.2100000000', '2018RK01', 'RM20180427PJ02', '上海仁马电子信息科技有限公司', '2018-05-31 00:00:00', 'XB000002');
INSERT INTO `tt_send` VALUES ('3', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '1.NI1OU-M12-AP6X-H1141', 'xx', '1.NI1OU-M12-AP6X-H1141', '100', '359.0000000000', '0.170000', '359.0000000000', '306.8400000000', '2017RK01', 'SC1708117', '图尔克（天津）传感器有限公司', '2018-05-31 00:00:00', 'XB000003');
INSERT INTO `tt_send` VALUES ('4', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '2.WKC4T-2/TEL', 'xx', '2.WKC4T-2/TEL', '100', '40.0000000000', '0.170000', '40.0000000000', '34.1900000000', '2017RK01', 'SC1708117', '图尔克（天津）传感器有限公司', '2018-05-31 00:00:00', 'XB000004');
INSERT INTO `tt_send` VALUES ('5', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', 'NI10U-M12-AP6X-H1141', 'xx', 'NI10U-M12-AP6X-H1141', '44', '359.0000000000', '0.170000', '359.0000000000', '306.8400000000', '2017RK01', 'SC171206', '图尔克（天津）传感器有限公司', '2018-05-31 00:00:00', 'XB000005');
INSERT INTO `tt_send` VALUES ('6', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', 'WKC4T-2/TEL', 'xx', 'WKC4T-2/TEL', '50', '40.0000000000', '0.170000', '40.0000000000', '34.1900000000', '2017RK01', 'SC171206', '图尔克（天津）传感器有限公司', '2018-05-31 00:00:00', 'XB000006');
INSERT INTO `tt_send` VALUES ('7', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '传感器', 'xx', '传感器', '100', '359.0000000000', '0.170000', '359.0000000000', '306.8400000000', '2018RK01', 'YH18032101', '上海骏颐自动化科技有限公司', '2018-05-31 00:00:00', 'XB000007');
INSERT INTO `tt_send` VALUES ('8', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '接插件', 'xx', '接插件', '100', '40.0000000000', '0.170000', '40.0000000000', '34.1900000000', '2018RK01', 'YH18032101', '上海骏颐自动化科技有限公司', '2018-05-31 00:00:00', 'XB000008');
INSERT INTO `tt_send` VALUES ('9', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '光电开关(CX-411-P)', 'xx', '光电开关(CX-411-P)', '22', '115.0000000000', '0.170000', '345.0000000000', '98.2900000000', '2017RK01', 'CR10027537', '上海瑞项自动化科技有限公司', '2018-05-31 00:00:00', 'XB000009');
INSERT INTO `tt_send` VALUES ('10', null, null, null, null, '2018BSZJC01', '2018BSZJC01', '百世昆明搬迁', '百世昆明', 'xx', '小型光电传感器(CX-412-P)', 'xx', '小型光电传感器(CX-412-P)', '200', '130.0000000000', '0.170000', '780.0000000000', '111.1100000000', '2017RK01', 'CR10027537', '上海瑞项自动化科技有限公司', '2018-05-31 00:00:00', 'XB000010');
