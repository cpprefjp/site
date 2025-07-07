# size
* ranges[meta header]
* std::ranges[meta namespace]
* as_rvalue_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto size()
  requires sized_range<V>;       // (1) C++23

constexpr auto size() const
  requires sized_range<const V>; // (2) C++23
```

## 概要
要素数を取得する。


## 戻り値

メンバ変数`base_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
return ranges::size(base_);
```


## 例
```cpp
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::as_rvalue_view(v);
  std::cout << r.size() << std::endl;
}
```
* size[color ff0000]

### 出力
```
3
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]
