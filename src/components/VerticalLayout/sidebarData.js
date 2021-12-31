function sidebardata() {
  return [
    {
      heading: "Production Manager",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user-detail",
      subTitles: [
        { title: "All Production Managers", routeLink: "/productionmanagers" },
        {
          title: "Create Production Manager",
          routeLink: "/productionmanager/create",
        },
      ],
    },
    {
      heading: "Orders",
      badgeClass: "danger",
      badgeValue: "",
      iconClass: "cart-alt",
      subTitles: [
        { title: "All Orders", routeLink: "/orders" },
        {
          title: "Create Order",
          routeLink: "/order/create",
        },
      ],
    },
    {
      heading: "Finished Products",
      badgeClass: "",
      badgeValue: "",
      iconClass: "truck",
      subTitles: [
        {
          title: "Products",
          routeLink: "/product/finished",
        },
        {
          title: "Add Finished Product",
          routeLink: "/product/finished?create",
        },
      ],
    },
    {
      heading: "Store",
      badgeClass: "",
      badgeValue: "",
      iconClass: "store",
      subTitles: [
        {
          title: "Store Supply",
          routeLink: "/store",
        },
        { title: "All Store Items", routeLink: "/stores" },
        {
          title: "Create Store Item",
          routeLink: "/store/create",
        },
      ],
    },
    {
      heading: "Product",
      badgeClass: "",
      badgeValue: "",
      iconClass: "shopping-bags",
      subTitles: [
        { title: "All Products", routeLink: "/products" },
        {
          title: "Create Product",
          routeLink: "/product/create",
        },
      ],
    },
    {
      heading: "Store Manager",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user-detail",
      subTitles: [
        { title: "All Store Manager", routeLink: "/storemanagers" },
        {
          title: "Create Store Manager",
          routeLink: "/storemanager/create",
        },
      ],
    },
    {
      heading: "Supervisor",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user",
      subTitles: [
        { title: "All Supervisor", routeLink: "/supervisors" },
        { title: "Daily Works", routeLink: "/supervisor/dailywork" },
        {
          title: "Create Supervisor",
          routeLink: "/supervisor/create",
        },
      ],
    },
    {
      heading: "Dealers",
      badgeClass: "",
      badgeValue: "",
      iconClass: "analyse",
      subTitles: [
        { title: "All Dealers", routeLink: "/dealers" },
        {
          title: "Create Dealers",
          routeLink: "/dealer/create",
        },
      ],
    },
    {
      heading: "Quality Checker",
      badgeClass: "",
      badgeValue: "",
      iconClass: "shield",
      subTitles: [
        { title: "All Quality Checker", routeLink: "/qualitycheckers" },
        {
          title: "Create Quality Checker",
          routeLink: "/qualitychecker/create",
        },
      ],
    },
  ]
}

export const mySideBar = sidebardata()
