import React from "react";
import { useService } from "@xstate/react";

import Modal from "react-bootstrap/Modal";

import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import MK1 from "../../images/sunflower/fruit.gif";
import MK2 from "../../images/potato/fruit.gif";
import MK3 from "../../images/beetroot/fruit.gif";
import MK4 from "../../images/pumpkin/fruit.gif";
// import cauliflower from "../../images/cauliflower/fruit.png";
// import parsnip from "../../images/parsnip/fruit.png";
// import radish from "../../images/radish/fruit.png";

import cancel from "../../images/ui/cancel.png";

import { getUpgradePrice } from "../../utils/land";
import { getMarketRate } from "../../utils/supply";

import { Panel } from "./Panel";
import { Message } from "./Message";
import { Button } from "./Button";

import "./UpgradeModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  farmSize: number;
  balance: number;
}

export const UpgradeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  farmSize,
  balance,
}) => {
  const [machineState, send] = useService<
    Context,
    BlockchainEvent,
    BlockchainState
  >(service);
  const [totalSupply, setTotalSupply] = React.useState<number>(1);

  React.useEffect(() => {
    const load = async () => {
      const supply =
        await service.machine.context.blockChain.totalSupply();
      setTotalSupply(supply);
    };

    load();
  }, [isOpen]);

  const onUpgrade = () => {
    send("SAVE", { action: "UPGRADE" });
    onClose();
  };

  const marketRate = getMarketRate(totalSupply);

  const isUnsaved = machineState.context.blockChain.isUnsaved();

  const levelOnePrice = getUpgradePrice({ farmSize, totalSupply });
  const levelTwoPrice = getUpgradePrice({ farmSize, totalSupply });
  const levelThreePrice = getUpgradePrice({ farmSize, totalSupply });
  const levelFourPrice = getUpgradePrice({ farmSize, totalSupply });

  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <Panel>
        <div id="charity-container">
          <span>Upgrade Farm</span>

          {isUnsaved ? (
            <>
              <div className="upgrade-required">
                <Message>
                  Save your farm first
                  <img alt="img" src={cancel} className="insufficient-funds-cross" />
                </Message>
              </div>
              <span id="donate-description">
                You must first save your farm to the blockchain before
                attempting to upgrade.{" "}
              </span>
            </>
          ) : (
            <span id="donate-description">
              Upgrade your farm to unlock new plants and harvestable
              fields.
            </span>
          )}

          <div id="charities">
            {farmSize === 5 && (
              <div>
                <span className="charity-description">
                  Upgrade to 8 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img alt="img" src={MK2} className="upgrade-fruit" />
                  {/* <img alt="img" src={beetroot} className="upgrade-fruit" /> */}
                </div>
                <div className="charity-buttons">
                  <span>{`${levelOnePrice} $SPM`}</span>
                  <Button
                    disabled={isUnsaved || balance < levelOnePrice}
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button>
                </div>
                {balance < levelOnePrice && (
                  <span className="insufficent-upgrade-funds">
                    Insufficent funds
                  </span>
                )}
              </div>
            )}
            {farmSize === 8 && (
              <div>
                <span className="charity-description">
                  Upgrade to 11 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img alt="img" src={MK3} className="upgrade-fruit" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelTwoPrice} $SPM`}</span>
                  <Button
                    disabled={
                      isUnsaved || farmSize < 8 || balance < levelTwoPrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button>
                </div>
                {balance < levelTwoPrice && (
                  <span className="insufficent-upgrade-funds">
                    Insufficent funds
                  </span>
                )}
              </div>
            )}

            {farmSize === 11 && (
              <div>
                <span className="charity-description">
                  Upgrade to 14 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img alt="img" src={MK4} className="upgrade-fruit" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelThreePrice} $SPM`}</span>
                  <Button
                    disabled={
                      isUnsaved ||
                      farmSize < 11 ||
                      balance < levelThreePrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button>
                </div>
                {balance < levelThreePrice && (
                  <span className="insufficent-upgrade-funds">
                    Insufficent funds
                  </span>
                )}
              </div>
            )}

            {/* {farmSize === 14 && (
              <div>
                <span className="charity-description">
                  Upgrade to 17 fields
                </span>
                <div className="upgrade-icons">
                  <span className="charity-description">Unlock:</span>
                  <img alt="img" src={radish} className="upgrade-fruit" />
                </div>
                <div className="charity-buttons">
                  <span>{`${levelFourPrice} $SPM`}</span>
                  <Button
                    disabled={
                      isUnsaved ||
                      farmSize < 14 ||
                      balance < levelFourPrice
                    }
                    onClick={onUpgrade}
                  >
                    Upgrade
                  </Button>
                </div>
                {balance < levelFourPrice && (
                  <span className="insufficent-upgrade-funds">
                    Insufficent funds
                  </span>
                )}
              </div>
            )} */}
          </div>
        </div>
      </Panel>
    </Modal>
  );
};

export const UpgradeOverlay = (props) => (
  <div id="tester" {...props}>
    <Message>Upgrade required</Message>
  </div>
);
