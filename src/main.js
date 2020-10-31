let hashMap = JSON.parse(localStorage.getItem('x')) ||
  [{url: 'developer.mozilla.org', logo: 'D', logoText: 'text'},
    {url: 'github.com', logo: 'G', logoText: 'text'}]
const $lastLi = $('.lastLi')
const $liList=$('.siteList')
let simplifyUrl = (url) => {
  return url.replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}
let createAndInsertLi = elements => {
  return $(`<li>
          <div class="site">
            <div class="logo">
              ${elements.url[0]}
            </div>
            <div class="link">
              ${elements.url}
            </div>
            <div class="closeButton">
              <svg class="icon">
              <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
      </li>`).insertBefore($lastLi)
}

let render = () => {
  $liList.find('li:not(.lastLi)').remove()
  hashMap.forEach((elements, index) => {
    const $li = createAndInsertLi(elements)

    $li.on('click', () => {
      window.open('http://' + elements.url)
    })

    $li.on('click', '.closeButton', (e) => {
      e.stopPropagation()
      hashMap.splice(index, 1)
      $li.remove()
      console.log(hashMap)
    })
  })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请输入要添加网站的网址')
    if (url !== '' && url!== null) {
      url = simplifyUrl(url)
      hashMap.push({url: url, logo: url[0], logoType: 'text'})
      render()
    }
  }
)

window.onbeforeunload = () => {
  const stringHash = JSON.stringify(hashMap)
  localStorage.setItem('x', stringHash)
}