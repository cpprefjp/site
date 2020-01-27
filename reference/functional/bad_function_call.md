# bad_function_call
* functional[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class bad_function_call : public exception;
}
```
* exception[link /reference/exception/exception.md]

## 概要
`std::bad_function`は、空の[`std::function`](function.md)オブジェクトに対して`operator()`を呼び出した際に送出される例外クラスである。

注意: 空の[`std::function`](function.md)オブジェクトに対して[`std::bind()`](bind.md)を呼び出した結果を[`std::function`](function.md)オブジェクトに格納しても空にはならないが、実際に`operator()`を呼ぶと`std::bad_function_call`例外が送出される。

### 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  std::function<void()> f;

  try {
    f();
  }
  catch (std::bad_function_call& e) {
    std::cout << "bad function call" << std::endl;
  }
}
```
* std::bad_function_call[color ff0000]
* std::function[link function.md]

### 出力
```
bad function call
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.4, 4.7.2(what()が"std::bad_weak_ptr"を返すので規格違反。バグ報告済み: [#55847](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=55847)。4.7.3で修�されている。)
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


### 参照

