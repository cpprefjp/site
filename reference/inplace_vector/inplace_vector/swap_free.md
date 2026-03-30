# swap (非メンバ関数)
* inplace_vector[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, std::size_t N>
  constexpr void swap(inplace_vector<T, N>& x, inplace_vector<T, N>& y)
    noexcept(noexcept(x.swap(y))); // (1) C++26
}
```

## 概要
2つの`inplace_vector`オブジェクトを入れ替える。


## 効果
`x.`[`swap`](swap.md)`(y)`


## 戻り値
なし


## 計算量
`x.size()`と`y.size()`の大きいほうに対して線形時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> v1 = {1, 2, 3};
  std::inplace_vector<int, 5> v2 = {4, 5, 6};

  std::swap(v1, v2);

  for (int x : v1) std::print("{} ", x);
  std::println("");
  for (int x : v2) std::print("{} ", x);
  std::println("");
}
```
* std::swap[color ff0000]

### 出力
```
4 5 6
1 2 3
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
