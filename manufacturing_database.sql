CREATE DATABASE  IF NOT EXISTS `manufacturing_database` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `manufacturing_database`;
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
  PRIMARY KEY (`MachineID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
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
  `ModelID` int(11) DEFAULT NULL,
  `CustomerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `OModelID_idx` (`ModelID`),
  CONSTRAINT `OModelID` FOREIGN KEY (`ModelID`) REFERENCES `wearablemodel` (`ModelID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part`
--

DROP TABLE IF EXISTS `part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part` (
  `PartID` int(11) NOT NULL,
  `PModelID` int(11) DEFAULT NULL,
  `Condition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PartID`),
  KEY `PModelID_idx` (`PModelID`),
  CONSTRAINT `PModelID` FOREIGN KEY (`PModelID`) REFERENCES `partmodel` (`PModelID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part`
--

LOCK TABLES `part` WRITE;
/*!40000 ALTER TABLE `part` DISABLE KEYS */;
/*!40000 ALTER TABLE `part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partmodel`
--

DROP TABLE IF EXISTS `partmodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partmodel` (
  `PModelID` int(11) NOT NULL,
  `PartName` varchar(45) DEFAULT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `Attribute` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PModelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partmodel`
--

LOCK TABLES `partmodel` WRITE;
/*!40000 ALTER TABLE `partmodel` DISABLE KEYS */;
/*!40000 ALTER TABLE `partmodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wearable`
--

DROP TABLE IF EXISTS `wearable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wearable` (
  `WearableID` int(11) NOT NULL,
  `ModelID` int(11) DEFAULT NULL,
  `Condition` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`WearableID`),
  KEY `ModelID_idx` (`ModelID`),
  CONSTRAINT `ModelID` FOREIGN KEY (`ModelID`) REFERENCES `wearablemodel` (`ModelID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wearable`
--

LOCK TABLES `wearable` WRITE;
/*!40000 ALTER TABLE `wearable` DISABLE KEYS */;
/*!40000 ALTER TABLE `wearable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wearablemodel`
--

DROP TABLE IF EXISTS `wearablemodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wearablemodel` (
  `ModelID` int(11) NOT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ModelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wearablemodel`
--

LOCK TABLES `wearablemodel` WRITE;
/*!40000 ALTER TABLE `wearablemodel` DISABLE KEYS */;
/*!40000 ALTER TABLE `wearablemodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wearablemodelparts`
--

DROP TABLE IF EXISTS `wearablemodelparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wearablemodelparts` (
  `ModelID` int(11) NOT NULL,
  `PModelID` int(11) NOT NULL,
  PRIMARY KEY (`ModelID`,`PModelID`),
  KEY `PModelID_idx` (`PModelID`),
  CONSTRAINT `WModelID` FOREIGN KEY (`ModelID`) REFERENCES `wearablemodel` (`ModelID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `WPModelID` FOREIGN KEY (`PModelID`) REFERENCES `partmodel` (`PModelID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wearablemodelparts`
--

LOCK TABLES `wearablemodelparts` WRITE;
/*!40000 ALTER TABLE `wearablemodelparts` DISABLE KEYS */;
/*!40000 ALTER TABLE `wearablemodelparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wearableparts`
--

DROP TABLE IF EXISTS `wearableparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wearableparts` (
  `WearableID` int(11) NOT NULL,
  `PartID` int(11) NOT NULL,
  PRIMARY KEY (`WearableID`,`PartID`),
  KEY `PartID_idx` (`PartID`),
  CONSTRAINT `PartID` FOREIGN KEY (`PartID`) REFERENCES `part` (`PartID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `WearableID` FOREIGN KEY (`WearableID`) REFERENCES `wearable` (`WearableID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wearableparts`
--

LOCK TABLES `wearableparts` WRITE;
/*!40000 ALTER TABLE `wearableparts` DISABLE KEYS */;
/*!40000 ALTER TABLE `wearableparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'manufacturing_database'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-29 14:04:38
