CREATE TABLE `content_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionKey` varchar(100) NOT NULL,
	`sectionName` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`subtitle` text,
	`description` text,
	`cta` varchar(255),
	`ctaLink` varchar(500),
	`imageUrl` varchar(500),
	`metadata` text,
	`updatedBy` int NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `content_sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_sections_sectionKey_unique` UNIQUE(`sectionKey`)
);
--> statement-breakpoint
CREATE TABLE `user_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sectionKey` varchar(100) NOT NULL,
	`permission` enum('view','edit','manage') NOT NULL DEFAULT 'view',
	`grantedBy` int NOT NULL,
	`grantedAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `user_permissions_id` PRIMARY KEY(`id`)
);
