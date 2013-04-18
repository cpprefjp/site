#uncaught_exception
```cpp
namespace std {
  // C++03
  bool uncaught_exception() throw();
```

  // C++11
  bool uncaught_exception() noexcept;
}





##概要

<b>キャッチされていない例外があるかどうかを判定する。
</b>


##戻り値

例外オブジェクトが生成され、スローされてからキャッチするまでの間にtrueを返す。
また、明示的に[`terminate`](/reference/exception/terminate.md)を呼び出し、実際に呼び出されるまでの間にtrueを返す。

具体的には、tryブロック中で作られたオブジェクトのデストラクタや、スタック巻き戻し(unwind)中のデストラクタ、[`terminate`](/reference/exception/terminate.md)の場合は生存している全てのオブジェクトのデストラクタでtrueになる。



##例外

投げない


##例

```cpp
#include <iostream>
#include <exception>

struct X {
  ~X()
  {
    bool has_uncaught = std::uncaught_exception();
    std::cout << std::boolalpha << has_uncaught << std::endl;
  }
};

int main()
{
  try {
    X x;
    throw std::exception();
  }
  catch (std::exception& e) {
    std::cout << "catch" << std::endl;
  }
}
```
* uncaught_exception[color ff0000]

###出力

```cpp
true
catch
```

##参照

[GotW #47 Uncaught Exceptions](http://www.gotw.ca/gotw/047.htm)

