# make_const_sentinel
* iterator[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<semiregular S>
  constexpr const_sentinel<S> make_const_sentinel(S s);
}
```
* semiregular[link /reference/concepts/semiregular.md]
* const_sentinel[link const_sentinel.md]

## 概要

`basic_const_iterator`のヘルパ関数。特に、イテレータではないような番兵を`basic_const_iterator`の番兵へと変換するのに使用する。

## 戻り値

```cpp
return s;
```

戻り値型は必ずしも`basic_const_iterator`の特殊化になるわけではない。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>
#include <algorithm>

int main() {
  std::vector vec = {1, 2, 3, 4, 11, 5, 6, 22};

  auto cit = std::make_const_iterator(vec.begin());
  auto cse = std::make_const_sentinel(std::unreachable_sentinel); // unreachable_sentinelはイテレータではない汎用の番兵

  auto pos = std::ranges::find_if(cit, cse, [](auto& n) {
    // 述語中で誤って変更してしまうことを防止する
    // n = 0;
    return 10 <= n;
  });

  std::cout << *pos;
}
```
* std::make_const_sentinel[color ff0000]
* make_const_iterator[link make_const_iterator.md]
* unreachable_sentinel[link unreachable_sentinel_t.md]

### 出力
```
11
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
