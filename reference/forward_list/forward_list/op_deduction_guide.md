# 推論補助
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  forward_list(InputIterator, InputIterator, Allocator = Allocator())
    -> forward_list<typename iterator_traits<InputIterator>::value_type, Allocator>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
`std::forward_list`クラステンプレートの型推論補助。イテレータ範囲から推論する。


## 例
```cpp example
#include <forward_list>
#include <type_traits>

int main()
{
  // 初期化�リストから推論
  std::forward_list fls1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(fls1), std::forward_list<int>>);

  // パラメータ�定済みのforward_listからの推論
  std::forward_list fls2 = fls1;
  static_assert(std::is_same_v<decltype(fls2), std::forward_list<int>>);

  // 値1を3回繰り返すコンストラクタからの推論。
  // fls3{3, 1} とすると初期化�リストと見なされてしまうので注意
  std::forward_list fls3(3, 1);
  static_assert(std::is_same_v<decltype(fls3), std::forward_list<int>>);

  // イテレータ範囲からの推論。
  // fls4{fls1.begin(), fls1.end()} とすると、イテレータの初期化�リストと見なされてしまうので注意
  std::forward_list fls4(fls1.begin(), fls1.end());
  static_assert(std::is_same_v<decltype(fls4), std::forward_list<int>>);
}
```
* fls1.begin()[link begin.md]
* fls1.end()[link end.md]

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

