CREATE TABLE `calculation_rows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`calculation_id` integer NOT NULL,
	`period` integer NOT NULL,
	`balance` integer NOT NULL,
	`total_invested` integer NOT NULL,
	`total_interest` integer NOT NULL,
	`period_interest` integer NOT NULL,
	`override_rate` real,
	FOREIGN KEY (`calculation_id`) REFERENCES `calculations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `calculations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start_capital` integer NOT NULL,
	`monthly_saving` integer NOT NULL,
	`years` integer NOT NULL,
	`annual_rate` real NOT NULL,
	`interval` text NOT NULL,
	`final_balance` integer NOT NULL,
	`total_invested` integer NOT NULL,
	`total_interest` integer NOT NULL,
	`created_at` integer NOT NULL
);
