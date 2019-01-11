import { ApiPromise } from '@polkadot/api';
import {
  createButton, createElement, createError, createWrapper
} from '../commons';

// https://polkadot.js.org/api/examples/promise/02_listen_to_blocks/
export default async (provider) => {
  const wrapper = createWrapper('02-listen-to-blocks', 'Promise - Listen to Blocks');
  try {
    // Create our API with a connection to the node
    const api = await ApiPromise.create(provider);
    const unsubscribe = await api.rpc.chain.subscribeNewHead((header) => {
      createElement(`Chain is at block: #${header.blockNumber}`, wrapper);
    });
    createButton(unsubscribe, wrapper, 'Unsubscribe');
  } catch (e) {
    createError(e, wrapper);
  }
};
