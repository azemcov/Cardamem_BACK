import { Injectable } from '@nestjs/common';

const newDate = new Date();
const date = newDate.toLocaleDateString();
const time = newDate.toLocaleTimeString();
const dateTime = `${date} ${time}`;

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello! ${dateTime}`;
  }
}
