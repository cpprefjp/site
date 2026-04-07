# transform
* optional[meta header]
* function template[meta id-type]
* std[meta namespace]
* optional[meta class]
* cpp23[meta cpp]

```cpp
// optional<T>版のオーバーロード
template <class F> constexpr auto transform(F&& f) &;       // (1) C++23
template <class F> constexpr auto transform(F&& f) &&;      // (2) C++23
template <class F> constexpr auto transform(F&& f) const&;  // (3) C++23
template <class F> constexpr auto transform(F&& f) const&&; // (4) C++23

// optional<T&>版のオーバーロード (C++26)
template <class F>
constexpr optional<invoke_result_t<F, T&>>
  transform(F&& f) const;                                    // (5) C++26
```

## 概要
有効値を保持していれば、値に対して`f`を適用した結果を`optional`に格納して返す。
有効値を保持していなければ、[`std::nullopt`](../nullopt_t.md)を返す。

- (1) : `*this`が非`const`左辺値の場合
- (2) : `*this`が非`const`右辺値の場合
- (3) : `*this`が`const`左辺値の場合
- (4) : `*this`が`const`右辺値の場合
- (5) : `optional<T&>`の場合

`optional<T>`では (1)～(4) が定義され、`optional<T&>`では (5) のみが定義される。

実際には複数オーバーロードが提供されるが、大まかには下記シグニチャのようにみなせる。
`transform`へは、引数リストに1個の`T`型をとり`Return`型を返す関数や関数オブジェクトを与える。

```cpp
template <class T>
class optional {
  template <class Return>
  std::optional<Return> transform(function<Return(T)> func);
};
```
* function[link /reference/functional/function.md]


説明用の`U`型を次の通りとする：

- (1), (3) : [`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`value()`](value.md)`)>`
- (2), (4) : [`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(`[`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`))>`
- (5) : [`remove_cv_t`](/reference/type_traits/remove_cv.md)`<`[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, decltype(*val)>>` (説明専用メンバ`val`は`T*`型)


## 適格要件
- (1), (3) :
    - `U`型は[`in_place_t`](/reference/utility/in_place_t.md), [`nullopt_t`](../nullopt_t.md)いずれでもなく、非配列オブジェクト型であること。
    - ある変数`u`の宣言 `U u(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`value()`](value.md)`));` が妥当であること。
- (2), (4) :
    - `U`型は[`in_place_t`](/reference/utility/in_place_t.md), [`nullopt_t`](../nullopt_t.md)いずれでもなく、非配列オブジェクト型であること。
    - ある変数`u`の宣言 `U u(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`)));` が妥当であること。
- (5) :
    - `U`型は`optional`に対する有効な要素型であること。
    - ある変数`u`の宣言 `U u(`[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f), *val));` が妥当であること。


## 効果
- (1), (3) : `*this`が有効値を保持するときは、[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`value()`](value.md)`)`で直接非リスト初期化した`optional<U>`オブジェクトを返す。有効値を保持しないときは、`optional<U>()`を返す。
- (2), (4) : `*this`が有効値を保持するときは、[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f),` [`std::move`](/reference/utility/move.md)`(`[`value()`](value.md)`))`で直接非リスト初期化した`optional<U>`オブジェクトを返す。有効値を保持しないときは、`optional<U>()`を返す。
- (5) : `*this`が有効値を保持するときは、[`invoke`](/reference/functional/invoke.md)`(`[`std::forward`](/reference/utility/forward.md)`<F>(f), *val)`で直接非リスト初期化した`optional<U>`オブジェクトを返す。有効値を保持しないときは、`optional<U>()`を返す。


## 備考
`transform`は、メソッドチェーンをサポートするモナド風(monadic)操作として導入された。
関数型プログラミングの文脈における Functor Map 操作に対応する。


## 例
```cpp example
#include <cassert>
#include <optional>

int twice(int n)
{
  return n * 2;
}

int main()
{
  std::optional<int> o1 = 2;
  assert(o1.transform(twice).value() == 4);

  std::optional<int> o2 = std::nullopt;
  assert(not o2.transform(twice).has_value());
}
```
* transform[color ff0000]
* std::nullopt[link ../nullopt_t.md]
* value()[link value.md]
* has_value()[link has_value.md]


### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`and_then`](and_then.md)
- [`or_else`](or_else.md)


## 参照
- [P0798R8 Monadic operations for std::optional](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0798r8.html)
- [P2988R12 `std::optional<T&>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2988r12.pdf)
    - C++26で参照型`T&`に対する部分特殊化を追加
