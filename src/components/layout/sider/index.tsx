import React, { useState } from "react";

import {
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useNavigation,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Icons, useMenu } from "@pankod/refine-antd";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

const { UnorderedListOutlined } = Icons;

export const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { mutate: logout } = useLogout();
  const Title = useTitle();
  const { SubMenu } = Menu;

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const { push } = useNavigation();
  const breakpoint = Grid.useBreakpoint();

  const isMobile = !breakpoint.lg;

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={name}
            icon={icon ?? <UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess key={route} resource={name.toLowerCase()} action="list">
          <Menu.Item
            key={selectedKey}
            onClick={() => {
              push(route ?? "");
            }}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            {label}
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      collapsedWidth={isMobile ? 0 : 80}
      breakpoint="lg"
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        onClick={({ key }) => {
          if (key === "logout") {
            logout();
            return;
          }

          if (!breakpoint.lg) {
            setCollapsed(true);
          }

          push(key as string);
        }}
      >
        {renderTreeView(menuItems, selectedKey)}
      </Menu>
    </AntdLayout.Sider>
  );
};
