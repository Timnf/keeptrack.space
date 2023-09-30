import { countryMapList } from './../src/js/catalogs/countries';
// Generated by CodiumAI

import { StringExtractor } from "@app/js/static/string-extractor";

describe('StringExtractor_class', () => {
    // Tests that extractCountry returns correct country name for known country code
    it('test_extract_country_known_code', () => {
        expect(StringExtractor.extractCountry('US')).toBe('United States');
    });

    // Test all known country codes
    it('test_extract_country_all_known_codes', () => {
        for (const code in countryMapList) {
            if (code === 'TBD') continue;
            expect(StringExtractor.extractCountry(code)).not.toBe('Unknown');
        }
    });

    // Tests that extractCountry returns 'Unknown' for unknown country code
    it('test_extract_country_unknown_code', () => {
        expect(StringExtractor.extractCountry('ZZ')).toBe('Unknown');
    });

    // Tests that extractLaunchSite returns correct launch site for known site
    it('test_extract_launch_site_known_site', () => {
        expect(StringExtractor.extractLaunchSite('AFETR')).toEqual({ site: 'Cape Canaveral SFS', sitec: 'United States' });
    });

    // Tests that extractLaunchSite returns 'Unknown' for unknown site
    it('test_extract_launch_site_unknown_site', () => {
        expect(StringExtractor.extractLaunchSite('ZZZ')).toEqual({ site: 'Unknown', sitec: 'Unknown' });
    });

    // Tests that extractLiftVehicle returns link for known lift vehicle
    it('test_extract_lift_vehicle_known_vehicle', () => {
        StringExtractor['rocketUrls'] = [{ rocket: 'Falcon 9', url: 'https://www.spacex.com/vehicles/falcon-9/' }];
        expect(StringExtractor.extractLiftVehicle('Falcon 9')).toBe("<a class=\"iframe\" href=\"https://www.spacex.com/vehicles/falcon-9/\">Falcon 9</a>");
    });

    // Tests that extractLiftVehicle returns 'Unknown' for unknown lift vehicle
    it('test_extract_lift_vehicle_unknown_vehicle', () => {
        expect(StringExtractor.extractLiftVehicle('ZZZ')).toBe('Unknown');
    });

    // Tests that 'Unknown' is returned when input is empty
    it('test_empty_input', () => {
        expect(StringExtractor.extractLiftVehicle()).toBe('Unknown');
        expect(StringExtractor.extractLiftVehicle('')).toBe('Unknown');
    });

    // Tests that 'Unknown' is returned when input is 'U'
    it('test_unknown_input', () => {
        expect(StringExtractor.extractLiftVehicle('U')).toBe('Unknown');
    });

    // Tests that 'Unknown' is returned when input is 'TBD'
    it('test_tbd_input', () => {
        expect(StringExtractor.extractLiftVehicle('TBD')).toBe('Unknown');
    });

    // Tests that the correct rocket URL is returned when input is a known rocket
    it('test_known_rocket', () => {
        StringExtractor['rocketUrls'] = [{ rocket: 'knownRocket', url: 'http://knownRocketUrl.com' }];
        expect(StringExtractor.extractLiftVehicle('knownRocket')).toBe('<a class="iframe" href="http://knownRocketUrl.com">knownRocket</a>');
    });

    // Tests that 'Unknown' is returned when input is an unknown rocket
    it('test_unknown_rocket', () => {
        StringExtractor['rocketUrls'] = [];
        expect(StringExtractor.extractLiftVehicle('unknownRocket')).toBe('Unknown');
    });

    // Tests that 'Unknown' is returned when input is null
    it('test_null_input', () => {
        expect(StringExtractor.extractLiftVehicle(null)).toBe('Unknown');
    });

    // Tests that an empty string returns an empty string
    it('test_empty_string', () => {
        expect(StringExtractor.getCountryCode('')).toEqual('');
    });

    // Tests that a valid country name returns the correct country code
    it('test_valid_country_name', () => {
        expect(StringExtractor.getCountryCode('United States')).toEqual('US');
    });

    // Tests that an unknown country name returns an empty string
    it('test_unknown_country_name', () => {
        expect(StringExtractor.getCountryCode('Atlantis')).toEqual('');
    });

    // Tests that a null value returns an empty string
    it('test_null_value', () => {
        expect(StringExtractor.getCountryCode(null)).toEqual('');
    });

    // Tests that a known typo in external data is corrected and returns the correct country code
    it('test_typo_in_external_data', () => {
        expect(StringExtractor.getCountryCode('UnitedKingdom')).toEqual('UK');
    });
});