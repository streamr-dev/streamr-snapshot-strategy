# Streamr snapshot strategy

The Streamr Network is a peer-to-peer network for publishing and subscribing to data in real-time. Applications use it for decentralized messaging, for example sharing data across applications or broadcasting real-time state changes to large audiences. The decentralized nature of the system makes the data transport scalable, robust, secure, tamper proof, and censorship resistant.

Operators are the node running "miners" in the Streamr Network. They run Streamr nodes, subscribe to streams, and stake DATA in the Sponsorship contract(s) of those streams. When they subscribe, they help making that stream more robust. In return, they receive DATA tokens from the Sponsorship contract, in proportion to their stake.

This is why part of the Operators' DATA tokens are staked in Sponsorships (through an Operator contract that they control). Only a small portion of DATA is expected to be in the Streamr Network participants' wallets, the rest is staked or delegated into the Streamr Network.

The Streamr snapshot strategy counts the "Operator value" of the Operator contract associated with the voter, which is the total DATA the voter controls through the Operator contract. It roughly equals the DATA delegated to the Operator, plus earnings the Operator has received from the Sponsorship contracts.

This makes it possible to give voting power not only according to DATA token holdings (using the plain erc20-balance-of strategy), but also counting in the DATA tokens the token holders have employed in the Streamr Network incentivization mechanisms.

## Parameters

```json
{
  "symbol": "DATA (operator)",
  "operatorFactoryAddress": "0x935734e66729b69260543Cf6e5EfeB42AC962183"
}
```
