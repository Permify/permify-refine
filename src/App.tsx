import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "components/layout";

//users data
import users from "./data/users.json";

//permify client
import { PermifyClient } from "@permify/permify-service-js";

const permify = new PermifyClient({
  workspace_id: "workspace_id",
  public_key: 'public_token'
})

function App() {
  const role = localStorage.getItem("role")
  const user = users.find(user => user.roles[0].guard_name === role) ?? users[0]   
 
  console.log("role_user", user);
  return (
    <Refine
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      accessControlProvider={{
        can: async ({ resource, action, params }) => {
          if (action === "delete" || action === "edit" || action === "show") {
            return Promise.resolve({
              // isAuthorized(userId, policyName, actionAlias, resourceId?, resourceType?)
              can: await permify.isAuthorized(user.id, resource, action, params.id.toString(), resource)
            });
          }

          return Promise.resolve({
            can: await permify.isAuthorized(user.id, resource, action)
          });
        },
      }}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
      Title={Title}
      Header={() => <Header role={user.roles[0].guard_name} />}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
}

export default App;
