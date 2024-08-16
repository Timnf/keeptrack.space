import { KeepTrackApiEvents } from '@app/interfaces';
import { keepTrackApi } from '@app/keepTrackApi';
import { getEl } from '@app/lib/get-el';
import githubPng from '@public/img/icons/github.png';
import { KeepTrackPlugin } from '../KeepTrackPlugin';
import { TopMenu } from '../top-menu/top-menu';

export class SocialMedia extends KeepTrackPlugin {
  dependencies_ = [TopMenu.name];
  constructor() {
    super(SocialMedia.name);
  }

  addHtml() {
    super.addHtml();
    keepTrackApi.register({
      event: KeepTrackApiEvents.uiManagerFinal,
      cbName: this.constructor.name,
      cb: SocialMedia.uiManagerFinal_,
    });
  }

  private static uiManagerFinal_(): void {
    // Bottom Icon
    const githubShareElement = document.createElement('li');

    githubShareElement.innerHTML = keepTrackApi.html`
          <a id="github-share1" class="top-menu-icons" rel="noreferrer" href="https://github.com/thkruz/keeptrack.space/" target="_blank">
            <img
            src="${githubPng}"
            />
          </a>
          `;
    getEl('nav-mobile2', true)?.insertBefore(githubShareElement, getEl('nav-mobile2').firstChild);
  }
}