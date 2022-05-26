-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 29, 2022 at 09:26 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Groupomania`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `postid` int(11) NOT NULL,
  `comment` varchar(2000) NOT NULL,
  `commentAT` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `liked_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Likes`
--

INSERT INTO `Likes` (`id`, `user_id`, `post_id`, `liked_at`) VALUES
(1, 16, 30, '2022-04-29 22:14:44'),
(2, 16, 29, '2022-04-29 22:21:28'),
(3, 16, 32, '2022-04-29 22:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `text` varchar(3000) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(300) NOT NULL DEFAULT '""',
  `addedBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Posts`
--

INSERT INTO `Posts` (`id`, `text`, `addedAt`, `image`, `addedBy`) VALUES
(22, 'Hi this is the post by user 1', '2022-04-29 16:58:03', '1_AnmQd3T5y_k9M0e0rAfxYQ.jpg', 16),
(23, 'Hi this is a post by user 2', '2022-04-29 16:58:52', '4fbd49549ff54533eb8a2ecd14827e3c--tiger-drawing-tiger-art.jpg', 17),
(24, 'Hi this is a post by user 3', '2022-04-29 16:59:18', '22ijaQk.jpg', 18),
(25, 'Hi this is post by user 4', '2022-04-29 16:59:50', '51.jpg', 19),
(26, 'Hi this is post by user 5', '2022-04-29 17:00:16', '01810d38f5c1947693ede5f7b1ccbbda.jpg', 20),
(27, 'Hi this is post by user 6', '2022-04-29 17:00:37', '2016-Yaounde.1605-140x140.jpg', 21),
(28, 'Hi this is second post by user 1', '2022-04-29 17:02:12', '3938f1ca65ed02069b882f07df9583dd.jpg', 16),
(29, 'Hi this is second post by user 6', '2022-04-29 17:03:23', '829914.jpg', 21),
(30, 'Hi this is third Post by user 6', '2022-04-29 17:03:41', '81996723_p0_master1200.jpg', 21),
(31, 'Hi this is third post by use 1', '2022-04-29 17:12:09', 'Bismarck.(Kantai.Collection).full.2021153.jpg', 16),
(32, 'hi this is fourth post by user 1', '2022-04-29 17:12:56', 'colorful-bear-art-bear-stare-by-sharon-cummings-sharon-cummings.jpg', 16);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(400) NOT NULL,
  `img` varchar(200) NOT NULL DEFAULT 'defaultAvatar.svg',
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `img`, `isAdmin`) VALUES
(16, 'user1', 'user1@gmail.com', '12345', 'defaultAvatar.svg', 0),
(17, 'user2', 'user2@gmail.com', '12345', 'defaultAvatar.svg', 0),
(18, 'user3', 'user3@gmail.com', '12345', 'defaultAvatar.svg', 0),
(19, 'user4', 'user4@gmail.com', '12345', 'defaultAvatar.svg', 0),
(20, 'user5', 'user5@gmail.com', '12345', 'defaultAvatar.svg', 0),
(21, 'user6', 'user6@gmail.com', '12345', 'defaultAvatar.svg', 0),
(22, 'admin1', 'admin1@gmail.com', '12345', 'defaultAvatar.svg', 1),
(23, 'admin2', 'admin2@gmail.com', '12345', 'defaultAvatar.svg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userfk` (`userid`),
  ADD KEY `psfk` (`postid`);

--
-- Indexes for table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ufk` (`user_id`),
  ADD KEY `pk` (`post_id`);

--
-- Indexes for table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Posts_ibfk_1` (`addedBy`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `psfk` FOREIGN KEY (`postid`) REFERENCES `Posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userfk` FOREIGN KEY (`userid`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `pk` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`id`),
  ADD CONSTRAINT `ufk` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`addedBy`) REFERENCES `Users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
