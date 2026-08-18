# transform
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class F> constexpr auto transform(F&& f) &;        // (1)
template<class F> constexpr auto transform(F&& f) const &;  // (2)
template<class F> constexpr auto transform(F&& f) &&;       // (3)
template<class F> constexpr auto transform(F&& f) const &&; // (4)
```

## 概要
正常値を保持していれば、正常値に対して`f`を適用した結果を`expected`の正常値として格納して返す。
エラー値を保持していれば、そのまま返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`transform`へは、引数リストに1個の`T`型をとり`Return`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T, class E>
class expected {
  template <class Return>
  std::expected<Return, E> transform(function<Return(T)> func);
};
```
* function[link /reference/functional/function.md]


## テンプレートパラメータ制約
- (1), (2) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, decltype(`[`error()`](error.md)`)> == true`
- (3), (4) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<E, decltype(`[`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))> == true`


## 適格要件
- (1), (2) : 型`U`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`**this`](op_deref.md)`)>>`としたとき、次を全て満たすこと
    - `U`が`expected`の有効な正常値型である
    - `U`が（CV修飾された）`void`ではないとき、宣言`U u(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`**this`](op_deref.md)`));`が妥当である
- (3), (4) : 型`U`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`**this`](op_deref.md)`))>>`としたとき、次を全て満たすこと
    - `U`が`expected`の有効な正常値型である
    - `U`が（CV修飾された）`void`ではないとき、宣言`U u(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`**this`](op_deref.md)`)));`が妥当である


## 効果
- (1), (2) : 次の効果をもつ
    - エラー値を保持していたら、`expected<U, E>(`[`unexpect`](../unexpect_t.md)`,` [`error()`](error.md)`)`を返す。
    - 型`U`が（CV修飾された）`void`でなければ、正常値を[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`**this`](op_deref.md)`)`で直接非リスト初期化した`expected<U, E>`オブジェクトを返す。
    - そうでなければ、[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`**this`](op_deref.md)`)`を評価し、`expected<U, E>()`を返す。
- (3), (4) : 次の効果をもつ
    - エラー値を保持していたら、`expected<U, E>(`[`unexpect`](../unexpect_t.md)`,` [`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))`を返す。
    - 型`U`が（CV修飾された）`void`でなければ、正常値を[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`**this`](op_deref.md)`))`で直接非リスト初期化した`expected<U, E>`オブジェクトを返す。
    - そうでなければ、[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`**this`](op_deref.md)`))`を評価し、`expected<U, E>()`を返す。


## 備考
`transform`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。


## 例
```cpp example
#include <cassert>
#include <expected>
#include <numeric>
#include <string>
#include <vector>

// 1..N数列を生成する関数
std::vector<int> make_seq(int n)
{
  std::vector<int> seq(n, 0);
  std::iota(seq.begin(), seq.end(), 1);
  return seq;
}

int main()
{
  std::expected<int, std::string> v1 = 3;
  assert((v1.transform(make_seq).value() == std::vector<int>{1,2,3}));

  std::expected<int, std::string> e1 = std::unexpected{"NaN"};
  assert(e1.transform(make_seq).error() == "NaN");
}
```
* transform[color ff0000]
* value()[link value.md]
* error()[link error.md]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`and_then()`](and_then.md)
- [`or_else()`](or_else.md)
- [`transform_error()`](transform_error.md)


## 参照
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
- [LWG Issue 3877. Incorrect constraints on `const`-qualified monadic overloads for `std::expected`](https://cplusplus.github.io/LWG/issue3877)
    - C++23で、`const`修飾版で誤ってエラーになる問題を解消するため、制約が`is_copy_constructible_v<E>`から`is_constructible_v<E, decltype(error())>`（右辺値版は`decltype(std::move(error()))`）へ変更された
- [LWG Issue 3938. Cannot use `std::expected` monadic ops with move-only `error_type`](https://cplusplus.github.io/LWG/issue3938)
    - C++26で、効果および適格要件で正常値へのアクセスに[`value()`](value.md)ではなく[`**this`](op_deref.md)を使うよう修正され、ムーブのみ可能な`error_type`でも使用できるようになった
