# size
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr integral_constant<
  simd-size-type, mask-size-v<Bytes, Abi>> size {};
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* mask-size-v[link /reference/simd/mask-size-v.md]
* integral_constant[link /reference/type_traits/integral_constant.md]

## 概要
`basic_mask`が保持する要素数を表す静的メンバ変数である。

要素数を型情報として保持する[`std::integral_constant`](/reference/type_traits/integral_constant.md)であり、`size`または`size()`のように関数呼び出し構文でも要素数を取得できる。

対応する[`basic_vec`](../basic_vec.md)の要素数と一致する。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::mask<int, 4> m{true};

  // 静的メンバ変数としてアクセスできる
  std::println("{}", simd::mask<int, 4>::size);

  // integral_constantであるため、関数呼び出し構文でも取得できる
  std::println("{}", m.size());
}
```
* simd::mask[link ../basic_mask.md]
* size[color ff0000]
* m.size()[color ff0000]

### 出力
```
4
4
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
