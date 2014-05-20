#exception_ptr (C++11)
```cpp
namespace std {
  typedef unspecified exception_ptr;
}
```
* unspecified[italic]

##概要
例外オブジェクトを指すポインタ。

`exception_ptr`の具体的な型は未規定だが、ヌル値を格納可能で、あらゆる例外型のオブジェクトを指すことが可能なポインタである。
そのデフォルトコンストラクタはヌル値を指すよう初期化する。
算術型、列挙型、ポインタ型への暗黙変換はできない。

`exception_ptr`は通常、参照カウントスマートポインタとして実装されるだろう。


##例
```cpp
#include <iostream>
#include <exception>
#include <stdexcept> // std::runtime_error

int main()
{
  std::exception_ptr ep1;

  // nullptrと比較可能
  if (ep1 == nullptr) {
    std::cout << "1. null" << std::endl;
  }

  // bool値に暗黙変換可能
  if (!ep1) {
    std::cout << "2. null" << std::endl;
  }

  // デフォルトコンストラクトしたexception_ptrはヌル値
  if (ep1 == std::exception_ptr()) {
    std::cout << "3. null" << std::endl;
  }

  // 例外処理中ではないためcurrent_exceptionはヌル値を指すexception_ptrを返す
  ep1 = std::current_exception();
  if (!ep1) {
    std::cout << "4. null" << std::endl;
  }

  try {
    throw std::runtime_error("error!");
  }
  catch (...) {
    // 処理中の例外を取得
    ep1 = std::current_exception();
  }

  try {
    if (ep1) {
      // exception_ptrで再送出
      std::rethrow_exception(ep1);
    }
  }
  catch (std::runtime_error& e) {
    std::cout << e.what() << std::endl;
  }
}
```


###出力
```
1. null
2. null
3. null
4. null
error!
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


