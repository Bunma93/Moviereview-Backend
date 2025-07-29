-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: movie_review
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table ` moviegenres`
--

DROP TABLE IF EXISTS ` moviegenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE ` moviegenres` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ` moviegenres`
--

LOCK TABLES ` moviegenres` WRITE;
/*!40000 ALTER TABLE ` moviegenres` DISABLE KEYS */;
/*!40000 ALTER TABLE ` moviegenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actorname` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `actorimagePath` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `role` enum('director','actor') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (19,'ณเดชน์ คูกิมิยะ','2025-03-27','uploads\\actors\\1743386287236.jpg','ไทย','actor'),(20,'ธนัตถ์ศรันย์ ซำทองไหล','2000-07-12','uploads\\actors\\1743386779998.jpg','ไทย','actor'),(28,'รัตนวดี วงศ์ทอง','2004-05-22','uploads\\actors\\1743386480799.jpg','ไทย','actor'),(29,'เดนิส เจลีลชา คัปปุน','2007-02-15','uploads\\actors\\1743386628994.jpg','ไทย','actor'),(30,'ทศพล หมายสุข','1989-02-27','uploads\\actors\\1743386998034.webp','ไทย','actor'),(31,'กาจบัณฑิต ใจดี','1996-07-12','uploads\\actors\\1743387077460.jpg','ไทย','actor'),(32,'พีรวิชญ์ อรรถชิตสถาพร','1998-03-15','uploads\\actors\\1743387805028.png','ไทย','actor'),(33,'พีระกฤตย์ พชรบุณยเกียรติ','2002-03-16','uploads\\actors\\1743388194274.webp','ไทย','actor'),(34,'ทวีวัฒน์ วันทา','2025-03-31','uploads\\actors\\1743394147598.jpeg','ไทย','director'),(35,'จินเจษฎ์ วรรธนะสิน (เจ้านาย)','2025-04-05','uploads\\actors\\1743832382347.jpg','ไทย','actor'),(36,'กรณิศ เล้าสุบินประเสริฐ (อ๊ะอาย)','2025-06-09','uploads\\actors\\1743832480444.jpg','ไทย','actor'),(37,'อิชณน์กร พึ่งเกียรติรัศมี (จ๋าย)','2025-11-15','uploads\\actors\\1743832611106.jpg','ไทย','actor'),(38,'นพพล โกมารชุน (ตู่)','2025-04-05','uploads\\actors\\1743832861976.webp','ไทย','actor'),(39,'จุลจักร จักรพงษ์','2025-04-05','uploads\\actors\\1743832909220.jpg','ไทย','actor'),(40,'นฤเบศร์ จินปิ่นเพชร (โก้)','2025-04-05','uploads\\actors\\1743832975599.jpg','ไทย','actor'),(41,'อั๋น สิรคุปต์เมทะนี','2025-04-05','uploads\\actors\\1743833121019.jpg','ไทย','actor'),(42,'อารักษ์ อมรศุภศิริ','2025-04-07','uploads\\actors\\1743985558849.jpg','ไทย','director');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acts`
--

