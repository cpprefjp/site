# expected
* expected[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  // プライマリテンプレート
  template<class T, class E>
  class expected;

  // T=cv void 部分特殊化テンプレート
  template<class T, class E>
    requires is_void_v<T>
  class expected<T, E>;
}
```
* is_void_v[link /reference/type_traits/is_void.md]

## 概要
`expected`クラスは、任意の型`T`の値を正常値とし任意の型`E`の値をエラー値として、正常もしくはエラーいずれかの状態を取ることを値として表現できる型である。

このクラスは、ヒープからの動的メモリ確保を行わない。
実装は配置newのような機能によって、スタック領域のメモリのみを使用する。


## 適格要件

- 型`T`および型`E`は、参照型、関数型、[`in_place_t`](/reference/utility/in_place_t.md)、[`unexpect_t`](unexpect_t.md)のいずれでもないこと。
- 型`T`は[`unexpected`](unexpected.md)の特殊化ではないこと。
- 型`T`が（CV修飾された）`void`型でなければ、型`T`はCpp17Destructible要件を満たすこと。
- 型`E`は非オブジェクト型、配列型、`unexpected`の特殊化、CV修飾された型のいずれでもないこと。
- 型`E`はCpp17Destructible要件を満たすこと。


## メンバ関数（プライマリテンプレート）
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`(constructor)`](expected/op_constructor.md) | コンストラクタ | C++23 |
| [`(destructor)`](expected/op_destructor.md)   | デストラクタ | C++23 |

### 代入

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`operator=`](expected/op_assign.md) | 代入演算子 | C++23 |
| [`emplace`](expected/emplace.md) | 正常値型のコンストラクタ引数から直接構築する | C++23 |
| [`swap`](expected/swap.md) | 他の`expected`オブジェクトとデータを入れ替える | C++23 |

### 値の観測

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`operator->`](expected/op_arrow.md) | 正常値へのメンバアクセス | C++23 |
| [`operator*`](expected/op_deref.md) | 正常値への間接参照 | C++23 |
| [`operator bool`](expected/op_bool.md) | 正常値を保持しているかを判定する | C++23 |
| [`has_value`](expected/has_value.md) | 正常値を保持しているかを判定する | C++23 |
| [`value`](expected/value.md) | 正常値を取得する | C++23 |
| [`error`](expected/error.md) | エラー値を取得する | C++23 |
| [`value_or`](expected/value_or.md) | 正常値もしくは指定された値を取得する | C++23 |
| [`error_or`](expected/error_or.md) | エラー値もしくは指定された値を取得する | C++23 |

### モナド操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`and_then`](expected/and_then.md) | 正常値に対して関数を適用する | C++23 |
| [`or_else`](expected/or_else.md) | エラー値に対して関数を適用する | C++23 |
| [`transform`](expected/transform.md) | 正常値を変換する | C++23 |
| [`transform_error`](expected/transform_error.md) | エラー値を変換する | C++23 |

### 比較

| 名前         | 説明       | 対応バージョン |
|--------------|------------|-------|
| [`operator==`](expected/op_equal.md) | 等値比較 | C++23 |
| [`operator!=`](expected/op_not_equal.md) | 非等値比較 | C++23 |


## メンバ関数（T=cv void 部分特殊化テンプレート）
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`(constructor)`](expected.void/op_constructor.md) | コンストラクタ | C++23 |
| [`(destructor)`](expected.void/op_destructor.md)   | デストラクタ | C++23 |

### 代入

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`operator=`](expected.void/op_assign.md) | 代入演算子 | C++23 |
| [`emplace`](expected.void/emplace.md) | 正常値を保持する | C++23 |
| [`swap`](expected.void/swap.md) | 他の`expected`オブジェクトとデータを入れ替える | C++23 |

### 値の観測

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|-------|
| [`operator*`](expected.void/op_deref.md) | 正常値への間接参照 | C++23 |
| [`operator bool`](expected.void/op_bool.md) | 正常値を保持しているかを判定する | C++23 |
| [`has_value`](expected.void/has_value.md) | 正常値を保持しているかを判定する | C++23 |
| [`value`](expected.void/value.md) | 正常値を取得する | C++23 |
| [`error`](expected.void/error.md) | エラー値を取得する | C++23 |
| [`error_or`](expected.void/error_or.md) | エラー値もしくは指定された値を取得する | C++23 |

（`expected<cv void, E>` 部分特殊化では、演算子オーバーロード`operator->`およびメンバ関数`value_or`は提供されない。）

### モナド操作

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`and_then`](expected.void/and_then.md) | 正常値に対して関数を適用する | C++23 |
| [`or_else`](expected.void/or_else.md) | エラー値に対して関数を適用する | C++23 |
| [`transform`](expected.void/transform.md) | 正常値を変換する | C++23 |
| [`transform_error`](expected.void/transform_error.md) | エラー値を変換する | C++23 |

### 比較

| 名前         | 説明       | 対応バージョン |
|--------------|------------|-------|
| [`operator==`](expected.void/op_equal.md) | 等値比較 | C++23 |
| [`operator!=`](expected.void/op_not_equal.md) | 非等値比較 | C++23 |


## メンバ型

| 名前              | 説明            | 対応バージョン |
|-------------------|-----------------|-------|
| `value_type`      | 正常値の型`T`   | C++23 |
| `error_type`      | エラー値の型`E` | C++23 |
| `unexpected_type` | [`unexpected<E>`](unexpected.md) | C++23 |
| `template<class U> rebind` | `expected<U, error_type>` | C++23 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`swap`](expected/swap_free.md) | 2つの`expected<T, E>`オブジェクトを入れ替える | C++23 |
| [`swap`](expected.void/swap_free.md) | 2つの`expected<cv void, E>`オブジェクトを入れ替える | C++23 |


## 例
```cpp example
#include <expected>
#include <iomanip>
#include <iostream>
#include <string>

// 整数除算
std::expected<int, std::string> idiv(int a, int b)
{
  if (b == 0) {
    return std::unexpected{"divide by zero"};
  }
  if (a % b != 0) {
    return std::unexpected{"out of domain"};        
  }
  return a / b;
}

void dump_result(const std::expected<int, std::string>& v)
{
  if (v) {
    std::cout << *v << std::endl;
  } else {
    std::cout << std::quoted(v.error()) << std::endl;        
  }
}

int main()
{
  dump_result(idiv(10, 2));
  dump_result(idiv(10, 3));
  dump_result(idiv(10, 0));
}
```
* std::expected[color ff0000]
* std::unexpected[link unexpected.md]
* *v[link expected/op_deref.md]
* v.error()[link expected/error.md]
* std::quoted[link ../iomanip/quoted.md]

### 出力
```
5
"out of domain"
"divide by zero"
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`unexpected`](unexpected.md)
- [`optional`](/reference/optional/optional.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
