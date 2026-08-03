# modf
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class Abi>
  constexpr basic_vec<T, Abi>
    modf(const std::type_identity_t<basic_vec<T, Abi>>& value,
         basic_vec<T, Abi>* iptr); // C++26
}
```
* basic_vec[link basic_vec.md]
* std::type_identity_t[link /reference/type_traits/type_identity.md]

## 概要
浮動小数点要素型の[`basic_vec`](basic_vec.md)について、各要素を整数部と小数部に分解する。各要素に[`std::modf`](/reference/cmath/modf.md)を適用する。


## 効果
各要素`i`（`0`以上`basic_vec<T, Abi>::size()`未満）について、`value[i]`の整数部（元の符号を保持する）を格納した[`basic_vec`](basic_vec.md)を`*iptr`に設定する。


## 戻り値
各要素`i`について、`value[i]`の小数部（元の符号を保持する）で初期化された[`basic_vec`](basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<float, 4> v{
    [](int i) { return i + 1.5f; }
  }; // {1.5, 2.5, 3.5, 4.5}

  simd::vec<float, 4> intpart;
  simd::vec<float, 4> frac = simd::modf(v, &intpart);

  for (std::size_t i = 0; i < v.size(); ++i)
    std::print("{}+{} ", intpart[i], frac[i]);
  std::println("");
}
```
* simd::modf[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
1+0.5 2+0.5 3+0.5 4+0.5 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::frexp`](frexp.md)
- [`std::simd::ldexp`](ldexp.md)
- [`std::modf`](/reference/cmath/modf.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
