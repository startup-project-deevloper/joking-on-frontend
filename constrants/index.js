export const ICON = "ICON";

export const LOGO = {
  key: "LOGO",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676647/joking_on_logo_alpha_dc489e6f11.png",
};

export const DAI = {
  key: "DAI",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/multi_collateral_dai_dai_logo_e4a899aa3c.svg",
};

export const MKR = {
  key: "MKR",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/maker_mkr_logo_0fc4eca4f4.svg",
};

export const ARROWS_EXPAND = {
  key: "ARROWS_EXPAND",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/arrows_expand_ff9943f973.svg",
};
export const CHAT = {
  key: "CHAT",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/chat_ac188d5da8.svg",
};
export const CHEVRON_DOWN = {
  key: "CHEVRON_DOWN",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/chevron_down_9d60e6b00a.svg",
};
export const CHEVRON_RIGHT = {
  key: "CHEVRON_RIGHT",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/chevron_right_5c37b3a134.svg",
};
export const BELL = {
  key: "BELL",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/bell_255fdd6494.svg",
};
export const CLIPBOARD_COPY_BLANK = {
  key: "CLIPBOARD_COPY_BLANK",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/clipboard_copy_blank_62e6e626a3.svg",
};
export const CLIPBOARD_COPY_CHECKED = {
  key: "CLIPBOARD_COPY_CHECKED",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/clipboard_copy_checked_871dfd98f0.svg",
};
export const CLOUD_UPLOAD = {
  key: "CLOUD_UPLOAD",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/cloud_upload_18589af6fe.svg",
};
export const COG = {
  key: "COG",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/cog_31defde895.svg",
};
export const COLLECTIONS = {
  key: "COLLECTIONS",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/collections_566094166c.svg",
};
export const DOLLAR_SYMBOL = {
  key: "DOLLAR_SYMBOL",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/dollar_sysmbol_ca2878a9de.svg",
};
export const QR_CODE = {
  key: "QR_CODE",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/qr_code_b236fe6e0b.svg",
};
export const SORT_DECENDING = {
  key: "SORT_DECENDING",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/sort_decending_8b3e6036ad.svg",
};
export const SORT_ACENDING = {
  key: "SORT_ACENDING",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/sort_acending_61148e415b.svg",
};
export const STAR = {
  key: "STAR",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/star_d347121e30.svg",
};
export const VERIFIED = {
  key: "VERIFIED",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676911/verified_ee8fe656bb.svg",
};
export const SHARE = {
  key: "SHARE",
  value:
    "https://res.cloudinary.com/joking-on/image/upload/v1627676912/share_f8de1cc026.svg",
};

export const VIDEO = "VIDEO";
export const IMAGE = "IMAGE";

export const ANIMATION = "ANIMATION";

export const PULSE = "PULSE";
export const BOUNCE = "BOUNCE";
export const SPIN = "SPIN";
export const PING = "PING";
export const END = "END";

export const SMALL = "SMALL";
export const MEDIUM = "MEDIUM";
export const LARGE = "LARGE";

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const CENTER = "CENTER";

export const NETWORKS = {
  MainNet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Goerli: 5,
  Kovan: 42,
  Localhost: 1337,
};

export const TOKENS_BY_NETWORK = {
  [NETWORKS.MainNet]: [
    {
      address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
      name: "Maker",
      symbol: "MKR",
      decimals: 18,
      icon: MKR,
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      name: "Dai Stablecoin",
      symbol: "DAI",
      decimals: 18,
      icon: DAI,
    },
  ],
  [NETWORKS.Ropsten]: [
    {
      address: "0xad6d458402f60fd3bd25163575031acdce07538d",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAI,
    },
    {
      address: "0x972a444311a8677b63df192b197f8b8a45126ff6",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
      icon: MKR,
    },
  ],
  [NETWORKS.Rinkeby]: [
    {
      address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAI,
    },
    {
      address: "0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
      icon: MKR,
    },
  ],
  [NETWORKS.Goerli]: [
    {
      address: "0x587b3c7d9e252effb9c857ef4c936e2072b741a4",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAI,
    },
    {
      address: "0xb69a66075b6e73fb8741edf5d2127e8b11a483e5",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
      icon: MKR,
    },
  ],
  [NETWORKS.Kovan]: [
    {
      address: "0xfdf7f21eda1fb8aebed2fc8b0e8f72a8f17cf823",
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAI,
    },
    {
      address: "0xe37974e5784bee9885a6e21888556fb779de600e",
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
      icon: MKR,
    },
  ],
  [NETWORKS.Localhost]: [
    {
      address: process.env.LOCALHOST_DAI_ADDRESS,
      symbol: "DAI",
      name: "Dai",
      decimals: 18,
      icon: DAI,
    },
    {
      address: process.env.LOCALHOST_MKR_ADDRESS,
      symbol: "MKR",
      name: "Maker",
      decimals: 18,
      icon: MKR,
    },
  ],
};
