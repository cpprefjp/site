#empty
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]

```cpp
bool empty() const;
```

##概要
`priority_queue`が空か否か、つまり要素数が 0 か否かを判定する。
内部のコンテナの `empty()` メンバ関数を呼ぶ。


##効果
`return c.empty();`


##戻り値
要素数が0の場合は`true`、それ以外の場合は`false`を返す。


##例
```cpp
#include <iostream>
#include <queue>

int main()
{
  // 空のキュー
  {
    std::priority_queue<int> empty_que;

    if (empty_que.empty()) {
      std::cout << "empty_que is empty" << std::endl;
    }
    else {
      std::cout << "empty_que is not empty" << std::endl;
    }
  }

  // 非空のキュー
  {
    std::priority_queue<int> non_empty_que;
    non_empty_que.push(3);

    if (non_empty_que.empty()) {
      std::cout << "non_empty_que is empty" << std::endl;
    }
    else {
      std::cout << "non_empty_que is not empty" << std::endl;
    }
  }
}
```
* empty[color ff0000]

###出力
```
empty_que is empty
non_empty_que is not empty
```

##参照


