# optional
* optional[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  class optional;
}
```

## 概要
`optional`クラスは、任意の型`T`の値を有効値として、あらゆる型に共通の無効値状態を表現できる型である。

このクラスには、大きく2つの用途がある：

1. オブジェクトの初期化タイミングを遅延させる
2. エラー報告のために、あらゆる型に共通の無効値表現を持たせる

オブジェクトは定義した時点で初期化が行われるが、`optional`クラスはその初期化タイミングを遅延させるために使用できる。この用途には、[`std::shared_ptr`](/reference/memory/shared_ptr.md)のようなスマートポインタを使用することもできるが、このクラスは動的メモリ確保を行わないため、リソース管理ではなく初期化タイミングを遅延させるだけであれば、このクラスの方が適している。

エラー報告について、このクラスを使用しない場合、従来の方法として有効値と無効値は、以下のように表現されていた：

- `int`型の場合、0以上の値を有効な値とし、エラーが起きたら負数を代入する
- ポインタの場合、オブジェクトへのポインタを有効な値とし、どこも差さないヌルポインタを無効値として代入する

このような有効値と無効値の表現は、変数単位もしくはAPI・ライブラリ単位での仕様である。`optional`クラスでは、[`nullopt`](nullopt_t.md)という特殊な定数を無効値とし、あらゆる型に共通の無効状態を持たせられるようになっている。

このクラスは、ヒープからの動的メモリ確保を行わない。実装は配置newや[`std::aligned_storage`](/reference/type_traits/aligned_storage.md)のような機能によって、スタック領域のメモリのみを使用する。


## 要件
型`T`が以下のいずれかに該当してはならない：

- 参照型
- CV修飾された型
- [`std::in_place_t`](/reference/utility/in_place_t.md)
- [`std::nullopt_t`](nullopt_t.md)

また、型`T`は[破棄可能](/reference/concepts/Destructible.md)であること。


## 備考
このクラスの前身となった[Boost Optional Library](boost.org/libs/optional)では、`optional<int&>`のように左辺値参照を要素型とした場合に、無効値の領域を最適化する機能が入っていた。

標準ライブラリの`optional`クラスには現在、参照を持たせることはできない。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](optional/op_constructor.md) | コンストラクタ | C++17 |
| [`(destructor)`](optional/op_destructor.md)   | デストラクタ | C++17 |


### 代入

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator=`](optional/op_assign.md) | 代入演算子 | C++17 |
| [`emplace`](optional/emplace.md)     | 要素型のコンストラクタ引数から直接構築する | C++17 |
| [`swap`](optional/swap.md)           | 他の`optional`オブジェクトとデータを入れ替える | C++17 |
| [`reset`](optional/reset.md)         | 有効値を保持していない状態にする | C++17 |


### 値の観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator*`](optional/op_deref.md)    | 間接参照 | C++17 |
| [`operator->`](optional/op_arrow.md)   | メンバアクセス | C++17 |
| [`operator bool`](optional/op_bool.md) | 有効な値を保持しているかを判定する | C++17 |
| [`has_value`](optional/has_value.md)   | 有効な値を保持しているかを判定する | C++17 |
| [`value`](optional/value.md)           | 有効値を取得する | C++17 |
| [`value_or`](optional/value_or.md)     | 有効値もしくは指定された無効値を取得する | C++17 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型`T` | C++17 |


## 非メンバ関数
### ヘルパ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`make_optional`](make_optional.md) | 有効な値を保持する`optional`オブジェクトを構築する | C++17 |


### 値の入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](optional/swap_free.md) | 2つの`optional`オブジェクトを入れ替える | C++17 |


### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](optional/op_equal.md)         | 等値比較 | C++17 |
| [`operator!=`](optional/op_not_equal.md)     | 非等値比較 | C++17 |
| [`operator<`](optional/op_less.md)           | 左辺が右辺より小さいかを判定する | C++17 |
| [`operator<=`](optional/op_less_equal.md)    | 左辺が右辺以下かを判定する | C++17 |
| [`operator>`](optional/op_greater.md)        | 左辺が右辺より大きいかを判定する | C++17 |
| [`operator>=`](optional/op_greater_equal.md) | 左辺が右辺以上かを判定する | C++17 |


## 推論補助

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|------------------------------------|-------|
| [`(deduction_guide)`](optional/op_deduction_guide.md) | クラステンプレートの推論補助 | C++17 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------|----------------------------------------|-------|
| `template <class T> struct hash;`              | `hash`クラスの先行宣言                 | C++17 |
| `template <class T> struct hash<optional<T>>;` | `hash`クラスの`optional`に対する特殊化 | C++17 |


## 例
```cpp
#include <iostream>
#include <optional>

// 除算をする関数。
// ゼロ割りを試みた場合、無効値が返る
std::optional<int> safe_divide(int a, int b)
{
  if (b == 0)
    return std::nullopt;

  return a / b;
}

int main()
{
  // 9/3を計算する
  std::optional<int> result1 = safe_divide(9, 3);
  if (result1) { // 計算に成功した場合、有効値が返る
    int x = result1.value(); // 有効値を取り出す
    std::cout << x << std::endl;
  }

  // 3/0の計算を試みる
  std::optional<int> result2 = safe_divide(3, 0);
  if (!result2) { // 計算に失敗した場合、無効値が返る
    std::cout << "error" << std::endl;
  }
}
```
* std::nullopt[link nullopt_t.md]
* if (result1)[link optional/op_bool.md]
* if (!result2)[link optional/op_bool.md]
* result1.value()[link optional/value.md]

### 出力
```
3
error
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N1878 A proposal to add an utility class to represent optional objects (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1878.htm)
- [N3406 A proposal to add a utility class to represent optional objects (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3406.html)
- [N3527 A proposal to add a utility class to represent optional objects (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3527.html)
- [N3672 A proposal to add a utility class to represent optional objects (Revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3672.html)
- [N3793 A proposal to add a utility class to represent optional objects (Revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3793.html)
- [N3966 Fixes for optional objects](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3966.html)
- [N3982 Rvalue reference overloads for optional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3982.html)
- [N4480 Programming Languages — C++ Extensions for Library Fundamentals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4480.html)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
- [P0032R0 Homogeneous interface for `variant`, `any` and `optional`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r0.pdf)
- [P0032R1 Homogeneous interface for `variant`, `any` and `optional` (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0032r1.pdf)
- [P0032R2 Homogeneous interface for `variant`, `any` and `optional` (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r2.pdf)
- [P0032R3 Homogeneous interface for `variant`, `any` and `optional` (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0032r3.pdf)
- [P0307R0 Making Optional Greater Equal Again](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0307r0.pdf)
- [P0307R2 Making Optional Greater Equal Again](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0307r2.pdf)
- [P0504R0 Revisiting in-place tag types for `any`/`optional`/`variant`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0504r0.html)
