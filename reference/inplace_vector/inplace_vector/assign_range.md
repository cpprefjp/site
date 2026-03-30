# assign_range
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <container-compatible-range<T> R>
constexpr void assign_range(R&& rg); // (1) C++26
```

## 概要
Rangeの要素を再代入する。


## 効果
`*this`の全要素を破棄し、Range `rg`の要素で置き換える。


## 例外
`rg`の要素数が`N`を超える場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 戻り値
なし


## 例
```cpp example
#include <print>
#include <inplace_vector>
#include <vector>

int main()
{
  std::inplace_vector<int, 10> iv = {1, 2, 3};

  std::vector<int> src = {10, 20, 30, 40, 50};
  iv.assign_range(src);

  for (int x : iv) std::print("{} ", x);
  std::println("");
}
```
* assign_range[color ff0000]

### 出力
```
10 20 30 40 50
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]

## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
