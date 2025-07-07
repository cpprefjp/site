# size
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size() const
  requires sized_range<R>; // (1) C++20
```

## 概要
要素数を取得する。


## テンプレートパラメータ制約
- 型`R`が[`sized_range`](/reference/ranges/sized_range.md)であること。


## 戻り値

メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
return ranges::size(*r_);
```


## 例
```cpp
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::ref_view(v);
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
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
