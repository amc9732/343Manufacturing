-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: manufacturing_database
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cost`
--

DROP TABLE IF EXISTS `cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cost` (
  `MonthNum` int(11) NOT NULL,
  `Purchases` float DEFAULT NULL,
  `Salaries` float DEFAULT NULL,
  `Wages` float DEFAULT NULL,
  `Upkeep` float DEFAULT NULL,
  PRIMARY KEY (`MonthNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cost`
--

LOCK TABLES `cost` WRITE;
/*!40000 ALTER TABLE `cost` DISABLE KEYS */;
INSERT INTO `cost` VALUES (1,562500,75000,0,0);
/*!40000 ALTER TABLE `cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `machine` (
  `MachineID` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `HourlyCost` float DEFAULT NULL,
  `ProductionRate` float DEFAULT NULL,
  `Price` float DEFAULT NULL,
  `Employee` int(11) DEFAULT NULL,
  PRIMARY KEY (`MachineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
INSERT INTO `machine` VALUES (1,'Large Body Press',5,3,25000,2),(2,'Small Body Press',5,3,15000,NULL),(3,'Assembly Station',0,2,500,4),(4,'Chip Installer Robot',1,5,100000,NULL),(5,'LED Installer Robot',1,5,100000,NULL),(6,'Sensor Installer Robot',1,5,100000,NULL),(7,'USB Installer Robot',1,5,20000,NULL),(8,'Comfort Installer Robot',1,5,100000,NULL),(9,'Screen Installer Robot',1,5,100000,1),(10,'Software Installer',2,1,2000,NULL);
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `OrderID` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `ModelID` varchar(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,NULL,100,'WF0010000BB',NULL),(2,NULL,100,'WCB010200GG',NULL),(3,NULL,100,'WHB010101SS',NULL),(4,NULL,200,'WAT010101LS',NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parts` (
  `PModelID` int(11) NOT NULL,
  `Type` varchar(10) DEFAULT NULL,
  `Attribute` varchar(2) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Cost` int(11) DEFAULT NULL,
  `SuggestedQuantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`PModelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (1,'Body','SB',0,'Black Body',NULL,NULL),(2,'Body','SG',0,'Gold Body',NULL,NULL),(3,'Body','SS',0,'Silver Body',NULL,NULL),(4,'Band','B',125,'Black Band',NULL,NULL),(5,'Band','G',125,'Gold Band',NULL,NULL),(6,'Band','S',125,'Silver Band',NULL,NULL),(7,'Band','L',125,'Leather Band',NULL,NULL),(8,'Sensor','01',300,'Biofeedback Sensor',NULL,NULL),(9,'Comfort','01',200,'Heating Coil',NULL,NULL),(10,'Comfort','02',150,'Electric Stimulator',NULL,NULL),(11,'LED','01',400,'LED Light',NULL,NULL),(12,'Screen','B',100,'Basic Screen',NULL,NULL),(13,'Screen','T',400,'High-Resolution Touch Screen',NULL,NULL),(14,'USB','--',500,'USB Port',NULL,NULL),(15,'Chip','--',500,'Computer Chip',NULL,NULL),(16,'Software','F',NULL,'Fashion Watch Software',NULL,NULL),(17,'Software','C',NULL,'Comfort Watch Software',NULL,NULL),(18,'Software','H',NULL,'Heath Watch Software',NULL,NULL),(19,'Software','A',NULL,'Active Watch Software',NULL,NULL);
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process` (
  `PartType` varchar(10) NOT NULL,
  `Machine` int(11) NOT NULL,
  PRIMARY KEY (`PartType`,`Machine`),
  KEY `Machine_idx` (`Machine`),
  CONSTRAINT `Machine` FOREIGN KEY (`Machine`) REFERENCES `machine` (`MachineID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES ('Body',1),('Body',2),('Band',3),('Chip',4),('LED',5),('Sensor',6),('USB',7),('Comfort',8),('Screen',9),('Software',10);
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-01 17:11:43
