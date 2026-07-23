-- CreateTable
CREATE TABLE `user_profiles` (
    `id` VARCHAR(30) NOT NULL,
    `user_id` VARCHAR(30) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `display_name` VARCHAR(150) NOT NULL,
    `profile_photo` VARCHAR(255) NULL,
    `phone` VARCHAR(30) NULL,
    `secondary_phone` VARCHAR(30) NULL,
    `birth_date` DATE NULL,
    `gender` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `region` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `postal_code` VARCHAR(20) NULL,
    `job_title` VARCHAR(100) NULL,
    `department` VARCHAR(100) NULL,
    `signature` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Migrate existing personal data from users -> user_profiles
INSERT INTO `user_profiles` (
    `id`,
    `user_id`,
    `first_name`,
    `last_name`,
    `display_name`,
    `profile_photo`,
    `phone`,
    `department`,
    `created_at`,
    `updated_at`
)
SELECT
    LEFT(REPLACE(UUID(), '-', ''), 30),
    `id`,
    SUBSTRING_INDEX(`name`, ' ', 1),
    CASE
        WHEN LOCATE(' ', `name`) > 0 THEN TRIM(SUBSTRING(`name`, LOCATE(' ', `name`) + 1))
        ELSE `name`
    END,
    `name`,
    `avatar`,
    `phone`,
    `department`,
    `created_at`,
    `updated_at`
FROM `users`;

-- AddForeignKey
ALTER TABLE `user_profiles`
ADD CONSTRAINT `user_profiles_user_id_fkey`
FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop personal columns from users (auth table only)
ALTER TABLE `users`
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    DROP COLUMN `avatar`,
    DROP COLUMN `department`;
