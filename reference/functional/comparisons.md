#比較演算関数オブジェクト
```cpp
namespace std {
  template <typename T>
  struct equal_to {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };

  template <typename T>
  struct not_equal_to {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };

  template <typename T>
  struct greater {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };

  template <typename T>
  struct less {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };

  template <typename T>
  struct greater_equal {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };

  template <typename T>
  struct less_equal {
    bool operator ()(const T& x, const T& y) const;           // C++98
    constexpr bool operator ()(const T& x, const T& y) const; // C++14
    typedef T first_argument_type, second_argument_type;
    typedef bool result_type;
  };
}
```

##概要
比較演算を提供する関数オブジェクト群。これらは一切のメンバ変数を持たず、状態を保持しない。


###メンバ関数

| | |
|--------------------------------------------|---------------------------------|
| `equal_to<T>::operator ()` | `x == y` と等価 |
| `not_equal_to<T>::operator ()` | `x != y` と等価 |
| `greater<T>::operator ()` | `x > y` と等価 |
| `less<T>::operator ()` | `x < y` と等価 |
| `greater_equal<T>::operator ()` | `x >= y` と等価  |
| `less_equal<T>::operator ()` | `x <= y` と等価  |

###メンバ型

| | |
|-----------------------------------|-------------------------------|
| `first_argument_type` | `T` と等価  |
| `second_argument_type` | `T` と等価  |
| `result_type` | `bool` と等価  |


###例

```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::greater<int>()(3, 5) << std::endl;
}
```

###出力
```
false
```

##参照
- [N3789 Constexpr Library Additions: functional](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3789.htm)

