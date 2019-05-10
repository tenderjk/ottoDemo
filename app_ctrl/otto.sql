/*
 Navicat Premium Data Transfer

 Source Server         : MinMysql
 Source Server Type    : MySQL
 Source Server Version : 50150
 Source Host           : localhost:3306
 Source Schema         : otto

 Target Server Type    : MySQL
 Target Server Version : 50150
 File Encoding         : 65001

 Date: 10/05/2019 16:34:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `thumbnailUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `oriPrice` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, 'COLLON AB1', '749.99', '系列AB Boxspring床包括LED照明，礼帽和靠垫', 'images/1-thumbnail.jpg', 'images/1.jpg', 'furniture', '1499.99');
INSERT INTO `goods` VALUES (2, 'COLLECTION SS', '799.99', '系列AB箱弹簧 “阿巴诺” 包括LED照明和顶部', 'images/2-thumbnail.jpg', 'images/2.jpg', 'furniture', '1599');
INSERT INTO `goods` VALUES (3, 'JR1', '899', 'JockenhöferGroup弹簧床，带有顶部和装饰垫，有各种设计', 'images/3-thumbnail.jpg', 'images/3.jpg', 'furniture', '1200');
INSERT INTO `goods` VALUES (4, 'JOER2', '699', 'Jockenhöfer集团弹簧床采用PU泡沫罩\r\nJockenhöfer集团弹簧床采用PU泡沫罩', 'images/4-thumbnail.jpg', 'images/4.jpg', 'furniture', '0');
INSERT INTO `goods` VALUES (5, 'COLBRE', '1200', '韦斯伐里亚睡眠舒适盒弹簧床，无床头板，可调节在房间里', 'images/5-thumbnail.jpg', 'images/5.jpg', 'furniture', '2599.99');
INSERT INTO `goods` VALUES (6, 'INOSIGN', '399', 'JockenhöferGroup弹簧床，带有顶部和装饰垫，有各种设计', 'images/6-thumbnail.jpg', 'images/6.jpg', 'furniture', '0');
INSERT INTO `goods` VALUES (7, 'BRECKLE', '899.99', 'meise.möbel带床头盒的Boxspring床，可选配施华洛世奇水晶', 'images/7-thumbnail.jpg', 'images/7.jpg', 'furniture', '1300');
INSERT INTO `goods` VALUES (8, 'JOCKENH', '799', 'DELIFE弹簧床云灰180x200厘米弹簧芯', 'images/8-thumbnail.jpg', 'images/8.jpg', 'furniture', '0');
INSERT INTO `goods` VALUES (9, 'HÖFER', '600', '系列AB Boxspringbed包括Topper', 'images/9-thumbnail.jpg', 'images/9.jpg', 'furniture', '0');
INSERT INTO `goods` VALUES (10, 'JOÖFERBE', '1539', '这款时尚的弹簧床采用纹理/仿皮混纺设计', 'images/10-thumbnail.jpg', 'images/10.jpg', 'furniture', '3099');
INSERT INTO `goods` VALUES (11, '红辣椒双4G版', '949', '小辣椒 红辣椒双4G版V11曲面无边框全网通智能微商手机分期花呗6p', 'images/11-thumbnail.jpg', 'images/11.jpg', 'like', '1899');
INSERT INTO `goods` VALUES (12, '华为P30 pro', '3988', '分期免息HUAWEI P30 华为P30 pro 华为/huawei 全面屏手机麒麟980', 'images/12.png', 'images/12.png', 'like', '4299');
INSERT INTO `goods` VALUES (13, 'Xiaomi Red', '999', '正品Xiaomi/小米 Redmi Note 7红米note7pro新手机8小金刚红米7 6', 'images/13.jpg', 'images/13.jpg', 'like', '1288');
INSERT INTO `goods` VALUES (14, '小米 PLAY', '1899', 'Xiaomi/小米 小米 PLAY手机全新正品全面手机红米note7学生千元机', 'images/14.png', 'images/14.png', 'like', '2000');
INSERT INTO `goods` VALUES (15, '小米 9', '2999', '【六期免息+赠贴膜】Xiaomi/小米小米9 骁龙855全面屏索尼4800万指纹拍照游戏手机官方旗舰透明米8note7王源', 'images/15.jpg', 'images/15.jpg', 'like', '3199');
INSERT INTO `goods` VALUES (16, 'iqoo', '2899', '【12期免息现货速发】vivo iQOO生而强悍高通骁龙855处理器水滴全面屏智能游戏正品手机官网 vivoiQOO iqoo', 'images/16.jpg', 'images/16.jpg', 'like', '3599');
INSERT INTO `goods` VALUES (17, 'samsung s10', '4599', 'Samsung/三星Galaxy S10+ SM-G9750骁龙855五摄超感官全视屏IP68防水全网通4G旗舰游戏全新智能手机官方正品', 'images/17.jpg', 'images/17.jpg', 'like', '4899');
INSERT INTO `goods` VALUES (18, 'samsung s10+', '5899', 'samsung Galaxy s10 盖世兔', 'images/samsung.png', 'images/samsung.png', 'like', '6000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '123456', NULL, NULL, NULL);
INSERT INTO `user` VALUES ('nihao', '111111', 'fd@qq.com', '男', '嘻嘻嘻');
INSERT INTO `user` VALUES ('admin77', '123456', '294400217@qq.com', '女', '1234');
INSERT INTO `user` VALUES ('root', '123456', '294400217@qq.com', '男', 'yj1234');

SET FOREIGN_KEY_CHECKS = 1;
