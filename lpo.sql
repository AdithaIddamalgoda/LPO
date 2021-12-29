-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2021 at 06:30 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lpo`
--

-- --------------------------------------------------------

--
-- Table structure for table `covid_status`
--

CREATE TABLE `covid_status` (
  `covid_status_key` int(1) NOT NULL,
  `covid_status_value` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `covid_status`
--

INSERT INTO `covid_status` (`covid_status_key`, `covid_status_value`) VALUES
(0, 'Pending'),
(1, 'Negative'),
(2, 'Positive');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `permissionID` int(11) NOT NULL,
  `permissionName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `phirequests`
--

CREATE TABLE `phirequests` (
  `phiReqID` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `description` varchar(300) NOT NULL,
  `userID` int(11) NOT NULL,
  `pcr_image` varchar(100) DEFAULT NULL,
  `DateTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `covidRequestStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phirequests`
--

INSERT INTO `phirequests` (`phiReqID`, `status`, `description`, `userID`, `pcr_image`, `DateTime`, `covidRequestStatus`) VALUES
(16, 3, 'nimesh\r\n', 4, NULL, '2021-09-15 08:45:45', 0),
(17, 2, 'asjfoiasjfk', 4, NULL, '2021-09-18 04:35:24', 0),
(18, 3, 'test id', 4, NULL, '2021-09-21 04:45:58', 0),
(19, 3, 'test id 4', 4, NULL, '2021-09-21 04:47:30', 0),
(20, 1, 'test id', 5, NULL, '2021-09-21 04:48:24', 0),
(21, 1, 'new location', 9, NULL, '2021-10-06 03:45:42', 0),
(22, 2, 'gdxdgsd', 4, NULL, '2021-10-09 13:45:09', 0),
(23, 1, 'gdxdgsd', 4, NULL, '2021-10-09 13:54:20', 0),
(24, 3, '6378', 4, NULL, '2021-10-09 13:55:17', 0),
(95, 1, 'dfggdgd', 4, NULL, '2021-10-14 18:51:04', 0),
(96, 1, 'dfggdgd', 4, NULL, '2021-10-14 18:52:40', 0),
(97, 2, 'dasdasd', 4, NULL, '2021-10-14 18:52:47', 0),
(98, 2, '1231234214', 4, NULL, '2021-10-15 04:04:44', 0),
(99, 2, '1231234214', 4, NULL, '2021-10-15 04:12:29', 0),
(100, 2, '1231234214', 4, NULL, '2021-10-15 04:15:35', 0),
(101, 2, 'qew', 4, NULL, '2021-10-15 04:17:19', 0),
(102, 2, 'qew', 4, NULL, '2021-10-15 04:17:36', 0),
(103, 2, '12414', 4, 'IMG_4962.HEIC', '2021-10-15 04:22:51', 0),
(104, 2, '12414', 4, 'IMG_4962.HEIC', '2021-10-15 05:17:18', 0),
(105, 2, 'sdgfadgsg', 4, 'IMG_20210721_120634_1.jpg', '2021-10-15 06:21:52', 0),
(106, 1, 'adfasd', 13, 'WhatsApp Image 2017-12-08 at 9.21.04 PM.jpeg', '2021-10-15 16:04:06', 0);

-- --------------------------------------------------------

--
-- Table structure for table `phitable`
--

CREATE TABLE `phitable` (
  `phiID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `adminBoundaryID` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phitable`
--

INSERT INTO `phitable` (`phiID`, `userID`, `adminBoundaryID`) VALUES
(2, 8, 'LK1303235'),
(3, 6, 'LK5236035');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `category` varchar(20) NOT NULL,
  `message` varchar(500) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleID` int(1) NOT NULL,
  `roleName` varchar(50) NOT NULL,
  `roleDescription` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleID`, `roleName`, `roleDescription`) VALUES
(1, 'Public', 'General Public user, able to request permission from the police and change covid status by requesting from the PHI'),
(2, 'PHI', 'Public Health Official, able to change covid status based on a report from the public user, to pending, positive or negative'),
(3, 'Police', 'Police Officer being able to approve or deny a request made by an individual while also being able to verify the request through scanning barcode '),
(4, 'Admin', 'Admin privileges to CRUD and change roles ');

-- --------------------------------------------------------

--
-- Table structure for table `roletopermission`
--

CREATE TABLE `roletopermission` (
  `roleID` int(1) NOT NULL,
  `permissionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `status`, `image`) VALUES
