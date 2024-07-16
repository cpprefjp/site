# base
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr const Iterator& base() const & noexcept;  // (1)
constexpr Iterator base() &&;  // (2)
```

## 概要

メンバ変数として保持している、元のイテレータを取得する。

## 戻り値

- (1) : 元のイテレータへの`const`参照を返す。
- (2) : 元のイテレータをムーブして返す。

## 例

```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();
  
  std::cout << *cit << '\n';
  std::cout << *(cit.base()) << '\n';

  // 元のイテレータが可変イテレータならば要素を変更可能
  *(cit.base()) = 0;
  std::cout << *(cit.base()) << '\n';
}
```
* base[color ff0000]

### 出力

```
1
1
0
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
