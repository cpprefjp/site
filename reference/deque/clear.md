#clear
* deque[meta header]
* std[meta namespace]

```cpp
void clear() noexcept;
```

##概要
全ての要素を削除する。


##事後条件
[`empty()`](/reference/deque/empty.md)` == true`


##戻り値
なし


##例外
投げない


##計算量
線形時間。全ての要素に対してデストラクタを呼び出す。


##例
```cpp
#include <iostream>
#include <cassert>
#include <deque>
#include <algorithm>

int main()
{
  std::deque<int> c = {1, 2, 3};

  c.clear();

  assert(c.empty());

  std::for_each(c.begin(), c.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```

###出力
```
```

##参照
- [LWG Issue 2231. DR 704 removes complexity guarantee for `clear()`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2231)
    - C++03までこの関数の効果は`erase(begin(), end())`だったため、それによって線形時間の計算量が保証されていたが、C++11で効果の表記が変わったために、保証がなくなってしまっていた。C++14であらためて保証を追加。


##関連項目

| | |
|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| [`erase`](./erase.md) | 指定した要素を削除する |
| [`resize`](./resize.md) | 要素数を変更する |
| [`pop_back`](./pop_back.md) | 末尾要素を削除する |
| [`pop_front`](./pop_front.md) | 先頭要素を削除する |
| [`empty`](./empty.md) | コンテナが空であるかどうかを調べる |


