# polymorphic
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class polymorphic;

  namespace pmr {
    template <class T>
    using polymorphic = std::polymorphic<T, polymorphic_allocator<T>>;
  }
}
```
* allocator[link allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`std::polymorphic`クラスは、動的確保したオブジェクトに値の意味論をもたせつつ、`T`から派生した任意の型のオブジェクトを多態的に保持できる型である。

[`std::indirect`](indirect.md)クラスが単一の型`T`のオブジェクトを保持するのに対し、`std::polymorphic<T>`クラスは`T`を基底とする派生型のオブジェクトを保持できる。値型としての性質は`std::indirect`クラスと共通している：

- ディープコピー: `std::polymorphic<T>`クラスのオブジェクトをコピーすると、実際に保持している派生型のオブジェクトが、その派生型のコピーコンストラクタによって複製される（型消去をとおした仮想ディスパッチが用いられる）
- `const`の伝播: `const`なアクセス経路から所有オブジェクトにアクセスすると、所有オブジェクトにも`const`が伝播する
- 不完全型のサポート: テンプレートパラメータ`T`は不完全型でもよい

これらの性質によって、`std::polymorphic`クラスは多態的な性質をもつクラスのメンバ変数として適しており、コンパイラによる特殊メンバ関数の自動生成と協調して動作する。

所有オブジェクトを持たない状態を「無効値状態 (valueless state)」と呼ぶ。`std::polymorphic`クラスが無効値状態になるのは、ムーブ後に空となった場合のみである。無効値状態のオブジェクトに対する`operator*`や`operator->`の呼び出しは未定義動作を引き起こす。無効値状態かどうかは[`valueless_after_move()`](polymorphic/valueless_after_move.md)で判定できる。

保持する型の集合が既知である場合は、[`std::variant`](/reference/variant/variant.md)や`indirect<std::variant<...>>`の使用を検討するとよい。


## テンプレートパラメータ制約
- `Allocator`はCpp17Allocator要件を満たすこと。
- [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::value_type`が`T`と同じ型であること


## 適格要件
- 以下のいずれかの場合に、プログラムは不適格となる
    - `T`がオブジェクト型でない
    - 配列型である
    - (CV修飾された) [`std::in_place_t`](/reference/utility/in_place_t.md)である
    - (CV修飾された) [`std::in_place_type_t`](/reference/utility/in_place_type_t.md)の特殊化である
    - CV修飾された型である
- `std::polymorphic`の明示的特殊化・部分特殊化をユーザーが宣言した場合、動作は未定義である


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](polymorphic/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](polymorphic/op_destructor.md) | デストラクタ | C++26 |
| [`operator=`](polymorphic/op_assign.md) | 代入演算子 | C++26 |

### 値へのアクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator*`](polymorphic/op_deref.md) | 所有するオブジェクトへの参照を取得する | C++26 |
| [`operator->`](polymorphic/op_arrow.md) | 所有するオブジェクトのメンバへアクセスする | C++26 |
| [`valueless_after_move`](polymorphic/valueless_after_move.md) | 無効値状態かどうかを判定する | C++26 |

### その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](polymorphic/get_allocator.md) | アロケータを取得する | C++26 |
| [`swap`](polymorphic/swap.md) | 他の`polymorphic`オブジェクトと値を交換する | C++26 |


## メンバ型

| 名前 | 定義 | 対応バージョン |
|------|------|----------------|
| `value_type` | `T` | C++26 |
| `allocator_type` | `Allocator` | C++26 |
| `pointer` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::pointer` | C++26 |
| `const_pointer` | [`allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::const_pointer` | C++26 |


## 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`swap`](polymorphic/swap_free.md) | 2つの`polymorphic`オブジェクトを交換する | C++26 |


## 例
```cpp example
#include <cassert>
#include <memory>

struct Shape {
  virtual ~Shape() = default;
  virtual int area() const = 0;
};

struct Square : Shape {
  int side;
  Square(int s) : side(s) {}
  int area() const override { return side * side; }
};

int main()
{
  // Shapeから派生したSquareを、値の意味論で多態的に保持する
  std::polymorphic<Shape> a{std::in_place_type<Square>, 3};
  assert(a->area() == 9);

  // コピーは派生型(Square)のディープコピー
  std::polymorphic<Shape> b = a;
  assert(b->area() == 9);
}
```
* std::polymorphic[color ff0000]
* std::in_place_type[link /reference/utility/in_place_type_t.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::indirect`](indirect.md) 単一の型を保持する値型
- [`std::variant`](/reference/variant/variant.md) 既知の型集合から1つを保持する型
- [`std::unique_ptr`](unique_ptr.md) 多態的な所有権をもつが参照の意味論をもつスマートポインタ


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
    - C++26で`indirect`と`polymorphic`が追加された
