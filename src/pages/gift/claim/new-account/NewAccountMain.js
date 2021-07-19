import { useState } from 'react';
import { useSubstrate } from '../../../../substrate-lib';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import FileSaver from 'file-saver';
import PresentAccountPhrase from './PresentAccountPhrase';
import VerifyAccountPhrase from './VerifyAccountPhrase';
import DownloadJsonOption from './DownloadJsonOption';
import DownloadJson from './DownloadJson';

export default function NewAccountMain ({ setAddressHandler, prevStepHandler }) {
  const { keyring } = useSubstrate();
  const [step, setStep] = useState(0);

  const [processing, setProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);
  const [processingMsg, setProcessingMsg] = useState('');

  const resetPresentation = () => {
    setProcessing(false);
    setProcessingError(null);
  };
  const _setStep = (step) => {
    resetPresentation();
    setStep(step % steps.length);
  };
  const nextStep = () => {
    _setStep(step + 1);
  };
  const prevStep = () => {
    _setStep(step - 1);
  };
  const jumpToStep = (step) => {
    _setStep(step);
  };

  const createNewAccount = () => {
    // ToDO: Add error handling since mnemonicGenerate can fail
    const mnemonic = mnemonicGenerate();
    const account = keyring.createFromUri(mnemonic, {}, 'sr25519');
    return { mnemonic, account };
  };

  const [newAccount, setNewAccount] = useState(createNewAccount());

  const _setAddressHandler = async () => {
    setAddressHandler(newAccount.account.address);
  };

  const _downloadJsonHandler = async (accountName, password) => {
    newAccount.account.setMeta({
      ...newAccount?.account?.meta,
      name: accountName
    });
    const json = newAccount.account.toJson(password);
    const blob = new Blob([JSON.stringify(json)], {
      type: 'application/json; charset=utf-8'
    });
    FileSaver.saveAs(blob, `${newAccount.account.address}.json`);
    _setAddressHandler();
  };

  const mnemonicWords = newAccount?.mnemonic
    ? newAccount.mnemonic.split(' ').map((word) => word.trim())
    : [];

  const steps = [];
  // add Step-0
  steps.push(
    <PresentAccountPhrase
      mnemonicWords={mnemonicWords}
      nextStepHandler={nextStep}
      prevStepHandler={prevStepHandler}
    />
  );

  // add Step-1
  steps.push(
    <VerifyAccountPhrase
      mnemonicWords={mnemonicWords}
      nextStepHandler={nextStep}
      prevStepHandler={prevStep}
    />
  );

  // add Step-2
  steps.push(
    <DownloadJsonOption
      prevStepHandler={prevStep}
      handleDownloadOption={(isDownload) =>
        isDownload ? nextStep() : _setAddressHandler()
      }
    />
  );

  // add Step-3
  steps.push(
    <DownloadJson
      prevStepHandler={prevStep}
      downloadJsonHandler={_downloadJsonHandler}
    />
  );

  return <>{steps[step]}</>;
}
