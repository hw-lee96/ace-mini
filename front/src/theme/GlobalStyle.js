// styled-reset 사용방법
import { createGlobalStyle } from "styled-components"; // 글로벌 스타일 적용을 도와주는 styled-components내장 메서드
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
	${reset}
	body {
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
	}

	.compBg { background: ${({ theme }) => theme.compoBgColor} }
	.bgColor { background: ${({ theme }) => theme.bgColor} }
	.ftColor { color: ${({ theme }) => theme.textColor} }
	.recBar { background-color: ${({ theme }) => theme.recommandationBar}}
	.purCard {color : ${({ theme }) => theme.purCard}}
	.recPercentage {background-color : ${({ theme }) => theme.recPercentage}}
	.recText {color :  ${({ theme }) => theme.recText}}

`;
