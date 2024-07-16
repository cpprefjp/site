# operator*
* iterator[meta header]
* std[meta namespace]
* basic_const_iterator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr reference operator*() const;
```

## 概要
イテレータを間接参照する。

戻り値型`reference`は、[`iter_const_reference_t`](/reference/iterator/iter_const_reference_t.md)`<Iterator>`のエイリアス。

## 効果

ラップしているイテレータを`current_`メンバ変数に保持するとして、以下と等価

`return static_cast<reference>(*current_);`

## 例
```cpp example
#include <iostream>
#include <iterator>
#include <vector>


int main() {
  std::vector vec = {1, 2, 3, 4, 5};

  std::basic_const_iterator cit = vec.begin();

  std::cout << *cit << '\n';
  
  // 要素を変更できない
  //*cit = 0;
}
```
* *cit[color ff0000]

### 出力
```
1
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
