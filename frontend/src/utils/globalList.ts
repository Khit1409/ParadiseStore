import {
  faAppStore,
  faFacebook,
  faGooglePlay,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const navigationList = [
  { id: 1, content: "Home", url: "/", dropdownMenu: null },
  { id: 2, content: "About", url: "/about", dropdownMenu: null },
  { id: 3, content: "Blog", url: "/blog", dropdownMenu: null },
  { id: 4, content: "Deals", url: "/deal", dropdownMenu: null },
  {
    id: 5,
    content: "Shopping",
    url: "",
    dropdownMenu: [
      {
        id: 1,
        content: "Fashion",
        url: "/",
      },
      {
        id: 2,
        content: "Cars",
        url: "/",
      },
      {
        id: 3,
        content: "Devices",
        url: "/",
      },
      {
        id: 4,
        content: "Household",
        url: "/",
      },
      {
        id: 5,
        content: "All Products",
        url: "/products",
      },
    ],
  },
  { id: 6, content: "Carts", url: "/cart" },
  { id: 7, content: "Orders", url: "/order" },
  { id: 8, content: "My Profile", url: "/profile" },
  { id: 9, content: "Contact", url: "/contact" },
];

// header top
export const leftMenu = [
  { id: 1, icon: faGooglePlay, url: "" },
  { id: 2, icon: faAppStore, url: "" },
];
export const rightMenu = [
  { id: 1, icon: faInstagram, url: "" },
  { id: 2, icon: faFacebook, url: "" },
  { id: 3, icon: faYoutube, url: "" },
];
