# is_signed
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool is_signed;

// C++11
static constexpr bool is_signed;
```

## 概要
型`T`が符号付き型であるなら、`is_signed`は`true`となり、そうでなければ`false`となる。  
`is_specialized == false`の場合、`is_signed`は`false`となる。


## 例
```cpp
#include <limits>

int main()
{
  constexpr bool a = std::numeric_limits<int>::is_signed;
  constexpr bool b = std::numeric_limits<unsigned int>::is_signed;

  static_assert(a, "must be signed");
  static_assert(!b, "must be unsigned");
}
```
* is_signed[color ff0000]

### 出力
```
```


