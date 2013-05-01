#top
```cpp
const_reference top() const;
```

##概要

<b>次に処理する要素を取得する。</b>
<b>内部のコンテナのfront()メンバ関数を呼ぶ。</b>


##効果

`return c.front();`

##戻り値

次に処理する要素への参照


##備考



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

```cpp
4
3
1
```

##参照


