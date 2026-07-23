# operator->
* memory[meta header]
* std[meta namespace]
* polymorphic[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const_pointer operator->() const noexcept; // (1)
constexpr pointer operator->() noexcept;             // (2)
```

## 概要
所有するオブジェクトのメンバへ、基底型`T`としてアクセスするためのポインタを取得する。


## 事前条件
`*this`が無効値状態でないこと。


## 戻り値
所有するオブジェクトを指すポインタ。


## 例外
投げない。


## 例
```cpp example
#include <cassert>
#include <memory>

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
  std::polymorphic<Base> a{std::in_place_type<Derived>};
  assert(a->f() == 42);  // 基底型Baseのメンバへアクセス（仮想ディスパッチ）
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
