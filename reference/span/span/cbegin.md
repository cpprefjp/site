# cbegin
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const_iterator cbegin() const noexcept;
```

## 概要
先頭要素を指す読み取り専用イテレータを取得する。


## 戻り値
`span`オブジェクトが参照している範囲の、最初の要素を参照する読み取り専用イテレータを返す。[`empty()`](empty.md)が`true`である場合、[`cend()`](cend.md)と同じ値が返る。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // vの先頭3要素を部分シーケンスとして参照する
  std::span<int, 3> s = std::span(v).first(3);

  // アルゴリズム内で要素の変更操作を行わない
  std::for_each(s.cbegin(), s.cend(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* s.cbegin[color ff0000]
* s.cend()[link cend.md]
* first[link first.md]

### 出力
```
1
2
3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
