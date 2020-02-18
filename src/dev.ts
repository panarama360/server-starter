import { Logger } from '@nestjs/common';
import { seed } from './seed.dev';
// tslint:disable-next-line:no-empty
export async function initDevPre() {

}
export async function initDev() {
  Logger.log('Start Dev!');
  seed();
}
