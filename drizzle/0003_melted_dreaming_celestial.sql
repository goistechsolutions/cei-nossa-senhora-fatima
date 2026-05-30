CREATE TABLE `gallery_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`storageKey` varchar(500) NOT NULL,
	`storageUrl` varchar(500) NOT NULL,
	`mimeType` varchar(50) NOT NULL,
	`fileSize` int NOT NULL,
	`width` int,
	`height` int,
	`alt` text,
	`sectionKey` varchar(100),
	`tags` text,
	`uploadedBy` int NOT NULL,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gallery_images_id` PRIMARY KEY(`id`)
);
