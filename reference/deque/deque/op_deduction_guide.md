# 推論補助
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  deque(InputIterator, InputIterator, Allocator = Allocator())
    -> deque<typename iterator_traits<InputIterator>::value_type, Allocator>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
`std::deque`クラステンプレートの型推論補助。イテレータ範囲から推論する。


## 例
```cpp example
#include <deque>
#include <type_traits>
#include <cassert>

int main()
{
  // 初期化�リストから推論
  std::deque d1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(d1), std::deque<int>>);

  // パラメータ�定済みのdequeからの推論
  std::deque d2 = d1;
  static_assert(std::is_same_v<decltype(d2), std::deque<int>>);

  // 値1を3回繰り返すコンストラクタからの推論。
  // d3{3, 1} とすると初期化�リストと見なされてしまうので注意
  std::deque d3(3, 1);
  static_assert(std::is_same_v<decltype(d3), std::deque<int>>);
  assert(d3.size() == 3);

  // イテレータ範囲からの推論。
  // d4{d1.begin(), d1.end()} とすると、イテレータの初期化�リストと見なされてしまうので注意
  std::deque d4(d1.begin(), d1.end());
  static_assert(std::is_same_v<decltype(d4), std::deque<int>>);
  assert(d4.size() == 3);
}
```
* d1.begin()[link begin.md]
* d1.end()[link end.md]
* d3.size()[link size.md]
* d4.size()[link size.md]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

