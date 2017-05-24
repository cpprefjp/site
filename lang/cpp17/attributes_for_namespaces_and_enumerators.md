# 名前空間と列挙子への属性付加を許可
* cpp17[meta cpp]

## 概要

名前空間と列挙子への属性付加が可能となった。

例えば今後使って欲しくない列挙子に対して`[[deprecated]]`属性を指定して警告を発することができる。

## 仕様

名前空間に属性を付加する場合`[[namespace]]`の直後に属性を記述する。列挙型の場合`[[enum]]`の列挙子の直後に属性を記述する。

## 例
```cpp
namespace foo {
  int var_a;
}

namespace [[deprecated]] bar {
  int var_a;
}

enum FOO {
  FOO_A,
  FOO_B [[deprecated]],
  FOO_C,
};

int main()
{
  int a = FOO_A;
  int b = FOO_B; //警告される
  int c = foo::var_a;
  int d = bar::var_a; //警告される

  return a + b + c + d;
}
```

### 出力

clang++ 5.0.0 にてコンパイルした場合。

```
attributes_for_namespaces_and_enumerators.cpp:18:11: warning: 'FOO_B' is deprecated [-Wdeprecated-declarations]
  int b = FOO_B;
          ^
attributes_for_namespaces_and_enumerators.cpp:11:11: note: 'FOO_B' has been explicitly marked deprecated here
  FOO_B [[deprecated]],
          ^
attributes_for_namespaces_and_enumerators.cpp:20:14: warning: 'bar' is deprecated [-Wdeprecated-declarations]
  int d = bar::var_a;
             ^
attributes_for_namespaces_and_enumerators.cpp:5:13: note: 'bar' has been explicitly marked deprecated here
namespace [[deprecated]] bar {
            ^
2 warnings generated.
```

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [N4266 Attributes for namespaces and enumerators.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4266.html)
