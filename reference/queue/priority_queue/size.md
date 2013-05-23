#size
```cpp
size_type size() const;
```

##概要
`priority_queue`に格納されている要素の個数を返す。
内部のコンテナの `size()` メンバ関数を呼ぶ。


##効果
`return c.size();`


##戻り値
`priority_queue` の内部のコンテナに含まれている要素の個数。
`size_type` は符号なし汎整数型。


##例
```cpp
#include <iostream>
#include <queue>

int main()
{
  std::priority_queue<int> que;

  que.push(1);
  que.push(2);
  que.push(3);

  std::size_t n = que.size();
  std::cout << n << std::endl;
}
```
* size()[color ff0000]

###出力
```
3
```

##参照


