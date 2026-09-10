
async function loadSearchData() {
  // 1. URL 쿼리 파라미터에서 search 값 가져오기 (?search=chatgpt)
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  // DOM 요소 선택
  const nameEl = document.getElementById('name');
  const imgEl = document.getElementById('img');
  const infoEl = document.getElementById('info');

  // URL에 search 파라미터가 없으면 실행 중단
  if (!searchQuery) return;

  try {
    // 2. info.json 불러오기
    const response = await fetch('info.json');
    if (!response.ok) throw new Error('JSON 파일 로드 실패');

    const dataList = await response.json();

    // 3. JSON 배열에서 name 항목 비교 (대소문자 구분 없음)
    const matchedData = dataList.find(
      item => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    // 4. 데이터 화면 출력
    if (matchedData) {
      // 서비스명 (displayName이 있으면 사용, 없으면 기본 name)
      nameEl.textContent = matchedData.displayName || matchedData.name;

      // 상세 내용 구성
      let contentHtml = `<p><strong>특징:</strong> ${matchedData.color}</p>`;

      if (matchedData.free) {
        contentHtml += `<p><strong>무료:</strong> ${matchedData.free}</p>`;
      }
      if (matchedData.paid) {
        contentHtml += `<p><strong>유료:</strong> ${matchedData.paid}</p>`;
      }
      if (matchedData.free_paid) {
        contentHtml += `<p><strong>요금:</strong> ${matchedData.free_paid}</p>`;
      }

      infoEl.innerHTML = contentHtml;

      // 이미지 처리
      if (matchedData.img) {
        imgEl.src = matchedData.img;
        imgEl.alt = matchedData.displayName || matchedData.name;
        imgEl.style.display = 'block';
      } else {
        imgEl.style.display = 'none';
      }
    } else {
      nameEl.textContent = '정보를 찾을 수 없습니다.';
      infoEl.textContent = '해당 서비스에 대한 정보가 JSON에 존재하지 않습니다.';
      imgEl.style.display = 'none';
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// 스크립트 실행
loadSearchData();
