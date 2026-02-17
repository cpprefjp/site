# 推論補助
* stack[meta header]
* std[meta namespace]
* stack[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  // 説明用の型
  template <class InputIterator>
  using iter_val_t = typename iterator_traits<InputIterator>::value_type;

  template <class Container>
  stack(Container)
    -> stack<typename Container::value_type, Container>;      // (1)

  template <class InputIterator>
  stack(InputIterator, InputIterator)
    -> stack<iter_val_t<InputIterator>>;                      // (2) C++23から

  template <ranges::input_range R>
  stack(from_range_t, R&&)-> stack<ranges::range_value_t<R>>; // (3) C++23から

  template <class Container, class Allocator>
  stack(Container, Allocator)
    -> stack<typename Container::value_type, Container>;      // (4)

  template <class InputIterator, class Allocator>
  stack(InputIterator, InputIterator, Allocator)
    -> stack<iter_val_t<InputIterator>, deque<iter_val_t<InputIterator>,
             Allocator>>;                                     // (5) C++23から

  template <ranges::input_range R, class Allocator>
  stack(from_range_t, R&&, Allocator)
    -> stack<ranges::range_value_t<R>, deque<ranges::range_value_t<R>,
             Allocator>>;                                     // (6) C++23から
}
```
* deque[link /reference/deque/deque.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* from_range_t[link /reference/ranges/from_range_t.md]

## 概要
`std::stack`クラステンプレートの型推論補助。

- (1) : 元となるコンテナから推論する。
- (2) : イテレータ範囲から推論する。
- (3) : Rangeからの推論する。
- (4) : 元となるコンテナとアロケータから推論する。
- (5) : イテレータ範囲とアロケータから推論する。
- (6) : Rangeとアロケータからの推論する。


## 適格要件
以下のいずれかの条件を満たす場合、コンテナアダプタの推論補助はオーバーロード解決に参加しない：

- `InputIterator`テンプレートパラメータをもち、入力イテレータの要件を満たさない型が推論された場合
- `Container`テンプレートパラメータをもち、アロケータとして適格な型が推論された場合 (C++23)
- `Container`テンプレートパラメータをもたず、`Allocator`テンプレートパラメータをもち、アロケータとして適格でない型が推論された場合 (C++23)
- `Container`と`Allocator`の両方のテンプレートパラメータをもち、[`uses_allocator_v`](/reference/memory/uses_allocator.md)`<Container, Allocator>`が`false`の場合


## 例
```cpp example
#include <iostream>
#include <stack>
#include <type_traits>

int main()
{
  std::deque d = {1, 2, 3};

  // 元となるコンテナから推論
  std::stack st {d};
  static_assert(std::is_same_v<
    decltype(st),
    std::stack<int>
  >);

  while (!st.empty()) {
    std::cout << st.top() << std::endl;
    st.pop();
  }
}
```
* st.empty()[link empty.md]
* st.top()[link top.md]
* st.pop()[link pop.md]

### 出力
```
3
2
1
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)
- [P1425R4 Iterators pair constructors for stack and queue](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1425r4.pdf)
    - C++23でのイテレータペアへの対応
- [P1518R2 Stop Overconstraining Allocators in Container Deduction Guides](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1518r2.html)
    - C++23での推論補助の制約についての変更
