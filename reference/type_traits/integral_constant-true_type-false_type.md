#integral_constant、true_type、false_type(C++11)
```cpp
namespace std {
  template <class T, T v>
  struct integral_constant {
    static constexpr T value = v;

    typedef T value_type;
    typedef integral_constant<T,v> type;

    constexpr operator value_type() { return value; }
  };

  typedef integral_constant<bool, true> true_type;
  typedef integral_constant<bool, false> false_type;
}
```

##概要
`integral_constant` は基本となる整数型と定数を合わせ，型として整数定数を表す。`true_type` は `bool` 型と `true` を組み合わせた時の `typedef` である。`false_type` は `bool` 型と `false` を組み合わせた時の `typedef` である。 
多くの場合、`<type_traits>` 内のクラスやその他クラスから基本型として派生されることによって用いられる。


##例
```cpp
#include <type_traits>

typedef std::integral_constant<int, 0> int_zero;

static_assert(int_zero::value == 0, "value == 0");
static_assert(std::is_same<int_zero::value_type, int>::value, "value_type == int");
static_assert(std::is_same<int_zero::type, int_zero>::value, "type == int_zero");
static_assert(int_zero() == 0, "int_zero() == 0");

static_assert(std::true_type::value == true, "value == true");
static_assert(std::is_same<std::true_type::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::true_type::type, std::true_type>::value, "type == true_type");
static_assert(std::true_type() == true, "true_type() == true");

static_assert(std::false_type::value == false, "value == true");
static_assert(std::is_same<std::false_type::value_type, bool>::value, "value_type == bool");
static_assert(std::is_same<std::false_type::type, std::false_type>::value, "type == false_type");
static_assert(std::false_type() == false, "false_type() == true");

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
上の例でコンパイラによってはエラーになる。GCC 4.3.4, 4.5.3, Visual C++ 10.0 は [`integral_constant`](./integral_constant-true_type-false_type.md) が `operator value_type()` を持っていないためエラーになる。

