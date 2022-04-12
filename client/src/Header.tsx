export const Header = () => {
  return (
    <header className="relative">
      <div className="min-w-screen h-8 bg-white"></div>
      <img
        className="min-w-screen rotate-180 overflow-hidden"
        src={require("./images/clouds.png")}
        alt="clouds header"
      />
      <a target="_blank" rel="noopener noreferrer" href="https://anetabtc.io/">
        <img
          className="absolute top-0 w-32 p-1 md:w-40 lg:w-48"
          src={require("./images/anetaBTC_logo_text_black.png")}
          alt="anetaBTC logo"
        />
      </a>
    </header>
  );
};
