# 推論補助
* scoped_allocator[meta header]
* std[meta namespace]
* scoped_allocator_adaptor[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class OuterAlloc, class... InnerAllocs>
  scoped_allocator_adaptor(OuterAlloc, InnerAllocs...)
    -> scoped_allocator_adaptor<OuterAlloc, InnerAllocs...>;
}
```

## 概要
`std::scoped_allocator_adaptor`クラステンプレートの型推論補助。

このクラスのコンストラクタは、クラステンプレートパラメータの型に変換可能なア�ケータを受け取る。変換コンストラクタのパラメータ型からクラステンプレートパラメータを推論させるようになっている。


## 例
```cpp example
#include <memory>
#include <scoped_allocator>
#include <string>
#include <vector>

int main()
{
  std::scoped_allocator_adaptor scoped_alloc {
    std::allocator<std::string>{},
    std::allocator<char>{}
  };

  std::vector v {3, std::string("hello"), scoped_alloc};
}
```

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

