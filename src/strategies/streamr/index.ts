import { BigNumberish } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import { Multicaller } from '../../utils';

export const author = 'streamr-dev';
export const version = '0.2.0';

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

const abi = [
  'function operators(address owner) external view returns (address)', // in OperatorFactory, returns operator contract address
  'function valueWithoutEarnings() external view returns (uint)' // in Operator contract
];

export async function strategy(
  space,
  network,
  provider,
  addresses: string[],
  options,
  snapshot
): Promise<Record<string, number>> {
  const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
  const factory = options.operatorFactoryAddress;

  // find the Operator contract deployed by the DATA token holder, will return ADDRESS_ZERO if not found
  const getContractOf = new Multicaller(network, provider, abi, { blockTag });
  for (const voter of addresses) {
    getContractOf.call(voter, factory, 'operators', [voter]);
  }
  const contractOf: Record<string, string> = await getContractOf.execute();

  // find the DATA tokens staked through the Operator contract (Operator value)
  const getOperatorValueOf = new Multicaller(network, provider, abi, {
    blockTag
  });
  for (const voter of addresses) {
    if (contractOf[voter] != ADDRESS_ZERO) {
      getOperatorValueOf.call(
        voter,
        contractOf[voter],
        'valueWithoutEarnings',
        []
      );
    }
  }
  const operatorValueOf: Record<string, BigNumberish> =
    await getOperatorValueOf.execute();

  return Object.fromEntries(
    addresses.map((voter) => [
      voter,
      parseFloat(formatEther(operatorValueOf[voter] ?? '0'))
    ])
  );
}
