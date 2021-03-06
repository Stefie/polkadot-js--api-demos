import { ApiRx } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';

import {
  ALICE, createButton, createLog, createWrapper
} from '../commons';

// https://polkadot.js.org/api/examples/rx/06_make_transfer/
export default (provider) => {
  const wrapper = createWrapper('make-transfer', 'Rx - Make Transfer');
  const makeTransfer = async provider => {
    //  Instantiate the API
    const api = await ApiRx.create(provider).toPromise();
    // Get a random number between 1 and 100000
    const randomAmount = Math.floor((Math.random() * 100000) + 1);
    // Create an instance of the keyring
    const keyring = new Keyring({ type: 'sr25519' });
    // Add Bob to keyring
    const bob = keyring.addFromUri('//Bob');

    api.tx.balances
      // create transfer
      .transfer(ALICE, randomAmount)
      // Sign and send the transcation
      .signAndSend(bob)
      // Subscribe to the status updates of the transfer
      .subscribe(({ status }) => {
        if (status.type === 'Finalized') {
          createLog(`Successful transfer of ${randomAmount} from <b>Alice</b> to <b>Bob</b> with hash ${status.asFinalized.toHex()}`, wrapper);
        } else {
          createLog(`Staus of transfer: ${status.type}`, wrapper);
        }
      });
  };
  createButton(makeTransfer, wrapper, 'Initialize transfer');
};
