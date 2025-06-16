/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppDataSource } from '../infrastructure/database/typeorm.config';
import { Charity } from '../domain/entities/Charity.entity';
import { CharityName } from '../domain/value-objects/CharityName';
import { CharityDescription } from '../domain/value-objects/CharityDescription';
import { CharityImageUrl } from '../domain/value-objects/CharityImageUrl';

const baseData = {
  name: '財團法人流浪動物之家基金會',
  description:
    '基金會成立近40年，積極將急難救援、治療絕育、安置收容、中途訓練、愛心認養聯合成為一線，希望能邀請您透過小小捐款的方式，幫助這些浪浪找到一個溫暖的家。',
  imageUrl: 'https://hsapf.org.tw/wp-content/uploads/2023/05/logo_heart.webp',
};

const seedData = Array.from({ length: 23 }, (_, index) => ({
  ...baseData,
  name: `${baseData.name}-${index + 1}`,
}));

async function seed() {
  try {
    // 初始化資料庫連接
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    const charityRepository = AppDataSource.getRepository(Charity);

    // 清空現有資料
    // await charityRepository.clear();
    // console.log('Cleared existing data');

    // // 插入新資料
    for (const data of seedData) {
      const charity = new Charity();

      charity.name = new CharityName(data.name).getValue();
      charity.description = new CharityDescription(data.description).getValue();
      charity.imageUrl = new CharityImageUrl(data.imageUrl).getValue();

      await charityRepository.save(charity);
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
}

// 執行 seed 函數
seed();
