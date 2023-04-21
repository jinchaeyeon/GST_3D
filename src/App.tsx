import { RecoilRoot, useRecoilValue } from "recoil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./index.scss";
import { createGlobalStyle } from "styled-components";
import PanelBarNavContainer from "./components/PanelBarNavContainer";
import AuthRoute from "./components/AuthRoute";
import Login from "./routes/Login";
import Main from "./routes/Main";
import PR_M1000W_290 from "./routes/PR_M1000W_290";
import { isMobileMenuOpendState } from "./store/atoms";
import Test from "./routes/Test";

type TGlobalStyle = {
  isMobileMenuOpend: boolean;
};
const GlobalStyle = createGlobalStyle<TGlobalStyle>`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;  
  overflow: ${(props) => (props.isMobileMenuOpend ? "hidden" : "auto")};
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
}
a {
  text-decoration:none;
}

.k-grid .k-grid-header .k-header .k-cell-inner > .k-link {
  justify-content: center; /*공통설정 : 그리드 헤더 텍스트 중앙정렬*/
}

.k-window{
  z-index: 10100 !important; /* 버그 : 메뉴바가 window 위로 올라오는 현상 수정  */
}

ul.required,
ul.required:hover,
ul.required.k-hover,
span.required,
span.required:hover,
span.required.k-hover,
input.required,
input.required:hover,
input.required.k-hover {
  background-color: #fff0ef;
}
ul.readonly,
span.readonly,
input.readonly {
  background-color: #efefef;
}
.k-radio-label{
  font-size:14px;
  line-height: 1.4285714286; 
}

// 그리드 행높이 조절 
.k-grid tbody tr,
.k-grid tbody tr td,
.k-grid td.k-state-selected, 
.k-grid td.k-selected, 
.k-grid tr.k-state-selected > td, 
.k-grid tr.k-selected > td{
  height: 34px;
  padding-top: 0;
  padding-bottom: 0;
}

.k-tabstrip > .k-content.k-active,
.k-tabstrip > .k-content.k-active > div.k-animation-container{
  width: inherit;
}

`;

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <AppInner></AppInner>
    </RecoilRoot>
  );
  //}
};
const AppInner: React.FC = () => {
  const isMobileMenuOpend = useRecoilValue(isMobileMenuOpendState);

  return (
    <>
      <GlobalStyle isMobileMenuOpend={isMobileMenuOpend} />
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <PanelBarNavContainer>
            {/* 메인 홈 */}
            <AuthRoute path="/Home" component={Main} exact />
            <AuthRoute path="/PR_M1000W_290" component={PR_M1000W_290} exact />
            <AuthRoute path="/Test" component={Test} exact />
          </PanelBarNavContainer>
        </Switch>
      </Router>
    </>
  );
  //}
};
export default App;
