# コンストラクタ
* variant[meta header]
* std[meta namespace]
* variant[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr variant() noexcept(see below);                 // (1)
constexpr variant(const variant& other);                 // (2)
constexpr variant(variant&& other) noexcept(see below);  // (3)

template <class T>
constexpr variant(T&& x) noexcept(see below);            // (4)

template <class T, class... Args>
constexpr explicit variant(in_place_type_t<T>,
                           Args&&... args);              // (5)

template <class T, class U, class... Args>
constexpr explicit variant(in_place_type_t<T>,
                           initializer_list<U> il,
                           Args&&... args);              // (6)

template <size_t I, class... Args>
constexpr explicit variant(in_place_index_t<I>,
                           Args&&... args);              // (7)

template <size_t I, class U, class... Args>
constexpr explicit variant(in_place_index_t<I>,
                           initializer_list<U> il,
                           Args&&... args);              // (8)
```
* size_t[link /reference/cstddef/size_t.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* in_place_type_t[link /reference/utility/in_place_type_t.md]
* in_place_index_t[link /reference/utility/in_place_index_t.md]

## 概要
`variant`オブジェクトを構築する。

- (1) : デフォルト構築。0番目の候補型の値を保持する
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : 候補型のいずれかの型の値を保持する
- (5) : 候補型のうち、指定した型のコンストラクタ引数を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (6) : 候補型のうち、指定した型のコンストラクタ引数`il`と`args...`を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (7) : 候補型のうち、指定したインデックスの型のコンストラクタ引数を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する
- (8) : 候補型のうち、指定したインデックスの型のコンストラクタ引数`il`と`args...`を受け取ってコンストラクタ内でそのオブジェクトを構築して保持する


## テンプレートパラメータ制約
- 候補型`Types...`のi番目の型を`Ti`とする
- (1) : [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<T0>`であること
- (2) : 全ての型`Ti`について、[`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<Ti>`が`true`であること
- (3) : 全ての型`Ti`について、[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<Ti>`が`true`であること


## 効果
- (1) : `T0`型を値初期化して保持する
- (2) :
    - `other`が値を保持している場合、`other.`[`index()`](index.md)を`j`として、[`get`](get.md)`<j>(other)`で得られた`other`が保持する値を直接初期化によって`*this`に保持する
    - そうでない場合、`*this`は値を保持しない
- (3) :
    - `other`が値を保持している場合、`other.`[`index()`](index.md)を`j`として、[`get`](get.md)`<j>(`[`std::move`](/reference/utility/move.md)`(other))`で得られた`other`が保持する値を直接初期化によって`*this`に保持する
    - そうでない場合、`*this`は値を保持しない
- (4) : (執筆中)


## 事後条件
- (1) :
    - [`valueless_by_exception()`](valueless_by_exception.md)が`false`であること
    - [`index()`](index.md)が`0`であること


## 例外
- (1) :
    - `T0`型を値初期化した際、その型のコンストラクタによって任意の例外が送出される可能性がある
    - `noexcept`内の式は、[`is_nothrow_default_constructible_v`](/reference/type_traits/is_nothrow_default_constructible.md)`<T0>`と等価
- (2) :
    - 全ての型`Ti`の直接初期化が、任意の例外を送出する可能性がある
- (3) :
    - 全ての型`Ti`のムーブ構築が、任意の例外を送出する可能性がある
    - `noexcept`内の式は、全ての`Ti`についての[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<Ti>`を論理積したものと等価


## 備考
- (1) : `T0`型の値初期化が`constexpr`関数の要件を満たす場合、この関数は`constexpr`となる
- (2) : 全ての`Ti`型について、[`is_trivially_copy_constructible_v`](/reference/type_traits/is_trivially_copy_constructible.md)`<Ti>`が`true`である場合、この関数は自明となる
- (3) : 全ての`Ti`型について、[`is_trivially_move_constructible_v`](/reference/type_traits/is_trivially_move_constructible.md)`<Ti>`が`true`である場合、この関数は自明となる


## 例
```cpp example
```

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0608R3 A sane variant converting constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0608r3.html)
