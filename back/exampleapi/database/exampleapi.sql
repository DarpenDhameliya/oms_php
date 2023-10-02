-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 05, 2022 at 06:22 AM
-- Server version: 8.0.21
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exampleapi`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(250) NOT NULL,
  `client_email` varchar(250) NOT NULL,
  `company_name` varchar(250) NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `client_name`, `client_email`, `company_name`, `create_at`) VALUES
(1, 'krishnam', 'krishna@gmail.com', 'krishna and co.', '2021-11-30 15:52:53'),
(3, 'krishna2', 'demo@gmail.com', 'krishna and co.', '2021-11-30 17:27:56');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `connection` text COLLATE utf8_unicode_ci NOT NULL,
  `queue` text COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
(6, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
(7, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(8, '2016_06_01_000004_create_oauth_clients_table', 2),
(9, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('87f67c3f42185f5f45a097c81a73d7eb3ec790cf4a82083dcabd590987a15ad3fc6d85d69ca22da7', 1, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 01:13:52', '2021-11-30 01:13:52', '2022-11-30 06:43:52'),
('7d6190e288fb1ce6383d0cd3341fb1dcca32e32ee92f04dc372bd049716fec38396562e34ebb588e', 1, 1, 'Laravel Password Grant Client', '[]', 1, '2021-11-30 01:21:27', '2021-11-30 01:21:27', '2022-11-30 06:51:27'),
('70fad7b112fce2772343546dc161b08606f4e3cc5a1f1b338698a0c0bf5f4cee3917e3dc4f5f63db', 1, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 01:51:10', '2021-11-30 01:51:10', '2022-11-30 07:21:10'),
('6ff306ba37859e4d1837ee7d335de6657828575c62573bde8dfe243a626d7b8ea874ca31a7d2a36d', 1, 1, 'Laravel Password Grant Client', '[]', 1, '2021-11-30 01:52:15', '2021-11-30 01:52:15', '2022-11-30 07:22:15'),
('8d1f7f6f0ba8ed0c1cecd14e14672694ef23ab174692b58df718bedb5bbf581a6bc36dc6c89f6ba1', 3, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 01:53:32', '2021-11-30 01:53:32', '2022-11-30 07:23:32'),
('7838056c629c1cf759e8189745a54a6bf7c40c3cdde57d03b10de8611a6acc8b5b872f565a4a131b', 1, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 01:55:02', '2021-11-30 01:55:02', '2022-11-30 07:25:02'),
('f28e0f9f9f9ef719ffd482c0452817d768eedd12a5ef95ffa3bc7132871e934387f89471111ab297', 1, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 03:11:51', '2021-11-30 03:11:51', '2022-11-30 08:41:51'),
('123aac98b45fb5b76c6c5e8cb4390c343ff743203d615c76afc53714235b5561f2c0da1e8cdc6f65', 1, 1, 'Laravel Password Grant Client', '[]', 0, '2021-11-30 03:28:32', '2021-11-30 03:28:32', '2022-11-30 08:58:32'),
('65ea0bcc40894db2f1e2527280f508c36a0d3f80ffead418cacd9c9f79c3ded299d851c06fa8765c', 2, 1, 'Laravel Password Grant Client', '[]', 1, '2021-11-30 03:28:40', '2021-11-30 03:28:40', '2022-11-30 08:58:40'),
('b591796323535a8511a2867ff93e5b77540a4ddfb67b1193828db9ea5dc82f2edbc3548107b4946f', 2, 1, 'Laravel Password Grant Client', '[]', 0, '2021-12-01 06:10:05', '2021-12-01 06:10:05', '2022-12-01 11:40:05'),
('b5be717de426850de81792526146d2fc3b1fa246a42ebe58ddc6467689c98aad4f744044a03f6a66', 2, 1, 'Laravel Password Grant Client', '[]', 0, '2021-12-01 07:01:39', '2021-12-01 07:01:39', '2022-12-01 12:31:39'),
('470a08aff67172c110b2c777d0c37ab5c839459c28750d3edb88efb632acafb63dfc510c474a3de4', 2, 1, 'Laravel Password Grant Client', '[]', 0, '2021-12-01 22:57:34', '2021-12-01 22:57:34', '2022-12-02 04:27:34'),
('bfd94fab659bb5097bc9e38701eb2b42d2fb5134ffb80a5803391cd3d265e13aab66517f0cb878cb', 2, 1, 'Laravel Password Grant Client', '[]', 1, '2021-12-01 23:03:17', '2021-12-01 23:03:17', '2022-12-02 04:33:17');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'abc', 'LSPNC6CDhQCOE71XKDeIySRc6T3b3Nya9mwJeBqm', NULL, 'http://localhost', 1, 0, 0, '2021-11-30 01:13:41', '2021-11-30 01:13:41');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2021-11-30 01:13:41', '2021-11-30 01:13:41');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '9906726f4daf769352445ac28db39ff15d2db9e6e27499b9e4a2234d2f0c3064', '[\"*\"]', NULL, '2021-11-30 00:03:08', '2021-11-30 00:03:08'),
(2, 'App\\Models\\User', 1, 'Laravel Password Grant Client', 'cd4dd90e31bc1d791b2eab30233bb4398fe6a2417441c49c52cdd9233a468585', '[\"*\"]', NULL, '2021-11-30 00:04:28', '2021-11-30 00:04:28'),
(3, 'App\\Models\\User', 1, 'Personal Access Token', '337d9921cc97bb6e53a5df8032799e6fdfb3e05b265c250c20a2a8b7cc1ef3ca', '[\"*\"]', NULL, '2021-11-30 00:06:49', '2021-11-30 00:06:49'),
(4, 'App\\Models\\User', 1, 'login', 'b228661667669b1759e511708f841282b0e0077e92752927e0d74197b28ea4bb', '[\"*\"]', NULL, '2021-11-30 00:09:47', '2021-11-30 00:09:47'),
(5, 'App\\Models\\User', 1, 'login', 'ce4ef4a58bc65bbf4564a78b2a75c274692ca9830bcb074fd6622251c9918954', '[\"*\"]', NULL, '2021-11-30 00:10:49', '2021-11-30 00:10:49'),
(6, 'App\\Models\\User', 1, 'login', '69cf027f0d91948b528ac4228108f1b5f1438772347a7074f99057a81935dda2', '[\"*\"]', NULL, '2021-11-30 00:15:23', '2021-11-30 00:15:23'),
(7, 'App\\Models\\User', 1, 'login', '158786c6c15e21d58f4c6bf702cdb7def9604ad11eccf1f23880a40e969a578f', '[\"*\"]', NULL, '2021-11-30 00:19:58', '2021-11-30 00:19:58'),
(8, 'App\\Models\\User', 1, 'login', 'c158e9beef0f93ca033c0917aa12d47f19264ef5fc96f0ba8477fa7051298515', '[\"*\"]', NULL, '2021-11-30 00:20:12', '2021-11-30 00:20:12'),
(9, 'App\\Models\\User', 1, 'login', '6af4a6f8f5972746585c12705a0580038179abac350c6520c7642f87500ac5b8', '[\"*\"]', NULL, '2021-11-30 00:20:14', '2021-11-30 00:20:14'),
(10, 'App\\Models\\User', 1, 'login', '7c285a64fb7878cdcd6c24d625a77f5619fb8c6adbcbf0bef68abb88190f0bd7', '[\"*\"]', NULL, '2021-11-30 00:20:53', '2021-11-30 00:20:53'),
(11, 'App\\Models\\User', 1, 'login', '59d02e75ab188a2c9f3adfbb4aca61724fc7ffca73b5260d0dc5ed84a2ad407b', '[\"*\"]', NULL, '2021-11-30 00:22:16', '2021-11-30 00:22:16'),
(12, 'App\\Models\\User', 1, 'login', 'baf87bbd950e30a5c445bb7be62ece7ddeb6f1e703e90de4d4597f4849d86eef', '[\"*\"]', NULL, '2021-11-30 00:26:07', '2021-11-30 00:26:07'),
(13, 'App\\Models\\User', 1, 'login', 'a0163c965e2cc40ade021925f67e073435f950c42f5c504f91ee2cd30353f7d3', '[\"*\"]', NULL, '2021-11-30 00:28:09', '2021-11-30 00:28:09'),
(14, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '463212f8630c4916bc7c36503b69c2c4e0a45b831a4b39e0d94c893293683da2', '[\"*\"]', NULL, '2021-11-30 00:29:18', '2021-11-30 00:29:18'),
(15, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '22b71c8d4e79aed62ab43896b7d41998541adb5a3127636754ade0a7d68379cf', '[\"*\"]', NULL, '2021-11-30 00:30:01', '2021-11-30 00:30:01'),
(16, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '7c8aac4df2ee8a66dbbdee2e3e0c8e74cf2a6136b23001c53173b1eb55ad8e60', '[\"*\"]', NULL, '2021-11-30 00:30:22', '2021-11-30 00:30:22'),
(17, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '424a66e1b123da62c3d27bc964cb2030cf3e715e2f0384a380fe7669ee76ce7b', '[\"*\"]', NULL, '2021-11-30 00:40:29', '2021-11-30 00:40:29'),
(18, 'App\\Models\\User', 1, 'Laravel Password Grant Client', 'c03eaa70181e636ad55f412ab1e7227f7b2ecf2491a08fd42d76b4c479118fc8', '[\"*\"]', NULL, '2021-11-30 00:48:17', '2021-11-30 00:48:17'),
(19, 'App\\Models\\User', 1, 'Laravel Password Grant Client', 'd7667cd7371e70d0cffc3e9efbd8d2760cef4a9ba8f42837312bdace4efeec8c', '[\"*\"]', NULL, '2021-11-30 00:49:30', '2021-11-30 00:49:30'),
(20, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '692310ff3cc3e425525a0be90b170b88393514727d51422b0d72b3989d81544e', '[\"*\"]', NULL, '2021-11-30 00:50:05', '2021-11-30 00:50:05'),
(21, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '16de54a5d2dab4e260dff8f18f697f0c45652f227bcf1d5d34e6ab5f02ad9e78', '[\"*\"]', NULL, '2021-11-30 00:50:54', '2021-11-30 00:50:54'),
(22, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '5f0eaad316ba2f513ceacf144181ec04625f8a6d0a8a58fbfb998a157e2d4ea8', '[\"*\"]', NULL, '2021-11-30 00:51:13', '2021-11-30 00:51:13'),
(23, 'App\\Models\\User', 1, 'Laravel Password Grant Client', 'cb6df564ff79f424fc1a730b703d612c4ea097cb38b00f2486aff46cb50544a0', '[\"*\"]', NULL, '2021-11-30 01:03:38', '2021-11-30 01:03:38'),
(24, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '499bce0762474ed5706bad79dde1f7e7d4f23cd0eaed2bfb00b5ded1542ddc40', '[\"*\"]', NULL, '2021-11-30 01:08:02', '2021-11-30 01:08:02'),
(25, 'App\\Models\\User', 1, 'Laravel Password Grant Client', 'c7d33064b4890a7ef2c1897b7e3ee6bff6092c913471d16eff02b0ea9a9ce5f1', '[\"*\"]', NULL, '2021-11-30 01:08:03', '2021-11-30 01:08:03'),
(26, 'App\\Models\\User', 1, 'Laravel Password Grant Client', '39986349c0daefaca5a7e0cfb2b5792ca72cbbbfa16762706935a24183c4d310', '[\"*\"]', NULL, '2021-11-30 01:08:05', '2021-11-30 01:08:05');

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
CREATE TABLE IF NOT EXISTS `seller` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seller_name` varchar(250) NOT NULL,
  `seller_email` varchar(250) NOT NULL,
  `seller_comment` varchar(2250) NOT NULL,
  `file` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`id`, `seller_name`, `seller_email`, `seller_comment`, `file`, `created_at`, `updated_at`) VALUES
