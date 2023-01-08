import VisaLogo from "../icons/cardProviders/visa.svg";
import AmexLogo from "../icons/cardProviders/amex.svg";
import DiscoverLogo from "../icons/cardProviders/discover.svg";
import MastercardLogo from "../icons/cardProviders/mastercard.svg";
import MaestroLogo from "../icons/cardProviders/maestro.svg";
import BankLogo from "../icons/bank.svg";

const fetchLogo = (brand: string) => {
  let logo = "";
  switch (brand) {
    case "amex":
      logo = AmexLogo;
      break;
    case "visa":
      logo = VisaLogo;
      break;
    case "mastercard":
      logo = MastercardLogo;
      break;
    case "maestro":
      logo = MaestroLogo;
      break;
    case "discover":
      logo = DiscoverLogo;
      break;
    case "bank":
      logo = BankLogo;
      break;
    default:
    // code block
  }
  return { logo };
};

export { fetchLogo };
