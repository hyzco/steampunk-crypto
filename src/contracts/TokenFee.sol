// SPDX-License-Identifier: MIT
pragma solidity  0.8.11 ;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// Steampunk Game
// Token contract

contract TokenV2 is ERC20, ERC20Burnable {
  address public minter;
  address public owner;
  address public devfee = address(0x35c074627e787c2f83A8B925AB29ff2805aBbf8D);
  uint256 public  fees = 2;
  using SafeMath for uint256;

  event MinterChanged(address indexed from, address to);
  event TaxEvent(address indexed from, uint256 amoun);
 
  constructor() ERC20("denemeSS", "SSG") {
    owner = msg.sender;
  	//_mint(owner, 200000 * 10**super.decimals() );
  }

 function setFees(uint256 f)  public {
    require(msg.sender == owner, "owner only");
    require(f<=2 && f>=0, "Only fee below 2% is allowed.");
       fees=f;
	}

 function setDev(address wallet)  public {
    require(msg.sender == owner, "owner only");
    devfee=wallet;
	}


  function passMinterRole(address farm) public returns (bool) {
    require(minter==address(0) || msg.sender==minter, "You are not minter");
    minter = farm;

    emit MinterChanged(msg.sender, farm);
    return true;
  }
  
  function getOwner() public view returns (address) {
      return owner;
  }

  function mint(address account, uint256 amount) public {
    require(minter == address(0) || msg.sender == minter, "You are not the minter");
		_mint(account, amount);
	}

  function burn(address account, uint256 amount) public {
    require(minter == address(0) || msg.sender == minter, "You are not the minter");
		_burn(account, amount);
	}

  function transfer(address _to, uint256 _amount) 
   public virtual override returns (bool) {
    uint256 fee = _amount.mul(fees).div(100); // Calculate fee
    super.transfer(_to , _amount.sub(fee)  );
    super.transfer(devfee , fee);
    return true;
  }

  function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {

        if (msg.sender == minter) {
            _transfer(sender, recipient, amount);
            return true;
        }

        uint256 fee = amount.mul(fees).div(100); // Calculate fee

        super.transferFrom(sender, recipient, amount.sub(fee));
        super.transferFrom(sender, devfee, fee);
       return true; 
    }
}
