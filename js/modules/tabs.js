export function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  const hideTabContent = function () {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(tab => tab.classList.remove(activeClass));
  };

  const showTabContent = function (i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (e) {
    const target = e.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((el, i) => {
        if (target == el) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
