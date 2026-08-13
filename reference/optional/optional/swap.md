# swap
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
// optional<T>版のオーバーロード
void swap(optional& rhs) noexcept(see below);           // (1) C++17
constexpr void swap(optional& rhs) noexcept(see below); // (1) C++23

// optional<T&>版のオーバーロード (C++26)
constexpr void swap(optional& rhs) noexcept;            // (2) C++26
```

## 概要
他の`optional`オブジェクトとデータを入れ替える。

- (1) : `optional<T>`の場合。保持している値を入れ替える。
- (2) : `optional<T&>`の場合。参照先（内部で保持しているポインタ）を入れ替える。


## 要件
- (1) : 型`T`がswap可能であること、かつ型`T`がムーブ構築可能であること


## 効果
- (1) :
    - `*this`と`rhs`がどちらも有効値を保持している場合、[`swap`](/reference/utility/swap.md)`(`[`value()`](value.md)`, rhs.`[`value()`](value.md)`)`を呼び出す
    - `*this`が有効値を保持しておらず、`rhs`が有効値を保持している場合、`rhs`が持つ有効値を`*this`にムーブ代入し、`rhs`を[`reset()`](reset.md)メンバ関数で無効値の状態にする
    - `*this`が有効値を保持しており、`rhs`が有効値を保持していない場合、`*this`が持つ有効値を`rhs`にムーブ代入し、`*this`を[`reset()`](reset.md)メンバ関数で無効値の状態にする
    - `*this`と`rhs`どちらも有効値を保持していない場合、なにもしない
- (2) : `*this`と`rhs`が保持する参照先ポインタを入れ替える。すなわち、`std::swap(val, rhs.val)`（`val`は参照先を指す説明専用の内部ポインタ）と等価。


## 例外
- (1) : 効果の項での操作が、任意の例外を送出する可能性がある。ただし、型`T`が、例外を送出しないムーブ構築と、例外を送出しないswap操作ができる場合、この関数は決して例外を送出しない。
- (2) : 投げない。


## 例外安全性
この関数で例外が送出された場合、`this->`[`has_value()`](has_value.md)と`rhs.`[`has_value()`](has_value.md)の状態は変わらない。

この関数内で、有効値に対する[`swap`](/reference/utility/swap.md)関数の呼び出しで例外が送出された場合、`this->`[`value()`](value.md)と`rhs.`[`value()`](value.md)は、その[`swap`](/reference/utility/swap.md)関数の例外安全性が保証する状態となる。

この関数内で、型`T`のムーブコンストラクタで例外が送出された場合、`this->`[`value()`](value.md)と`rhs.`[`value()`](value.md)は、そのムーブコンストラクタの例外安全性が保証する状態となる。


## 例
```cpp example
#include <cassert>
#include <optional>

int main()
{
  // 状況1
  // 左辺と右辺の両方が有効値を持つ場合
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    // aとbを入れ替える
    a.swap(b);

    assert(a.value() == 1);
    assert(b.value() == 3);
  }

  // 状況2
  // 左辺が有効値を持ち、右辺が有効値を持たない場合
  {
    std::optional<int> a = 3;
    std::optional<int> b;

    // aとbを入れ替える
    a.swap(b);

    assert(!a.has_value());
    assert(b.has_value());
    assert(b.value() == 3);
  }

  // 状況3
  // 左辺が有効値を持たず、右辺が有効値を持つ場合
  {
    std::optional<int> a;
    std::optional<int> b = 3;

    // aとbを入れ替える
    a.swap(b);

    assert(a.has_value());
    assert(a.value() == 3);
    assert(!b.has_value());
  }

  // 状況4
  // 左辺と右辺の両方が有効値を持たない場合
  {
    std::optional<int> a;
    std::optional<int> b;

    // aとbを入れ替える
    a.swap(b);

    assert(!a.has_value());
    assert(!b.has_value());
  }
}
```
* swap[color ff0000]
* has_value()[link has_value.md]
* value()[link value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2748. swappable traits for `optional`s](https://wg21.cmeerw.net/lwg/issue2748)
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
- [P2988R12 `std::optional<T&>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2988r12.pdf)
    - C++26で参照型`T&`に対する部分特殊化とそのメンバ`swap` (2) が追加された
- [LWG Issue 4439. `std::optional<T&>::swap` possibly selects ADL-found `swap`](https://cplusplus.github.io/LWG/issue4439)
    - C++26で、(2)の効果が非修飾の`swap`から`std::swap(val, rhs.val)`へ修正された。ポインタ型に対してADLで見つかるユーザー定義の`swap`が選択されるのを防ぐため
