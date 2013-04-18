#is_empty
```cpp
namespace std {  template <class T>  struct is_empty;}
```

##概要

<b>型Tが空のクラスか調べる。</b>


##要件

型`T`は完全型でなければならない。


##効果

`is_empty`は、型`T`が空のクラス (cv修飾を許容する) であるならば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。


##備考

空のクラスは、以下の条件を満たす型である。
- クラス型である。
- 共用型でない。
- 長さ0のビットフィールド以外に、非静的データメンバを持たない。
- 仮想メンバ関数を持たない。
- 仮想基底クラスを持たない。
- 空のクラスでない基底クラスを持たない。


##例

```cpp
#include <type_traits>class empty_class{};struct non_empty_class {  int m;                  // 非静的データメンバを持つ};static_assert(std::is_empty<empty_class>::value == true, "value == true, empty_class is empty");static_assert(std::is_same<std::is_empty<empty_class>::value_type, bool>::value, "value_type == bool");static_assert(std::is_same<std::is_empty<empty_class>::type, std::true_type>::value, "type == true_type");static_assert(std::is_empty<empty_class>() == true, "is_empty<empty_class>() == true");static_assert(std::is_empty<non_empty_class>::value == false, "value == false, non_empty_class is not empty");static_assert(std::is_same<std::is_empty<non_empty_class>::value_type, bool>::value, "value_type == bool");static_assert(std::is_same<std::is_empty<non_empty_class>::type, std::false_type>::value, "type == false_type");static_assert(std::is_empty<non_empty_class>() == false, "is_empty<non_empty_class>() == false");static_assert(std::is_empty<const volatile empty_class>::value == true, "value == true, const volatile empty_class is empty");static_assert(std::is_empty<empty_class&>::value == false, "value == true, empty_class& is not empty");int main(){}
```

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0<h4>備考</h4>
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は integral_constant が operator bool を持っていないためエラーになる。


