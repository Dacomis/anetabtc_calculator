export const Footer = () => {
  return (
    <footer className="relative">
      <img
        className="min-w-screen overflow-hidden"
        src={require("./images/clouds.png")}
        alt="anetaBTC logo"
      />
      <div className="min-w-screen flex h-32 flex-col content-center bg-white md:flex-row md:justify-between lg:justify-between">
        <div className="ml-2 mt-7 md:w-7/12 lg:w-3/12">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://anetabtc.io/"
          >
            <img
              className="absolute bottom-24 w-36"
              src={require("./images/anetaBTC_logo_text_black.png")}
              alt="anetaBTC logo"
            />
          </a>
          <div className="my-2 px-2 md:w-9/12">
            anetaBTC is a decentralized, secure protocol that allows users to
            unlock the value of their Bitcoin on Ergo and Cardano.
          </div>
        </div>
        <div className="self-center">
          <div className="mb-4 flex">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/anetabtc"
            >
              <img
                className="mx-4 h-10 w-10"
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
                className="mx-4 h-10 w-10"
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
                className="mx-4 h-10 w-10"
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
                className="mx-4 h-10 w-10"
                src={require("./images/telegram.png")}
                alt="telegram logo"
              />
            </a>
          </div>
          <span className="invisible md:visible md:ml-2">
            anetaBTC is a Singapore based DAO
          </span>
        </div>
      </div>
    </footer>
  );
};