DROP TABLE IF EXISTS `acts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acts` (
  `ActorId` int NOT NULL,
  `MovieId` int NOT NULL,
  PRIMARY KEY (`ActorId`,`MovieId`),
  KEY `MovieId` (`MovieId`),
  CONSTRAINT `acts_ibfk_1` FOREIGN KEY (`ActorId`) REFERENCES `actors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `acts_ibfk_2` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acts`
--

LOCK TABLES `acts` WRITE;
/*!40000 ALTER TABLE `acts` DISABLE KEYS */;
INSERT INTO `acts` VALUES (19,8),(20,8),(28,8),(29,8),(30,8),(31,8),(32,8),(33,8),(34,8),(35,18),(36,18),(37,18),(38,18),(39,18),(40,18),(41,18),(42,18);
/*!40000 ALTER TABLE `acts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commentText` text NOT NULL,
  `commentDate` datetime DEFAULT NULL,
  `ratingScore` float DEFAULT NULL,
  `MovieId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `MovieId` (`MovieId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_101` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_102` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (20,'หนังดีมาก!','2025-03-01 10:56:16',5,10,18),(22,'Test02','2025-03-05 08:58:17',3,9,18),(24,'Test01-User02','2025-03-05 09:02:11',4,10,10),(28,'ทดสอบระบบการดึงคอมเม้น','2025-05-16 00:44:06',3.5,8,9),(29,'ทดสอบระบบการดึงคอมเม้น\n','2025-05-16 00:51:06',4,8,11),(30,'ทดสอบการดึงคอมเม้น\n','2025-05-16 00:51:50',3.5,8,12),(31,'ทดสอบการดึงคเมมเ้น\n','2025-05-16 00:52:33',3.5,8,15);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genreName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'แอ็กชัน'),(2,'ผจญภัย'),(3,'ตลก'),(4,'ดราม่า'),(5,'แฟนตาซี'),(6,'สยองขวัญ'),(7,'ลึกลับ/สืบสวน'),(8,'โรแมนติก'),(9,'ไซไฟ'),(10,'ชีวิตจริง/ชีวประวัติ'),(11,'ดนตรี/เพลง'),(12,'สารคดี');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moviegenres`
--

DROP TABLE IF EXISTS `moviegenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moviegenres` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moviegenres`
--

LOCK TABLES `moviegenres` WRITE;
/*!40000 ALTER TABLE `moviegenres` DISABLE KEYS */;
/*!40000 ALTER TABLE `moviegenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movienews`
--

DROP TABLE IF EXISTS `movienews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movienews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `newsimagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movienews`
--

LOCK TABLES `movienews` WRITE;
/*!40000 ALTER TABLE `movienews` DISABLE KEYS */;
INSERT INTO `movienews` VALUES (10,'\"โบว์ เมลดา - นัท มีเรีย\" นำทีมคนดังอวดโฉมบนรันเวย์ เปิดตัว \"Disney\'s Snow White\"','“โบว์ เมลดา - นัท มีเรีย” นำทีมคนดังร่วมเดินแบบบนรันเวย์สุดอลังการใน Thailand Gala Premiere ภาพยนตร์ “Disney’s Snow White สโนว์ไวท์” ตื่นตากับแฟชั่นโชว์จาก “POEM” พร้อมเผยเบื้องหลังการทำงานสุดเอ็กซ์คลูซีฟ ก่อนฉายจริง 20 มีนาคมนี้ ในโรงภาพยนตร์ทั่วประเทศ ','uploads\\movieNews\\1742384104173.jpg'),(11,'\"ธี่หยด 3\" ปล่อยโปสเตอร์ \"พี่ยักษ์-น้องยี่\" นำทีมประจันหน้าผีร้าย','-','uploads\\movieNews\\1752739698168.webp');
/*!40000 ALTER TABLE `movienews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` longtext,
  `Atcinema` varchar(10) DEFAULT NULL,
  `posterimagePath` varchar(255) DEFAULT NULL,
  `backgroundimagePath` json DEFAULT NULL,
  `age` text,
  `lang` json DEFAULT NULL,
  `trailerUrl` text,
  `rank` int DEFAULT NULL,
  `engTitle` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (8,'ธี่หยด','2024-02-20','<span class=\'highlight\'>ธี่หยด 2</span> เป็นเรื่องราว 3 ปีหลังการตายของ <span class=\'highlight\'>\'แย้ม\' (รัตนวดี วงศ์ทอง)</span> แม้คนในครอบครัวจะพยายามเกลี้ยกล่อมให้<span class=\'highlight\'> \'ยักษ์\' (ณเดชน์ คูกิมิยะ)</span> เลิกตามแก้แค้นผีชุดดําเพียงใด แต่ยักษ์ก็ยังคงดื้อดึงที่จะตามล่ามันให้ได้ ด้วยกลัวว่าผีชุดดำจะกลับมาจัดการกับคนในครอบครัวที่เหลือของเขา ซึ่งยักษ์แกะรอยจนพบเบาะแสว่าผีชุดดำถูกเลี้ยงโดยหมอผีจอมขมังเวทย์ชื่อ<span class=\'highlight\'> ‘ตาพวง’</span> ที่อพยพหนีไปกบดานใน<span class=\'highlight\'> ‘ดงโขมด’ </span>ซึ่งเต็มไปด้วยอาถรรพ์เร้นลับ ยักษ์ต้องเผชิญหน้ากับผีร้ายและอันตรายรอบตัว\r\n\r\nขณะเดียวกัน <span class=\'highlight\'>‘หยาด’ (เดนิส เจลีลชา คัปปุน) </span>กำลังจะแต่งงานกับ<span class=\'highlight\'> ‘ประดิษฐ์’ (พีรวิชญ์ อรรถชิตสถาพร)</span> ทางครอบครัวกำลังเตรียมจัดงานแต่งให้ทั้งคู่ และหวังว่ายักษ์จะกลับมาร่วมพิธีมงคลสมรสอย่างพร้อมหน้าพร้อมตา โดยที่ไม่รู้เลยว่า ผีชุดดำกำลังจะกลับมาทำให้ครอบครัวของยักษ์ต้องเผชิญหน้ากับความสยองอีกครั้ง','0','uploads\\movies\\1743385761060.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743395498477.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743395498485.jpeg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743395498487.jpeg\\\"]\"','6+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/lxERvQebCww?si=OsHWjAcgr0OZOM7R',1,'Death Whisperer'),(9,'หลวงพี่เท่ง','2025-02-28','ตลอดระยะเวลาที่หลวงพี่เท่งออกเดินทางไปแสวงบุญที่ทิเบต บัดนี้ได้เวลาแล้วที่หลวงพี่เท่งตัวจริงเสียงจริงที่เคยสร้างปรากฏการณ์เมื่อเกือบ 19 ปีก่อน จะ Comeback กลับมาเพื่อได้เจอกับทุก ๆ คนอีกครั้ง... เมื่อวัดใกล้บ้านเกิดของหลวงพี่เท่งมีปัญหา ทำให้หลวงพี่เท่งต้องจากความสงบสุขที่เคยมีเป็นเหมือนเซฟโซนตอนอยู่ที่ทิเบตกลับมาเพื่อแก้ปัญหานั้น','0','uploads\\movies\\1740804482009.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743643865244.png\\\"]\"','6+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/LscEXhGcEAo?si=VZtotdSTq4555eiW',NULL,'Comeback'),(10,'Avatar: The Way of Water','2022-12-16','ผ่านไปกว่า 10 ปี จากเหตุการณ์ในภาพยนตร์ภาคแรก “อวตาร: วิถีแห่งสายน้ำ” เริ่มต้นด้วยการเล่าเรื่องราวของครอบครัวซัลลี่ (เจค เนย์ทีรี่ และลูก ๆ ของพวกเขา) และปัญหาที่พวกเขาต้องเผชิญ ทั้งการพยายามอย่างหนักเพื่อปกป้องสมาชิกในครอบครัว การต่อสู้เอาชีวิตรอด และโศกนาฏกรรมที่พวกเขาต้องพบเจอ','0','uploads\\movies\\1740804880404.jpeg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1740731067176.webp\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1740731067189.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1740731067206.jpeg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/d9MyW72ELq0?si=MAJT4xz6i6K8uoe_',3,NULL),(11,'แฟนกันวันเดียว','2025-03-12','\" <span class=\'highlight\'>เด่นชัย\' (เต๋อ-ฉันทวิชช์ ธนะเสวี) </span>เจ้าหน้าที่ไอทีสุดเนิร์ดประจำออฟฟิศ วัย 30 ผู้จะมีตัวตนในสายตาพนักงานคนอื่นแค่เวลาอุปกรณ์คอมพิวเตอร์เสีย ในชั่วโมงทำงานที่แสนเร่งรีบไม่มีใครสนใจแม้แต่จะจำชื่อของเด่นชัยจาเขาแอบน้อยใจอยู่บ่อยๆ จนกระทั่งวันที่เขาได้ไปซ่อมปรินเตอร์\r\n     ให้ <span class=\'highlight\'>\'นุ้ย\' (มิว-นิษฐา จิรยั่งยืน) </span>มาร์เก็ตติ้งสาวคนสวยผู้จดจำชื่อจริงของเขาได้เด่นชัยตกหลุมรักความน่ารักและจริงใจของนุ้ยที่ทำให้เขารู้สึกเหมือน\r\n มีตัวตนขึ้นมา แต่ก็ทำได้เพียงเฝ้าเก็บรายละเอียดและดูแลเธออยู่ห่างๆ เพราะรู้ดีว่าหมาอย่างเขาคงได้แค่แหงนมองเครื่องบิน แต่แล้ว เมื่อบริษัทของเด่นชัยพาพนักงานไปเที่ยวเอาท์ติ้งยังสกีรีสอร์ทที่ฮอกไกโด เด่นชัยได้ขอพรกับระฆังแห่งความรักของรีสอร์ทให้เขาได้เป็นแฟนกับนุ้ย\r\n แค่วันเดียวก็ยังดี โชคชะตาเล่นตลกเมื่อนุ้ยประสบอุบัติเหตุจากสกีจนหมดสติ พอนุ้ยฟื้นก็กลับมีอาการโรคความจำเสื่อมชั่วคราว ที่เรียกกันว่าโรค TGA ซึ่งเป็นโรคความจำเสื่อมที่จะมีอาการอยู่แค่เพียง 1 วันเท่านั้น\r\n เด่นชัยคิดว่านี่เป็นโฮกาสเดียวที่คนอย่างเขาจะได้ใกล้ชิดกับนุ้ย เขาตัดสินใจสวมรอยหลอกนุ้ยว่าทั้งสองเป็นแฟนกันและอยู่เที่ยวต่อกันเพียงสองคน เด่นชัยตั้งใจว่าจะพานุ้ยไปเที่ยวในทุกๆที่ ที่เธออยากไปในฮอกไกโด ใช้เวลาสุดพิเศษของเขากับเธอในฐานะแฟน แม้ว่ามันจะ <span class=\'highlight\'>เป็นการเป็นแฟนกันเพียงวันเดียว</span> ก็ตาม \"','0','uploads\\movies\\1740802634660.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1740802634661.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1740802634663.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1740802634664.jpg\\\"]\"','6+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/OPp2CoLdXcc?si=2JaI76OZFM6QwLq8',5,NULL),(12,'ฉลาดเกมส์โกง','2017-05-03','ขอต้อนรับทุกคนเข้าสู่ “ธุรกิจกลางสนามสอบ” ของ \'ลิน\' (ชุติมณฑน์ จึงเจริญสุขยิ่ง) นักเรียนทุนเจ้าของเกรดเฉลี่ย 4.00 ทุกปีการศึกษา ธุรกิจที่มีจุดเริ่มต้นจากการช่วยเพื่อนสนิทอย่าง \'เกรซ\' (อิษยา ฮอสุวรรณ) เด็กกิจกรรมตัวยงแต่ผลการเรียนย่ำแย่ และ \'พัฒน์\' (ธีรดนย์ ศุภพันธุ์ภิญโญ) เด็กบ้านรวยที่คิดว่าเงินซื้อได้ทุกอย่าง ด้วยการแชร์คำตอบกลางห้องสอบ จนกลายเป็นวงการลอกขนาดใหญ่ ที่นักเรียนหลายคนในโรงเรียนยินดีจ่ายค่าตอบแทนแบบสูงลิบ แลกกับการได้รับคำตอบจากอัจฉริยะอย่างลิน\r\n\r\nเงินในบัญชีของลินเพิ่มขึ้นเรื่อยๆจากธุรกิจการโกงสอบในโรงเรียน จากหลักหมื่นเป็นหลักแสน จนวันหนึ่ง ลินก็มีโอกาสที่จะอัพเงินในบัญชีให้แตะหลักล้าน เมื่อพัฒน์และเกรซยื่นข้อเสนอสุดท้าทายให้เธอ นั่นคือ การโกงสอบ STIC ซึ่งเป็นการสอบเพื่อใช้คะแนนยื่นเข้ามหาวิทยาลัยชั้นนำระดับโลก ที่นักเรียนทุกประเทศต้องสอบในเวลาเดียวกัน โอกาสในการลอกให้รอดเท่ากับศูนย์ แต่ลินก็ยอมเสี่ยงเพื่อแลกกับเงินล้าน ด้วยการบินไปสอบในประเทศที่เวลาเร็วกว่าเมืองไทย เพื่อที่จะได้เห็นข้อสอบก่อน และส่งคำตอบกลับมาให้ลูกค้าในเมืองไทย ปัญหาเดียวก็คือ เธอต้องการคนฉลาดอีกหนึ่งคนมาช่วยให้ภารกิจการโกงครั้งนี้สำเร็จ และคนๆนั้นก็คือ \'แบงค์\' (ชานน สันตินธรกุล) นักเรียนทุนคู่แข่งของเธอ ผู้เกลียดการโกงเป็นชีวิตจิตใจ ลินจะทำอย่างไรให้แบงค์ตกลงร่วมมือกับเธอ และเกมส์โกงข้ามโลกนี้จะจบลงอย่างไร...','0','uploads\\movies\\1741167595076.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1741250773214.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1741250773223.webp\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1741250773224.jpg\\\"]\"','6+','\"\\\"TH\\\"\"','https://www.youtube.com/embed/JcUf9ANCpNY?si=YcAL6hn_y7d20ZQl',NULL,NULL),(13,'GELBOYS สถานะกั๊กใจ','2025-02-08','เรื่องราวเริ่มต้นขึ้นเมื่อ <span class=highlight>โฟร์มด (นิว ชยภัค)</span> หนุ่มมัธยมปลายที่โหยหาสถานะในความรัก ต้องหวั่นไหวเพราะ <span class=highlight>เชียร (ไปป์ มนธภูมิ) </span>หนุ่มเจ้าเสน่ห์ที่ใช้ \"เล็บเจล\" เป็นไม้เด็ดในการอ้อย ชวนไปทำเล็บที่สยามสแควร์ซ้ำแล้วซ้ำเล่า จนโฟร์มดเผลอใจให้โดยไม่รู้ตัว\r\n          แต่เรื่องกลับไม่ง่ายอย่างที่คิด เมื่อเขาพบว่าไม่ได้มีแค่ตัวเองที่ถูกเชียรชวนไปทำเล็บ เพราะ<span class=highlight> บัว (เลออน เซ็ค) </span>หนุ่มลูกครึ่ง TikToker ก็ได้รับคำเชิญเดียวกัน ! งานนี้หัวใจเริ่มสั่นคลอน <span class=highlight>เพราะเมื่อถูกกั๊ก...ก็ต้องกั๊กกลับ !</span>','0','uploads\\movies\\1741694845708.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1741695189272.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1741695189285.jpg\\\"]\"','18+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/AYscHqTby3U?si=wUorS8I_6JOs0Sv7',4,NULL),(14,'แฮร์รี่พอตเตอร์ 7.2','2011-07-07','เนื้อเรื่องของภาค 2 จะดำเนินเรื่องต่อจากภาคที่ 1 หลังจากที่พวกแฮร์รี่ออกเดินทางตามหาฮอร์ครักซ์ชิ้นส่วนวิญญาณของโวลเดอมอร์ที่มีทั้งหมด 7 ชิ้น และสามารถค้นพบและทำลายลงได้ โดยยังเหลือฮอร์ครักซ์ที่ยังไม่ถูกทำลายอยู่ 4 ชิ้น แต่สุดท้ายพวกแฮร์รี่กลับถูกผู้เสพความตายจับแต่ก็สามารถเอาหนีรอดมาได้ โดยการสละชีวิตของด๊อบบี้ แฮร์รี่ล่วงรู้ถึงนัยยะสำคัญเกี่ยวกับฮอร์ครักซ์อีกชิ้นหนึ่งที่เขาคาดว่าถูกซ่อนไว้ในธนาคารกริงกอตส์ ธนาคารที่มีด่านป้องกันแน่นหนาที่สุด พวกแฮร์รี่จึงวางแผนบุกเข้าไปเพื่อขโมยฮอร์ครักซ์ ในขณะเดียวกันโวลเดอมอร์ล่วงรู้ว่าพวกแฮร์รี่กำลังตามล่าหาฮอร์ครักซ์อยู่จึงยกกองทัพเหล่าผู้เสพความตายเข้าปิดล้อมฮอกวอตส์ ที่ที่เขาซ่อนฮอร์ครักซ์อีกชิ้นไว้ เพื่อดักรอแฮร์รี่ และครั้งนี้ไม่มีทางที่แฮร์รี่จะถอยอีกต่อไป เขาเลือกที่จะเผชิญหน้ากับโวลเดอมอร์ พร้อมด้วยกองทัพแห่งฮอกวอตส์และเหล่าผู้เสพความตาย ศึกครั้งนี้จึงเป็นศึกสุดท้ายที่มีโลกเวทมนตร์และโลกมนุษย์เป็นเดิมพัน','0','uploads\\movies\\1741695896942.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1741695896966.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1741695896984.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1741695896992.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/17ywQS6XO-M?si=qGeQtivr6IC_5xZU',2,NULL),(15,'FLOW','2024-02-06','เรื่องราวของ Flow เกิดขึ้นในโลกที่ไม่ปรากฏวี่แววของมนุษย์ตัวเป็น ๆ หากแต่ยังหลงเหลือร่องรอยอารยธรรมเป็นสิ่งก่อสร้าง อนุสาวรีย์ และข้าวของเครื่องใช้ที่อยู่ในสภาพสมบูรณ์ ชวนให้สงสัยว่า สัตว์ประเสริฐในเรื่องเพียงแค่ไม่ถูกผู้สร้างกล่าวถึง หรือสูญสิ้นเผ่าพันธุ์ไปแล้วด้วยเหตุผลปริศนากันแน่\r\n \r\n\r\nตัวละครหลักคือ แมวดำไร้ชื่อผู้ลักลอบอาศัยอยู่ในบ้านกลางป่า มันต้องเอาชีวิตรอดจากนักล่าและออกหาอาหารตามวิถีธรรมชาติ แต่แล้ววันหนึ่ง กลับเกิดน้ำท่วมระดับวิกฤตการณ์ กลืนกินผืนป่าและภูเขา เจ้าแมวต้องกระเสือกกระสนหนีตาย จับพลัดจับผลูได้ขึ้นไปบนเรือที่ลอยมาตามน้ำ...ล่องลอยไปเรื่อย ๆ อย่างไร้จุดหมาย เพราะทุกตารางนิ้วของพื้นโลกได้กลายสภาพเป็นมหาสมุทรอันกว้างใหญ่ ','0','uploads\\movies\\1743552820281.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743552820282.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743552820300.jpg\\\"]\"','3+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/2-7Z4CefOGk?si=lASAERLHZeV2xcIv',NULL,'มีเหมียว มีกัน วันน้ำท่วมโลก'),(16,'เมย์ ไหน','2025-04-03','test','0','uploads\\movies\\1743644177041.webp','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743644177061.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743644177083.webp\\\"]\"','13+','\"\\\"TH\\\"\"','https://www.youtube.com/embed/BWmHi_1yaPE?si=-hb-10LgRxA4d30F',NULL,'ไฟแรงเฟร่อ'),(17,'ทรานส์ฟอร์เมอร์ส : กำเนิดจักรกลอสูร','2024-07-18','การกลับมาของภาพยนตร์แอ็คชั่นสุดอลังที่ครองใจผู้ชมภาพยนตร์ทั่วโลกกับภาพยนตร์เรื่อง Transformers: Rise of the Beasts ทรานส์ฟอร์เมอร์ส : กำเนิดจักรกลอสูร จะพาผู้ชมตื่นตาตื่นใจกลับไปในการผจญภัยรอบโลกในยุคทศวรรษ 90 กับเหล่าออโตบ็อตส์ และขอแนะนำสายเลือดใหม่ของทรานส์ฟอร์เมอร์ส “แม็กซิมัลส์” ในการต่อสู้บนโลกระหว่างออโตบ็อตส์และดีเซ็ปติคอนส์ ','0','uploads\\movies\\1743644544305.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743644544311.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743644544326.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/itnqEauWQZM?si=6YlExonP-FcChIo3',NULL,'Transformers: Rise of the Beasts'),(18,'The Stone','2025-04-03','เมื่อ <span class=\"highlight\">“เอก” (เจ้านาย-จินเจษฎ์ วรรธนะสิน)</span>ต้องการเงินไปรักษาพ่อที่ป่วยหนัก เขาเอาพระเครื่องของพ่อไปประเมินราคากับเซียนพระชื่อดัง <span class=\"highlight\">“เซ้งพาราไดซ์” จ๋าย-อิชณน์กร พึ่งเกียรติรัศมี </span>เอกได้เจอกับ <span class=\"highlight\">“เซียนหมวย” อ๊ะอาย-กรณิศ เล้าสุบินประเสริฐ </span>เซียนพระสุดฮ็อตที่เข้ามาแนะนำให้ส่งพระเข้าประกวด แต่กลายเป็นว่าพระที่อยู่ในมือของเอก คือ<span class=\"highlight\"> “พระสมเด็จ” </span>ของแท้ชื่อดังในตำนานที่หายไปจากวงการกว่า 30 ปี ซึ่งอาจมีราคาสูงถึงหลักร้อยล้าน และเป็นที่จับจ้องของคนเล่นพระทั้งวงการรวมถึง <span class=\"highlight\">“พ่อสุนทร” ตู่-นพพล โกมารชุน  </span>เซียนพระผู้ทรงอิทธิพล พ่วงมาด้วยบุคคลปริศนาอย่าง<span class=\"highlight\"> “วิคเตอร์”  ฮิวโก้-จุลจักร จักรพงษ์ </span>พลิกชีวิตของคนที่ไม่เคยสนใจพระเครื่อง เข้าสู่เดิมพันอันตรายของเหล่าเซียนที่พร้อมใช้ทุกเล่ห์เหลี่ยมกลโกงแย่งชิง <span class=\"highlight\">“พระแท้”</span> มาครอบครอง','1','uploads\\movies\\1743830777762.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743830777764.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743830777767.webp\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/Dj7YtHmtwh0?si=Qdw191GGoZX83JYM',NULL,'พระแท้ คนเก๊'),(19,' ไมน์คราฟต์ มูฟวี่','2025-04-04','คนแปลกหน้า 4 คนพบว่าตัวเองปัญหาธรรมดา ๆ ที่กำลังเผชิญหน้าอยู่กลับกลายมาเป็นเรื่องใหญ่ เมื่อพวกเขาถูกดึงผ่านประตูมิติอันลึกลับไปยังโลกโอเวอร์เวิลด์ ดินแดนสุดมหัศจรรย์ที่เต็มไปด้วยจินตนาการและรูปลักษณ์เป็นเหลี่ยมมุม และเพื่อที่จะเดินทางกลับบ้าน พวกเขาต้องเรียนรู้ที่จะเชี่ยวชาญการใช้ชีวิตในโลกใบนี้ พร้อมกับออกผจญภัยในภารกิจแสนมหัศจรรย์ โดยมี คราฟเตอร์ ผู้เชี่ยวชาญและคาดไม่ถึงอย่าง สตีฟ คอยช่วยเหลือ','0','uploads\\movies\\1743986451329.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1743986451368.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1743986451370.jpg\\\"]\"','3+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/8B1EtVPBSMw?si=XY2gO19HYqUgEgpv',NULL,'A Minecraft Movie'),(20,'อภินิหารตำนานแห่งนาร์เนีย','2025-04-07','เอ็ดมันด์ และลูซี่ พรีเวนซี่ พร้อมกับยูซตาสลูกพี่ลูกน้องของพวกเขาถูกดูดกลืนเข้าไปยังภาพวาด ถูกส่งกลับไปยังนาร์เนียและเรือดอว์น เทรดเดอร์อันงดงาม พวกเขาร่วมมือกับกษัตริย์แคสเปี้ยนและหนูนักรบผู้มีนามว่ารีพิชีป เพื่อภารกิจที่กุมชะตาแห่งนาร์เนียเอาไว้ เหล่านักเดินทางผู้กล้าผ่านพ้นสิ่งล่อตาล่อใจอันยิ่งใหญ่ เมื่อพวกเขาเดินทางไปยังเกาะลึกลับต่างๆ มีการเผชิญหน้าอย่างเอาเป็นเอาตายกับสิ่งมีชีวิตแห่งเวทมนตร์ และเหล่าศัตรูผู้ชั่วร้าย รวมไปถึงการกลับมารวมตัวกับเพื่อนและผู้คุ้มกันของพวกเขาอย่าง “ราชสีห์ผู้ยิ่งใหญ่” อัสลาน','0','uploads\\movies\\1744018319812.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744018319813.webp\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744018319818.jpg\\\"]\"','6+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/9Q0Da4jlxBk?si=aIXBeUA_b0JRKdgo',NULL,'ตอน ผจญภัยโพ้นทะเล'),(21,'เดอะไวท์โลตัส 3','2025-02-17','เรื่องย่อ The White Lotus Season 3 มีเนื้อหาเกี่ยวกับเรื่องราวของกลุ่มเศรษฐีที่ไปพักผ่อน ณ รีสอร์ทหรูที่ประเทศไทย (ถ่ายทำที่เกาะสมุย, ภูเก็ต และเชียงใหม่) โดยจะมีนักแสดงไทยร่วมแสดงด้วยหลายคน หนึ่งในนั้นคือ \"ลิซ่า-ลลิษา มโนบาล\" รับบทเป็น \"มุก\" พนักงานโรงแรมสาวที่มีบุคลิกสดใสร่าเริง คอยต้อนรับและให้ความช่วยเหลือแขกที่มาพักผ่อนภายในรีสอร์ทอยู่เสมอ\r\n\r\nขณะเดียวกันในซีซั่นนี้ก็จะมีแขกหลายกลุ่มที่เดินทางมา ทั้งคู่สามีภรรยาที่มีความแตกต่างกัน กลุ่มเพื่อนสาวที่ดูเหมือนจะสนิทกันมานาน แต่จริงๆ แล้วกลับซ่อนมิตรภาพจอมปลอมไว้ข้างใน รวมถึงกลุ่มครอบครัวที่มีสมาชิก 5 คน ซึ่งล้วนมีเรื่องราววุ่นๆ ให้ติดตามกันใน The White Lotus ซีซั่น 3','1','uploads\\movies\\1744019637759.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744019637778.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744019637798.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/XwQRkOK5KC4?si=iLTE9m5-_8jRowgi',NULL,'The White Lotus 3'),(22,'ซองแดงแต่งผี','2025-03-20','\" ซองแดงแต่งผี เรื่องราวการแต่งงานสุดพิลึกพิลั่นระหว่างคนกับผี ที่ป่วนที่สุดในสองโลก!เมื่อ <span class=\"highlight\">‘เม่น’ (บิวกิ้น พุฒิพงศ์) </span>โจรกระจอกที่ผันตัวมาเป็นสายตำรวจ เผลอไปหยิบซองแดงปริศนา และพบว่ามันคือพิธีกรรมความเชื่อเก่าแก่ที่ทำให้เขาต้องแต่งงานกับศพ ไม่เช่นนั้นเขาจะซวยไปตลอดชีวิต แต่ที่ทำให้ชายแท้อย่างเม่นต้องเหวอสุดขีดก็คือ ศพที่เขาต้องแต่งด้วยดันเป็นผู้ชายด้วยกัน! และนั่นทำให้เขาได้เจอกับ  <span class=\"highlight\">‘ตี่ตี๋’ (พีพี กฤษฏ์) </span> วิญญาณเกย์หนุ่มสุดคิวท์ ที่ยังไม่ยอมไปเกิดเพราะยังมีเรื่องค้างคาใจ เม่นต้องช่วยตามสืบอุบัติเหตุที่คร่าชีวิตตี่ตี๋ โดยหวังจะทำให้ตี่ตี๋ไปสู่สุคติและออกไปจากชีวิตเขาซะที\r\n\r\nยิ่งไปกว่านั้น เบาะแสทั้งหมดที่เม่นพบกลับกลายเป็นว่านี่อาจไม่ใช่อุบัติเหตุธรรมดา แต่มันโยงใยไปสู่แก๊งค้ายาที่เขา และ  <span class=\"highlight\">‘เจ๊ก๊อย’ (ก้อย อรัชพร) </span>ตำรวจสาวรุ่นพี่ที่เม่นแอบชอบกำลังตามสืบอยู่ด้วย งานนี้ เม่นจึงหวังจะปิดคดีเพื่อที่เขาจะได้ทั้งหน้าที่การงาน ความรัก และช่วยให้ตี่ตี๋ไปเกิดเสียที \"','1','uploads\\movies\\1744166579206.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744166579218.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744166579248.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744166579312.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://youtu.be/zmsN3WVXqrU?si=dXO2wuUyeVbsS-W_',NULL,'The Red Envelope (2025)'),(23,'สโนว์ไวท์','2025-03-20','เรื่องราวที่เปี่ยมล้นไปด้วยจินตนาการอันล้ำเลิศ เมื่อ สโนว์ไวท์ เจ้าหญิงผู้เลอโฉมจิตใจงดงามได้ร่วมมือกับเหล่าคนแคระทั้ง 7 เพื่อทำการต่อกรและต่อต้านราชินีผู้ชั่วร้าย และยังเป็นแม่เลี้ยงที่ใจอำมหิตของเธอ เพื่อปลดแอดอาณาจักรให้กลับมาเรืองรองอีกครา นี่คือภาพยนตร์ฉบับไลฟ์แอคชั่นที่ดัดแปลงมาจากแอนิเมชั่นในปี 1937 ของดิสนีย์ ในชื่อ \"สโนวไวท์และคนแคระทั้งเจ็ด\"','1','uploads\\movies\\1744167321416.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744167321441.jpeg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744167321469.jpeg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744167321474.jpeg\\\"]\"','6+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/iV46TJKL8cU?si=oWQX4wBSrK6EwoUa',NULL,'Snow White'),(24,'นาจา 2','2025-03-13','หลังจากรับอสนีบาต แม้นาจากับอ๋าวปิ่งจะรอดมาได้ด้วยการกลายเป็นวิญญาณ แต่ในไม่ช้าพวกเขาก็จะต้องสลายหายไป ไท่หยี่จึงวางแผนที่จะสร้างร่างของนาจาและอ๋าวปิ่งขึ้นมาใหม่ด้วยดอกบัววิเศษเจ็ดสี ทว่าระหว่างการสร้างร่างก็ได้เกิดอุปสรรคขึ้นมากมาย มาลุ้นกันว่าชะตากรรมของนาจาและอ๋าวปิ่งจะเป็นอย่างไรต่อไป','1','uploads\\movies\\1744168033949.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744168303205.jpg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744168303211.jpeg\\\",\\\"uploads\\\\\\\\movies\\\\\\\\1744168303247.jpeg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/GIaLnv0HVm8?si=eOolmULdD1H2Zk8O',NULL,'Na zha 2'),(25,'ยอดนักสืบจิ๋วโคนัน','2025-04-24','สารวัตรยามาโตะ คันซึเกะ แห่งกรมตำรวจจังหวัดนากาโนะ ได้รับบาดเจ็บที่ตาซ้ายจากกระสุนไรเฟิลของชายปริศนาระหว่างการไล่ล่าบนภูเขาหิมะ ทำให้เขาสูญเสียการมองเห็นที่ตาข้างนั้นไป สิบเดือนต่อมา ขณะสอบสวนเหตุการณ์ใหม่ อุเอฮาระ ยูอิ ได้พบกับยามาโตะซึ่งยังมีชีวิตอยู่ และด้วยเหตุผลบางอย่าง ยามาโตะก็รู้สึกปวดตาซ้ายอย่างรุนแรง ขณะเดียวกัน โมริ โคโกโร่ ได้รับโทรศัพท์จากอดีตเพื่อนร่วมงานเกี่ยวกับคดีหิมะถล่มที่ยามาโตะเคยเกี่ยวข้อง ทั้งโคโกโร่ และโคนัน จึงไปยังสถานที่นัดหมาย ทันใดนั้นเองเสียงปืนปริศนาก็เกิดดังขึ้น!\r\n\r\nเรื่องราวปริศนาที่เกิดขึ้นบนภูเขาหิมะในจังหวัดนากาโนะกำลังจะเริ่มต้นขึ้นแล้ว!','1','uploads\\movies\\1744168782992.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744168783002.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/ilOOHweVawI?si=fBlA5zLIdZfWvy3c',NULL,'ปริศนาภาพติดตามรณะ'),(26,'ฮาลาบาลา','2025-04-03','ติดตามเรื่องราวของ สารวัตรแดน (เต๋อ ฉันทวิชช์) ตำรวจมือปราบฉายา ‘แดนร้อยศพ’ ได้รับโอกาสกอบกู้ชื่อเสียง เพื่อแลกกับการกลับไปประจำการที่กรุงเทพฯ แต่ภารกิจนี้อาจหมายถึงการเดินเข้าสู่ขุมนรก เมื่อเขาต้องตามล่า ตั๊บตาไฟ (ปู แบล็คเฮด) หัวหน้าแก๊งวิปริตที่หนีออกจากเรือนจำ และหายตัวไปในป่า ‘ฮาลาบาลา’ ดินแดนต้องห้ามที่ไม่มีใครกล้ากลํ้ากราย ภายใต้เงามืดของป่ามรณะ ตำนานกระซิบถึง ‘บาเตาะ’ เผ่ากินคนโบราณที่ถูกลืมเลือน หรือบางที…พวกมันก็ไม่เคยจากไปไหน แดนต้องเลือกระหว่างหน้าที่กับชีวิตของ ‘วิ’ (ณิชา ณัฏฐณิชา) ภรรยาท้องแก่ผู้หวาดหวั่นต่อบ้านกลางป่าหลังใหม่ ที่อาจไม่ใช่เพียงพวกเขาสองคนที่อาศัยอยู่ที่นั่น เพราะบางสิ่งกำลังเฝ้ามอง และมันพร้อมจะ ‘กลืนกิน’','1','uploads\\movies\\1744169221644.jpg','\"[\\\"uploads\\\\\\\\movies\\\\\\\\1744169221650.jpg\\\"]\"','13+','\"\\\"TH,EN\\\"\"','https://www.youtube.com/embed/Mg1DlO_o_v8?si=qWrZU452AXgEjbzu',NULL,'ป่าจิตหลุด');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_items`
--

DROP TABLE IF EXISTS `playlist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_items` (
  `MovieId` int NOT NULL,
  `PlaylistId` int NOT NULL,
  PRIMARY KEY (`MovieId`,`PlaylistId`),
  KEY `PlaylistId` (`PlaylistId`),
  CONSTRAINT `playlist_items_ibfk_1` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_items_ibfk_2` FOREIGN KEY (`PlaylistId`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_items`
--

LOCK TABLES `playlist_items` WRITE;
/*!40000 ALTER TABLE `playlist_items` DISABLE KEYS */;
INSERT INTO `playlist_items` VALUES (8,1),(9,1),(10,1),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(8,3),(9,3),(10,3),(11,3),(12,3),(13,3),(10,5),(18,5),(19,5),(20,5),(21,5),(22,5),(23,5),(25,5),(26,5),(23,7),(24,7),(25,7),(26,7);
/*!40000 ALTER TABLE `playlist_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlistName` varchar(255) NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'Test01',18),(2,'Test02-resetform',18),(3,'Test03-notification',18),(5,'Test-getplaylist2',25),(7,'Test02',25);
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `MovieId` int NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`MovieId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `searches_ibfk_1` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `searches_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `GenreId` int NOT NULL,
  `MovieId` int NOT NULL,
  PRIMARY KEY (`GenreId`,`MovieId`),
  KEY `MovieId` (`MovieId`),
  CONSTRAINT `types_ibfk_1` FOREIGN KEY (`GenreId`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `types_ibfk_2` FOREIGN KEY (`MovieId`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,8),(6,8),(3,9),(2,15),(5,15),(3,16),(5,16),(1,17),(5,17),(4,18),(7,18),(1,19),(2,19),(1,20),(5,20),(3,21),(4,21),(7,21),(3,22),(5,22),(6,22),(7,22),(2,23),(5,23),(1,24),(2,24),(5,24),(1,25),(7,25),(6,26);
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `tel` varchar(15) NOT NULL,
  `age` int DEFAULT NULL,
  `userimagePath` varchar(255) DEFAULT NULL,
  `userBackgroundImagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'JamesBunma','Bpatipongsakorn Bunma','user','bunma93@gmail.com','$2a$12$dZV48znbIdgI5wsOLqlyZeHqR7hlTyQKZmEVKMvtoXP3ZKD/q6QTu','0624980056',24,'uploads\\1735024134280.jpg',NULL),(6,'James','Bpatipongsakorn Bunma','user','bunma3@gmail.com','$2a$12$6j3ogv2IOKnMh7dEUXRPdOUannuACl7BEU2Rk4EZNSKsDa/NujLoi','0624980056',24,'uploads\\1735024209140.jpg',NULL),(7,'JamesKubb','Bpatipongsakorn Bunma','user','jamesmars07@gmail.com','$2a$12$mM/kCmhIhVMr1tKypqvZxeMw3PEzLRIICrdUaBXL987HiMCmMPePu','0624980056',24,'uploads\\1735024713654.jpg',NULL),(8,'ffffffff','Bpatipongsakorn Bunma','user','bunma9ff3@gmail.com','$2a$12$Et4YZ/NYxtRjHlfYr49lg.cwlpzwrBNngEPih4RscEh4Ssynep77C','0624980056',24,'uploads\\1735708375406.jpg',NULL),(9,'Test01','Bpatipongsakorn Bunma','user','Test01@gmail.com','$2a$12$2NBZQGoEnyHxkk4R6U2Q4uJ8jm1o5Vml1ntTMZOrAz0UrNfRqSVuq','0624980056',24,'uploads\\1735812370513.jpg',NULL),(10,'Test02','Bpatipongsakorn Bunma','user','Test02@gmail.com','$2a$12$sXW.O17fW6AhVzRH4M3tc.gAUzqdVnN3MwN1oFjXxDVCwpIBJv6zS','0624980056',23,'uploads\\1735814650083.jpg',NULL),(11,'Test03','Test Register','user','Test03@gmail.com','$2a$12$wHymyYy1fUfS4qPzdF3zBOu7AMNsaRwqU8NcL/wpnSVbGybltSIdO','0624980056',24,'uploads\\1735974556876.jpg',NULL),(12,'Test04','Bpatipongsakorn Bunma','user','Test04@gmail.com','$2a$12$r5M.wLJZJfmHTPFYuNvdLeul5uyJ7whCWxWTIoh5VeG93vxvQHI/W','0624980056',24,'uploads\\1736076874383.jpg',NULL),(15,'Test05','Bpatipongsakorn Bunma','user','Test05@gmail.com','$2a$12$2RjPn.gi0UfE.ytBnBVSPeM/3.SBBGDf.JHYg.H54hYYE9jC4Rjwu','0624980056',24,NULL,NULL),(16,'Test06','Bpatipongsakorn Bunma','user','Test06@gmail.com','$2a$12$oHZxN6up6kE/XVFp9UiA0eV.a8Nk3irNl1Tlv4QDw7LsjiaeOLWzG','0624980056',24,NULL,NULL),(17,'Test074','Bpatipongsakorn Bunma','user','Test07@gmail.com','$2a$12$c3g3prPn/tZbAfB0HHOFqutJjguRWKFYqpJnj4QY/YWJatqL5UHSC','0624980056',24,'uploads\\1739836773866.jpg',NULL),(18,'Test08','Bpatipongsakorn Bunma','user','Test08@gmail.com','$2a$12$eQsaaC6w32HccpeYBzVQ4esetZf8bj.jGc6kpy7ylQMne/pw4DKXK','0624980056',24,'uploads\\others\\1739945834432.jpg',NULL),(19,'Test09','Bpatipongsakorn Bunma','user','Test09@gmail.com','$2a$12$4hq2gK0hC1MfcSDj/vX/5u/c0uWFGwHypz4BMDec.mVIdgS9SWCYu','0624980056',23,'uploads\\profiles\\1740097986700.jpg',NULL),(20,'Test10','Bpatipongsakorn Bunma','user','Test10@gmail.com','$2a$12$JuLEAVLzGDX7rjpQtWRNd.cLMlaeH1WFxlOlWsRR0MUgyaekwPfge','0624980056',23,'uploads\\profiles\\1740614560354.png',NULL),(25,'Admin','Bpatipongsakorn Bunma','admin','Test-Userbackground@gmail.com','$2a$12$P0dSdy9jYFyZ3JSvtgrpnO9wv1PIExBIdAQfIRcBEJYoaOCQGSpu2','0624980056',24,'uploads\\profiles\\1744364488273.jpg','uploads\\profiles\\1744364488277.jpeg'),(26,'Test-SwitchLogin','Bpatipongsakorn Bunma','user','Test-SwitchLogin@gmail.com','$2a$12$/tbKARy64/uZcGrOgI2NLuGOe7lD.JHWDc6e4yh3rdD/kcntx0Z8G','0624980056',24,'uploads\\profiles\\1744364835124.jpg','uploads\\profiles\\1744364835130.jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 10:16:33
