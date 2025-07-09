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

低レイヤーのプログラムでは、同じビットを維持してほかの型に解釈し直したいことがある。その際、`reinterpret_cast`や共用体を使用すると、Strict Aliasing規則に抵触して未定義動作になってしまう。安全な方法としては`std::memcpy()`を使用するなどがあるが、面倒なことなどから前述の危険な方法が多く見られた。そこで、同等の操作を簡単で安全にできるようにしたのが本関数である。


## テンプレートパラメータ制約
- `sizeof(To) == sizeof(From)`であること
- [`std::is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<To> == true`であること
- [`std::is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<From> == true`であること


## 戻り値
型`To`の値を返す。その戻り値のビット表現は値`from`のビット表現と等しくなる。（もしあれば）戻り値のパディングビットは未規定。

型`To`においてビット表現に対応する値が存在しない場合、その動作は未定義となる。またビット表現に対応する値が複数存在する場合、どの値が生成されるかは未規定となる。


## 例外
投げない


## 定数式に評価される条件
型`To`と`From`、およびその全てのサブオブジェクトが以下の条件を全て満たすこと：

- [`std::is_union_v`](/reference/type_traits/is_union.md)`<T> == false`
- [`std::is_pointer_v`](/reference/type_traits/is_pointer.md)`<T> == false`
- [`std::is_member_pointer_v`](/reference/type_traits/is_member_pointer.md)`<T> == false`
- [`std::is_volatile_v`](/reference/type_traits/is_volatile.md)`<T> == false`
- `T`が参照型の非静的メンバ変数を持たないこと


## 備考
- この関数は、型`To`にデフォルト構築可能であることの要求を行わない。以下に実装イメージを示す：
    ```cpp
    template<typename To, typename From>
    To bit_cast(const From& from) noexcept { // 実際には、さらに要件チェックが行われる
      // この実装ではTo型がデフォルト構築可能である必要があるが、C++20のbit_castでは必要ない
      To result;
      std::memcpy(&result, &from, sizeof(To));  // memcpyはconstexprではないため、
                                                // コンパイラが特殊な実装をする必要がある
      return result;
    }
    ```

## 例
```cpp example
#include <cassert>
#include <cstdint>
#include <cstring>
#include <bit>
#include <iostream>

int main()
{
  float f = 3.14f;

  // ビット表現を保って、単精度浮動小数点数 (IEEE 754準拠なら32ビット) を、32ビット整数に変換
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

### 出力
```
1078523331
1078523331
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0476R2 Bit-casting object representations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0476r2.html)
