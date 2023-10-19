# from_range_t
* ranges[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  struct from_range_t { explicit from_range_t() = default; };

  inline constexpr from_range_t from_range{};
}
```

## 概要
`from_range_t`クラスは、オーバーロードのための空クラスである。

標準ライブラリのコンテナ初期化において、Rangeからコンテナを構築するオーバーロードを定義するためにある。


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <list>
#include <vector>

int main()
{
  std::vector vec{1, 2, 3};
  std::list lst{std::from_range, vec};
  for (int n: lst) {
    std::cout << n << std::endl;
  }
}
```
* std::from_range[color ff0000]

### 出力
```
1
2
3
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`container-compatible-range`](/reference/exposition-only/container-compatible-range.md)コンセプト


## 参照
- [P1206R7 Conversions from ranges to containers](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1206r7.pdf)
