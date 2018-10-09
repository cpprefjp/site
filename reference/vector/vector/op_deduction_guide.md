# 推論補助
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class InputIterator,
            class Allocator = allocator<typename iterator_traits<InputIterator>::value_type>>
  vector(InputIterator, InputIterator, Allocator = Allocator())
    -> vector<typename iterator_traits<InputIterator>::value_type, Allocator>;
}
```
* iterator_traits[link /reference/iterator/iterator_traits.md]

## 概要
`std::vector`クラステンプレートの型推論補助。イテレータ範囲から推論する。


## 例
```cpp example
#include <vector>
#include <type_traits>
#include <cassert>

int main()
{
  // 初期化子リストから推論
  std::vector v1 = {1, 2, 3};
  static_assert(std::is_same_v<decltype(v1), std::vector<int>>);

  // パラメータ設定済みのvectorからの推論
  std::vector v2 = v1;
  static_assert(std::is_same_v<decltype(v2), std::vector<int>>);

  // 値1を3回繰り返すコンストラクタからの推論。
  // v3{3, 1} とすると初期化子リストと見なされてしまうので注意
  std::vector v3(3, 1);
  static_assert(std::is_same_v<decltype(v3), std::vector<int>>);
  assert(v3.size() == 3);

  // イテレータ範囲からの推論。
  // v4{v1.begin(), v1.end()} とすると、イテレータの初期化子リストと見なされてしまうので注意
  std::vector v4(v1.begin(), v1.end());
  static_assert(std::is_same_v<decltype(v4), std::vector<int>>);
  assert(v4.size() == 3);
}
```
* v1.begin()[link begin.md]
* v1.end()[link end.md]
* v3.size()[link size.md]
* v4.size()[link size.md]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang):
- [GCC, C++17 mode](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

