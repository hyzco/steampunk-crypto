import React from 'react'
import { Panel } from '../ui/Panel'

import person from '../../images/characters/mining_person.gif'
import tool from '../../images/characters/mining_tool.gif'
import rock from '../../images/characters/mining_rock.png'

export const Creating: React.FC = () => (
    <Panel>
        <div id="saving">
            Creating...

            <h6>Miners are working hard to create your farm on the blockchain.</h6>

            <div id='mining-animation'>
                <img alt="img" id='mining-gif' src={person} />
                <img alt="img" id='mining-gif' src={tool} />
                <img alt="img" id='mining-rock' src={rock} />
                
            </div>

            <span>Increase the gas price for faster transactions</span>
        </div>
    </Panel>
)
