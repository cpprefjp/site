# swap
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
void swap(optional& rhs) noexcept(see below);
```

## 概要
他の`optional`オブジェクトとデータを入れ替える。


## 要件
- 型`T`がswap可能であること
- 型`T`がムーブ構築可能であること


## 効果
- `*this`と`rhs`がどちらも有効値を保持している場合、[`swap`](/reference/utility/swap.md)`(`[`value()`](value.md)`, rhs.`[`value()`](value.md)`)`を呼び出す
- `*this`が有効値を保持しておらず、`rhs`が有効値を保持している場合、`rhs`が持つ有効値を`*this`にムーブ代入し、`rhs`を[`reset()`](reset.md)メンバ関数で無効値の状態にする
- `*this`が有効値を保持しており、`rhs`が有効値を保持していない場合、`*this`が持つ有効値を`rhs`にムーブ代入し、`*this`を[`reset()`](reset.md)メンバ関数で無効値の状態にする
- `*this`と`rhs`どちらも有効値を保持していない場合、なにもしない


## 例外
効果の項での操作が、任意の例外を送出する可能性がある。ただし、型`T`が、例外を送出しないムーブ構築と、例外を送出しないswap操作ができる場合、この関数は決して例外を送出しない。


## 例外安全性
この関数で例外が送出された場合、`this->`[`has_value()`](has_value.md)と`rhs.`[`has_value()`](has_value.md)の状態は変わらない。

この関数内で、有効値に対する[`swap`](/reference/utility/swap.md)関数の呼び出しで例外が送出された場合、`this->`[`value()`](value.md)と`rhs.`[`value()`](value.md)は、その[`swap`](/reference/utility/swap.md)関数の例外安全性が保証する状態となる。

この関数内で、型`T`のムーブコンストラクタで例外が送出された場合、`this->`[`value()`](value.md)と`rhs.`[`value()`](value.md)は、そのムーブコンストラクタの例外安全性が保証する状態となる。


## 例
```cpp
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
- [Clang, C++17 mode](/implementation.md#clang): 4.0.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2748. swappable traits for `optional`s](https://wg21.cmeerw.net/lwg/issue2748)
