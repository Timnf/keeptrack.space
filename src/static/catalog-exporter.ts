import { saveCsv } from '@app/lib/saveVariable';
import { saveAs } from 'file-saver';
import { BaseObject, DetailedSatellite, RAD2DEG } from 'ootk';
import { keepTrackApi } from '../keepTrackApi';
import { errorManagerInstance } from '../singletons/errorManager';

export class CatalogExporter {
  static exportTle2Csv(objData: BaseObject[], isDeleteAnalysts = true) {
    try {
      const catalogTLE2 = [];
      const satOnlyData = objData.filter((obj: BaseObject) => obj.isSatellite() && (obj as DetailedSatellite).tle1) as DetailedSatellite[];

      if (satOnlyData.length == 0) {
        errorManagerInstance.info('No TLE data to export');
        return;
      }

      satOnlyData.sort((a, b) => parseInt(a.sccNum) - parseInt(b.sccNum));
      for (const sat of satOnlyData) {
        if (typeof sat.tle1 == 'undefined' || typeof sat.tle2 == 'undefined') {
          continue;
        }
        if (isDeleteAnalysts && sat.country == 'ANALSAT') continue;
        catalogTLE2.push({
          satId: sat.sccNum,
          name: sat.name,
          tle1: sat.tle1,
          tle2: sat.tle2,
          inclination: sat.inclination * RAD2DEG,
          eccentricity: sat.eccentricity,
          period: sat.period,
          raan: sat.raan * RAD2DEG,
          apogee: sat.apogee,
          perigee: sat.perigee,
          country: sat.country,
          site: sat.launchSite,
          rocket: sat.launchVehicle,
          rcs: sat.rcs,
          visualMagnitude: sat.vmag,
          user: sat.user,
          mission: sat.mission,
          purpose: sat.purpose,
          contractor: sat.manufacturer,
          dryMass: sat.dryMass,
          liftMass: sat.launchMass,
          lifeExpected: sat.lifetime,
          power: sat.power,
        });
      }
      saveCsv(catalogTLE2, 'catalogInfo');
    } catch {
      // DEBUG:
      // console.warn('Failed to Export TLEs!');
    }
  }

  static exportSatInFov2Csv(objData: BaseObject[]) {
    const data = objData
      .filter((obj) => obj.isSatellite() && (obj as DetailedSatellite).tle1 && keepTrackApi.getDotsManager().inViewData?.[obj.id] === 1)
      .map((obj) => {
        const sat = obj as DetailedSatellite;
        return {
          satId: sat.sccNum,
          name: sat.name,
          country: sat.country,
          apogee: sat.apogee,
          perigee: sat.perigee,
        };
      });

    saveCsv(data, 'satInView');
  }

  static exportTle2Txt(objData: BaseObject[], numberOfLines = 2, isDeleteAnalysts = true) {
    try {
      const catalogTLE2 = [];
      const satOnlyData = objData.filter((obj: BaseObject) => obj.isSatellite() && (obj as DetailedSatellite).tle1) as DetailedSatellite[];

      if (satOnlyData.length == 0) {
        errorManagerInstance.info('No TLE data to export');
        return;
      }

      satOnlyData.sort((a, b) => parseInt(a.sccNum) - parseInt(b.sccNum));
      for (const sat of satOnlyData) {
        if (typeof sat.tle1 == 'undefined' || typeof sat.tle2 == 'undefined') {
          continue;
        }
        if (isDeleteAnalysts && sat.country == 'ANALSAT') continue;
        if (numberOfLines == 3) {
          catalogTLE2.push(sat.name);
        }

        if (sat.tle1.includes('NO TLE')) {
          console.log(sat.sccNum);
        }
        if (sat.tle2.includes('NO TLE')) {
          console.log(sat.sccNum);
        }

        catalogTLE2.push(sat.tle1);
        catalogTLE2.push(sat.tle2);
      }
      const catalogTLE2Str = catalogTLE2.join('\n');
      const blob = new Blob([catalogTLE2Str], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, 'TLE.txt');
    } catch {
      // DEBUG:
      // console.warn('Failed to Export TLEs!');
    }
  }
}
