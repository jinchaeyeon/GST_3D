import styled from "styled-components";
import { CLOSED_GNV_WIDTH, GNV_WIDTH } from "./components/CommonString";
import logoSrc from "./img/gst_monitoring_logo_w.png";

type TDataContainer = {
  width?: string;
  height?: string;
};
export const DataContainer = styled.div<TDataContainer>`
  position: absolute;
  letter-spacing: -0.5px;
  right: -90px;
  background-color: #0000006b;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  width: ${(props) => props.width ?? "190px"};
  height: ${(props) => props.height ?? "80px"};

  table {
    width: 100%;
    height: 100%;
  }

  td,
  th {
    font-size: 8px;
    vertical-align: middle;
    text-align: right;
  }
  td {
    font-size: 10px;
    padding-right: 20px;
    font-weight: 900;
  }
  th {
    font-weight: 100;
    color: #ebebeb;
  }

  .tp-detail-tb {
    width: 100%;
    /* height: 70px;
    background-color: #141f2a;
    border: solid 1px #2e3d4c; */

    height: 90px;
    background-color: #000000;
    border-radius: 8px;
  }
  .tp-detail-tb td,
  .tp-detail-tb th {
    font-size: 15px;
    padding: 0px 20px;
  }
  .tp-detail-tb tr:first-child {
    /* background-color: #0c1218; */
  }
  .number {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: fff;
  }
  .sts {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .sts0 {
    color: #000000;
  }
  .sts0 .light {
    background-color: #000000;
  }
  .sts1 {
    color: #51ca00;
  }
  .sts1 .light {
    background-color: #51ca00;
  }
  .sts2 {
    color: #2470ff;
  }
  .sts2 .light {
    background-color: #2470ff;
  }
  .sts3 {
    color: #ff9822;
  }
  .sts3 .light {
    background-color: #ff9822;
  }
  .sts4 {
    color: #ff4444;
  }
  .sts4 .light {
    background-color: #ff4444;
  }
  .sts5 {
    color: #000000;
  }
  .sts5 .light {
    background-color: #000000;
  }
  .sts6 {
    color: #cf5300;
  }
  .sts6 .light {
    background-color: #cf5300;
  }
  .sts7 {
    color: #e044ff;
  }
  .sts7 .light {
    background-color: #e044ff;
  }
  .sts8 {
    color: #bdbdbd;
  }
  .sts8 .light {
    background-color: #bdbdbd;
  }

  .light {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
    margin-right: 5px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  min-height: 40px;
  margin-top: 5px;

  .iot-title {
    font-size: 26px;
  }
`;

