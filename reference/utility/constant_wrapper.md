# constant_wrapper
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <auto X, class = decltype(X)>
  struct constant_wrapper;

  // 型Tが定数として扱えることを表す説明用コンセプト
  template <class T>
  concept constexpr-param =
    requires { typename constant_wrapper<T::value>; };

  // すべての演算子オーバーロードを提供する説明用の基底クラス
  struct cw-operators;

  // constant_wrapperを簡潔に生成する変数テンプレート
  template <auto X>
  constexpr auto cw = constant_wrapper<X>{};
}
```

## 概要
`constant_wrapper`クラステンプレートは、定数`X`を型として包むことで、その値を「型の世界」で扱えるようにするためのラッパーである。

`constant_wrapper`のみで構成された式は、それが現れる文脈に関わらず、常にコア定数式として評価される。これによって、通常はテンプレート引数としてしか渡せない定数を、関数の引数として渡しても定数式として利用できるようになる。とくに、テンプレート引数を明示的に指定できないコンストラクタ呼び出しなどで有用である。

変数テンプレート[`cw`](#cw)を使うと、`std::constant_wrapper<42>{}`と書く代わりに`std::cw<42>`と簡潔に書ける。

```cpp
// 通常の定数を関数引数として受け取り、コンパイル時に計算する
constexpr auto add(auto a, auto b)
{
  return a + b;
}