(2, 'abcs', 'ankita.sstpl@gmail.com', 'sdavdfgfdg', '1638347799.jpg', '2021-12-01 05:52:52', '2021-12-01 09:08:36'),
(10, 'asa', 'desddmo@gmail.com', 'dasd', '1638343160.png', '2021-12-01 07:19:20', '2021-12-01 07:19:20'),
(13, 'abcd', 'abc@gmail.com', '123456', '1638439806.png', '2021-12-02 05:00:14', '2021-12-02 10:10:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'abcd', 'abcd@gmail.com', NULL, '$2y$10$Mnm.cqFr15M4Gqv6lTlJ/eHWzRnNkFib7Fg.QR/ZeQ0LopfolBgSm', NULL, '2021-11-30 00:03:08', '2021-11-30 00:03:08'),
(2, 'abcd', 'abcde@gmail.com', NULL, '$2y$10$VJkXYhskbDgtvIbbjuk1d.qag5oUDemwJ0t1h3JLDGi9UeCyaPx/O', NULL, '2021-11-30 00:06:39', '2021-11-30 00:06:39'),
(3, 'abcd', 'abc@gmail.com', NULL, '$2y$10$leWHoHlCZKGn6Ve.lJIEfO2MEN7Nn3JiOv97TJ2RvYWnLCmYiS6BO', NULL, '2021-11-30 01:53:32', '2021-11-30 01:53:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