export const MainTopContainer = styled(TitleContainer)`
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MainWorkStartEndContainer = styled.div`
  display: flex;
  margin-left: auto;

  input,
  button {
    margin-left: 5px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  border: solid 1px #2289c3;
  color: #2289c3;
  border-radius: 50px;
  width: 180px;
  line-height: 30px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #424242;
`;
type TButtonContainer = {
  flexDirection?: "column" | "row";
};
export const ButtonContainer = styled.div<TButtonContainer>`
  display: flex;

  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  align-items: center;

  input,
  button {
    margin-left: 5px;
  }

  .iot-btn {
    margin-top: 5px;
    margin-right: 10px;
    max-width: 250px;
    width: 100%;
    height: 120px;
    font-size: 32px;
    font-weight: 600;
    box-shadow: none;
  }
  .iot-btn.green {
    background-color: #6fab41;
    border-color: #6fab41;
  }
  .iot-btn.red {
    background-color: #ff4949;
    border-color: #ff4949;
  }
  .iot-btn.gray {
    background-color: gray;
    border-color: gray;
  }
  .iot-btn .k-icon {
    font-size: 32px;
  }
`;

export const BottomContainer = styled(TitleContainer)`
  flex-direction: row-reverse;
  button {
    width: 100px;
    height: 40px;
  }
`;

export const FilterBoxWrap = styled.div`
  padding: 5px 0 10px;
  width: 100%;
`;

export const FilterBox = styled.table`
  /* line-height: 1.5; */
  border: solid 1px #d7d7d7;
  background-color: #fff;
  width: 100%;
  tr th + td {
    min-height: 40px;
  }
  tr th {
    background-color: #fafafa;
    border: solid 1px #d7d7d7;
    width: 120px;
    color: #333333;
    font-weight: 400;
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
  }
  tr td {
    background-color: #ffffff;
    border: solid 1px #d7d7d7;
    width: 270px;
    text-align: center;
    padding: 5px;
    position: relative;
    vertical-align: middle;
  }
  .filter-item-wrap {
    display: flex;
    align-items: center;
  }
  .k-radio-list.k-list-horizontal {
    justify-content: center;
  }

  .PR_A3000W tr th,
  .PR_A3000W tr td {
    height: 80px;
    font-size: 26px;
    font-weight: 600;
  }
  .PR_A3000W tr th {
    font-size: 22px;
  }

  .PR_A3000W tr td .k-input-md,
  .PR_A3000W tr td .k-picker-md {
    height: 65px;
    font-size: 26px;
    font-weight: 600;
    padding-left: 10px;
  }

  @media (max-width: 768px) {
    tr {
      display: flex;
      flex-direction: column;
    }
    tr th,
    tr td {
      width: 100%;
      border: none;
    }
    tr th {
      min-height: 35px;
      line-height: 35px;
    }
  }
`;

type TFormBoxWrap = {
  border?: boolean;
};
export const FormBoxWrap = styled.div<TFormBoxWrap>`
  margin: 5px 0 10px;
  width: 100%;
  padding: 10px;
  border: ${(props) =>
    props.border ? "solid 1px rgba(0, 0, 0, 0.08);" : undefined};
`;
export const FormBox = styled.table`
  /* line-height: 1.5; */
  /* border: solid 1px #d7d7d7;
  background-color: #fff; */
  width: 100%;
  tr th + td {
    min-height: 40px;
  }
  tr th {
    /* background-color: #f5f5f8;
    border: solid 1px #d7d7d7; */
    min-width: 120px;
    color: #333333;
    font-weight: 400;
    font-size: 13px;
    text-align: right;
    vertical-align: middle;
    padding-right: 10px;
  }
  tr td {
    /* background-color: #ffffff;
    border: solid 1px #d7d7d7; */
    width: 270px;
    text-align: center;
    padding: 5px;
    position: relative;
    vertical-align: middle;
  }
  /* .filter-item-wrap {
    display: flex;
    align-items: center;
  } */
  .k-radio-list.k-list-horizontal {
    justify-content: center;
    border: solid 1px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
  @media (max-width: 768px) {
    tr {
      display: flex;
      flex-direction: column;
    }
    tr th,
    tr td {
      width: 100%;
      border: none;
    }
    tr th {
      min-height: 35px;
      line-height: 35px;
    }
  }
`;

type TGridContainerWrap = {
  flexDirection?: "column" | "row" | "row-reverse" | "column-reverse";
  maxWidth?: string;
  height?: string;
};

export const GridContainerWrap = styled.div<TGridContainerWrap>`
  display: flex;
  gap: ${(props) => (props.flexDirection === "column" ? "0" : "15px")};
  justify-content: space-between;
  flex-direction: ${(props) => props.flexDirection};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

type TGridContainer = {
  maxWidth?: string;
  minHeight?: string;
  clientWidth?: number;
  height?: string;
  width?: string;
  inTab?: boolean;
  margin?: TMargin;
};

type TMargin = {
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
};

export const GridContainer = styled.div<TGridContainer>`
  flex-direction: column;
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
  width: ${(props) =>
    props.width
      ? props.width
      : props.clientWidth
      ? "calc(" +
        props.clientWidth +
        "px - " +
        (props.inTab ? 65 : 0) + //65: 탭 마진
        "px - 150px)" //150: 기본 마진
      : ""};

  height: ${(props) => props.height};
  margin-top: ${(props) => (props.margin ? props.margin.top ?? "" : "")};
  margin-bottom: ${(props) => (props.margin ? props.margin.bottom ?? "" : "")};
  margin-left: ${(props) => (props.margin ? props.margin.left ?? "" : "")};
  margin-right: ${(props) => (props.margin ? props.margin.right ?? "" : "")};

  .k-grid,
  .k-scheduler {
    margin: 5px 0;
  }
  .k-grid .k-command-cell {
    text-align: center;
  }
  .k-grid td {
    white-space: nowrap; //그리드 셀 말줄임표
  }
  .k-chart.QC_A0120_TAB1 {
    width: 400px;
  }
  .k-chart.QC_A0120_TAB2 {
    width: 400px;
  }
  .k-chart.QC_A0120_TAB3 {
    width: 600px;
  }
  .k-radio-list.k-list-horizontal {
    justify-content: center;
  }
  /* .required {
    background-color: #fff0ef;
  } */

  @media (max-width: 768px) {
    width: auto;
  }
`;

export const GridTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #424242;
`;

export const PrimaryP = styled.p`
  color: #2289c3;
`;

export const PortraitPrint = styled.div`
  @media print {
    @page {
      size: 29.7cm 21cm;
      margin-top: 1cm;
      margin-right: 1cm;
      margin-bottom: 0cm;
      margin-left: 1cm;
    }
    /* html, body { border:0; margin:0; padding:0; margin-top:0px; }
	 */

    .printable {
      display: block;
    }

    #non-printable {
      display: none;
    }
  }
`;
export const LandscapePrint = styled.div`
  @media print {
    @page {
      size: 29.7cm 21cm;
      margin-top: 1cm;
      margin-right: 1cm;
      margin-bottom: 0cm;
      margin-left: 1cm;
    }
    /* html, body { border:0; margin:0; padding:0; margin-top:0px; }
	 */

    .printable {
      display: block;
    }

    #non-printable {
      display: none;
    }
  }
