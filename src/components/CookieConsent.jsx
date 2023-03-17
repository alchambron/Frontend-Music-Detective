import CookieConsent from "react-cookie-consent";
import { NavLink } from "react-router-dom";


export default function () {



  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      declineButtonText="Refuser"
      declineButtonStyle={{
        color: "#111D4A",
        background: "#EFEFD0",
        fontSize: "14px",
        borderRadius: "25px",
      }}
      location="bottom"
      style={{ background: "#111D4A", textAligne: "left", color: "#EFEFD0" }}
      buttonStyle={{
        color: "#111D4A",
        background: "#EFEFD0",
        fontSize: "14px",
        borderRadius: "25px",
      }}
      buttonText="Accepter"
      expires={365}
    >
      Ce site utilise des cookies. Pour en savoir plus,cliquer sur
      <NavLink
        style={{ color: "#FFFFFF" }}
        to="../Privacy"
        className="buttonPrivacy"
      >
        {" "}
        CONSULTEZ{" "}
      </NavLink>
      notre politique de confidentialité.
    </CookieConsent>
  );
}


