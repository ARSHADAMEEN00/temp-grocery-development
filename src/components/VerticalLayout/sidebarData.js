function sidebardata() {
  return [
    {
      heading: "General  Manager",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user-detail",
      subTitles: [
        { title: "All General  Managers", routeLink: "/generalmanagers" },
        {
          title: "Create General  Manager",
          routeLink: "/generalmanager/create",
        },
      ],
    },
    {
      heading: "Clients",
      badgeClass: "danger",
      badgeValue: "",
      iconClass: "group",
      subTitles: [
        { title: "All Clients", routeLink: "/clients" },
        {
          title: "Create Clients",
          routeLink: "/client/create",
        },
      ],
    },
    {
      heading: "Quotations",
      badgeClass: "danger",
      badgeValue: "",
      iconClass: "report",
      subTitles: [
        { title: "All Quotations", routeLink: "/quotations" },
        {
          title: "Create Quotation",
          routeLink: "/quotation/create",
        },
      ],
    },

    {
      heading: "Work Orders",
      badgeClass: "danger",
      badgeValue: "",
      iconClass: "cart-alt",
      subTitles: [
        { title: "All Work Orders", routeLink: "/orders" },
        {
          title: "Create Work Order",
          routeLink: "/order/create",
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
      heading: "Store Manager",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user-detail",
      subTitles: [
        { title: "All Store Managers", routeLink: "/storemanagers" },
        {
          title: "Create Store Manager",
          routeLink: "/storemanager/create",
        },
      ],
    },
    {
      heading: "Quality Manager",
      badgeClass: "",
      badgeValue: "",
      iconClass: "shield",
      subTitles: [
        { title: "All Quality Managers", routeLink: "/qualitycheckers" },
        {
          title: "Create Quality Manager",
          routeLink: "/qualitychecker/create",
        },
      ],
    },
    {
      heading: "Salesman",
      badgeClass: "",
      badgeValue: "",
      iconClass: "user",
      subTitles: [
        { title: "All Salesmans", routeLink: "/salesmans" },
        {
          title: "Create Salesman",
          routeLink: "/salesman/create",
        },
      ],
    },





  ]
}

export const mySideBar = sidebardata()
