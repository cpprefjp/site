# operator<=>
* inplace_vector[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, size_t N>
  constexpr synth-three-way-result<T>
    operator<=>(const inplace_vector<T, N>& x,
                const inplace_vector<T, N>& y); // (1) C++26
}
```

## 概要
`inplace_vector`オブジェクトの三方比較を行う。


## テンプレートパラメータ制約
型 (`const`) `T`の値に対して`operator<=>`が定義されるか、型 (`const`) `T`の値に対して`operator<`が定義され全順序をもつこと


## 効果
```cpp
return std::lexicographical_compare_three_way(
    x.begin(), x.end(),
    y.begin(), y.end(),
    synth-three-way);
```
* std::lexicographical_compare_three_way[link /reference/algorithm/lexicographical_compare_three_way.md]
* begin()[link begin.md]
* end()[link end.md]


## 計算量
線形時間


## 備考
- この演算子により、以下の演算子が使用可能になる：
    - `operator<`
    - `operator<=`
    - `operator>`
    - `operator>=`


## 例
```cpp example
#include <cassert>
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv1 = {1, 2, 3};
  std::inplace_vector<int, 5> iv2 = {1, 2, 3};
  std::inplace_vector<int, 5> iv3 = {1, 2, 4};

  // 三方比較
  assert((iv1 <=> iv2) == 0);
  assert((iv1 <=> iv3) < 0);

  // operator<=>から自動導出される比較演算子
  std::println("{}", iv1 < iv3);  // true:  {1,2,3} < {1,2,4}
  std::println("{}", iv1 <= iv2); // true:  {1,2,3} <= {1,2,3}
  std::println("{}", iv3 > iv1);  // true:  {1,2,4} > {1,2,3}
  std::println("{}", iv1 >= iv2); // true:  {1,2,3} >= {1,2,3}
}
```

### 出力
```
true
true
true
true
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
