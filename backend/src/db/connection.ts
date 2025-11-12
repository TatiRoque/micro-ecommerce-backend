import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mercado_estadisticas', 'root', 'jwCZfIYwUlzYldbqsEJsSkiUFPxbaaOS', {
  host: 'shortline.proxy.rlwy.net',
  port: 19091,
  dialect: 'mysql',
  
});

export default sequelize;
