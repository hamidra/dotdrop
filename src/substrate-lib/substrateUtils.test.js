import utils from './substrateUtils';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import BN from 'bn.js';

const chainDecimal = 12;
const chainDecimalUnit = (new BN(10)).pow(new BN(chainDecimal));

describe('test substrate uitility functions', () => {
  describe('getAccountAddress', () => {
    it('When pairOrAddress is an address return address', () => {
      const aliceAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      const account = { pairOrAddress: aliceAddress };
      const address = utils.getAccountAddress(account);
      expect(address).toBe(aliceAddress);
    });
    it('When pairOrAddress is an account return address', async () => {
      await cryptoWaitReady();
      const keyring = new Keyring({ type: 'sr25519' });
      const alicePair = keyring.createFromUri('//Alice');
      const aliceAddress = alicePair.address;
      const account = { pairOrAddress: alicePair };
      const address = utils.getAccountAddress(account);
      expect(address).toBe(aliceAddress);
    });
    it('When account argument or its pairOrAddress is undefined return undefined', async () => {
      expect(utils.getAccountAddress()).toBeUndefined();
      expect(utils.getAccountAddress({})).toBeUndefined();
    });
  });

  describe('validateAddress', () => {
    it('if is a valid address return true', async () => {
      const aliceAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
      expect(utils.validateAddress(aliceAddress)).toBe(true);
    });
    it('if is a valid address return true', async () => {
      const invalidAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcN';
      expect(utils.validateAddress(invalidAddress)).toBe(false);
    });
  });

  describe('getUsableBalances', () => {
    it('return usable balance when no balance is frozen', () => {
      const free = (new BN(80)).mul(chainDecimalUnit);
      const noFrozenBalance = {
        free,
        miscFrozen: new BN(0)
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(free)).toBe(true);
    });
    it('return usable balance when there is some frozen balance', () => {
      const free = (new BN(80)).mul(chainDecimalUnit);
      const frozen = (new BN(2)).mul(chainDecimalUnit);
      const usable = free.sub(frozen);
      const noFrozenBalance = {
        free,
        miscFrozen: frozen
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(usable)).toBe(true);
    });
    it('return 0 usable balance when free balance is less than frozen balance', () => {
      const free = (new BN(2)).mul(chainDecimalUnit);
      const frozen = (new BN(80)).mul(chainDecimalUnit);
      const usable = new BN(0);
      const noFrozenBalance = {
        free,
        miscFrozen: frozen
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(usable)).toBe(true);
    });
    it('return usable balance when balance is zero', () => {
      const free = new BN(0);
      const frozen = new BN(0);
      const usable = new BN(0);
      const noFrozenBalance = {
        free,
        miscFrozen: frozen
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(usable)).toBe(true);
    });
  });

  describe('formatBalance', () => {
    it('format balance with no decimal value', () => {
      const balance = '10011';
      const token = 'DOT';
      const formattedBalance = `${balance} ${token}`;
      expect(utils.formatBalance(balance, token)).toBe(formattedBalance);
    });
    it('format balance with no decimal value and leading zeros', () => {
      const balance = '00001';
      const token = 'DOT';
      const formattedBalance = `1 ${token}`;
      expect(utils.formatBalance(balance, token)).toBe(formattedBalance);
    });
    it('format balance with decimals', () => {
      const balance = '10011.001';
      const token = 'DOT';
      const formattedBalance = `${balance} ${token}`;
      expect(utils.formatBalance(balance, token)).toBe(formattedBalance);
    });
    it('format balance with decimals and trailing zeros', () => {
      const balance = '1.0010000';
      const token = 'DOT';
      const formattedBalance = `${'1.001'} ${token}`;
      expect(utils.formatBalance(balance, token)).toBe(formattedBalance);
    });
    it('format balance with all trailing and leading zeros', () => {
      const balance = '0000.00000';
      const token = 'DOT';
      const formattedBalance = `${'0'} ${token}`;
      expect(utils.formatBalance(balance, token)).toBe(formattedBalance);
    });
    it('format balance with decimal to a decimal point', () => {
      const balance = '10.0011000';
      const token = 'DOT';
      const formatted3Decimal = `${'10.001'} ${token}`;
      const formatted6Decimal = `${'10.0011'} ${token}`;
      expect(utils.formatBalance(balance, token, 3)).toBe(formatted3Decimal);
      expect(utils.formatBalance(balance, token, 6)).toBe(formatted6Decimal);
    });
  });

  describe('formatChainUnit', () => {
    it('convert chain unit value with no decimal points', () => {
      const valueInChainUnit = (new BN(2)).mul(chainDecimalUnit); // 2 tokens
      const valueInString = '2000000000000';
      const value = '2';
      expect(utils.fromChainUnit(valueInChainUnit, 12)).toBe(value);
      expect(utils.fromChainUnit(valueInString, 12)).toBe(value);
    });
    it('convert chain unit value with decimal points', () => {
      const wholeValueInChainUnit = (new BN(2)).mul(chainDecimalUnit); // 2
      const decimlaValueInChainUnit = (new BN(2)).mul(chainDecimalUnit).divn(1000); // 0.002
      const valueInChainUnit = wholeValueInChainUnit.add(decimlaValueInChainUnit); // 2.002
      const valueInString = '2002000000000';
      const value = '2.002';
      expect(utils.fromChainUnit(valueInChainUnit, 12)).toBe(value);
      expect(utils.fromChainUnit(valueInString, 12)).toBe(value);
    });
    it('convert chain unit value with decimal points with fixed decimals', () => {
      const wholeValueInChainUnit = (new BN(2)).mul(chainDecimalUnit); // 2
      const decimlaValueInChainUnit = (new BN(21)).mul(chainDecimalUnit).divn(1000); // 0.021
      const valueInChainUnit = wholeValueInChainUnit.add(decimlaValueInChainUnit); // 2.021
      const valueInString = '2021000000000';
      const value = '2.021';
      const value2Decimals = '2.02';
      const value0Decimals = '2';
      expect(utils.fromChainUnit(valueInChainUnit, 12, 5)).toBe(value);
      expect(utils.fromChainUnit(valueInString, 12, 5)).toBe(value);

      expect(utils.fromChainUnit(valueInChainUnit, 12, 2)).toBe(value2Decimals);
      expect(utils.fromChainUnit(valueInString, 12, 2)).toBe(value2Decimals);

      expect(utils.fromChainUnit(valueInChainUnit, 12, 0)).toBe(value0Decimals);
      expect(utils.fromChainUnit(valueInString, 12, 0)).toBe(value0Decimals);
    });

    it('convert 0', () => {
      expect(utils.fromChainUnit(0, 12)).toBe('0');
      expect(utils.fromChainUnit('0', 12)).toBe('0');

      expect(utils.fromChainUnit(0, 12, 2)).toBe('0');
      expect(utils.fromChainUnit('0', 12, 2)).toBe('0');

      expect(utils.fromChainUnit(0, 12, 0)).toBe('0');
      expect(utils.fromChainUnit('0', 12, 0)).toBe('0');
    });
  });

  describe('toChainUnit', () => {
    it('convert value with no decimals to chainUnit', () => {
      const valueString = '11';
      const value = 11;
      const valueInChainUnit = new BN(11).mul(chainDecimalUnit);
      expect(utils.toChainUnit(value, 12).eq(valueInChainUnit)).toBe(true);
      expect(utils.toChainUnit(valueString, 12).eq(valueInChainUnit)).toBe(true);
    });
    it('convert value with decimals to chainUnit', () => {
      const valueString = '2.021';
      const value = 2.021;
      const wholeValueInChainUnit = (new BN(2)).mul(chainDecimalUnit); // 2
      const decimlaValueInChainUnit = (new BN(21)).mul(chainDecimalUnit).divn(1000); // 0.021
      const valueInChainUnit = wholeValueInChainUnit.add(decimlaValueInChainUnit); // 2.021
      expect(utils.toChainUnit(value, 12).eq(valueInChainUnit)).toBe(true);
      expect(utils.toChainUnit(valueString, 12).eq(valueInChainUnit)).toBe(true);
    });

    it('convert 0 to chainUnit', () => {
      const valueString = '0';
      const value = 0;
      const valueInChainUnit = new BN(0);
      expect(utils.toChainUnit(value, 12).eq(valueInChainUnit)).toBe(true);
      expect(utils.toChainUnit(valueString, 12).eq(valueInChainUnit)).toBe(true);
    });
  });
});
