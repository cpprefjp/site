# コンストラクタ
* optional[meta header]
* std[meta namespace]
* optional[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
constexpr optional() noexcept;                           // (1)
constexpr optional(nullopt_t) noexcept;                  // (2)
constexpr optional(const optional& rhs);                 // (3)
constexpr optional(optional&& rhs) noexcept(see below);  // (4)

template <class... Args>
constexpr explicit optional(in_place_t, Args&&... args); // (5)

template <class U, class... Args>
constexpr explicit optional(
                     in_place_t,
                     initializer_list<U> il,
                     Args&&... args);                    // (6)

template <class U = T>
EXPLICIT constexpr optional(U&& rhs);                    // (7)

template <class U>
EXPLICIT optional(const optional<U>& rhs);               // (8)

template <class U>
EXPLICIT optional(optional<U>&& rhs);                    // (9)
```
* nullopt_t[link /reference/optional/nullopt_t.md]
* in_place_t[link /reference/utility/in_place_t.md]
* initializer_list[link /reference/initializer_list.md]

## 概要
- (1), (2) : 有効値を保持していない状態にする
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ
- (5) : 型`T`のコンストラクタ引数を受け取って、コンストラクタ内で型`T`のオブジェクトを有効値として生成し、保持する
- (6) : 型`T`のコンストラクタ引数として初期化子リストと任意個の引数を受け取って、コンストラクタ内で型`T`のオブジェクトを有効値として生成し、保持する
- (7) : 型`T`に変換可能な型`U`の値を有効値として受け取り、ムーブして保持する
- (8) : 変換可能な`optional`オブジェクトからコピー構築する
- (9) : 変換可能な`optional`オブジェクトからムーブ構築する


## 効果
- (1), (2) : 有効値を保持していない状態にする。このとき、有効値の型`T`のオブジェクトは構築されない
- (3) : `rhs`が有効値を保持していれば、それを`*this`にコピーする
- (4) : `rhs`が有効値を保持していれば、それを`*this`にムーブする。`rhs.`[`has_value()`](has_value.md)は変更されない
- (5) : 可変個の引数`args...`を型`T`のコンストラクタ引数として転送して、コンストラクタ内で型`T`の有効値を構築して保持する
- (6) : 初期化子リスト`il`と可変個の引数`args...`を型`T`のコンストラクタ引数として転送して、コンストラクタ内で型`T`の有効値を構築して保持する
- (7) : `rhs`を有効値として、`*this`にムーブする
- (8) : `rhs`が有効値を保持していれば、それを`*this`にコピーする
- (9) : `rhs`が有効値を保持していれば、それを`*this`にムーブする


## 例外
- (3) : 型`T`のコピーコンストラクタが任意の例外を送出する可能性がある
- (4) : 型`T`のムーブコンストラクタが任意の例外を送出する可能性がある
- (5), (6), (7), (8), (9) : 型`T`の選択されたコンストラクタが任意の例外を送出する可能性がある


## 備考
- (3) :
    - 型`T`がコピー構築可能でなければ、このオーバーロードはdelete定義される
    - 型`T`がトリビアルにコピー構築可能であれば、このオーバーロードは`constexpr`となる
- (4) :
    - このオーバーロードの`noexcept`の値は、[`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T>`の値と同等になる
    - 型`T`がムーブ構築可能でなければ、このオーバーロードはdelete定義される
    - 型`T`がトリビアルにムーブ構築可能であれば、このオーバーロードは`constexpr`となる
- (5) :
    - 型`T`の選択されたコンストラクタが`constexpr`であれば、このコンストラクタも`constexpr`となる
    - 型`T`が引数の型`Args...`から構築可能でなければ、このオーバーロードはオーバーロード解決の候補から除外される
    - [`std::in_place_t`](/reference/utility/in_place_t.md)はオーバーロードに機能名を付けるためにあり、その型による動的な処理内容への影響はない。このオーバーロードを選択したい場合は、事前定義されている定数[`std::in_place`](/reference/utility/in_place_t.md)を第1引数として指定すること
- (6) :
    - 型`T`の選択されたコンストラクタが`constexpr`であれば、このコンストラクタも`constexpr`となる
    - 型`T`が引数の型[`initializer_list`](/reference/initializer_list.md)`<U>&`と`Args&&...`から構築可能でなければ、このオーバーロードはオーバーロード解決の候補から除外される
- (7) :
    - 型`T`の選択されたコンストラクタが`constexpr`であれば、このコンストラクタも`constexpr`となる
    - 型`U`から型`T`がムーブ構築可能でなければ、このオーバーロードはオーバーロード解決の候補から除外される
    - 型`U`から型`T`に暗黙的に型変換ができる場合、このオーバーロードは非`explicit`となる。型`U`から型`T`に明示的な型変換ならできる場合、このオーバーロードは`explicit`となる
- (8) :
    - 型`U`から型`T`がコピー構築可能でなければ、このオーバーロードはオーバーロード解決の候補から除外される
    - 型`U`から型`T`に暗黙的に型変換ができる場合、このオーバーロードは非`explicit`となる。型`U`から型`T`に明示的な型変換ならできる場合、このオーバーロードは`explicit`となる
- (9) :
    - 型`U`から型`T`がムーブ構築可能でなければ、このオーバーロードはオーバーロード解決の候補から除外される
    - 型`U`から型`T`に暗黙的に型変換ができる場合、このオーバーロードは非`explicit`となる。型`U`から型`T`に明示的な型変換ならできる場合、このオーバーロードは`explicit`となる


## 例
```cpp example
#include <cassert>
#include <optional>
#include <string>
#include <vector>
#include <memory>

struct Base {};
struct Derived : Base {};

int main()
{
  // (1)
  {
    std::optional<int> p;
    assert(!p.has_value());
  }

  // (2)
  {
    std::optional<int> p = std::nullopt;
    assert(!p.has_value());
  }

  // (3)
  {
    std::optional<int> a = 3;
    std::optional<int> b = a;

    assert(a.value() == 3);
    assert(b.value() == 3);
  }

  // (4)
  {
    std::optional<std::string> a = "Hello";
    std::optional<std::string> b = std::move(a);

    assert(b.value() == "Hello");
  }

  // (5)
  {
    std::optional<std::string> p {std::in_place, 3, 'A'};
    assert(p.value() == "AAA");
  }

  // (6)
  {
    std::allocator<int> alloc;
    std::optional<std::vector<int>> p {std::in_place, {3, 1, 4}, alloc};

    assert(p.value()[0] == 3);
    assert(p.value()[1] == 1);
    assert(p.value()[2] == 4);
  }

  // (7)
  {
    // const char*からstd::stringに暗黙的に型変換
    std::optional<std::string> p1 = "Hello";
    assert(p1.value() == "Hello");

    // 整数値からstd::vectorに明示的に型変換
    std::optional<std::vector<int>> p2 {3};
    assert(p2.value().size() == 3);
  }

  // (8)
  {
    std::optional<const char*> a = "Hello";
    std::optional<std::string> b = a;

    assert(b.value() == "Hello");
  }

  // (9)
  {
    std::optional<std::shared_ptr<Derived>> a = std::make_shared<Derived>();
    std::optional<std::shared_ptr<Base>> b = std::move(a);
  }
}
```
* has_value()[link has_value.md]
* value()[link value.md]
* std::move[link /reference/utility/move.md]
* std::in_place[link /reference/utility/in_place_t.md]
* std::make_shared[link /reference/memory/make_shared.md]

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
- [N3406 A proposal to add a utility class to represent optional objects (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3406.html)
- [LWG Issue 2756. `optional<T>` should `forward` `T`'s implicit conversions](https://wg21.cmeerw.net/lwg/issue2756)
- [LWG Issue 2842. `in_place_t` check for `optional::optional(U&&)` should decay `U`](https://wg21.cmeerw.net/lwg/issue2842)
    - 説明の簡略化のため、このオーバーロードで`in_place_t`への言及は現在していない
- [LWG Issue 2900. The copy and move constructors of `optional` are not `constexpr`](https://wg21.cmeerw.net/lwg/issue2900)
