CREATE TABLE `news` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(50) NOT NULL,
	`icon` varchar(50) NOT NULL DEFAULT '📰',
	`imageUrl` varchar(500),
	`publishedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdBy` int NOT NULL,
	`isPublished` int NOT NULL DEFAULT 1,
	CONSTRAINT `news_id` PRIMARY KEY(`id`)
);
