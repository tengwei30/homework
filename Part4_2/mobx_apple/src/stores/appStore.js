
import {observable, computed, action} from 'mobx';

class AppleStore {
  @observable apples = [
    {
      id: 0,
      weight: 233,
      isEaten: false
    },
    {
      id: 1,
      weight: 235,
      isEaten: true
    },
    {
      id: 2,
      weight: 256,
      isEaten: false
    }
  ];
  @observable newAppleId = 3;
  @observable isPicking = false;
  @observable buttonText = '摘苹果';

  @computed get status() {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    };
    this.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten':'appleNow';
      status[selector].quantity++;
      status[selector].weight += apple.weight;
    });
    return status;
  }

  // 摘苹果
  @action pickApple = () => {
    console.log('点击啦～～～')
    // 如果正在摘苹果, 就结束
    if (this.isPicking) {
      return;
    }

    this.isPicking = true;
    this.buttonText = '正在采摘...';

    let weight = Math.floor(200 + Math.random() * 50);
    this.isPicking = false;
    this.buttonText = '摘苹果';
    this.apples.push({
      id: this.newAppleId++,
      weight: weight,
      isEaten: false
    });
    console.log('picking', this.apples)
  }

  @computed get applelists () {
    return this.apples.filter(apple => !apple.isEaten)
  }

  // 吃苹果
  @action eatApple = (appleId) => {
    let targetIndex = ''
    this.apples.forEach((apple, index) => {
      if(apple.id === appleId) {
        targetIndex = index
      }
    })
    this.apples[targetIndex].isEaten = true;
  }
}

const appleStore = new AppleStore()

export default appleStore
