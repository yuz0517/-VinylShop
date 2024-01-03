
import {
    Background_Gray,
  } from "../../styled-component/style";
function Agreement_1() {
  //개인정보 수집 이용 동의서
  return (
    <Background_Gray>
      <p>
        저희는 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를
        안전하게 처리하는데 최선을 다하고 있습니다. 아래의 내용을 확인 후
        동의하여 주시기 바랍니다.
      </p>
      <table >
        <tr>
          <td>수집 목적</td>
          <td>수집 및 이용 항목</td>
          <td>보유 및 이용 기간</td>
        </tr>
        <tr>
          <td >
            2• 서비스 및 상품 제공에 관한 계약 이행 및 요금정산 • 고객 상담 및
            불만, 민원 사무 처리 • 판매자와 구매자간 거래의 원활한 진행, 본인
            의사의 확인 • 상품∙서비스 이용 실적 정보 통계∙분석 • 상품∙서비스
            개선 및 추천, 불법∙부정 이용 방지
          </td>
          <td>구매자 정보(이름, 휴대폰 번호, 주소, 공동현관 비밀번호)<br/>
            수령인 정보(이름, 휴대폰 번호, 주소, 국적, 공동현관 비밀번호)
          </td>
          <td>탈퇴 후 파기됩니다.</td>
        </tr>
      </table>
    </Background_Gray>
  );
}

export default Agreement_1;
