import { inject, TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MainService } from "./main.service";

describe("MainService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
      providers: [ToastrService, MainService]
    });
  });

  it("should be created", inject([MainService], (service: MainService) => {
    expect(service).toBeTruthy();
  }));

  it("load error", inject([MainService], (service: MainService) => {
    localStorage.clear();
    const ret = service.load();
    expect(ret).toBeFalsy();
  }));

  it("save and load", inject([MainService], (service: MainService) => {
    service.save();
    const ret = service.load();
    expect(ret).toBeTruthy();
  }));

  // it("Import PLAYFAB", inject([MainService], (service: MainService) => {
  //   const save =
  //     "N4IgriBcDaoJZRAMxAGhAR0QRgOwBYA6ANgFYAmUgZlyoAZtT8BOZgDjXCgBcAnMAKboAhlGgBdAL6p4iAO6dRMKTJAJIIAMacIkPoJFjx6AHY9+A6bI0BnRUatrEZwzGsgAQiEfqQAFW9VXwVJFXcsdCwNbB1zAxAlWCcNLx9EALSNELDkkAAbTiiQPFJCNmIqcli9C1ck31Sc3wA5ezdc1KD0wPdszJAABTb6xE73DK6s7ybEAEVh90b+3gWOntyJ3un+gC9VhvXfTdy+yZAAT33R7bOBQpxmav0hBLFxw-kPlPvojnQAEzilhmGgAFk9aq92kcviAQmdGqYgf0EHV3v14Ysbu4AFpXDTHYKwpZnTQAI3x-lhmLWoX6NgpaI21OJ2NyAA9KYTPv0Se5QQomTCMay6WcbIKoSMCSzeWzfKCIELuiK5WL3ABbSWJdFnGkHdW5UTK779blTQ2+RlSrFm2UgkAayljZmqh2Ak2eWHmuHyxAAQWd3vtcs9LuFer9GgAokG7W7+gARONnH2ndwANxTuq2lsQADVs67I3mNAB7IsR3MOgAOlZVJYdwgA4vWZQmzmTW2Hgx3Nd2bbTUyGzv8BzqhzmTlGQP7x29J8Xq7z59DrvHG-1o6vpV6N8uzomd7bh33chnj4uq9PSyB85eDafN2cyw-10+D+4a2-TR+b03mx-Pc-yJW8uyA8MG0-XINUAtsqTPXwxwg3tn3cOcUP3f8V0wkCeQdbdcKnUCHSPIil2ws4L3I68SP6e8aKgyj3FfRj2zQ3JvzYhCON8ABZJAqGGB0BKqOoRKQGJxP6Pi5CE6SzlksSpREuQpJUmTNHkjTFM0ZTEhEzR1IMmSbG0kzFJsfSHEs4ybPcAAxeC0xnAB1ZyR3cABhDzEMQABlXzeMQJBAp7W85DCwcDQdTQoonGL+jyFBwuCjQNXBVLoN8GxMui99ssQAAJLxwodIr5jK-oa14AQbG4YT+m4OANTuaTjBABrIFALrdzyYQKSa3hhAzAQCmq2r6rgABzO5+mEMBuDLDwwEufoNWEeqBF4NaVBAFZuv2uqFxyzQ4AEGJVTOUR+kGs4nX6QF+kDNUzljJNYSzejYQrarqV+vU5uu1tbpB+6wfcMdYTnYkIdybdYSPT64d8e8fpRxBv1hCB5rg0GMfSvHRyJ9CSY6MnfEIxGKcQajYQY9GCZALjYSB9xhDLfVEBsB6zga9BdGeLDfHc5ZYT42FwX6S6ziqfohP6fyhn6MsTAapKUHWqXxSljqNV4QFIDoaRfUOswNCKstWoAAlcsteDyD18hwTgawpZR0BrO4PeZgz0DkbQYGgZBOGwfBSDoYhcGIFgqHwfAYmMYOXGKOg6BAcQOpMAOjBEf53egOgOoAaxwdOTbrQ6arq3r3DZ3JtfcBB5thO7NVhJ6zic-ofP6Mx6Vhd6zmVhFZTOFZ+gAGVhIrYXVvCNAl-oACUbkdRBSDaJBhDyGwXgGp1DoW7hJ7geqTsQBaAFoPAAfRT4Rb8r54RFv9Q6FfwPjeusAr78e-FBPyBK-d+n8oDf3Zr-OQADX7P0hI-UBCRb5f3mr-O+EQkFwPiAg8BYCjaoL-rfDBj8sH7zfrgpBKCf5X2gcQoBNRsHkKNngiBRo0G3wKLA4BSDEGPyoZAm+t9WhcIYWQ3hyDwEEP-sIzB3CcHMMoZI6h0CZEkLkUwj+ij8HULvkMERL8eEUL4UogR-89GyNESAoxEjtECOgeYtRljDEKOMbYthgjKoWIMfIzRrjWG+GvnfFY+j4EaJYVI2+wSvGhPEfw9x0ComOO8WErR-jL7sL2CExhsSTHuP-pk6J2TrFxICVA2+BSkkxOKbk0pgjLhZLEdUtxtT-5tUKY0lxNi0kaGvtAtplSimdJKekwR-T6HJJyc0kZ-88oDI6b4rpBDoGzPGVUoZNSRl3xWaQqx6ypk9N-v-VE7TdkLOGQcmh5CGmnPCToq5JznFnI2Rc-+eJrmPNuXY2+byHk+M+e4u+Py5k3NSRE8kgCdkfNBco5B1pgVQr8QQu+4L3l-OhaY2+DIIXqMmd0hIZSsWopSYiu5hLfnEsWdQ-+nIiW4qWbfGl5K6V3MZfCtFJKMUCmxU49llKvlctpU0vFgTb4CqZUKiJEpuUTIlTCqVgq9nCvYfK8ViqImKmlWsp5+z8WXI1Qq7VSrBH6tVYaiJWpNWDLNTCi1Br-m1Lvra019rNm32NM69FeS3WWvmS6i50D3Vsopec3Vd84WrKtX63V-9w2Qt5SG3pt9Y04tlQIx1PqQUcq9U6O1nranQJzR6rNDrb5OyDcyjFZaI2+rzSM6BVa43BueaG2+gZc3Fuma2jNCK+XxK7e23tJbSpFsHZ24d5bU19vHdWzNo6Ll31jAOhNhzb6LpHcuy5a6J1qrucmJdzbr7-z3eug9ZTj3butWm2+WZ906sPde7t8bT2XJvSeu97DCy3qNf-T9b6jXQN-ReqNIqKxfoiaBv99KINAdrfOoBYGqXwcgzCusCGr0tkfU299hCMNob7bh5DV6uyYYrV64jeH81JvHDOntG7HXUcbaRlpt9YIkcnZR1jFHXVQy4y80tDGU07q+TxwjALW0CZ5Vh794m2NCb7TDXjLaPASZlXJ5jynZOXqnSprVwH2EI0U-egzonKPGZgx2uDSNDMrqsyZutt9bPmbnS2i8mm9OENc9Zl9OnI2wZbWjLzP6fM1os7qgDwXZ10dvq+Nzfn70xa89AhLdm4NY0C0-CLtHn3QLSylltLZMtPuw--ArsXQuJtK15sNcF0vgTK85xNdWqssZq3l+9sFCtSfpR1+rUXkK9eff-friX+OdaY66jCA3ivibG+x+zk3mvKdm2psdrWnMbugUtqbRqF1rZo0V6TVMRtHba+wsi22InnZG1d07gi6bpfu7d6Bj31vPrvgzdLH2nu3y+697Dd9WIXcQ4DkbIPbt3xZulyH33od-Z27fJy6XEffeR3DpFt93Lpcx997HaO7k+XSwT77RO8dXvivtrriHyeMbm-62+1PBNaZLaFIHV7Iqs7E3FDnJbkrc-s7z5rGU+d06F813KwuwuYu2Yz9zd8SoS5FRVBXUDhC8BrMQdOXnJr+kWstf0mh+aQY6gIEwSgDEajAHkZqyJ0B2EOgoDQmuQDexAE7w2IByAMDYFfOgzAr5hz8NgOgkA46QFIMwMoxBsA-IOhIdA7sPde8CI6TaUBQCc3NnHx0ldNFLSUXCe2C5zYgH8mdE3zUkBwE0NbZoNdrZyDgNwUE1sHJljLE7AoGhtJuzEMHfAocSAZw6l7XOvtR85yDvtUO7AM6oGTqHcgVRM6mAn1n4Q+cxDkFQEXdApcu8K1UMXy23BrYeGENwbgeQBCV7Gv8a2ZYkDW0nqrjMwg2md4967Auwd1LYEIP3pOfIF-YQDwVWAfAA4fb2LPGsRIYOTedAP-CA-2QOaAefBA7AROLOVfDqdfAuHfEAPfD3GWUAYvfyMsOAPIa2GwMAGsGsPIc4U-c-S-a-c6R2e-R-LyHaeqHeTgD-dSHvSfbSP-JfSA0fGA3vEAeA4oQgEQ5AiQlOIPdOZfEAbOFAnAjfGAfAwgoPbYIAA";

  //   service.import(save, false, true);
  // }));
});
