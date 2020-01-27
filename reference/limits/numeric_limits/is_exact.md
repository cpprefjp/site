# is_exact
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool is_exact;

// C++11
static constexpr bool is_exact;
```

## 概要
型`T`が�確(exact)な表現を持つ場合、`is_exact`は`true`となり、そうでない場合`false`となる。  
`is_specialized == false`の場合は`false`となる。


## 例
```cpp example
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::is_exact;
  constexpr bool b = std::numeric_limits<char>::is_exact;
  constexpr bool c = std::numeric_limits<double>::is_exact;

  static_assert(a, "int must be exact");
  static_assert(b, "char must be exact");
  static_assert(!c, "double must be not exact");
}
```
* is_exact[color ff0000]

### 出力
```
```


