#top
* queue[meta header]
* std[meta namespace]

```cpp
const_reference top() const;
```

##概要
次に処理する要素を取得する。
内部のコンテナの`front()`メンバ関数を呼ぶ。


##効果
`return c.front();`


##戻り値
次に処理する要素への参照


##例
```cpp
#include <iostream>
#include <queue>

int main()
{
  std::priority_queue<int> que;

  que.push(3);
  que.push(1);
  que.push(4);

  while (!que.empty()) {
    const int& x = que.top();
    std::cout << x << std::endl;
    que.pop();
  }
}
```
* top[color ff0000]

###出力
```
4
3
1
```


