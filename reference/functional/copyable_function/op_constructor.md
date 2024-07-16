# コンストラクタ
* functional[meta header]
* std[meta namespace]
* copyable_function[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
copyable_function() noexcept;                    // (1)
copyable_function(nullptr_t) noexcept;           // (2)
copyable_function(const copyable_function&);     // (3)
copyable_function(copyable_function&&) noexcept; // (4)

template<class F> copyable_function(F&&);        // (5)

template<class T, class... Args>
explicit copyable_function(in_place_type_t<T>, Args&&...); // (6)

template<class T, class U, class... Args>
explicit copyable_function(in_place_type_t<T>, initializer_list<U>, Args&&...); // (7)
```
* in_place_type_t[link /reference/utility/in_place_type_t.md]

## 概要
`copyable_function`オブジェクトを構築する。


`copyable_function`クラステンプレートパラメータのCV修飾子 *cv*, 参照修飾子 *ref*, noexcept例外指定 *noex* に応じて、説明用のプレースホルダ *inv-quals* を次のように定義する :

- *ref* が空（参照修飾無し）ならば、*cv*`&`
- そうでなければ、*cv* *ref*

また、説明用の`bool`型テンプレート定数`is-callable-from<VT>`を下記のように定義する :

- *noex* が`true`のとき : [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, VT /*cv*/ /*ref*/, ArgTypes...> &&` [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, VT /*inv-quals*/, ArgTypes...>`
- *noex* が`false`のとき : [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, VT /*cv*/ /*ref*/, ArgTypes...> &&` [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, VT /*inv-quals*/, ArgTypes...>`


## テンプレートパラメータ制約
- (5) : `VT`型を`decay_t<F>`としたとき
    - `remove_cvref_t<F>`が`copyable_function`と同一型ではなく、かつ
    - `remove_cvref_t<F>`が`in_place_type_t`の特殊化ではなく、かつ
    - `is-callable-from<VT>`が`true`であること
- (6) : `VT`型を`decay_t<T>`としたとき
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT, Args...>`が`true`であり、かつ
    - `is-callable-from<VT>`が`true`であること
- (7) : `VT`型を`decay_t<T>`としたとき
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT,` [`initializer_list`](/reference/initializer_list/initializer_list.md)`<U>&, Args...>`が`true`であり、かつ
    - `is-callable-from<VT>`が`true`であること


## 適格要件
- (5) : `VT`型を`decay_t<F>`としたとき
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<VT, F>`が`true`であり、かつ
    - [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<VT>`が`true`であること
- (6), (7) : `VT`型を`decay_t<T>`としたとき
    - `VT`が`T`と同一型であり、かつ
    - [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<VT>`が`true`であること


## 事前条件
- (5) : `VT`型を`decay_t<F>`としたとき、`VT`がCpp17Destructible要件およびCpp17CopyConstructible要件を満たすこと。
- (6), (7) : `VT`型を`decay_t<T>`としたとき、`VT`がCpp17Destructible要件およびCpp17CopyConstructible要件を満たすこと。


## 効果
- (1), (2) : 関数を持たない空の`copyable_function`オブジェクトを構築する。この方法で構築した後、[`operator bool`](op_bool.md)は`false`を返す。
- (3) : `*this`の格納オブジェクトを
   - `f`が値を保持していない場合、値を保持しない。
   - そうでなければ、`f`が保持する値をコピーして保持する。
- (4) : `f`が保持する状態を`*this`に移動する。移動された後の`f`は、未規定な値を持つ有効な状態となる。
- (5) : `*this`の格納オブジェクトを
    - `f`が関数ポインタ型、メンバ関数ポインタ型、メンバ変数ポインタ型いずれかのヌルポインタ値の場合、値を保持しない。
    - `remove_cvref_t<F>`が`copyable_function`の特殊化であり、かつ値を保持していない場合、値を保持しない。
    - そうでなければ、`*this`が保持する`VT`型の格納オブジェクトを、`std::forward<F>(f)`で直接非リスト初期化する。
- (6) : `*this`が保持する`VT`型の格納オブジェクトを、`std::forward<Args>(args)...`で直接非リスト初期化する。
- (7) : `*this`が保持する`VT`型の格納オブジェクトを、`ilist, std::forward<Args>(args)...`で直接非リスト初期化する。


## 例外
- (1), (2), (4) : 投げない
- (3) : 格納オブジェクトの初期化から例外が投げられる可能性がある。`bad_alloc`例外が投げられる可能性がある。
- (5), (6), (7) : 格納オブジェクトの初期化から例外が投げられる可能性がある。`VT`が関数ポインタまたは[`reference_wrapper`](/reference/functional/reference_wrapper.md)の特殊化いずれでもなければ、`bad_alloc`例外が投げられる可能性がある。


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
  // 空のcopyable_functionオブジェクトを作る
  {
    std::copyable_function<int(int)> f1;
    assert(!f1);
    std::copyable_function<int(int)> f2 = nullptr;
    assert(!f2);
  }

  // (3) コピー構築
  {
    std::copyable_function<int(int)> f = ident_functor();
    std::copyable_function<int(int)> g = f;
    assert(g && f);

    int result = g(1);
    std::cout << "(3) : " << result << std::endl;
  }

  // (4) ムーブ構築
  {
    std::copyable_function<int(int)> f = ident_functor();
    std::copyable_function<int(int)> g = std::move(f);
    assert(g && !f);

    int result = g(1);
    std::cout << "(4) : " << result << std::endl;
  }

  // (5) 関数ポインタを受け取って構築
  {
    std::copyable_function<int(int)> f = ident_func;

    int result = f(1);
    std::cout << "(5) function pointer : " << result << std::endl;
  }
  // (5) 関数オブジェクトを受け取って構築
  {
    std::copyable_function<int(int)> f = ident_functor();

    int result = f(1);
    std::cout << "(5) function object : " << result << std::endl;
  }
  // (5) メンバ関数ポインタを受け取った構築
  {
    std::copyable_function<int(const X&, int)> f = &X::add_member_func;

    X x{2};
    int result = f(x, 1);
    std::cout << "(5) member function pointer : " << result << std::endl;
  }
  // (5) メンバ変数ポインタを受け取った構築
  {
    std::copyable_function<int(const X&)> f = &X::value;
    X x{2};
    int result = f(x);
    std::cout << "(5) member variable pointer : " << result << std::endl;
  }

  // (6) 引数リストによる直接構築コンストラクタ
  {
    std::copyable_function<int(int)> f(std::in_place_type<add_functor>, 2);
    int result = f(1);
    std::cout << "(6) : " << result << std::endl;
  }

  // (7) initializer_list＋引数リストによる直接構築コンストラクタ
  {
    std::copyable_function<int(int)> f(std::in_place_type<add_functor>, std::initializer_list<int>{1, 2, 3}, 4);
    int result = f(5);
    std::cout << "(7) : " << result << std::endl;
  }
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
(3) : 1
(4) : 1
(5) function pointer : 1
(5) function object : 1
(5) member function pointer : 3
(5) member variable pointer : 2
(6) : 3
(7) : 15
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2548R6 copyable_function](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2548r6.pdf)
