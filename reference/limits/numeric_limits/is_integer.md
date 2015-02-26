#is_integer
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]

```cpp
// C++03
static const bool is_integer;

// C++11
static constexpr bool is_integer;
```

##概要
型`T`が整数型であるなら`is_integer`は`true`となり、そうでなければ`false`となる。  
`is_specialized == false`の場合、`false`となる。


##例
```cpp
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::is_integer;
  constexpr bool b = std::numeric_limits<unsigned int>::is_integer;
  constexpr bool c = std::numeric_limits<double>::is_integer;

  static_assert(a, "int must be integer");
  static_assert(b, "unsigned int must be integer");
  static_assert(!c, "double must be not integer");
}
```
* is_integer[color ff0000]

###出力
```
```


