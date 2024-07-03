-- 创建用户表
CREATE TABLE IF NOT EXISTS `user` (
  user_id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '用户id',
  user_name VARCHAR(10) COMMENT '用户名',
  age TINYINT COMMENT '年龄',
  create_time DATETIME COMMENT '创建时间'
);

INSERT INTO `user` (user_id, user_name, age, create_time) VALUES (12331, '张三', 18, '2024-07-02 09:45:00'), (434354, '李四', 20, '2024-07-02 09:45:00'), (123111, '王五', 22, '2024-07-02 09:45:00'), (900099, '赵六', 24, '2024-07-02 09:45:00');

CREATE TABLE IF NOT EXISTS `cars` (
  car_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  driver_id int COMMENT '司机id',
  car_brand VARCHAR(10) COMMENT '汽车品牌',
  create_time DATETIME COMMENT '创建时间',
  FOREIGN KEY (`driver_id`) REFERENCES `user`(`user_id`)
);

INSERT INTO `cars` (driver_id, car_brand, create_time) VALUES (12331, '奔驰', '2024-07-02 09:45:00'), (434354, '宝马', '2024-07-02 09:45:00'), (123111, '大众', '2024-07-02 09:45:00'), (900099, '大众', '2024-07-02 09:45:00');
-- 修改表名称
-- DROP TABLE IF EXISTS `car2`;
-- ALTER TABLE `cars` RENAME `car2`;
-- 增加数据表列
-- ALTER TABLE `car2` Add COLUMN `max_sets` INT;
-- ALTER TABLE `car2` Add COLUMN `desc_info` VARCHAR(100);
-- 删除数据表列
-- ALTER TABLE `car2` DROP COLUMN `desc_info`;
-- 修改表数据列 （原始的一些列的数据类型啥的都要写上去）
-- ALTER TABLE `car2` MODIFY COLUMN `max_sets` INT COMMENT '最大座位数';

-- 新增数据 单条数据和多条数据
-- INSERT INTO `user` (user_name, age, create_time) VALUES ('张三', 18, '2024-07-02 09:45:00');
-- INSERT INTO `user` (user_name, age, create_time) VALUES ('李四', 20, '2024-07-02 09:45:00'), ('王五', 22, '2024-07-02 09:45:00');
-- 删除数据
-- DELETE FROM `user` WHERE user_name = '张三';
-- 更新数据
-- UPDATE `user` SET user_name = '哈哈' WHERE id = 19;