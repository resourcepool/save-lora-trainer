-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 04 Février 2019 à 19:40
-- Version du serveur :  5.7.25-0ubuntu0.18.04.2
-- Version de PHP :  7.1.20-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `lora`
--

-- --------------------------------------------------------

--
-- Structure de la table `device`
--

CREATE TABLE `device` (
  `id` int(11) NOT NULL,
  `device` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `clientId` varchar(50) NOT NULL,
  `devEUI` varchar(50) DEFAULT NULL,
  `progress` json DEFAULT NULL,
  `secretLocation` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Structure de la table `challenge`
--

CREATE TABLE `challenge` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `tag` varchar(250) NOT NULL,
  `content` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Structure de la table `game`
--
CREATE TABLE game (
  `startDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `clientId` (`clientId`),
  ADD UNIQUE KEY `devEUI` (`devEUI`);

--
-- Index pour la table `team`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `device`
--
ALTER TABLE `device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `team`
--
ALTER TABLE `challenge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
