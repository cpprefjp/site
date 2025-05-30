# base
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr R& base() const; // (1) C++20
```

## 概要
元となるRangeへの参照を取得する。


## 戻り値

メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
return *r_;
```


## 例
```cpp
#include <cassert>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::ref_view(v);
  auto& base = r.base();

  assert(&base == &v);
}
```
* base()[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
