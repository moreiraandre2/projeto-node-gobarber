import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableUsersFieldUpdateAt1587456837972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'updated_atty');
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'updated_at');
      await queryRunner.addColumn(
        'users',
        new TableColumn({
          name: 'updated_atty',
          type: 'timestamp',
          default: 'now()',
        }),
      );

    }

}
