const sidebarMenuList = [
  {
    label: "Main",
    path: "/dashboard",
    icon: "broadcast",
    isActiveIcon: "broadcast-pin",
    roles: ['systemAdmin', 'admin'],
  },
  {
    label: "Users",
    path: "/users",
    icon: "people",
    roles: ['systemAdmin', 'admin'],
    // subItems: [
    //   {
    //     label: "Email Editor",
    //     path: "/users/email-editor",
    //     icon: "envelope",
    //     roles: ['systemAdmin'],
    //   }
    // ]
  },
  // {
  //   label: "AI",
  //   path: "/ai",
  //   icon: "anthropic",
  //   isActiveIcon: "anthropic",
  //   roles: ['systemAdmin', 'admin'],
  //   subItems: [
  //     {
  //       label: "Knowledge Base",
  //       path: "/ai/knowledge-base",
  //       icon: "claude",
  //       isActiveIcon: "claude",
  //       roles: ["systemAdmin"]
  //     },
  //     {
  //       label: "Chat Logs",
  //       path: "/ai/chat-logs",
  //       icon: "file-earmark-post",
  //       isActiveIcon: "file-earmark-post-fill",
  //       roles: ["systemAdmin"]
  //     },
  //   ]
  // },
  {
    label: "Items",
    path: "/items",
    icon: "tags",
    roles: ['systemAdmin', 'admin'],
  },
  // {
  //   label: "Server",
  //   path: "/server",
  //   icon: "hdd-network",
  //   roles: ['systemAdmin', 'admin'],
  //   subItems: [
  //     {
  //       label: "Server Logs",
  //       path: "/server/server-logs",
  //       icon: "file-earmark-ruled"
  //     },
  //     {
  //       label: "Server Errors",
  //       path: "/server/server-errors",
  //       icon: "exclamation-triangle"
  //     },
  //   ]
  // },
  // {
  //   label: "DB Backups",
  //   path: "/db-backups",
  //   icon: "database",
  //   roles: ['systemAdmin'],
  //   subItems: [
  //     {
  //       label: "database-name",
  //       path: "/db-backups/database-name",
  //       icon: "database"
  //     }
  //   ]
  // },
];

export default sidebarMenuList;