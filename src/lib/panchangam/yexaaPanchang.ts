import { YexaaCalculateFunc } from './yexaaCalculateFunc';
import { YexaaLocalConstant } from './yexaaLocalConstant';
import { YexaaPkgConstants } from './yexaaPkgConstants';
import { YexaaSunMoonTimer } from './yexaaSunMoonTimer';
import { YexaaCalendar } from './yexaaCalendar';

export class YexaaPanchang {
  private yexaaLocalConstant = new YexaaLocalConstant();
  private yexaaPkgConstants = new YexaaPkgConstants();
  private yexaaCalculateFunc = new YexaaCalculateFunc();
  private yexaaSunMoonTimer = new YexaaSunMoonTimer();
  private yexaaCalendar = new YexaaCalendar();
  calculate(dt: Date) {
    return this.yexaaCalculateFunc.calculate(dt, this.yexaaLocalConstant);
  }

  calendar(dt: Date, lat: number, lng: number, height?: number) {
    return this.yexaaCalendar.calendar(
      this.yexaaLocalConstant,
      dt,
      lat,
      lng,
      height
    );
  }

  sunTimer(date: Date, lat: number, lng: number, height?: number) {
    height = height || 0;
    return this.yexaaSunMoonTimer.sunTimer(date, lat, lng, height);
  }

  getYexaaConstant<C extends keyof yexaaLocalConstant, N extends keyof yexaaLocalConstant[C]>(category: C, name: N): yexaaLocalConstant[C][N] {
    return this.yexaaLocalConstant[category][name];
  }

  setYexaaConstant<C extends keyof yexaaLocalConstant, N extends keyof yexaaLocalConstant[C]>(category: C, name: N, yexaalist: yexaaLocalConstant[C][N]) {
    (this.yexaaLocalConstant[category] as Record<N, yexaaLocalConstant[C][N]>)[name] = yexaalist;
  }

  getGanaMatched(brideIno: number, groomIno: number) {
    return this.yexaaPkgConstants.GanaMatched[brideIno][groomIno];
  }
}
