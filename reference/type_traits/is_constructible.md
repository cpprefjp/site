#is_constructible(C++11)
```cpp
namespace std {
  template <class T, class... Args>
  struct is_constructible;
}
```

##概要
型Tのコンストラクタ呼出しが適格か調べる。`T( Args... )` の形式のコンストラクタ呼び出しが適格であるか。


##要件
型`T`および、`Args...`の全ての型は、完全型でなければならない。


##効果
`is_constructible`は、`T( Args... )`の形式のコンストラクタ呼出しが適格であるならば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <type_traits>

struct s {
  explicit s(int) {} // intを引数にとるコンストラクタ
};

static_assert(std::is_constructible<s, int>::value == true, "value == true, s(int) is constructible");
static_assert(std::is_same<std::is_constructible<s, int>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_constructible<s, int>::type, std::true_type>::value, "type == true_type");
static_assert(std::is_constructible<s, int>() == true, "is_constructible<s, int>() == true");

static_assert(std::is_constructible<s, int*>::value == false, "value == false, s(int*) is not constructible");
static_assert(std::is_same<std::is_constructible<s, int*>::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::is_constructible<s, int*>::type, std::false_type>::value, "type == false_type");
static_assert(std::is_constructible<s, int*>() == false, "is_constructible<s, int*>() == false");

int main(){}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.5.3, 4.6.2, 4.7.0
- [Visual C++](/implementation#visual_cpp.md) 10.0

####備考
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は `integral_constant` が `operator bool()` を持っていないためエラーになる。


