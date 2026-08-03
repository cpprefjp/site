# size
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr integral_constant<
  simd-size-type, simd-size-v<T, Abi>> size {};
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* simd-size-v[link /reference/simd/simd-size-v.md]
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`basic_vec`が保持する要素数（「width」）を表す静的メンバ変数。

型は[`std::integral_constant`](/reference/type_traits/integral_constant.md)であり、その値が要素数を表す。


## 備考
`size`は[`std::integral_constant`](/reference/type_traits/integral_constant.md)であるため、関数呼び出し演算子によって`v.size()`のように要素数を取得できるほか、`v.size`のように直接値としても参照できる。いずれもコンパイル時定数である。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> v = 0;

  // 関数呼び出しの形式で要素数を取得する
  std::println("{}", v.size());

  // コンパイル時定数として使える
  static_assert(simd::vec<int, 4>::size() == 4);
}
```
* v.size()[color ff0000]

### 出力
```
4
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
