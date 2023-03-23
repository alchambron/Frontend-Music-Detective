import CookieConsent from "react-cookie-consent";
import { NavLink } from "react-router-dom";
import React from "react";

export default function () {
  return (
    <div className="CookieConsent">
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
        Ce site utilise des cookies. Pour en savoir plus, cliquez sur
        <NavLink
          style={{ color: "#FFFFFF" }}
          to="../Privacy"
          className="buttonPrivacy"
        >
          {" "}
          ici{" "}
        </NavLink>
        pour consulter notre politique de confidentialité.
      </CookieConsent>
    </div>
  );
}
