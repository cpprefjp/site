#比較演算関数オブジェクト

| |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/>namespace std {<br/><br/>  template <typename T><br/><br/>  struct equal_to {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/><br/>  template <typename T><br/><br/>  struct not_equal_to {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/>  template <typename T><br/><br/>  struct greater {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/>  template <typename T><br/><br/>  struct less {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/>  template <typename T><br/><br/>  struct greater_equal {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/>  template <typename T><br/><br/>  struct less_equal {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/>}<br/><br/><br/><br/><br/><br/> |
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

<h3>
メンバ型</h3>


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

```cpp
false
```
