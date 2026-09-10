
async function loadSearchData() {
  // 1. URL 쿼리 파라미터에서 search 값 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  // DOM 요소 선택
  const nameEl = document.getElementById('name');
  const imgEl = document.getElementById('img');
  const infoEl = document.getElementById('info');

  // URL에 ?search= 값이 없으면 중단
  if (!searchQuery) return;

  try {
    // 2. info.json 파일 불러오기
    const response = await fetch('info.json');
    if (!response.ok) throw new Error('JSON 로드 실패');

    const dataList = await response.json();

    // 3. JSON 배열 내에서 name이 search 값과 일치하는 항목 찾기 (대소문자 구분 없음)
    const matchedData = dataList.find(
      item => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    // 4. 데이터 표시하기
    if (matchedData) {
      nameEl.textContent = matchedData.name;
      infoEl.textContent = matchedData.info;

      // JSON에 img 속성이 있는 경우 이미지 표시
      if (matchedData.img) {
        imgEl.src = matchedData.img;
        imgEl.alt = matchedData.name;
        imgEl.style.display = 'block';
      }
    } else {
      nameEl.textContent = '정보를 찾을 수 없습니다.';
    }
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// 페이지 로드시 실행
loadSearchData();
