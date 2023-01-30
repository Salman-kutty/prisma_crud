-- DropForeignKey
ALTER TABLE `Users` DROP FOREIGN KEY `Users_roleRelationId_fkey`;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleRelationId_fkey` FOREIGN KEY (`roleRelationId`) REFERENCES `Roles`(`roleId`) ON DELETE CASCADE ON UPDATE CASCADE;
