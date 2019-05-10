# rend
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const_reverse_iterator crend() const noexcept;
```

## 概要
末尾要素の次を指す読み取り専用逆順イテレータを取得する。


## 戻り値
以下と等価：

```cpp
return const_reverse_iterator(cbegin());
```
* cbegin()[link cbegin.md]


## 例外
投げない


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

  // 逆順に出力。
  // アルゴリズム内で要素の変更操作を行わない
  std::for_each(s.crbegin(), s.crend(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* crend[color ff0000]
* s.crbegin()[link crbegin.md]
* first[link first.md]

### 出力
```
3
2
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
