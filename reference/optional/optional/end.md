# end
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr iterator end() noexcept; // (1)
constexpr const_iterator end() const noexcept; // (2)
```

## 概要
`optional`をrangeとした時の末尾要素の次を指すイテレータを取得する。


## 効果
[`begin()`](begin.md) `+` [`has_value()`](has_value.md) を返す。


## 例
```cpp example
#include <iostream>
#include <iterator>
#include <optional>

int main()
{
  std::optional<int> p = 1;
  std::cout << std::distance(p.begin(), p.end()) << std::endl;

  p = std::null_opt;
  std::cout << std::distance(p.begin(), p.end()) << std::endl;
}
```
* end()[color ff0000]
* begin()[link begin.md]
* std::distance[link /reference/iterator/distance.md]

### 出力
```
1
0
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3168R2 Give std::optional Range Support](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3168r2.html)
