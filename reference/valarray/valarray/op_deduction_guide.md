# 推論補助
* valarray[meta header]
* std[meta namespace]
* valarray[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, size_t cnt>
  valarray(const T(&)[cnt], size_t) -> valarray<T>;
}
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
`std::valarray`クラステンプレートの型推論補助。配列と使用する要素数から推論する。


## 例
```cpp
#include <iostream>
#include <valarray>
#include <type_traits>

int main()
{
  int ar[] = {1, 2, 3};

  // 配列と使用する要素数から推論
  std::valarray va {ar, 2};

  static_assert(std::is_same_v<
    decltype(va),
    std::valarray<int>
  >);

  for (int x : va) {
      std::cout << x << std::endl;
  }
}
```

### 出力
```
1
2
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

