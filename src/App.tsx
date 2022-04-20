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

function App() {
  return (
    <Refine
      notificationProvider={notificationProvider}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
      Header={Header}
      Sider={Sider}
      Footer={Footer}
      Layout={Layout}
      OffLayoutArea={OffLayoutArea}
    />
  );
}

export default App;
