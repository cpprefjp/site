# empty
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool empty() const
  requires requires { ranges::empty(*r_); }; // (1) C++20
```
* ranges::empty[link /reference/ranges/empty.md]

## 概要
Rangeが空かどうかを判定する。


## テンプレートパラメータ制約
- [`ranges::empty`](/reference/ranges/empty.md)`(*r_)`が有効な式であること


## 戻り値

メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
return ranges::empty(*r_);
```
* ranges::empty[link /reference/ranges/empty.md]


## 例
```cpp
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::ref_view(v);
  std::cout << r.empty() << std::endl;
}
```
* empty[color ff0000]

### 出力
```
0
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
