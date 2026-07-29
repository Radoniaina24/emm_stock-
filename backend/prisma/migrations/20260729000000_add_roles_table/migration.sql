-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable: add role_id, drop role
ALTER TABLE `users` ADD COLUMN `role_id` VARCHAR(36) NULL;

-- Migrate existing roles to role_id (create default roles and assign)
INSERT INTO `roles` (`id`, `name`, `code`, `description`, `is_system`, `is_active`, `created_at`, `updated_at`)
VALUES
    (UUID(), 'Administrateur', 'ADMIN', 'Accès complet à toutes les fonctionnalités', TRUE, TRUE, NOW(), NOW()),
    (UUID(), 'Responsable', 'MANAGER', 'Gère les stocks et les utilisateurs', TRUE, TRUE, NOW(), NOW()),
    (UUID(), 'Gestionnaire', 'STOREKEEPER', 'Gestion quotidienne des entrées/sorties', TRUE, TRUE, NOW(), NOW());

UPDATE `users` u
SET u.`role_id` = (
    SELECT r.`id` FROM `roles` r
    WHERE r.`code` = CASE u.`role`
        WHEN 'Administrateur' THEN 'ADMIN'
        WHEN 'Responsable' THEN 'MANAGER'
        ELSE 'STOREKEEPER'
    END
);

-- CreateIndex
CREATE INDEX `users_role_id_idx` ON `users`(`role_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Drop old column
ALTER TABLE `users` DROP COLUMN `role`;
