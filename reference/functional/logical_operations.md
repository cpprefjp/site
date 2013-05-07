#論理演算関数オブジェクト

| |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|<br/><br/><br/>```cpp
<br/>namespace std {<br/><br/>  template <typename T><br/><br/>  struct logical_and {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/><br/>  template <typename T><br/><br/>  struct logical_or {<br/><br/>    bool operator ()(const T& x, const T& y) const;<br/><br/>    typedef T first_argument_type, second_argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/><br/>  template <typename T><br/><br/>  struct logical_not {<br/><br/>    bool operator ()(const T& x) const;<br/><br/>    typedef T argument_type;<br/><br/>    typedef bool result_type;<br/><br/>  };<br/><br/>}<br/><br/><br/><br/><br/><br/> |
```

##概要

論理演算を提供する関数オブジェクト群。これらは一切のメンバ変数を持たず、状態を保持しない。


###メンバ関数


| | |
|------------------------------------------|----------------------------------------------------------------------|
| `logical_and<T>::operator ()` | `x && y` と等価 (ただし短絡評価はされない) |
| `logical_or<T>::operator ()` | <code>x &#x7C;&#x7C; y</code> と等価 (ただし短絡評価はされない) |
| `logical_not<T>::operator ()` | `!x` と等価 |

<h3>
メンバ型</h3>


| | |
|-------------------------------------------------|-------------------------------|
| `first_argument_type, argument_type` | `T` と等価  |
| `second_argument_type` | `T` と等価  |
| `result_type` | `bool` と等価  |


###例


```cpp
#include <iostream>
#include <functional>

int main()
{
  std::cout << std::boolalpha << std::logical_not<bool>()(false) << std::endl;
}
```

###出力

```cpp
true
```
