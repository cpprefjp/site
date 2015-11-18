#max_size
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
size_type max_size() const noexcept;
```

##概要
格納可能な最大の要素数を取得する。


##戻り値
このコンテナに格納可能な最大の要素数


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
  std::unordered_set<int> us;
  std::unordered_set<int>::size_type s = us.max_size();

  std::cout << s << std::endl;
}
```
* iostream[link /reference/iostream.md]
* unordered_set[link /reference/unordered_set.md]
* max_size[color ff0000]

###出力例
```
2305843009213693951
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

###備考
C++11 ではアロケータにメンバ関数 `max_size` は必須ではないが、GCC(libstdc++) の 4.9.0 より前のバージョンでは、コンテナのアロケータ `allocator_type` にメンバ関数 `max_size` が無いとコンパイル時エラーが発生する。

（`allocator_type::max_size()` を `std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`::`[`max_size`](/reference/memory/allocator_traits/max_size.md) 経由ではなく直接使用しているため。）


##参照

|                       |                            |
|-----------------------|----------------------------|
| [`empty`](empty.md) | コンテナが空かどうかを判定 |
| [`size`](size.md)   | 要素数の取得               |

