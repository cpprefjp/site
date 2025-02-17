# 推論補助
* queue[meta header]
* std[meta namespace]
* queue[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class Container>
  queue(Container)
    -> queue<typename Container::value_type, Container>;       // (1)

  template <class InputIterator>
  queue(InputIterator, InputIterator)
    -> queue<<InputIterator>>;                                 // (2) C++23

  template <ranges::input_range R>
  queue(from_range_t, R&&) -> queue<ranges::range_value_t<R>>; // (3) C++23


  template <class Container, class Allocator>
  queue(Container, Allocator)
    -> queue<typename Container::value_type, Container>;       // (4)

  template <class InputIterator, class Allocator>
  queue(InputIterator, InputIterator, Allocator)
    -> queue<iter-value-type<InputIterator>, deque<iter-value-type<InputIterator>,
             Allocator>>;                                      // (5) C++23

  template <ranges::input_range R, class Allocator>
  queue(from_range_t, R&&, Allocator)
    -> queue<ranges::range_value_t<R>, deque<ranges::range_value_t<R>,
             Allocator>>;                                      // (6) C++23

}
```
* iter-value-type[italic]
* deque[link /reference/deque/deque.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* from_range_t[link /reference/ranges/from_range_t.md]

## 概要
`std::queue`クラステンプレートの型推論補助。

- (1) : 元となるコンテナから推論する。
- (2) : イテレータ範囲から推論する。
- (3) : Rangeからの推論する。
- (4) : 元となるコンテナとアロケータから推論する。
- (5) : イテレータ範囲とアロケータから推論する。
- (6) : Rangeとアロケータからの推論する。


## 例
```cpp example
#include <iostream>
#include <queue>
#include <type_traits>

int main()
{
  std::deque d = {1, 2, 3};

  // 元となるコンテナから推論
  std::queue que {d};
  static_assert(std::is_same_v<
    decltype(que),
    std::queue<int>
  >);

  while (!que.empty()) {
    std::cout << que.front() << std::endl;
    que.pop();
  }
}
```
* que.empty()[link empty.md]
* que.front()[link front.md]
* que.pop()[link pop.md]

### 出力
```
1
2
3
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
