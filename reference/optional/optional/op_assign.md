# operator=
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
optional<T>& operator=(nullopt_t rhs) noexcept;                    // (1) C++17
constexpr optional<T>& operator=(nullopt_t rhs) noexcept;          // (1) C++23

optional& operator=(const optional& rhs);                          // (2) C++17
constexpr optional& operator=(const optional& rhs);                // (2) C++20

optional& operator=(optional&& rhs) noexcept(see below);           // (3) C++17
constexpr optional& operator=(optional&& rhs) noexcept(see below); // (3) C++20

template <class U = T>
optional& operator=(U&& rhs);                                      // (4) C++17
template <class U = T>
constexpr optional& operator=(U&& rhs);                            // (4) C++23

template <class U>
optional& operator=(const optional<U>& rhs);                       // (5) C++17
template <class U>
constexpr optional& operator=(const optional<U>& rhs);             // (5) C++23

template <class U>
optional& operator=(optional<U>&& rhs);                            // (6) C++17
template <class U>
constexpr optional& operator=(optional<U>&& rhs);                  // (6) C++23
```
* nullopt_t[link /reference/optional/nullopt_t.md]

## 概要
- (1) : 無効値を代入する
- (2) : コピー代入
- (3) : ムーブ代入
- (4) : 要素型`T`に変換可能な値をムーブ代入
- (5) : `optional<T>`に変換可能な`optional`オブジェクトをコピー代入
- (6) : `optional<T>`に変換可能な`optional`オブジェクトをムーブ代入


## テンプレートパラメータ制約
- (4), (5), (6) : 型`U`が型`T`に変換可能であること


## 効果
いずれのオーバーロードでも、`*this` と `rhs` が有効な値を持っているか否かによって以下のような挙動となる。

|                                    | `*this` が有効な値を持っている                                        | `*this` が有効な値を持っていない                                     |
|------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------|
| **`rhs` が有効な値を持っている**   | 値の代入が行われる。                                                  | 値の構築が行われる。[`has_value()`](has_value.md) は `true` となる。 |
| **`rhs` が有効な値を持っていない** | 値の破棄が行われる。[`has_value()`](has_value.md) は `false` となる。 | 何も行われない。                                                     |

なお、(1) では `rhs` は常に有効な値を持っていないとみなされ、また、(4) では `rhs` は常に有効な値を持っているとみなされる。

また、`rhs` が有効な値を持っている場合に `operator=`（代入の場合）、あるいは、コンストラクタ（構築の場合）を呼び出す際の引数は以下となる。

- (2), (5): `*rhs`
- (3), (6): [`std::move`](../../utility/move.md)`(*rhs)`
- (4): [`std::forward`](../../utility/forward.md)`<U>(rhs)`


## 戻り値
`*this`


## 例外
共通の動作として、代入演算子内で例外が発生した場合、[`has_value()`](has_value.md)の結果は変わらない。

- (2) :
    - 型`T`のコピーコンストラクタで例外が発生した場合は、なにも効果がなく終了する。型`T`のコピー代入で例外が発生した場合は、型`T`のコピー代入演算子の例外安全性が保証する動作となる
- (3) :
    - 要素型`T`が、ムーブ代入とムーブ構築で例外を送出しない場合、この関数は決して例外を送出しない
    - 型`T`のムーブコンストラクタで例外が発生した場合、`*rhs.val`の状態は型`T`のムーブコンストラクタの例外安全性によって決定される
- (4), (5), (6) :
    - 型`T`のコンストラクタもしくは代入演算子で例外が発生した場合、それらの関数の例外安全性が保証する動作となる


## delete定義される条件
- (2) : 型`T`がコピー構築可能でなく、コピー代入可能でもないこと
- (3) : 型`T`がムーブ構築可能でなく、ムーブ代入可能でもないこと

## トリビアルに定義される条件

- (2) : 型`T`が、[トリビアルにコピー構築可能](/reference/type_traits/is_trivially_copy_constructible.md)であり[トリビアルにコピー代入可能](/reference/type_traits/is_trivially_copy_assignable.md)かつ、[トリビアルに破棄可能](/reference/type_traits/is_trivially_destructible.md)である
- (3) : 型`T`が、[トリビアルにムーブ構築可能](/reference/type_traits/is_trivially_move_constructible.md)であり[トリビアルにムーブ代入可能](/reference/type_traits/is_nothrow_move_assignable.md)かつ、[トリビアルに破棄可能](/reference/type_traits/is_trivially_destructible.md)である

## 例
```cpp example
#include <cassert>
#include <optional>
#include <utility>

int main()
{
  // (1)
  // 無効値を代入
  {
    std::optional<int> p = 3;

    p = std::nullopt;
    assert(!p.has_value());
  }

  // (2)
  // コピー代入
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    a = b;
    assert(a.value() == 1);
  }

  // (3)
  // ムーブ代入
  {
    std::optional<int> a = 3;
    std::optional<int> b = 1;

    a = std::move(b);
    assert(a.value() == 1);
  }

  // (4)
  // 有効値をコピー代入もしくはムーブ代入
  {
    std::optional<int> p;

    p = 3;
    assert(p.has_value());
    assert(p.value() == 3);
  }

  // (5)
  // 変換可能なoptionalオブジェクトをコピー代入
  {
    std::optional<long long> a = 3LL;
    std::optional<int> b = 1;

    a = b;
    assert(a.value() == 1LL);
  }

  // (6)
  // 変換可能なoptionalオブジェクトをムーブ代入
  {
    std::optional<long long> a = 3LL;
    std::optional<int> b = 1;

    a = std::move(b);
    assert(a.value() == 1LL);
  }
}
```
* std::nullopt[link /reference/optional/nullopt_t.md]
* std::move[link /reference/utility/move.md]
* p.has_value()[link has_value.md]
* p.value()[link value.md]
* a.value()[link value.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [Clang](/implementation.md#clang): 4.0.1 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2756. `optional<T>` should `forward` `T`'s implicit conversions](https://wg21.cmeerw.net/lwg/issue2756)
- [P0602R4 `variant` and `optional` should propagate copy/move triviality](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0602r4.html)
- [P2231R1 Missing `constexpr` in `std::optional` and `std::variant`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2231r1.html)
