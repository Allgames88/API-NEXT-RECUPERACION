import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MjmgGamasModule } from './mjmg-gamas/mjmg-gamas.module';
import { MjmgProductosModule } from './mjmg-productos/mjmg-productos.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      autoLoadEntities: true,
      synchronize: true
    }),
    MjmgGamasModule,
    MjmgProductosModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private configService: ConfigService){
    
  }
}
