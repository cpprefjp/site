# data
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto data() const
  requires contiguous_range<R>; // (1) C++20
```

## 概要
Rangeの先頭へのポインタを取得する。


## テンプレートパラメータ制約
- 型`R`が[`contiguous_range`](/reference/ranges/contiguous_range.md)であること。


## 戻り値

メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
return ranges::data(*r_);
```
* ranges::data[link /reference/ranges/data.md]


## 例
```cpp
#include <cassert>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::ref_view(v);

  int* p = r.data();
  assert(p == v.data());
}
```
* r.data[color ff0000]
* v.data()[link /reference/vector/vector/data.md]

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
