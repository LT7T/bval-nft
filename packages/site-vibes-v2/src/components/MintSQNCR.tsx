import { ContractTransaction } from 'ethers';
import React, { FunctionComponent, useState } from 'react';
import { useWallet } from '../hooks/wallet';
import { mintSQNCR } from '../web3/sqncr';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';
import { Connect } from './Connect';
import { Content } from './Content';
import { PageSection } from './PageSection';
import { Title } from './Title';
import { Vibes } from './Vibes';
import { TwoPanel } from './TwoPanel';
import { useProtocol } from '../hooks/protocol';
import { DecimalNumber } from './DecimalNumber';
import { Stats } from './Stats';
import { MarketPrice } from './MarketPrice';

export const MintSQNCR: FunctionComponent = () => {
  const { accountView, library, registerTransactions } = useWallet();
  const { protocolView } = useProtocol();
  const [mintTrx, setMintTrx] = useState<ContractTransaction | null>(null);

  const mint = async () => {
    const trx = await mintSQNCR(library.getSigner());
    registerTransactions(trx);
    setMintTrx(trx);
    await trx.wait();
    setMintTrx(null);
  };

  if (mintTrx !== null) {
    return (
      <>
        <PageSection>
          <Content>
            <Title>Transaction Submitted</Title>
            <p>Your SQNCR is being minted</p>
            <p>😎 Nice work.</p>
            <ButtonGroup>
              <Button externalNavTo={`https://polygonscan.com/tx/${mintTrx.hash}`}>🔎 VIEW transaction</Button>
              <Button navTo="/sqncr">🎛 MANAGE your SQNCRs</Button>
            </ButtonGroup>
          </Content>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <PageSection>
        <Content>
          <Connect>
            <Title>Mint SQNCR</Title>
            <TwoPanel template="7fr 5fr" alignItems="center">
              <div>
                <Content>
                  <p>
                    🎛 A <strong>SQNCR</strong> is an <strong>NFT-based digital product</strong> and a self-soverign
                    modular application platform.
                  </p>
                  <p>
                    🏄‍♀️ It's a personal, tokenized carrier wave for the <Vibes />{' '}
                    <Button navTo="/protocol">protocol</Button>.
                  </p>
                  <p>
                    🌈 Install <strong>shells</strong> to modify your SQNCR's appearance, or install{' '}
                    <strong>modules</strong> to give your SQNCR more functionality.
                  </p>
                </Content>
              </div>
              <div>
                {protocolView && accountView && (
                  <p style={{ textAlign: 'center' }}>
                    <strong>total minted</strong>: {protocolView.sqncr.totalMinted} / ∞
                    <br />
                    <strong>minted by you</strong>: {accountView.sqncrs.length} / {protocolView.sqncr.maxMints}
                    <br />
                    <strong>mint cost</strong>: <DecimalNumber decimals={0} number={protocolView.sqncr.mintCost} />{' '}
                    <Vibes /> ($
                    <MarketPrice amount={protocolView.sqncr.mintCost} price="vibesUsdcPrice" />)
                  </p>
                )}
              </div>
            </TwoPanel>
            <ButtonGroup>
              {accountView?.maxMints > accountView?.mintedSQNCRs ? (
                <Button onClick={() => mint()}>🚀 MINT your SQNCR</Button>
              ) : (
                <Button disabled>max SQNCRs minted</Button>
              )}
            </ButtonGroup>
          </Connect>
        </Content>
      </PageSection>
    </>
  );
};
