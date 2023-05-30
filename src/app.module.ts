import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillStockModule } from './bill-stock/bill-stock.module';
import { BillStockEntity } from './bill-stock/entity/bill-stock.entity';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionEntity } from './transaction/entity/transaction.entity';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [BillStockEntity, TransactionEntity],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        BillStockModule,
        TransactionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
