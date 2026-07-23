# operator*
* memory[meta header]
* std[meta namespace]
* indirect[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr const T& operator*() const & noexcept;   // (1)
constexpr T& operator*() & noexcept;               // (2)
constexpr const T&& operator*() const && noexcept; // (3)
constexpr T&& operator*() && noexcept;             // (4)
```

## 概要
所有するオブジェクトへの参照を取得する。`const`なアクセス経路では`const`が所有オブジェクトに伝播する。


## 事前条件
`*this`が無効値状態でないこと。


## 戻り値
- (1), (2) : 所有するオブジェクトへの参照。
- (3), (4) : 所有するオブジェクトへの右辺値参照（`std::move(*p)`）。


## 例外
投げない。


## 例
```cpp example
#include <cassert>
#include <memory>
#include <type_traits>

int main()
{
  std::indirect<int> a{42};
  assert(*a == 42);       // 参照の取得
  *a = 10;                // 非const版で書き換え
  assert(*a == 10);

  // constなアクセス経路ではconstが伝播する
  const std::indirect<int> b{5};
  static_assert(std::is_same_v<decltype(*b), const int&>);
}
```
* std::indirect[link ../indirect.md]

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
- [`std::indirect`](../indirect.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)
