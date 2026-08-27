# operator=
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unique_ptr& operator=(unique_ptr&& u) noexcept;           // (1) C++11
constexpr unique_ptr& operator=(unique_ptr&& u) noexcept; // (1) C++23

template <class U, class E>
unique_ptr& operator=(unique_ptr<U, E>&& u) noexcept;           // (2) C++11 単一オブジェクト版
                                                                // (2) C++17 配列版
template <class U, class E>
constexpr unique_ptr& operator=(unique_ptr<U, E>&& u) noexcept; // (2) C++23

unique_ptr& operator=(nullptr_t) noexcept;            // (3) C++11
constexpr unique_ptr& operator=(nullptr_t) noexcept;  // (3) C++23

unique_ptr& operator=(const unique_ptr&) = delete;    // (4) C++11
```

## 概要
- (1) : 自身が保持しているリソースを解放し、`u`から`*this`に所有権を譲渡する。
- (2) : 自身が保持しているリソースを解放し、変換可能な`u`から`*this`に所有権を譲渡する
- (3) : 自身が保持しているリソースを解放する。
- (4) : コピー代入禁止。


## テンプレートパラメータ制約
- (1) :
    - C++20 : [`is_move_assignable_v`](/reference/type_traits/is_move_assignable.md)`<D> == true`であること。
- (2) 単一オブジェクト : 以下を全て満たすこと：
    - `unique_ptr<U, E>::pointer`が、`pointer`に暗黙変換可能な型であること。
    - `U`が配列型ではないこと。
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<D&, E&&> == true`であること。
- (2) 配列 : 以下を全て満たすこと：
    - `U`は配列型であること。
    - `*this`の型`UP`について、`UP::pointer`と`UP::element_type*`が同じ型であること。
    - `u`の型`UP`について、`UP::pointer`と`UP::element_type*`が同じ型であること。
    - `unique_ptr<U, D>::element_type(*)[]`から`unique_ptr<T[], D>::element_type(*)[]`へ変換可能であること。
    - [`is_assignable_v`](/reference/type_traits/is_assignable.md)`<D&, E&&> == true`であること。


## 要件
- (1) : デリータの型`D`が、例外を投げずにムーブ構築可能であること。


## 効果
- (1), (2) :

```cpp
reset(u.release());
d_ = std::forward<E>(u.get_deleter());
```
* reset[link reset.md]
* release[link release.md]
* get_deleter()[link get_deleter.md]


- (3) : [`reset()`](reset.md)


## 事後条件
- (1), (2) : [`addressof`](/reference/memory/addressof.md)`(u) != this`である場合、`u.`[`get()`](get.md)` == nullptr`となる。そうでない（自己ムーブ代入の）場合、`u.`[`get()`](get.md)`は変更されない。


## 戻り値
`*this`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <memory>
#include <utility>

int main()
{
  std::unique_ptr<int> p0(new int(3));

  // (1) ムーブ代入
  // p0の所有権をp1に譲渡する
  std::unique_ptr<int> p1;
  p1 = std::move(p0);
  assert(*p1 == 3);

  // (2) 変換可能な型からの所有権移動
  // p1の所有権をp2に譲渡する
  std::unique_ptr<const int> p2;
  p2 = std::move(p1);
  assert(*static_cast<const int*>(p2.get()) == 3);

  // (3) リソース解放
  std::unique_ptr<int> p3(new int(3));
  p3 = nullptr;
  assert(!p3);
}
```
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 (nullptr_tのオーバーロード以外) [mark verified], 4.6.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2010にはnullptr_tのオーバーロードがない。
	- 2012までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。

## 参照
- [LWG Issue 1021. Allow `nullptr_t` assignments to `unique_ptr`](https://cplusplus.github.io/LWG/issue1021)
    - C++11で、代入演算子の引数型が未規定のポインタ型から`nullptr_t`へ改められた。`nullptr`を代入して解放する用途を、処理系ごとの実装技法に依存せず規定できるようにするため
- [LWG 2246. `unique_ptr` assignment effects w.r.t. deleter](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2246)
- [LWG 2228: Missing SFINAE rule in unique_ptr templated assignment](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4366)
    - (2)のSFINAEルール不足の欠陥修正の提案文書
- [LWG Issue 1303. `shared_ptr`, `unique_ptr`, and rvalue references v2](https://cplusplus.github.io/LWG/issue1303)
    - C++11で、変換可能な型からのコピー代入演算子の`delete`宣言が削除された。テンプレートの代入演算子はコピー代入演算子にならないため、宣言する必要がなかった
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)
- [LWG Issue 2047. Incorrect "mixed" move-assignment semantics of `unique_ptr`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2047)
- [LWG Issue 2899. `is_(nothrow_)move_constructible` and `tuple`, `optional` and `unique_ptr`](https://cplusplus.github.io/LWG/issue2899)
    - C++20で、ムーブ代入演算子(1)が、デリータ型`D`がムーブ代入可能でない場合はオーバーロード解決に参加しないよう制約化された
- [LWG Issue 3455. Incorrect Postconditions on `unique_ptr` move assignment](https://cplusplus.github.io/LWG/issue3455)
    - C++23で、ムーブ代入の事後条件が自己ムーブ代入を考慮するよう修正された（`this != addressof(u)`のときのみ`u.get() == nullptr`となる）。これは誤っていた事後条件の文言を修正したものであり、効果`reset(u.release())`による実際の挙動（自己ムーブ代入では`u`が変化しない）はC++11から一貫して同じであるため、本文の事後条件はバージョンによらずこの記述となる
