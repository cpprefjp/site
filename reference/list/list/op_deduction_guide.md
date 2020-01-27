# 推論補助
* list[meta header]
* std[meta namespace]
* list[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  list(InputIterator, InputIterator, Allocator = Allocator())
    -> list<typename iterator_traits<InputIterator>::value_type, Allocator>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
`std::list`クラステンプレートの型推論補助。イテレータ範囲から推論する。


## 例
```cpp example
#include <list>
#include <type_traits>
#include <cassert>

int main()
{
  // 初期化�リストから推論
  std::list ls1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(ls1), std::list<int>>);

  // パラメータ�定済みのlistからの推論
  std::list ls2 = ls1;
  static_assert(std::is_same_v<decltype(ls2), std::list<int>>);

  // 値1を3回繰り返すコンストラクタからの推論。
  // ls3{3, 1} とすると初期化�リストと見なされてしまうので注意
  std::list ls3(3, 1);
  static_assert(std::is_same_v<decltype(ls3), std::list<int>>);
  assert(ls3.size() == 3);

  // イテレータ範囲からの推論。
  // ls4{ls1.begin(), ls1.end()} とすると、イテレータの初期化�リストと見なされてしまうので注意
  std::list ls4(ls1.begin(), ls1.end());
  static_assert(std::is_same_v<decltype(ls4), std::list<int>>);
  assert(ls4.size() == 3);
}
```
* ls1.begin()[link begin.md]
* ls1.end()[link end.md]
* ls3.size()[link size.md]
* ls4.size()[link size.md]

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

