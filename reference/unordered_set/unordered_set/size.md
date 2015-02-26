#size (C++11)
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]

```cpp
size_type size() const noexcept;
```

##概要
要素数を取得する。


##戻り値
現在 `unordered_set` オブジェクトに格納されている要素の数


##例外
投げない。


##計算量
定数


##例
```cpp
#include <iostream>
#include <unordered_set>

int main()
{
  std::unordered_set<int> us{ 3, 1, 4, 5, 2, };

  // 要素数を出力
  std::cout << us.size() << std::endl;

  // 以下も要素数を出力するが、計算量は定数ではない（線形時間）
  std::cout << std::distance(us.begin(), us.end()) << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* distance[link /reference/iterator/distance.md]
* begin[link ./begin.md]
* end[link ./end.md]
* size[color ff0000]

###出力
```
5
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

##参照

| | |
|-----------------------------------------------|----------------------------|
| [`empty`](./empty.md)                         | コンテナが空かどうかを判定 |
| [`max_size`](./max_size.md)                   | 格納可能な最大の要素数の取得 |
| [`begin`](./begin.md)                         | 先頭要素を指すイテレータの取得 |
| [`end`](./end.md)                             | 最終要素の次を指すイテレータの取得 |
| [`distance`](/reference/iterator/distance.md) | イテレータ間の距離を求める |

