# Get started
## Setup HH shorthand/aliases
1. Open up the a terminal
1. Install hardhat aliases: `npm i -g hardhat-shorthand`
2. Next run: `hardhat-completion install`
3. To try it out, open a new terminal, go to the directory of your Hardhat project, and try typing `hh` followed by tab. More info [here](https://hardhat.org/guides/shorthand.html).

## Checkout this repo and start up hardhat node
4. Clone the repo and cd into it
<pre>git clone https://github.com/jrhite/ETHOnlineProj && cd ETHOnlineProj</pre>
5. Install deps with yarn `yarn`
6. Copy the `.env-template` file to `.env`, then follow the note in the `.env` file to add your API keys.
7. Start hardhat `hh node --watch --show-accounts`

## Compile and deploy contracts for the hardhat **localhost** network (note: this is different from the default hardhat network)
1. Open up a 2nd terminal
2. `hh deploy --network localhost`

Now the contracts are deployed on the localhost network

## Start the react frontend
1. Open up a 3rd terminal
2. `cd frontend`
3. Install deps with yarn `yarn`
4. Start React app with yarn `yarn start`

The frontend should start up at http://localhost:3000/.

Things will likely fail until you setup Metamask for localhost, so do this now:

1. Open up MetaMask
2. Go to Settings -> Networks
3. Add the new HardHat Network
```
Network Name: Hardhat Local
New RPC URL: http://localhost:8545
Chain ID: 31337
Currency Symbol: ETH
```

Next, add a new **localhost** account that has been funded by hardhat.
1. Go back to the first terminal (see up above)
2. Copy the private key from any account printed in the first terminal
3. Then, in MetaMask go to Import Account and paste in the Hardhat private key.
4. Finally, switch MetaMask to use the `Hardhat Local` network and switch MetaMask to use the Hardhat Account you just imported.

Test it out with the new Metamask settings:
1. Open http://localhost:3000/ in the browser
2. Type in a new greeting in the input box.
3. Click the 'Set Greeting' button and then confirm the transaction in the MetaMask popup.
4. Refresh the page and see the new greeting you typed in.

Because of this default hardhat.config.ts it will first try to connect with an injected provider like Metamask (web3modal package does this).

If nothing found it will try to connect with your hardhat node. On localhost and hardhat nodes it will inject your mnemonic into the frontend so you have a "browser wallet" that can both call and send transactions. NB! Dont ever put a mnemonic with actual value here. We will limit this feature going forward so its more explicit.

```ts
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
};
```

The default mnemonic currently used by hardhat is `test test test test test test test test test test test junk`
