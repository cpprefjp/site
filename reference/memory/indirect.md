# indirect
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator = allocator<T>>
  class indirect;

  namespace pmr {
    template <class T>
    using indirect = std::indirect<T, polymorphic_allocator<T>>;
  }
}
```
* allocator[link allocator.md]
* polymorphic_allocator[link /reference/memory_resource/polymorphic_allocator.md]

## 概要
`std::indirect`クラスは、動的確保したオブジェクトに値の意味論をもたせる型である。

ポインタやスマートポインタは参照の意味論をもつため、クラスのメンバとして使うとコピーや`const`の伝播が正しく行われず、クラスの特殊メンバ関数を正しく生成できないことがある。

`std::indirect`クラスは所有するオブジェクトを動的確保しつつ、以下のように値型として振る舞う：

- ディープコピー: `std::indirect`オブジェクトをコピーすると、所有するオブジェクト`T`がそのコピーコンストラクタによって複製される
- `const`の伝播: `const`なアクセス経路から所有オブジェクトにアクセスすると、所有オブジェクトにも`const`が伝播する（`operator*`/`operator->`に`const`版と非`const`版がある）
- 不完全型のサポート: テンプレートパラメータ`T`は不完全型でもよい。これにより、再帰的なデータ構造を表現できる

これらの性質によって、`std::indirect`クラスのオブジェクトはクラスのメンバとして保持するのに適しており、コンパイラによる特殊メンバ関数の自動生成と協調して動作する。

とくに、pImplイディオム（実装クラスへのポインタをメンバとしてもち、実装詳細をヘッダから隠蔽してソースファイル側で行う手法）の実装に適している。実装クラスを不完全型のまま`std::indirect`型でメンバ変数として保持すると、生のポインタや[`std::unique_ptr`](unique_ptr.md)で実装した場合とは異なり、値のコピー（実装クラスのディープコピー）と`const`の伝播がともに自動的に正しく行われる。

所有オブジェクトを持たない状態を「無効値状態 (valueless state)」と呼ぶ。`std::indirect`オブジェクトが無効値状態になるのは、ムーブ後に空となった場合のみである。無効値状態のオブジェクトに対する`operator*`や`operator->`の呼び出しは未定義動作を引き起こす。無効値状態かどうかは[`valueless_after_move()`](indirect/valueless_after_move.md)メンバ関数で判定できる。

派生型のオブジェクトを多態的に保持したい場合は、[`std::polymorphic`](polymorphic.md)クラスを使用する。


## テンプレートパラメータ制約
- `Allocator`はCpp17Allocator要件を満たすこと
- [`std::allocator_traits`](/reference/memory/allocator_traits.md)`<Allocator>::value_type`が`T`と同じ型であること


## 適格要件
- 以下のいずれかの場合に、プログラムは不適格となる
    - `T`がオブジェクト型でない
    - 配列型である
    - (CV修飾された) [`std::in_place_t`](/reference/utility/in_place_t.md)である
    - (CV修飾された) [`std::in_place_type_t`](/reference/utility/in_place_type_t.md)の特殊化である
- `std::indirect`の明示的特殊化・部分特殊化をユーザーが宣言した場合、動作は未定義である


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](indirect/op_constructor.md) | コンストラクタ | C++26 |
| [`(destructor)`](indirect/op_destructor.md) | デストラクタ | C++26 |
| [`operator=`](indirect/op_assign.md) | 代入演算子 | C++26 |

### 値へのアクセス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator*`](indirect/op_deref.md) | 所有するオブジェクトへの参照を取得する | C++26 |
| [`operator->`](indirect/op_arrow.md) | 所有するオブジェクトのメンバへアクセスする | C++26 |
| [`valueless_after_move`](indirect/valueless_after_move.md) | 無効値状態かどうかを判定する | C++26 |

### その他

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`get_allocator`](indirect/get_allocator.md) | アロケータを取得する | C++26 |
| [`swap`](indirect/swap.md) | 他の`indirect`オブジェクトと値を交換する | C++26 |


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
| [`swap`](indirect/swap_free.md) | 2つの`indirect`オブジェクトを交換する | C++26 |

### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](indirect/op_equal.md) | 等値比較を行う | C++26 |
| [`operator<=>`](indirect/op_compare_3way.md) | 三方比較を行う | C++26 |

`operator==`から`operator!=`が、`operator<=>`から`operator<` / `operator<=` / `operator>` / `operator>=`が導出される。


## 推論補助

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(deduction_guide)`](indirect/op_deduction_guide.md) | クラステンプレートの推論補助 | C++26 |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hash`](indirect/hash.md) | `hash`クラスの特殊化 | C++26 |


## 例
### 基本的な使い方
```cpp example
#include <cassert>
#include <memory>

int main()
{
  // 動的確保したintを、値の意味論で保持する
  std::indirect<int> a{42};
  assert(*a == 42);

  // コピーは所有オブジェクトのディープコピー
  std::indirect<int> b = a;
  *b = 10;
  assert(*a == 42); // aは影響を受けない
  assert(*b == 10);

  // 比較は所有オブジェクトの比較に転送される
  assert(a == std::indirect<int>{42});
  assert(b < a);
}
```
* std::indirect[color ff0000]

### 出力
```
```

### pImplイディオムでの使用
実装クラスを不完全型のまま`std::indirect`で保持することで、値の意味論をもつpImplを簡潔に実装できる。コピー・ムーブ・デストラクタはコンパイラが生成し、`const`メンバ関数からは実装クラスにも`const`が伝播する。

```cpp example
#include <cassert>
#include <memory>

// ヘッダ相当: 実装クラスImplは前方宣言のみ（不完全型）
class Widget {
  class Impl;
  std::indirect<Impl> impl_;
public:
  Widget(int x);
  int value() const;
  void set(int x);
  // コピー・ムーブ・デストラクタはコンパイラが生成する
};

// 実装相当: ここでImplが完全型になる
class Widget::Impl {
public:
  int v;
  Impl(int x) : v(x) {}
};

Widget::Widget(int x) : impl_{std::in_place, x} {}
int Widget::value() const { return impl_->v; } // constが伝播する
void Widget::set(int x) { impl_->v = x; }

int main()
{
  Widget a{42};
  assert(a.value() == 42);

  Widget b = a;            // 値のコピー（Implがディープコピーされる）
  b.set(10);
  assert(a.value() == 42); // aは影響を受けない
  assert(b.value() == 10);
}
```
* std::indirect[color ff0000]
* std::in_place[link /reference/utility/in_place_t.md]

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
- [`std::polymorphic`](polymorphic.md) 派生型を多態的に保持する値型
- [`std::unique_ptr`](unique_ptr.md) 所有権をもつが参照の意味論をもつスマートポインタ
- [`std::optional`](/reference/optional/optional.md) 動的確保せずに無効値状態を表現する型


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
    - C++26で`indirect`と`polymorphic`が追加された
