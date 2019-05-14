# cend
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const_iterator cend() const noexcept;
```

## 概要
末尾要素の次を指す読み取り専用イテレータを取得する。


## 戻り値
`span`オブジェクトが参照している範囲の、末尾要素の次を参照する読み取り専用イテレータを返す。


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
* s.cend[color ff0000]
* s.cbegin()[link cend.md]
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
