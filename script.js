
document.addEventListener('DOMContentLoaded', () => {
  loadSearchData();
});

async function loadSearchData() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  const nameEl = document.getElementById('name');
  const imgEl = document.getElementById('img');
  const infoEl = document.getElementById('info');

  // URL 파라미터가 없는 경우
  if (!searchQuery) {
    //alert('URL에 ?search= 서비스명 입력이 없습니다.');
    if (nameEl) nameEl.textContent = '검색어를 입력해 주세요.';
    return;
  }

  try {
    // 상대 경로로 info.json 호출
    const response = await fetch('./info.json');
    
    if (!response.ok) {
      throw new Error(`파일을 불러오지 못했습니다. (상태 코드: ${response.status})`);
    }

    const dataList = await response.json();

    const matchedData = dataList.find(
      item => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedData) {
      if (nameEl) nameEl.textContent = matchedData.displayName || matchedData.name;

      let contentHtml = `<p><strong>특징:</strong> ${matchedData.color}</p>`;
      if (matchedData.free) contentHtml += `<p><strong>무료:</strong> ${matchedData.free}</p>`;
      if (matchedData.paid) contentHtml += `<p><strong>유료:</strong> ${matchedData.paid}</p>`;
      if (matchedData.free_paid) contentHtml += `<p><strong>요금:</strong> ${matchedData.free_paid}</p>`;

      if (infoEl) infoEl.innerHTML = contentHtml;

      if (matchedData.img && imgEl) {
        imgEl.src = matchedData.img;
        imgEl.alt = matchedData.displayName || matchedData.name;
        imgEl.style.display = 'block';
      } else if (imgEl) {
        imgEl.style.display = 'none';
      }
    } else {
      //alert(`'${searchQuery}'에 해당하는 데이터를 JSON에서 찾을 수 없습니다.`);
      if (nameEl) nameEl.textContent = '정보를 찾을 수 없습니다.';
    }
  } catch (error) {
    // 에러 발생 시 알림창 띄우기
    //alert(`오류 발생:\n${error.message}`);
    if (nameEl) nameEl.textContent = '데이터 로드 실패';
  }
}
