# transform_error
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* expected[meta class]
* cpp23[meta cpp]

```cpp
template<class F> constexpr auto transform_error(F&& f) &;        // (1)
template<class F> constexpr auto transform_error(F&& f) const &;  // (2)
template<class F> constexpr auto transform_error(F&& f) &&;       // (3)
template<class F> constexpr auto transform_error(F&& f) const &&; // (4)
```

## 概要
エラー値を保持していれば、エラー値に対して`f`を適用した結果を`expected`のエラー値として格納して返す。
正常値を保持していれば、そのまま返す。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`transform_error`へは、引数リストに1個の`E`型をとり`Return`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T, class E>
class expected {
  template <class Return>
  std::expected<T, Return> transform_error(function<Return(E)> func);
};
```
* function[link /reference/functional/function.md]


## テンプレートパラメータ制約
- (1), (2) : [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<T> == true`
- (3), (4) : [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<T> == true`


## 適格要件
- (1), (2) : 型`G`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`error()`](error.md)`)>>`としたとき、次を全て満たすこと
    - `G`が`expected`の有効なエラー値型である
    - 宣言`G g(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`error()`](error.md)`));`が妥当である
- (3), (4) : 型`G`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))>>`としたとき、次を全て満たすこと
    - `G`が`expected`の有効なエラー値型である
    - 宣言`G g(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`)));`が妥当である


## 効果
- (1), (2) : 次の効果をもつ
    - 正常値を保持していたら、`expected<T, G>(`[`in_place`](/reference/utility/in_place_t.md)`,` [`value()`](value.md)`)`を返す。
    - そうでなければ、エラー値を[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`error()`](error.md)`)`で直接非リスト初期化した`expected<T, G>`オブジェクトを返す。
- (3), (4) : 次の効果をもつ
    - 正常値を保持していたら、`expected<T, G>(`[`in_place`](/reference/utility/in_place_t.md)`,` [`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`))`を返す。
    - そうでなければ、エラー値を[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`error()`](error.md)`))`で直接非リスト初期化した`expected<T, G>`オブジェクトを返す。


## 備考
`transform_error`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。


## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <expected>
#include <string>

// 文字列を逆順に並べ替える関数
std::string revstr(std::string str)
{
  std::reverse(str.begin(), str.end());
  return str;
}

int main()
{
  std::expected<int, std::string> v1 = 42;
  assert(v1.transform_error(revstr).value() == 42);

  std::expected<int, std::string> e1 = std::unexpected{"Oops"};
  assert(e1.transform_error(revstr).error() == "spoO");
}
```
* transform_error[color ff0000]
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
- [`transform()`](transform.md)


## 参照
- [P2505R5 Monadic Functions for `std::expected`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2505r5.html)