auto result = add(std::cw<42>, std::cw<13>); // resultはconstant_wrapper<55>型
static_assert(result == 55);                 // resultが定数式でなくても、その値は定数式
```

`constant_wrapper`はあらゆる演算子をオーバーロードしている。オペランドがすべて`constant_wrapper`である場合は、演算結果も`constant_wrapper`になり、「型の世界」にとどまる。オペランドのいずれかが通常の値である場合は、保持する値にアンラップされて通常の演算がおこなわれる。

クラステンプレート`constant_wrapper`の2つめのテンプレートパラメータは無名であり、引数依存の名前探索 (ADL) を補助するために存在する。これによって、包んでいる値が引数として適合するオーバーロードを、`constant_wrapper`自身が適合しない場合でも発見できるようになる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `(constructor)` | デフォルトコンストラクタ（暗黙定義） | C++26 |
| [`operator=`](constant_wrapper/op_assign.md) | 代入（`value`が`const`のため`constant_wrapper`では不適格） | C++26 |
| [`operator value_type`](constant_wrapper/op_value_type.md) | 保持する値への変換演算子 | C++26 |
| [`operator()`](constant_wrapper/op_call.md) | 保持する値を関数として呼び出す（静的メンバ関数） | C++26 |
| [`operator[]`](constant_wrapper/op_at.md) | 保持する値に添字アクセスする（静的メンバ関数） | C++26 |

また、説明用の基底クラス`cw-operators`から以下の擬似的な変更操作を継承する。ただし`constant_wrapper`が保持する`value`は`const`であるため、これらの演算子と上記`operator=`は、保持する値そのものを変更する式（`++value`、`value op= x`、`value = x`）が不適格となり、`constant_wrapper`に対してはオーバーロード解決に参加しない（使用できない）。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator++`](constant_wrapper/op_increment.md) | インクリメント | C++26 |
| [`operator--`](constant_wrapper/op_decrement.md) | デクリメント | C++26 |
| [`operator+=`](constant_wrapper/op_plus_assign.md) | 加算の複合代入 | C++26 |
| [`operator-=`](constant_wrapper/op_minus_assign.md) | 減算の複合代入 | C++26 |
| [`operator*=`](constant_wrapper/op_multiply_assign.md) | 乗算の複合代入 | C++26 |
| [`operator/=`](constant_wrapper/op_divide_assign.md) | 除算の複合代入 | C++26 |
| [`operator%=`](constant_wrapper/op_modulo_assign.md) | 剰余の複合代入 | C++26 |
| [`operator&=`](constant_wrapper/op_and_assign.md) | ビット論理積の複合代入 | C++26 |
| [<code>operator&#x7C;=</code>](constant_wrapper/op_or_assign.md) | ビット論理和の複合代入 | C++26 |
| [`operator^=`](constant_wrapper/op_xor_assign.md) | ビット排他的論理和の複合代入 | C++26 |
| [`operator<<=`](constant_wrapper/op_left_shift_assign.md) | 左シフトの複合代入 | C++26 |
| [`operator>>=`](constant_wrapper/op_right_shift_assign.md) | 右シフトの複合代入 | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `type` | `constant_wrapper`自身を表す型 | C++26 |
| `value_type` | 保持する値の型 `decltype(X)`、すなわちラップした値`X`の型 | C++26 |

たとえば`std::cw<42>`（`X`は`int`の`42`）の場合、`type`は`std::constant_wrapper<42>`、`value_type`は`int`となる。


## 静的メンバ変数

| 名前 | 説明 | 設定される値・型 | 対応バージョン |
|------|------|------------------|----------------|
| `value` | 保持する定数値への参照 | テンプレート引数`X`への参照（`static constexpr decltype(auto) value = (X);`）。型は`const value_type&` | C++26 |

たとえば`std::cw<42>`の場合、`value`の値は`42`、その型は`const int&`となる。`value`はテンプレートパラメータオブジェクトへの参照であるため、ダングリングしない。


## 非メンバ（*Hidden friends*）関数
`constant_wrapper`は、説明用の基底クラス`cw-operators`を継承することで、以下の演算子を *Hidden friends* として提供する。

いずれの演算子も、オペランドがすべて説明用コンセプト`constexpr-param`（`constant_wrapper`のように、静的メンバ`value`を定数として持つ型）のモデルであることを要求し、演算結果を包んだ`constant_wrapper`を返す。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](constant_wrapper/op_unary_plus.md) | 単項`+` | C++26 |
| [`operator-`](constant_wrapper/op_unary_minus.md) | 単項`-`（符号反転） | C++26 |
| [`operator~`](constant_wrapper/op_flip.md) | ビット反転 | C++26 |
| [`operator!`](constant_wrapper/op_not.md) | 論理否定 | C++26 |
| [`operator&`](constant_wrapper/op_address.md) | 単項`&`（アドレス取得） | C++26 |
| [`operator*`](constant_wrapper/op_deref.md) | 単項`*`（間接参照） | C++26 |
| [`operator+`](constant_wrapper/op_plus.md) | 加算 | C++26 |
| [`operator-`](constant_wrapper/op_minus.md) | 減算 | C++26 |
| [`operator*`](constant_wrapper/op_multiply.md) | 乗算 | C++26 |
| [`operator/`](constant_wrapper/op_divide.md) | 除算 | C++26 |
| [`operator%`](constant_wrapper/op_modulo.md) | 剰余 | C++26 |
| [`operator<<`](constant_wrapper/op_left_shift.md) | 左シフト | C++26 |
| [`operator>>`](constant_wrapper/op_right_shift.md) | 右シフト | C++26 |
| [`operator&`](constant_wrapper/op_and.md) | ビット論理積 | C++26 |
| [<code>operator&#x7C;</code>](constant_wrapper/op_or.md) | ビット論理和 | C++26 |
| [`operator^`](constant_wrapper/op_xor.md) | ビット排他的論理和 | C++26 |
| [`operator&&`](constant_wrapper/op_logical_and.md) | 論理積 | C++26 |
| [<code>operator&#x7C;&#x7C;</code>](constant_wrapper/op_logical_or.md) | 論理和 | C++26 |
| [`operator<=>`](constant_wrapper/op_compare_3way.md) | 三方比較 | C++26 |
| [`operator<`](constant_wrapper/op_less.md) | 左辺が右辺より小さいかの判定 | C++26 |
| [`operator<=`](constant_wrapper/op_less_equal.md) | 左辺が右辺以下かの判定 | C++26 |
| [`operator>`](constant_wrapper/op_greater.md) | 左辺が右辺より大きいかの判定 | C++26 |
| [`operator>=`](constant_wrapper/op_greater_equal.md) | 左辺が右辺以上かの判定 | C++26 |
| [`operator==`](constant_wrapper/op_equal.md) | 等値比較 | C++26 |
| [`operator!=`](constant_wrapper/op_not_equal.md) | 非等値比較 | C++26 |
| [`operator,`](constant_wrapper/op_comma.md) | カンマ演算子（`delete`定義） | C++26 |
| [`operator->*`](constant_wrapper/op_member_pointer.md) | メンバポインタ参照 | C++26 |


## <a id="cw" href="#cw">変数テンプレート`cw`</a>
```cpp
namespace std {
  template <auto X>
  constexpr auto cw = constant_wrapper<X>{};
}
```

`cw`は、`constant_wrapper<X>`のオブジェクトを簡潔に生成するための変数テンプレートである。`std::cw<X>`は`std::constant_wrapper<X>{}`と等価である。


## 備考
- `operator()`と`operator[]`は静的メンバ関数であり、保持する値`value`をアンラップして呼び出す。引数がすべて`constexpr-param`のモデルであり、その結果をふたたび`constant_wrapper`で包める場合は、包んだ`constant_wrapper`を返す。そうでない場合は、アンラップした結果をそのまま返す。
    - この「保持する値そのものになる。ただし包んだままにできるなら包んだままにする」という規則は、すべての演算子に共通する。たとえば、`std::cw<1> + 1`は`int`の`2`に、`std::cw<1> + std::cw<1>`は`constant_wrapper<2>`になる。
- `operator,`（カンマ演算子）は`delete`定義されている。


## 例
### 基本的な使い方
```cpp example
#include <utility>
#include <iostream>

// 定数を通常の関数引数として受け取り、コンパイル時に計算する高階関数
constexpr auto add(auto a, auto b)
{
  return a + b;
}

int main()
{
  // cw<42>とcw<13>は、値を型として保持する
  auto result = add(std::cw<42>, std::cw<13>);

  // resultはconstant_wrapper<55>型であり、
  // result自身が定数式でなくても、その値は定数式として使用できる
  static_assert(result == 55);

  std::cout << result << std::endl;
}
```
* std::cw[color ff0000]

#### 出力
```
55
```

### 演算結果を型として保持する
```cpp example
#include <utility>
#include <type_traits>

int main()
{
  // オペランドがすべてconstant_wrapperなら、演算結果も再びconstant_wrapperになる
  auto a = std::cw<10> + std::cw<5>;
  static_assert(std::is_same_v<decltype(a), std::constant_wrapper<15>>);

  // オペランドのいずれかが通常の値なら、保持する値へアンラップして演算する
  auto b = std::cw<10> + 5;
  static_assert(std::is_same_v<decltype(b), int>);
}
```
* std::cw[color ff0000]
* std::constant_wrapper[color ff0000]

#### 出力
```
```

### 関数や添字をアンラップして呼び出す
```cpp example
#include <utility>
#include <iostream>

constexpr int triple(int x) { return x * 3; }

// constant_wrapperはNTTPとして使うために名前空間スコープに置く
constexpr int data[] = {0, 10, 20, 30};

int main()
{
  // cw<triple>を関数呼び出しすると、保持する関数を呼び出す
  // 引数もconstant_wrapperなら、結果を再びconstant_wrapperで包む
  auto r = std::cw<triple>(std::cw<7>);
  static_assert(r == 21);
  std::cout << r << std::endl;

  // 配列を保持して添字アクセスする
  auto e = std::cw<data>[std::cw<2>];
  static_assert(e == 20);
  std::cout << e << std::endl;
}
```
* std::cw[color ff0000]

#### 出力
```
21
20
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::integral_constant`](/reference/type_traits/integral_constant.md) 型として整数定数を表すクラス
- [`std::function_ref`](/reference/functional/function_ref.md) メンバ関数ポインタなどを束縛する際に`constant_wrapper`を受け取る


## 参照
- [P2781R9 `std::constant_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2781r9.html)
    - C++26で`constant_wrapper`と変数テンプレート`cw`が追加された
- [P3978R3 `constant_wrapper` should unwrap on call and subscript](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3978r3.pdf)
    - `operator()`と`operator[]`を静的メンバ関数とし、`INVOKE`を用いて値をアンラップして呼び出すよう変更された。あわせて`constant_wrapper`と`cw`の定義が[`<type_traits>`](/reference/type_traits.md)から[`<utility>`](/reference/utility.md)へ移動した
- [P4206R0 Revert string support in `std::constant_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4206r0.html)
    - 文字列リテラルのサポートを削除し、テンプレートパラメータを説明用の`cw-fixed-value`から`auto`に戻した。これにともない`value_type`は`decltype(X)`、`value`は`X`自身を参照するよう簡略化された。仕様としてはC++29に導入されるが、C++26に対する欠陥報告 (DR) である
