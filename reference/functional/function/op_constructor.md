#コンストラクタ
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
function() noexcept;          // (1)
function(nullptr_t) noexcept; // (2)
function(const function& f);  // (3)
function(function&& f);       // (4)

template <class F>
function(F f);                // (5)

template <class Alloc>
function(allocator_arg_t, const Alloc& alloc) noexcept;            // (6)

template <class Alloc>
function(allocator_arg_t, const Alloc& alloc, nullptr_t) noexcept; // (7)

template <class Alloc>
function(allocator_arg_t, const Alloc& alloc, const function& f);  // (8)

template <class Alloc>
function(allocator_arg_t, const Alloc& alloc, function&& f);       // (9)

template <class F, class Alloc>
function(allocator_arg_t, const Alloc& alloc, F f);                // (10)
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

##要件
- (5), (10) :
    - `F`はコピー構築可能であること。
    - `F`のコピーコンストラクタとデストラクタは、例外を投げるべきではない。
    - C++11まで : `F`は、パラメータとして`ArgTypes...`型をとり、戻り値として`R`型を返す関数ポインタ、メンバ関数ポインタ、メンバ変数ポインタ、または関数オブジェクトであること。


##効果
- (1), (2) : 関数を持たない空の`function`オブジェクトを構築する。この方法で構築した後、[`operator bool`](op_bool.md)は`false`を返す。
- (3) : `f`が保持する関数、または関数オブジェクトをコピーする。
- (4) : `f`が保持する状態を`*this`に移動する。移動された後の`f`は、未規定な値を持つ有効な状態となる。
- (5) : `f`がヌルの関数ポインタ、もしくはメンバポインタである場合、構築後の[`operator bool`](op_bool.md)は`false`を返す。`f`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトである場合は、`f`が持つターゲットを`*this`に移動する。
- (6), (7) : アロケータを設定し、関数を持たない空の`function`オブジェクトを構築する。この方法で構築した後、[`operator bool`](op_bool.md)は`false`を返す。
- (9) : アロケータを設定し、`f`が保持する状態を`*this`に移動する。移動された後の`f`は、未規定な値を持つ有効な状態となる。
- (10) : アロケータを設定する。`f`がヌルの関数ポインタ、もしくはメンバポインタである場合、構築後の[`operator bool`](op_bool.md)は`false`を返す。`f`が有効な関数ポインタ、メンバポインタ、もしくは関数オブジェクトである場合は、`f`が持つターゲットを`*this`に移動する。


##例外
- (3), (8) : `f`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)か関数ポインタを保持している場合は、例外を投げるべきではない。`f`が関数オブジェクトを保持している場合は、そのコピーコンストラクタが[`bad_alloc`](/reference/new/bad_alloc.md)やその他の例外を投げる可能性がある。
- (10) : `f`が[`reference_wrapper`](/reference/functional/reference_wrapper.md)か関数ポインタを保持している場合は、例外を投げるべきではない。`f`が関数オブジェクトを保持している場合は、そのコピーコンストラクタもしくはムーブコンストラクタが[`bad_alloc`](/reference/new/bad_alloc.md)やその他の例外を投げる可能性がある。


##備考
- (5), (10) : 
    - C++14 : `F`が、パラメータとして`ArgTypes...`型をとり、戻り値として`R`型を返す関数ポインタ、メンバ関数ポインタ、メンバ変数ポインタ、または関数オブジェクトでない場合、この関数はオーバーロード解決から除外される。


##例
```cpp
#include <cassert>
#include <iostream>
#include <functional>

struct ident_functor {
  int operator()(int x) const
  { return x; }
};

int ident_func(int x)
{ return x; }

struct X {
  int value;
  X() : value(3) {}

  int ident_member_func(int x) const
  { return x; }
};

int main()
{
  // (1)
  // デフォルトコンストラクタ
  // 空のfunctionオブジェクトを作る
  {
    std::function<int(int)> f;
    assert(!f);
  }

  // (2)
  // ヌルポインタを受け取るコンストラクタ
  // デフォルトコンストラクタと同様、空のfunctionオブジェクトを作る
  {
    std::function<int(int)> f = nullptr;
    assert(!f);
  }

  // (3)
  // コピー構築
  {
    std::function<int(int)> f = ident_functor();
    std::function<int(int)> g = f;

    int result = g(1);
    std::cout << "(3) : " << result << std::endl;
  }

  // (4)
  // ムーブ構築
  {
    std::function<int(int)> f = ident_functor();
    std::function<int(int)> g = std::move(f);

    int result = g(1);
    std::cout << "(4) : " << result << std::endl;
  }

  // (5)
  // 関数ポインタを受け取って構築
  {
    std::function<int(int)> f = ident_func;

    int result = f(1);
    std::cout << "(5) function pointer : " << result << std::endl;
  }

  // (5)
  // 関数オブジェクトを受け取って構築
  {
    std::function<int(int)> f = ident_functor();

    int result = f(1);
    std::cout << "(5) function object : " << result << std::endl;
  }

  // (5)
  // メンバ関数ポインタを受け取った構築
  {
    std::function<int(const X&, int)> f = &X::ident_member_func;

    X x;
    int result = f(x, 1);
    std::cout << "(5) member function pointer : " << result << std::endl;
  }

  // (5)
  // メンバ変数ポインタを受け取った構築
  {
    std::function<int(const X&)> f = &X::value;

    X x;
    int result = f(x);
    std::cout << "(5) member variable pointer : " << result << std::endl;
  }

  // (6)
  // アロケータを受け取って空のfunctionオブジェクトを構築
  {
    // ※ここではint型を対象とするアロケータを渡しているが、内部で適切な関数の型にrebindして使われる。
    std::function<int(int)> f(std::allocator_arg, std::allocator<int>());
    assert(!f);
  }

  // (7)
  // アロケータとヌルポインタを受け取って、空のfunctionオブジェクトを構築
  {
    std::function<int(int)> f(std::allocator_arg, std::allocator<int>(), nullptr);
    assert(!f);
  }

  // (8)
  // アロケータを受け取り、functionオブジェクトをコピー構築
  {
    std::function<int(int)> f = ident_functor();
    std::function<int(int)> g(std::allocator_arg, std::allocator<int>(), f);

    int result = g(1);
    std::cout << "(8) : " << result << std::endl;
  }

  // (9)
  // アロケータを受け取り、functionオブジェクトをムーブ構築
  {
    std::function<int(int)> f = ident_functor();
    std::function<int(int)> g(std::allocator_arg, std::allocator<int>(), std::move(f));

    int result = g(1);
    std::cout << "(9) : " << result << std::endl;
  }

  // (10)
  // 関数ポインタ、関数オブジェクト、メンバポインタのいずれかを受け取った構築
  {
    std::function<int(int)> f(std::allocator_arg, std::allocator<int>(), ident_functor());

    int result = f(1);
    std::cout << "(10) : " << result << std::endl;
  }
}
```
* assert[link /reference/cassert/assert.md]

###出力
```
(3) : 1
(4) : 1
(5) function pointer : 1
(5) function object : 1
(5) member function pointer : 1
(5) member variable pointer : 3
(8) : 1
(9) : 1
(10) : 1
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6(アロケータを受け取るバージョンは、4.8.2時点でサポートされていない)
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [N2308 Adding allocator support to `std::function` for C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2308.html)
- [LWG Issue 2132. `std::function` ambiguity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2132)
    - C++14から、(5)と(10)でシグニチャが合わない関数オブジェクトが渡された場合に、SFINAEされるようになった。

