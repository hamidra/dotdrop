import utils from './substrateUtils';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { validateChars } from '@polkadot/util-crypto/base58/validate';
import BN from 'bn.js';

const chainDecimal = new BN(12);
const chainUnit = (new BN(10)).pow(chainDecimal);

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
      const free = (new BN(80)).mul(chainUnit);
      const noFrozenBalance = {
        free,
        miscFrozen: new BN(0)
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(free)).toBe(true);
    });
    it('return usable balance when there is some frozen balance', () => {
      const free = (new BN(80)).mul(chainUnit);
      const frozen = (new BN(2)).mul(chainUnit);
      const usable = free.sub(frozen);
      const noFrozenBalance = {
        free,
        miscFrozen: frozen
      };
      expect(utils.getUsableBalances(noFrozenBalance).eq(usable)).toBe(true);
    });
    it('return 0 usable balance when free balance is less than frozen balance', () => {
      const free = (new BN(2)).mul(chainUnit);
      const frozen = (new BN(80)).mul(chainUnit);
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
      const formatted_3decimal = `${'10.001'} ${token}`;
      const formatted_6decimal = `${'10.0011'} ${token}`;
      expect(utils.formatBalance(balance, token, 3)).toBe(formatted_3decimal);
      expect(utils.formatBalance(balance, token, 6)).toBe(formatted_6decimal);
    });
  });
});
