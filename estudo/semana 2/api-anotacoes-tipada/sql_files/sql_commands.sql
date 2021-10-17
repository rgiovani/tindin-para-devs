CREATE TABLE `notes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `isFav` boolean NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `isFav` boolean NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `pets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `owner` VARCHAR(45) NOT NULL,
  `age` int NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `books` (`title`, `author`, `genre`, `isFav`, `createdAt`, `updatedAt`) VALUES ('Dracula', 'Brahm Stoker', 'Novel', 0, '2021-10-16 19:25:29.123', '2021-10-16 19:25:29.123');
INSERT INTO `notes` (`title`, `description`, `isFav`, `createdAt`, `updatedAt`) VALUES ('Estudar', 'Terminar de estudar', true, '2021-10-16 19:28:29.123', '2021-10-16 19:28:29.123');

SELECT * FROM books;
SELECT * FROM notes;

SELECT * FROM notes WHERE isFav=true;