# 推論補助
* queue[meta header]
* std[meta namespace]
* priority_queue[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class Compare, class Container>
  priority_queue(Compare, Container)
    -> priority_queue<typename Container::value_type, Container, Compare>; // (1)

  template <class InputIterator,
            class Compare = less<typename iterator_traits<InputIterator>::value_type>,
            class Container = vector<typename iterator_traits<InputIterator>::value_type>>
  priority_queue(InputIterator, InputIterator, Compare = Compare(), Container = Container())
    -> priority_queue<
         typename iterator_traits<InputIterator>::value_type,
         Container, Compare>;                                              // (2)

  template <class Compare, class Container, class Allocator>
  priority_queue(Compare, Container, Allocator)
    -> priority_queue<typename Container::value_type, Container, Compare>; // (3)
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]
* less[link /reference/functional/less.md]
* vector[link /reference/vector.md]

## 概要
`std::priority_queue`クラステンプレートの型推論補助。

- (1) : 比較関数オブジェクトと、元となるコンテナから推論する
- (2) : イテレータ範囲、比較関数オブジェクト、元となるコンテナから推論する
- (3) : 比較関数オブジェクトと、元となるコンテナ、アロケータから推論する


## 例
```cpp
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
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