`;

export const GridTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 5 0px; */
  min-height: 30px;
`;

export const ButtonInInput = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const ButtonInGridInput = styled.div`
  position: absolute;
  top: 3px;
  right: 12px;
`;

export const ButtonInFieldWrap = styled.div`
  position: relative;
`;

export const ButtonInField = styled(ButtonInInput)`
  top: -7px;
  right: 0;
`;

type TFieldWrap = {
  fieldWidth?: string;
};
export const FieldWrap = styled.div<TFieldWrap>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > span {
    margin: 0 5px;
  }
  > span:first-child {
    margin-left: 0;
  }
  > span:last-child {
    margin-right: 0;
  }
  > .k-form-field {
    width: ${(props) => props.fieldWidth ?? ""};
  }
  .k-picker,
  .k-picker:hover,
  .k-picker.k-hover {
    background-color: #ffffff;
  }
`;

export const LoginBox = styled.div`
  height: 100%;

  .container {
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 600px;
    padding: 50px 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .k-form {
    width: 100%;
  }
  .copy-right {
    color: rgba(255, 255, 255, 0.3);
    height: 50px;
    display: flex;
    align-items: flex-end;
  }

  .k-input {
    background-color: rgba(255, 255, 255, 0.25);
    height: 45px;
    color: black;
    margin-top: 5px;
    border-radius: 5px;
    padding: 15px;
    font-size: 16px;
    border: 0;
    color: #fff;
  }
  .k-label {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .k-button.login-btn {
    width: 100%;
    margin-top: 40px;
    height: 50px;
    border-radius: 0;
    font-size: 16px;
    font-weight: 900;
    border-radius: 5px;
    background-color: #2db3b7;
    border: 0;
  }
  .k-button.login-btn:hover {
    background-color: #319092;
  }

  .logo {
    background: url(${logoSrc});
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 55px;
    background-position: left;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .container {
      width: 100%;
      padding: 20px 40px;

      height: auto;
      bottom: 0;
      top: auto;
    }
    .item {
      align-items: flex-start;
      margin-top: 15%;

      margin-top: 0;
    }

    .k-form .k-label {
      font-size: 14px;
    }
    .k-input {
      height: 40px;
      margin-top: 0;
    }
    .logo {
      height: 45px;
      background-position: center;
      margin-bottom: 0;
    }

    .copy-right {
      font-size: 12px;
      justify-content: center;

      height: 30px;
    }

    .k-form .k-form-fieldset {
      margin-top: 15px;
    }

    .k-button.login-btn {
      margin-top: 35px;
    }
  }
`;

export const RadioButtonBox = styled.div`
  display: flex;
`;

export const ApprovalBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 350px;
  height: 60px;
  margin-left: 15px;
  border: solid 1px #dfdfdf;
  background-color: #fafafa;

  > div:nth-child(1) > div:last-child {
    background-color: #ffb849;
  }
  > div:nth-child(2) > div:last-child {
    background-color: #49c9ff;
  }
  > div:nth-child(3) > div:last-child {
    background-color: #ff8549;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-left: 0;
    width: 100%;
  }
`;

export const ApprovalInner = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 33%;
  height: 100%;
  align-items: center;

  :nth-child(2) {
    border-right: 0;
    border-left: 0;
  }
  > div:last-child {
    width: 40px;
    line-height: 35px;
    border-radius: 5px;
    vertical-align: middle;
    text-align: center;
    font-weight: 600;
    color: #fff;
  }
`;

export const InfoList = styled.ul`
  display: flex;
  gap: 20px;
  display: flex;
  flex-direction: column;
  border: solid 1px #ebebeb;
  padding: 30px;
  border-radius: 15px;
  margin-top: 35px;

  .k-form-fieldset {
    margin: 0;
    border-top: solid 1px gainsboro;
    padding-top: 40px;
    margin-top: 20px;
    padding-bottom: 10px;
  }

  .k-form-field {
    margin: 0;
  }

  .k-form-field > .k-label {
    display: flex;
    justify-content: center;
    padding-top: 0;
  }

  .big-input {
    height: 50px;
    border: solid 1px #2289c3;
    border-radius: 10px;
    color: #2289c3;
    text-align: right;
    padding-left: 15px;
    font-size: 18px;
    font-weight: 600;
  }
`;
export const InfoTitle = styled.p`
  text-align: center;
  color: #727272;
  padding-bottom: 10px;
`;
export const InfoItem = styled.li`
  display: flex;
  justify-content: space-between;
`;
export const InfoLabel = styled.span``;
export const InfoValue = styled.span`
  font-weight: 600;
`;

export const NumberKeypad = styled.div`
  width: 100%;
  padding: 1%;
  border: solid 1px #f0f0f0;
  display: inline-block;
  margin: 5px 0;
  margin-left: 5px;
`;
export const NumberKeypadRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NumberKeypadCell = styled.div`
  border: solid 1px #2289c3;
  color: #2289c3;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  margin: 1%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: #2289c3;
    color: #ffffff;
  }
  :focus {
    background-color: #2289c3;
    color: #ffffff;
  }
  :active {
    background-color: #2289c3;
    color: #ffffff;
  }
`;

/*=========================================================================
	// PanelBarNavContainer 시작
=========================================================================*/

type TWrapper = {
  isMobileMenuOpend: boolean;
};

export const Wrapper = styled.div<TWrapper>`
  display: flex;
  width: 100%;
  height: 100%;
  //overflow: ${(props) => (props.isMobileMenuOpend ? "hidden" : "auto")};
`;

type TGnv = TWrapper;
export const Gnv = styled.div<TGnv>`
  min-width: ${GNV_WIDTH}px;
  text-align: center;

  height: 100%;
  background-color: #151515;

  .logout span {
    color: #fff;
  }
  .logout > .k-link {
    justify-content: center;
  }

  .k-panelbar-item-icon.k-icon.k-i-gear {
    color: #fff;
  }

  /*=========================================================================
	미디어 쿼리
	##Device = 모바일
	##Screen = 768px 이하 해상도 모바일
  =========================================================================*/
  @media (max-width: 768px) {
    display: ${(props) => (props.isMobileMenuOpend ? "block" : "none")};
    z-index: 100000000;
    position: fixed;

    h1 {
      display: none;
    }
  }
`;
export const SmallGnv = styled.div`
  padding-top: 10px;
  border-right: solid 1px #646464;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

type ContentType = {
  isMenuOpen: boolean;
};
export const Content = styled.div<ContentType>`
  width: calc(
    100% - ${(props) => (props.isMenuOpen ? GNV_WIDTH : CLOSED_GNV_WIDTH)}px
  );
  position: relative;

  .small-info {
    right: 50px;
    bottom: 20px;
    color: rgba(255, 255, 255, 0.3);
    position: absolute;
    font-size: 14px;
  }
  .camera-controller {
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 999999;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    padding: 5px;
  }
  /*=========================================================================
  미디어 쿼리
  ##Device = 모바일
  ##Screen = 768px 이하 해상도 모바일
  =========================================================================*/
  @media (max-width: 768px) {
    width: 100%;

    .small-info {
      right: 20px;
      font-size: 12px;
    }
    .camera-controller {
      right: 20px;
    }
  }
`;

export const PageWrap = styled.div`
  height: 100%;
`;

export const AppName = styled.h1`
  font-size: 16px;
  color: #2289c3;
  font-weight: 600;
  /* padding: 10px 0; */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 20px;
  height: 60px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0;
    width: 100px;
    height: 50px;
  }
`;

export const LoginAppName = styled(AppName)`
  cursor: auto;
  padding: 0;
  border-right: none;
  background-color: transparent;
  font-size: 22px;
  gap: 5px;
  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
    height: 50px;
  }
`;

export const TopTitle = styled.div`
  min-width: ${GNV_WIDTH}px;
  /* text-align: center; */
  padding: 0 15px;
  display: none;
  justify-content: space-between;
  align-items: center;

  button {
    height: 30px;
  }

  /*=========================================================================
  미디어 쿼리
  ##Device = 모바일
  ##Screen = 768px 이하 해상도 모바일
  =========================================================================*/
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    z-index: 1;
    width: 100%;
  }
`;

type TModal = TGnv;
export const Modal = styled.div<TModal>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isMobileMenuOpend ? "block" : "none")};
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999999;
`;
/*=========================================================================
	// PanelBarNavContainer 종료
=========================================================================*/
type TLogo = { size: string };

export const Logo = styled.div<TLogo>`
  background: url(${logoSrc});
  background-size: contain;
  background-repeat: no-repeat;
  /* width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-position: center; */
  width: 100%;
  height: 65px;
  background-position: left;
`;
