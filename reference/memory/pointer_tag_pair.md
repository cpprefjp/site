# pointer_tag_pair
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <class Ptr,
            unsigned int BitsRequested = bits-available<element-of<Ptr>>,
            class TagT = unsigned int>
  class pointer_tag_pair;
}
```
* bits-available[italic]
* element-of[italic]

## 概要
`pointer_tag_pair`は、ポインタ値と小さなタグ値のペアを、ポインタ1個分のサイズで保持するクラスである。

型のアライメントによって常に0になることがわかっているポインタの下位ビットへタグ値を詰め込む「ポインタタギング (pointer tagging)」というよく知られたテクニックを、移植可能かつ`constexpr`で使用できる形で提供する。任意の特殊化`PT`について、`sizeof(PT) ==` `sizeof(Ptr)`かつ`alignof(PT) ==` `alignof(Ptr)`であることが保証され、トリビアルコピー可能である。

主な用途には以下がある。

- ポインタへの情報の印付け（アロケータでの由来の記録、小さな参照カウントなど）
- 指す先の多態性の表現（木構造で「次のノードが内部ノードか葉か」をタグで区別するなど）

```cpp
// 1ビットのタグで、所有権の有無を印付けする例
enum class ownership : unsigned { reference, owning };
std::pointer_tag_pair<int*, 1, ownership> p{ptr, ownership::owning};
static_assert(sizeof(p) == sizeof(int*));
```

これまでこのテクニックは`reinterpret_cast`とビット演算でしか実装できず、意図がコードに現れず安全でもなかった。本クラスは、タグが収まらない場合をコンパイル時・事前条件で検出でき、定数評価でも使用できる。


## テンプレートパラメータ
- `Ptr` : 保持するポインタの型（オブジェクトポインタ型であること。関数ポインタは不可）
- `BitsRequested` : タグに要求するビット数。デフォルトは、指す先の型のアライメントから利用できるビット数（説明専用の`bits-available`。[`pointer_bits_available`](/reference/memory/pointer_bits_available.md)`(alignof(T))`で定義される）
- `TagT` : タグ値の型（符号なし整数型、または基底型が符号なし整数型の列挙型であること）


## 適格要件
- `Ptr`はCV修飾されていないオブジェクトポインタ型であること（関数ポインタではないこと）
- `TagT`はCV修飾されておらず、符号なし整数型、または基底型が符号なし整数型の列挙型であること。`sizeof(TagT) <=` `sizeof(void*)`であること
- `BitsRequested <=` [`max_pointer_bits_available`](/reference/memory/max_pointer_bits_available.md)であること


## 説明専用エンティティ
本クラスと関連機能の規定では、以下の説明専用のエンティティを使用する。

```cpp
namespace std {
  // 型Tのアライメントからタグ付けに使用できるビット数
  template <class T>
  constexpr unsigned int bits-available = pointer_bits_available(alignof(T)); // 説明専用

  // ポインタ型Uの指す先の型
  template <class U>
  using element-of = pointer_traits<U>::element_type; // 説明専用

  // タグ値vの表現に必要なビット数。
  // vが列挙型ならbit_width(to_underlying(v))、そうでなければbit_width(v)
  template <class T>
  constexpr unsigned int tag-bit-width(T v) noexcept; // 説明専用
}
```
* bits-available[italic]
* element-of[italic]
* tag-bit-width[italic]
* pointer_bits_available[link pointer_bits_available.md]
* pointer_traits[link pointer_traits.md]
* bit_width[link /reference/bit/bit_width.md]
* to_underlying[link /reference/utility/to_underlying.md]

また、コンストラクタなどの制約には説明専用コンセプト[`tagging-compatible-pointee`](tagging-compatible-pointee.md)を使用する。


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](pointer_tag_pair/op_constructor.md) | コンストラクタ | C++29 |

### 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`from_overaligned`](pointer_tag_pair/from_overaligned.md) | 過剰アライメントされたポインタから構築する | C++29 |
| [`from_tagged`](pointer_tag_pair/from_tagged.md) | タグ付きポインタ値から復元する | C++29 |

### 値の取得

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`pointer`](pointer_tag_pair/pointer.md) | ポインタ値を取得する | C++29 |
| [`tag`](pointer_tag_pair/tag.md) | タグ値を取得する | C++29 |
| [`tagged_pointer`](pointer_tag_pair/tagged_pointer.md) | タグを埋め込んだままのポインタ値を取得する | C++29 |

### 入れ替え

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](pointer_tag_pair/swap.md) | 他の`pointer_tag_pair`オブジェクトと値を入れ替える | C++29 |

## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<=>`](pointer_tag_pair/op_compare_3way.md) | 三方比較を行う | C++29 |
| [`operator==`](pointer_tag_pair/op_equal.md) | 等値比較を行う | C++29 |

## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get`](pointer_tag_pair/get.md) | ポインタ値またはタグ値を取得する | C++29 |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `pointer_type` | ポインタの型`Ptr` | C++29 |
| `element_type` | 指す先の型。[`pointer_traits`](pointer_traits.md)`<Ptr>::element_type` | C++29 |
| `tagged_pointer_type` | タグを埋め込んだままのポインタの型。`Ptr`のCV修飾を維持した`void*` | C++29 |
| `tag_type` | タグの型`TagT` | C++29 |

## メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr unsigned int bits_requested` | タグに要求したビット数`BitsRequested` | C++29 |

## その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `tuple_size` | `pointer_tag_pair`での特殊化（要素数2） | C++29 |
| `tuple_element` | `pointer_tag_pair`での特殊化（0番目が`pointer_type`、1番目が`tag_type`） | C++29 |


## 例
### 基本的な使い方
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 42;

  // intのアライメントは通常4なので、下位2ビットをタグに使える
  std::pointer_tag_pair<int*, 2> p{&x, 0b10u};
  static_assert(sizeof(p) == sizeof(int*));

  std::cout << *p.pointer() << std::endl;
  std::cout << p.tag() << std::endl;
}
```
* std::pointer_tag_pair[color ff0000]
* p.tag()[link pointer_tag_pair/tag.md]
* p.pointer()[link pointer_tag_pair/pointer.md]

#### 出力
```
42
2
```

### タグが下位ビットに埋め込まれていることを確認する
```cpp
#include <memory>
#include <iostream>
#include <cstdint>
#include <bit>

int main()
{
  int x = 42;
  std::pointer_tag_pair<int*, 2> p{&x, 0b10u};

  // タグを埋め込んだままの生のポインタ値を整数として観察する。
  // 埋め込みの表現は未規定だが、多くの実装ではアライメントによって
  // 常に0になる下位ビットへ格納される
  auto tagged = std::bit_cast<std::uintptr_t>(p.tagged_pointer());
  auto addr = std::bit_cast<std::uintptr_t>(&x);

  std::cout << (tagged & 0b11u) << std::endl;         // 下位2ビット : タグの値
  std::cout << ((tagged & ~std::uintptr_t{0b11u}) == addr) << std::endl; // 残り : 元のアドレス
}
```
* std::pointer_tag_pair[color ff0000]
* p.tagged_pointer()[link pointer_tag_pair/tagged_pointer.md]
* std::bit_cast[link /reference/bit/bit_cast.md]
* std::uintptr_t[link /reference/cstdint/uintptr_t.md]

#### 出力例
```
2
1
```

### 所有しているかどうかを印付けするスマートポインタ
```cpp
#include <memory>
#include <iostream>

// 「所有するポインタ」と「参照するだけのポインタ」の両方になれる型。
// フラグを別メンバに持つ実装と違い、サイズはポインタ1個分で済む
template <typename T>
class maybe_owning_ptr {
  enum class ownership : unsigned int { reference, owning };

  std::pointer_tag_pair<T*, 1, ownership> ptr_;

public:
  explicit maybe_owning_ptr(T*&& p) noexcept : ptr_{p, ownership::owning} {}
  explicit maybe_owning_ptr(T& r) noexcept : ptr_{&r, ownership::reference} {}

  T& operator*() const noexcept { return *ptr_.pointer(); }

  ~maybe_owning_ptr() {
    if (ptr_.tag() == ownership::owning) {
      delete ptr_.pointer();
    }
  }
};
static_assert(sizeof(maybe_owning_ptr<int>) == sizeof(int*));

int main()
{
  int local = 1;
  maybe_owning_ptr<int> ref{local};          // 参照するだけ。deleteされない
  maybe_owning_ptr<int> own{new int(2)};     // 所有する。デストラクタでdeleteされる

  std::cout << *ref << *own << std::endl;
}
```
* std::pointer_tag_pair[color ff0000]

#### 出力
```
12
```

### 木構造で内部ノードと葉を区別する
```cpp
#include <memory>
#include <iostream>

// 二分木のノードへのポインタの下位1ビットに「葉かどうか」を埋め込む。
// ノード側に種別のメンバを持つ必要がなく、葉には子配列も不要になる
struct Leaf {
  int value;
};
struct Inner;
using node_ptr = std::pointer_tag_pair<void*, 1, bool>; // タグ : 葉ならtrue
struct Inner {
  node_ptr children[2];
};

int sum(node_ptr node)
{
  if (node.tag()) {
    return static_cast<Leaf*>(node.pointer())->value;
  }
  auto* inner = static_cast<Inner*>(node.pointer());
  return sum(inner->children[0]) + sum(inner->children[1]);
}

int main()
{
  Leaf a{1}, b{2}, c{3};
  Inner left{{node_ptr{&a, true}, node_ptr{&b, true}}};
  Inner root{{node_ptr{&left, false}, node_ptr{&c, true}}};

  std::cout << sum(node_ptr{&root, false}) << std::endl;
}
```
* std::pointer_tag_pair[color ff0000]
* node.tag()[link pointer_tag_pair/tag.md]
* node.pointer()[link pointer_tag_pair/pointer.md]

#### 出力
```
6
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`max_pointer_bits_available`](/reference/memory/max_pointer_bits_available.md)
- [`pointer_bits_available`](/reference/memory/pointer_bits_available.md)
- [`is_sufficiently_aligned`](/reference/memory/is_sufficiently_aligned.md)


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
