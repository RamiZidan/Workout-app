import LayoutContainer from "./Layout/Layout"
import { useRef, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { store } from "./app/store";
import { Provider } from 'react-redux'
import MainRouter from "./routes/MainRouter";
const App = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const modalContainerRef = useRef();
  return (
    <>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
          getPopupContainer={() => modalContainerRef.current as HTMLElement}
          >
          <div ref={modalContainerRef}></div>
          <MainRouter/>
        </ConfigProvider>
      </Provider>
    </>
  )
}

export default App