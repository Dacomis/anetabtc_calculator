export const Footer = () => {
  return (
    <footer className="relative">
      <img
        className="min-w-screen overflow-hidden"
        src={require("./images/clouds.png")}
        alt="anetaBTC logo"
      />
      <div className="min-w-screen flex h-28 justify-between bg-white">
        <div className="ml-2 mt-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://anetabtc.io/"
          >
            <img
              className="absolute bottom-24 w-40 p-1"
              src={require("./images/anetaBTC_logo_text_black.png")}
              alt="anetaBTC logo"
            />
          </a>
          <div className="ml-2 w-96 px-2">
            anetaBTC is a decentralized, secure protocol that allows users to
            unlock the value of their Bitcoin on Ergo and Cardano.
          </div>
        </div>
        <div className="justify-self-end px-5">
          <div className="mb-2 flex">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/anetabtc"
            >
              <img
                className="ml-7 h-10 w-10"
                src={require("./images/discord.png")}
                alt="discord logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/anetaBTC"
            >
              <img
                className="ml-7 h-10 w-10"
                src={require("./images/twitter.png")}
                alt="twitter logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@anetaBTC"
            >
              <img
                className="ml-7 h-10 w-10"
                src={require("./images/medium.png")}
                alt="medium logo"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/anetaBTC"
            >
              <img
                className="ml-7 h-10 w-10"
                src={require("./images/telegram.png")}
                alt="telegram logo"
              />
            </a>
          </div>
          <span className="px-2">anetaBTC is a Singapore based DAO</span>
        </div>
      </div>
    </footer>
  );
};