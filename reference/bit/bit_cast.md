# bit_cast
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<typename To, typename From>
  constexpr To bit_cast(const From& from) noexcept;
}
```

## 概要
ビットレベルの再解釈キャストを行う。

低レイヤーのプログラムでは、同じビットを維持してほかの型に解釈し直すことが必要とされる。その際、`reinterpret_cast`や共用体を使用すると、Struct Aliasing規則に抵触してしまい未定義動作になってしまう。そのような目的には[`std::aligned_storage`](/reference/type_traits/aligned_storage.md)と`std::memcpy()`を組み合わせて使用することになるが、それを簡単に使用できるようにしたのが本関数である。


## 要件
以下の条件のいずれかを満たさない場合、この関数はオーバーロード解決の候補から除外される：

- `sizeof(To) == sizeof(From)`であること
- [`std::is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<To> == true`であること
- [`std::is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<From> == true`であること

型`To`と`From`、およびその全てのサブオブジェクトが以下の条件を全て満たす場合、本関数は`constexpr`関数として評価される：

- [`std::is_union_v`](/reference/type_traits/is_union.md)`<T> == false`
- [`std::is_pointer_v`](/reference/type_traits/is_pointer.md)`<T> == false`
- [`std::is_member_pointer_v`](/reference/type_traits/is_member_pointer.md)`<T> == false`
- [`std::is_volatile_v`](/reference/type_traits/is_volatile.md)`<T> == false`
- `T`が参照の非静的メンバ変数を持たないこと


## 戻り値
型`To`の値を返す。その戻り値の各ビットが`from`と等しくなる。ただし、戻り値のパディングビットは未規定。

型`To`で`from`の値を表現できない場合の動作は未定義となる。そのような値が複数ある場合、生成される値は未規定。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <bit>
#include <cstdint>
#include <cstring>

int main()
{
  float f = 3.14f;

  // ビット値を保って、単精度浮動小数点数 (IEEE 754準拠なら32ビット) を、32ビット整数に変換
  std::uint32_t n = std::bit_cast<std::uint32_t>(f);

  // 従来の方法
  std::uint32_t m = 0;
  std::memcpy(&m, &f, 4);

  std::cout << n << std::endl;
  std::cout << m << std::endl;
  assert(n == m);
}
```
* std::bit_cast[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
1078523331
1078523331
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang, C++20 mode](/implementation.md#clang):
- [GCC, C++20 mode](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0476R2 Bit-casting object representations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0476r2.html)
