# 推論補助
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  // 説明用の型
  template <class InputIterator>
  using iter_val_t = typename iterator_traits<InputIterator>::value_type;

template <class Compare, class Container>
  priority_queue(Compare, Container)
    -> priority_queue<typename Container::value_type, Container, Compare>; // (1)

  template <class InputIterator,
            class Compare = less<iter_val_t<InputIterator>>,
            class Container = std::vector<iter_val_t<InputIterator>>>
  priority_queue(InputIterator, InputIterator, Compare = Compare(), Container = Container())
    -> priority_queue<iter_val_t<InputIterator>, Container, Compare>;      // (2)

  template <ranges::input_range R, class Compare = less<ranges::range_value_t<R>>>
  priority_queue(from_range_t, R&&, Compare = Compare())
    -> priority_queue<ranges::range_value_t<R>,
                      vector<ranges::range_value_t<R>>, Compare>;          // (3) C++23から

  template <class Compare, class Container, class Allocator>
  priority_queue(Compare, Container, Allocator)
    -> priority_queue<typename Container::value_type, Container, Compare>; // (4)

  template <class InputIterator, class Allocator>
  priority_queue(InputIterator, InputIterator, Allocator)
    -> priority_queue<iter_val_t<InputIterator>,
                      vector<iter_val_t<InputIterator>, Allocator>,
                      less<iter_val_t<InputIterator>>>;                    // (5) C++23から

  template <class InputIterator, class Compare, class Allocator>
  priority_queue(InputIterator, InputIterator, Compare, Allocator)
    -> priority_queue<iter_val_t<InputIterator>,
                      vector<iter_val_t<InputIterator>, Allocator>,
                      Compare>;                                            // (6) C++23から

  template <class InputIterator, class Compare, class Container, class Allocator>
  priority_queue(InputIterator, InputIterator, Compare, Container, Allocator)
    -> priority_queue<typename Container::value_type, Container, Compare>; // (7) C++23から

  template <ranges::input_range R, class Compare, class Allocator>
  priority_queue(from_range_t, R&&, Compare, Allocator)
    -> priority_queue<ranges::range_value_t<R>,
                      vector<ranges::range_value_t<R>, Allocator>,
                      Compare>;                                            // (8) C++23から

  template <ranges::input_range R, class Allocator>
  priority_queue(from_range_t, R&&, Allocator)
    -> priority_queue<ranges::range_value_t<R>,
                      vector<ranges::range_value_t<R>, Allocator>>;        // (9) C++23から
}
```
* less[link /reference/functional/less.md]
* vector[link /reference/vector/vector.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* from_range_t[link /reference/ranges/from_range_t.md]

## 概要
`std::priority_queue`クラステンプレートの型推論補助。

- (1) : 比較関数オブジェクトと、元となるコンテナから推論する
- (2) : イテレータ範囲、比較関数オブジェクト、元となるコンテナから推論する
- (3) : Rangeと比較関数オブジェクトから推論する
- (4) : 比較関数オブジェクトと、元となるコンテナ、アロケータから推論する
- (5) : イテレータ範囲とアロケータから推論する
- (6) : イテレータ範囲、比較関数オブジェクト、アロケータから推論する
- (7) : イテレータ範囲、比較関数オブジェクト、元となるコンテナ、アロケータから推論する
- (8) : Range、比較関数オブジェクト、元となるコンテナから推論する
- (9) : Rangeとアロケータから推論する


## 例
```cpp example
#include <queue>
#include <type_traits>

int main()
{
  std::vector v = {1, 2, 3};

  // (1)
  // 比較関数オブジェクトと、元となるコンテナから推論
  std::priority_queue pque1 {std::less<int>(), v};
  static_assert(std::is_same_v<decltype(pque1), std::priority_queue<int>>);

  // (2)
  // イテレータ範囲から推論 (デフォルトのコンテナを使用する)
  std::priority_queue pque2 {v.begin(), v.end()};
  static_assert(std::is_same_v<decltype(pque2), std::priority_queue<int>>);
}
```
* std::less[link /reference/functional/less.md]

### 出力
```
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
