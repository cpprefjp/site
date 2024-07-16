# operator[]
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr reference operator[](difference_type n) const
  requires random_access_iterator<Iterator>;
```
* random_access_iterator[link /reference/iterator/random_access_iterator.md]

## 概要

任意の位置にランダムアクセスする。

戻り値型`reference`は、[`iter_const_reference_t`](/reference/iterator/iter_const_reference_t.md)`<Iterator>`のエイリアス。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

```cpp
return static_cast<reference>(current_[n]);
```

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();

  std::cout << cit[2] << '\n';
  std::cout << cit[4] << '\n';

  // 要素を変更できない
  // cit[0] = 0;
}
```

### 出力
```
3
5
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
