import { DataSource } from "typeorm";
import { myDataSource } from "./DataSource";

export class Database {
    public dataSource: DataSource;

    constructor() {
      this.dataSource = myDataSource;
    }

    public initializeDb() {
      return this.dataSource.initialize();
    }
  }
  