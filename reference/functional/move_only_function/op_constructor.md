# コンストラクタ
* functional[meta header]
* std[meta namespace]
* move_only_function[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
move_only_function() noexcept;                     // (1)
move_only_function(nullptr_t) noexcept;            // (2)
move_only_function(move_only_function&&) noexcept; // (3)

template<class F> move_only_function(F&&);         // (4)

template<class T, class... Args>
explicit move_only_function(in_place_type_t<T>, Args&&...); // (5)

template<class T, class U, class... Args>
explicit move_only_function(in_place_type_t<T>, initializer_list<U>, Args&&...); // (6)
```
* in_place_type_t[link /reference/utility/in_place_type_t.md]

## 概要
`move_only_function`オブジェクトを構築する。


`move_only_function`クラステンプレートパラメータのCV修飾子 *cv*, 参照修飾子 *ref*, noexcept例外指定 *noex* に応じて、説明用のプレースホルダ *inv-quals* を次のように定義する :

- *ref* が空（参照修飾無し）ならば、*cv*`&`
- そうでなければ、*cv* *ref*

また、説明用の`bool`型テンプレート定数`is-callable-from<VT>`を下記のように定義する :

- *noex* が`true`のとき : [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, VT /*cv*/ /*ref*/, ArgTypes...> &&` [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, VT /*inv-quals*/, ArgTypes...>`
- *noex* が`false`のとき : [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, VT /*cv*/ /*ref*/, ArgTypes...> &&` [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, VT /*inv-quals*/, ArgTypes...>`


## テンプレートパラメータ制約
- (4) : `VT`型を`decay_t<F>`としたとき
    - `remove_cvref_t<F>`が`move_only_function`と同一型ではなく、かつ
    - `remove_cvref_t<F>`が`in_place_type_t`の特殊化ではなく、かつ
    - `is-callable-from<VT>`が`true`であること
- (5) : `VT`型を`decay_t<T>`としたとき
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT, Args...>`が`true`であり、かつ
    - `is-callable-from<VT>`が`true`であること
- (6) : `VT`型を`decay_t<T>`としたとき
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...>`が`true`であり、かつ
    - `is-callable-from<VT>`が`true`であること


## 適格要件
- (4) : `VT`型を`decay_t<F>`としたとき、[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT, F>`が`true`であること。
- (5), (6) : `decay_t<T>`が`T`と同一型であること。


## 事前条件
- (4) : `VT`型を`decay_t<F>`としたとき
    - `VT`がCpp17Destructible要件を満たすこと。
    - [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<VT>`が`true`の場合、`VT`がCpp17MoveConstructible要件を満たすこと。
- (5), (6) : `VT`型を`decay_t<T>`としたとき
    - `VT`がCpp17Destructible要件を満たすこと。
    - [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<VT>`が`true`の場合、`VT`がCpp17MoveConstructible要件を満たすこと。


## 効果
- (1), (2) : 関数を持たない空の`move_only_function`オブジェクトを構築する。この方法で構築した後、[`operator bool`](op_bool.md)は`false`を返す。
- (3) : `f`が保持する状態を`*this`に移動する。移動された後の`f`は、未規定な値を持つ有効な状態となる。
- (4) : `*this`の格納オブジェクトを
    - `f`が関数ポインタ型、メンバ関数ポインタ型、メンバ変数ポインタ型いずれかのヌルポインタ値の場合、値を保持しない。
    - `remove_cvref_t<F>`が`move_only_function`の特殊化であり、かつ値を保持していない場合、値を保持しない。
    - そうでなければ、`*this`が保持する`VT`型の格納オブジェクトを、`std::forward<F>(f)`で直接非リスト初期化する。
- (5) : `*this`が保持する`VT`型の格納オブジェクトを、`std::forward<Args>(args)...`で直接非リスト初期化する。
- (6) : `*this`が保持する`VT`型の格納オブジェクトを、`ilist, std::forward<Args>(args)...`で直接非リスト初期化する。


## 例外
- (1), (2), (3) : 投げない
- (4), (5), (6) : 格納オブジェクトの初期化から例外が投げられる可能性がある。`VT`が関数ポインタまたは[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化いずれでもなければ、`bad_alloc`例外が投げられる可能性がある。


## 例
```cpp example
#include <cassert>
#include <functional>
#include <iostream>
#include <numeric>
#include <utility>

struct ident_functor {
  int operator()(int x) const
  { return x; }
};

int ident_func(int x)
{ return x; }

struct X {
  int value;

  int add_member_func(int x) const
  { return value + x; }
};

struct add_functor {
  int value;

  add_functor(int v) : value(v) {}
  add_functor(std::initializer_list<int> lst, int iv)
    : value(std::accumulate(lst.begin(), lst.end(), iv)) {}

  int operator()(int x) const
  { return value + x; }
};


int main()
{
  // (1) デフォルトコンストラクタ
  // (2) ヌルポインタを受け取るコンストラクタ
  // 空のmove_only_functionオブジェクトを作る
  {
    std::move_only_function<int(int)> f1;
    assert(!f1);
    std::move_only_function<int(int)> f2 = nullptr;
    assert(!f2);
  }

  // (3) ムーブ構築
  {
    std::move_only_function<int(int)> f = ident_functor();
    std::move_only_function<int(int)> g = std::move(f);
    assert(g && !f);

    int result = g(1);
    std::cout << "(3) : " << result << std::endl;
  }

  // (4) 関数ポインタを受け取って構築
  {
    std::move_only_function<int(int)> f = ident_func;

    int result = f(1);
    std::cout << "(4) function pointer : " << result << std::endl;
  }
  // (4) 関数オブジェクトを受け取って構築
  {
    std::move_only_function<int(int)> f = ident_functor();

    int result = f(1);
    std::cout << "(4) function object : " << result << std::endl;
  }
  // (4) メンバ関数ポインタを受け取った構築
  {
    std::move_only_function<int(const X&, int)> f = &X::add_member_func;

    X x{2};
    int result = f(x, 1);
    std::cout << "(4) member function pointer : " << result << std::endl;
  }
  // (4) メンバ変数ポインタを受け取った構築
  {
    std::move_only_function<int(const X&)> f = &X::value;
    X x{2};
    int result = f(x);
    std::cout << "(4) member variable pointer : " << result << std::endl;
  }

  // (5) 引数リストによる直接構築コンストラクタ
  {
    std::move_only_function<int(int)> f(std::in_place_type<add_functor>, 2);
    int result = f(1);
    std::cout << "(5) : " << result << std::endl;
  }

  // (6) initializer_list＋引数リストによる直接構築コンストラクタ
  {
    std::move_only_function<int(int)> f(std::in_place_type<add_functor>, std::initializer_list<int>{1, 2, 3}, 4);
    int result = f(5);
    std::cout << "(6) : " << result << std::endl;
  }
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
(3) : 1
(4) function pointer : 1
(4) function object : 1
(4) member function pointer : 3
(4) member variable pointer : 2
(5) : 3
(6) : 15
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0288R9 move_only_function](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0288r9.html)
