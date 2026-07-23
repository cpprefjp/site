# operator=
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr polymorphic& operator=(const polymorphic& other);                // (1)
constexpr polymorphic& operator=(polymorphic&& other) noexcept(see below); // (2)
```

## 概要
- (1) : コピー代入。`other`が保持する派生型のオブジェクトをディープコピーする。
- (2) : ムーブ代入。`other`から所有権を移す。


## 適格要件
- (1) : `T`は完全型であること。


## 効果
- (1) : `addressof(other) == this`であれば何もしない。そうでなければ、アロケータの伝播規則に従い、`other`が保持するオブジェクトのコピーを`*this`がもつようにする。`other`が無効値状態であれば`*this`も無効値状態にする。
- (2) : `addressof(other) == this`であれば何もしない。そうでなければ、アロケータの伝播規則に従い、`other`から所有権を移すか、ムーブ構築する。


## 戻り値
`*this`への参照。


## 例外
- (1) : 強い例外安全性を保証する。例外が送出された場合、`*this`や`other`に影響はない。
- (2) : 以下と等価な`noexcept`指定を持つ：

```cpp
noexcept(allocator_traits<Allocator>::propagate_on_container_move_assignment::value ||
         allocator_traits<Allocator>::is_always_equal::value)
```
* allocator_traits[link /reference/memory/allocator_traits.md]


## 例
```cpp example
#include <cassert>
#include <memory>
#include <utility>

struct Base {
  virtual ~Base() = default;
  virtual int f() const { return 0; }
};
struct Derived : Base {
  int x = 42;
  Derived() = default;
  Derived(int x) : x(x) {}
  int f() const override { return x; }
};

int main()
{
  std::polymorphic<Base> a{std::in_place_type<Derived>, 1};
  std::polymorphic<Base> b{std::in_place_type<Derived>, 2};

  a = b;             // (1) コピー代入（派生型のディープコピー）
  assert(a->f() == 2);

  a = std::move(b);  // (2) ムーブ代入
  assert(a->f() == 2);
}
```
* std::polymorphic[link ../polymorphic.md]
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
- [`std::polymorphic`](../polymorphic.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