(1, 1, ''),
(2, 1, ''),
(3, 1, ''),
(4, 1, ''),
(5, 0, ''),
(6, 0, ''),
(7, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` text NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Address1` varchar(100) NOT NULL,
  `Address2` varchar(100) NOT NULL,
  `City` varchar(50) NOT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Province` varchar(50) DEFAULT NULL,
  `Zip` varchar(5) NOT NULL,
  `NicNo` varchar(12) NOT NULL,
  `roleID` int(1) NOT NULL DEFAULT 1,
  `location` point DEFAULT NULL,
  `currentCovidStatus` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `FirstName`, `LastName`, `Email`, `Password`, `Address1`, `Address2`, `City`, `District`, `Province`, `Zip`, `NicNo`, `roleID`, `location`, `currentCovidStatus`) VALUES
(1, 'Aditha', 'Iddamalgoda', 'duliniddamalgoda@gmail.com', '12345', '12345', '12345', 'Panadura', 'Kaluthara', 'Western', '12500', '199921410367', 1, NULL, 0),
(4, 'Dulin', 'Iddamalgoda', 'adithaiddamalgoda@yahoo.com', '$2a$08$oX4lt2eC13B1niIgelHZs.zAjdd/iDLwrEhmt1iOQrjynhcrijEHW', '48/66 Suhada Lane', 'Wekada', 'Panadura', 'volvo', 'volvo', '12500', '12345', 1, 0x00000000010100000006d7dcd17ffa53402e765666a5d41a40, 0),
(5, 'Aditha', 'Iddamalgoda', 'test@email.com', '$2a$08$ChgQ.eHwzyw0tUy.quQmxOO2c.I2Vr0J/0OFXjwo3uElTru7KxNS2', '32 Ivana Drive', 'test', 'Summerstrand', 'Puttalam', 'North Western', '6001', '12500', 4, 0x000000000101000000ed940eea7afa534018d6fd9c4fd81a40, 0),
(6, 'Aditha', 'Iddamalgoda', 'iddamalgoda@yahoo.com', '$2a$08$LCSAycZ/drnrLLadPsWDwOhL2k45Aqe1x2O4eQ.cpRo1eMG5na7Du', '32 Ivana Drive', 'Wekada', 'Summerstrand', 'Jaffna', 'Northern', '6001', '12501', 2, 0x000000000101000000ed940e4688fa5340fdf6d7cc9ed91a40, 0),
(8, 'PHI', 'phi', 'phi@email.com', '$2a$08$5CsGG5xa9rkAqeiFzPA2ve99EWGZqWilhnAJVUwRbeGDa6t9.t.by', '48/66 Suhada Lane', 'Wekada', 'Panadura', 'Kegalle', 'Sabaragamuwa', '12500', '54321', 2, NULL, 0),
(9, 'Thejaka ', 'Iddamalgoda', 'thejakaiddamalgoda@gmail.com', '$2a$08$cpKn/sNMHzfYGaTMsLwSFeUsSfzEYGXYMZVlhllNqmRCZHPR9LtVW', '1234', 'Apartment', 'Panadura', 'Kalutara', 'Western', '12500', '1999123456', 1, 0x0000000001010000009a96b3217cfa5340bb4e857fd8d41a40, 0),
(13, 'Kalpa', 'Kalpa', 'kalpa@email.com', '$2a$08$adR0TMtyBalSujQYi0GdROKPBXWumMreb8Ul8nZrpLia6QaEmS5KG', 'kalpa', 'kalpa', 'kalpa', 'Kalutara', 'Western', '13564', '123415664165', 1, 0x000000000101000000b449b4c23ffa53406e89931274d81a40, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_temp`
--

CREATE TABLE `users_temp` (
  `id` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` text NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Address1` varchar(100) NOT NULL,
  `Address2` varchar(100) NOT NULL,
  `City` varchar(50) NOT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Province` varchar(50) DEFAULT NULL,
  `Zip` varchar(5) NOT NULL,
  `NicNo` varchar(12) NOT NULL,
  `roleID` int(1) NOT NULL DEFAULT 1,
  `location` geometry NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_temp`
--

INSERT INTO `users_temp` (`id`, `FirstName`, `LastName`, `Email`, `Password`, `Address1`, `Address2`, `City`, `District`, `Province`, `Zip`, `NicNo`, `roleID`, `location`) VALUES
(1, 'Aditha', 'Iddamalgoda', 'duliniddamalgoda@gmail.com', '12345', '12345', '12345', 'Panadura', 'Kaluthara', 'Western', '12500', '199921410367', 1, 0x),
(4, 'Dulin', 'Iddamalgoda', 'adithaiddamalgoda@yahoo.com', '$2a$08$oX4lt2eC13B1niIgelHZs.zAjdd/iDLwrEhmt1iOQrjynhcrijEHW', '48/66 Suhada Lane', 'Wekada', 'Panadura', 'volvo', 'volvo', '12500', '12345', 1, 0x0000000001010000008d6d63fdb0d71a402622574513fa5340),
(5, 'Aditha', 'Iddamalgoda', 'test@email.com', '$2a$08$ChgQ.eHwzyw0tUy.quQmxOO2c.I2Vr0J/0OFXjwo3uElTru7KxNS2', '32 Ivana Drive', 'test', 'Summerstrand', 'Puttalam', 'North Western', '6001', '12500', 1, 0x),
(6, 'Aditha', 'Iddamalgoda', 'iddamalgoda@yahoo.com', '$2a$08$LCSAycZ/drnrLLadPsWDwOhL2k45Aqe1x2O4eQ.cpRo1eMG5na7Du', '32 Ivana Drive', 'Wekada', 'Summerstrand', 'Jaffna', 'Northern', '6001', '12500', 1, 0x);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `covid_status`
--
ALTER TABLE `covid_status`
  ADD PRIMARY KEY (`covid_status_key`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`permissionID`);

--
-- Indexes for table `phirequests`
--
ALTER TABLE `phirequests`
  ADD PRIMARY KEY (`phiReqID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `phitable`
--
ALTER TABLE `phitable`
  ADD PRIMARY KEY (`phiID`),
  ADD UNIQUE KEY `adminBoundaryID_2` (`adminBoundaryID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `adminBoundaryID` (`adminBoundaryID`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `roletopermission`
--
ALTER TABLE `roletopermission`
  ADD PRIMARY KEY (`roleID`,`permissionID`),
  ADD KEY `permissionID` (`permissionID`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleID` (`roleID`);

--
-- Indexes for table `users_temp`
--
ALTER TABLE `users_temp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleID` (`roleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phirequests`
--
ALTER TABLE `phirequests`
  MODIFY `phiReqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users_temp`
--
ALTER TABLE `users_temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `phitable`
--
ALTER TABLE `phitable`
  ADD CONSTRAINT `phitable_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `phitable_ibfk_2` FOREIGN KEY (`adminBoundaryID`) REFERENCES `admin_boundary` (`ADM4_PCODE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roletopermission`
--
ALTER TABLE `roletopermission`
  ADD CONSTRAINT `roletopermission_ibfk_1` FOREIGN KEY (`permissionID`) REFERENCES `permission` (`permissionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roletopermission_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `role` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
